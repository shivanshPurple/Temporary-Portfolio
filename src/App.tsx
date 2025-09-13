import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TargetCursor from "./components/TargetCursor/TargetCursor";
import DarkVeil from "./components/DarkVeil/DarkVeil";
import Dock from "./components/Dock/Dock";
import { Handshake, House, Target, UserRound } from "lucide-react";
import HeroSection from "./containers/HeroSection";
import AboutSection from "./containers/AboutSection";
import ProjectsSection from "./containers/ProjectsSection";
import ContactSection from "./containers/ContactSection";

function AppContent() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile/tablet
    const checkIsMobile = () => {
      const userAgent =
        navigator.userAgent || navigator.vendor || (window as any).opera;

      // Simple mobile detection - checks for common mobile device identifiers
      const isMobileDevice =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
          userAgent
        );

      // Also check screen width as a fallback
      const isSmallScreen = window.innerWidth <= 768;

      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Global Cursor - only show if not reduced motion and not on mobile */}
      {!isMobile && <TargetCursor />}

      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-black">
        <DarkVeil />
      </div>

      {/* Navigation - Dock (appears all the time) */}
      {!isMobile && (
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
      )}

      {/* Mobile navigation - simple fixed navigation at bottom */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#060010] bg-opacity-80 backdrop-blur-sm z-50">
          <div className="flex justify-around items-center py-3">
            <button
              onClick={() =>
                document
                  .getElementById("home")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex flex-col items-center text-white"
              aria-label="Home"
            >
              <House color="white" size={24} />
              <span className="text-xs mt-1">Home</span>
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex flex-col items-center text-white"
              aria-label="Projects"
            >
              <Target color="white" size={24} />
              <span className="text-xs mt-1">Projects</span>
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex flex-col items-center text-white"
              aria-label="About"
            >
              <UserRound color="white" size={24} />
              <span className="text-xs mt-1">About</span>
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex flex-col items-center text-white"
              aria-label="Contact"
            >
              <Handshake color="white" size={24} />
              <span className="text-xs mt-1">Contact</span>
            </button>
          </div>
        </div>
      )}

      {/* Scroll container with snap points */}
      <div
        className={`${
          isMobile ? "" : "snap-container snap-y snap-mandatory"
        } h-screen overflow-y-scroll ${isMobile ? "pb-16" : ""}`}
      >
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
      <AppContent />
    </Router>
  );
}

export default App;
