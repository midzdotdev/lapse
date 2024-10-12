export const safeParseInt = (value: string): number | null => {
  const parsed = parseInt(value);

  return Number.isInteger(parsed) ? parsed : null;
};
