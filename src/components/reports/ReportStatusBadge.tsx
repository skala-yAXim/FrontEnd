import { Badge } from "@/components/ui/badge";

export type ReportStatus = "completed" | "generating" | "draft" | "error";

interface ReportStatusBadgeProps {
  status: ReportStatus;
}

const getStatusColor = (status: ReportStatus): string => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "generating":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "draft":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    case "error":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
};

const getStatusText = (status: ReportStatus): string => {
  switch (status) {
    case "completed":
      return "완료";
    case "generating":
      return "생성 중";
    case "draft":
      return "초안";
    case "error":
      return "오류";
    default:
      return "알 수 없음";
  }
};

export default function ReportStatusBadge({ status }: ReportStatusBadgeProps) {
  return (
    <Badge className={getStatusColor(status)}>{getStatusText(status)}</Badge>
  );
}
