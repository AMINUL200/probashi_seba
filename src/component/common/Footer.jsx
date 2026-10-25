
import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Youtube,
  Linkedin,
  Instagram,
  Globe,
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
    { label: "Job Opportunities", path: "/job-opportunities" },
    { label: "Training", path: "/training" },
    { label: "Welfare", path: "/welfare" },
    { label: "News", path: "/news" },
    { label: "Contact", path: "/contact" },
  ];

  const importantLinks = [
    {
      label: "Ministry of Expatriates' Welfare",
      path: "/important-links/ministry",
    },
    { label: "BMET", path: "/important-links/bmet" },
    { label: "Overseas Missions", path: "/important-links/missions" },
    { label: "Welfare Guidelines", path: "/welfare" },
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Terms of Service", path: "/terms" },
    { label: "Help Center", path: "/help" },
  ];

  const socialLinks = [
    {
      label: "Facebook",
      Icon: Facebook,
      url: "https://www.facebook.com/",
    },
    {
      label: "YouTube",
      Icon: Youtube,
      url: "https://www.youtube.com/",
    },
    {
      label: "LinkedIn",
      Icon: Linkedin,
      url: "https://www.linkedin.com/",
    },
    {
      label: "Instagram",
      Icon: Instagram,
      url: "https://www.instagram.com/",
    },
  ];

  return (
    <footer className="relative isolate overflow-hidden bg-[#052442] text-white">
      {/* Background city illustration */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#031b34] via-[#062b4d] to-[#031b34]" />

        <svg
          viewBox="0 0 1440 280"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-[190px] w-full opacity-[0.16]"
          aria-hidden="true"
        >
          <g fill="#2584c5">
            <path d="M0 225V165H16V140H30V165H44V190H58V150H76V180H92V130H110V178H124V155H139V200H154V170H169V145H183V190H198V160H215V208H232V180H246V130H262V180H278V160H292V215H309V180H325V135H342V165H357V205H375V175H391V220H410V190H425V145H442V185H460V215H476V165H490V195H508V150H525V190H542V210H558V165H573V135H590V190H607V205H623V175H640V215H658V165H676V195H692V145H708V185H725V210H742V160H758V195H774V130H791V180H807V215H825V175H842V145H859V190H877V205H895V160H911V195H930V140H947V180H965V215H982V170H1000V195H1016V150H1034V185H1050V215H1068V165H1085V135H1102V180H1118V200H1135V155H1153V185H1170V215H1188V170H1205V140H1222V185H1240V210H1258V160H1274V195H1291V145H1308V180H1325V210H1342V165H1358V190H1375V145H1392V185H1410V205H1427V165H1440V280H0Z" />

            <path d="M900 225V105H918V75H927V105H938V225Z" />
            <path d="M935 225V55H950V25H956V55H965V225Z" />
            <path d="M972 225V120H984V90H991V120H1000V225Z" />
            <path d="M1100 225V100H1114V65H1122V100H1131V225Z" />
            <path d="M1140 225V75H1155V40H1163V75H1172V225Z" />
            <path d="M1180 225V125H1195V95H1202V125H1211V225Z" />
          </g>

          <path
            d="M0 240 Q180 230 360 245 T720 240 T1080 245 T1440 235"
            fill="none"
            stroke="#4ca9e9"
            strokeWidth="2"
          />
        </svg>

        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#03182d]/90 to-transparent" />
      </div>

      {/* Footer content */}
      <div className="mx-auto max-w-[1800px] px-5 py-7 sm:px-8 lg:px-10 lg:py-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[1.7fr_0.75fr_0.95fr_1.45fr] lg:gap-8">

          {/* BRAND AND DESCRIPTION */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-3"
              aria-label="Probashi Seba home"
            >
              <img
                src="/image/logo.png"
                alt="Probashi Seba logo"
                className="h-14 w-14 shrink-0 object-contain"
              />

              <div>
                <h2 className="text-xl font-extrabold leading-tight tracking-tight text-white">
                  Probashi Seba
                </h2>

                <p className="mt-1 max-w-[235px] text-[11px] leading-[15px] text-slate-200">
                  National Overseas Employment
                  <br />
                  and Migrant Welfare Platform
                </p>
              </div>
            </Link>

            <p className="mt-4 max-w-[390px] text-[12px] leading-[1.7] text-slate-300">
              A government-controlled platform for registration, training,
              overseas employment, welfare support and reintegration of
              Bangladesh’s overseas workers.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="mb-2.5 text-[13px] font-bold text-white">
              Quick Links
            </h3>

            <ul className="space-y-1.5">
              {quickLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-[11px] text-slate-300 transition-colors duration-200 hover:text-white hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* IMPORTANT LINKS */}
          <div>
            <h3 className="mb-2.5 text-[13px] font-bold text-white">
              Important Links
            </h3>

            <ul className="space-y-1.5">
              {importantLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-[11px] leading-4 text-slate-300 transition-colors duration-200 hover:text-white hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT INFORMATION */}
          <div>
            <h3 className="mb-2.5 text-[13px] font-bold text-white">
              Contact Us
            </h3>

            <ul className="space-y-2">
              <li className="flex items-start gap-2.5">
                <MapPin
                  size={14}
                  className="mt-0.5 shrink-0 text-white"
                />
                <span className="text-[11px] leading-4 text-slate-300">
                  Agargaon, Dhaka, Bangladesh
                </span>
              </li>

              <li className="flex items-center gap-2.5">
                <Phone
                  size={13}
                  className="shrink-0 text-white"
                />
                <a
                  href="tel:+880212345678"
                  className="text-[11px] text-slate-300 transition hover:text-white"
                >
                  +880 2 1234 5678
                </a>
              </li>

              <li className="flex items-start gap-2.5">
                <Mail
                  size={14}
                  className="mt-0.5 shrink-0 text-white"
                />
                <a
                  href="mailto:support@probashiseba.gov.bd"
                  className="break-all text-[11px] leading-4 text-slate-300 transition hover:text-white"
                >
                  support@probashiseba.gov.bd
                </a>
              </li>

              <li className="flex items-start gap-2.5">
                <Clock
                  size={14}
                  className="mt-0.5 shrink-0 text-white"
                />
                <span className="text-[11px] leading-4 text-slate-300">
                  Sun - Thu (9:00 AM - 5:00 PM)
                </span>
              </li>
            </ul>

            {/* SOCIAL LINKS */}
            <div className="mt-4">
              <h3 className="mb-2 text-[13px] font-bold text-white">
                Follow Us
              </h3>

              <div className="flex items-center gap-3">
                {socialLinks.map(({ label, Icon, url }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="text-white transition-all duration-200 hover:-translate-y-0.5 hover:text-[#61b5ff]"
                  >
                    <Icon size={19} strokeWidth={2} />
                  </a>
                ))}

                <a
                  href="https://x.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  title="X"
                  className="text-lg font-semibold leading-none text-white transition hover:text-[#61b5ff]"
                >
                  𝕏
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-7 border-t border-white/15 pt-4 text-center">
          <p className="text-[10px] leading-5 text-slate-400 sm:text-[11px]">
            © {new Date().getFullYear()} Probashi Seba. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
