import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Team from "./pages/Team";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import IndustriesPage from "./pages/IndustriesPage";
import Insights from "./pages/Insights";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Articles from "./pages/admin/Articles";
import CaseStudies from "./pages/admin/CaseStudies";
import Resources from "./pages/admin/Resources";
import AdminProjects from "./pages/admin/Projects";
import TeamMembers from "./pages/admin/TeamMembers";
import PartnerLogos from "./pages/admin/PartnerLogos";
import SiteSettings from "./pages/admin/SiteSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/industries" element={<IndustriesPage />} />
          {/* <Route path="/insights" element={<Insights />} /> */}
          <Route path="/contact" element={<Contact />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/articles" element={<Articles />} />
            <Route path="/admin/case-studies" element={<CaseStudies />} />
            <Route path="/admin/resources" element={<Resources />} />
            <Route path="/admin/projects" element={<AdminProjects />} />
            <Route path="/admin/team-members" element={<TeamMembers />} />
            <Route path="/admin/partner-logos" element={<PartnerLogos />} />
            <Route path="/admin/settings" element={<SiteSettings />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
