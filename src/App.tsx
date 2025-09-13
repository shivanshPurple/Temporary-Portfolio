import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TargetCursor from "./components/TargetCursor/TargetCursor";
import DarkVeil from "./components/DarkVeil/DarkVeil";
import Dock from "./components/Dock/Dock";
import { PrefsProvider, usePrefs } from "./context/PrefsContext";
import { Handshake, House, Target, UserRound } from "lucide-react";
import HeroSection from "./containers/HeroSection";
import AboutSection from "./containers/AboutSection";
import ProjectsSection from "./containers/ProjectsSection";
import ContactSection from "./containers/ContactSection";

function AppContent() {
  const { reducedMotion } = usePrefs();

  return (
    <div className="min-h-screen relative">
      {/* Global Cursor - only show if not reduced motion */}
      {!reducedMotion && <TargetCursor />}

      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-black">
        <DarkVeil />
      </div>

      {/* Navigation - Dock (appears all the time) */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <Dock
          items={[
            {
              label: "Home",
              icon: <House color="white" />,
              onClick: () =>
                document
                  .getElementById("home")
                  ?.scrollIntoView({ behavior: "smooth" }),
            },
            {
              label: "Projects",
              icon: <Target color="white" />,
              onClick: () =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" }),
            },
            {
              label: "About",
              icon: <UserRound color="white" />,
              onClick: () =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" }),
            },
            {
              label: "Contact",
              icon: <Handshake color="white" />,
              onClick: () =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" }),
            },
          ]}
        />
      </div>

      {/* Scroll container with snap points */}
      <div className="snap-container snap-y snap-mandatory h-screen overflow-y-scroll">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Hero Section */}
                <div className="snap-start">
                  <HeroSection />
                </div>

                {/* Projects Section */}
                <div className="snap-start">
                  <ProjectsSection />
                </div>

                {/* About Section */}
                <div className="snap-start">
                  <AboutSection />
                </div>

                {/* Contact Section */}
                <div className="snap-start">
                  <ContactSection />
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <PrefsProvider>
        <AppContent />
      </PrefsProvider>
    </Router>
  );
}

export default App;
