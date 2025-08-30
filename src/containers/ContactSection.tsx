const ContactSection = () => {
  return (
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
  );
};

export default ContactSection;
