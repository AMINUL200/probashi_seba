
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Plus, Minus, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const faqs = [
  {
    question: "How do I register as a worker?",
    answer:
      "Create an account on Probashi Seba, complete your personal profile, and submit the required information to register as an overseas worker.",
  },
  {
    question: "What documents are required for BMET clearance?",
    answer:
      "Requirements may include your passport, visa, employment documents, registration details, and other documents requested by the relevant authority.",
  },
  {
    question: "How can I check job opportunities?",
    answer:
      "Visit our latest jobs section to explore available overseas opportunities, review job requirements, and follow the application instructions.",
  },
  {
    question: "What support is available if I face a problem abroad?",
    answer:
      "You can contact the relevant support service or Bangladesh embassy or consulate for guidance and assistance with overseas employment concerns.",
  },
  {
    question: "Can my family access my information?",
    answer:
      "Access to personal information depends on your account permissions and applicable privacy rules. Keep your login details secure.",
  },
];

const DreamsSupportFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const benefits = [
    "Verified Opportunities",
    "Government Supported",
    "Complete Welfare Services",
    "A Brighter Future",
  ];

  return (
    <section className="w-full bg-[#f2f8fa] px-3 py-3 sm:px-5">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-3 lg:grid-cols-[1.85fr_1fr]">
        {/* Left promotional banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="relative isolate min-h-[200px] overflow-hidden rounded-[9px] border border-white/70 bg-[#07375b]"
        >
          {/* Replace this image with your actual banner image */}
          <div
            className="absolute inset-0 -z-20 bg-cover bg-center"
            style={{
              backgroundImage: "url('/image/dreams-support-banner.png')",
            }}
          />

          {/* Dark overlay for readable text */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#052c4d]/90 via-[#063451]/55 to-transparent" />

          <div className="relative flex min-h-[200px] items-center justify-between gap-2 px-4 py-4 sm:px-8">
            {/* Heading and CTA */}
            <div className="max-w-[48%] text-white">
              <h2 className="text-[21px] font-extrabold leading-[1.08] tracking-[-0.5px] sm:text-[25px]">
                Your Dreams
                <br />
                Our Support
              </h2>

              <p className="mt-2 max-w-[230px] text-[11px] leading-[1.35] text-white/95 sm:text-[12px]">
                Together for a Safer, Stronger Bangladesh Abroad.
              </p>

              <Link
                to="/register"
                className="mt-3 inline-flex items-center gap-2 rounded-md bg-white px-3.5 py-2 text-[10px] font-bold text-[#064b9b] shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#eaf3ff] sm:text-[11px]"
              >
                Register Now
                <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
            </div>

            {/* Benefits list */}
            <div className="flex shrink-0 flex-col gap-[7px] pr-0 text-white sm:pr-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-[6px] text-[9px] font-medium sm:text-[10px]"
                >
                  <span className="flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full bg-[#07845e] text-white">
                    <CheckCircle2 size={13} strokeWidth={2.7} />
                  </span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right FAQ panel */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="rounded-[9px] border border-[#e5edf3] bg-white px-3.5 py-3 sm:px-4"
        >
          {/* FAQ heading */}
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <h2 className="text-[13px] font-extrabold tracking-[-0.25px] text-[#102b64]">
              Frequently Asked Questions
            </h2>

            <Link
              to="/faqs"
              className="inline-flex shrink-0 items-center gap-1 text-[9px] font-semibold text-[#0759df] transition-colors hover:text-[#003c9e] sm:text-[10px]"
            >
              View All FAQs
              <ArrowRight size={11} />
            </Link>
          </div>

          {/* Accordion */}
          <div className="space-y-[4px]">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-[6px] border transition-colors duration-200 ${
                    isOpen
                      ? "border-[#b9d5ff] bg-[#f8fbff]"
                      : "border-[#dce5ee] bg-white"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    aria-expanded={isOpen}
                    className="flex min-h-[22px] w-full items-center justify-between gap-2 px-[10px] py-[4px] text-left"
                  >
                    <span className="text-[9px] font-medium leading-[1.4] text-[#202a3a] sm:text-[10px]">
                      {faq.question}
                    </span>

                    {isOpen ? (
                      <Minus
                        size={12}
                        className="shrink-0 text-[#16458c]"
                      />
                    ) : (
                      <Plus
                        size={12}
                        className="shrink-0 text-[#16458c]"
                      />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="px-[10px] pb-2 pt-1 text-[10px] leading-relaxed text-[#64748b]">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DreamsSupportFAQ;
