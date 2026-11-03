import { supabase } from '../lib/supabase'

export const profileService = {
  /**
   * Fetch user profile by ID including linked department details
   */
  async getProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*, departments(id, name, code, faculty)')
      .eq('id', userId)
      .single()

    if (error) throw error
    return data
  },

  /**
   * Update personal profile information
   */
  async updateProfile(userId, updates) {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  /**
   * Upload avatar to 'avatars' storage bucket and update profile record
   */
  async uploadAvatar(userId, file) {
    const fileExt = file.name.split('.').pop()
    const filePath = `${userId}/${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true })

    if (uploadError) throw uploadError

    const { data: publicUrlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath)

    const avatarUrl = publicUrlData.publicUrl

    // Update profile record with new avatar URL
    await this.updateProfile(userId, { avatar_url: avatarUrl })
    return avatarUrl
  },

  /**
   * Admin: List students and faculty
   */
  async getAllProfiles({ role, departmentId, search, limit = 50, offset = 0 } = {}) {
    let query = supabase
      .from('profiles')
      .select('*, departments(id, name, code)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (role) query = query.eq('role', role)
    if (departmentId) query = query.eq('department_id', departmentId)
    if (search) {
      query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%,student_id.ilike.%${search}%`)
    }

    const { data, count, error } = await query
    if (error) throw error
    return { data, count }
  },

  /**
   * Admin: Toggle account status (active, suspended, pending)
   */
  async updateStatus(userId, status) {
    const { data, error } = await supabase
      .from('profiles')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return data
  },
}

