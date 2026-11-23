"use client";

import React, { useState, useEffect } from "react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Atom,
  Award,
  BookOpen,
  BrainCircuit,
  Calendar,
  CheckCircle2,
  FlaskConical,
  Globe,
  GraduationCap,
  Lock,
  LogIn,
  LogOut,
  MessageCircle,
  Moon,
  Plus,
  RotateCcw,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  Sun,
  Trash2,
  Trophy,
  UserCheck,
  UserPlus,
  Users,
  X,
  XCircle,
} from "lucide-react";
import {
  ATOMIC_ELEMENTS,
  CATEGORY_STYLES,
  ElementCategory,
  PeriodicElement,
} from "@/data/periodicElements";
import {
  AdminLog,
  ExamQuestion,
  GRADE_CARDS,
  GRADE_LABELS,
  GradeKey,
  INITIAL_ADMIN_LOGS,
  INITIAL_COURSES,
  INITIAL_QUESTIONS,
  INITIAL_STUDENTS,
  Language,
  MistakeRecord,
  PlatformCourse,
  RegisteredStudent,
  UI_COPY,
  UserRole,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
} from "@/data/platformData";
import {
  ADMIN_ACCESS_CODE,
  createStudentRecord,
  filterAtomicElements,
  syncMistakeOnAnswer,
  verifyAdminLogin,
} from "@/lib/platformEngine";

type ActivePage = "landing" | "student-hub" | "admin-dashboard";

