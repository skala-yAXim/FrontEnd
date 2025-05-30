import Link from "next/link";
import { DailyReport } from "@/types/dailyReport";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DailyReportListProps {
  reports: DailyReport[];
}

export function DailyReportList({ reports }: DailyReportListProps) {
  const getStatusBadge = (status: DailyReport["status"]) => {
    switch (status) {
      case "published":
        return <Badge variant='success'>📝 완료</Badge>;
      case "draft":
        return <Badge variant='warning'>⏳ 생성중</Badge>;
      case "archived":
        return <Badge variant='secondary'>📁 보관됨</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className='space-y-4'>
      {reports.map(report => (
        <Link
          key={report.id}
          href={`/daily-reports/${report.id}`}
          className='block transition-all hover:scale-[1.01]'
        >
          <Card className='hover:shadow-lg border-l-4 border-l-primary/20 hover:border-l-primary transition-all'>
            <CardHeader>
              <div className='flex items-start justify-between'>
                <div className='flex-1 space-y-3'>
                  {/* 제목 */}
                  <CardTitle className='text-lg leading-tight line-clamp-2'>
                    {report.title}
                  </CardTitle>

                  {/* 생성일자 정보 */}
                  <div className='flex items-center space-x-6 text-sm text-muted-foreground'>
                    <div className='flex items-center space-x-2'>
                      <span>📅</span>
                      <span className='font-medium'>
                        {formatDate(report.date)}
                      </span>
                    </div>

                    <div className='flex items-center space-x-2'>
                      <span>🕒</span>
                      <span>생성: {formatTime(report.createdAt)}</span>
                    </div>

                    {/* 첨부파일 개수 */}
                    {report.attachments && report.attachments.length > 0 && (
                      <div className='flex items-center space-x-1'>
                        <span>📎</span>
                        <span>{report.attachments.length}개</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 상태 뱃지 및 화살표 */}
                <div className='flex flex-col items-end space-y-3 ml-4'>
                  {getStatusBadge(report.status)}

                  {/* 화살표 아이콘 */}
                  <div className='text-muted-foreground group-hover:text-primary transition-colors'>
                    →
                  </div>
                </div>
              </div>
            </CardHeader>

            {/* 간단한 내용 미리보기 */}
            <CardContent className='pt-0'>
              <p className='text-muted-foreground text-sm line-clamp-2'>
                {report.content.substring(0, 120)}...
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
