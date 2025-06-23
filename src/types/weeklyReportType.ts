export interface WeeklyReport {
  id: number;
  createdAt: string;
  updatedAt: string | null;
  startDate: string;
  endDate: string;
  title: string;
  report: {
    report_title: string;
    weekly_report: Report[];
    weekly_reflection: WeeklyReflection;
    next_week_schedule: NextWeekSchedule[];
  };
}

export interface Evidence {
  source: string;
  title: string;
  content: string;
  LLM_reference: string;
}

export interface ReportContent {
  text: string;
  evidence: Evidence[];
}

export interface Report {
  project_id: string;
  project_name: string;
  summary: string;
  project_period: string;
  contents: ReportContent[];
}

export interface WeeklyReflection {
  content: string[];
}

export interface NextWeekSchedule {
  task_id: string;
  task_name: string;
  start_date: string;
  end_date: string;
  description: string;
}
