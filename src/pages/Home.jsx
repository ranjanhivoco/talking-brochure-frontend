import React  from "react"
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="w-full h-full md:rounded-2xl ">
      <div className="h-full flex  flex-col justify-between pb-12 ">
        <div className="flex flex-1 flex-col justify-center items-center ">
          <img className="h-44 " src="/images/hv.png" alt="logo" />
          {/* <img className="h-20" src="/images/logo-text.png" alt="logo-text" /> */}
        </div>

        <Link
          to={"/explore-your-experience"}
          className="rounded-[120px]  mx-6 bg-white font-Poppins text-xl font-semibold text-center py-4  border-2 border-[#F7F7F7]/50   hover:shadow-md"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default Home;
