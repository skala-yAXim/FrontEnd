export interface DataItem {
  report_date: string;
  teams: { post: number };
  docs: { docx: number; xlsx: number; pptx: number; etc: number };
  email: { receive: number; send: number };
  git: { pull_request: number; commit: number; issue: number };
}

export interface MultipleBarChartData {
  email: { day: string; email: number; avg: number }[];
  git: { day: string; git: number; avg: number }[];
  docs: { day: string; docs: number; avg: number }[];
  teams: { day: string; teams: number; avg: number }[];
}

export interface StackedBarChartData {
  day: string;
  email: number;
  git: number;
  docs: number;
  teams: number;
}
