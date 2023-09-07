export const formattedDate = (date: Date) => {
  const originalDate = new Date(date);
  return originalDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
