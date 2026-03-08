// Provides formatting and visual helpers for the grades stats cards.
export function formatAverageValue(value: number) {
  return `${value.toFixed(1)}%`;
}

export function formatWholePercent(value: number) {
  return `${value.toFixed(0)}%`;
}

export function getTileClass(base: "blue" | "green" | "brown" | "red") {
  if (base === "blue") return "bg-gradient-to-br from-[#3B82F6]/85 to-[#2563EB]/85";
  if (base === "green") return "bg-gradient-to-br from-[#1EA896]/85 to-[#159A85]/85";
  if (base === "brown") return "bg-gradient-to-br from-[#7A5A3A]/85 to-[#5E4329]/85";
  return "bg-gradient-to-br from-[#EF4444]/85 to-[#DC2626]/85";
}

export function getIconClass(base: "blue" | "green" | "brown" | "red") {
  if (base === "green") return "text-[#0F2F2B]";
  if (base === "brown") return "text-[#F8F4E1]";
  return "text-white";
}
