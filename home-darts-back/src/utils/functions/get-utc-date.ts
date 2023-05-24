/** Returns UTC date */
export const getUtcDate = (date?: Date): Date => {
  const newDate = date ?? new Date();
  return new Date(newDate.getTime() + newDate.getTimezoneOffset() * 60000);
};
