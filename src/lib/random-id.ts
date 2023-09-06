export function generateUniqueRandomNumber() {
  const uniqueNumber = Math.floor(10000 + Math.random() * 90000);
  return String("th1017" + uniqueNumber);
}
