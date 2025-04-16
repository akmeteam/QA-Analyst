
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import UserStories from "./pages/UserStories";
import TestCases from "./pages/TestCases";
import TestPlans from "./pages/TestPlans";
import Executions from "./pages/Executions";
import Reports from "./pages/Reports";
import Documents from "./pages/Documents";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route 
            path="/" 
            element={
              <AppLayout>
                <HomePage />
              </AppLayout>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <AppLayout>
                <Dashboard />
              </AppLayout>
            } 
          />
          <Route 
            path="/user-stories" 
            element={
              <AppLayout>
                <UserStories />
              </AppLayout>
            } 
          />
          <Route 
            path="/test-cases" 
            element={
              <AppLayout>
                <TestCases />
              </AppLayout>
            } 
          />
          <Route 
            path="/test-plans" 
            element={
              <AppLayout>
                <TestPlans />
              </AppLayout>
            } 
          />
          <Route 
            path="/executions" 
            element={
              <AppLayout>
                <Executions />
              </AppLayout>
            } 
          />
          <Route 
            path="/reports" 
            element={
              <AppLayout>
                <Reports />
              </AppLayout>
            } 
          />
          <Route 
            path="/documents" 
            element={
              <AppLayout>
                <Documents />
              </AppLayout>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
