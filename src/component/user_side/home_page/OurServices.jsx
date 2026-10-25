
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowRight,
  UserRound,
  BriefcaseMedical,
  GraduationCap,
  ClipboardList,
  Heart,
  Plane,
} from "lucide-react";

const OurServices = () => {
  const services = [
    {
      id: 1,
      title: "Worker Registration",
      description: "Create your Worker ID and manage your profile",
      path: "/register",
      Icon: UserRound,
      iconColor: "#0878f9",
      iconBg: "#e0efff",
    },
    {
      id: 2,
      title: "Verified Job Opportunities",
      description: "Access genuine overseas job opportunities",
      path: "/job-opportunities",
      Icon: BriefcaseMedical,
      iconColor: "#07965b",
      iconBg: "#e0f8eb",
    },
    {
      id: 3,
      title: "Skills & Training",
      description: "Develop skills with certified training programs",
      path: "/training",
      Icon: GraduationCap,
      iconColor: "#8538f5",
      iconBg: "#f0e4ff",
    },
    {
      id: 4,
      title: "BMET Clearance",
      description: "Apply and track your clearance status",
      path: "/bmet-clearance",
      Icon: ClipboardList,
      iconColor: "#f28b13",
      iconBg: "#fff0dc",
    },
    {
      id: 5,
      title: "Welfare & Support",
      description:
        "Get help with complaints, legal aid and emergency support",
      path: "/welfare",
      Icon: Heart,
      iconColor: "#f01836",
      iconBg: "#ffe5e9",
    },
    {
      id: 6,
      title: "Overseas Support & Reintegration",
      description: "Assistance abroad and support after return",
      path: "/overseas-support",
      Icon: Plane,
      iconColor: "#079da5",
      iconBg: "#d9f8f9",
    },
  ];

  // Animate the section heading
  const headingVariants = {
    hidden: {
      opacity: 0,
      y: 18,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: "easeOut",
      },
    },
  };

  // Animate cards one by one
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.13,
        delayChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 35,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="bg-white px-3 py-5 sm:px-5 sm:py-7 lg:px-8">
      <div className="mx-auto max-w-[1800px] rounded-xl bg-[#f4faff] p-4 sm:p-5 lg:p-5">

        {/* SECTION HEADER */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <motion.div
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <h2 className="text-xl font-extrabold leading-tight tracking-tight text-[#0b2862] sm:text-2xl">
              Our Key Services
            </h2>

            <p className="mt-1 text-xs leading-5 text-[#526789] sm:text-sm">
              From registration to reintegration, we support every step
              of your overseas employment journey.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-1"
          >
            <Link
              to="/services"
              className="group inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-[#0866f5] transition-colors hover:text-[#06469a] sm:text-xs"
            >
              <span className="hidden sm:inline">View All Services</span>
              <span className="sm:hidden">View All</span>

              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>

        {/* SERVICE CARDS: STAGGERED ANIMATION */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 lg:gap-2.5"
        >
          {services.map(
            ({
              id,
              title,
              description,
              path,
              Icon,
              iconColor,
              iconBg,
            }) => (
              <motion.div
                key={id}
                variants={cardVariants}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.22 },
                }}
                className="h-full"
              >
                <Link
                  to={path}
                  className="group flex h-full min-h-[165px] flex-col rounded-lg border border-[#e5edf7] bg-white p-3.5 transition-colors duration-200 hover:border-blue-200 hover:shadow-[0_8px_22px_rgba(20,66,115,0.08)] sm:min-h-[172px] sm:p-4"
                >
                  {/* ICON */}
                  <motion.div
                    initial={{ scale: 0.75, rotate: -8 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      delay: id * 0.1,
                      ease: "easeOut",
                    }}
                    className="mb-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-110"
                    style={{
                      backgroundColor: iconBg,
                      color: iconColor,
                    }}
                  >
                    <Icon
                      size={23}
                      strokeWidth={2.2}
                      fill={
                        id === 3 || id === 5 || id === 6
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </motion.div>

                  {/* TITLE */}
                  <h3 className="text-sm font-extrabold leading-[1.25] tracking-tight text-[#0b2862]">
                    {title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="mt-2 text-[11px] leading-[1.5] text-[#526789] sm:text-xs">
                    {description}
                  </p>

                  {/* ARROW */}
                  <div className="mt-auto flex items-center pt-2 text-[#0866f5]">
                    <ArrowRight
                      size={17}
                      strokeWidth={2}
                      className="transition-transform duration-200 group-hover:translate-x-1.5"
                    />
                  </div>
                </Link>
              </motion.div>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default OurServices;
