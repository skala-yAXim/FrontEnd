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

export interface WeeklyReflection {
  title: string;
  summary: string | null;
  content: string[];
}

export interface Report {
  title: string;
  summary: string;
  contents: ReportItem[];
}

export interface DailyReportData {
  id: number;
  createdAt: string;
  updatedAt: string | null;
  date: string;
  title: string;
  report: {
    report_title: string;
    daily_report: Report;
    daily_reflection: Reflection;
  };
}

export interface DailyReportList {
  id: number;
  createdAt: string;
  updatedAt: string | null;
  date: string;
  title: string;
  preview: string;
}

export interface WeeklyReportList {
  id: number;
  createdAt: string;
  updatedAt: string | null;
  startDate: string;
  endDate: string;
  title: string;
  preview: string;
}

export interface WeeklyReportData {
  report_title: string;
  id: number;
  weekly_report: Report;
  weekly_reflection: Reflection;
}

export interface MemberWeeklyReportList {
  id: number;
  createdAt?: string;
  updatedAt: string | null;
  startDate?: string;
  endDate?: string;
  title: string;
  preview: string;
}

export interface MemberWeeklyReportData {
  id: number;
  report: {
    report_title: string;
    weekly_report: Report;
    weekly_reflection: WeeklyReflection;
  };
}
