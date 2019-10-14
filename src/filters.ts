import moment from "moment";

export function date(value: Date, format: string = "MMMM DD, YYYY") {
  return moment(value).format(format);
}
