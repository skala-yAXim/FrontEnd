import { SOURCE_ICONS } from "@/const/sourceIcons";
import { Evidence } from "@/types/reportType";

export const getSourceIcon = (source: Evidence["source"]) => {
  return SOURCE_ICONS[source];
};
