import { formatValue } from "../../../common/formatText";

export const getSalaryRange = (max, min) => {
  if (!max || !min) return "N/A";
  let max_value = formatValue(max);
  let min_value = formatValue(min);

  return `${min_value} - ${max_value}`;
};
