import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Globe,
  ChevronDown,
  UserRound,
  IdCard,
  Mail,
  Phone,
  CalendarDays,
  MapPin,
  BriefcaseBusiness,
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Check,
  Heart,
  LockKeyhole,
  Eye,
  EyeOff,
  FileCheck,
  UsersRound,
} from "lucide-react";

/* ------------------------------------------------------------------
   Static data
------------------------------------------------------------------ */

const STEPS = [
  { number: 1, label: "Basic Information" },
  { number: 2, label: "Identity Verification" },
  { number: 3, label: "Additional Details" },
  { number: 4, label: "Review & Submit" },
];

const STEP_DESCRIPTIONS = {
  1: "Please enter your basic information to create an account.",
  2: "Provide your identity information for verification.",
  3: "Tell us more about your skills and secure your account.",
  4: "Review your information before submitting your registration.",
};

const DISTRICTS = [
  "Dhaka",
  "Chattogram",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Sylhet",
  "Rangpur",
  "Mymensingh",
  "Cumilla",
  "Gazipur",
  "Narayanganj",
  "Cox's Bazar",
  "Bogura",
  "Jashore",
  "Other",
];

const OCCUPATIONS = [
  "Construction Worker",
  "Healthcare Worker",
  "Driver",
  "Electrician",
  "Technician",
  "Engineer",
  "Chef",
  "Domestic Worker",
  "Other",
];

const EDUCATION_LEVELS = [
  "Primary",
  "Secondary",
  "Higher Secondary",
  "Diploma",
  "Bachelor's Degree",
  "Master's Degree",
  "Other",
];

const EXPERIENCE_LEVELS = [
  "No experience",
  "Less than 1 year",
  "1–3 years",
  "3–5 years",
  "More than 5 years",
];

const FEATURES = [
  {
    title: "Create Your",
    subtitle: "Verified Worker ID",
    Icon: UsersRound,
    color: "bg-[#00a568]",
    ring: "border-[#86e5bf]",
  },
  {
    title: "Access Verified",
    subtitle: "Job Opportunities",
    Icon: BriefcaseBusiness,
    color: "bg-[#0866d9]",
    ring: "border-[#9dd1ff]",
  },
  {
    title: "Get Training",
    subtitle: "and Certificates",
    Icon: GraduationCap,
    color: "bg-[#823af4]",
    ring: "border-[#c5a0ff]",
  },
  {
    title: "Welfare and",
    subtitle: "Support Services",
    Icon: Heart,
    color: "bg-[#ffeded] text-[#f21928]",
    ring: "border-[#ffb5b5]",
  },
];

/* ------------------------------------------------------------------
   Shared styles
------------------------------------------------------------------ */

const labelClass = "mb-1.5 block text-[13px] font-semibold text-[#102653]";

const inputClass =
  "h-[42px] w-full min-w-0 bg-transparent px-3 text-sm text-[#102c5e] outline-none placeholder:text-slate-400";

/* ------------------------------------------------------------------
   Field wrapper
   IMPORTANT: this lives OUTSIDE RegisterPage. When a component is
   defined inside another component it is re-created on every render,
   which makes inputs lose focus after each keystroke.
------------------------------------------------------------------ */

const Field = ({
  label,
  name,
  icon: Icon,
  required = false,
  error,
  className = "",
  children,
}) => (
  <div className={`min-w-0 ${className}`}>
    <label htmlFor={name} className={labelClass}>
      {label} {required && <span className="text-red-500">*</span>}
    </label>

    <div
      className={`flex min-w-0 items-center overflow-hidden rounded-lg border bg-white transition focus-within:ring-2 ${
        error
          ? "border-red-400 focus-within:border-red-500 focus-within:ring-red-100"
          : "border-slate-300 focus-within:border-blue-500 focus-within:ring-blue-100"
      }`}
    >
      {Icon && (
        <div className="flex h-[42px] w-11 shrink-0 items-center justify-center border-r border-slate-200 text-[#315078]">
          <Icon size={18} strokeWidth={1.8} />
        </div>
      )}
      {children}
    </div>

    {error && (
      <p role="alert" className="mt-1 text-xs font-medium text-red-500">
        {error}
      </p>
    )}
  </div>
);

/* ------------------------------------------------------------------
   Page
------------------------------------------------------------------ */