export default function ChemistryProV8Page() {
  const [lang, setLang] = useState<Language>("ar");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<ActivePage>("landing");
  const [role, setRole] = useState<UserRole>("guest");
  const [currentUserName, setCurrentUserName] = useState<string>("");

  const [selectedGrade, setSelectedGrade] = useState<GradeKey>("all");
  const [courses, setCourses] = useState<PlatformCourse[]>(INITIAL_COURSES);
  const [students, setStudents] = useState<RegisteredStudent[]>(INITIAL_STUDENTS);
  const [questions, setQuestions] = useState<ExamQuestion[]>(INITIAL_QUESTIONS);
  const [mistakes, setMistakes] = useState<MistakeRecord[]>([
    { questionId: "q2", selectedOptionIndex: 0, attempts: 1, mastered: false },
  ]);
  const [adminLogs, setAdminLogs] = useState<AdminLog[]>(INITIAL_ADMIN_LOGS);

  // Atomic Periodic Table state
  const [elementQuery, setElementQuery] = useState<string>("");
  const [elementCategory, setElementCategory] = useState<ElementCategory | "all">("all");
  const [selectedElement, setSelectedElement] = useState<PeriodicElement>(ATOMIC_ELEMENTS[25]); // Fe (26) by default

  const [authModal, setAuthModal] = useState<"login" | "register" | null>(null);
  const [authModeTab, setAuthModeTab] = useState<"student" | "admin">("student");

  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginSecret, setLoginSecret] = useState("");
  const [authError, setAuthError] = useState("");

  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regGrade, setRegGrade] = useState<"g10" | "g11" | "g12">("g12");
  const [regPlan, setRegPlan] = useState<"VIP" | "Standard">("VIP");
  const [regError, setRegError] = useState("");

  const [studentSection, setStudentSection] = useState<"courses" | "exam" | "mistakes">("courses");
  const [qIndex, setQIndex] = useState(0);
  const [chosenOpt, setChosenOpt] = useState<number | null>(null);
  const [submittedQ, setSubmittedQ] = useState(false);
  const [score, setScore] = useState(0);
  const [retryingQId, setRetryingQId] = useState<string | null>(null);
  const [retryOpt, setRetryOpt] = useState<number | null>(null);
  const [retryWrongMsg, setRetryWrongMsg] = useState(false);

  const [adminSection, setAdminSection] = useState<"students" | "courses" | "questions" | "logs">(
    "students"
  );
  const [studentQuery, setStudentQuery] = useState("");
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseGrade, setNewCourseGrade] = useState<"g10" | "g11" | "g12">("g12");
  const [newCoursePrice, setNewCoursePrice] = useState("150 جنيه");
  const [newCourseFree, setNewCourseFree] = useState(false);

  const [newQText, setNewQText] = useState("");
  const [newQOpts, setNewQOpts] = useState(["", "", "", ""]);
  const [newQCorrect, setNewQCorrect] = useState(0);

  const t = UI_COPY[lang];
  const isRtl = lang === "ar";

  useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, isRtl]);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const addAdminLog = (arText: string, enText: string) => {
    setAdminLogs((prev) => [
      {
        id: `l_${Date.now()}`,
        text: { ar: arText, en: enText },
        time: { ar: "الآن", en: "Just now" },
      },
      ...prev.slice(0, 19),
    ]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const openAdminDashboard = () => {
    if (role === "admin") {
      setActivePage("admin-dashboard");
      return;
    }
    setAuthModeTab("admin");
    setAuthError("");
    setLoginIdentifier("admin");
    setLoginSecret("");
    setAuthModal("login");
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    if (authModeTab === "admin") {
      if (!verifyAdminLogin(loginIdentifier, loginSecret)) {
        setAuthError(
          lang === "ar"
            ? `بيانات الأدمن غير صحيحة. الكود التجريبي هو: ${ADMIN_ACCESS_CODE}`
            : `Invalid admin credentials. Demo code: ${ADMIN_ACCESS_CODE}`
        );
        return;
      }
      setRole("admin");
      setCurrentUserName(lang === "ar" ? "مستر كيمياء برو (الأدمن)" : "ChemistryPro (Admin)");
      setAuthModal(null);
      setActivePage("admin-dashboard");
      addAdminLog(
        "سجّل الأدمن دخوله وفتح لوحة تحكم الإدارة.",
        "Admin signed in and opened the dashboard."
      );
      return;
    }

    const found = students.find(
      (s) => s.phone.trim() === loginIdentifier.trim() || s.name.trim() === loginIdentifier.trim()
    );
    if (!found) {
      setAuthError(
        lang === "ar"
          ? "لم يتم العثور على حساب طالب بهذا الرقم أو الاسم. يمكنك إنشاء حساب جديد."
          : "No student account found with that name or phone. You can create a new account."
      );
      return;
    }
    if (found.status === "Suspended") {
      setAuthError(
        lang === "ar" ? "هذا الحساب موقوف حاليًا من الإدارة." : "This account is currently suspended."
      );
      return;
    }
    setRole("student");
    setCurrentUserName(found.name);
    setAuthModal(null);
    setActivePage("student-hub");
    addAdminLog(
      `سجّل الطالب (${found.name}) دخوله إلى المنصة.`,
      `Student (${found.name}) signed in to the platform.`
    );
  };

  const handleRegisterStudent = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError("");
    if (!regName.trim() || regPhone.trim().length < 8) {
      setRegError(
        lang === "ar"
          ? "من فضلك أدخل اسم الطالب ورقم هاتف صحيح."
          : "Please enter a valid student name and phone number."
      );
      return;
    }
    const created = createStudentRecord({
      name: regName,
      phone: regPhone,
      grade: regGrade,
      plan: regPlan,
    });
    setStudents((prev) => [created, ...prev]);
    setRole("student");
    setCurrentUserName(created.name);
    setAuthModal(null);
    setActivePage("student-hub");
    addAdminLog(
      `طالب جديد سجّل حسابه: ${created.name} (${created.gradeLabel.ar} - ${created.plan}).`,
      `New student registered: ${created.name} (${created.gradeLabel.en} - ${created.plan}).`
    );
    setRegName("");
    setRegPhone("");
  };

  const handleLogout = () => {
    setRole("guest");
    setCurrentUserName("");
    setActivePage("landing");
  };

  const handleCourseAction = (course: PlatformCourse) => {
    if (role === "guest") {
      setAuthModeTab("student");
      setAuthModal("register");
      return;
    }
    setCourses((prev) =>
      prev.map((c) => (c.id === course.id ? { ...c, enrolled: true } : c))
    );
    setActivePage("student-hub");
    setStudentSection("courses");
    addAdminLog(
      `تم الاشتراك/الدخول في (${course.title.ar}) بواسطة ${currentUserName || "طالب"}.`,
      `Enrolled/opened (${course.title.en}) by ${currentUserName || "Student"}.`
    );
  };

  const activeMistakes = mistakes.filter((m) => !m.mastered);
  const currentQ = questions[qIndex];

  const handleExamCheck = () => {
    if (chosenOpt === null || !currentQ) return;
    const { isCorrect, updatedMistakes } = syncMistakeOnAnswer(mistakes, currentQ, chosenOpt);
    setMistakes(updatedMistakes);
    if (isCorrect) setScore((s) => s + 1);
    else
      addAdminLog(
        `خطأ جديد في سؤال (${currentQ.topic.ar}) أُضيف لبنك الأخطاء.`,
        `New mistake on (${currentQ.topic.en}) added to Mistakes Bank.`
      );
    setSubmittedQ(true);
  };

  const handleNextQuestion = () => {
    setChosenOpt(null);
    setSubmittedQ(false);
    setQIndex((prev) => (prev + 1) % questions.length);
  };

  const handleMistakeRetry = (q: ExamQuestion) => {
    if (retryOpt === null) return;
    const { isCorrect, updatedMistakes } = syncMistakeOnAnswer(mistakes, q, retryOpt);
    setMistakes(updatedMistakes);
    if (isCorrect) {
      setRetryingQId(null);
      setRetryOpt(null);
      setRetryWrongMsg(false);
      addAdminLog(
        `تم إتقان سؤال (${q.topic.ar}) وإخراجه من الأخطاء النشطة.`,
        `Mastered question (${q.topic.en}) and cleared from active mistakes.`
      );
    } else {
      setRetryWrongMsg(true);
    }
  };

  const handleAddCourseAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) return;
    const item: PlatformCourse = {
      id: `crs_${Date.now()}`,
      grade: newCourseGrade,
      gradeLabel: GRADE_LABELS[newCourseGrade],
      title: { ar: newCourseTitle.trim(), en: newCourseTitle.trim() },
      description: {
        ar: "كورس مضاف مباشرة من لوحة تحكم الأدمن.",
        en: "Course published directly from the Admin Dashboard.",
      },
      priceLabel: newCourseFree
        ? { ar: "كورس مجاني", en: "Free Course" }
        : { ar: newCoursePrice || "150 جنيه", en: newCoursePrice || "150 EGP" },
      isFree: newCourseFree,
      startDate: { ar: "متاح الآن", en: "Available Now" },
      formula: "ΔH = H_products − H_reactants",
      enrolled: true,
    };
    setCourses((prev) => [item, ...prev]);
    addAdminLog(`أضاف الأدمن كورسًا جديدًا: "${item.title.ar}".`, `Admin added course: "${item.title.en}".`);
    setNewCourseTitle("");
  };

  const handleAddQuestionAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQText.trim() || !newQOpts[0].trim() || !newQOpts[1].trim()) return;
    const created: ExamQuestion = {
      id: `q_${Date.now()}`,
      grade: "g12",
      chapter: { ar: "بنك الأدمن", en: "Admin Bank" },
      topic: { ar: "تدريب شامل", en: "Comprehensive Practice" },
      question: { ar: newQText.trim(), en: newQText.trim() },
      options: [
        { ar: newQOpts[0], en: newQOpts[0] },
        { ar: newQOpts[1], en: newQOpts[1] },
        { ar: newQOpts[2] || "اختيار ثالث", en: newQOpts[2] || "Option 3" },
        { ar: newQOpts[3] || "اختيار رابع", en: newQOpts[3] || "Option 4" },
      ],
      correctIndex: newQCorrect,
      explanation: {
        ar: "سؤال منشور من لوحة الإدارة.",
        en: "Question published from Admin Dashboard.",
      },
    };
    setQuestions((prev) => [created, ...prev]);
    addAdminLog(`أضاف الأدمن سؤالًا جديدًا.`, `Admin added a new quiz question.`);
    setNewQText("");
    setNewQOpts(["", "", "", ""]);
  };

  const visibleCourses =
    selectedGrade === "all" ? courses : courses.filter((c) => c.grade === selectedGrade);

  const visibleStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(studentQuery.toLowerCase()) ||
      s.phone.includes(studentQuery)
  );

  const filteredElements = filterAtomicElements(elementQuery, elementCategory);
  const selectedCatStyle = CATEGORY_STYLES[selectedElement.category];

  return (
    <div
      className={`ambient-bg min-h-screen transition-colors ${
        darkMode ? "bg-[#080D1A] text-slate-100" : "bg-[#F6F9FC] text-slate-900"
      }`}
    >
      {/* Calm Floating Ambient Orbs */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="ambient-orb-1 absolute -top-24 -end-24 w-[420px] h-[420px] rounded-full bg-indigo-400/15 dark:bg-cyan-500/10 blur-3xl" />
        <div className="ambient-orb-2 absolute top-1/3 -start-28 w-[380px] h-[380px] rounded-full bg-cyan-400/15 dark:bg-indigo-500/10 blur-3xl" />
      </div>

      {/* ==================== HEADER ==================== */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl border-b ${
          darkMode ? "bg-[#080D1A]/85 border-slate-800/80" : "bg-white/85 border-slate-200/80"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2 relative z-10">
          <button
            onClick={() => setActivePage("landing")}
            className="flex items-center gap-2.5 text-start"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg block leading-tight">
                {t.brandName}{" "}
                <span className="text-indigo-600 dark:text-cyan-400">{t.brandAccent}</span>
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
                {t.brandSub}
              </span>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => setActivePage("landing")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold ${
                activePage === "landing"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {t.navHome}
            </button>

            <button
              onClick={() => {
                setActivePage("landing");
                setTimeout(() => scrollToSection("atomic-periodic-table"), 60);
              }}
              className="px-3.5 py-1.5 rounded-xl text-xs font-extrabold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
            >
              <Atom className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
              <span>{t.navPeriodic}</span>
            </button>

            <button
              onClick={() => {
                if (role === "guest") {
                  setAuthModeTab("student");
                  setAuthModal("login");
                } else {
                  setActivePage("student-hub");
                }
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 ${
                activePage === "student-hub"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>{t.navStudent}</span>
              {activeMistakes.length > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-amber-400 text-slate-950 font-extrabold">
                  {activeMistakes.length}
                </span>
              )}
            </button>

            {/* Admin Dashboard is ONLY visible to logged-in Admin */}
            {role === "admin" && (
              <button
                onClick={() => setActivePage("admin-dashboard")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 ${
                  activePage === "admin-dashboard"
                    ? "bg-emerald-600 text-white"
                    : "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{t.navAdmin}</span>
              </button>
            )}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Arabic / English Switcher */}
            <button
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 text-xs font-extrabold flex items-center gap-1 hover:border-indigo-500"
              aria-label="Switch language"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400" />
              <span>{t.langToggle}</span>
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 text-indigo-600 dark:text-amber-400"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {role === "guest" ? (
              <>
                <button
                  onClick={() => {
                    setAuthModeTab("student");
                    setAuthError("");
                    setAuthModal("register");
                  }}
                  className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>{t.newAccount}</span>
                </button>
                <button
                  onClick={() => {
                    setAuthModeTab("student");
                    setAuthError("");
                    setAuthModal("login");
                  }}
                  className="px-3 py-2 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 text-xs font-extrabold flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400" />
                  <span className="hidden sm:inline">{t.login}</span>
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-block text-xs font-extrabold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800">
                  {currentUserName}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 text-xs font-extrabold flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t.logout}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ==================== LANDING PAGE ==================== */}
      {activePage === "landing" && (
        <main className="relative z-10">
          {/* Quick Stage & Atomic Strip */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold">
              <button
                onClick={() => scrollToSection("page-welcome")}
                className="px-3.5 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-indigo-500"
              >
                {t.step1Short}
              </button>
              <button
                onClick={() => scrollToSection("page-grade")}
                className="px-3.5 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-indigo-500"
              >
                {t.step2Short}
              </button>
              <button
                onClick={() => scrollToSection("page-course")}
                className="px-3.5 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-indigo-500"
              >
                {t.step3Short}
              </button>
              <button
                onClick={() => scrollToSection("page-follow-account")}
                className="px-3.5 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-indigo-500"
              >
                {t.step4Short}
              </button>
              <button
                onClick={() => scrollToSection("atomic-periodic-table")}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-cyan-300 flex items-center gap-1.5"
              >
                <Atom className="w-3.5 h-3.5" />
                <span>{t.explorePeriodic}</span>
              </button>
            </div>
          </div>

          {/* ---------- PAGE 1: PRO HERO & OVERVIEW ---------- */}
          <section id="page-welcome" className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-14">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50/90 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-cyan-300 text-xs font-extrabold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.stage1Chip}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.16] tracking-tight">
                  {t.heroTitlePrefix}{" "}
                  <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                    {t.brandName} {t.brandAccent}
                  </span>{" "}
                  {t.heroTitleSuffix}
                </h1>

                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                  {t.heroDesc}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    onClick={() => scrollToSection("page-grade")}
                    className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/25"
                  >
                    <span>{t.startChooseGrade}</span>
                    {isRtl ? (
                      <ArrowLeft className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => scrollToSection("page-course")}
                    className="px-6 py-3.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 font-bold text-sm"
                  >
                    {t.browseCourses}
                  </button>

                  <button
                    onClick={() => scrollToSection("atomic-periodic-table")}
                    className="px-5 py-3.5 rounded-xl bg-cyan-50/90 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-cyan-800 dark:text-cyan-300 font-extrabold text-sm flex items-center gap-1.5"
                  >
                    <Atom className="w-4 h-4" />
                    <span>{t.explorePeriodic}</span>
                  </button>
                </div>

                {/* Pro Key Metrics Strip */}
                <div className="grid grid-cols-3 gap-3 pt-3 max-w-xl">
                  <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800">
                    <div className="text-xl sm:text-2xl font-extrabold font-mono text-indigo-600 dark:text-cyan-400">
                      {courses.length}+
                    </div>
                    <div className="text-[11px] font-bold text-slate-500">{t.metricCourses}</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800">
                    <div className="text-xl sm:text-2xl font-extrabold font-mono text-indigo-600 dark:text-cyan-400">
                      3
                    </div>
                    <div className="text-[11px] font-bold text-slate-500">{t.metricGrades}</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800">
                    <div className="text-xl sm:text-2xl font-extrabold font-mono text-amber-600 dark:text-amber-400">
                      {activeMistakes.length}
                    </div>
                    <div className="text-[11px] font-bold text-slate-500">{t.metricMistakes}</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300">
                      {t.summaryTitle}
                    </span>
                    <span className="text-xs font-mono font-bold text-indigo-600 dark:text-cyan-400">
                      Z: 1–30 • {ATOMIC_ELEMENTS.length} Elements
                    </span>
                  </div>
                  <div
                    className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 font-mono text-sm font-bold text-indigo-700 dark:text-cyan-300"
                    dir="ltr"
                  >
                    N₂(g) + 3H₂(g) ⇌ 2NH₃(g) + Heat
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {t.summaryFoot}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ---------- ATOMIC PERIODIC TABLE SECTION (الجدول الذري التفاعلي) ---------- */}
          <section
            id="atomic-periodic-table"
            className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-t border-slate-200/70 dark:border-slate-800/70"
          >
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-indigo-600 dark:text-cyan-400">
                  <Atom className="w-4 h-4" />
                  <span>{t.periodicBadge}</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">{t.periodicTitle}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                  {t.periodicSub}
                </p>
              </div>

              <div className="relative w-full lg:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute top-3 start-3.5" />
                <input
                  type="text"
                  value={elementQuery}
                  onChange={(e) => setElementQuery(e.target.value)}
                  placeholder={t.periodicSearchPlaceholder}
                  className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 text-xs font-semibold shadow-sm"
                />
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setElementCategory("all")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition ${
                  elementCategory === "all"
                    ? "bg-indigo-600 text-white"
                    : "bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800"
                }`}
              >
                {t.allCategories} ({ATOMIC_ELEMENTS.length})
              </button>
              {(Object.keys(CATEGORY_STYLES) as ElementCategory[]).map((catKey) => (
                <button
                  key={catKey}
                  onClick={() => setElementCategory(catKey)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition ${
                    elementCategory === catKey
                      ? "bg-indigo-600 text-white"
                      : "bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800"
                  }`}
                >
                  {CATEGORY_STYLES[catKey].label[lang]}
                </button>
              ))}
            </div>

            <div className="grid lg:grid-cols-12 gap-6 items-start">
              {/* Elements Grid */}
              <div className="lg:col-span-8 grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-2.5">
                {filteredElements.map((el) => {
                  const style = CATEGORY_STYLES[el.category];
                  const isSelected = selectedElement.atomicNumber === el.atomicNumber;
                  return (
                    <button
                      key={el.atomicNumber}
                      onClick={() => setSelectedElement(el)}
                      className={`p-3 rounded-2xl border text-start transition flex flex-col justify-between min-h-[104px] ${
                        style.cardClass
                      } ${
                        isSelected
                          ? "ring-2 ring-indigo-600 dark:ring-cyan-400 scale-[1.02] shadow-md"
                          : "hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full text-[11px] font-mono font-bold opacity-80">
                        <span>{el.atomicNumber}</span>
                        <span>{el.atomicMass}</span>
                      </div>
                      <div className="text-xl sm:text-2xl font-extrabold font-mono leading-none my-1">
                        {el.symbol}
                      </div>
                      <div className="text-[11px] font-extrabold truncate w-full">
                        {el.name[lang]}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Atomic Inspector Card */}
              <div className="lg:col-span-4 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-6 shadow-xl space-y-4 sticky top-20">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold ${selectedCatStyle.badgeClass}`}
                    >
                      {selectedCatStyle.label[lang]}
                    </span>
                    <h3 className="text-2xl font-extrabold mt-2">{selectedElement.name[lang]}</h3>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white flex flex-col items-center justify-center shadow-md shrink-0">
                    <span className="text-[10px] font-mono font-bold opacity-85">
                      {selectedElement.atomicNumber}
                    </span>
                    <span className="text-2xl font-extrabold font-mono leading-none">
                      {selectedElement.symbol}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedElement.summary[lang]}
                </p>

                <div className="grid grid-cols-2 gap-2.5 pt-1 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                    <div className="text-[11px] text-slate-500 font-bold">
                      {t.atomicNumberLabel}
                    </div>
                    <div className="font-mono font-extrabold text-sm mt-0.5">
                      {selectedElement.atomicNumber}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                    <div className="text-[11px] text-slate-500 font-bold">
                      {t.atomicMassLabel}
                    </div>
                    <div className="font-mono font-extrabold text-sm mt-0.5">
                      {selectedElement.atomicMass} u
                    </div>
                  </div>
                  <div className="col-span-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                    <div className="text-[11px] text-slate-500 font-bold">
                      {t.electronConfigLabel}
                    </div>
                    <div
                      className="font-mono font-extrabold text-sm text-indigo-600 dark:text-cyan-400 mt-0.5"
                      dir="ltr"
                    >
                      {selectedElement.electronConfig}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                    <div className="text-[11px] text-slate-500 font-bold">
                      {t.periodGroupLabel}
                    </div>
                    <div className="font-mono font-extrabold text-sm mt-0.5">
                      P{selectedElement.period} • G{selectedElement.group}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                    <div className="text-[11px] text-slate-500 font-bold">{t.blockLabel}</div>
                    <div className="font-mono font-extrabold text-sm mt-0.5">
                      {selectedElement.block}-block
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ---------- PAGE 2: CHOOSE GRADE ---------- */}
          <section
            id="page-grade"
            className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-t border-slate-200/70 dark:border-slate-800/70"
          >
            <div className="mb-6">
              <span className="text-xs font-extrabold text-indigo-600 dark:text-cyan-400">
                {t.stage2Label}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">{t.chooseGradeTitle}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t.chooseGradeSub}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {GRADE_CARDS.map((g) => {
                const isPicked = selectedGrade === g.id;
                return (
                  <div
                    key={g.id}
                    className={`rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border p-6 flex flex-col justify-between shadow-sm transition ${
                      isPicked
                        ? "border-indigo-600 dark:border-cyan-400 ring-2 ring-indigo-500/20"
                        : "border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-lg text-xs font-extrabold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-cyan-300">
                          {g.badge[lang]}
                        </span>
                        <span className="text-xs font-mono text-slate-400" dir="ltr">
                          {g.formula}
                        </span>
                      </div>
                      <h3 className="text-xl font-extrabold">{g.title[lang]}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {g.subtitle[lang]}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {g.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-300"
                          >
                            {h[lang]}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedGrade(g.id);
                        scrollToSection("page-course");
                      }}
                      className="mt-6 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold"
                    >
                      {t.pickGradeBtn} {g.badge[lang]} {t.pickGradeBtnSuffix}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ---------- PAGE 3: CHOOSE COURSE ---------- */}
          <section
            id="page-course"
            className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-t border-slate-200/70 dark:border-slate-800/70"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-extrabold text-indigo-600 dark:text-cyan-400">
                  {t.stage3Label}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">{t.chooseCourseTitle}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t.chooseCourseSub}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { id: "all", label: t.allFilter },
                    { id: "g10", label: t.g10Short },
                    { id: "g11", label: t.g11Short },
                    { id: "g12", label: t.g12Short },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedGrade(tab.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold ${
                      selectedGrade === tab.id
                        ? "bg-indigo-600 text-white"
                        : "bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {visibleCourses.map((course) => (
                <div
                  key={course.id}
                  className="rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-sm space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-extrabold text-indigo-600 dark:text-cyan-400">
                        {course.gradeLabel[lang]}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                          course.isFree
                            ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                            : "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-cyan-300"
                        }`}
                      >
                        {course.priceLabel[lang]}
                      </span>
                    </div>
                    <h3 className="text-lg font-extrabold">{course.title[lang]}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {course.description[lang]}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{course.startDate[lang]}</span>
                    </div>

                    <button
                      onClick={() => handleCourseAction(course)}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold"
                    >
                      {course.enrolled ? t.enterCourse : t.selectCourse}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ---------- PAGE 4: FOLLOW, WHATSAPP & ACCOUNT CTA ---------- */}
          <section
            id="page-follow-account"
            className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-t border-slate-200/70 dark:border-slate-800/70"
          >
            <div className="mb-6">
              <span className="text-xs font-extrabold text-indigo-600 dark:text-cyan-400">
                {t.stage4Label}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">{t.followAccountTitle}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {t.followAccountSub}
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between space-y-5 shadow-sm">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{t.followChip}</span>
                  </div>
                  <h3 className="text-xl font-extrabold">{t.waCardTitle}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {t.waCardDesc}
                  </p>
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">{t.waNumberLabel}</span>
                    <span
                      className="font-mono text-sm font-extrabold text-emerald-600 dark:text-emerald-400"
                      dir="ltr"
                    >
                      {WHATSAPP_DISPLAY}
                    </span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    lang === "ar"
                      ? "أهلًا مستر كيمياء برو، أحتاج مساعدة في الكورسات."
                      : "Hello ChemistryPro, I need help with courses."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.openWaBtn}</span>
                </a>
              </div>

              <div className="lg:col-span-6 rounded-3xl bg-gradient-to-br from-indigo-600 to-cyan-600 text-white p-6 sm:p-8 flex flex-col justify-between space-y-5 shadow-xl">
                <div className="space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-white/15">
                    {t.ctaChip}
                  </span>
                  <h3 className="text-2xl font-extrabold pt-1">{t.ctaTitle}</h3>
                  <p className="text-xs sm:text-sm text-indigo-50 leading-relaxed">{t.ctaDesc}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setAuthModeTab("student");
                      setAuthError("");
                      setAuthModal("register");
                    }}
                    className="flex-1 min-w-[150px] py-3 px-5 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 text-xs font-extrabold flex items-center justify-center gap-2 shadow-md"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>{t.createAccount}</span>
                  </button>

                  <button
                    onClick={() => {
                      setAuthModeTab("student");
                      setAuthError("");
                      setAuthModal("login");
                    }}
                    className="flex-1 min-w-[150px] py-3 px-5 rounded-xl bg-slate-950/30 hover:bg-slate-950/45 border border-white/25 text-white text-xs font-extrabold flex items-center justify-center gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>{t.login}</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Footer with Discrete Admin Trigger */}
          <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md mt-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <div>{t.footerRights}</div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    setAuthModeTab("student");
                    setAuthModal("register");
                  }}
                  className="font-bold hover:text-indigo-600 dark:hover:text-cyan-400"
                >
                  {t.createAccount}
                </button>
                <button
                  onClick={openAdminDashboard}
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-indigo-600 dark:hover:text-cyan-400 font-semibold"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{t.adminLoginBtn}</span>
                </button>
              </div>
            </div>
          </footer>
        </main>
      )}

      {/* ==================== STUDENT HUB ==================== */}
      {activePage === "student-hub" && (
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold">{t.navStudent}</h2>
              <p className="text-xs text-slate-500 mt-0.5">{currentUserName}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {(
                [
                  { id: "courses", label: t.myCourses, icon: BookOpen },
                  { id: "exam", label: t.interactiveExam, icon: FlaskConical },
                  {
                    id: "mistakes",
                    label: `${t.mistakesBank} (${activeMistakes.length})`,
                    icon: BrainCircuit,
                  },
                ] as const
              ).map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setStudentSection(item.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 ${
                      studentSection === item.id
                        ? "bg-indigo-600 text-white"
                        : "bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {studentSection === "courses" && (
            <div className="grid md:grid-cols-2 gap-5">
              {courses.map((c) => (
                <div
                  key={c.id}
                  className="p-5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-2"
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-extrabold text-indigo-600 dark:text-cyan-400">
                      {c.gradeLabel[lang]}
                    </span>
                    <span className="font-bold">
                      {c.enrolled ? t.enrolledBadge : c.priceLabel[lang]}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-base">{c.title[lang]}</h3>
                  <p className="text-xs text-slate-500">{c.description[lang]}</p>
                </div>
              ))}
            </div>
          )}

          {studentSection === "exam" && currentQ && (
            <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-5">
              <div className="flex justify-between text-xs font-bold text-slate-500">
                <span>
                  {currentQ.chapter[lang]} • {currentQ.topic[lang]}
                </span>
                <span className="font-mono">
                  {qIndex + 1} / {questions.length}
                </span>
              </div>

              <h3 className="text-lg font-extrabold">{currentQ.question[lang]}</h3>

              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  const isSel = chosenOpt === idx;
                  const isRight = idx === currentQ.correctIndex;
                  let style = "border-slate-200 dark:border-slate-800 hover:border-indigo-400";
                  if (submittedQ) {
                    if (isRight) style = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40";
                    else if (isSel) style = "border-rose-500 bg-rose-50 dark:bg-rose-950/40";
                  } else if (isSel) {
                    style = "border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40";
                  }
                  return (
                    <button
                      key={idx}
                      disabled={submittedQ}
                      onClick={() => setChosenOpt(idx)}
                      className={`w-full p-3.5 rounded-xl border text-start text-sm font-semibold flex items-center justify-between ${style}`}
                    >
                      <span>{opt[lang]}</span>
                      {submittedQ && isRight && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      )}
                      {submittedQ && isSel && !isRight && (
                        <XCircle className="w-4 h-4 text-rose-600" />
                      )}
                    </button>
                  );
                })}
              </div>

              {submittedQ && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                  <div className="font-extrabold text-indigo-600 dark:text-cyan-400">
                    {chosenOpt === currentQ.correctIndex ? t.correctMsg : t.wrongLoggedMsg}
                  </div>
                  <p>{currentQ.explanation[lang]}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-mono font-bold text-slate-500">
                  {t.scoreLabel}: {score}
                </span>
                {!submittedQ ? (
                  <button
                    onClick={handleExamCheck}
                    disabled={chosenOpt === null}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 disabled:opacity-40 text-white text-xs font-extrabold"
                  >
                    {t.confirmAnswer}
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 rounded-xl bg-cyan-600 text-white text-xs font-extrabold"
                  >
                    {t.nextQuestion}
                  </button>
                )}
              </div>
            </div>
          )}

          {studentSection === "mistakes" && (
            <div className="space-y-4">
              {activeMistakes.length === 0 ? (
                <div className="p-10 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-center space-y-2">
                  <Trophy className="w-10 h-10 text-indigo-600 mx-auto" />
                  <div className="font-extrabold">{t.noMistakesMsg}</div>
                </div>
              ) : (
                activeMistakes.map((m) => {
                  const q = questions.find((item) => item.id === m.questionId);
                  if (!q) return null;
                  const isRetrying = retryingQId === q.id;
                  return (
                    <div
                      key={q.id}
                      className="p-5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-amber-300 dark:border-amber-800 space-y-4"
                    >
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-amber-700 dark:text-amber-400">
                          {q.chapter[lang]} • {q.topic[lang]}
                        </span>
                        <span className="font-mono text-rose-600">
                          {t.attemptsLabel}: {m.attempts}
                        </span>
                      </div>
                      <h4 className="font-bold text-base">{q.question[lang]}</h4>

                      {!isRetrying ? (
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                          <span className="text-xs text-rose-600 font-semibold">
                            {t.previousChoice}: {q.options[m.selectedOptionIndex]?.[lang]}
                          </span>
                          <button
                            onClick={() => {
                              setRetryingQId(q.id);
                              setRetryOpt(null);
                              setRetryWrongMsg(false);
                            }}
                            className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-extrabold flex items-center gap-1.5"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>{t.retryQuestion}</span>
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                          {q.options.map((opt, idx) => (
                            <button
                              key={idx}
                              onClick={() => setRetryOpt(idx)}
                              className={`w-full p-3 rounded-xl border text-start text-xs font-bold ${
                                retryOpt === idx
                                  ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950"
                                  : "border-slate-200 dark:border-slate-800"
                              }`}
                            >
                              {opt[lang]}
                            </button>
                          ))}
                          {retryWrongMsg && (
                            <div className="text-xs text-rose-600 font-bold">
                              {t.retryWrongFeedback}
                            </div>
                          )}
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleMistakeRetry(q)}
                              disabled={retryOpt === null}
                              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-extrabold"
                            >
                              {t.checkSolution}
                            </button>
                            <button
                              onClick={() => setRetryingQId(null)}
                              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-bold"
                            >
                              {t.cancelBtn}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </main>
      )}

      {/* ==================== ADMIN DASHBOARD (ADMIN ONLY) ==================== */}
      {activePage === "admin-dashboard" && role === "admin" && (
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold">{t.adminPanelTitle}</h2>
                <p className="text-xs text-slate-500">{t.adminPanelSub}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {(
                [
                  { id: "students", label: `${t.studentsTab} (${students.length})`, icon: Users },
                  { id: "courses", label: `${t.coursesTab} (${courses.length})`, icon: BookOpen },
                  { id: "questions", label: `${t.questionsTab} (${questions.length})`, icon: Award },
                  { id: "logs", label: t.logsTab, icon: Activity },
                ] as const
              ).map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setAdminSection(tab.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 ${
                      adminSection === tab.id
                        ? "bg-indigo-600 text-white"
                        : "bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {adminSection === "students" && (
            <div className="p-6 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="font-extrabold text-base flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-indigo-600" />
                  <span>{t.studentsTab}</span>
                </h3>
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute top-2.5 start-3" />
                  <input
                    type="text"
                    value={studentQuery}
                    onChange={(e) => setStudentQuery(e.target.value)}
                    placeholder={lang === "ar" ? "ابحث بالاسم أو الهاتف..." : "Search name or phone..."}
                    className="w-full ps-9 pe-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-start text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                      <th className="py-2.5 text-start">{lang === "ar" ? "الطالب" : "Student"}</th>
                      <th className="py-2.5 text-start">{lang === "ar" ? "الهاتف" : "Phone"}</th>
                      <th className="py-2.5 text-start">{lang === "ar" ? "الصف" : "Grade"}</th>
                      <th className="py-2.5 text-start">{lang === "ar" ? "الباقة" : "Plan"}</th>
                      <th className="py-2.5 text-start">{lang === "ar" ? "الحالة" : "Status"}</th>
                      <th className="py-2.5 text-end">{lang === "ar" ? "تحكم" : "Action"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleStudents.map((s) => (
                      <tr key={s.id} className="border-b border-slate-100 dark:border-slate-800/60">
                        <td className="py-3 font-bold">{s.name}</td>
                        <td className="py-3 font-mono">{s.phone}</td>
                        <td className="py-3">{s.gradeLabel[lang]}</td>
                        <td className="py-3 font-mono font-bold text-indigo-600 dark:text-cyan-400">
                          {s.plan}
                        </td>
                        <td className="py-3">
                          {s.status === "Active"
                            ? lang === "ar"
                              ? "نشط"
                              : "Active"
                            : lang === "ar"
                            ? "موقوف"
                            : "Suspended"}
                        </td>
                        <td className="py-3 text-end">
                          <button
                            onClick={() =>
                              setStudents((prev) =>
                                prev.map((item) =>
                                  item.id === s.id
                                    ? {
                                        ...item,
                                        status: item.status === "Active" ? "Suspended" : "Active",
                                      }
                                    : item
                                )
                              )
                            }
                            className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-bold"
                          >
                            {s.status === "Active"
                              ? lang === "ar"
                                ? "إيقاف"
                                : "Suspend"
                              : lang === "ar"
                              ? "تفعيل"
                              : "Activate"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {adminSection === "courses" && (
            <div className="grid lg:grid-cols-12 gap-6">
              <form
                onSubmit={handleAddCourseAdmin}
                className="lg:col-span-5 p-6 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4"
              >
                <h3 className="font-extrabold text-base flex items-center gap-2">
                  <Plus className="w-4 h-4 text-indigo-600" />
                  <span>{lang === "ar" ? "إضافة كورس جديد" : "Add New Course"}</span>
                </h3>
                <input
                  type="text"
                  required
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  placeholder={lang === "ar" ? "اسم الكورس..." : "Course title..."}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                />
                <select
                  value={newCourseGrade}
                  onChange={(e) => setNewCourseGrade(e.target.value as "g10" | "g11" | "g12")}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold"
                >
                  <option value="g10">{GRADE_LABELS.g10[lang]}</option>
                  <option value="g11">{GRADE_LABELS.g11[lang]}</option>
                  <option value="g12">{GRADE_LABELS.g12[lang]}</option>
                </select>
                <input
                  type="text"
                  disabled={newCourseFree}
                  value={newCoursePrice}
                  onChange={(e) => setNewCoursePrice(e.target.value)}
                  placeholder={lang === "ar" ? "السعر (مثال: 150 جنيه)" : "Price (e.g. 150 EGP)"}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                />
                <label className="flex items-center gap-2 text-xs font-bold">
                  <input
                    type="checkbox"
                    checked={newCourseFree}
                    onChange={(e) => setNewCourseFree(e.target.checked)}
                  />
                  <span>{lang === "ar" ? "كورس مجاني" : "Free course"}</span>
                </label>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-extrabold"
                >
                  {lang === "ar" ? "حفظ الكورس" : "Save Course"}
                </button>
              </form>

              <div className="lg:col-span-7 space-y-3">
                {courses.map((c) => (
                  <div
                    key={c.id}
                    className="p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="text-xs font-bold text-indigo-600 dark:text-cyan-400">
                        {c.gradeLabel[lang]} • {c.priceLabel[lang]}
                      </div>
                      <div className="font-extrabold text-sm">{c.title[lang]}</div>
                    </div>
                    <button
                      onClick={() => setCourses((prev) => prev.filter((item) => item.id !== c.id))}
                      className="p-2 text-rose-600"
                      aria-label="Delete course"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {adminSection === "questions" && (
            <div className="grid lg:grid-cols-12 gap-6">
              <form
                onSubmit={handleAddQuestionAdmin}
                className="lg:col-span-5 p-6 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-3"
              >
                <h3 className="font-extrabold text-base">
                  {lang === "ar" ? "إضافة سؤال للاختبار" : "Add Quiz Question"}
                </h3>
                <input
                  type="text"
                  required
                  value={newQText}
                  onChange={(e) => setNewQText(e.target.value)}
                  placeholder={lang === "ar" ? "نص السؤال..." : "Question text..."}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                />
                {newQOpts.map((opt, idx) => (
                  <input
                    key={idx}
                    type="text"
                    required={idx < 2}
                    value={opt}
                    onChange={(e) => {
                      const copy = [...newQOpts];
                      copy[idx] = e.target.value;
                      setNewQOpts(copy);
                    }}
                    placeholder={lang === "ar" ? `الاختيار ${idx + 1}` : `Option ${idx + 1}`}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                  />
                ))}
                <select
                  value={newQCorrect}
                  onChange={(e) => setNewQCorrect(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold"
                >
                  <option value={0}>{lang === "ar" ? "الاختيار 1" : "Option 1"}</option>
                  <option value={1}>{lang === "ar" ? "الاختيار 2" : "Option 2"}</option>
                  <option value={2}>{lang === "ar" ? "الاختيار 3" : "Option 3"}</option>
                  <option value={3}>{lang === "ar" ? "الاختيار 4" : "Option 4"}</option>
                </select>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-extrabold"
                >
                  {lang === "ar" ? "نشر السؤال" : "Publish Question"}
                </button>
              </form>

              <div className="lg:col-span-7 space-y-3">
                {questions.map((q) => (
                  <div
                    key={q.id}
                    className="p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3"
                  >
                    <div className="text-xs sm:text-sm font-bold">{q.question[lang]}</div>
                    <button
                      onClick={() => setQuestions((prev) => prev.filter((item) => item.id !== q.id))}
                      className="p-2 text-rose-600"
                      aria-label="Delete question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {adminSection === "logs" && (
            <div className="p-6 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-3">
              {adminLogs.map((l) => (
                <div
                  key={l.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between gap-3 text-xs"
                >
                  <span className="font-semibold">{l.text[lang]}</span>
                  <span className="font-mono text-slate-400 shrink-0">{l.time[lang]}</span>
                </div>
              ))}
            </div>
          )}
        </main>
      )}

      {/* ==================== AUTH MODAL (LOGIN & REGISTER) ==================== */}
      {authModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold">
                {authModal === "register" ? t.createAccount : t.login}
              </h3>
              <button
                onClick={() => setAuthModal(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {authModal === "login" && (
              <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
                <button
                  onClick={() => {
                    setAuthModeTab("student");
                    setAuthError("");
                  }}
                  className={`py-2 rounded-lg text-xs font-extrabold ${
                    authModeTab === "student"
                      ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-cyan-400 shadow-sm"
                      : "text-slate-500"
                  }`}
                >
                  {lang === "ar" ? "حساب طالب" : "Student"}
                </button>
                <button
                  onClick={() => {
                    setAuthModeTab("admin");
                    setAuthError("");
                  }}
                  className={`py-2 rounded-lg text-xs font-extrabold ${
                    authModeTab === "admin"
                      ? "bg-white dark:bg-slate-900 text-emerald-600 shadow-sm"
                      : "text-slate-500"
                  }`}
                >
                  {lang === "ar" ? "حساب الأدمن فقط" : "Admin Only"}
                </button>
              </div>
            )}

            {authModal === "register" ? (
              <form onSubmit={handleRegisterStudent} className="space-y-3.5">
                {regError && (
                  <div className="p-3 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold">
                    {regError}
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold mb-1">
                    {lang === "ar" ? "اسم الطالب" : "Student Name"}
                  </label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder={lang === "ar" ? "مثال: عمر محمد حسن" : "e.g. Omar Mohamed"}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">
                    {lang === "ar" ? "رقم الهاتف" : "Phone Number"}
                  </label>
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="01012345678"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold mb-1">
                      {lang === "ar" ? "الصف الدراسي" : "Grade"}
                    </label>
                    <select
                      value={regGrade}
                      onChange={(e) => setRegGrade(e.target.value as "g10" | "g11" | "g12")}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold"
                    >
                      <option value="g10">{t.g10Short}</option>
                      <option value="g11">{t.g11Short}</option>
                      <option value="g12">{t.g12Short}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">
                      {lang === "ar" ? "الباقة" : "Plan"}
                    </label>
                    <select
                      value={regPlan}
                      onChange={(e) => setRegPlan(e.target.value as "VIP" | "Standard")}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold"
                    >
                      <option value="VIP">VIP</option>
                      <option value="Standard">Standard</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold"
                >
                  {t.createAccount}
                </button>
              </form>
            ) : (
              <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                {authError && (
                  <div className="p-3 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold">
                    {authError}
                  </div>
                )}

                {authModeTab === "admin" ? (
                  <>
                    <div>
                      <label className="block text-xs font-bold mb-1">
                        {lang === "ar" ? "اسم حساب الأدمن" : "Admin Username"}
                      </label>
                      <input
                        type="text"
                        required
                        value={loginIdentifier}
                        onChange={(e) => setLoginIdentifier(e.target.value)}
                        placeholder="admin"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1">
                        {lang === "ar" ? "كود دخول الأدمن" : "Admin Access Code"}
                      </label>
                      <input
                        type="password"
                        required
                        value={loginSecret}
                        onChange={(e) => setLoginSecret(e.target.value)}
                        placeholder={ADMIN_ACCESS_CODE}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono"
                      />
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="block text-xs font-bold mb-1">
                      {lang === "ar" ? "رقم الهاتف أو اسم الطالب" : "Phone or Student Name"}
                    </label>
                    <input
                      type="text"
                      required
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder={
                        lang === "ar"
                          ? "مثال: 01012345678 أو أحمد طارق حسن"
                          : "e.g. 01012345678 or Ahmed Tarek"
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold"
                >
                  {t.login}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
