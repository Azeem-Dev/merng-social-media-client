// format javascript date to format "YYYY-mm-dd HH:MM:SS"
export const convertDateToFormat = (dateToConvert) => {
  const d = new Date(dateToConvert);
  const date = d.toISOString().split("T")[0];
  const time = d.toTimeString().split(" ")[0];
  return `${date} ${time}`;
};
