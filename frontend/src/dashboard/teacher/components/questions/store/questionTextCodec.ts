// Converts question collections to and from the builder's plain-text draft format.
import { buildId, createEmptyQuestion } from "./questionFactories";
import { fromQuestionTypeLabel, toQuestionTypeLabel } from "./questionSeedData";
import type { QuestionBuilderAssessmentType, QuestionBuilderQuestion } from "./questionTypes";

function parseNumberedLine(line: string) {
  return line.replace(/^\d+\.\s*/, "").trim();
}

function parseQuestionHeader(question: QuestionBuilderQuestion, lines: string[]) {
  // The parser accepts both the current bracket header and the legacy label-based format.
  const header = lines[0] ?? "";
  const bracketHeader = header.match(/^\s*Question\s+\d+\s+\[Type:\s*(.+?)\]\s+\[Points:\s*(\d+)\]\s*$/i);
  if (bracketHeader) {
    question.questionType = fromQuestionTypeLabel(bracketHeader[1] ?? "");
    question.points = Number(bracketHeader[2] ?? "1") || 1;
    question.questionText = parseNumberedLine(lines[1] ?? "");
    return;
  }
  const typeLine = lines.find((line) => /^Type:\s*/i.test(line));
  const pointsLine = lines.find((line) => /^Points:\s*/i.test(line));
  const questionLineIndex = lines.findIndex((line) => /^Question:\s*$/i.test(line));
  question.questionType = fromQuestionTypeLabel(typeLine?.replace(/^Type:\s*/i, "") ?? "");
  question.points = Number(pointsLine?.replace(/^Points:\s*/i, "") ?? "1") || 1;
  question.questionText = parseNumberedLine(questionLineIndex >= 0 ? lines[questionLineIndex + 1] ?? "" : lines[1] ?? "");
}

function applyTypeSpecificFields(question: QuestionBuilderQuestion, lines: string[]) {
  if (question.questionType === "multiple_choice") {
    const options = ["", "", "", ""];
    lines.filter((line) => /^[A-D]\.\s*/i.test(line)).slice(0, 4).forEach((line, index) => { options[index] = line.replace(/^[A-D]\.\s*/i, "").trim(); });
    question.options = options;
    question.correctAnswer = lines.find((line) => /^Correct Answer:\s*/i.test(line))?.replace(/^Correct Answer:\s*/i, "").trim() ?? "";
    return;
  }
  if (question.questionType === "matching") {
    const leftIndex = lines.findIndex((line) => /^Left:\s*$/i.test(line));
    const rightIndex = lines.findIndex((line) => /^Right:\s*$/i.test(line));
    const leftLines = leftIndex >= 0 ? lines.slice(leftIndex + 1, rightIndex >= 0 ? rightIndex : lines.length).filter((line) => /^\d+\.\s*/.test(line)) : [];
    const rightLines = rightIndex >= 0 ? lines.slice(rightIndex + 1).filter((line) => /^[A-Z]\.\s*/i.test(line)) : [];
    const totalPairs = Math.max(leftLines.length, rightLines.length, 2);
    question.matchingPairs = Array.from({ length: totalPairs }).map((_, index) => ({ id: buildId("match"), left: leftLines[index]?.replace(/^\d+\.\s*/, "").trim() ?? "", right: rightLines[index]?.replace(/^[A-Z]\.\s*/i, "").trim() ?? "" }));
    return;
  }
  const answerLabel = question.questionType === "short_answer" ? "Expected Answer" : question.questionType === "identification" ? "Answer" : "Correct Answer";
  const answerIndex = lines.findIndex((line) => new RegExp(`^${answerLabel}:\\s*$`, "i").test(line));
  const answerLine = lines.find((line) => new RegExp(`^${answerLabel}:\\s*`, "i").test(line));
  const value = (answerIndex >= 0 ? lines[answerIndex + 1] ?? "" : answerLine?.replace(new RegExp(`^${answerLabel}:\\s*`, "i"), "") ?? "").trim();
  if (question.questionType === "short_answer") question.shortAnswer = value;
  if (question.questionType === "identification") question.identificationAnswer = value;
  if (question.questionType === "true_false") question.trueFalseAnswer = value.toLowerCase() === "true" || value.toLowerCase() === "false" ? (value.toLowerCase() as "true" | "false") : "";
}

export function parseQuestionsTextToQuestions(type: QuestionBuilderAssessmentType, itemId?: string | null, text?: string) {
  const source = typeof text === "string" ? text.trim() : "";
  if (!source) return [];
  return source.split(/\n\s*\n(?=Question\s+\d+)/).map((block) => block.trim()).filter(Boolean).map((block) => {
    const question = createEmptyQuestion(type, itemId);
    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
    parseQuestionHeader(question, lines);
    applyTypeSpecificFields(question, lines);
    return question;
  }).filter((question) => question.questionText.trim().length > 0);
}

export function buildQuestionsText(questions: QuestionBuilderQuestion[]) {
  return questions.map((question, index) => {
    const lines = [`Question ${index + 1} [Type: ${toQuestionTypeLabel(question.questionType)}] [Points: ${question.points}]`, `${index + 1}. ${question.questionText.trim() || "(No question text)"}`, ""];
    if (question.questionType === "multiple_choice") { lines.push("Options:"); question.options.forEach((option, optionIndex) => lines.push(`${String.fromCharCode(65 + optionIndex)}. ${option.trim() || "-"}`)); lines.push("", `Correct Answer: ${question.correctAnswer.trim() || "-"}`); }
    if (question.questionType === "matching") { lines.push("Left:"); question.matchingPairs.forEach((pair, pairIndex) => lines.push(`${pairIndex + 1}. ${pair.left.trim() || "-"}`)); lines.push("", "Right:"); question.matchingPairs.forEach((pair, pairIndex) => lines.push(`${String.fromCharCode(65 + pairIndex)}. ${pair.right.trim() || "-"}`)); }
    if (question.questionType === "identification") lines.push("Answer:", question.identificationAnswer.trim() || "-");
    if (question.questionType === "short_answer") lines.push("Expected Answer:", question.shortAnswer.trim() || "-");
    if (question.questionType === "true_false") lines.push("Correct Answer:", question.trueFalseAnswer || "-");
    return lines.join("\n").trim();
  }).join("\n\n\n").trim();
}
