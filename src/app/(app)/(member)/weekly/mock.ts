import { WeeklyReportData } from "@/types/weeklyReport";

export const mockWeeklyReports: WeeklyReportData[] = [
  {
    report_title: "고석환님의 2025-06-02 ~ 2025-06-08 주간 업무 보고서",
    id: 1,
    weekly_report: {
      title: "📌 주간 업무 진행 내용",
      summary:
        "이번 주에는 '마이크로소프트 OAuth 로그인 및 회원가입 화면'과 '프로젝트 관리(생성, 수정, 삭제)' 작업을 중심으로 업무를 진행했으며, 프로젝트 초기 세팅과 관련된 작업도 병행했습니다. 일부 미매칭 작업이 발생했으나, 주요 기능 개발은 순조롭게 진행되었습니다.",
      contents: [
        {
          text: "마이크로소프트 OAuth 로그인 및 회원가입 화면 작업을 주도적으로 진행. Git을 통한 여러 커밋과 Teams를 통한 상태 업데이트를 통해 기능을 구체화함. (06/02)",
          evidence: [
            {
              source: "GIT",
              title:
                "✨ Feat: customFetch 함수에 토큰 리프레시 로직 추가 및 에러 처리 개선 (06/02)",
              content:
                "customFetch 함수에 토큰 리프레시 로직을 추가하고 에러 처리를 개선함.",
              llm_reference:
                "customFetch 함수의 토큰 리프레시 로직은 OAuth 로그인 기능과 직접적으로 관련됩니다.",
            },
            {
              source: "TEAMS",
              title: "고석환 updated the **Status** on this issue (06/02)",
              content:
                "YAX-24 FE Microsoft OAuth\nFrom **진행 중** to **검토 중**",
              llm_reference:
                "YAX-24 작업의 상태가 '진행 중'에서 '검토 중'으로 변경된 것이 WBS의 '마이크로소프트 OAuth 로그인 및 회원가입 화면' 작업과 관련이 있다고 판단됨.",
            },
          ],
        },
        {
          text: "프로젝트 초기 세팅 (Front) 작업을 진행하며 테마 관련 컴포넌트 및 사이드바 구조 개선 작업 수행. (06/04)",
          evidence: [
            {
              source: "GIT",
              title:
                "✨ Feat: 테마 관련 컴포넌트 및 사이드바 구조 개선, 불필요한 파일 삭제 (06/04)",
              content:
                "테마 관련 컴포넌트 및 사이드바 구조 개선, 불필요한 파일 삭제",
              llm_reference:
                "테마 관련 컴포넌트 및 사이드바 구조 개선 작업은 '프로젝트 초기 세팅 (Front)' 작업과 관련이 있습니다.",
            },
          ],
        },
        {
          text: "프로젝트 관리(생성, 수정, 삭제) 작업을 진행하며 팀장 권한 프로젝트 관리 기능 구현. Git과 Teams를 통해 작업 진행 상황을 관리함. (06/05)",
          evidence: [
            {
              source: "GIT",
              title: "✨ Feat: [#38] 팀장 권한 프로젝트 관리 구현 (06/05)",
              content:
                "프로젝트 목록 구현, 프로젝트 상세 구현, 프로젝트 삭제 구현, react-query 도입, 기본 UI 컴포넌트화",
              llm_reference:
                "PR 제목의 '팀장 권한 프로젝트 관리 구현'과 작업 내용이 WBS의 '프로젝트 관리(생성, 수정, 삭제)' 작업과 직접적으로 관련됩니다.",
            },
            {
              source: "TEAMS",
              title: "고석환 created this issue (06/05)",
              content:
                "고석환 **created** this issue: [YAX-38: [FE] 프로젝트 관리 구현]",
              llm_reference:
                "이슈 생성 작업은 '프로젝트 관리(생성, 수정, 삭제)'와 관련이 있음",
            },
          ],
        },
      ],
    },
    weekly_reflection: {
      title: "🔍 주간 회고 및 개선점",
      content: [
        "이번 주에는 OAuth 로그인 기능과 프로젝트 관리 기능 구현을 통해 주요 기능 개발을 원활하게 진행한 점은 긍정적이었음.",
        "반면, 일부 미매칭 작업이 발생하여 프로젝트 관리의 효율성을 높이기 위해 작업별로 문서의 필요성과 목적을 명확히 할 필요가 있음.",
        "다음 주에는 데이터베이스(RDB)에 보고서 적재(task_id: 42) 작업을 진행할 예정 (06/09 ~ 06/10).",
        "또한, Daily 작성 에이전트(task_id: 41) 작업도 병행하여 진행할 계획임 (06/09 ~ 06/10).",
      ],
    },
  },
  {
    report_title: "김세은님의 2025-06-02 ~ 2025-06-08 주간 업무 보고서",
    id: 2,
    weekly_report: {
      title: "📌 주간 업무 진행 내용",
      summary:
        "이번 주에는 'OAuth Microsoft 로그인'과 '프로젝트 초기 세팅' 작업을 중심으로 업무를 진행했으며, Git 관련 규칙 수립 및 설정 작업도 병행했습니다. 모든 작업이 WBS와 잘 매칭되었으며, 팀과의 협업을 통해 효율적인 프로젝트 진행을 보였습니다.",
      contents: [
        {
          text: "OAuth Microsoft 로그인 기능 개선 작업을 주도적으로 진행. 아바타 URL 추가 및 Git Installation Id 등록 기능 구현 (06/05 ~ 06/06)",
          evidence: [
            {
              source: "GIT",
              title:
                "feat: [#37] Git Installation Id를 webhook을 통해 등록하기 (06/05)",
              content:
                "Webhook API를 등록하여 Sender Id와 일치하는 유저의 팀에 Git Installation Id를 등록(업데이트)함.",
              llm_reference:
                "PR의 내용이 'OAuth Microsoft 로그인' 작업과 관련된 Git OAuth 로그인 기능을 포함하고 있어 매칭됨.",
            },
          ],
        },
        {
          text: "프로젝트 초기 세팅 작업을 집중적으로 수행. Base Entity 추가 및 엔티티 구조 변경 작업 진행 (06/04 ~ 06/06)",
          evidence: [
            {
              source: "GIT",
              title: "feat: [#43] Base Entity 추가 (06/06)",
              content:
                "Base Entity를 추가하여 데이터 생성 및 업데이트 날짜 정보를 저장.",
              llm_reference:
                "Base Entity 추가는 프로젝트 초기 세팅 작업의 일환으로 볼 수 있음.",
            },
          ],
        },
        {
          text: "Git 관련 규칙 수립 및 설정 작업 진행. Git 이메일 입력 기능 및 API 설명 추가 (06/04)",
          evidence: [
            {
              source: "GIT",
              title:
                "feat: [#30] Git 이메일 입력(유저 정보 수정) API 추가 (06/04)",
              content: "유저 정보를 수정하는 API를 추가하였습니다.",
              llm_reference:
                "Git 이메일 입력 기능 추가가 Git 관련 규칙 수립 및 설정과 관련됨.",
            },
          ],
        },
        {
          text: "팀의 프로젝트 데이터 기반 개인 업무 파악 에이전트 작업 진행. Teams Analyzer Agent 구현 및 데이터 저장 기능 추가 (06/02 ~ 06/04)",
          evidence: [
            {
              source: "GIT",
              title: "feat: [#20] Teams Analyzer Agent 구현 (06/04)",
              content: "Teams Data Preprossesor에서 데이터를 Qdrant에 저장.",
              llm_reference:
                "Teams Analyzer 구현 작업이 개인 업무 파악 에이전트와 관련됨.",
            },
          ],
        },
        {
          text: "Teams 조직과 팀 동기화 버튼 작업 진행. 팀 정보 동기화 기능 추가 및 미가입 이메일 처리 (06/02)",
          evidence: [
            {
              source: "GIT",
              title:
                "feat: [#26] team 정보 동기화 및 미가입 이메일 처리 (06/02)",
              content:
                "팀 정보 동기화 및 미가입 이메일을 처리하는 기능을 추가함.",
              llm_reference:
                "'team 정보 동기화'가 'Teams 조직과 팀 동기화 버튼' 작업과 관련됨.",
            },
          ],
        },
      ],
    },
    weekly_reflection: {
      title: "🔍 주간 회고 및 개선점",
      content: [
        "이번 주에는 OAuth Microsoft 로그인 기능과 프로젝트 초기 세팅 작업을 통해 코드 리팩토링 및 기능 추가를 원활하게 진행한 점은 긍정적이었음.",
        "모든 작업이 WBS와 잘 매칭되었으며, 팀과의 협업을 통해 효율적인 프로젝트 진행을 보였음.",
        "반면, 일부 작업이 특정 시간대에 집중되어 있어 작업 시간을 분산시켜 피로도를 줄이는 방안을 고려할 필요가 있음.",
        "다음 주에는 '프로젝트 관리(생성, 수정, 삭제)' 작업(task_id: 58)을 진행할 예정 (06/05 ~ 06/09).",
      ],
    },
  },
  {
    report_title: "김용준님의 2025-06-02 ~ 2025-06-08 주간 업무 보고서",
    id: 3,
    weekly_report: {
      title: "📌 주간 업무 진행 내용",
      summary:
        "이번 주에는 '게시물 데이터 기반 개인 업무 내용 파악 에이전트'와 '프로젝트 관리' 작업을 중심으로 업무를 진행. WBS 매칭 작업 8건, 미매칭 작업 15건 수행. 일부 작업은 WBS와의 명확한 매칭이 어려웠으나, 주요 기능 개발은 순조롭게 진행됨.",
      contents: [
        {
          text: "프로젝트 관리(생성, 수정, 삭제) 작업을 주도적으로 진행. 주 초반에는 프로젝트 관련 예외 처리 로직을 수정하고, 주 중반에는 API 엔드포인트 통합 및 예외처리 패턴 적용.(06/02 ~ 06/04)",
          evidence: [
            {
              source: "GIT",
              title: "refactor: 프로젝트 관련 예외 처리 로직 수정 (06/04)",
              content:
                "프로젝트 생성/수정 API 엔드포인트 통합 및 예외처리 패턴 적용",
              llm_reference:
                "커밋 내용이 '프로젝트 관리(생성, 수정, 삭제)' 작업과 관련이 있습니다.",
            },
          ],
        },
        {
          text: "게시물 데이터 기반 개인 업무 내용 파악 에이전트 작업을 진행. 이메일 에이전트 구현 및 팀즈 분석 결과 Dashboard 연결 작업 수행.(06/02 ~ 06/08)",
          evidence: [
            {
              source: "GIT",
              title: "feat: [#19] 이메일 에이전트 구현 (06/04)",
              content:
                "email_analyze_prompt.md 프롬프트 템플릿 JSON 중괄호 이스케이프 처리 등",
              llm_reference:
                "PR 내용이 '게시물 데이터 기반 개인 업무 내용 파악 에이전트' 작업과 관련이 있습니다.",
            },
          ],
        },
        {
          text: "Teams 조직과 팀 동기화 버튼 작업을 수행. 팀즈 팀 분석 결과 API 추가 작업 진행.(06/06)",
          evidence: [
            {
              source: "GIT",
              title: "feat: [#41] 팀즈 팀 분석 결과 API 추가 (06/06)",
              content:
                "TeamsTeamActivityDetail API, TeamsTeamActivityCounts API 추가, TeamsUserActivityCounts API, TeamsUserActivityUserDetail API",
              llm_reference:
                "PR의 내용이 'Teams 조직과 팀 동기화 버튼' 작업과 관련된 API 개발로 보입니다.",
            },
          ],
        },
        {
          text: "고객 검토 및 승인 작업을 진행. WBS 분석 결과 문서 작성 및 검토.(06/03)",
          evidence: [
            {
              source: "DOCS",
              title: "wbs_analysis_result.json (06/03)",
              content:
                "문서는 작업 분류 구조(WBS) 분석 결과를 담고 있으며, 데이터 분석의 정확성과 결과 해석의 명확성에서 강점을 보입니다.",
              llm_reference:
                "이 문서는 '고객 검토 및 승인' 작업과 직접 연관됩니다.",
            },
          ],
        },
        {
          text: "AI, Back, Front API 연결 작업을 진행. 팀즈 분석 결과 Dashboard 연결 작업 수행.(06/05)",
          evidence: [
            {
              source: "TEAMS",
              title: "김용준 created this issue (06/05)",
              content: "YAX-41: 팀즈 분석 결과 Dashboard 연결",
              llm_reference:
                "Issue creation indicates the start of work on this task.",
            },
          ],
        },
      ],
    },
    weekly_reflection: {
      title: "🔍 주간 회고 및 개선점",
      content: [
        "한 주간 '게시물 데이터 기반 개인 업무 내용 파악 에이전트'와 '프로젝트 관리' 작업을 통해 주요 기능 개발을 원활하게 진행한 점은 긍정적이었음.",
        "반면, 일부 작업은 WBS와의 명확한 매칭이 어려워 작업 관리에 혼선이 있었음. WBS와의 매칭을 명확히 하기 위한 작업 관리 체계 개선이 필요함.",
        "다음 주에는 '프로젝트 목록 보기(task_id: 56)' 작업을 06/09부터 진행할 계획임.",
        "또한, 'Teams 조직과 팀 동기화 버튼(task_id: 59)' 작업을 06/09부터 계속 진행할 예정임.",
      ],
    },
  },
];
