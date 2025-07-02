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
  };
}

export interface Evidence {
  source: string;
  title: string;
  detailed_activities: string[];
  llm_reference: string;
}

export interface ReportContent {
  text: string;
  task_id: string | null;
  task: string | null;
  evidence: Evidence[];
}

export interface Report {
  project_id: string;
  project_name: string;
  summary: string;
  project_period: string;
  contents: ReportContent[];
  next_week_schedule: NextWeekSchedule[];
}

export interface WeeklyReflection {
  title: string;
  content: string[];
}

export interface NextWeekSchedule {
  task_id: string;
  task_name: string;
  start_date: string;
  end_date: string;
  description: string;
}
