import { supabase } from '../lib/supabase'

export const lostFoundService = {
  /**
   * Fetch lost & found item listings
   */
  async getItems({ type, category, status, search, limit = 20, offset = 0 } = {}) {
    let query = supabase
      .from('lost_found_items')
      .select('*, user:profiles(id, full_name, email, avatar_url)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (type && type !== 'All') {
      query = query.eq('type', type.toLowerCase())
    }

    if (category && category !== 'All') {
      query = query.eq('category', category)
    }

    if (status && status !== 'All') {
      query = query.eq('status', status.toLowerCase())
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,location.ilike.%${search}%`)
    }

    const { data, count, error } = await query
    if (error) throw error
    return { data, count }
  },

  /**
   * Fetch single item with linked claims
   */
  async getItemById(id) {
    const { data, error } = await supabase
      .from('lost_found_items')
      .select('*, user:profiles(id, full_name, email, avatar_url, phone)')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  /**
   * Upload item photo to 'lost-found' bucket
   */
  async uploadItemImage(file, userId) {
    const fileExt = file.name.split('.').pop()
    const filePath = `${userId}/${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('lost-found')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data } = supabase.storage
      .from('lost-found')
      .getPublicUrl(filePath)

    return data.publicUrl
  },

  /**
   * Report a lost or found item
   */
  async createItem(itemData, imageFile = null) {
    let imageUrl = itemData.image_url || null
    if (imageFile) {
      imageUrl = await this.uploadItemImage(imageFile, itemData.user_id)
    }

    const { data, error } = await supabase
      .from('lost_found_items')
      .insert({
        ...itemData,
        image_url: imageUrl,
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  /**
   * Update item status or details
   */
  async updateItem(id, updates) {
    const { data, error } = await supabase
      .from('lost_found_items')
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
   * Delete item report
   */
  async deleteItem(id) {
    const { error } = await supabase
      .from('lost_found_items')
      .delete()
      .eq('id', id)

    if (error) throw error
    return true
  },

  /**
   * Submit an ownership claim on an item
   */
  async submitClaim({ itemId, claimantId, message, proofIdentifier }) {
    const { data, error } = await supabase
      .from('item_claims')
      .insert({
        item_id: itemId,
        claimant_id: claimantId,
        message,
        proof_identifier: proofIdentifier,
        status: 'pending',
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  /**
   * Fetch all claims for an item (for item reporter or admin)
   */
  async getItemClaims(itemId) {
    const { data, error } = await supabase
      .from('item_claims')
      .select('*, claimant:profiles(id, full_name, email, phone, student_id)')
      .eq('item_id', itemId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  /**
   * Review claim (approve, reject)
   */
  async updateClaimStatus(claimId, status, reviewerId) {
    const { data, error } = await supabase
      .from('item_claims')
      .update({
        status,
        reviewed_by: reviewerId,
        reviewed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', claimId)
      .select()
      .single()

    if (error) throw error
    return data
  },
}
