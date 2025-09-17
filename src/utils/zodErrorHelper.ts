export function extractFirstErrors(
  errors: Record<string, string[] | undefined>,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(errors).map(([key, value]) => [key, value?.[0] ?? ""]),
  );
}
