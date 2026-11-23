import { BilingualText } from "./platformData";

export type ElementCategory =
  | "nonmetal"
  | "alkali"
  | "alkaline"
  | "transition"
  | "post-transition"
  | "metalloid"
  | "halogen"
  | "noble";

export interface PeriodicElement {
  atomicNumber: number;
  symbol: string;
  name: BilingualText;
  atomicMass: string;
  electronConfig: string;
  block: "s" | "p" | "d" | "f";
  period: number;
  group: number;
  category: ElementCategory;
  summary: BilingualText;
}

export const CATEGORY_STYLES: Record<
  ElementCategory,
  {
    label: BilingualText;
    cardClass: string;
    badgeClass: string;
  }
> = {
  nonmetal: {
    label: { ar: "لافلز", en: "Nonmetal" },
    cardClass:
      "bg-sky-50/90 dark:bg-sky-950/50 border-sky-200 dark:border-sky-800/80 text-sky-900 dark:text-sky-200",
    badgeClass: "bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300",
  },
  alkali: {
    label: { ar: "فلز قلوي", en: "Alkali Metal" },
    cardClass:
      "bg-rose-50/90 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800/80 text-rose-900 dark:text-rose-200",
    badgeClass: "bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300",
  },
  alkaline: {
    label: { ar: "فلز قلوي أرضي", en: "Alkaline Earth" },
    cardClass:
      "bg-amber-50/90 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800/80 text-amber-900 dark:text-amber-200",
    badgeClass: "bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300",
  },
  transition: {
    label: { ar: "عنصر انتقالي", en: "Transition Metal" },
    cardClass:
      "bg-indigo-50/90 dark:bg-indigo-950/55 border-indigo-200 dark:border-indigo-800/80 text-indigo-900 dark:text-indigo-200",
    badgeClass: "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300",
  },
  "post-transition": {
    label: { ar: "فلز انتقالي لاحق", en: "Post-Transition" },
    cardClass:
      "bg-teal-50/90 dark:bg-teal-950/50 border-teal-200 dark:border-teal-800/80 text-teal-900 dark:text-teal-200",
    badgeClass: "bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300",
  },
  metalloid: {
    label: { ar: "شبه فلز", en: "Metalloid" },
    cardClass:
      "bg-emerald-50/90 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800/80 text-emerald-900 dark:text-emerald-200",
    badgeClass: "bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300",
  },
  halogen: {
    label: { ar: "هالوجين", en: "Halogen" },
    cardClass:
      "bg-violet-50/90 dark:bg-violet-950/50 border-violet-200 dark:border-violet-800/80 text-violet-900 dark:text-violet-200",
    badgeClass: "bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300",
  },
  noble: {
    label: { ar: "غاز نبيل", en: "Noble Gas" },
    cardClass:
      "bg-cyan-50/90 dark:bg-cyan-950/50 border-cyan-200 dark:border-cyan-800/80 text-cyan-900 dark:text-cyan-200",
    badgeClass: "bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300",
  },
};

