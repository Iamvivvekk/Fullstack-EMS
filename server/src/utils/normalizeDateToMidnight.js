const getNormalizedDate = (dateInput) => {
  const d = new Date(dateInput);
  d.setHours(0, 0, 0, 0); // Sets time to 00:00:00.000
  return d;
};

export default getNormalizedDate;
