import { useState, useEffect } from "react";
import {
  X,
  Calendar,
  ChevronDown,
  FileText,
  Plus,
  Trash2,
  Save,
} from "lucide-react";

/* ─── helpers ──────────────────────────────────────────────────────────── */
const parseSkills = (raw) => {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.filter(Boolean);
  if (typeof raw === "object") return Object.values(raw).filter(Boolean);
  return [];
};

const Field = ({ label, half = false, children }) => (
  <div className={half ? "w-1/2" : "w-full"}>
    <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
    {children}
  </div>
);

const Input = ({ value, onChange, placeholder, type = "text" }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
  />
);

/* ─── main component ────────────────────────────────────────────────────── */
export default function EditCandidateOverlay({
  data,
  onClose,
  onSave,
  onDelete,
}) {
  const [form, setForm] = useState({
    candidate_name: data?.candidate_name || "",
    email: data?.email || "",
    phone: data?.phone || "",
    location: data?.location || "",
    job_type: data?.job_type || "Full-time",
    expected_salary: data?.expected_salary || "",
    date_of_birth: data?.date_of_birth
      ? new Date(data.date_of_birth).toISOString().split("T")[0]
      : "",
    gender: data?.gender || "",
    linkedin: data?.linkedin || "",
    expected_ctc: data?.expected_ctc || "",
    current_ctc: data?.current_ctc || "",
    notice_period: data?.notice_period || "",
    description: data?.description || "",
  });

  const [skills, setSkills] = useState(() => parseSkills(data?.skills));
  const [newSkill, setNewSkill] = useState("");
  const [resume, setResume] = useState(null);
  const [cover, setCover] = useState(null);
  const [portfolio, setPortfolio] = useState(null);

  /* scroll lock */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  /* escape key */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed) {
      setSkills((s) => [...s, trimmed]);
      setNewSkill("");
    }
  };

  const handleSave = () => {
    onSave?.({ ...data, ...form, skills, files: { resume, cover, portfolio } });
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      onDelete?.(data?.id);
      onClose();
    }
  };

  /* ── upload zone ── */
  const UploadZone = ({ label, file, setFile }) => (
    <div>
      <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
      <label className="flex flex-col items-center justify-center gap-1.5 min-h-[76px] border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-red-400 hover:bg-red-50 transition-all">
        <input
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        {file ? (
          <>
            <FileText size={20} className="text-red-500" />
            <span className="text-xs text-red-500 font-medium text-center px-1 truncate w-full text-center">
              {file.name}
            </span>
          </>
        ) : (
          <span className="text-xs text-gray-400 text-center px-2">
            Click to upload PDF
          </span>
        )}
      </label>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="bg-red-600 px-5 py-4 flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2" />
              <path
                d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">Edit Candidates</p>
            <p className="text-red-200 text-xs">
              Update candidates information
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-red-200 transition-colors p-1 rounded-lg hover:bg-red-700"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Scrollable Body ─────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-5 py-5 [&::-webkit-scrollbar]:hidden space-y-4">
          {/* Candidate Name */}
          <Field label="Candidate Name">
            <Input
              value={form.candidate_name}
              onChange={set("candidate_name")}
              placeholder="Full name"
            />
          </Field>

          {/* Email + Phone */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Email">
              <Input
                value={form.email}
                onChange={set("email")}
                placeholder="email@example.com"
              />
            </Field>
            <Field label="Phone">
              <Input
                value={form.phone}
                onChange={set("phone")}
                placeholder="+91 XXXXXXXXXX"
              />
            </Field>
          </div>

          {/* Location + Job Type */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Location">
              <Input
                value={form.location}
                onChange={set("location")}
                placeholder="City, State"
              />
            </Field>
            <Field label="Job Type">
              <div className="relative">
                <select
                  value={form.job_type}
                  onChange={set("job_type")}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Freelance</option>
                  <option>Internship</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </Field>
          </div>

          {/* Expected Salary + DOB */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Expected Salary">
              <Input
                value={form.expected_salary}
                onChange={set("expected_salary")}
                placeholder="50K – 80K LPA"
              />
            </Field>
            <Field label="DOB">
              <div className="relative">
                <input
                  type="date"
                  value={form.date_of_birth}
                  onChange={set("date_of_birth")}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 pr-8 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                />
                <Calendar
                  size={13}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </Field>
          </div>

          {/* Gender + LinkedIn */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Gender">
              <Input
                value={form.gender}
                onChange={set("gender")}
                placeholder="Male / Female / Other"
              />
            </Field>
            <Field label="LinkedIn">
              <Input
                value={form.linkedin}
                onChange={set("linkedin")}
                placeholder="https://linkedin.com/in/..."
              />
            </Field>
          </div>

          {/* Expected CTC + Current CTC */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Expected CTC">
              <Input
                value={form.expected_ctc}
                onChange={set("expected_ctc")}
                placeholder="35K – 45K LPA"
              />
            </Field>
            <Field label="Current CTC">
              <Input
                value={form.current_ctc}
                onChange={set("current_ctc")}
                placeholder="28K LPA"
              />
            </Field>
          </div>

          {/* Notice Period */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Notice Period">
              <div className="relative">
                <input
                  type="date"
                  value={form.notice_period}
                  onChange={set("notice_period")}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 pr-8 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                />
                <Calendar
                  size={13}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </Field>
          </div>

          <hr className="border-gray-100" />

          {/* Skills & Expertise */}
          <div>
            <p className="text-xs font-medium text-gray-500 mb-2">
              Skills &amp; Expertise
            </p>
            <div className="space-y-2">
              {skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    value={skill}
                    onChange={(e) => {
                      const updated = [...skills];
                      updated[i] = e.target.value;
                      setSkills(updated);
                    }}
                    className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                  />
                  <button
                    onClick={() =>
                      setSkills((s) => s.filter((_, idx) => idx !== i))
                    }
                    className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                  >
                    <X size={15} />
                  </button>
                </div>
              ))}

              {/* add skill row */}
              <div className="flex items-center gap-2">
                <input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addSkill()}
                  placeholder="Add a skill..."
                  className="flex-1 border border-dashed border-gray-300 rounded-xl px-3 py-2.5 text-sm text-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                />
                <button
                  onClick={addSkill}
                  className="text-red-500 hover:text-red-700 transition-colors shrink-0"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={addSkill}
                className="text-red-500 text-sm font-medium hover:text-red-700 transition-colors"
              >
                + Add Skills
              </button>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* File Uploads */}
          <div className="grid grid-cols-3 gap-3">
            <UploadZone
              label="Attach Resume* (PDF)"
              file={resume}
              setFile={setResume}
            />
            <UploadZone
              label="Attach Cover Letter (PDF)"
              file={cover}
              setFile={setCover}
            />
            <UploadZone
              label="Attach Portfolio (PDF)"
              file={portfolio}
              setFile={setPortfolio}
            />
          </div>

          {/* Description */}
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">
              Description
            </p>
            <textarea
              value={form.description}
              onChange={set("description")}
              rows={4}
              placeholder="Add a description..."
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 bg-white resize-none focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            />
          </div>
        </div>

        {/* ── Footer ──────────────────────────────────────────────── */}
        <div className="px-5 py-4 grid grid-cols-2 gap-3 shrink-0 border-t border-gray-100">
          <button
            onClick={handleDelete}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-semibold rounded-2xl py-3 text-sm transition-all"
          >
            <Trash2 size={14} />
            Delete Candidate
          </button>
          <button
            onClick={handleSave}
            className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold rounded-2xl py-3 text-sm transition-all"
          >
            <Save size={14} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
