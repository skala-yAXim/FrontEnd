export type Evidence = {
  title: string;
  content: string;
  LLM_reference: string;
};

export type ReportItem = {
  text: string;
  evidence: Evidence[];
};

export type Reflection = {
  title: string;
  content: string[];
};

export type DailyReportData = {
  report_title: string;
  id: number;
  daily_report: {
    title: string;
    summary: string;
    contents: ReportItem[];
  };
  daily_reflection: Reflection;
};
