export type Source = "GIT" | "DOCS" | "TEAMS" | "EMAIL";

export interface Evidence {
  source: Source;
  title: string;
  detailed_activities: string;
  llm_reference: string;
}

export interface ReportItem {
  text: string;
  project_id: string;
  project_name: string;
  task_id: string;
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
  userName: string;
}

export interface MemberWeeklyReportData {
  id: number;
  report: {
    report_title: string;
    weekly_report: Report;
    weekly_reflection: WeeklyReflection;
  };
}

export interface TeamWeeklyReportList {
  id: number;
  createdAt: string;
  updatedAt: string | null;
  startDate?: string;
  endDate?: string;
  title: string;
}

export interface TeamWeeklyHighlightItem {
  title: string;
  contributors: string[];
  summary: string;
  progress_percentage: number;
  llm_reference: string;
}

export interface ProjectReportItem {
  project_id: number;
  project_name: string;
  summary: string;
  highlights: TeamWeeklyHighlightItem[];
  next_week_schedule: NextWeekSchedule[];
  team_progress_overview: {
    overall_progress: number;
    llm_reference: string;
  };
}

export interface TeamWeeklyReflection {
  content: string[];
}

export interface NextWeekSchedule {
  task_id: string;
  task_name: string;
  start_date: string;
  end_date: string;
  description: string;
}

export interface TeamWeeklyReportData {
  id: number;
  createdAt: string;
  updatedAt: string | null;
  startDate: string;
  endDate: string;
  title: string;
  reportMd: string;
  reportJson: {
    report_title: string;
    team_weekly_report: ProjectReportItem[];
    team_weekly_reflection: TeamWeeklyReflection;
    weekly_short_review: string;
    weekly_report_md: string;
  };
}
