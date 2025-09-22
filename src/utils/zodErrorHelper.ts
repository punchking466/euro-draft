export function extractFirstErrors(
  errors: Record<string, string[] | undefined>,
): Partial<Record<string, string>> {
  return Object.fromEntries(
    Object.entries(errors).map(([key, value]) => [key, value?.[0] ?? ""]),
  );
}
