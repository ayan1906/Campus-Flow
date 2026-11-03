import { supabase } from '../lib/supabase'

export const eventService = {
  /**
   * Fetch events list
   */
  async getEvents({ category, search, limit = 20, offset = 0 } = {}) {
    let query = supabase
      .from('events')
      .select('*, author:profiles(id, full_name)', { count: 'exact' })
      .eq('is_published', true)
      .order('event_date', { ascending: true })
      .range(offset, offset + limit - 1)

    if (category && category !== 'All') {
      query = query.eq('category', category)
    }

    if (search) {
      query = query.ilike('title', `%${search}%`)
    }

    const { data, count, error } = await query
    if (error) throw error
    return { data, count }
  },

  /**
   * Fetch single event details
   */
  async getEventById(id) {
    const { data, error } = await supabase
      .from('events')
      .select('*, author:profiles(id, full_name)')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  /**
   * Upload event banner image to 'event-banners' bucket
   */
  async uploadBanner(file) {
    const fileExt = file.name.split('.').pop()
    const filePath = `banners/${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('event-banners')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data } = supabase.storage
      .from('event-banners')
      .getPublicUrl(filePath)

    return data.publicUrl
  },

  /**
   * Admin: Create campus event
   */
  async createEvent(eventData, bannerFile = null) {
    let bannerUrl = eventData.banner_url || null
    if (bannerFile) {
      bannerUrl = await this.uploadBanner(bannerFile)
    }

    const { data, error } = await supabase
      .from('events')
      .insert({
        ...eventData,
        banner_url: bannerUrl,
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  /**
   * Admin: Update event
   */
  async updateEvent(id, updates) {
    const { data, error } = await supabase
      .from('events')
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
   * Admin: Delete event
   */
  async deleteEvent(id) {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id)

    if (error) throw error
    return true
  },

  /**
   * Student: Register for an event
   */
  async registerForEvent({ eventId, studentId }) {
    // 1. Check current capacity
    const event = await this.getEventById(eventId)
    if (event.registered_count >= event.capacity) {
      throw new Error('This event has reached full capacity. No seats available.')
    }

    // 2. Insert registration
    const { data, error } = await supabase
      .from('event_registrations')
      .insert({
        event_id: eventId,
        student_id: studentId,
        status: 'registered',
      })
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        throw new Error('You have already registered for this event.')
      }
      throw error
    }

    return data
  },

  /**
   * Student: Cancel event registration
   */
  async cancelRegistration({ eventId, studentId }) {
    const { data, error } = await supabase
      .from('event_registrations')
      .update({ status: 'cancelled' })
      .eq('event_id', eventId)
      .eq('student_id', studentId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  /**
   * Check if current student is registered
   */
  async checkUserRegistration({ eventId, studentId }) {
    const { data, error } = await supabase
      .from('event_registrations')
      .select('status')
      .eq('event_id', eventId)
      .eq('student_id', studentId)
      .maybeSingle()

    if (error) throw error
    return data?.status === 'registered'
  },

  /**
   * Admin: List attendees of an event
   */
  async getEventAttendees(eventId) {
    const { data, error } = await supabase
      .from('event_registrations')
      .select('*, student:profiles(id, full_name, email, student_id, phone, department:departments(code))')
      .eq('event_id', eventId)
      .eq('status', 'registered')
      .order('created_at', { ascending: true })

    if (error) throw error
    return data
  },

  /**
   * Student: Fetch all events registered by student
   */
  async getStudentRegisteredEvents(studentId) {
    const { data, error } = await supabase
      .from('event_registrations')
      .select('*, event:events(*)')
      .eq('student_id', studentId)
      .eq('status', 'registered')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },
}
