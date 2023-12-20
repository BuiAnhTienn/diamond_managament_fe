import dayjs from "dayjs";

function formatDate(date: string | undefined) {
  const originalDate = dayjs(date);
  const formattedDate = originalDate.format('DD/MM/YYYY');
return formattedDate;
}

export default formatDate;
