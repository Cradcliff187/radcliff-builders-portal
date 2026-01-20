export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      case_studies: {
        Row: {
          case_study_url: string | null
          challenge: string
          created_at: string | null
          id: string
          industry: string
          published: boolean | null
          result: string
          solution: string
          title: string
          updated_at: string | null
        }
        Insert: {
          case_study_url?: string | null
          challenge: string
          created_at?: string | null
          id?: string
          industry: string
          published?: boolean | null
          result: string
          solution: string
          title: string
          updated_at?: string | null
        }
        Update: {
          case_study_url?: string | null
          challenge?: string
          created_at?: string | null
          id?: string
          industry?: string
          published?: boolean | null
          result?: string
          solution?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string | null
          email: string
          id: string
          industry: string | null
          message: string
          name: string
          organization: string | null
          phone: string | null
          project_scope: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          industry?: string | null
          message: string
          name: string
          organization?: string | null
          phone?: string | null
          project_scope?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          industry?: string | null
          message?: string
          name?: string
          organization?: string | null
          phone?: string | null
          project_scope?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      insights_articles: {
        Row: {
          article_url: string | null
          category: string
          content: string | null
          created_at: string | null
          date: string
          excerpt: string
          id: string
          published: boolean | null
          read_time: string
          title: string
          updated_at: string | null
        }
        Insert: {
          article_url?: string | null
          category: string
          content?: string | null
          created_at?: string | null
          date: string
          excerpt: string
          id?: string
          published?: boolean | null
          read_time: string
          title: string
          updated_at?: string | null
        }
        Update: {
          article_url?: string | null
          category?: string
          content?: string | null
          created_at?: string | null
          date?: string
          excerpt?: string
          id?: string
          published?: boolean | null
          read_time?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          status: string
          subscribed_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          status?: string
          subscribed_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          status?: string
          subscribed_at?: string
        }
        Relationships: []
      }
      partner_logos: {
        Row: {
          alt_text: string
          created_at: string | null
          id: string
          image_url: string
          name: string
          priority: number | null
          published: boolean | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          alt_text: string
          created_at?: string | null
          id?: string
          image_url: string
          name: string
          priority?: number | null
          published?: boolean | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          alt_text?: string
          created_at?: string | null
          id?: string
          image_url?: string
          name?: string
          priority?: number | null
          published?: boolean | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      project_images: {
        Row: {
          caption: string | null
          created_at: string | null
          display_order: number | null
          id: string
          image_url: string
          project_id: string
          updated_at: string | null
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_url: string
          project_id: string
          updated_at?: string | null
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_url?: string
          project_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_images_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          case_study_pdf_url: string | null
          challenges: string | null
          client_name: string | null
          completion_date: string | null
          created_at: string | null
          description: string
          display_order: number | null
          duration_weeks: number | null
          featured: boolean | null
          id: string
          image_url: string
          industry: string
          key_features: string[] | null
          location: string | null
          outcomes: string | null
          project_type: string | null
          project_value: string | null
          published: boolean | null
          slug: string
          solutions: string | null
          square_footage: number | null
          start_date: string | null
          testimonial_author: string | null
          testimonial_quote: string | null
          testimonial_title: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          case_study_pdf_url?: string | null
          challenges?: string | null
          client_name?: string | null
          completion_date?: string | null
          created_at?: string | null
          description: string
          display_order?: number | null
          duration_weeks?: number | null
          featured?: boolean | null
          id?: string
          image_url: string
          industry: string
          key_features?: string[] | null
          location?: string | null
          outcomes?: string | null
          project_type?: string | null
          project_value?: string | null
          published?: boolean | null
          slug: string
          solutions?: string | null
          square_footage?: number | null
          start_date?: string | null
          testimonial_author?: string | null
          testimonial_quote?: string | null
          testimonial_title?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          case_study_pdf_url?: string | null
          challenges?: string | null
          client_name?: string | null
          completion_date?: string | null
          created_at?: string | null
          description?: string
          display_order?: number | null
          duration_weeks?: number | null
          featured?: boolean | null
          id?: string
          image_url?: string
          industry?: string
          key_features?: string[] | null
          location?: string | null
          outcomes?: string | null
          project_type?: string | null
          project_value?: string | null
          published?: boolean | null
          slug?: string
          solutions?: string | null
          square_footage?: number | null
          start_date?: string | null
          testimonial_author?: string | null
          testimonial_quote?: string | null
          testimonial_title?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      resources: {
        Row: {
          created_at: string | null
          description: string
          file_url: string | null
          id: string
          published: boolean | null
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          file_url?: string | null
          id?: string
          published?: boolean | null
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          file_url?: string | null
          id?: string
          published?: boolean | null
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          display_order: number | null
          id: string
          setting_group: string
          setting_key: string
          setting_label: string
          setting_value: string
          updated_at: string | null
        }
        Insert: {
          display_order?: number | null
          id?: string
          setting_group: string
          setting_key: string
          setting_label: string
          setting_value: string
          updated_at?: string | null
        }
        Update: {
          display_order?: number | null
          id?: string
          setting_group?: string
          setting_key?: string
          setting_label?: string
          setting_value?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          anchor_id: string
          bio_long: string
          bio_short: string
          created_at: string
          display_order: number | null
          headshot_url: string
          id: string
          name: string
          published: boolean | null
          title: string
          updated_at: string
        }
        Insert: {
          anchor_id: string
          bio_long: string
          bio_short: string
          created_at?: string
          display_order?: number | null
          headshot_url: string
          id?: string
          name: string
          published?: boolean | null
          title: string
          updated_at?: string
        }
        Update: {
          anchor_id?: string
          bio_long?: string
          bio_short?: string
          created_at?: string
          display_order?: number | null
          headshot_url?: string
          id?: string
          name?: string
          published?: boolean | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          author_name: string
          author_title: string
          company_description: string
          created_at: string
          display_order: number | null
          id: string
          industry: string | null
          project_metrics: string | null
          published: boolean | null
          quote: string
          updated_at: string
        }
        Insert: {
          author_name: string
          author_title: string
          company_description: string
          created_at?: string
          display_order?: number | null
          id?: string
          industry?: string | null
          project_metrics?: string | null
          published?: boolean | null
          quote: string
          updated_at?: string
        }
        Update: {
          author_name?: string
          author_title?: string
          company_description?: string
          created_at?: string
          display_order?: number | null
          id?: string
          industry?: string | null
          project_metrics?: string | null
          published?: boolean | null
          quote?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
