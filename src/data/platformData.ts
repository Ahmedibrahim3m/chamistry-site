export type Language = "ar" | "en";
export type UserRole = "guest" | "student" | "admin";
export type GradeKey = "all" | "g10" | "g11" | "g12";

export interface BilingualText {
  ar: string;
  en: string;
}

export interface PlatformCourse {
  id: string;
  grade: "g10" | "g11" | "g12";
  gradeLabel: BilingualText;
  title: BilingualText;
  description: BilingualText;
  priceLabel: BilingualText;
  isFree: boolean;
  startDate: BilingualText;
  formula: string;
  enrolled: boolean;
}

export interface ExamQuestion {
  id: string;
  grade: "g10" | "g11" | "g12";
  chapter: BilingualText;
  topic: BilingualText;
  question: BilingualText;
  options: BilingualText[];
  correctIndex: number;
  explanation: BilingualText;
}

export interface MistakeRecord {
  questionId: string;
  selectedOptionIndex: number;
  attempts: number;
  mastered: boolean;
}

export interface RegisteredStudent {
  id: string;
  name: string;
  phone: string;
  grade: "g10" | "g11" | "g12";
  gradeLabel: BilingualText;
  plan: "VIP" | "Standard";
  status: "Active" | "Suspended";
  mastery: number;
  createdAt: string;
}

export interface AdminLog {
  id: string;
  text: BilingualText;
  time: BilingualText;
}

export const WHATSAPP_NUMBER = "201012345678";
export const WHATSAPP_DISPLAY = "01012345678";

export const GRADE_LABELS: Record<"g10" | "g11" | "g12", BilingualText> = {
  g10: { ar: "الصف الأول الثانوي", en: "Grade 10 (Secondary 1)" },
  g11: { ar: "الصف الثاني الثانوي", en: "Grade 11 (Secondary 2)" },
  g12: { ar: "الصف الثالث الثانوي", en: "Grade 12 (Secondary 3)" },
};

export const GRADE_CARDS: {
  id: "g10" | "g11" | "g12";
  title: BilingualText;
  subtitle: BilingualText;
  badge: BilingualText;
  formula: string;
  highlights: BilingualText[];
}[] = [
  {
    id: "g10",
    title: { ar: "الصف الأول الثانوي", en: "Grade 10 — Secondary 1" },
    subtitle: {
      ar: "كيمياء — مدخل الكيمياء، القياس، والمول والحسابات الكيميائية.",
      en: "Chemistry — Measurement, moles, stoichiometry, and chemical calculations.",
    },
    badge: { ar: "أولى ثانوي", en: "Grade 10" },
    formula: "n = m / M_wt",
    highlights: [
      { ar: "أدوات القياس والنسبة المئوية", en: "Measurement & Percent Error" },
      { ar: "المول والمعادلة الكيميائية", en: "Moles & Stoichiometry" },
    ],
  },
  {
    id: "g11",
    title: { ar: "الصف الثاني الثانوي", en: "Grade 11 — Secondary 2" },
    subtitle: {
      ar: "كيمياء — بنية الذرة، الجدول الدوري، والروابط الكيميائية.",
      en: "Chemistry — Atomic structure, periodic trends, and chemical bonding.",
    },
    badge: { ar: "تانية ثانوي", en: "Grade 11" },
    formula: "sp³ • 109.5°",
    highlights: [
      { ar: "التوزيع الإلكتروني وأعداد الكم", en: "Quantum Numbers & Configuration" },
      { ar: "تدرج الخواص والروابط", en: "Periodic Trends & Bonding" },
    ],
  },
  {
    id: "g12",
    title: { ar: "الصف الثالث الثانوي", en: "Grade 12 — Secondary 3" },
    subtitle: {
      ar: "كيمياء — العناصر الانتقالية، التحليل الكيميائي، والاتزان والعضوية.",
      en: "Chemistry — Transition elements, chemical equilibrium, electrochemistry & organic.",
    },
    badge: { ar: "تالتة ثانوي", en: "Grade 12" },
    formula: "[Ar] 3d⁶ 4s²",
    highlights: [
      { ar: "السلاسل الانتقالية والاتزان", en: "Transition Series & Equilibrium" },
      { ar: "الكهربية والكيمياء العضوية", en: "Electrochemistry & Organic" },
    ],
  },
];

