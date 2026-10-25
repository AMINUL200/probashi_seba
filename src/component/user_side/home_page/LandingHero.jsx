
import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  UsersRound,
  Globe2,
  Building2,
  GraduationCap,
  BriefcaseBusiness,
  ShieldCheck,
} from "lucide-react";

const LandingHero = () => {
  const shouldReduceMotion = useReducedMotion();

  const statistics = [
    {
      value: "500K+",
      label: "Registered Workers",
      Icon: UsersRound,
      iconColor: "#0878f9",
      iconBg: "#e0efff",
    },
    {
      value: "50+",
      label: "Destination Countries",
      Icon: Globe2,
      iconColor: "#0a9c5b",
      iconBg: "#e0f8eb",
    },
    {
      value: "200+",
      label: "Approved Employers",
      Icon: Building2,
      iconColor: "#8b36ed",
      iconBg: "#f0e4ff",
    },
    {
      value: "100+",
      label: "Training Centers",
      Icon: GraduationCap,
      iconColor: "#078d54",
      iconBg: "#e0f8eb",
    },
    {
      value: "18",
      label: "Service Modules",
      Icon: BriefcaseBusiness,
      iconColor: "#f01836",
      iconBg: "#ffe5e9",
    },
    {
      value: "24/7",
      label: "Support & Assistance",
      Icon: ShieldCheck,
      iconColor: "#07965b",
      iconBg: "#e0f8eb",
    },
  ];

  // Hero text animation
  const heroContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const heroItem = {
    hidden: shouldReduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Statistics cards appear one by one
  const statsContainer = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: shouldReduceMotion ? 0 : 0.1,
        staggerChildren: shouldReduceMotion ? 0 : 0.13,
      },
    },
  };

  const statCard = {
    hidden: shouldReduceMotion
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 0, y: 28, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <>
      {/* ==========================================
          SECTION 1: HERO BANNER
      ========================================== */}
      <section className="relative isolate overflow-hidden bg-[#eaf6ff]">
        {/* Background image */}
        <motion.div
          className="absolute inset-0 -z-10"
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, scale: 1.04 }
          }
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 1.1,
            ease: "easeOut",
          }}
        >
          <img
            src="/image/home_hero.png"
            alt=""
            fetchPriority="high"
            className="h-full w-full object-cover object-center"
          />
        </motion.div>

        <div className="relative mx-auto flex min-h-[390px] max-w-[1800px] items-center px-5 py-10 sm:min-h-[420px] sm:px-8 sm:py-12 lg:min-h-[430px] lg:px-10 lg:py-12 xl:min-h-[460px] xl:px-11">
          {/* Hero content */}
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="visible"
            className="relative z-10 w-full max-w-[490px] xl:max-w-[510px]"
          >
            {/* Eyebrow */}
            <motion.p
              variants={heroItem}
              className="mb-2 text-[10px] font-bold uppercase tracking-[0.13em] text-[#254c80] sm:text-xs"
            >
              A Government-Controlled Platform
            </motion.p>

            {/* Heading */}
            <motion.h1
              variants={heroItem}
              className="text-[32px] font-extrabold leading-[1.08] tracking-tight text-[#0b2862] sm:text-4xl lg:text-[39px] xl:text-[43px]"
            >
              A Safer, Brighter Future
              <br />
              <span className="text-[#0866f5]">
                for Bangladesh’s
                <br />
                Overseas Workers
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={heroItem}
              className="mt-3 max-w-[440px] text-[13px] leading-[1.7] text-[#203c66] sm:text-sm"
            >
              Registration, training, verified employment, welfare support
              and reintegration — all in one national platform.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={heroItem}
              className="mt-5 flex flex-wrap items-center gap-3"
            >
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.02 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              >
                <Link
                  to="/register"
                  className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#0866f5] bg-[#0754b5] px-5 text-xs font-bold text-white shadow-[0_4px_12px_rgba(8,102,245,0.18)] transition-colors duration-200 hover:bg-[#06469a] sm:px-7 sm:text-sm"
                >
                  Register Now
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>

              <motion.div
                whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.02 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              >
                <Link
                  to="/services"
                  className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#7baeff] bg-white/95 px-5 text-xs font-bold text-[#0866f5] shadow-sm transition-colors duration-200 hover:bg-[#0866f5] hover:text-white sm:px-7 sm:text-sm"
                >
                  Explore Services
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          SECTION 2: STATISTICS CARDS
          Separate white background
      ========================================== */}
      <section className="relative bg-white py-5 sm:py-6 lg:py-7">
        <div className="mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-10 xl:px-11">
          <motion.div
            variants={statsContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 lg:gap-2 xl:gap-3"
          >
            {statistics.map(
              ({ value, label, Icon, iconColor, iconBg }) => (
                <motion.div
                  key={label}
                  variants={statCard}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -5,
                          transition: { duration: 0.22 },
                        }
                  }
                  className="flex min-h-[82px] min-w-0 items-center gap-3 rounded-xl border border-[#edf2f8] bg-white px-3 py-3 shadow-[0_4px_16px_rgba(20,66,115,0.06)] transition-shadow duration-200 hover:border-blue-100 hover:shadow-[0_8px_22px_rgba(20,66,115,0.10)] sm:px-3.5"
                >
                  {/* Icon */}
                  <motion.div
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : { rotate: 6, scale: 1.08 }
                    }
                    transition={{ duration: 0.2 }}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12"
                    style={{
                      backgroundColor: iconBg,
                      color: iconColor,
                    }}
                  >
                    <Icon size={23} strokeWidth={2.4} />
                  </motion.div>

                  {/* Statistic text */}
                  <div className="min-w-0">
                    <p className="text-lg font-extrabold leading-tight tracking-tight text-[#0b2862] sm:text-xl">
                      {value}
                    </p>

                    <p className="mt-1 text-[10px] leading-[1.4] text-[#405879] sm:text-[11px]">
                      {label}
                    </p>
                  </div>
                </motion.div>
              )
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default LandingHero;
