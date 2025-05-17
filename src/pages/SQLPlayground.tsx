
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import SQLEditor from "@/components/SQLPlayground/SQLEditor";
import ResultsTable from "@/components/SQLPlayground/ResultsTable";
import SchemaPanel from "@/components/SQLPlayground/SchemaPanel";
import { Database } from "@/components/SQLPlayground/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SQLPlayground: React.FC = () => {
  const [sql, setSql] = useState<string>("SELECT * FROM customers LIMIT 10;");
  const [results, setResults] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [database, setDatabase] = useState<Database>("postgres");
  const [isExecuting, setIsExecuting] = useState(false);

  const executeQuery = async () => {
    setIsExecuting(true);
    setResults(null);
    setError(null);

    try {
      // For now, we'll use mock data while building the UI
      // In the future, this would call the actual backend API
      await new Promise(resolve => setTimeout(resolve, 500));

      if (sql.toLowerCase().includes("drop") || sql.toLowerCase().includes("delete")) {
        throw new Error("DROP and DELETE commands are not allowed in the playground");
      }

      // Mock response based on selected database and query
      if (sql.toLowerCase().includes("customers")) {
        setResults([
          { id: 1, name: "John Doe", email: "john@example.com", created_at: "2023-01-01" },
          { id: 2, name: "Jane Smith", email: "jane@example.com", created_at: "2023-01-02" },
          { id: 3, name: "Bob Johnson", email: "bob@example.com", created_at: "2023-01-03" },
        ]);
        toast.success("Query executed successfully");
      } else if (sql.toLowerCase().includes("orders")) {
        setResults([
          { id: 101, customer_id: 1, amount: 99.99, status: "completed", created_at: "2023-01-10" },
          { id: 102, customer_id: 2, amount: 149.99, status: "processing", created_at: "2023-01-12" },
          { id: 103, customer_id: 1, amount: 29.99, status: "completed", created_at: "2023-01-15" },
        ]);
        toast.success("Query executed successfully");
      } else {
        setResults([]);
        toast.success("Query executed successfully (0 rows returned)");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while executing your query");
      toast.error("Query execution failed");
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col">
        <h1 className="text-3xl font-bold mb-6">SQL Playground</h1>
        
        <div className="flex gap-4 mb-4 items-center">
          <Select value={database} onValueChange={(value) => setDatabase(value as Database)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Database" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="postgres">PostgreSQL</SelectItem>
              <SelectItem value="mysql">MySQL</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            onClick={executeQuery} 
            disabled={isExecuting}
            className="ml-auto"
          >
            {isExecuting ? "Running..." : "Run Query"}
          </Button>
        </div>
        
        <div className="flex flex-1 gap-4 h-[70vh]">
          <SchemaPanel database={database} />
          
          <div className="flex-1 flex flex-col">
            <div className="h-1/2 mb-4">
              <SQLEditor 
                value={sql} 
                onChange={setSql}
                database={database}
              />
            </div>
            
            <div className="h-1/2">
              <ResultsTable results={results} error={error} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SQLPlayground;
