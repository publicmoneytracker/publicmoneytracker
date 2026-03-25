export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          tier: 'public_access' | 'analyst_access' |
                'professional_access' | 'institutional_access'
          stripe_customer_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          tier?: string
          stripe_customer_id?: string | null
        }
        Update: {
          tier?: string
          stripe_customer_id?: string | null
          updated_at?: string
        }
      }
    }
  }
}

export type UserTier =
  'public_access' |
  'analyst_access' |
  'professional_access' |
  'institutional_access'

export type User = Database['public']['Tables']['users']['Row']
