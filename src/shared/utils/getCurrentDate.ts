const getCurrentDate = (): string => {
  const currentDate = new Date();

  const date: number = currentDate.getDate();
  const month: number = currentDate.getMonth() + 1;
  const year: number = currentDate.getFullYear();

  const result: string = `${date.toString().padStart(2, '0')}.${month
    .toString()
    .padStart(2, '0')}.${year}`;

  return result;
};

export default getCurrentDate;
