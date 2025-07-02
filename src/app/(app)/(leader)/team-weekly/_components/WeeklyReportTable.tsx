import DataTable, { Column } from "@/components/ui/data-table";
import { TeamWeeklyReportList } from "@/types/reportType";

interface TeamWeeklyReportTableProps {
  reports: TeamWeeklyReportList[];
  onRowClick?: (reportId: string) => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

export default function WeeklyReportTable({
  reports,
  onRowClick,
  isLoading = false,
  emptyMessage = "아직 생성된 위클리 보고서가 없습니다.",
}: TeamWeeklyReportTableProps) {
  // 행 클릭 핸들러
  const handleRowClick = (item: TeamWeeklyReportList) => {
    if (onRowClick) {
      onRowClick(item.id.toString());
    }
  };

  // 테이블 컬럼 정의
  const columns: Column<TeamWeeklyReportList>[] = [
    {
      key: "title",
      label: "제목",
      render: value => <div className='font-medium'>{value}</div>,
    },
    {
      key: "createdAt",
      label: "생성일자",
      render: value => (
        <span className='text-sm text-muted-foreground'>
          {new Date(value).toLocaleDateString("ko-KR")}
        </span>
      ),
    },
  ];

  return (
    <DataTable
      data={reports}
      columns={columns}
      onRowClick={handleRowClick}
      isLoading={isLoading}
      emptyMessage={emptyMessage}
    />
  );
}
