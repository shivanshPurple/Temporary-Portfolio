import { FiInstagram, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center px-4 py-16"
    >
      <div className="max-w-2xl text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Get In Touch</h2>
        <p className="text-gray-300 mb-8 text-lg">
          Let's create something amazing together
        </p>
        
        <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
          <p className="text-gray-300 mb-6">
            I'm always open to discussing new opportunities, creative projects, or just having a chat about technology.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <a 
              href="mailto:shivanshsaini17@gmail.com" 
              className="flex items-center justify-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <FiMail className="mr-2" />
              shivanshsaini17@gmail.com
            </a>
            <a 
              href="https://instagram.com/shivansh-purple" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <FiInstagram className="mr-2" />
              @shivansh-purple
            </a>
          </div>
          
          <div className="flex justify-center space-x-6">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FiGithub className="text-2xl" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FiLinkedin className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
