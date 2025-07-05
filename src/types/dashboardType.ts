export interface StaticsUserType {
  report_date: string;
  teams: TeamsType;
  docs: DocsType;
  email: EmailType;
  git: GitType;
}

export interface StaticsTeamType {
  report_date: string;
  teams: TeamsType;
  docs: DocsType;
  email: EmailType;
  git: GitType;
}

export interface StaticsTermType {
  startDate: string;
  endDate: string;
}

export interface TeamsType {
  post: number;
  reply: number;
}

export interface DocsType {
  docx: number;
  xlsx: number;
  pptx: number;
  etc: number;
}

export interface EmailType {
  receive: number;
  send: number;
}

export interface GitType {
  pull_request: number;
  commit: number;
  issue: number;
}

//   {
//     report_date: "2025-05-30",
//     teams: {
//       post: 0,
//     },
//     docs: {
//       docx: 0,
//       xlsx: 0,
//       txt: 0,
//       etc: 0,
//     },
//     email: {
//       receive: 1,
//       send: 0,
//     },
//     git: {
//       pull_request: 3,
//       commit: 5,
//       issue: 0,
//     },
//   },
//   {
//     report_date: "2025-05-31",
//     teams: {
//       post: 2,
//     },
//     docs: {
//       docx: 0,
//       xlsx: 0,
//       txt: 0,
//       etc: 0,
//     },
//     email: {
//       receive: 0,
//       send: 0,
//     },
//     git: {
//       pull_request: 0,
//       commit: 0,
//       issue: 0,
//     },
//   },
//   {
//     report_date: "2025-06-01",
//     teams: {
//       post: 0,
//     },
//     docs: {
//       docx: 0,
//       xlsx: 0,
//       txt: 0,
//       etc: 0,
//     },
//     email: {
//       receive: 0,
//       send: 0,
//     },
//     git: {
//       pull_request: 1,
//       commit: 0,
//       issue: 0,
//     },
//   },
//   {
//     report_date: "2025-06-02",
//     teams: {
//       post: 2,
//     },
//     docs: {
//       docx: 0,
//       xlsx: 0,
//       txt: 0,
//       etc: 0,
//     },
//     email: {
//       receive: 1,
//       send: 0,
//     },
//     git: {
//       pull_request: 2,
//       commit: 10,
//       issue: 0,
//     },
//   },
//   {
//     report_date: "2025-06-03",
//     teams: {
//       post: 0,
//     },
//     docs: {
//       docx: 0,
//       xlsx: 0,
//       txt: 0,
//       etc: 0,
//     },
//     email: {
//       receive: 2,
//       send: 0,
//     },
//     git: {
//       pull_request: 0,
//       commit: 3,
//       issue: 0,
//     },
//   },
//   {
//     report_date: "2025-06-04",
//     teams: {
//       post: 16,
//     },
//     docs: {
//       docx: 0,
//       xlsx: 0,
//       txt: 0,
//       etc: 0,
//     },
//     email: {
//       receive: 0,
//       send: 0,
//     },
//     git: {
//       pull_request: 3,
//       commit: 11,
//       issue: 0,
//     },
//   },
//   {
//     report_date: "2025-06-05",
//     teams: {
//       post: 1,
//     },
//     docs: {
//       docx: 0,
//       xlsx: 0,
//       txt: 0,
//       etc: 0,
//     },
//     email: {
//       receive: 0,
//       send: 0,
//     },
//     git: {
//       pull_request: 1,
//       commit: 0,
//       issue: 0,
//     },
//   },
// ];
