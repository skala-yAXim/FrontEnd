import { CardContent } from "@/components/ui/card";
import { ReportStatus } from "./ReportStatusBadge";
import WeeklyReportPagination from "./WeeklyReportPagination";
import WeeklyReportTable, { WeeklyReportItem } from "./WeeklyReportTable";

interface WeeklyReportListPageProps {
  title?: string;
  createButtonText?: string;
  onCreateNew: () => void;
  reports: WeeklyReportItem[];
  onRowClick?: (reportId: string, status: ReportStatus) => void;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

export default function WeeklyReportListPage({
  title = "보고서 목록",
  createButtonText = "새 보고서 생성",
  onCreateNew,
  reports,
  onRowClick,
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
  isLoading = false,
  emptyMessage = "아직 생성된 위클리 보고서가 없습니다.",
}: WeeklyReportListPageProps) {
  return (
    <div>
      <CardContent>
        <WeeklyReportTable
          reports={reports}
          onRowClick={onRowClick}
          isLoading={isLoading}
          emptyMessage={emptyMessage}
        />
        <WeeklyReportPagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
        />
      </CardContent>
    </div>
  );
}
