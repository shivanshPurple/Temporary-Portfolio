import TextPressure from "../components/TextPressure/TextPressure";
import ShinyText from "../components/ShinyText/ShinyText";
import CurvedLoop from "../components/CurvedLoop/CurvedLoop";

const HeroSection = () => {
  return (
    <>
      <section
        id="home"
        className="min-h-screen flex flex-col justify-start items-center text-center space-y-4 pt-[30vh]"
      >
        <div className="w-300 h-60">
          <TextPressure
            text="PapaPurple"
            className="font-bold text-white cursor-target"
          />
        </div>
        <ShinyText
          speed={3}
          text="This is a temporary portfolio. I am making a real one inspired by Bruno Simon."
        />
      </section>
      <div className="absolute top-[15vh] left-0 w-full flex justify-center pointer-events-none">
        <CurvedLoop marqueeText="Open to work!" speed={1} />
      </div>
    </>
  );
};

export default HeroSection;
