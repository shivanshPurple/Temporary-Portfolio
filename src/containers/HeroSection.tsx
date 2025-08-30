import TextPressure from "../blocks/TextAnimations/TextPressure/TextPressure";
import ShinyText from "../blocks/TextAnimations/ShinyText/ShinyText";
import CurvedLoop from "../blocks/TextAnimations/CurvedLoop/CurvedLoop";

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
          text="I spit out vide coded AI slop, but sometimes I do develop some good stuff on my own"
        />
      </section>
      <div className="absolute top-[15vh] left-0 w-full flex justify-center pointer-events-none">
        <CurvedLoop marqueeText="Open to work!" speed={1} />
      </div>
    </>
  );
};

export default HeroSection;
