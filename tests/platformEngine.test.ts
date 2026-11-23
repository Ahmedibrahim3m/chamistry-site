import { describe, it, expect } from "vitest";
import {
  verifyAdminLogin,
  syncMistakeOnAnswer,
  createStudentRecord,
  filterAtomicElements,
} from "../src/lib/platformEngine";
import { INITIAL_QUESTIONS, UI_COPY } from "../src/data/platformData";
import { ATOMIC_ELEMENTS } from "../src/data/periodicElements";

describe("ChemistryPro v8 Pro Landing & Atomic Table", () => {
  it("provides both Arabic and English translations", () => {
    expect(UI_COPY.ar.mistakesBank).toBe("بنك الأخطاء");
    expect(UI_COPY.en.mistakesBank).toBe("Mistakes Bank");
  });

  it("includes atomic elements including Iron (Fe) and Manganese (Mn)", () => {
    expect(ATOMIC_ELEMENTS.length).toBeGreaterThanOrEqual(30);
    const iron = filterAtomicElements("Fe", "all");
    expect(iron).toHaveLength(1);
    expect(iron[0].atomicNumber).toBe(26);
  });

  it("allows Admin Dashboard only with valid admin credentials", () => {
    expect(verifyAdminLogin("admin", "ADMIN2026")).toBe(true);
    expect(verifyAdminLogin("student", "ADMIN2026")).toBe(false);
  });

  it("registers a new student cleanly", () => {
    const st = createStudentRecord({
      name: "Youssef Khaled",
      phone: "01000001111",
      grade: "g12",
      plan: "VIP",
    });
    expect(st.name).toBe("Youssef Khaled");
    expect(st.grade).toBe("g12");
  });

  it("logs wrong answers into mistakes bank and clears on right retry", () => {
    const q = INITIAL_QUESTIONS[0];
    const wrongRes = syncMistakeOnAnswer([], q, 0);
    expect(wrongRes.isCorrect).toBe(false);
    expect(wrongRes.updatedMistakes.filter((m) => !m.mastered)).toHaveLength(1);

    const retryRes = syncMistakeOnAnswer(wrongRes.updatedMistakes, q, q.correctIndex);
    expect(retryRes.isCorrect).toBe(true);
    expect(retryRes.updatedMistakes.filter((m) => !m.mastered)).toHaveLength(0);
  });
});
