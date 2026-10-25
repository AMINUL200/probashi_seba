
import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import {
  UserRound,
  GraduationCap,
  BriefcaseMedical,
  ClipboardList,
  ShieldCheck,
  Plane,
  Heart,
  House,
  ArrowRight,
} from "lucide-react";

const OverseasJourney = () => {
  const shouldReduceMotion = useReducedMotion();

  const steps = [
    {
      number: "1",
      title: <>Register<br />& Verify</>,
      description: <>Create your Worker ID<br />and verify identity</>,
      Icon: UserRound,
      color: "#07965b",
      background: "#e0f8eb",
      path: "/register",
    },
    {
      number: "2",
      title: <>Assess<br />& Prepare</>,
      description: <>Complete training<br />and skill development</>,
      Icon: GraduationCap,
      color: "#0878f9",
      background: "#e0efff",
      path: "/training",
    },
    {
      number: "3",
      title: <>Match<br />Verified Jobs</>,
      description: <>Find and apply for<br />approved opportunities</>,
      Icon: BriefcaseMedical,
      color: "#8538f5",
      background: "#f0e4ff",
      path: "/job-opportunities",
    },
    {
      number: "4",
      title: <>Agree<br />Contract</>,
      description: <>Review terms and<br />record consent</>,
      Icon: ClipboardList,
      color: "#f28b13",
      background: "#fff0dc",
      path: "/services",
    },
    {
      number: "5",
      title: <>Review<br />& Clear</>,
      description: <>Submit documents<br />and get BMET clearance</>,
      Icon: ShieldCheck,
      color: "#0878f9",
      background: "#e0efff",
      path: "/bmet-clearance",
    },
    {
      number: "6",
      title: <>Confirm<br />Departure</>,
      description: <>Record departure<br />through approved sources</>,
      Icon: Plane,
      color: "#123b7a",
      background: "#e8f0ff",
      path: "/services",
    },
    {
      number: "7",
      title: <>Support<br />Overseas</>,
      description: <>Access welfare, health<br />and legal support</>,
      Icon: Heart,
      color: "#f01836",
      background: "#ffe5e9",
      path: "/welfare",
    },
    {
      number: "8",
      title: <>Return &<br />Reintegrate</>,
      description: <>Record return and<br />explore new opportunities</>,
      Icon: House,
      color: "#079da5",
      background: "#d9f8f9",
      path: "/overseas-support",
    },
  ];

  const headingVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  const stepsContainer = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.15,
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  const stepVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="bg-[#f0f8ff] px-3 py-5 sm:px-5 sm:py-7 lg:px-8">
      <div className="mx-auto max-w-[1800px] rounded-xl border border-[#edf4fb] bg-white px-4 py-4 shadow-[0_4px_20px_rgba(20,66,115,0.04)] sm:px-5 sm:py-5 lg:px-5 lg:py-4">

        {/* SECTION HEADING */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2 className="text-xl font-extrabold leading-tight tracking-tight text-[#0b2862] sm:text-2xl">
            Your Overseas Employment Journey
          </h2>

          <p className="mt-1 text-xs leading-5 text-[#526789] sm:text-sm">
            A complete and transparent process from registration to a
            brighter future.
          </p>
        </motion.div>

        {/* JOURNEY STEPS */}
        <motion.div
          variants={stepsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="mt-4 grid grid-cols-2 gap-x-3 gap-y-6 min-[520px]:grid-cols-4 lg:grid-cols-8 lg:gap-x-1 lg:gap-y-3"
        >
          {steps.map(({ number, title, description, Icon, color, background, path }, index) => (
            <React.Fragment key={number}>
              <motion.div
                variants={stepVariants}
                className="relative flex min-w-0 flex-col items-center text-center"
              >
                {/* STEP ICON AND CONNECTOR */}
                <div className="relative flex w-full items-center justify-center">
                  <Link
                    to={path}
                    aria-label={`Step ${number}: ${typeof title === "string" ? title : `journey step ${number}`}`}
                    className="group relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white shadow-[0_2px_8px_rgba(20,66,115,0.09)] transition-shadow duration-200 hover:shadow-[0_4px_14px_rgba(20,66,115,0.16)] sm:h-12 sm:w-12"
                    style={{
                      backgroundColor: background,
                      color,
                    }}
                  >
                    <motion.div
                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : { scale: 1.12, rotate: 5 }
                      }
                      transition={{ duration: 0.2 }}
                    >
                      <Icon
                        size={22}
                        strokeWidth={2.3}
                        fill={
                          [2, 6, 7].includes(index)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </motion.div>
                  </Link>

                  {/* CONNECTOR ARROW */}
                  {index < steps.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute left-[calc(50%+27px)] right-[-4px] top-1/2 hidden -translate-y-1/2 items-center lg:flex"
                    >
                      <div className="h-px flex-1 bg-[#b9d7ff]" />
                      <ArrowRight
                        size={13}
                        strokeWidth={2}
                        className="-ml-1 shrink-0 text-[#0866f5]"
                      />
                    </div>
                  )}
                </div>

                {/* STEP NUMBER AND TITLE */}
                <h3 className="mt-2 min-h-[34px] text-xs font-extrabold leading-[1.3] tracking-tight text-[#0b2862] sm:text-[13px]">
                  <span>{number}. </span>
                  {title}
                </h3>

                {/* DESCRIPTION */}
                <p className="mt-1.5 text-[10px] leading-[1.5] text-[#526789] sm:text-[11px]">
                  {description}
                </p>
              </motion.div>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OverseasJourney;