export const ATOMIC_ELEMENTS: PeriodicElement[] = [
  {
    atomicNumber: 1,
    symbol: "H",
    name: { ar: "هيدروجين", en: "Hydrogen" },
    atomicMass: "1.008",
    electronConfig: "1s¹",
    block: "s",
    period: 1,
    group: 1,
    category: "nonmetal",
    summary: {
      ar: "أخف عنصر وأكثره وفرة في الكون، ويكوّن روابط تساهمية وهيدروجينية.",
      en: "Lightest and most abundant element in the universe; forms covalent and hydrogen bonds.",
    },
  },
  {
    atomicNumber: 2,
    symbol: "He",
    name: { ar: "هيليوم", en: "Helium" },
    atomicMass: "4.0026",
    electronConfig: "1s²",
    block: "s",
    period: 1,
    group: 18,
    category: "noble",
    summary: {
      ar: "غاز نبيل مستقر مكتمل الغلاف الأول، منخفض الكثافة والغليان.",
      en: "Monatomic noble gas with a complete 1s shell and extremely low boiling point.",
    },
  },
  {
    atomicNumber: 3,
    symbol: "Li",
    name: { ar: "ليثيوم", en: "Lithium" },
    atomicMass: "6.94",
    electronConfig: "[He] 2s¹",
    block: "s",
    period: 2,
    group: 1,
    category: "alkali",
    summary: {
      ar: "أخف الفلزات القلوية، يُستخدم بكثافة في البطاريات القابلة لإعادة الشحن.",
      en: "Lightest alkali metal; widely used in high-energy rechargeable lithium batteries.",
    },
  },
  {
    atomicNumber: 4,
    symbol: "Be",
    name: { ar: "بريليوم", en: "Beryllium" },
    atomicMass: "9.0122",
    electronConfig: "[He] 2s²",
    block: "s",
    period: 2,
    group: 2,
    category: "alkaline",
    summary: {
      ar: "فلز قلوي أرضي خفيف وصلب، يدخل في السبائك الخاصة والنوافذ الأشعاعية.",
      en: "Rigid, lightweight alkaline earth metal used in specialized alloys and X-ray windows.",
    },
  },
  {
    atomicNumber: 5,
    symbol: "B",
    name: { ar: "بورون", en: "Boron" },
    atomicMass: "10.81",
    electronConfig: "[He] 2s² 2p¹",
    block: "p",
    period: 2,
    group: 13,
    category: "metalloid",
    summary: {
      ar: "شبه فلز يكوّن مركبات غير مكتملة الثمانية مثل BF₃ ويدخل في الزجاج الحراري.",
      en: "Metalloid that often forms electron-deficient compounds like BF₃ and borosilicate glass.",
    },
  },
  {
    atomicNumber: 6,
    symbol: "C",
    name: { ar: "كربون", en: "Carbon" },
    atomicMass: "12.011",
    electronConfig: "[He] 2s² 2p²",
    block: "p",
    period: 2,
    group: 14,
    category: "nonmetal",
    summary: {
      ar: "أساس الكيمياء العضوية بفضل قدرته الفريدة على تكوين سلاسل وحلقات مستقرة.",
      en: "Backbone of organic chemistry due to catenation and versatile sp³, sp², and sp hybridization.",
    },
  },
  {
    atomicNumber: 7,
    symbol: "N",
    name: { ar: "نيتروجين", en: "Nitrogen" },
    atomicMass: "14.007",
    electronConfig: "[He] 2s² 2p³",
    block: "p",
    period: 2,
    group: 15,
    category: "nonmetal",
    summary: {
      ar: "يشكل نحو 78% من الهواء الجوي، ويدخل في تحضير النشادر والأسمدة.",
      en: "Makes up ~78% of Earth's atmosphere; essential for ammonia synthesis and biomolecules.",
    },
  },
  {
    atomicNumber: 8,
    symbol: "O",
    name: { ar: "أكسجين", en: "Oxygen" },
    atomicMass: "15.999",
    electronConfig: "[He] 2s² 2p⁴",
    block: "p",
    period: 2,
    group: 16,
    category: "nonmetal",
    summary: {
      ar: "عنصر نشط عالي السالبية الكهربية، ضروري للتنفس والاحتراق والأكاسيد.",
      en: "Highly electronegative chalcogen essential for respiration, combustion, and oxide formation.",
    },
  },
  {
    atomicNumber: 9,
    symbol: "F",
    name: { ar: "فلور", en: "Fluorine" },
    atomicMass: "18.998",
    electronConfig: "[He] 2s² 2p⁵",
    block: "p",
    period: 2,
    group: 17,
    category: "halogen",
    summary: {
      ar: "أعلى العناصر سالبية كهربية في الجدول الدوري وأقوى عامل مؤكسد.",
      en: "Most electronegative element and strongest oxidizing agent in the periodic table.",
    },
  },
  {
    atomicNumber: 10,
    symbol: "Ne",
    name: { ar: "نيون", en: "Neon" },
    atomicMass: "20.180",
    electronConfig: "[He] 2s² 2p⁶",
    block: "p",
    period: 2,
    group: 18,
    category: "noble",
    summary: {
      ar: "غاز نبيل يُصدر توهجًا برتقاليًا محمرًا مميزًا في أنابيب التفريغ الكهربائي.",
      en: "Noble gas emitting a bright reddish-orange glow in discharge lamps and signs.",
    },
  },
  {
    atomicNumber: 11,
    symbol: "Na",
    name: { ar: "صوديوم", en: "Sodium" },
    atomicMass: "22.990",
    electronConfig: "[Ne] 3s¹",
    block: "s",
    period: 3,
    group: 1,
    category: "alkali",
    summary: {
      ar: "فلز قلوي شديد النشاط يتفاعل بعنف مع الماء مكونًا هيدروكسيد الصوديوم وغاز الهيدروجين.",
      en: "Reactive alkali metal that reacts vigorously with water to form NaOH and H₂.",
    },
  },
  {
    atomicNumber: 12,
    symbol: "Mg",
    name: { ar: "ماغنيسيوم", en: "Magnesium" },
    atomicMass: "24.305",
    electronConfig: "[Ne] 3s²",
    block: "s",
    period: 3,
    group: 2,
    category: "alkaline",
    summary: {
      ar: "فلز قلوي أرضي خفيف يدخل في السبائك الهندسية ويحترق بلهب أبيض ساطع.",
      en: "Lightweight alkaline earth metal used in structural alloys; burns with a bright white flame.",
    },
  },
  {
    atomicNumber: 13,
    symbol: "Al",
    name: { ar: "ألومنيوم", en: "Aluminum" },
    atomicMass: "26.982",
    electronConfig: "[Ne] 3s² 3p¹",
    block: "p",
    period: 3,
    group: 13,
    category: "post-transition",
    summary: {
      ar: "أكثر الفلزات وفرة في القشرة الأرضية، ويكوّن طبقة أكسيد حامية متماسكة (خمول ظاهري).",
      en: "Most abundant metal in Earth's crust; passivates with a protective Al₂O₃ surface film.",
    },
  },
  {
    atomicNumber: 14,
    symbol: "Si",
    name: { ar: "سيليكون", en: "Silicon" },
    atomicMass: "28.085",
    electronConfig: "[Ne] 3s² 3p²",
    block: "p",
    period: 3,
    group: 14,
    category: "metalloid",
    summary: {
      ar: "شبه فلز أساسي في أشباه الموصلات والرقائق الإلكترونية والسيليكات.",
      en: "Key semiconductor metalloid powering microchips, solar cells, and silicate minerals.",
    },
  },
  {
    atomicNumber: 15,
    symbol: "P",
    name: { ar: "فوسفور", en: "Phosphorus" },
    atomicMass: "30.974",
    electronConfig: "[Ne] 3s² 3p³",
    block: "p",
    period: 3,
    group: 15,
    category: "nonmetal",
    summary: {
      ar: "لافلز متعدد الصور التآصلية (أبيض، أحمر، أسود)، يدخل في الأسمدة وحمض الفوسفوريك.",
      en: "Poly-allotropic nonmetal (white, red, black) vital to fertilizers, ATP, and DNA.",
    },
  },
  {
    atomicNumber: 16,
    symbol: "S",
    name: { ar: "كبريت", en: "Sulfur" },
    atomicMass: "32.06",
    electronConfig: "[Ne] 3s² 3p⁴",
    block: "p",
    period: 3,
    group: 16,
    category: "nonmetal",
    summary: {
      ar: "لافلز أصفر يُستخدم في صناعة حمض الكبريتيك H₂SO₄ والمطاط والمركبات الكيميائية.",
      en: "Yellow nonmetal central to sulfuric acid (H₂SO₄) manufacturing and vulcanization.",
    },
  },
  {
    atomicNumber: 17,
    symbol: "Cl",
    name: { ar: "كلور", en: "Chlorine" },
    atomicMass: "35.45",
    electronConfig: "[Ne] 3s² 3p⁵",
    block: "p",
    period: 3,
    group: 17,
    category: "halogen",
    summary: {
      ar: "هالوجين يُستخدم في التطهير ومعالجة المياه وتحضير كلوريد الهيدروجين والمركبات العضوية.",
      en: "Halogen widely used for water disinfection, PVC production, and inorganic/organic synthesis.",
    },
  },
  {
    atomicNumber: 18,
    symbol: "Ar",
    name: { ar: "أرجون", en: "Argon" },
    atomicMass: "39.948",
    electronConfig: "[Ne] 3s² 3p⁶",
    block: "p",
    period: 3,
    group: 18,
    category: "noble",
    summary: {
      ar: "غاز نبيل يُوفّر جوًا خاملًا في اللحام والإضاءة لحماية المواد من الأكسدة.",
      en: "Inert noble gas providing protective shielding atmospheres in welding and lighting.",
    },
  },
  {
    atomicNumber: 19,
    symbol: "K",
    name: { ar: "بوتاسيوم", en: "Potassium" },
    atomicMass: "39.098",
    electronConfig: "[Ar] 4s¹",
    block: "s",
    period: 4,
    group: 1,
    category: "alkali",
    summary: {
      ar: "فلز قلوي نشط جدًا يدخل في أملاح الأسمدة والعمليات الحيوية داخل الخلايا.",
      en: "Highly reactive alkali metal essential for plant nutrition, fertilizers, and cell signaling.",
    },
  },
  {
    atomicNumber: 20,
    symbol: "Ca",
    name: { ar: "كالسيوم", en: "Calcium" },
    atomicMass: "40.078",
    electronConfig: "[Ar] 4s²",
    block: "s",
    period: 4,
    group: 2,
    category: "alkaline",
    summary: {
      ar: "فلز قلوي أرضي يدخل في كربونات الكالسيوم والجير والأسمنت والعظام.",
      en: "Alkaline earth metal found in limestone (CaCO₃), cement, plaster, and bones.",
    },
  },
  {
    atomicNumber: 21,
    symbol: "Sc",
    name: { ar: "سكانديوم", en: "Scandium" },
    atomicMass: "44.956",
    electronConfig: "[Ar] 3d¹ 4s²",
    block: "d",
    period: 4,
    group: 3,
    category: "transition",
    summary: {
      ar: "أول عناصر السلسلة الانتقالية الأولى، يُضاف بكميات ضئيلة لسبائك الألومنيوم خفيفة الوزن.",
      en: "First 3d transition element; forms high-strength, lightweight aluminum-scandium alloys.",
    },
  },
  {
    atomicNumber: 22,
    symbol: "Ti",
    name: { ar: "تيتانيوم", en: "Titanium" },
    atomicMass: "47.867",
    electronConfig: "[Ar] 3d² 4s²",
    block: "d",
    period: 4,
    group: 4,
    category: "transition",
    summary: {
      ar: "فلز انتقالي شديد الصلابة ومقاوم للتآكل، يُستخدم في هياكل الطائرات والغرسات الطبية.",
      en: "High-strength, corrosion-resistant transition metal used in aerospace and medical implants.",
    },
  },
  {
    atomicNumber: 23,
    symbol: "V",
    name: { ar: "فاناديوم", en: "Vanadium" },
    atomicMass: "50.942",
    electronConfig: "[Ar] 3d³ 4s²",
    block: "d",
    period: 4,
    group: 5,
    category: "transition",
    summary: {
      ar: "يُضاف للصلب لزيادة مقاومته للتآكل والشد، ويدخل خامس أكسيده V₂O₅ كعامل حفاز.",
      en: "Strengthens steel alloys; V₂O₅ serves as an important industrial catalyst.",
    },
  },
  {
    atomicNumber: 24,
    symbol: "Cr",
    name: { ar: "كروم", en: "Chromium" },
    atomicMass: "51.996",
    electronConfig: "[Ar] 3d⁵ 4s¹",
    block: "d",
    period: 4,
    group: 6,
    category: "transition",
    summary: {
      ar: "توزيعه الإلكتروني [Ar] 3d⁵ 4s¹ لاستقرار المستوى الفرعي d، ويقاوم الصدأ بشدة.",
      en: "Notable [Ar] 3d⁵ 4s¹ configuration; prized for corrosion resistance and stainless steel.",
    },
  },
  {
    atomicNumber: 25,
    symbol: "Mn",
    name: { ar: "منجنيز", en: "Manganese" },
    atomicMass: "54.938",
    electronConfig: "[Ar] 3d⁵ 4s²",
    block: "d",
    period: 4,
    group: 7,
    category: "transition",
    summary: {
      ar: "يُستخدم في سبائك الصلب المقاومة للتآكل، وله حالات تأكسد متعددة تصل إلى +7 في KMnO₄.",
      en: "Used in tough steel alloys and exhibits oxidation states up to +7 (as in KMnO₄).",
    },
  },
  {
    atomicNumber: 26,
    symbol: "Fe",
    name: { ar: "حديد", en: "Iron" },
    atomicMass: "55.845",
    electronConfig: "[Ar] 3d⁶ 4s²",
    block: "d",
    period: 4,
    group: 8,
    category: "transition",
    summary: {
      ar: "عماد الصناعات الثقيلة والصلب، ويدخل كعامل حفاز في تحضير النشادر بطريقة هابر-بوش.",
      en: "Cornerstone of steel and heavy industry; catalyzes ammonia synthesis in the Haber process.",
    },
  },
  {
    atomicNumber: 27,
    symbol: "Co",
    name: { ar: "كوبالت", en: "Cobalt" },
    atomicMass: "58.933",
    electronConfig: "[Ar] 3d⁷ 4s²",
    block: "d",
    period: 4,
    group: 9,
    category: "transition",
    summary: {
      ar: "يشبه الحديد في خواصه المغناطيسية، وله نظير مشع Co-60 يُستخدم في حفظ الأغذية والطب.",
      en: "Magnetic transition metal; Co-60 is used in sterilization and radiation therapy.",
    },
  },
  {
    atomicNumber: 28,
    symbol: "Ni",
    name: { ar: "نيكل", en: "Nickel" },
    atomicMass: "58.693",
    electronConfig: "[Ar] 3d⁸ 4s²",
    block: "d",
    period: 4,
    group: 10,
    category: "transition",
    summary: {
      ar: "يُستخدم في طلاء الفلزات والسبائك المقاومة للأحماض وفي هدرجة الزيوت النباتية.",
      en: "Used in corrosion-resistant alloys, electroplating, and catalytic hydrogenation of oils.",
    },
  },
  {
    atomicNumber: 29,
    symbol: "Cu",
    name: { ar: "نحاس", en: "Copper" },
    atomicMass: "63.546",
    electronConfig: "[Ar] 3d¹⁰ 4s¹",
    block: "d",
    period: 4,
    group: 11,
    category: "transition",
    summary: {
      ar: "موصل ممتاز للكهرباء والحرارة، وتوزيعه [Ar] 3d¹⁰ 4s¹ بامتلاء المستوى الفرعي d.",
      en: "High electrical conductivity; features a filled 3d¹⁰ subshell with [Ar] 3d¹⁰ 4s¹ configuration.",
    },
  },
  {
    atomicNumber: 30,
    symbol: "Zn",
    name: { ar: "خارصين", en: "Zinc" },
    atomicMass: "65.38",
    electronConfig: "[Ar] 3d¹⁰ 4s²",
    block: "d",
    period: 4,
    group: 12,
    category: "transition",
    summary: {
      ar: "يُستخدم في جلفنة الحديد لحمايته من الصدأ، ويمتلك حالة تأكسد واحدة رئيسية هي +2.",
      en: "Used to galvanize steel against rust; typically forms a single +2 oxidation state.",
    },
  },
];