export const INITIAL_COURSES: PlatformCourse[] = [
  {
    id: "crs_1",
    grade: "g12",
    gradeLabel: GRADE_LABELS.g12,
    title: {
      ar: "كورس الباب الأول: العناصر الانتقالية",
      en: "Chapter 1: Transition Elements",
    },
    description: {
      ar: "شرح كامل للتوزيع الإلكتروني، العزم المغناطيسي، وخواص الحديد وسبائكه.",
      en: "Complete coverage of electron configuration, magnetic moment, and iron alloys.",
    },
    priceLabel: { ar: "150 جنيه", en: "150 EGP" },
    isFree: false,
    startDate: { ar: "الثلاثاء، ١٧ نوفمبر ٢٠٢٦", en: "Tue, Nov 17, 2026" },
    formula: "[Ar] 3d⁶ 4s²",
    enrolled: true,
  },
  {
    id: "crs_2",
    grade: "g12",
    gradeLabel: GRADE_LABELS.g12,
    title: {
      ar: "شامل الاتزان الكيميائي (مراجعة مجانية)",
      en: "Chemical Equilibrium Masterclass (Free)",
    },
    description: {
      ar: "تطبيقات عملية على قاعدة لوشاتيليه وحاصل الإذابة مع حل أسئلة الامتحانات.",
      en: "Hands-on practice with Le Chatelier's principle, Kc/Kp, and solubility product.",
    },
    priceLabel: { ar: "كورس مجاني", en: "Free Course" },
    isFree: true,
    startDate: { ar: "الثلاثاء، ٣ نوفمبر ٢٠٢٦", en: "Tue, Nov 3, 2026" },
    formula: "Kc = [C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ",
    enrolled: true,
  },
  {
    id: "crs_3",
    grade: "g11",
    gradeLabel: GRADE_LABELS.g11,
    title: {
      ar: "كورس الشهر الأول — الروابط وتهجين الأوربيتالات",
      en: "Month 1 — Chemical Bonding & Hybridization",
    },
    description: {
      ar: "فهم أشكال الجزيئات والروابط التساهمية والتناسقية والهيدروجينية.",
      en: "Molecular geometry, VSEPR theory, sigma & pi bonds, and coordinate bonding.",
    },
    priceLabel: { ar: "140 جنيه", en: "140 EGP" },
    isFree: false,
    startDate: { ar: "الاثنين، ١٢ أكتوبر ٢٠٢٦", en: "Mon, Oct 12, 2026" },
    formula: "VSEPR • σ & π",
    enrolled: false,
  },
  {
    id: "crs_4",
    grade: "g10",
    gradeLabel: GRADE_LABELS.g10,
    title: {
      ar: "كورس الترم الأول كامل — أساسيات الكيمياء",
      en: "Term 1 Foundations — Moles & Equations",
    },
    description: {
      ar: "تأسيس قوي في المول، المعادلة الأيونية، والنسبة المئوية للناتج الفعلي.",
      en: "Strong foundations in molar mass, ionic equations, and percentage yield.",
    },
    priceLabel: { ar: "300 جنيه", en: "300 EGP" },
    isFree: false,
    startDate: { ar: "الأربعاء، ٢ سبتمبر ٢٠٢٦", en: "Wed, Sep 2, 2026" },
    formula: "Yield% = (Actual / Theo) × 100",
    enrolled: false,
  },
];

