import {
  FiGithub,
  FiInstagram,
  FiTwitter,
  FiLinkedin,
  FiYoutube,
  FiMail,
  FiMessageCircle,
} from "react-icons/fi";

const LinksSection = () => {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/shivanshPurple",
      icon: <FiGithub className="text-2xl" />,
      color: "hover:text-gray-300",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/shivansh.purple/",
      icon: <FiInstagram className="text-2xl" />,
      color: "hover:text-pink-400",
    },
    {
      name: "Twitter",
      url: "https://x.com/Papa_Purpl",
      icon: <FiTwitter className="text-2xl" />,
      color: "hover:text-blue-400",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/shivansh-saini-3b6046202/",
      icon: <FiLinkedin className="text-2xl" />,
      color: "hover:text-blue-600",
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@PapaPurple99",
      icon: <FiYoutube className="text-2xl" />,
      color: "hover:text-red-500",
    },
    {
      name: "Discord",
      url: "https://discord.gg/kQPenU8JY8",
      icon: <FiMessageCircle className="text-2xl" />,
      color: "hover:text-purple-400",
    },
  ];

  return (
    <section
      id="links"
      className="min-h-screen flex items-center justify-center px-4 py-16 relative z-10"
    >
      <div className="max-w-4xl text-center">
        <h2 className="text-4xl font-bold text-white mb-6">My Links</h2>
        <p className="text-gray-300 mb-12 text-lg">
          Connect with me across all platforms
        </p>

        <div className="flex flex-wrap justify-center gap-6 max-w-5xl">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-target ${link.color} w-64 h-32 md:w-48 md:h-48 flex flex-col justify-center items-center`}
              style={{ backgroundColor: "rgb(31 41 55)" }}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="text-white">{link.icon}</div>
                <h3 className="text-xl font-semibold text-white">
                  {link.name}
                </h3>
                <p className="text-gray-300 text-sm">
                  {link.url.includes("github.com")
                    ? "@shivanshPurple"
                    : link.url.includes("instagram.com")
                    ? "@shivansh.purple"
                    : link.url.includes("x.com")
                    ? "@Papa_Purpl"
                    : link.url.includes("linkedin.com")
                    ? "Shivansh Saini"
                    : link.url.includes("youtube.com")
                    ? "@PapaPurple99"
                    : "Join Server"}
                </p>
              </div>
            </a>
          ))}

          {/* Email Card */}
          <a
            href="mailto:shivanshsaini17@gmail.com"
            className="bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-target hover:text-green-400 w-64 h-32 md:w-48 md:h-48 flex flex-col justify-center items-center"
            style={{ backgroundColor: "rgb(31 41 55)" }}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="text-white">
                <FiMail className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-white">Email</h3>
              <p className="text-gray-300 text-sm">shivanshsaini17@gmail.com</p>
            </div>
          </a>
        </div>

        <div
          className="mt-12 p-6 bg-gray-800 rounded-xl"
          style={{ backgroundColor: "rgb(31 41 55)" }}
        >
          <p className="text-gray-300">
            Thanks for checking out my links! Feel free to reach out on any
            platform.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LinksSection;
