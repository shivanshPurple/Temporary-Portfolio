import { FiCode, FiCpu, FiCoffee, FiSmartphone } from 'react-icons/fi';

const AboutSection = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-4 py-16"
    >
      <div className="max-w-4xl">
        <h2 className="text-4xl font-bold text-white mb-8 text-center">About Me</h2>
        <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-center mb-6">
            <div className="mb-4 md:mb-0 md:mr-6">
              <div className="bg-gray-700 rounded-full w-32 h-32 flex items-center justify-center">
                <FiCoffee className="text-5xl text-purple-500" />
              </div>
            </div>
            <div>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Hi, I'm Shivansh Saini, a passionate developer with expertise in React, Unity, Android development, and creative coding. 
                I love building immersive experiences that blend technology and design.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                With a strong foundation in both frontend and backend technologies, I enjoy tackling complex challenges 
                and turning ideas into reality through code. My journey in development has allowed me to work on diverse 
                projects ranging from mobile applications to web platforms and game development.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <FiCode className="text-purple-500 text-xl mr-2" />
                <h3 className="text-white font-semibold">Web Development</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Proficient in modern JavaScript frameworks like React, with experience in building responsive 
                and performant web applications.
              </p>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <FiCpu className="text-purple-500 text-xl mr-2" />
                <h3 className="text-white font-semibold">Game Development</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Experienced in Unity game development with a focus on creating engaging gameplay mechanics 
                and immersive experiences.
              </p>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <FiSmartphone className="text-purple-500 text-xl mr-2" />
                <h3 className="text-white font-semibold">Mobile Development</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Skilled in Android development using Java and Flutter, with a focus on creating intuitive 
                and user-friendly mobile applications.
              </p>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <FiCpu className="text-purple-500 text-xl mr-2" />
                <h3 className="text-white font-semibold">Problem Solving</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Strong analytical and problem-solving skills with experience in competitive programming 
                and algorithm design.
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-300 text-lg">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source 
              projects, or enjoying a good cup of coffee while brainstorming my next project.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
