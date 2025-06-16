export interface DataItem {
  report_date: string;
  teams: { post: number };
  docs: { docx: number; xlsx: number; txt: number; etc: number };
  email: { receive: number; send: number };
  git: { pull_request: number; commit: number; issue: number };
}

export interface ChartData {
  email: { day: string; email: number; avg: number }[];
  git: { day: string; git: number; avg: number }[];
  docs: { day: string; docs: number; avg: number }[];
  teams: { day: string; teams: number; avg: number }[];
}
