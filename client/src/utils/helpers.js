import moment from "moment";

export function formatDateOrTime(date) {
    const m = moment(date);
    return m.isSame(moment(), "day") ? m.format("hh:mm a") : m.format("DD/MM/YYYY");
  }