import { supabase } from '../lib/supabase'

export const helpdeskService = {
  /**
   * Helper to generate human-readable unique ticket numbers
   */
  generateTicketNumber() {
    const random = Math.floor(1000 + Math.random() * 9000)
    return `CF-TICK-${random}`
  },

  /**
   * Fetch tickets (students see their own; admins see all)
   */
  async getTickets({ studentId, status, category, limit = 30, offset = 0 } = {}) {
    let query = supabase
      .from('helpdesk_tickets')
      .select('*, student:profiles!student_id(id, full_name, email, student_id), assigned:profiles!assigned_to(id, full_name)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (studentId) {
      query = query.eq('student_id', studentId)
    }

    if (status && status !== 'All') {
      query = query.eq('status', status.toLowerCase())
    }

    if (category && category !== 'All') {
      query = query.eq('category', category)
    }

    const { data, count, error } = await query
    if (error) throw error
    return { data, count }
  },

  /**
   * Fetch single ticket with its conversation thread
   */
  async getTicketById(id) {
    const { data, error } = await supabase
      .from('helpdesk_tickets')
      .select('*, student:profiles!student_id(id, full_name, email, student_id, phone), assigned:profiles!assigned_to(id, full_name)')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  /**
   * Create a new student inquiry ticket
   */
  async createTicket({ title, description, category, priority = 'normal', studentId }) {
    const ticketNumber = this.generateTicketNumber()

    const { data, error } = await supabase
      .from('helpdesk_tickets')
      .insert({
        ticket_number: ticketNumber,
        title,
        description,
        category,
        priority,
        status: 'open',
        student_id: studentId,
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  /**
   * Fetch threaded replies for a ticket
   */
  async getTicketReplies(ticketId) {
    const { data, error } = await supabase
      .from('ticket_replies')
      .select('*, sender:profiles(id, full_name, role, avatar_url)')
      .eq('ticket_id', ticketId)
      .order('created_at', { ascending: true })

    if (error) throw error
    return data
  },

  /**
   * Post message reply to ticket
   */
  async replyToTicket({ ticketId, senderId, message, isStaffReply = false }) {
    const { data, error } = await supabase
      .from('ticket_replies')
      .insert({
        ticket_id: ticketId,
        sender_id: senderId,
        message,
        is_staff_reply: isStaffReply,
      })
      .select('*, sender:profiles(id, full_name, role, avatar_url)')
      .single()

    if (error) throw error

    // Automatically change ticket status to in_progress if opened by staff
    if (isStaffReply) {
      await this.updateTicketStatus(ticketId, 'in_progress')
    }

    return data
  },

  /**
   * Update ticket status or assign to staff
   */
  async updateTicketStatus(ticketId, status, assignedTo = null) {
    const updates = {
      status,
      updated_at: new Date().toISOString(),
    }
    if (assignedTo) updates.assigned_to = assignedTo

    const { data, error } = await supabase
      .from('helpdesk_tickets')
      .update(updates)
      .eq('id', ticketId)
      .select()
      .single()

    if (error) throw error
    return data
  },
}
