
export type Database = "postgres" | "mysql";

export interface Table {
  name: string;
  columns: Column[];
}

export interface Column {
  name: string;
  type: string;
  constraints?: string[];
}

export interface SchemaData {
  postgres: Table[];
  mysql: Table[];
}
