export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bank_accounts: {
        Row: {
          account_id: string
          balance: number | null
          bank_connection_id: string | null
          created_at: string | null
          created_by: string
          currency: string
          enabled: boolean
          id: string
          last_accessed: string | null
          name: string | null
          team_id: string
        }
        Insert: {
          account_id: string
          balance?: number | null
          bank_connection_id?: string | null
          created_at?: string | null
          created_by: string
          currency: string
          enabled?: boolean
          id?: string
          last_accessed?: string | null
          name?: string | null
          team_id: string
        }
        Update: {
          account_id?: string
          balance?: number | null
          bank_connection_id?: string | null
          created_at?: string | null
          created_by?: string
          currency?: string
          enabled?: boolean
          id?: string
          last_accessed?: string | null
          name?: string | null
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bank_accounts_bank_connection_id_fkey"
            columns: ["bank_connection_id"]
            isOneToOne: false
            referencedRelation: "bank_connections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bank_accounts_bank_connection_id_fkey"
            columns: ["bank_connection_id"]
            isOneToOne: false
            referencedRelation: "decrypted_bank_connections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bank_accounts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bank_accounts_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      bank_connections: {
        Row: {
          access_token: string | null
          created_at: string | null
          enrollment_id: string | null
          expires_at: string | null
          id: string
          institution_id: string
          logo_url: string | null
          name: string
          provider: Database["public"]["Enums"]["bank_providers"] | null
          team_id: string
        }
        Insert: {
          access_token?: string | null
          created_at?: string | null
          enrollment_id?: string | null
          expires_at?: string | null
          id?: string
          institution_id: string
          logo_url?: string | null
          name: string
          provider?: Database["public"]["Enums"]["bank_providers"] | null
          team_id: string
        }
        Update: {
          access_token?: string | null
          created_at?: string | null
          enrollment_id?: string | null
          expires_at?: string | null
          id?: string
          institution_id?: string
          logo_url?: string | null
          name?: string
          provider?: Database["public"]["Enums"]["bank_providers"] | null
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bank_connections_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      inbox: {
        Row: {
          amount: number | null
          attachment_id: string | null
          content_type: string | null
          created_at: string | null
          currency: string | null
          display_name: string | null
          due_date: string | null
          embedding: string | null
          file_name: string | null
          file_path: string[] | null
          forwarded_to: string | null
          fts: unknown | null
          id: string
          inbox_amount_text: string | null
          meta: Json | null
          reference_id: string | null
          size: number | null
          status: Database["public"]["Enums"]["inbox_status"] | null
          team_id: string | null
          transaction_id: string | null
          website: string | null
        }
        Insert: {
          amount?: number | null
          attachment_id?: string | null
          content_type?: string | null
          created_at?: string | null
          currency?: string | null
          display_name?: string | null
          due_date?: string | null
          embedding?: string | null
          file_name?: string | null
          file_path?: string[] | null
          forwarded_to?: string | null
          fts?: unknown | null
          id?: string
          inbox_amount_text?: string | null
          meta?: Json | null
          reference_id?: string | null
          size?: number | null
          status?: Database["public"]["Enums"]["inbox_status"] | null
          team_id?: string | null
          transaction_id?: string | null
          website?: string | null
        }
        Update: {
          amount?: number | null
          attachment_id?: string | null
          content_type?: string | null
          created_at?: string | null
          currency?: string | null
          display_name?: string | null
          due_date?: string | null
          embedding?: string | null
          file_name?: string | null
          file_path?: string[] | null
          forwarded_to?: string | null
          fts?: unknown | null
          id?: string
          inbox_amount_text?: string | null
          meta?: Json | null
          reference_id?: string | null
          size?: number | null
          status?: Database["public"]["Enums"]["inbox_status"] | null
          team_id?: string | null
          transaction_id?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inbox_attachment_id_fkey"
            columns: ["attachment_id"]
            isOneToOne: false
            referencedRelation: "transaction_attachments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inbox_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inbox_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          created_at: string | null
          created_by: string | null
          currency: string | null
          expire_at: string | null
          from_data: string | null
          id: string
          link_id: string | null
          short_link: string | null
          team_id: string | null
          to_date: string | null
          type: Database["public"]["Enums"]["reporttypes"] | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          currency?: string | null
          expire_at?: string | null
          from_data?: string | null
          id?: string
          link_id?: string | null
          short_link?: string | null
          team_id?: string | null
          to_date?: string | null
          type?: Database["public"]["Enums"]["reporttypes"] | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          currency?: string | null
          expire_at?: string | null
          from_data?: string | null
          id?: string
          link_id?: string | null
          short_link?: string | null
          team_id?: string | null
          to_date?: string | null
          type?: Database["public"]["Enums"]["reporttypes"] | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          inbox_email: string | null
          inbox_forwarding: boolean | null
          inbox_id: string | null
          logo_url: string | null
          name: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          inbox_email?: string | null
          inbox_forwarding?: boolean | null
          inbox_id?: string | null
          logo_url?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          inbox_email?: string | null
          inbox_forwarding?: boolean | null
          inbox_id?: string | null
          logo_url?: string | null
          name?: string | null
        }
        Relationships: []
      }
      tracker_entries: {
        Row: {
          assigned_id: string | null
          billed: boolean | null
          created_at: string | null
          currency: string | null
          date: string | null
          description: string | null
          duration: number | null
          id: string
          project_id: string | null
          project_members: Json | null
          rate: number | null
          start: string | null
          stop: string | null
          team_id: string | null
        }
        Insert: {
          assigned_id?: string | null
          billed?: boolean | null
          created_at?: string | null
          currency?: string | null
          date?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          project_id?: string | null
          project_members?: Json | null
          rate?: number | null
          start?: string | null
          stop?: string | null
          team_id?: string | null
        }
        Update: {
          assigned_id?: string | null
          billed?: boolean | null
          created_at?: string | null
          currency?: string | null
          date?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          project_id?: string | null
          project_members?: Json | null
          rate?: number | null
          start?: string | null
          stop?: string | null
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tracker_entries_assigned_id_fkey"
            columns: ["assigned_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tracker_entries_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "tracker_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tracker_entries_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      tracker_projects: {
        Row: {
          billable: boolean | null
          created_at: string | null
          currency: string | null
          description: string | null
          estimate: number | null
          id: string
          name: string
          project_members: Json | null
          rate: number | null
          status: Database["public"]["Enums"]["trackerstatus"] | null
          team_id: string | null
          total_duration: number | null
        }
        Insert: {
          billable?: boolean | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          estimate?: number | null
          id?: string
          name: string
          project_members?: Json | null
          rate?: number | null
          status?: Database["public"]["Enums"]["trackerstatus"] | null
          team_id?: string | null
          total_duration?: number | null
        }
        Update: {
          billable?: boolean | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          estimate?: number | null
          id?: string
          name?: string
          project_members?: Json | null
          rate?: number | null
          status?: Database["public"]["Enums"]["trackerstatus"] | null
          team_id?: string | null
          total_duration?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tracker_projects_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      tracker_reports: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          link_id: string | null
          project_id: string | null
          short_link: string | null
          team_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          link_id?: string | null
          project_id?: string | null
          short_link?: string | null
          team_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          link_id?: string | null
          project_id?: string | null
          short_link?: string | null
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tracker_reports_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tracker_reports_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "tracker_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tracker_reports_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      transaction_attachments: {
        Row: {
          created_at: string | null
          id: string
          name: string | null
          path: string[] | null
          size: number | null
          team_id: string | null
          transaction_id: string | null
          type: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name?: string | null
          path?: string[] | null
          size?: number | null
          team_id?: string | null
          transaction_id?: string | null
          type?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string | null
          path?: string[] | null
          size?: number | null
          team_id?: string | null
          transaction_id?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transaction_attachments_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transaction_attachments_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      transaction_categories: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          slug: string
          system: boolean | null
          team_id: string
          vat: number | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          slug?: string
          system?: boolean | null
          team_id: string
          vat?: number | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          slug?: string
          system?: boolean | null
          team_id?: string
          vat?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "transaction_categories_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      transaction_enrichments: {
        Row: {
          category_slug: string | null
          created_at: string | null
          id: string
          name: string | null
          system: boolean | null
          team_id: string | null
        }
        Insert: {
          category_slug?: string | null
          created_at?: string | null
          id?: string
          name?: string | null
          system?: boolean | null
          team_id?: string | null
        }
        Update: {
          category_slug?: string | null
          created_at?: string | null
          id?: string
          name?: string | null
          system?: boolean | null
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transaction_enrichments_category_slug_team_id_fkey"
            columns: ["category_slug", "team_id"]
            isOneToOne: false
            referencedRelation: "transaction_categories"
            referencedColumns: ["slug", "team_id"]
          },
          {
            foreignKeyName: "transaction_enrichments_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          assigned_id: string | null
          balance: number | null
          bank_account_id: string | null
          category: Database["public"]["Enums"]["transactioncategories"] | null
          category_slug: string | null
          created_at: string | null
          currency: string
          currency_rate: number | null
          currency_source: string | null
          date: string
          description: string | null
          id: string
          internal_id: string
          manual: boolean | null
          method: Database["public"]["Enums"]["transactionmethods"]
          name: string
          note: string | null
          status: Database["public"]["Enums"]["transactionstatus"] | null
          team_id: string
        }
        Insert: {
          amount: number
          assigned_id?: string | null
          balance?: number | null
          bank_account_id?: string | null
          category?: Database["public"]["Enums"]["transactioncategories"] | null
          category_slug?: string | null
          created_at?: string | null
          currency: string
          currency_rate?: number | null
          currency_source?: string | null
          date?: string
          description?: string | null
          id?: string
          internal_id: string
          manual?: boolean | null
          method: Database["public"]["Enums"]["transactionmethods"]
          name: string
          note?: string | null
          status?: Database["public"]["Enums"]["transactionstatus"] | null
          team_id: string
        }
        Update: {
          amount?: number
          assigned_id?: string | null
          balance?: number | null
          bank_account_id?: string | null
          category?: Database["public"]["Enums"]["transactioncategories"] | null
          category_slug?: string | null
          created_at?: string | null
          currency?: string
          currency_rate?: number | null
          currency_source?: string | null
          date?: string
          description?: string | null
          id?: string
          internal_id?: string
          manual?: boolean | null
          method?: Database["public"]["Enums"]["transactionmethods"]
          name?: string
          note?: string | null
          status?: Database["public"]["Enums"]["transactionstatus"] | null
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_assigned_id_fkey"
            columns: ["assigned_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_bank_account_id_fkey"
            columns: ["bank_account_id"]
            isOneToOne: false
            referencedRelation: "bank_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_bank_account_id_fkey"
            columns: ["bank_account_id"]
            isOneToOne: false
            referencedRelation: "decrypted_bank_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_category_slug_team_id_fkey"
            columns: ["category_slug", "team_id"]
            isOneToOne: false
            referencedRelation: "transaction_categories"
            referencedColumns: ["slug", "team_id"]
          },
          {
            foreignKeyName: "transactions_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      user_invites: {
        Row: {
          code: string | null
          created_at: string | null
          email: string | null
          id: string
          invited_by: string | null
          role: Database["public"]["Enums"]["teamroles"] | null
          team_id: string | null
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          invited_by?: string | null
          role?: Database["public"]["Enums"]["teamroles"] | null
          team_id?: string | null
        }
        Update: {
          code?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          invited_by?: string | null
          role?: Database["public"]["Enums"]["teamroles"] | null
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_invites_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_invites_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          locale: string | null
          team_id: string | null
          week_starts_on_monday: boolean | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          locale?: string | null
          team_id?: string | null
          week_starts_on_monday?: boolean | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          locale?: string | null
          team_id?: string | null
          week_starts_on_monday?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "users_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      users_on_team: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["teamroles"] | null
          team_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["teamroles"] | null
          team_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["teamroles"] | null
          team_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_on_team_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_on_team_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      wrappers_fdw_stats: {
        Row: {
          bytes_in: number | null
          bytes_out: number | null
          create_times: number | null
          created_at: string
          fdw_name: string
          metadata: Json | null
          rows_in: number | null
          rows_out: number | null
          updated_at: string
        }
        Insert: {
          bytes_in?: number | null
          bytes_out?: number | null
          create_times?: number | null
          created_at?: string
          fdw_name: string
          metadata?: Json | null
          rows_in?: number | null
          rows_out?: number | null
          updated_at?: string
        }
        Update: {
          bytes_in?: number | null
          bytes_out?: number | null
          create_times?: number | null
          created_at?: string
          fdw_name?: string
          metadata?: Json | null
          rows_in?: number | null
          rows_out?: number | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      decrypted_bank_accounts: {
        Row: {
          account_id: string | null
          balance: number | null
          bank_connection_id: string | null
          created_at: string | null
          created_by: string | null
          currency: string | null
          decrypted_name: string | null
          enabled: boolean | null
          id: string | null
          last_accessed: string | null
          name: string | null
          team_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bank_accounts_bank_connection_id_fkey"
            columns: ["bank_connection_id"]
            isOneToOne: false
            referencedRelation: "bank_connections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bank_accounts_bank_connection_id_fkey"
            columns: ["bank_connection_id"]
            isOneToOne: false
            referencedRelation: "decrypted_bank_connections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bank_accounts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bank_accounts_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      decrypted_bank_connections: {
        Row: {
          access_token: string | null
          created_at: string | null
          decrypted_name: string | null
          enrollment_id: string | null
          expires_at: string | null
          id: string | null
          institution_id: string | null
          logo_url: string | null
          name: string | null
          provider: Database["public"]["Enums"]["bank_providers"] | null
          team_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bank_connections_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      airtable_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      airtable_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      airtable_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      amount_text: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      auth0_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      auth0_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      auth0_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      big_query_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      big_query_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      big_query_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      calculated_vat: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      click_house_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      click_house_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      click_house_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      cognito_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      cognito_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      cognito_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      extract_product_names: {
        Args: {
          products_json: Json
        }
        Returns: string
      }
      firebase_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      firebase_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      firebase_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      generate_id: {
        Args: {
          size: number
        }
        Returns: string
      }
      generate_inbox: {
        Args: {
          size: number
        }
        Returns: string
      }
      get_bank_account_currencies: {
        Args: {
          team_id: string
        }
        Returns: {
          currency: string
        }[]
      }
      get_burn_rate: {
        Args: {
          team_id: string
          date_from: string
          date_to: string
          currency: string
        }
        Returns: {
          date: string
          value: number
        }[]
      }
      get_current_burn_rate: {
        Args: {
          team_id: string
          currency: string
        }
        Returns: number
      }
      get_profit: {
        Args: {
          team_id: string
          date_from: string
          date_to: string
          currency: string
        }
        Returns: {
          date: string
          value: number
        }[]
      }
      get_revenue: {
        Args: {
          team_id: string
          date_from: string
          date_to: string
          currency: string
        }
        Returns: {
          date: string
          value: number
        }[]
      }
      get_runway: {
        Args: {
          team_id: string
          date_from: string
          date_to: string
          currency: string
        }
        Returns: number
      }
      get_spending: {
        Args: {
          team_id: string
          date_from: string
          date_to: string
          currency_target: string
        }
        Returns: {
          name: string
          slug: string
          amount: number
          currency: string
          color: string
          percentage: number
        }[]
      }
      get_total_balance: {
        Args: {
          team_id: string
          currency: string
        }
        Returns: number
      }
      logflare_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      logflare_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      logflare_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      mssql_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      mssql_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      mssql_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      redis_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      redis_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      redis_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      s3_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      s3_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      s3_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      slugify: {
        Args: {
          value: string
        }
        Returns: string
      }
      stripe_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      stripe_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      stripe_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      total_duration: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      unaccent: {
        Args: {
          value: string
        }
        Returns: string
      }
      upsert_bank_connection: {
        Args: {
          b_id: string
          b_name: string
          b_institution_id: string
          b_logo_url: string
          b_team_id: string
          b_provider: Database["public"]["Enums"]["bank_providers"]
          b_access_token: string
          b_enrollment_id: string
          b_expires_at: string
        }
        Returns: {
          access_token: string
          created_at: string
          enrollment_id: string
          expires_at: string
          id: string
          institution_id: string
          logo_url: string
          name: string
          provider: Database["public"]["Enums"]["bank_providers"]
          team_id: string
        }[]
      }
    }
    Enums: {
      bank_providers: "gocardless" | "plaid" | "teller"
      inbox_status: "processing" | "pending" | "archived" | "new" | "deleted"
      reporttypes: "profit" | "revenue" | "burn_rate"
      reportTypes: "profit" | "revenue" | "burn_rate"
      teamroles: "owner" | "member"
      teamRoles: "owner" | "member"
      trackerstatus: "in_progress" | "completed"
      trackerStatus: "in_progress" | "completed"
      transactioncategories:
        | "travel"
        | "office_supplies"
        | "meals"
        | "software"
        | "rent"
        | "income"
        | "equipment"
        | "transfer"
        | "internet_and_telephone"
        | "facilities_expenses"
        | "activity"
        | "uncategorized"
        | "taxes"
        | "other"
        | "salary"
        | "fees"
      transactionCategories:
        | "travel"
        | "office_supplies"
        | "meals"
        | "software"
        | "rent"
        | "income"
        | "equipment"
        | "transfer"
        | "internet_and_telephone"
        | "facilities_expenses"
        | "activity"
        | "uncategorized"
        | "taxes"
        | "salary"
        | "fees"
      transactionmethods:
        | "payment"
        | "card_purchase"
        | "card_atm"
        | "transfer"
        | "other"
        | "unknown"
        | "ach"
        | "interest"
        | "deposit"
        | "wire"
        | "fee"
      transactionMethods:
        | "payment"
        | "card_purchase"
        | "card_atm"
        | "transfer"
        | "other"
        | "unknown"
        | "ach"
        | "interest"
        | "deposit"
        | "wire"
        | "fee"
      transactionstatus: "posted" | "pending" | "excluded" | "completed"
      transactionStatus: "posted" | "pending" | "excluded" | "completed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
