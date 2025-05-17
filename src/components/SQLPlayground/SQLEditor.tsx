
import React, { useEffect, useRef, useState } from "react";
import { Database } from "./types";
import { cn } from "@/lib/utils";

interface SQLEditorProps {
  value: string;
  onChange: (value: string) => void;
  database: Database;
}

const SQLEditor: React.FC<SQLEditorProps> = ({ value, onChange, database }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoRef = useRef<any>(null);
  const editorInstanceRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load Monaco editor dynamically
    import('monaco-editor').then(monaco => {
      monacoRef.current = monaco;
      
      if (editorRef.current) {
        // Set up Monaco editor
        if (!editorInstanceRef.current) {
          // Configure language based on selected database
          const language = database === 'mysql' ? 'mysql' : 'pgsql';
          
          // Create editor
          editorInstanceRef.current = monaco.editor.create(editorRef.current, {
            value,
            language,
            theme: 'vs-dark',
            minimap: { enabled: false },
            automaticLayout: true,
            scrollBeyondLastLine: false,
            fontSize: 14,
            tabSize: 2,
          });
          
          // Listen for changes
          editorInstanceRef.current.onDidChangeModelContent(() => {
            onChange(editorInstanceRef.current.getValue());
          });
          
          setIsLoaded(true);
        }
      }
    }).catch(error => {
      console.error("Failed to load Monaco editor:", error);
    });
    
    return () => {
      // Dispose editor when component unmounts
      if (editorInstanceRef.current) {
        editorInstanceRef.current.dispose();
      }
    };
  }, []); // Only run once on mount

  // Update language when database changes
  useEffect(() => {
    if (monacoRef.current && editorInstanceRef.current) {
      const model = editorInstanceRef.current.getModel();
      if (model) {
        monacoRef.current.editor.setModelLanguage(
          model, 
          database === 'mysql' ? 'mysql' : 'pgsql'
        );
      }
    }
  }, [database]);

  return (
    <div className="h-full border rounded-md overflow-hidden flex flex-col">
      <div className="bg-muted px-3 py-2 border-b text-sm font-medium">
        SQL Editor
      </div>
      <div 
        ref={editorRef} 
        className={cn(
          "flex-1 min-h-[200px]",
          !isLoaded && "bg-muted flex items-center justify-center"
        )}
      >
        {!isLoaded && (
          <div className="text-muted-foreground">Loading editor...</div>
        )}
      </div>
    </div>
  );
};

export default SQLEditor;
