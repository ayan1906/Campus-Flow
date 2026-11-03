import { supabase } from '../lib/supabase'

export const notificationService = {
  /**
   * Fetch active user's notifications
   */
  async getNotifications(userId, limit = 30) {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  },

  /**
   * Mark single notification as read
   */
  async markAsRead(notificationId) {
    const { data, error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  /**
   * Mark all notifications as read for current user
   */
  async markAllAsRead(userId) {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId)
      .eq('is_read', false)

    if (error) throw error
    return true
  },

  /**
   * Create notification alert
   */
  async createNotification({ userId, title, message, type = 'general', link = null }) {
    const { data, error } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        title,
        message,
        type,
        link,
        is_read: false,
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  /**
   * Realtime: Subscribe to new notifications for a specific user
   */
  subscribeToUserNotifications(userId, callback) {
    const channel = supabase
      .channel(`public:notifications:user_id=eq.${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          callback(payload.new)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  },
}

