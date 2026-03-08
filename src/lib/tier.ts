export function getTier(score: number) {
  if (score >= 101) {
    return { name: "LEGEND", color: "text-yellow-400" };
  }
  if (score >= 76) {
    return { name: "APEX", color: "text-red-500" };
  }
  if (score >= 51) {
    return { name: "ELITE", color: "text-purple-400" };
  }
  if (score >= 26) {
    return { name: "WARRIOR", color: "text-blue-400" };
  }
  return { name: "RECRUIT", color: "text-zinc-400" };
}