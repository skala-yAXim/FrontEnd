import ReportStatusBadge, { ReportStatus } from "./ReportStatusBadge";

export interface WeeklyReportItem {
  id: string;
  title: string;
  createdAt: string;
  status: ReportStatus;
}

interface WeeklyReportTableProps {
  reports: WeeklyReportItem[];
  onRowClick?: (reportId: string, status: ReportStatus) => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

export default function WeeklyReportTable({
  reports,
  onRowClick,
  isLoading = false,
  emptyMessage = "아직 생성된 위클리 보고서가 없습니다."
}: WeeklyReportTableProps) {
  const handleRowClick = (report: WeeklyReportItem) => {
    if (onRowClick) {
      onRowClick(report.id, report.status);
    }
  };

  if (isLoading) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-semibold text-sm">제목</th>
              <th className="text-left py-3 px-4 font-semibold text-sm">생성일자</th>
              <th className="text-left py-3 px-4 font-semibold text-sm">상태</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={3} className="text-center py-8 text-muted-foreground">
                로딩 중...
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-semibold text-sm">제목</th>
            <th className="text-left py-3 px-4 font-semibold text-sm">생성일자</th>
            <th className="text-left py-3 px-4 font-semibold text-sm">상태</th>
          </tr>
        </thead>
        <tbody>
          {reports.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-8 text-muted-foreground">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            reports.map(report => (
              <tr
                key={report.id}
                className={`border-b transition-colors ${
                  report.status === "completed"
                    ? "hover:bg-muted/50 cursor-pointer"
                    : "cursor-not-allowed opacity-75"
                }`}
                onClick={() => handleRowClick(report)}
                title={
                  report.status === "completed"
                    ? "클릭하여 상세보기"
                    : "완료된 보고서만 볼 수 있습니다"
                }
              >
                <td className="py-3 px-4">
                  <div className="font-medium">{report.title}</div>
                </td>
                <td className="py-3 px-4 text-sm text-muted-foreground">
                  {new Date(report.createdAt).toLocaleDateString("ko-KR")}
                </td>
                <td className="py-3 px-4">
                  <ReportStatusBadge status={report.status} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
