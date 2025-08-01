import { useState } from "react";

function SelectLanguage({ setLanguage, language }) {
  const languages = [
    { icon: "/svgs/english.svg", name: "English" },
    { icon: "/svgs/hindi.svg", name: "Hindi" },
    { icon: "/svgs/tamil.svg", name: "Tamil" },
    { icon: "/svgs/marathi.svg", name: "Marathi" },
    { icon: "/svgs/bengali.svg", name: "Bengali" },
    { icon: "/svgs/kannada.svg", name: "Kannada" },
    { icon: "/svgs/telugu.svg", name: "Telugu" },
    { icon: "/svgs/malayalam.svg", name: "Malayalam" },
  ];

  const languagesUI = languages.map((lang, index) => {
    return (
      <div
        onClick={() => {
          setTimeout(() => setLanguage(lang?.name), 500);
        }}
        key={index}
        className={`bg-white/35
        hover:bg-[#494949]/60 hover:border-[3px] hover:border-white    max-w-[136px] md:max-w-28 w-[136px]   md:max-h-24  max-h-[116px] h-[116px]   flex flex-col gap-y-3 items-center justify-center  shadow-[0px_2px_6px_0px_#0000001A] rounded-[10px] py-[14px] px-8
        `}
      >
        <img className="h-12 md:h-10" src={lang.icon} alt="language icon" />

        <span className="text-white font-Poppins text-xl md:text-lg font-medium text-center select-none">
          {lang.name}
        </span>
      </div>
    );
  });

  return (
    <div className="flex flex-col gap-11 md:gap-5  py-8  h-svh justify-center transition-all duration-500 opacity-100 ease-in-out">
      <h1 className="  font-Poppins text-[28.1px] md:text-2xl  font-semibold leading-[38.2px]  text-center text-white select-none">
        Choose Language
      </h1>
      <div className="flex flex-wrap gap-5 md:gap-2 items-center justify-center">
        {languagesUI}
      </div>
    </div>
  );
}

export default SelectLanguage;
