function formatDateToISOString(date) {
  const dateUTC = new Date(date);
  const offset = dateUTC.getTimezoneOffset() * 60000;
  const formattedDate = new Date(dateUTC.getTime() + offset).toISOString();
  return formattedDate;
}

export { formatDateToISOString };
