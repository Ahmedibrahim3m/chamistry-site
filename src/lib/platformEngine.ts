import {
  ExamQuestion,
  GRADE_LABELS,
  MistakeRecord,
  RegisteredStudent,
} from "@/data/platformData";
import { ATOMIC_ELEMENTS, ElementCategory, PeriodicElement } from "@/data/periodicElements";

export const ADMIN_ACCESS_CODE = "ADMIN2026";

export function verifyAdminLogin(username: string, accessCode: string): boolean {
  const cleanUser = username.trim().toLowerCase();
  const cleanCode = accessCode.trim();
  const validUsers = ["admin", "admin@chemistrypro.edu", "مستر"];
  return validUsers.includes(cleanUser) && cleanCode === ADMIN_ACCESS_CODE;
}

export function syncMistakeOnAnswer(
  mistakes: MistakeRecord[],
  question: ExamQuestion,
  selectedOptionIndex: number
): { isCorrect: boolean; updatedMistakes: MistakeRecord[] } {
  const isCorrect = selectedOptionIndex === question.correctIndex;
  const existingIdx = mistakes.findIndex((m) => m.questionId === question.id);

  if (!isCorrect) {
    if (existingIdx >= 0) {
      const next = [...mistakes];
      next[existingIdx] = {
        ...next[existingIdx],
        selectedOptionIndex,
        attempts: next[existingIdx].attempts + 1,
        mastered: false,
      };
      return { isCorrect: false, updatedMistakes: next };
    }
    return {
      isCorrect: false,
      updatedMistakes: [
        {
          questionId: question.id,
          selectedOptionIndex,
          attempts: 1,
          mastered: false,
        },
        ...mistakes,
      ],
    };
  }

  if (existingIdx >= 0) {
    const next = [...mistakes];
    next[existingIdx] = { ...next[existingIdx], mastered: true };
    return { isCorrect: true, updatedMistakes: next };
  }

  return { isCorrect: true, updatedMistakes: mistakes };
}

export function createStudentRecord(params: {
  name: string;
  phone: string;
  grade: "g10" | "g11" | "g12";
  plan: "VIP" | "Standard";
}): RegisteredStudent {
  return {
    id: `stu_${Date.now().toString().slice(-5)}`,
    name: params.name.trim(),
    phone: params.phone.trim(),
    grade: params.grade,
    gradeLabel: GRADE_LABELS[params.grade],
    plan: params.plan,
    status: "Active",
    mastery: 70,
    createdAt: new Date().toISOString().slice(0, 10),
  };
}

export function filterAtomicElements(
  query: string,
  category: ElementCategory | "all"
): PeriodicElement[] {
  const q = query.trim().toLowerCase();
  return ATOMIC_ELEMENTS.filter((el) => {
    const matchesCategory = category === "all" || el.category === category;
    if (!matchesCategory) return false;
    if (!q) return true;
    return (
      String(el.atomicNumber) === q ||
      el.symbol.toLowerCase().includes(q) ||
      el.name.en.toLowerCase().includes(q) ||
      el.name.ar.toLowerCase().includes(q) ||
      el.electronConfig.toLowerCase().includes(q)
    );
  });
}
