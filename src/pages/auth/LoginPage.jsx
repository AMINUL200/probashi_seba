import React, { useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Eye,
  EyeOff,
  Globe,
  GraduationCap,
  Heart,
  Landmark,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UsersRound,
  ChevronDown,
} from "lucide-react";

/* ------------------------------------------------------------------
   Animation variants
   One orchestrated page-load sequence: items fade and rise in order.
------------------------------------------------------------------ */

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.055, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const itemLeftVariants = {
  hidden: { opacity: 0, x: -18 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const LoginPage = () => {
  const [userType, setUserType] = useState("worker");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [language, setLanguage] = useState("English");

  const accountTypes = [
    { id: "worker", label: "Worker", Icon: UsersRound },
    { id: "government", label: "Government Officer", Icon: Landmark },
    { id: "agency", label: "Agency / Employer", Icon: BriefcaseBusiness },
  ];

  const features = [
    {
      title: <>Verified<br />Opportunities</>,
      Icon: ShieldCheck,
      color: "blue",
    },
    {
      title: <>Government<br />Supported</>,
      Icon: UsersRound,
      color: "green",
    },
    {
      title: <>Skills and<br />Training</>,
      Icon: GraduationCap,
      color: "purple",
    },
    {
      title: <>Welfare and<br />Support</>,
      Icon: Heart,
      color: "red",
    },
  ];

  const featureStyles = {
    blue: "bg-[var(--color-feature-blue-bg)] text-[var(--color-feature-blue)]",
    green: "bg-[var(--color-feature-green-bg)] text-[var(--color-feature-green)]",
    purple: "bg-[var(--color-feature-purple-bg)] text-[var(--color-feature-purple)]",
    red: "bg-[var(--color-feature-red-bg)] text-[var(--color-feature-red)]",
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    // Connect your authentication API here.
    console.log({
      userType,
      emailOrMobile: data.get("emailOrMobile"),
      password: data.get("password"),
      rememberMe,
    });
  };

  return (
    <MotionConfig reducedMotion="user">
      <main className="h-dvh w-full overflow-hidden bg-[var(--color-page-bg)] p-0 text-[var(--color-text)] sm:p-3 lg:p-4">
        <div className="mx-auto grid h-full w-full max-w-[1600px] grid-cols-1 overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)] sm:rounded-xl lg:grid-cols-2">

          {/* LEFT SECTION */}
          <section className="relative hidden h-full min-h-0 overflow-hidden bg-[var(--color-hero-bg)] lg:flex lg:flex-col">
            <motion.img
              src="/image/login_image2.png"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />

            {/* Brand and promotional content */}
            <motion.div
              className="relative z-10 p-5 xl:p-6"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3"
              >
                <img
                  src="/image/logo.png"
                  alt="Probashi Seba logo"
                  className="h-14 w-14 shrink-0 object-contain xl:h-16 xl:w-16"
                />

                <div>
                  <h2 className="text-xl font-extrabold tracking-tight text-[var(--color-heading)] xl:text-2xl">
                    Probashi Seba
                  </h2>

                  <p className="text-xs leading-4 text-[var(--color-text)]">
                    National Overseas Employment
                    <br />
                    and Migrant Welfare Platform
                  </p>
                </div>
              </motion.div>

              <div className="mt-5 max-w-[440px] xl:mt-6">
                <motion.h1
                  variants={itemVariants}
                  className="text-2xl font-extrabold leading-tight tracking-tight text-[var(--color-heading)] xl:text-3xl"
                >
                  A Safer,
                  <br />
                  Brighter Future
                  <br />

                  <span className="text-[var(--color-primary)]">
                    for Bangladesh’s
                    <br />
                    Overseas Workers
                  </span>
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="mt-2 max-w-[350px] text-sm leading-5 text-[var(--color-text)]"
                >
                  A unified government platform for registration,
                  training, overseas employment, welfare support
                  and reintegration.
                </motion.p>

                <div className="mt-3 space-y-2">
                  {features.map(({ title, Icon, color }, index) => (
                    <motion.div
                      key={index}
                      variants={itemLeftVariants}
                      className="flex items-center gap-3"
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${featureStyles[color]}`}
                      >
                        <Icon size={21} />
                      </div>

                      <strong className="text-sm leading-5 text-[var(--color-heading)]">
                        {title}
                      </strong>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Decorative wave */}
            <motion.div
              className="absolute inset-x-0 bottom-0 z-20"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
            >
              <svg
                viewBox="0 0 900 200"
                preserveAspectRatio="none"
                className="h-28 w-full xl:h-32"
                aria-hidden="true"
              >
                <path
                  fill="var(--color-wave-secondary)"
                  d="M0 35 C180 -10 280 65 450 120 S720 160 900 45 L900 200 L0 200 Z"
                />

                <path
                  fill="var(--color-wave-primary)"
                  d="M0 70 C180 20 300 95 470 140 S720 180 900 85 L900 200 L0 200 Z"
                />
              </svg>

              <p className="absolute bottom-3 left-6 font-serif text-base italic leading-5 text-[var(--color-wave-text)] xl:left-8 xl:text-lg">
                Connecting
                <br />
                Bangladesh’s Workforce
                <br />
                to the World
              </p>
            </motion.div>
          </section>

          {/* RIGHT SECTION */}
          <section className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden bg-[var(--color-surface)] px-4 py-3 sm:px-6 lg:px-5 xl:px-8">

            {/* Language selector */}
            <motion.div
              className="flex shrink-0 justify-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-1.5 text-[var(--color-heading)]">
                <Globe size={17} />

                <select
                  aria-label="Select language"
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                  className="max-w-[100px] cursor-pointer border-0 bg-transparent py-1 text-xs outline-none"
                >
                  <option value="English">English</option>
                  <option value="বাংলা">বাংলা</option>
                  <option value="العربية">العربية</option>
                </select>

                <ChevronDown size={13} className="pointer-events-none -ml-2" />
              </div>
            </motion.div>

            {/* Login content */}
            <motion.div
              className="mx-auto flex w-full max-w-[520px] flex-1 flex-col justify-center py-2"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >

              {/* Logo and branding */}
              <motion.div
                variants={itemVariants}
                className="mb-3 flex shrink-0 flex-col items-center text-center"
              >
                <img
                  src="/image/logo.png"
                  alt="Probashi Seba logo"
                  className="mb-1 h-11 w-11 object-contain sm:h-12 sm:w-12"
                />

                <h2 className="text-xl font-extrabold tracking-tight text-[var(--color-heading)]">
                  Probashi Seba
                </h2>

                <p className="text-xs leading-4 text-[var(--color-text)]">
                  National Overseas Employment
                  <br />
                  and Migrant Welfare Platform
                </p>
              </motion.div>

              {/* Heading */}
              <motion.div variants={itemVariants} className="mb-3 shrink-0">
                <h1 className="text-2xl font-extrabold tracking-tight text-[var(--color-heading)]">
                  Welcome Back
                </h1>

                <p className="mt-1 text-sm leading-5 text-[var(--color-text-muted)]">
                  Sign in to access your Probashi Seba account
                  and continue your journey.
                </p>
              </motion.div>

              {/* Account type tabs */}
              <motion.div
                variants={itemVariants}
                role="tablist"
                aria-label="Account type"
                className="mb-3 grid shrink-0 grid-cols-3 overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)]"
              >
                {accountTypes.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={userType === id}
                    onClick={() => setUserType(id)}
                    className={`relative flex min-w-0 flex-col items-center justify-center gap-1 border-r border-[var(--color-border)] px-1 py-2 text-center text-[10px] transition-colors last:border-r-0 sm:flex-row sm:gap-1.5 sm:text-xs ${
                      userType === id
                        ? "text-[var(--color-on-primary)]"
                        : "text-[var(--color-text)] hover:bg-[var(--color-secondary-hover-bg)]"
                    }`}
                  >
                    {/* Sliding highlight that moves between tabs */}
                    {userType === id && (
                      <motion.span
                        layoutId="account-type-highlight"
                        className="absolute inset-0 bg-[var(--brand-primary-dark)]"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 38,
                        }}
                      />
                    )}

                    <Icon size={17} className="relative z-10 shrink-0" />
                    <span className="relative z-10">{label}</span>
                  </button>
                ))}
              </motion.div>

              {/* Login form */}
              <form
                onSubmit={handleSubmit}
                className="flex shrink-0 flex-col gap-3"
              >
                {/* Email / mobile */}
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="emailOrMobile"
                    className="mb-1 block text-xs font-bold text-[var(--color-heading)] sm:text-sm"
                  >
                    Email or Mobile Number
                  </label>

                  <div className="input-container min-h-10">
                    <Mail size={17} className="shrink-0" />

                    <input
                      id="emailOrMobile"
                      name="emailOrMobile"
                      type="text"
                      autoComplete="username"
                      placeholder="Enter your email or mobile number"
                      required
                      className="form-input py-2 text-xs sm:text-sm"
                    />
                  </div>
                </motion.div>

                {/* Password */}
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="password"
                    className="mb-1 block text-xs font-bold text-[var(--color-heading)] sm:text-sm"
                  >
                    Password
                  </label>

                  <div className="input-container min-h-10">
                    <LockKeyhole size={17} className="shrink-0" />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      required
                      className="form-input py-2 text-xs sm:text-sm"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="shrink-0"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={showPassword ? "hide" : "show"}
                          className="block"
                          initial={{ opacity: 0, scale: 0.7, rotate: -25 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          exit={{ opacity: 0, scale: 0.7, rotate: 25 }}
                          transition={{ duration: 0.12 }}
                        >
                          {showPassword ? (
                            <EyeOff size={17} />
                          ) : (
                            <Eye size={17} />
                          )}
                        </motion.span>
                      </AnimatePresence>
                    </button>
                  </div>
                </motion.div>

                {/* Remember and forgot password */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap items-center justify-between gap-2 text-xs"
                >
                  <label className="flex cursor-pointer items-center gap-2 text-[var(--color-text)]">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(event) => setRememberMe(event.target.checked)}
                      className="h-3.5 w-3.5 accent-[var(--color-primary)]"
                    />
                    Remember me
                  </label>

                  <a
                    href="/forgot-password"
                    className="font-semibold text-[var(--color-link)] hover:underline"
                  >
                    Forgot password?
                  </a>
                </motion.div>

                {/* Sign in */}
                <motion.div
                  variants={itemVariants}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    type="submit"
                    className="primary-button min-h-10 w-full py-2 text-sm"
                  >
                    Sign In
                    <ArrowRight size={17} />
                  </button>
                </motion.div>

                {/* Divider */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]"
                >
                  <span className="h-px flex-1 bg-[var(--color-border)]" />
                  <span>OR</span>
                  <span className="h-px flex-1 bg-[var(--color-border)]" />
                </motion.div>

                {/* Government SSO */}
                <motion.div
                  variants={itemVariants}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    type="button"
                    className="secondary-button min-h-10 w-full py-2 text-xs sm:text-sm"
                    onClick={() => {
                      // Connect your Government SSO provider here.
                    }}
                  >
                    <img
                      src="/image/logo.png"
                      alt=""
                      className="h-6 w-6 shrink-0 object-contain"
                    />
                    Sign in with Government SSO
                  </button>
                </motion.div>

                {/* Registration */}
                <motion.p
                  variants={itemVariants}
                  className="flex flex-wrap justify-center gap-1.5 pt-0.5 text-xs text-[var(--color-text-muted)]"
                >
                  Don’t have an account?

                  <a
                    href="/register"
                    className="font-semibold text-[var(--color-link)] hover:underline"
                  >
                    Register now
                  </a>
                </motion.p>
              </form>
            </motion.div>
          </section>
        </div>
      </main>
    </MotionConfig>
  );
};

export default LoginPage;