export const INITIAL_QUESTIONS: ExamQuestion[] = [
  {
    id: "q1",
    grade: "g12",
    chapter: { ar: "العناصر الانتقالية", en: "Transition Elements" },
    topic: { ar: "العزم المغناطيسي", en: "Magnetic Moment" },
    question: {
      ar: "أي من الأيونات التالية يمتلك أعلى عزم مغناطيسي؟",
      en: "Which of the following ions has the highest magnetic moment?",
    },
    options: [
      { ar: "Fe²⁺ (Z=26)", en: "Fe²⁺ (Z=26)" },
      { ar: "Mn²⁺ (Z=25)", en: "Mn²⁺ (Z=25)" },
      { ar: "Cr³⁺ (Z=24)", en: "Cr³⁺ (Z=24)" },
      { ar: "Cu²⁺ (Z=29)", en: "Cu²⁺ (Z=29)" },
    ],
    correctIndex: 1,
    explanation: {
      ar: "أيون Mn²⁺ توزيعه [Ar] 3d⁵ ويحتوي على 5 إلكترونات مفردة وهو الأعلى.",
      en: "Mn²⁺ has electron configuration [Ar] 3d⁵ with 5 unpaired electrons, giving the highest magnetic moment.",
    },
  },
  {
    id: "q2",
    grade: "g12",
    chapter: { ar: "الاتزان الكيميائي", en: "Chemical Equilibrium" },
    topic: { ar: "قاعدة لوشاتيليه", en: "Le Chatelier's Principle" },
    question: {
      ar: "في التفاعل الطارد: N₂(g) + 3H₂(g) ⇌ 2NH₃(g) + Heat، لزيادة كمية النشادر:",
      en: "For the exothermic reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g) + Heat, to increase NH₃ yield:",
    },
    options: [
      {
        ar: "رفع درجة الحرارة وتقليل الضغط",
        en: "Raise temperature and lower pressure",
      },
      {
        ar: "خفض درجة الحرارة وزيادة الضغط",
        en: "Lower temperature and increase pressure",
      },
      { ar: "إضافة عامل حفاز فقط", en: "Add a catalyst only" },
      { ar: "سحب غاز النيتروجين", en: "Remove nitrogen gas" },
    ],
    correctIndex: 1,
    explanation: {
      ar: "خفض الحرارة ينشط التفاعل الطردي، وزيادة الضغط تزيح نحو عدد المولات الأقل.",
      en: "Lowering temperature favors the forward exothermic reaction, and increasing pressure shifts toward fewer gas moles.",
    },
  },
  {
    id: "q3",
    grade: "g10",
    chapter: { ar: "الحسابات الكيميائية", en: "Stoichiometry" },
    topic: { ar: "المول وكتلة المادة", en: "Moles & Molar Mass" },
    question: {
      ar: "عدد مولات 18 جرام من الماء (H₂O = 18 g/mol) يساوي:",
      en: "The number of moles in 18 g of water (H₂O = 18 g/mol) is:",
    },
    options: [
      { ar: "0.5 مول", en: "0.5 mol" },
      { ar: "1 مول", en: "1 mol" },
      { ar: "2 مول", en: "2 mol" },
      { ar: "18 مول", en: "18 mol" },
    ],
    correctIndex: 1,
    explanation: {
      ar: "عدد المولات = الكتلة / الكتلة المولية = 18 / 18 = 1 مول.",
      en: "Moles = mass / molar mass = 18 / 18 = 1 mol.",
    },
  },
];

export const INITIAL_STUDENTS: RegisteredStudent[] = [
  {
    id: "stu_101",
    name: "أحمد طارق حسن",
    phone: "01012345678",
    grade: "g12",
    gradeLabel: GRADE_LABELS.g12,
    plan: "VIP",
    status: "Active",
    mastery: 88,
    createdAt: "2026-10-14",
  },
  {
    id: "stu_102",
    name: "سلمى محمود إبراهيم",
    phone: "01198765432",
    grade: "g12",
    gradeLabel: GRADE_LABELS.g12,
    plan: "VIP",
    status: "Active",
    mastery: 94,
    createdAt: "2026-10-18",
  },
  {
    id: "stu_103",
    name: "كريم وليد منصور",
    phone: "01255443322",
    grade: "g11",
    gradeLabel: GRADE_LABELS.g11,
    plan: "Standard",
    status: "Active",
    mastery: 74,
    createdAt: "2026-11-02",
  },
];

