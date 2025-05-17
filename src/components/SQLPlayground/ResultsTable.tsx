
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ResultsTableProps {
  results: any[] | null;
  error: string | null;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results, error }) => {
  if (error) {
    return (
      <div className="h-full border rounded-md overflow-hidden flex flex-col">
        <div className="bg-muted px-3 py-2 border-b text-sm font-medium">
          Error
        </div>
        <div className="flex-1 p-4 bg-destructive/10 text-destructive overflow-auto">
          <pre className="whitespace-pre-wrap">{error}</pre>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="h-full border rounded-md overflow-hidden flex flex-col">
        <div className="bg-muted px-3 py-2 border-b text-sm font-medium">
          Results
        </div>
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          Run a query to see results
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="h-full border rounded-md overflow-hidden flex flex-col">
        <div className="bg-muted px-3 py-2 border-b text-sm font-medium">
          Results (0 rows)
        </div>
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          Query executed successfully, but no data was returned
        </div>
      </div>
    );
  }

  const columns = Object.keys(results[0]);

  return (
    <div className="h-full border rounded-md overflow-hidden flex flex-col">
      <div className="bg-muted px-3 py-2 border-b text-sm font-medium">
        Results ({results.length} rows)
      </div>
      <ScrollArea className="flex-1">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column}>{column}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                  <TableCell key={`${rowIndex}-${column}`}>
                    {row[column]?.toString() || "null"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default ResultsTable;
