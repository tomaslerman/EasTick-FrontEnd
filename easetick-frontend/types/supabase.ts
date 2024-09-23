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
      calificacion: {
        Row: {
          fkusuario: number | null
          id: number
          puntaje: number
          resena: string
        }
        Insert: {
          fkusuario?: number | null
          id?: number
          puntaje: number
          resena: string
        }
        Update: {
          fkusuario?: number | null
          id?: number
          puntaje?: number
          resena?: string
        }
        Relationships: [
          {
            foreignKeyName: "calificacion_fkusuario_fkey"
            columns: ["fkusuario"]
            isOneToOne: false
            referencedRelation: "usuario"
            referencedColumns: ["id"]
          },
        ]
      }
      empresa: {
        Row: {
          correoelectronico: string
          esCliente: boolean
          id: number
          nombre: string
          telefono: number | null
          tipo: string | null
        }
        Insert: {
          correoelectronico: string
          esCliente?: boolean
          id?: number
          nombre: string
          telefono?: number | null
          tipo?: string | null
        }
        Update: {
          correoelectronico?: string
          esCliente?: boolean
          id?: number
          nombre?: string
          telefono?: number | null
          tipo?: string | null
        }
        Relationships: []
      }
      empresaCliente: {
        Row: {
          fkCliente: number | null
          fkEmpresa: number | null
          id: number
        }
        Insert: {
          fkCliente?: number | null
          fkEmpresa?: number | null
          id?: number
        }
        Update: {
          fkCliente?: number | null
          fkEmpresa?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "empresaCliente_fkCliente_fkey"
            columns: ["fkCliente"]
            isOneToOne: false
            referencedRelation: "empresa"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "empresaCliente_fkEmpresa_fkey"
            columns: ["fkEmpresa"]
            isOneToOne: false
            referencedRelation: "empresa"
            referencedColumns: ["id"]
          },
        ]
      }
      estado: {
        Row: {
          descripcion: string
          id: number
          nombre: string
        }
        Insert: {
          descripcion: string
          id?: number
          nombre: string
        }
        Update: {
          descripcion?: string
          id?: number
          nombre?: string
        }
        Relationships: []
      }
      mensaje: {
        Row: {
          contenido: string
          fechacreacion: string
          fechamodificacion: string
          fkticket: number
          fkusuario: number
          id: number
          interno: boolean
        }
        Insert: {
          contenido: string
          fechacreacion: string
          fechamodificacion: string
          fkticket: number
          fkusuario: number
          id?: number
          interno: boolean
        }
        Update: {
          contenido?: string
          fechacreacion?: string
          fechamodificacion?: string
          fkticket?: number
          fkusuario?: number
          id?: number
          interno?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "mensaje_fkticket_fkey"
            columns: ["fkticket"]
            isOneToOne: false
            referencedRelation: "ticket"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mensaje_fkusuario_fkey"
            columns: ["fkusuario"]
            isOneToOne: false
            referencedRelation: "usuario"
            referencedColumns: ["id"]
          },
        ]
      }
      prioridad: {
        Row: {
          caducidad: string | null
          descripcion: string
          fkempresa: number
          id: number
          nombre: string
        }
        Insert: {
          caducidad?: string | null
          descripcion: string
          fkempresa: number
          id?: number
          nombre: string
        }
        Update: {
          caducidad?: string | null
          descripcion?: string
          fkempresa?: number
          id?: number
          nombre?: string
        }
        Relationships: [
          {
            foreignKeyName: "prioridad_fkempresa_fkey"
            columns: ["fkempresa"]
            isOneToOne: false
            referencedRelation: "empresa"
            referencedColumns: ["id"]
          },
        ]
      }
      recordatorio: {
        Row: {
          fkusuario: number
          id: number
          texto: string | null
        }
        Insert: {
          fkusuario: number
          id?: number
          texto?: string | null
        }
        Update: {
          fkusuario?: number
          id?: number
          texto?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recordatorio_fkusuario_fkey"
            columns: ["fkusuario"]
            isOneToOne: false
            referencedRelation: "usuario"
            referencedColumns: ["id"]
          },
        ]
      }
      rol: {
        Row: {
          descripcion: string
          id: number
          nombre: string
        }
        Insert: {
          descripcion: string
          id?: number
          nombre: string
        }
        Update: {
          descripcion?: string
          id?: number
          nombre?: string
        }
        Relationships: []
      }
      ticket: {
        Row: {
          asunto: string
          fechacreacion: string
          fechafinalizado: string | null
          fkempresa: number
          fkestado: number
          fkprioridad: number
          fktipo: number
          fkusuario: number
          id: number
        }
        Insert: {
          asunto: string
          fechacreacion: string
          fechafinalizado?: string | null
          fkempresa: number
          fkestado: number
          fkprioridad: number
          fktipo: number
          fkusuario: number
          id?: number
        }
        Update: {
          asunto?: string
          fechacreacion?: string
          fechafinalizado?: string | null
          fkempresa?: number
          fkestado?: number
          fkprioridad?: number
          fktipo?: number
          fkusuario?: number
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "ticket_fkempresa_fkey"
            columns: ["fkempresa"]
            isOneToOne: false
            referencedRelation: "empresa"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_fkestado_fkey"
            columns: ["fkestado"]
            isOneToOne: false
            referencedRelation: "estado"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_fkprioridad_fkey"
            columns: ["fkprioridad"]
            isOneToOne: false
            referencedRelation: "prioridad"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_fktipo_fkey"
            columns: ["fktipo"]
            isOneToOne: false
            referencedRelation: "tipoticket"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_fkusuario_fkey"
            columns: ["fkusuario"]
            isOneToOne: false
            referencedRelation: "usuario"
            referencedColumns: ["id"]
          },
        ]
      }
      tipoticket: {
        Row: {
          descripcion: string
          fkempresa: number
          id: number
          nombre: string
        }
        Insert: {
          descripcion: string
          fkempresa: number
          id?: number
          nombre: string
        }
        Update: {
          descripcion?: string
          fkempresa?: number
          id?: number
          nombre?: string
        }
        Relationships: [
          {
            foreignKeyName: "tipoticket_fkempresa_fkey"
            columns: ["fkempresa"]
            isOneToOne: false
            referencedRelation: "empresa"
            referencedColumns: ["id"]
          },
        ]
      }
      usuario: {
        Row: {
          contrasena: string
          correoelectronico: string
          fkempresa: number
          fkrol: number
          id: number
          nombre: string
        }
        Insert: {
          contrasena: string
          correoelectronico: string
          fkempresa: number
          fkrol: number
          id?: number
          nombre: string
        }
        Update: {
          contrasena?: string
          correoelectronico?: string
          fkempresa?: number
          fkrol?: number
          id?: number
          nombre?: string
        }
        Relationships: [
          {
            foreignKeyName: "usuario_fkempresa_fkey"
            columns: ["fkempresa"]
            isOneToOne: false
            referencedRelation: "empresa"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usuario_fkrol_fkey"
            columns: ["fkrol"]
            isOneToOne: false
            referencedRelation: "rol"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