const RegisterPage = () => {
  const reduceMotion = useReducedMotion();

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const [language, setLanguage] = useState("English");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    fullNameBangla: "",
    mobile: "",
    countryCode: "+880",
    email: "",
    dateOfBirth: "",
    gender: "",
    nidNumber: "",
    district: "",
    passportNumber: "",
    occupation: "",
    education: "",
    overseasExperience: "",
    destinationCountry: "",
    password: "",
    confirmPassword: "",
  });

  /* ---------- helpers ---------- */

  const clearError = (name) =>
    setErrors((previous) => {
      if (!previous[name]) return previous;
      const next = { ...previous };
      delete next[name];
      return next;
    });

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    clearError(name);
  };

  const goToStep = (nextStep) => {
    setDirection(nextStep > step ? 1 : -1);
    setStep(nextStep);
  };

  /* ---------- validation ---------- */

  const validateStep = (stepNumber) => {
    const next = {};
    const text = (name) => String(formData[name] || "").trim();

    if (stepNumber === 1) {
      if (!text("fullName")) next.fullName = "Enter your full name.";
      if (!text("fullNameBangla"))
        next.fullNameBangla = "Enter your name in Bangla.";

      if (!text("mobile")) {
        next.mobile = "Enter your mobile number.";
      } else if (!/^[0-9+\-\s()]{7,20}$/.test(formData.mobile)) {
        next.mobile = "Enter a valid mobile number.";
      }

      if (text("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        next.email = "Enter a valid email address.";
      }

      if (!text("dateOfBirth"))
        next.dateOfBirth = "Select your date of birth.";
      if (!text("gender")) next.gender = "Select your gender.";

      if (!acceptedTerms)
        next.acceptedTerms =
          "Accept the Terms of Service and Privacy Policy to continue.";
    }

    if (stepNumber === 2) {
      if (!text("nidNumber")) {
        next.nidNumber = "Enter your NID number.";
      } else if (!/^(\d{10}|\d{13}|\d{17})$/.test(text("nidNumber"))) {
        next.nidNumber = "NID must be 10, 13 or 17 digits.";
      }

      if (!text("district")) next.district = "Select your district.";

      if (
        text("passportNumber") &&
        !/^[A-Za-z0-9]{6,9}$/.test(text("passportNumber"))
      ) {
        next.passportNumber = "Enter a valid passport number.";
      }
    }

    if (stepNumber === 3) {
      if (!text("occupation")) next.occupation = "Select your occupation.";
      if (!text("education")) next.education = "Select your education level.";

      if (!formData.password) {
        next.password = "Create a password.";
      } else if (formData.password.length < 8) {
        next.password = "Use at least 8 characters.";
      }

      if (!formData.confirmPassword) {
        next.confirmPassword = "Confirm your password.";
      } else if (formData.password !== formData.confirmPassword) {
        next.confirmPassword = "Passwords do not match.";
      }
    }

    return next;
  };

  const showErrors = (found) => {
    setErrors(found);
    const firstKey = Object.keys(found)[0];
    if (firstKey) {
      requestAnimationFrame(() => {
        document.getElementById(firstKey)?.focus();
      });
    }
  };

  /* ---------- actions ---------- */

  const handleNext = (event) => {
    event.preventDefault();

    const found = validateStep(step);
    if (Object.keys(found).length > 0) {
      showErrors(found);
      return;
    }

    setErrors({});
    goToStep(Math.min(step + 1, STEPS.length));
  };

  const handleBack = () => {
    setErrors({});
    goToStep(Math.max(step - 1, 1));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Re-check every step before final submit.
    for (const stepNumber of [1, 2, 3]) {
      const found = validateStep(stepNumber);
      if (Object.keys(found).length > 0) {
        goToStep(stepNumber);
        showErrors(found);
        return;
      }
    }

    // Connect your registration API here.
    // Never log or expose passwords.
    setSubmitted(true);
  };

  /* ---------- small render helpers (plain functions, not components) ---------- */

  const renderInput = (name, placeholder, type = "text", extra = {}) => (
    <input
      id={name}
      name={name}
      type={type}
      value={formData[name]}
      onChange={updateField}
      placeholder={placeholder}
      aria-invalid={Boolean(errors[name])}
      className={inputClass}
      {...extra}
    />
  );

  const renderSelect = (label, name, placeholder, Icon, options, required) => (
    <Field
      label={label}
      name={name}
      icon={Icon}
      required={required}
      error={errors[name]}
    >
      <div className="relative min-w-0 flex-1">
        <select
          id={name}
          name={name}
          value={formData[name]}
          onChange={updateField}
          aria-invalid={Boolean(errors[name])}
          className="h-[42px] w-full min-w-0 cursor-pointer appearance-none bg-transparent pl-3 pr-9 text-sm text-[#102c5e] outline-none"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
        />
      </div>
    </Field>
  );

  const renderPassword = (
    name,
    label,
    placeholder,
    visible,
    setVisible
  ) => (
    <Field
      label={label}
      name={name}
      icon={LockKeyhole}
      required
      error={errors[name]}
    >
      {renderInput(name, placeholder, visible ? "text" : "password", {
        autoComplete: "new-password",
      })}
      <button
        type="button"
        onClick={() => setVisible((previous) => !previous)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="mr-3 shrink-0 text-slate-500 hover:text-slate-700"
      >
        {visible ? <EyeOff size={17} /> : <Eye size={17} />}
      </button>
    </Field>
  );

  /* ---------- step content ---------- */

  const renderStepContent = () => {
    if (step === 1) {
      return (
        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
          <Field
            label="Full Name (English)"
            name="fullName"
            icon={UserRound}
            required
            error={errors.fullName}
          >
            {renderInput("fullName", "Enter your full name", "text", {
              autoComplete: "name",
            })}
          </Field>

          <Field
            label="Full Name (Bangla)"
            name="fullNameBangla"
            icon={IdCard}
            required
            error={errors.fullNameBangla}
          >
            {renderInput("fullNameBangla", "আপনার পূর্ণ নাম লিখুন")}
          </Field>

          <Field
            label="Mobile Number"
            name="mobile"
            icon={Phone}
            required
            error={errors.mobile}
          >
            <select
              aria-label="Country calling code"
              name="countryCode"
              value={formData.countryCode}
              onChange={updateField}
              className="h-[42px] w-[76px] shrink-0 border-r border-slate-200 bg-white px-2 text-xs text-[#102c5e] outline-none sm:w-[84px]"
            >
              <option value="+880">+880</option>
              <option value="+91">+91</option>
              <option value="+971">+971</option>
              <option value="+966">+966</option>
              <option value="+974">+974</option>
              <option value="+965">+965</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
            {renderInput("mobile", "Enter mobile number", "tel", {
              autoComplete: "tel-national",
              inputMode: "tel",
            })}
          </Field>

          <Field
            label="Email Address"
            name="email"
            icon={Mail}
            error={errors.email}
          >
            {renderInput("email", "Enter your email address", "email", {
              autoComplete: "email",
            })}
          </Field>

          <Field
            label="Date of Birth"
            name="dateOfBirth"
            icon={CalendarDays}
            required
            error={errors.dateOfBirth}
          >
            {renderInput("dateOfBirth", "", "date", {
              max: new Date().toISOString().split("T")[0],
            })}
          </Field>

          {renderSelect(
            "Gender",
            "gender",
            "Select gender",
            UserRound,
            ["Male", "Female", "Other"],
            true
          )}

          <div className="sm:col-span-2">
            <label className="flex items-start gap-2 text-xs leading-5 text-[#294367]">
              <input
                id="acceptedTerms"
                type="checkbox"
                checked={acceptedTerms}
                onChange={(event) => {
                  setAcceptedTerms(event.target.checked);
                  clearError("acceptedTerms");
                }}
                className="mt-1 h-4 w-4 shrink-0 accent-blue-600"
              />
              <span>
                I agree to the{" "}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Privacy Policy
                </a>{" "}
                <span className="font-bold text-red-500">*</span>
              </span>
            </label>
            {errors.acceptedTerms && (
              <p role="alert" className="mt-1 text-xs font-medium text-red-500">
                {errors.acceptedTerms}
              </p>
            )}
          </div>
        </div>
      );
    }

    if (step === 2) {
      return (
        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 sm:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                <ShieldCheck size={23} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#102c5e]">
                  Identity Information
                </h4>
                <p className="mt-1 text-xs leading-5 text-slate-600">
                  Enter your NID details and your passport number if you
                  already have one.
                </p>
              </div>
            </div>
          </div>

          <Field
            label="National ID Number"
            name="nidNumber"
            icon={IdCard}
            required
            error={errors.nidNumber}
          >
            {renderInput("nidNumber", "Enter your NID number", "text", {
              inputMode: "numeric",
            })}
          </Field>

          {renderSelect(
            "District",
            "district",
            "Select district",
            MapPin,
            DISTRICTS,
            true
          )}

          <Field
            label="Passport Number"
            name="passportNumber"
            icon={FileCheck}
            error={errors.passportNumber}
            className="sm:col-span-2"
          >
            {renderInput("passportNumber", "Enter passport number (optional)")}
          </Field>

          <p className="text-xs leading-5 text-slate-500 sm:col-span-2">
            Passport information is optional for now. Connect an official
            identity verification service for document checks.
          </p>
        </div>
      );
    }

    if (step === 3) {
      return (
        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
          {renderSelect(
            "Occupation",
            "occupation",
            "Select occupation",
            BriefcaseBusiness,
            OCCUPATIONS,
            true
          )}

          {renderSelect(
            "Education Level",
            "education",
            "Select education",
            GraduationCap,
            EDUCATION_LEVELS,
            true
          )}

          {renderSelect(
            "Overseas Experience",
            "overseasExperience",
            "Select experience",
            BriefcaseBusiness,
            EXPERIENCE_LEVELS,
            false
          )}

          <Field
            label="Preferred Destination Country"
            name="destinationCountry"
            icon={Globe}
          >
            {renderInput("destinationCountry", "Enter destination country")}
          </Field>

          <div className="border-t border-slate-100 pt-3 sm:col-span-2">
            <h4 className="text-sm font-bold text-[#102c5e]">
              Create Your Password
            </h4>
            <p className="mt-1 text-xs text-slate-500">
              Use at least 8 characters.
            </p>
          </div>

          {renderPassword(
            "password",
            "Password",
            "Create password",
            showPassword,
            setShowPassword
          )}

          {renderPassword(
            "confirmPassword",
            "Confirm Password",
            "Confirm password",
            showConfirmPassword,
            setShowConfirmPassword
          )}
        </div>
      );
    }

    const reviewFields = [
      ["Full Name", formData.fullName],
      ["Bangla Name", formData.fullNameBangla],
      ["Mobile Number", `${formData.countryCode} ${formData.mobile}`],
      ["Email", formData.email || "Not provided"],
      ["Date of Birth", formData.dateOfBirth],
      ["Gender", formData.gender],
      ["NID Number", formData.nidNumber],
      ["District", formData.district],
      ["Passport", formData.passportNumber || "Not provided"],
      ["Occupation", formData.occupation],
      ["Education", formData.education],
      ["Overseas Experience", formData.overseasExperience || "Not provided"],
      ["Destination Country", formData.destinationCountry || "Not provided"],
    ];

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
            <Check size={22} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-green-900">
              Review Your Registration
            </h4>
            <p className="mt-1 text-xs text-green-800">
              Make sure your information is correct before submitting.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {reviewFields.map(([label, value]) => (
            <div
              key={label}
              className="rounded-lg border border-slate-200 bg-slate-50 p-3"
            >
              <p className="text-[11px] text-slate-500">{label}</p>
              <p className="mt-1 break-words text-sm font-semibold text-[#102c5e]">
                {value || "Not provided"}
              </p>
            </div>
          ))}
        </div>

        <p className="text-xs leading-5 text-slate-500">
          By submitting, you confirm that the information you provided is
          accurate.
        </p>
      </div>
    );
  };

  /* ---------- animation ---------- */

  const slideVariants = {
    enter: (dir) => ({
      x: reduceMotion ? 0 : dir > 0 ? 56 : -56,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({
      x: reduceMotion ? 0 : dir > 0 ? -56 : 56,
      opacity: 0,
    }),
  };

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  /* ---------- render ---------- */

  return (
    <main className="h-dvh w-full overflow-hidden bg-[#eaf6ff] p-0 text-[#102653] sm:p-3 lg:p-4">
      <div className="mx-auto grid h-full w-full max-w-[1800px] grid-cols-1 overflow-hidden bg-white shadow-[0_12px_40px_rgba(16,64,120,0.08)] sm:rounded-2xl lg:grid-cols-[1.1fr_0.9fr]">
        {/* LEFT PROMOTIONAL PANEL */}
        <section className="relative hidden h-full min-h-0 overflow-hidden bg-[#d9efff] lg:block">
          <img
            src="/image/signup_image.png"
            alt="Bangladeshi overseas workers and global employment opportunities"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#eff9ff]/80 via-[#eff9ff]/35 to-transparent" />

          <div className="relative z-10 flex h-full flex-col px-6 pt-5 xl:px-9 xl:pt-7">
            <div className="flex shrink-0 items-center gap-3">
              <img
                src="/image/logo.png"
                alt="Probashi Seba logo"
                className="h-14 w-14 shrink-0 object-contain xl:h-[68px] xl:w-[68px]"
              />
              <div>
                <h2 className="text-xl font-extrabold leading-tight tracking-tight text-[#0b2862] xl:text-[26px]">
                  Probashi Seba
                </h2>
                <p className="mt-1 text-[11px] leading-[15px] text-[#102653] xl:text-xs">
                  National Overseas Employment
                  <br />
                  and Migrant Welfare Platform
                </p>
              </div>
            </div>

            <div className="mt-6 max-w-[450px] shrink-0 xl:mt-8">
              <h1 className="text-[29px] font-extrabold leading-[1.09] tracking-tight text-[#0b2862] xl:text-[39px]">
                A Safer,
                <br />
                Brighter Future
                <br />
                <span className="text-[#0866f5]">
                  for Bangladesh’s
                  <br />
                  Overseas Workers
                </span>
              </h1>

              <p className="mt-3 max-w-[390px] text-[13px] leading-[1.55] text-[#102653] xl:text-[15px]">
                A unified government platform for registration, training,
                overseas employment, welfare support and reintegration.
              </p>
            </div>

            <div className="mt-5 flex shrink-0 flex-col gap-3 xl:mt-6 xl:gap-4">
              {FEATURES.map(({ title, subtitle, Icon, color, ring }) => (
                <div key={title} className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[5px] ${ring} ${color} xl:h-13 xl:w-13`}
                  >
                    <Icon
                      size={23}
                      strokeWidth={2.3}
                      fill={title === "Welfare and" ? "currentColor" : "none"}
                    />
                  </div>
                  <p className="text-[13px] font-bold leading-[1.35] text-[#102653] xl:text-[15px]">
                    {title}
                    <br />
                    {subtitle}
                  </p>
                </div>
              ))}
            </div>

            <div className="min-h-4 flex-1" />
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
            <svg
              viewBox="0 0 800 230"
              preserveAspectRatio="none"
              className="h-[145px] w-full xl:h-[185px]"
              aria-hidden="true"
            >
              <path
                fill="#0755a6"
                d="M0 15 C155 10 250 100 390 150 C540 205 680 170 800 115 L800 230 L0 230 Z"
              />
              <path
                fill="#073d7d"
                d="M0 58 C150 60 260 140 410 175 C550 210 680 185 800 145 L800 230 L0 230 Z"
              />
              <path
                fill="#052653"
                d="M0 105 C145 110 265 170 410 195 C565 220 690 205 800 175 L800 230 L0 230 Z"
              />
              <path
                d="M0 15 C155 10 250 100 390 150 C540 205 680 170 800 115"
                fill="none"
                stroke="#1685ff"
                strokeWidth="3"
              />
            </svg>

            <div className="absolute bottom-4 left-6 xl:bottom-5 xl:left-9">
              <p className="font-serif text-[20px] italic leading-[1.15] text-white xl:text-[24px]">
                Your Skills
                <br />
                Our Support
                <br />
                A Global Tomorrow
              </p>
              <div className="mt-2 flex h-[3px] w-36 -rotate-6 overflow-hidden rounded-full">
                <span className="w-1/3 bg-red-500" />
                <span className="w-1/3 bg-white" />
                <span className="w-1/3 bg-green-500" />
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT REGISTRATION PANEL */}
        <section className="flex h-full min-h-0 min-w-0 flex-col overflow-y-auto bg-[#f7fbff] px-4 py-3 sm:px-7 sm:py-4 lg:overflow-hidden lg:px-6 xl:px-8">
          {/* Header */}
          <header className="flex shrink-0 items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <img
                src="/image/logo.png"
                alt="Probashi Seba logo"
                className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14"
              />
              <div className="min-w-0">
                <h2 className="text-lg font-extrabold leading-6 tracking-tight text-[#0b2862] sm:text-xl">
                  Probashi Seba
                </h2>
                <p className="text-[10px] leading-[14px] text-[#19345e] sm:text-[11px]">
                  National Overseas Employment
                  <br />
                  and Migrant Welfare Platform
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1.5">
              <Globe size={21} className="text-[#102c5e]" />
              <select
                aria-label="Select language"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="max-w-[100px] cursor-pointer bg-transparent text-xs font-medium text-[#102c5e] outline-none sm:text-sm"
              >
                <option value="English">English</option>
                <option value="বাংলা">বাংলা</option>
                <option value="العربية">العربية</option>
              </select>
            </div>
          </header>

          {/* Stepper */}
          <div className="relative mt-4 shrink-0 px-1 sm:mt-5">
            <div className="absolute left-[12.5%] right-[12.5%] top-4 -mt-px h-0.5 bg-[#cbd9ed]">
              <motion.div
                className="h-full bg-green-600"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeInOut" }}
              />
            </div>

            <div className="relative grid grid-cols-4 gap-1">
              {STEPS.map((item) => {
                const completed = step > item.number;
                const active = step === item.number;

                return (
                  <button
                    key={item.number}
                    type="button"
                    disabled={!completed}
                    onClick={() => completed && goToStep(item.number)}
                    className="flex min-w-0 flex-col items-center gap-1.5 text-center disabled:cursor-default"
                    aria-current={active ? "step" : undefined}
                  >
                    <span
                      className={`z-10 flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition-colors duration-300 ${
                        active
                          ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                          : completed
                          ? "border-green-600 bg-green-600 text-white"
                          : "border-[#cbd5e1] bg-white text-[#28436b]"
                      }`}
                    >
                      {completed ? <Check size={16} /> : item.number}
                    </span>

                    <span
                      className={`text-[10px] leading-4 sm:text-xs ${
                        active ? "font-semibold text-[#0b2862]" : "text-[#526585]"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Page title */}
          <div className="mb-3 mt-4 shrink-0 sm:mt-5">
            <h1 className="text-2xl font-extrabold tracking-tight text-[#0b2862] sm:text-[27px]">
              Create Your Account
            </h1>
            <p className="mt-1 text-xs leading-5 text-[#405879] sm:text-sm">
              Take the first step towards a safer and brighter future.
            </p>
          </div>

          {/* Form card */}
          <form
            onSubmit={step === STEPS.length ? handleSubmit : handleNext}
            noValidate
            className="flex flex-col rounded-xl border border-white bg-white p-4 shadow-[0_6px_24px_rgba(34,82,135,0.04)] sm:p-5 lg:min-h-0 lg:flex-1"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-1 flex-col items-center justify-center py-10 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <Check size={34} strokeWidth={2.5} />
                </div>
                <h3 className="mt-4 text-xl font-bold text-[#0b2862]">
                  Registration submitted
                </h3>
                <p className="mt-2 max-w-[360px] text-sm leading-6 text-[#405879]">
                  Your account request has been received. You can sign in once
                  your details are verified.
                </p>
                <a
                  href="/login"
                  className="mt-5 inline-flex h-11 items-center justify-center rounded-lg bg-[#073d7d] px-6 text-sm font-semibold text-white transition hover:bg-[#052e60]"
                >
                  Go to Sign In
                </a>
              </motion.div>
            ) : (
              <>
                {/* Step header */}
                <div className="mb-3 shrink-0 sm:mb-4">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <h3 className="text-lg font-bold tracking-tight text-[#0b2862] sm:text-xl">
                        {STEPS[step - 1].label}
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-[#405879] sm:text-sm">
                        {STEP_DESCRIPTIONS[step]}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Sliding step content.
                    On desktop this area scrolls inside the card only if the
                    screen is very short, so the page itself never scrolls. */}
                <div className="custom-scrollbar overflow-x-hidden px-1 py-1 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
                  <AnimatePresence mode="wait" initial={false} custom={direction}>
                    <motion.div
                      key={step}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
                    >
                      {renderStepContent()}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Actions */}
                <div className="mt-4 flex shrink-0 items-center gap-3 border-t border-slate-200 pt-4">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-[#17345f] transition hover:bg-slate-50"
                    >
                      <ArrowLeft size={17} />
                      Back
                    </button>
                  )}

                  <button
                    type="submit"
                    className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#073d7d] px-4 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(7,61,125,0.15)] transition hover:bg-[#052e60] focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
                  >
                    {step === STEPS.length ? "Submit Registration" : "Next Step"}
                    {step === STEPS.length ? (
                      <Check size={18} />
                    ) : (
                      <ArrowRight size={18} />
                    )}
                  </button>
                </div>
              </>
            )}
          </form>

          {/* Footer */}
          <footer className="flex shrink-0 items-center justify-center gap-1.5 py-3 text-xs text-[#405879] sm:text-sm">
            <span>Already have an account?</span>
            <a href="/login" className="font-bold text-blue-600 hover:underline">
              Sign In
            </a>
          </footer>
        </section>
      </div>
    </main>
  );
};

export default RegisterPage;