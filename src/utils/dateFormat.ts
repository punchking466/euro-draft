/**
 * YYYY-MM-DD 형식의 날짜 리턴
 * @param {Date} date
 * @return {string} YYYY-MM-DD
 */
export function formatDateTypeA(date: Date): string {
  if (!date) return "";
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}
