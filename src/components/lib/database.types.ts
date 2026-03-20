export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          name: string | null
          phone: string | null
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name?: string | null
          phone?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string | null
          phone?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
      }
      exchange_reservations: {
        Row: {
          id: string
          user_id: string
          from_amount: number
          from_currency: string
          to_amount: number
          to_currency: string
          rate: number
          exchange_date: string
          status: string
          card_number: string
          card_holder: string
          expiry_date: string
          bank_name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          from_amount: number
          from_currency: string
          to_amount: number
          to_currency: string
          rate: number
          exchange_date: string
          status: string
          card_number: string
          card_holder: string
          expiry_date: string
          bank_name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          from_amount?: number
          from_currency?: string
          to_amount?: number
          to_currency?: string
          rate?: number
          exchange_date?: string
          status?: string
          card_number?: string
          card_holder?: string
          expiry_date?: string
          bank_name?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}