export const INITIAL_ADMIN_LOGS: AdminLog[] = [
  {
    id: "log_1",
    text: {
      ar: "تم تسجيل دخول الأدمن وتفعيل لوحة التحكم الخاصة.",
      en: "Admin signed in and activated the management dashboard.",
    },
    time: { ar: "منذ دقيقتين", en: "2m ago" },
  },
  {
    id: "log_2",
    text: {
      ar: "تمت إضافة سؤال تلقائيًا إلى بنك الأخطاء بعد خطأ في قاعدة لوشاتيليه.",
      en: "A question was automatically logged to Mistakes Bank after a Le Chatelier error.",
    },
    time: { ar: "منذ 15 دقيقة", en: "15m ago" },
  },
];

export const UI_COPY = {
  ar: {
    brandName: "منصة كيمياء",
    brandAccent: "برو",
    brandSub: "المرحلة الثانوية • أولى وتانية وتالتة",
    navHome: "الرئيسية",
    navPeriodic: "الجدول الذري",
    navStudent: "منطقة الطالب",
    navAdmin: "لوحة الإدارة",
    newAccount: "حساب جديد",
    createAccount: "أنشئ حساب",
    login: "تسجيل الدخول",
    logout: "خروج",
    langToggle: "English",
    stage1Chip: "الصفحة الأولى • منصة كيمياء برو الاحترافية",
    heroTitlePrefix: "أتقن الكيمياء بدقة في",
    heroTitleSuffix: "للثانوية العامة",
    heroDesc:
      "منصة تعليمية مصممة لطلاب الثانوية العامة تجمع بين الشرح المنظم، الجدول الدوري الذري التفاعلي، الاختبارات الذكية، وبنك الأخطاء الذي يعيد تأهيلك على نقاط ضعفك.",
    startChooseGrade: "ابدأ باختيار صفك",
    browseCourses: "استعراض الكورسات",
    explorePeriodic: "الجدول الذري",
    metricCourses: "كورس متاح",
    metricGrades: "صفوف دراسية",
    metricMistakes: "بنك الأخطاء",
    summaryTitle: "ملخص المنصة",
    summaryFoot:
      "مسار تعلم واضح من ٤ خطوات: حدد صفك الدراسي، اختر الكورس المناسب، استكشف الجدول الذري، وتابعنا على الواتساب وابدأ حسابك.",
    step1Short: "١. الترحيب والنظرة العامة",
    step2Short: "٢. اختيار الصف",
    step3Short: "٣. اختيار الكورس",
    step4Short: "٤. المتابعة والواتساب والحساب",
    periodicBadge: "أداة تفاعلية • الجدول الذري",
    periodicTitle: "الجدول الدوري الذري (العناصر ١ – ٣٠)",
    periodicSub:
      "اضغط على أي عنصر أو ابحث بالرمز أو الاسم أو العدد الذري لمعرفة التوزيع الإلكتروني والكتلة الذرية والخواص.",
    periodicSearchPlaceholder: "ابحث بالاسم، الرمز (Fe, Mn, O)، أو العدد الذري...",
    allCategories: "كل الفئات",
    atomicNumberLabel: "العدد الذري (Z)",
    atomicMassLabel: "الكتلة الذرية",
    electronConfigLabel: "التوزيع الإلكتروني",
    periodGroupLabel: "الدورة / المجموعة",
    blockLabel: "المستوى الفرعي",
    selectElementPrompt: "اختر عنصرًا من الجدول لعرض بطاقته الذرية التفصيلية.",
    stage2Label: "الصفحة الثانية",
    chooseGradeTitle: "اختر صفك",
    chooseGradeSub: "حدد صفك الدراسي عشان نعرضلك الكورسات الخاصة بيه مباشرة.",
    pickGradeBtn: "اختيار",
    pickGradeBtnSuffix: "والانتقال للكورسات",
    stage3Label: "الصفحة الثالثة",
    chooseCourseTitle: "اختر الكورس",
    chooseCourseSub: "محتوى مرتب وشرح يثبت المعلومة ويجهزك للامتحان.",
    allFilter: "عرض الكل",
    g10Short: "أولى ثانوي",
    g11Short: "تانية ثانوي",
    g12Short: "تالتة ثانوي",
    enterCourse: "الدخول للكورس",
    selectCourse: "اختيار الكورس",
    stage4Label: "الصفحة الرابعة",
    followAccountTitle: "تابعنا وتواصل واتساب وابدأ حسابك",
    followAccountSub:
      "انضم لقناة الواتساب لمتابعة المواعيد والمراجعات، ثم أنشئ حسابك أو سجل دخولك.",
    followChip: "تابعنا ورقم الواتساب",
    waCardTitle: "تواصل مباشر ومتابعة على واتساب",
    waCardDesc:
      "للاستفسارات والاشتراكات ومتابعة تنبيهات الكورسات والامتحانات عبر رقم الواتساب:",
    waNumberLabel: "رقم الواتساب",
    openWaBtn: "فتح محادثة واتساب الآن",
    ctaChip: "ابدأ رحلتك الآن",
    ctaTitle: "أنشئ حساب جديد أو ادخل بحسابك الحالي",
    ctaDesc:
      "سجّل حسابك في ثوانٍ للوصول إلى كورساتك، حل الاختبارات، واستخدام بنك الأخطاء الذكي.",
    footerRights: "منصة كيمياء برو © 2026 — جميع الحقوق محفوظة",
    adminLoginBtn: "دخول الأدمن",
    mistakesBank: "بنك الأخطاء",
    myCourses: "كورساتي",
    interactiveExam: "اختبار تفاعلي",
    enrolledBadge: "مشترك ✓",
    confirmAnswer: "تأكيد الإجابة",
    nextQuestion: "السؤال التالي",
    scoreLabel: "النقاط",
    correctMsg: "إجابة صحيحة!",
    wrongLoggedMsg: "تم تسجيل السؤال تلقائيًا في بنك الأخطاء!",
    noMistakesMsg: "ممتاز! لا توجد أخطاء معلقة حاليًا.",
    previousChoice: "اختيارك السابق",
    attemptsLabel: "محاولات",
    retryQuestion: "إعادة حل السؤال",
    checkSolution: "تحقق من الحل",
    cancelBtn: "إلغاء",
    retryWrongFeedback: "الإجابة غير صحيحة، حاول مرة أخرى.",
    adminPanelTitle: "لوحة تحكم الإدارة",
    adminPanelSub: "ظاهرة لحساب الأدمن فقط بعد تسجيل الدخول",
    studentsTab: "الطلاب",
    coursesTab: "الكورسات",
    questionsTab: "الأسئلة",
    logsTab: "النشاط الحي",
  },
  en: {
    brandName: "Chemistry",
    brandAccent: "Pro",
    brandSub: "High School Platform • Grades 10, 11 & 12",
    navHome: "Home",
    navPeriodic: "Atomic Table",
    navStudent: "Student Hub",
    navAdmin: "Admin Dashboard",
    newAccount: "New Account",
    createAccount: "Create Account",
    login: "Sign In",
    logout: "Sign Out",
    langToggle: "العربية",
    stage1Chip: "Page 1 • ChemistryPro Academic Suite",
    heroTitlePrefix: "Master Chemistry with Precision in",
    heroTitleSuffix: "for High School",
    heroDesc:
      "A refined high school chemistry platform combining structured lessons, an interactive atomic periodic table, smart quizzes, and a Mistakes Bank that turns misses into mastery.",
    startChooseGrade: "Start by Choosing Grade",
    browseCourses: "Browse Courses",
    explorePeriodic: "Atomic Table",
    metricCourses: "Courses",
    metricGrades: "Grade Tracks",
    metricMistakes: "Mistakes Bank",
    summaryTitle: "Platform Overview",
    summaryFoot:
      "Follow the 4-stage flow: pick your grade, choose your course, explore the atomic table, and follow on WhatsApp or sign in to your account.",
    step1Short: "1. Welcome & Overview",
    step2Short: "2. Choose Grade",
    step3Short: "3. Choose Course",
    step4Short: "4. Follow, WhatsApp & Account",
    periodicBadge: "Interactive Lab • Atomic Periodic Table",
    periodicTitle: "Atomic Periodic Table (Elements 1 – 30)",
    periodicSub:
      "Click any element or search by symbol, name, or atomic number to inspect electron configuration, atomic mass, and properties.",
    periodicSearchPlaceholder: "Search by name, symbol (Fe, Mn, O), or atomic number...",
    allCategories: "All Categories",
    atomicNumberLabel: "Atomic Number (Z)",
    atomicMassLabel: "Atomic Mass",
    electronConfigLabel: "Electron Configuration",
    periodGroupLabel: "Period / Group",
    blockLabel: "Orbital Block",
    selectElementPrompt: "Select any element card to view its detailed atomic profile.",
    stage2Label: "Page 2",
    chooseGradeTitle: "Choose Your Grade",
    chooseGradeSub: "Select your grade level to filter matching chemistry courses right away.",
    pickGradeBtn: "Select",
    pickGradeBtnSuffix: "& Go to Courses",
    stage3Label: "Page 3",
    chooseCourseTitle: "Choose Your Course",
    chooseCourseSub: "Structured lessons and exam practice designed to build mastery.",
    allFilter: "All Grades",
    g10Short: "Grade 10",
    g11Short: "Grade 11",
    g12Short: "Grade 12",
    enterCourse: "Open Course",
    selectCourse: "Select Course",
    stage4Label: "Page 4",
    followAccountTitle: "Follow Us, WhatsApp & Start Your Account",
    followAccountSub:
      "Stay updated via WhatsApp for schedules and reviews, then create an account or sign in.",
    followChip: "Follow Us & WhatsApp",
    waCardTitle: "Direct WhatsApp Updates & Support",
    waCardDesc:
      "For enrollment questions, schedules, and review alerts, reach out on WhatsApp:",
    waNumberLabel: "WhatsApp Number",
    openWaBtn: "Open WhatsApp Chat",
    ctaChip: "Get Started",
    ctaTitle: "Create a New Account or Sign In",
    ctaDesc:
      "Sign up in seconds to access your courses, take interactive quizzes, and review your Mistakes Bank.",
    footerRights: "ChemistryPro © 2026 — All rights reserved",
    adminLoginBtn: "Admin Sign In",
    mistakesBank: "Mistakes Bank",
    myCourses: "My Courses",
    interactiveExam: "Interactive Quiz",
    enrolledBadge: "Enrolled ✓",
    confirmAnswer: "Submit Answer",
    nextQuestion: "Next Question",
    scoreLabel: "Score",
    correctMsg: "Correct answer!",
    wrongLoggedMsg: "Automatically saved to your Mistakes Bank!",
    noMistakesMsg: "Great job! No pending mistakes right now.",
    previousChoice: "Your previous answer",
    attemptsLabel: "Attempts",
    retryQuestion: "Retry Question",
    checkSolution: "Verify Answer",
    cancelBtn: "Cancel",
    retryWrongFeedback: "Not quite right — try another option.",
    adminPanelTitle: "Admin Dashboard",
    adminPanelSub: "Visible exclusively to signed-in Admin",
    studentsTab: "Students",
    coursesTab: "Courses",
    questionsTab: "Questions",
    logsTab: "Live Activity",
  },
} as const;
