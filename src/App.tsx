import TargetCursor from "./blocks/Animations/TargetCursor/TargetCursor";
import DarkVeil from "./blocks/Backgrounds/DarkVeil/DarkVeil";
import Dock from "./blocks/Components/Dock/Dock";
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

      {/* Hero Section */}
      <HeroSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* About Section */}
      <AboutSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}

function App() {
  return (
    <PrefsProvider>
      <AppContent />
    </PrefsProvider>
  );
}

export default App;
