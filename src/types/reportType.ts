export type Source = "GIT" | "DOCS" | "TEAMS" | "EMAIL";

export interface Evidence {
  source: Source;
  title: string;
  content: string;
  llm_reference: string;
}

export interface ReportItem {
  text: string;
  task?: string | null;
  evidence: Evidence[];
}

export interface ReflectionItem {
  source: Source;
  reflection: string;
}

export interface Reflection {
  title: string;
  summary: string | null;
  contents: ReflectionItem[];
}

export interface Report {
  title: string;
  summary: string;
  contents: ReportItem[];
}

export interface DailyReportData {
  report_title: string;
  id: number;
  daily_report: Report;
  daily_reflection: Reflection;
}

export interface WeeklyReportData {
  report_title: string;
  id: number;
  weekly_report: Report;
  weekly_reflection: {
    title: string;
    content: string[];
  };
}
