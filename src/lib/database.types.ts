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
      comunities: {
        Row: {
          banner: string
          created_at: string
          description: string
          id: string
          name: string
        }
        Insert: {
          banner: string
          created_at?: string
          description: string
          id?: string
          name: string
        }
        Update: {
          banner?: string
          created_at?: string
          description?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          biography: string | null
          full_name: string
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          biography?: string | null
          full_name: string
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          biography?: string | null
          full_name?: string
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_comunity_rel: {
        Row: {
          comunity_id: string
          id: number
          status: Database["public"]["Enums"]["role"]
          user_id: string
        }
        Insert: {
          comunity_id: string
          id?: number
          status?: Database["public"]["Enums"]["role"]
          user_id: string
        }
        Update: {
          comunity_id?: string
          id?: number
          status?: Database["public"]["Enums"]["role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_comunity_rel_comunity_id_fkey"
            columns: ["comunity_id"]
            isOneToOne: false
            referencedRelation: "comunities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_comunity_rel_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_avatar: {
        Args: {
          avatar_url: string
        }
        Returns: Record<string, unknown>
      }
      delete_comunity_banner: {
        Args: {
          banner_url: string
        }
        Returns: Record<string, unknown>
      }
      delete_storage_object: {
        Args: {
          bucket: string
          object: string
        }
        Returns: Record<string, unknown>
      }
    }
    Enums: {
      role: "administrator" | "moderator" | "member"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
