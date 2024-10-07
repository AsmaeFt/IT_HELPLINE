export const OptionsFormat = (arr) => arr.map((e) => ({ value: e, label: e }));

export const getDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const format = `${year}-${month}-${day}`;
  return format;
};

export const FilterdData = (data, input) => {
  return data.filter(
    (d) =>
      d.poste.toLowerCase().includes(input.toLowerCase()) ||
      d.matricule.toString().toLowerCase().includes(input.toLowerCase())
  );
};

export const getShiftDate = (date) => {
  const hour = new Date(date).getHours();
  const shiftDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );

  if (hour >= 0 && hour < 6) {
    shiftDate.setUTCDate(shiftDate.getUTCDate() - 1);
  }

  let shift = "night";

  if (hour >= 6 && hour < 14) {
    shift = "morning";
  } else if (hour >= 14 && hour < 22) {
    shift = "evening";
  }

  return { shiftDate, shift };
};
