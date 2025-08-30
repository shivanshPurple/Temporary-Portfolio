import BlobCursor from "./blocks/Animations/BlobCursor/BlobCursor";
import Aurora from "./blocks/Backgrounds/Aurora/Aurora";
import DarkVeil from "./blocks/Backgrounds/DarkVeil/DarkVeil";
import GooeyNav from "./blocks/Components/GooeyNav/GooeyNav";
import ShinyText from "./blocks/TextAnimations/ShinyText/ShinyText";
import SplitText from "./blocks/TextAnimations/SplitText/SplitText";
import { PrefsProvider, usePrefs } from "./context/PrefsContext";

function AppContent() {
  const { reducedMotion } = usePrefs();

  return (
    <div className="min-h-screen relative">
      {/* Global Cursor - only show if not reduced motion */}
      {!reducedMotion && <BlobCursor />}

      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-black">
        <Aurora />
        <DarkVeil />
      </div>

      {/* Debug prefs values */}
      {import.meta.env.DEV && (
        <div className="fixed top-20 left-4 z-50 bg-black bg-opacity-80 text-white p-4 rounded-lg text-xs">
          <div>Reduced Motion: {reducedMotion ? "true" : "false"}</div>
          <div>Theme: {usePrefs().theme}</div>
        </div>
      )}

      {/* Navigation */}
      <div className="fixed top-4 left-4 z-50">
        <GooeyNav
          items={[
            { label: "Home", href: "#home" },
            { label: "Projects", href: "#projects" },
            { label: "About", href: "#about" },
            { label: "Contact", href: "#contact" },
          ]}
        />
      </div>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex flex-col justify-center items-center text-center px-4"
      >
        <div className="max-w-4xl mx-auto">
          <SplitText
            text="Shivansh Saini"
            tag="h1"
            className="text-6xl md:text-8xl font-bold mb-6 text-white"
            splitType="chars"
            delay={50}
          />
          <ShinyText
            text="Full Stack Developer & Creative Technologist"
            className="text-xl md:text-2xl text-gray-300 mb-8"
          />
          <div className="flex gap-4 justify-center">
            <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
              View Projects
            </button>
            <button className="px-6 py-3 border border-purple-400 text-purple-300 hover:bg-purple-400/10 rounded-lg transition-colors">
              Contact Me
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="min-h-screen flex items-center justify-center px-4"
      >
        <div className="max-w-2xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6">About Me</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Passionate developer with expertise in React, Unity, Android
            development, and creative coding. I love building immersive
            experiences that blend technology and design.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project cards will go here */}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen flex items-center justify-center px-4"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Get In Touch</h2>
          <p className="text-gray-300 mb-8">
            Let's create something amazing together
          </p>
          <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-lg transition-colors">
            Send Message
          </button>
        </div>
      </section>
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
