
import React from "react";
import { ArrowRight, Lightbulb } from "lucide-react";

const WelcomeBanner = () => {
  return (
    <section className="relative flex min-h-[124px] overflow-hidden rounded-lg border border-[#dce8f8] bg-gradient-to-r from-[#eaf4ff] via-[#d8ecff] to-[#b9dcff]">
      <div className="relative z-10 flex flex-1 flex-col justify-center p-4 sm:p-5 bg-cover bg-center"
       style={{
          backgroundImage: "url('/image/user-dashboard-banner.png')",
        }}
      >
        <p className="text-sm font-bold text-[#102d66] sm:text-base">
          Welcome back,
        </p>
        <h1 className="mt-0.5 text-xl font-extrabold leading-tight text-[#102d66] sm:text-2xl">
          MD. Rahim Uddin!
        </h1>
        <p className="mt-1 text-[10px] text-[#405b82] sm:text-xs">
          Here is an overview of your overseas employment journey.
        </p>
        <p className="mt-2 text-[10px] font-medium italic text-[#244b83]">
          “New Skills, New Opportunities,
          <br /> A Brighter Tomorrow.”
        </p>
      </div>

      <div
        className="absolute inset-y-0 right-[19%] hidden w-[48%] bg-cover bg-center sm:block"
        // style={{
        //   backgroundImage: "url('/image/user-dashboard-banner.png')",
        // }}
      />

      <div className="relative z-10 flex w-[145px] shrink-0 flex-col justify-center bg-[#064783] px-3 text-white sm:w-[155px]">
        <Lightbulb size={23} className="mb-1 text-amber-300" />
        <p className="text-[10px] font-bold leading-4">
          Your Journey
          <br /> Our Support
        </p>
        <p className="mt-2 text-[9px] leading-3 text-blue-100">
          Skilled Workers
          <br /> Stronger Bangladesh
        </p>
        <ArrowRight
          size={14}
          className="absolute bottom-5 right-3"
        />
      </div>
    </section>
  );
};

export default WelcomeBanner;
