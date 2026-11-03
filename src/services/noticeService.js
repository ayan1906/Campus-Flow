import { supabase } from '../lib/supabase'

export const noticeService = {
  /**
   * Fetch notices with department and author joins
   */
  async getNotices({ departmentId, category, search, limit = 20, offset = 0 } = {}) {
    let query = supabase
      .from('notices')
      .select('*, departments(id, name, code), author:profiles(id, full_name, role)', { count: 'exact' })
      .eq('is_published', true)
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (category && category !== 'All') {
      query = query.eq('category', category)
    }

    if (departmentId && departmentId !== 'All') {
      // Include department-specific OR campus-wide notices (where department_id is null)
      query = query.or(`department_id.eq.${departmentId},department_id.is.null`)
    }

    if (search) {
      query = query.ilike('title', `%${search}%`)
    }

    const { data, count, error } = await query
    if (error) throw error
    return { data, count }
  },

  /**
   * Fetch single notice by ID
   */
  async getNoticeById(id) {
    const { data, error } = await supabase
      .from('notices')
      .select('*, departments(id, name, code), author:profiles(id, full_name, role)')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  /**
   * Upload PDF attachment to 'notices' storage bucket
   */
  async uploadNoticePdf(file) {
    const fileExt = file.name.split('.').pop()
    const filePath = `memos/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`

    const { error: uploadError } = await supabase.storage
      .from('notices')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data } = supabase.storage
      .from('notices')
      .getPublicUrl(filePath)

    return {
      fileUrl: data.publicUrl,
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    }
  },

  /**
   * Admin/Staff: Create official notice
   */
  async createNotice(noticeData, pdfFile = null) {
    let fileInfo = {}
    if (pdfFile) {
      fileInfo = await this.uploadNoticePdf(pdfFile)
    }

    const { data, error } = await supabase
      .from('notices')
      .insert({
        ...noticeData,
        file_url: fileInfo.fileUrl || null,
        file_name: fileInfo.fileName || null,
        file_size: fileInfo.fileSize || null,
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  /**
   * Admin: Update notice
   */
  async updateNotice(id, updates) {
    const { data, error } = await supabase
      .from('notices')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  /**
   * Admin: Delete notice
   */
  async deleteNotice(id) {
    const { error } = await supabase
      .from('notices')
      .delete()
      .eq('id', id)

    if (error) throw error
    return true
  },

  /**
   * Mark notice as read by student
   */
  async markAsRead(noticeId, studentId) {
    const { data, error } = await supabase
      .from('notice_reads')
      .upsert(
        {
          notice_id: noticeId,
          student_id: studentId,
          read_at: new Date().toISOString(),
        },
        { onConflict: 'notice_id,student_id' }
      )
      .select()
      .single()

    if (error) throw error
    return data
  },

  /**
   * Check if notice was read by student
   */
  async checkIfRead(noticeId, studentId) {
    const { data, error } = await supabase
      .from('notice_reads')
      .select('read_at')
      .eq('notice_id', noticeId)
      .eq('student_id', studentId)
      .maybeSingle()

    if (error) throw error
    return Boolean(data)
  },
}
