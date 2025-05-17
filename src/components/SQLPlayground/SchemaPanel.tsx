
import React from "react";
import { Database, Table } from "./types";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SchemaPanelProps {
  database: Database;
}

const SchemaPanel: React.FC<SchemaPanelProps> = ({ database }) => {
  // Mock schema data for both databases
  const schemaData = {
    postgres: [
      {
        name: "customers",
        columns: [
          { name: "id", type: "SERIAL", constraints: ["PRIMARY KEY"] },
          { name: "name", type: "VARCHAR(255)", constraints: ["NOT NULL"] },
          { name: "email", type: "VARCHAR(255)", constraints: ["UNIQUE", "NOT NULL"] },
          { name: "created_at", type: "TIMESTAMP", constraints: ["DEFAULT NOW()"] }
        ]
      },
      {
        name: "orders",
        columns: [
          { name: "id", type: "SERIAL", constraints: ["PRIMARY KEY"] },
          { name: "customer_id", type: "INTEGER", constraints: ["REFERENCES customers(id)"] },
          { name: "amount", type: "DECIMAL(10,2)", constraints: ["NOT NULL"] },
          { name: "status", type: "VARCHAR(50)", constraints: ["NOT NULL"] },
          { name: "created_at", type: "TIMESTAMP", constraints: ["DEFAULT NOW()"] }
        ]
      },
      {
        name: "products",
        columns: [
          { name: "id", type: "SERIAL", constraints: ["PRIMARY KEY"] },
          { name: "name", type: "VARCHAR(255)", constraints: ["NOT NULL"] },
          { name: "price", type: "DECIMAL(10,2)", constraints: ["NOT NULL"] },
          { name: "stock", type: "INTEGER", constraints: ["NOT NULL", "DEFAULT 0"] }
        ]
      },
      {
        name: "order_items",
        columns: [
          { name: "id", type: "SERIAL", constraints: ["PRIMARY KEY"] },
          { name: "order_id", type: "INTEGER", constraints: ["REFERENCES orders(id)"] },
          { name: "product_id", type: "INTEGER", constraints: ["REFERENCES products(id)"] },
          { name: "quantity", type: "INTEGER", constraints: ["NOT NULL"] },
          { name: "price", type: "DECIMAL(10,2)", constraints: ["NOT NULL"] }
        ]
      }
    ],
    mysql: [
      {
        name: "customers",
        columns: [
          { name: "id", type: "INT", constraints: ["PRIMARY KEY", "AUTO_INCREMENT"] },
          { name: "name", type: "VARCHAR(255)", constraints: ["NOT NULL"] },
          { name: "email", type: "VARCHAR(255)", constraints: ["UNIQUE", "NOT NULL"] },
          { name: "created_at", type: "DATETIME", constraints: ["DEFAULT CURRENT_TIMESTAMP"] }
        ]
      },
      {
        name: "orders",
        columns: [
          { name: "id", type: "INT", constraints: ["PRIMARY KEY", "AUTO_INCREMENT"] },
          { name: "customer_id", type: "INT", constraints: ["FOREIGN KEY (REFERENCES customers(id))"] },
          { name: "amount", type: "DECIMAL(10,2)", constraints: ["NOT NULL"] },
          { name: "status", type: "VARCHAR(50)", constraints: ["NOT NULL"] },
          { name: "created_at", type: "DATETIME", constraints: ["DEFAULT CURRENT_TIMESTAMP"] }
        ]
      },
      {
        name: "products",
        columns: [
          { name: "id", type: "INT", constraints: ["PRIMARY KEY", "AUTO_INCREMENT"] },
          { name: "name", type: "VARCHAR(255)", constraints: ["NOT NULL"] },
          { name: "price", type: "DECIMAL(10,2)", constraints: ["NOT NULL"] },
          { name: "stock", type: "INT", constraints: ["NOT NULL", "DEFAULT 0"] }
        ]
      },
      {
        name: "order_items",
        columns: [
          { name: "id", type: "INT", constraints: ["PRIMARY KEY", "AUTO_INCREMENT"] },
          { name: "order_id", type: "INT", constraints: ["FOREIGN KEY (REFERENCES orders(id))"] },
          { name: "product_id", type: "INT", constraints: ["FOREIGN KEY (REFERENCES products(id))"] },
          { name: "quantity", type: "INT", constraints: ["NOT NULL"] },
          { name: "price", type: "DECIMAL(10,2)", constraints: ["NOT NULL"] }
        ]
      }
    ]
  };

  const tables = schemaData[database];

  const renderTable = (table: Table) => (
    <div key={table.name} className="mb-4">
      <div className="flex items-center mb-1">
        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
        <h3 className="font-medium">{table.name}</h3>
      </div>
      <div className="pl-5">
        {table.columns.map((column) => (
          <div key={column.name} className="text-sm py-1 border-l pl-4 border-gray-700">
            <span className="text-white">{column.name}</span>
            <span className="text-gray-400"> {column.type}</span>
            {column.constraints && column.constraints.length > 0 && (
              <div className="text-xs text-gray-500">
                {column.constraints.join(", ")}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-72 bg-gray-900 border rounded-md overflow-hidden flex flex-col">
      <div className="bg-muted px-3 py-2 border-b text-sm font-medium">
        Schema ({database})
      </div>
      <ScrollArea className="flex-1 p-4">
        {tables.map(renderTable)}
      </ScrollArea>
    </div>
  );
};

export default SchemaPanel;
