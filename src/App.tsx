
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DEPrep from "./pages/DEPrep";
import DEProjects from "./pages/DEProjects";
import QuestionDetail from "./pages/QuestionDetail";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import SQLPlayground from "./pages/SQLPlayground";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/de-prep" element={<DEPrep />} />
            <Route 
              path="/de-prep/question/:questionId" 
              element={<QuestionDetail />}
            />
            <Route
              path="/de-projects"
              element={
                <ProtectedRoute>
                  <DEProjects />
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/sql-playground" element={<SQLPlayground />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
