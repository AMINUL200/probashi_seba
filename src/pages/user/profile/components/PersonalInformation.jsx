
import React, { useEffect, useState } from "react";
import {
  UserRound,
  UsersRound,
  Smartphone,
  Mail,
  CalendarDays,
  Accessibility,
  ContactRound,
  MapPin,
  Pencil,
  Save,
  X,
} from "lucide-react";

const fields = [
  {
    key: "fullName",
    label: "Full Name (English)",
    icon: UserRound,
  },
  {
    key: "fullNameBangla",
    label: "Full Name (Bangla)",
    icon: UsersRound,
  },
  {
    key: "mobile",
    label: "Mobile Number",
    icon: Smartphone,
  },
  {
    key: "email",
    label: "Email Address",
    icon: Mail,
  },
  {
    key: "dateOfBirth",
    label: "Date of Birth",
    icon: CalendarDays,
  },
  {
    key: "gender",
    label: "Gender",
    icon: Accessibility,
  },
  {
    key: "nid",
    label: "National ID Number (NID)",
    icon: ContactRound,
  },
  {
    key: "district",
    label: "District",
    icon: MapPin,
  },
  {
    key: "presentAddress",
    label: "Present Address",
    icon: MapPin,
    multiline: true,
  },
  {
    key: "permanentAddress",
    label: "Permanent Address",
    icon: MapPin,
    multiline: true,
  },
];

const iconColors = [
  "bg-blue-50 text-blue-600",
  "bg-blue-50 text-blue-600",
  "bg-emerald-50 text-emerald-600",
  "bg-blue-50 text-blue-600",
  "bg-blue-50 text-blue-600",
  "bg-blue-50 text-blue-600",
  "bg-blue-50 text-blue-600",
  "bg-blue-50 text-blue-600",
  "bg-rose-50 text-rose-500",
  "bg-rose-50 text-rose-500",
];

const PersonalInformation = ({ profile, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profile);

  useEffect(() => {
    setForm(profile);
  }, [profile]);

  const handleChange = (key, value) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const handleSave = () => {
    onSave(form);
    setEditing(false);
  };

  return (
    <section className="rounded-lg border border-[#e5ebf4] bg-white p-3 sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-sm font-bold text-[#102d66]">
          Personal Information
        </h2>

        {editing ? (
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => {
                setForm(profile);
                setEditing(false);
              }}
              className="flex items-center gap-1 rounded-md border border-slate-200 px-2.5 py-1.5 text-[10px] text-slate-600 hover:bg-slate-50"
            >
              <X size={12} /> Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1 rounded-md bg-blue-600 px-2.5 py-1.5 text-[10px] font-medium text-white hover:bg-blue-700"
            >
              <Save size={12} /> Save
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="flex items-center gap-1.5 rounded-md bg-blue-50 px-3 py-1.5 text-[10px] font-semibold text-blue-600 hover:bg-blue-100"
          >
            <Pencil size={12} /> Edit
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
        {fields.map((field, index) => {
          const Icon = field.icon;
          const value = form[field.key] ?? "";

          return (
            <div
              key={field.key}
              className={`flex min-w-0 items-start gap-3 border-b border-[#edf1f7] py-2.5 last:border-b-0 ${
                index === 8 || index === 9
                  ? "min-h-[65px]"
                  : "min-h-[47px]"
              }`}
            >
              <div
                className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-md ${iconColors[index]}`}
              >
                <Icon size={15} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="mb-0.5 text-[10px] font-medium text-[#31486e]">
                  {field.label}
                </p>

                {editing ? (
                  field.multiline ? (
                    <textarea
                      value={value}
                      onChange={(event) =>
                        handleChange(field.key, event.target.value)
                      }
                      rows={2}
                      className="w-full resize-y rounded border border-slate-200 px-2 py-1.5 text-[10px] text-[#193767] outline-none focus:border-blue-400"
                    />
                  ) : field.key === "gender" ? (
                    <select
                      value={value}
                      onChange={(event) =>
                        handleChange(field.key, event.target.value)
                      }
                      className="w-full rounded border border-slate-200 bg-white px-2 py-1.5 text-[10px] text-[#193767] outline-none focus:border-blue-400"
                    >
                      <option value="">Select gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  ) : (
                    <input
                      type={field.key === "dateOfBirth" ? "date" : "text"}
                      value={value}
                      onChange={(event) =>
                        handleChange(field.key, event.target.value)
                      }
                      className="w-full rounded border border-slate-200 px-2 py-1.5 text-[10px] text-[#193767] outline-none focus:border-blue-400"
                    />
                  )
                ) : (
                  <p className="whitespace-pre-line break-words text-[10px] leading-[1.45] text-[#193767]">
                    {value || "Not provided"}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PersonalInformation;
