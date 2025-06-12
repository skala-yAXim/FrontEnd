import { DailyReportData } from "@/types/reportType";

export const mockDailyReports: DailyReportData[] = [
  {
    report_title: "김세은님의 2025-06-02 일일 업무 보고서",
    id: 1,
    daily_report: {
      title: "📌 일일 업무 진행 내용",
      summary:
        "총 5개의 WBS에 기여. 총 13개 업무 활동 중 WBS 매칭 5건, 미매칭 8건 수행 (GIT 12건, TEAMS 0건, EMAIL 1건, DOCS 0건)",
      contents: [
        {
          text: "**[WBS 매칭] 관리자, 팀장, 팀원 권한 분리(51)** 작업을 진행하였습니다.",
          task: "관리자, 팀장, 팀원 권한 분리", // WBS 소분류
          evidence: [
            {
              source: "GIT",
              title: "feat: Spring AOP를 적용하여 유저 별 팀 내 권한 관리",
              content:
                "Spring AOP를 사용하여 팀 내 유저 권한을 관리하는 기능을 추가함.",
              llm_reference:
                "커밋 메시지의 '유저 별 팀 내 권한 관리'가 WBS의 '관리자, 팀장, 팀원 권한 분리' 작업과 관련됩니다.",
            },
          ],
        },
        {
          text: "**[WBS 매칭] Teams 조직과 팀 동기화 버튼(59)** 작업을 진행하였습니다.",
          task: "Teams 조직과 팀 동기화 버튼",
          evidence: [
            {
              source: "GIT",
              title:
                "feat: LEADER 권한이 있는 사용자만 팀원 정보 가져올 수 있는 기능 추가 및 API를 통해 팀 정보 동기화 기능 추가",
              content:
                "LEADER 권한 사용자만 팀원 정보를 가져올 수 있는 기능과 팀 정보 동기화 기능을 API로 추가함.",
              llm_reference:
                "커밋 메시지의 '팀 정보 동기화'가 WBS의 'Teams 조직과 팀 동기화 버튼' 작업과 관련됩니다.",
            },
            {
              source: "GIT",
              title: "feat: [#26] team 정보 동기화 및 미가입 이메일 처리",
              content: "팀 정보 동기화 및 미가입 이메일 처리 기능을 추가함.",
              llm_reference:
                "PR 메시지의 'team 정보 동기화'가 WBS의 'Teams 조직과 팀 동기화 버튼' 작업과 관련됩니다.",
            },
          ],
        },
        {
          text: "**[WBS 매칭] OAuth Microsoft 로그인(48)** 작업을 진행하였습니다.",
          task: "OAuth Microsoft 로그인",
          evidence: [
            {
              source: "GIT",
              title: "feat: OAuth 로그인을 새로 할 때마다 팀 정보 동기화",
              content: "OAuth 로그인 시 팀 정보를 동기화하는 기능을 추가함.",
              llm_reference:
                "커밋 메시지의 'OAuth 로그인'과 '팀 정보 동기화'가 WBS의 'OAuth Microsoft 로그인' 작업과 관련됩니다.",
            },
          ],
        },
        {
          text: "**[WBS 매칭] 팀의 프로젝트 데이터 기반 개인 업무 파악 에이전트(36)** 작업을 진행하였습니다.",
          task: "팀의 프로젝트 데이터 기반 개인 업무 파악 에이전트",
          evidence: [
            {
              source: "GIT",
              title: "feat: [#20] Teams Agent 초기 구현",
              content: "Teams Agent 초기 구현을 완료함.",
              llm_reference:
                "PR 메시지의 'Teams Agent'가 WBS의 '팀의 프로젝트 데이터 기반 개인 업무 파악 에이전트' 작업과 관련됩니다.",
            },
          ],
        },
        {
          text: "**[WBS 미매칭] ErrorCode 추가** 작업을 수행하였습니다.",
          task: null,
          evidence: [
            {
              source: "GIT",
              title: "feat: ErrorCode 추가",
              content: "새로운 ErrorCode를 추가함.",
              llm_reference:
                "ErrorCode 추가는 WBS의 특정 작업과 직접적인 관련이 없어 보입니다.",
            },
          ],
        },
        {
          text: "**[WBS 미매칭] Merge branch 'develop' into YAX-13-feat/프로젝트-기능-구현** 작업을 수행하였습니다.",
          task: null,
          evidence: [
            {
              source: "GIT",
              title:
                "Merge branch 'develop' into YAX-13-feat/프로젝트-기능-구현",
              content:
                "develop 브랜치를 YAX-13-feat/프로젝트-기능-구현 브랜치로 병합함.",
              llm_reference:
                "병합 작업은 일반적인 개발 프로세스의 일부로, WBS의 특정 작업과 직접적인 관련이 없어 보입니다.",
            },
          ],
        },
        {
          text: "**[WBS 미매칭] HotFix: user role 반환 값 복구** 작업을 수행하였습니다.",
          task: null,
          evidence: [
            {
              source: "GIT",
              title: "HotFix: user role 반환 값 복구",
              content: "user role 반환 값을 복구하는 핫픽스를 적용함.",
              llm_reference:
                "핫픽스는 일반적인 유지보수 작업으로, WBS의 특정 작업과 직접적인 관련이 없어 보입니다.",
            },
          ],
        },
        {
          text: "**[WBS 미매칭] Merge pull request #9 from skala-yAXim/YAX-13-feat/프로젝트-기능-구현** 작업을 수행하였습니다.",
          task: null,
          evidence: [
            {
              source: "GIT",
              title:
                "Merge pull request #9 from skala-yAXim/YAX-13-feat/프로젝트-기능-구현",
              content: "YAX-13-feat/프로젝트-기능-구현 브랜치를 병합함.",
              llm_reference:
                "병합 작업은 일반적인 개발 프로세스의 일부로, WBS의 특정 작업과 직접적인 관련이 없어 보입니다.",
            },
          ],
        },
        {
          text: "**[WBS 미매칭] HotFix: ErrorCode 수정** 작업을 수행하였습니다.",
          task: null,
          evidence: [
            {
              source: "GIT",
              title: "HotFix: ErrorCode 수정",
              content: "ErrorCode를 수정하는 핫픽스를 적용함.",
              llm_reference:
                "핫픽스는 일반적인 유지보수 작업으로, WBS의 특정 작업과 직접적인 관련이 없어 보입니다.",
            },
          ],
        },
        {
          text: "**[WBS 미매칭] HotFix: 빌드 오류 수정** 작업을 수행하였습니다.",
          task: null,
          evidence: [
            {
              source: "GIT",
              title: "HotFix: 빌드 오류 수정",
              content: "빌드 오류를 수정하는 핫픽스를 적용함.",
              llm_reference:
                "빌드 오류 수정은 일반적인 유지보수 작업으로, WBS의 특정 작업과 직접적인 관련이 없어 보입니다.",
            },
          ],
        },
        {
          text: "**[WBS 미매칭] Team Response DTO 일부 수정 및 TeamMemberResponse DTO 추가** 작업을 수행하였습니다.",
          task: null,
          evidence: [
            {
              source: "GIT",
              title:
                "feat: Team Response DTO 일부 수정 및 TeamMemberResponse DTO 추가",
              content:
                "Team Response DTO를 일부 수정하고 TeamMemberResponse DTO를 추가함.",
              llm_reference:
                "DTO 수정 및 추가는 WBS의 특정 작업과 직접적인 관련이 없어 보입니다.",
            },
          ],
        },
        {
          text: "**[WBS 미매칭] Microsoft 365 서비스 업데이트 검토** 작업을 수행하였습니다.",
          task: null,
          evidence: [
            {
              source: "EMAIL",
              title: "Weekly digest: Microsoft service updates",
              content:
                "Microsoft 365 관리자 센터의 새로운 관리자에게 주간 이메일을 제공합니다.",
              llm_reference:
                "이메일 본문에서 'Microsoft 365 관리자 센터의 새로운 관리자에게 주간 이메일을 제공합니다.'라는 표현이 있어, 이는 WBS의 특정 작업과 직접적으로 연결되지 않지만, Microsoft 365 서비스 업데이트를 검토하는 작업으로 추론됩니다.",
            },
          ],
        },
      ],
    },
    daily_reflection: {
      title: "🔍 오늘의 회고 및 개선점",
      summary:
        "오늘의 업무는 주로 팀 정보 동기화 및 권한 관리 기능에 집중되었습니다. GIT을 통한 커밋은 프로젝트의 중요 기능 개발에 직접적으로 연관되어 있으며, 문서 작업은 WBS 작업 목록과 잘 일치하고 있습니다. 하지만, 보고서 설계서 작성과 같은 미매칭 작업이 발생하였습니다. 이는 프로젝트 관리의 효율성을 높이기 위해 작업별로 문서의 필요성과 목적을 명확히 할 필요가 있음을 보여줍니다. 또한, GIT 활동을 좀 더 자주 기록하여 변경 사항을 세분화하고 기록하는 습관을 개선할 필요가 있습니다.",
      contents: [
        {
          source: "GIT",
          reflection:
            "총평: 오늘의 작업은 주로 팀 정보 동기화 및 권한 관리 기능에 집중되었습니다. 여러 커밋과 PR이 WBS의 관련 작업과 잘 매칭되었습니다.",
        },
        {
          source: "TEAMS",
          reflection:
            "분석할 Teams 게시물이 없어 업무 현황을 파악할 수 없습니다.",
        },
        {
          source: "EMAIL",
          reflection:
            "총평: 오늘은 Microsoft 365 서비스 업데이트에 대한 정보를 검토하는 데 중점을 두었습니다. 이는 WBS의 특정 작업과 직접적으로 연결되지는 않지만, 서비스 업데이트를 이해하는 데 중요한 역할을 합니다.",
        },
        {
          source: "DOCS",
          reflection: "분석할 관련 문서를 찾지 못했습니다.",
        },
      ],
    },
  },
  {
    report_title: "김세은님의 2025-06-03 일일 업무 보고서",
    id: 2,
    daily_report: {
      title: "📌 일일 업무 진행 내용",
      summary:
        "총 3개의 WBS에 기여. 총 5개 업무 활동 중 WBS 매칭 3건, 미매칭 2건 수행 (GIT 3건, TEAMS 0건, EMAIL 2건, DOCS 0건)",
      contents: [
        {
          text: "**[WBS 매칭] 팀의 프로젝트 데이터 기반 개인 업무 파악 에이전트(36)** 작업을 진행하였습니다.",
          task: "팀의 프로젝트 데이터 기반 개인 업무 파악 에이전트",
          evidence: [
            {
              source: "GIT",
              title: "feat: teams 분석 에이전트 실행 예시 코드",
              content: "teams 분석 에이전트의 실행 예시 코드를 추가함.",
              llm_reference:
                "'teams 분석 에이전트'라는 키워드가 WBS의 '팀의 프로젝트 데이터 기반 개인 업무 파악 에이전트' 작업과 일치합니다.",
            },
          ],
        },
        {
          text: "**[WBS 매칭] 팀의 프로젝트 데이터 기반 개인 업무 파악 에이전트(36)** 작업을 진행하였습니다.",
          task: "팀의 프로젝트 데이터 기반 개인 업무 파악 에이전트",
          evidence: [
            {
              source: "GIT",
              title: "feat: teams 게시글 가상 데이터",
              content: "teams 게시글에 대한 가상 데이터를 생성함.",
              llm_reference:
                "'teams 게시글'과 관련된 작업이 '팀의 프로젝트 데이터 기반 개인 업무 파악 에이전트'와 관련이 있습니다.",
            },
          ],
        },
        {
          text: "**[WBS 매칭] 팀의 프로젝트 데이터 기반 개인 업무 파악 에이전트(36)** 작업을 진행하였습니다.",
          task: "팀의 프로젝트 데이터 기반 개인 업무 파악 에이전트",
          evidence: [
            {
              source: "GIT",
              title: "feat: VectorDB에 teams 데이터 저장 기능 구현",
              content: "VectorDB에 teams 데이터를 저장하는 기능을 구현함.",
              llm_reference:
                "'teams 데이터 저장' 기능이 '팀의 프로젝트 데이터 기반 개인 업무 파악 에이전트' 작업과 관련이 있습니다.",
            },
          ],
        },
        {
          text: "**[WBS 미매칭] Microsoft Teams Phone 관련 초기 설정 및 학습** 작업을 수행하였습니다.",
          task: null,
          evidence: [
            {
              source: "EMAIL",
              title: "Welcome to your Microsoft Teams Phone trial",
              content: "Microsoft Teams Phone trial 관련 리소스 제공 및 안내",
              llm_reference:
                "이메일 본문에서 'Microsoft Teams Phone trial deployment'라는 표현이 있어, Microsoft Teams 관련 작업과 연관될 가능성이 있음.",
            },
          ],
        },
        {
          text: "**[WBS 미매칭] 보안 관련 주간 보고서 검토 및 대응** 작업을 수행하였습니다.",
          task: null,
          evidence: [
            {
              source: "EMAIL",
              title: "Microsoft Entra ID Protection Weekly Digest",
              content:
                "Microsoft Entra ID Protection 주간 보고서 및 새로운 위험 사용자 감지",
              llm_reference:
                "이메일 본문에서 'New risky users detected'라는 표현이 있어, 보안 관련 작업과 연관될 가능성이 있음.",
            },
          ],
        },
      ],
    },
    daily_reflection: {
      title: "🔍 오늘의 회고 및 개선점",
      summary:
        "오늘의 업무는 주로 '팀의 프로젝트 데이터 기반 개인 업무 파악 에이전트'와 관련된 기능 구현에 집중되었습니다. GIT을 통한 모든 활동이 WBS와 잘 매칭되었습니다. 이메일 분석에서는 Microsoft Teams 및 보안 관련 작업에 대한 정보를 수신하였으나, 직접적인 업무 수행 내역은 확인되지 않았습니다. 작업이 특정 시간대에 집중되는 경향이 있으므로, 작업 시간을 분산시켜 피로를 줄이고 지속적인 생산성을 유지하는 것이 좋습니다.",
      contents: [
        {
          source: "GIT",
          reflection:
            "총평: 오늘의 작업은 주로 '팀의 프로젝트 데이터 기반 개인 업무 파악 에이전트'와 관련된 기능 구현에 집중되었습니다. 모든 활동이 WBS와 잘 매칭되었습니다.",
        },
        {
          source: "TEAMS",
          reflection:
            "분석할 Teams 게시물이 없어 업무 현황을 파악할 수 없습니다.",
        },
        {
          source: "EMAIL",
          reflection:
            "총평: 오늘의 이메일 분석 결과, 김세은 사용자는 Microsoft Teams 및 보안 관련 작업에 대한 정보를 수신하였으나, 직접적인 업무 수행 내역은 확인되지 않았습니다.",
        },
        {
          source: "DOCS",
          reflection: "분석할 관련 문서를 찾지 못했습니다.",
        },
      ],
    },
  },
  {
    report_title: "김세은님의 2025-06-04 일일 업무 보고서",
    id: 3,
    daily_report: {
      title: "📌 일일 업무 진행 내용",
      summary:
        "총 5개의 WBS에 기여. 총 14개 업무 활동 중 WBS 매칭 5건, 미매칭 9건 수행 (GIT 14건, TEAMS 0건, EMAIL 0건, DOCS 0건)",
      contents: [
        {
          text: "**[WBS 매칭] 프로젝트 초기 세팅 (Back)** 작업을 진행하였습니다.",
          task: "프로젝트 초기 세팅 (Back)",
          evidence: [
            {
              source: "GIT",
              title: "docs: 불필요한 디버깅 관련 변수 제거",
              content: "불필요한 디버깅 관련 변수를 제거하여 코드 정리.",
              llm_reference:
                "코드 정리 작업이 프로젝트 초기 세팅 작업과 관련이 있을 수 있습니다.",
            },
          ],
        },
        {
          text: "**[WBS 매칭] Git 관련 규칙 수립 및 Git 설정** 작업을 진행하였습니다.",
          task: "Git 관련 규칙 수립 및 Git 설정",
          evidence: [
            {
              source: "GIT",
              title:
                "Merge pull request #10 from skala-yAXim/YAX-30-feat/Git-이메일-입력",
              content: "Git 이메일 입력(유저 정보 수정) API 추가",
              llm_reference:
                "Git 이메일 입력 기능 추가가 Git 관련 규칙 수립 및 설정 작업과 관련됩니다.",
            },
            {
              source: "GIT",
              title: "feat: 유저 정보 수정 기능 추가",
              content: "유저 정보 수정 기능 추가",
              llm_reference:
                "유저 정보 수정 기능이 Git 관련 설정 작업과 관련됩니다.",
            },
          ],
        },
        {
          text: "**[WBS 매칭] AI, Back, Front API 연결** 작업을 진행하였습니다.",
          task: "AI, Back, Front API 연결",
          evidence: [
            {
              source: "GIT",
              title:
                "Merge pull request #12 from skala-yAXim/YAX-28-feat/프로젝트-팀-엔티티-연결",
              content: "프로젝트 & 팀 엔티티 연결",
              llm_reference:
                "프로젝트와 팀 엔티티 연결 작업이 API 연결 작업과 관련됩니다.",
            },
          ],
        },
        {
          text: "**[WBS 매칭] 팀의 프로젝트 데이터 기반 개인 업무 파악 에이전트** 작업을 진행하였습니다.",
          task: "팀의 프로젝트 데이터 기반 개인 업무 파악 에이전트",
          evidence: [
            {
              source: "GIT",
              title:
                "Merge pull request #8 from skala-yAXim/YAX-20-Teams-Analyzer-Output-수정",
              content: "Teams Analyzer output 수정",
              llm_reference:
                "Teams Analyzer 수정 작업이 팀의 프로젝트 데이터 기반 에이전트 작업과 관련됩니다.",
            },
          ],
        },
        {
          text: "**[WBS 미매칭] 코드 정리** 작업을 수행하였습니다.",
          task: null,
          evidence: [
            {
              source: "GIT",
              title: "refactor: 불필요한 함수 주석 처리",
              content: "불필요한 함수 주석 처리",
              llm_reference: "WBS에 명시되지 않은 코드 정리 작업입니다.",
            },
          ],
        },
        {
          text: "**[WBS 미매칭] API 개발** 작업을 수행하였습니다.",
          task: null,
          evidence: [
            {
              source: "GIT",
              title: "feat: [#30] Git 이메일 입력(유저 정보 수정) API 추가",
              content: "유저 정보를 수정하는 API 추가",
              llm_reference: "WBS에 명시되지 않은 API 개발 작업입니다.",
            },
          ],
        },
        {
          text: "**[WBS 미매칭] 코드 최적화** 작업을 수행하였습니다.",
          task: null,
          evidence: [
            {
              source: "GIT",
              title:
                "refactor: 프로젝트 관련 세부 로직 수정 및 불필요한 함수 제거",
              content: "프로젝트 관련 세부 로직 수정 및 불필요한 함수 제거",
              llm_reference: "WBS에 명시되지 않은 코드 최적화 작업입니다.",
            },
          ],
        },
        {
          text: "**[WBS 미매칭] 코드 정리** 작업을 수행하였습니다.",
          task: null,
          evidence: [
            {
              source: "GIT",
              title: "remove: 불필요한 클래스 제거",
              content: "불필요한 클래스 제거",
              llm_reference: "WBS에 명시되지 않은 코드 정리 작업입니다.",
            },
          ],
        },
        {
          text: "**[WBS 미매칭] 예외 처리 개선** 작업을 수행하였습니다.",
          task: null,
          evidence: [
            {
              source: "GIT",
              title:
                "Merge pull request #11 from skala-yAXim/YAX-31-Project-관련-예외-처리-로직-수정",
              content: "프로젝트 관련 예외 처리 로직 수정",
              llm_reference: "WBS에 명시되지 않은 예외 처리 개선 작업입니다.",
            },
          ],
        },
        {
          text: "**[WBS 미매칭] DTO 설계** 작업을 수행하였습니다.",
          task: null,
          evidence: [
            {
              source: "GIT",
              title:
                "feat: 프로젝트 등록 Request DTO와 프로젝트 수정 Request DTO 분리",
              content: "프로젝트 등록 및 수정 Request DTO 분리",
              llm_reference: "WBS에 명시되지 않은 DTO 설계 작업입니다.",
            },
          ],
        },
        {
          text: "**[WBS 미매칭] 문서화** 작업을 수행하였습니다.",
          task: null,
          evidence: [
            {
              source: "GIT",
              title: "feat: Swagger UI에 API 설명 추가",
              content: "Swagger UI에 API 설명 추가",
              llm_reference: "WBS에 명시되지 않은 문서화 작업입니다.",
            },
          ],
        },
        {
          text: "**[WBS 미매칭] 엔티티 설계** 작업을 수행하였습니다.",
          task: null,
          evidence: [
            {
              source: "GIT",
              title: "refactor: [#28] 프로젝트 & 팀 엔티티 연결",
              content: "프로젝트 엔티티와 팀 엔티티 간 연관관계 설정",
              llm_reference: "WBS에 명시되지 않은 엔티티 설계 작업입니다.",
            },
          ],
        },
        {
          text: "**[WBS 미매칭] 데이터 처리** 작업을 수행하였습니다.",
          task: null,
          evidence: [
            {
              source: "GIT",
              title: "feat: [#20] Teams Analyzer Agent 구현",
              content: "Teams Data Preprossesor에서 데이터를 Qdrant에 저장",
              llm_reference: "WBS에 명시되지 않은 데이터 처리 작업입니다.",
            },
          ],
        },
      ],
    },
    daily_reflection: {
      title: "🔍 오늘의 회고 및 개선점",
      summary:
        "오늘의 업무는 주로 코드 정리와 기능 추가에 집중되었습니다. GIT을 통한 커밋은 프로젝트의 중요 기능 개발에 직접적으로 연관되어 있으며, 문서 작업은 WBS 작업 목록과 잘 일치하고 있습니다. 하지만, 보고서 설계서 작성과 같은 미매칭 작업이 발생하였습니다. 이는 프로젝트 관리의 효율성을 높이기 위해 작업별로 문서의 필요성과 목적을 명확히 할 필요가 있음을 보여줍니다. 또한, GIT 활동을 좀 더 자주 기록하여 변경 사항을 세분화하고 기록하는 습관을 개선할 필요가 있습니다.",
      contents: [
        {
          source: "GIT",
          reflection:
            "총평: 오늘의 작업은 주로 코드 정리와 기능 추가에 집중되었습니다. 여러 작업이 동시에 진행되었으며, 일부는 WBS와 직접적으로 연결되지 않았습니다.",
        },
        {
          source: "TEAMS",
          reflection:
            "분석할 Teams 게시물이 없어 업무 현황을 파악할 수 없습니다.",
        },
        {
          source: "EMAIL",
          reflection: "분석할 관련 이메일을 찾지 못했습니다.",
        },
        {
          source: "DOCS",
          reflection: "분석할 관련 문서를 찾지 못했습니다.",
        },
      ],
    },
  },
  {
    report_title: "김세은님의 2025-06-05 일일 업무 보고서",
    id: 4,
    daily_report: {
      title: "📌 일일 업무 진행 내용",
      summary:
        "총 1개의 WBS에 기여. 총 1개 업무 활동 중 WBS 매칭 1건, 미매칭 0건 수행 (GIT 1건, TEAMS 0건, EMAIL 0건, DOCS 0건)",
      contents: [
        {
          text: "**[WBS 매칭] OAuth Microsoft 로그인(48)** 작업을 진행하였습니다.",
          task: "OAuth Microsoft 로그인",
          evidence: [
            {
              source: "GIT",
              title:
                "feat: [#37] Git Installation Id를 webhook을 통해 등록하기",
              content:
                "Webhook API를 등록하여 Sender Id와 일치하는 유저의 팀에 Git Installation Id를 등록(업데이트)합니다.",
              llm_reference:
                "PR의 내용이 'Git Installation Id'와 관련된 작업으로, OAuth Microsoft 로그인 작업과 관련이 있을 수 있습니다.",
            },
          ],
        },
      ],
    },
    daily_reflection: {
      title: "🔍 오늘의 회고 및 개선점",
      summary:
        "오늘의 업무는 Git Installation Id를 등록하는 기능을 추가하는 데 중점을 두었습니다. 이는 OAuth Microsoft 로그인 작업과 관련이 있어 보입니다. 분석 기준일에 PR이 하나 생성되었으며, 이는 기능 추가와 버그 수정을 포함하고 있습니다. 이는 김세은 님이 주로 기능 개발과 관련된 작업을 수행하고 있음을 시사합니다. 작업의 명확한 문서화와 WBS와의 연계성을 높이는 것이 좋습니다. 이는 팀 내 협업을 강화하고 작업의 투명성을 높이는 데 도움이 될 것입니다. 김세은 님은 주어진 작업을 효과적으로 수행하고 있으며, 팀 내에서 중요한 역할을 하고 있습니다. 앞으로도 지속적인 협업과 커뮤니케이션을 통해 프로젝트의 성공에 기여할 수 있을 것입니다.",
      contents: [
        {
          source: "GIT",
          reflection:
            "총평: 오늘의 작업은 Git Installation Id를 등록하는 기능을 추가하는 데 중점을 두었습니다. 이는 OAuth Microsoft 로그인 작업과 관련이 있어 보입니다. 작업의 명확한 문서화와 WBS와의 연계성을 높이는 것이 좋습니다.",
        },
        {
          source: "TEAMS",
          reflection:
            "분석할 Teams 게시물이 없어 업무 현황을 파악할 수 없습니다.",
        },
        {
          source: "EMAIL",
          reflection: "분석할 관련 이메일을 찾지 못했습니다.",
        },
        {
          source: "DOCS",
          reflection: "분석할 관련 문서를 찾지 못했습니다.",
        },
      ],
    },
  },
  {
    report_title: "김세은님의 2025-06-06 일일 업무 보고서",
    id: 5,
    daily_report: {
      title: "📌 일일 업무 진행 내용",
      summary:
        "총 2개의 WBS에 기여. 총 11개 업무 활동 중 WBS 매칭 11건, 미매칭 0건 수행 (GIT 11건, TEAMS 0건, EMAIL 0건, DOCS 0건)",
      contents: [
        {
          text: "**[WBS 매칭] OAuth Microsoft 로그인(48)** 작업을 진행하였습니다.",
          task: "OAuth Microsoft 로그인",
          evidence: [
            {
              source: "GIT",
              title: "feat: 아바타 URL(프로필 사진)을 Response DTO에 추가",
              content:
                "프로필 사진 URL을 Response DTO에 추가하여 사용자 정보를 확장.",
              llm_reference:
                "프로필 사진 관련 작업이 OAuth Microsoft 로그인 기능과 관련이 있을 수 있습니다.",
            },
          ],
        },
        {
          text: "**[WBS 매칭] 팀의 프로젝트 데이터 기반 개인 업무 파악 에이전트(36)** 작업을 진행하였습니다.",
          task: "팀의 프로젝트 데이터 기반 개인 업무 파악 에이전트",
          evidence: [
            {
              source: "GIT",
              title:
                "Merge pull request #14 from skala-yAXim/YAX-43-feat/Base-Entity-추가",
              content: "Base Entity 추가 작업 완료.",
              llm_reference:
                "Base Entity 추가는 데이터 기반 에이전트 개발과 관련이 있을 수 있습니다.",
            },
          ],
        },
        {
          text: "**[WBS 매칭] 팀의 프로젝트 데이터 기반 개인 업무 파악 에이전트(36)** 작업을 진행하였습니다.",
          task: "팀의 프로젝트 데이터 기반 개인 업무 파악 에이전트",
          evidence: [
            {
              source: "GIT",
              title: "feat: [#43] Base Entity 추가",
              content:
                "Base Entity를 추가하여 데이터 생성 및 업데이트 날짜를 관리.",
              llm_reference:
                "Base Entity 추가는 데이터 기반 에이전트 개발과 관련이 있을 수 있습니다.",
            },
          ],
        },
        {
          text: "**[WBS 매칭] 팀의 프로젝트 데이터 기반 개인 업무 파악 에이전트(36)** 작업을 진행하였습니다.",
          task: "팀의 프로젝트 데이터 기반 개인 업무 파악 에이전트",
          evidence: [
            {
              source: "GIT",
              title:
                "feat: Team, Project, ProjectFiles, GitInfo 엔티티가 Base Entity 상속받도록 함",
              content: "여러 엔티티가 Base Entity를 상속받도록 변경.",
              llm_reference:
                "엔티티 구조 변경은 데이터 기반 에이전트 개발과 관련이 있을 수 있습니다.",
            },
          ],
        },
        {
          text: "**[WBS 매칭] 팀의 프로젝트 데이터 기반 개인 업무 파악 에이전트(36)** 작업을 진행하였습니다.",
          task: "팀의 프로젝트 데이터 기반 개인 업무 파악 에이전트",
          evidence: [
            {
              source: "GIT",
              title:
                "refactor: createdAt, updatedAt을 Response DTO로 리턴하도록 설정",
              content:
                "데이터 생성 및 업데이트 날짜를 Response DTO로 반환하도록 리팩토링.",
              llm_reference:
                "데이터 반환 구조 변경은 데이터 기반 에이전트 개발과 관련이 있을 수 있습니다.",
            },
          ],
        },
        {
          text: "**[WBS 매칭] 팀의 프로젝트 데이터 기반 개인 업무 파악 에이전트(36)** 작업을 진행하였습니다.",
          task: "팀의 프로젝트 데이터 기반 개인 업무 파악 에이전트",
          evidence: [
            {
              source: "GIT",
              title:
                "Merge pull request #15 from skala-yAXim/YAX-37-feat/Git-Installation-ID-Webhook-API",
              content: "Git Installation ID Webhook API 추가.",
              llm_reference:
                "Git 관련 API 추가는 데이터 기반 에이전트 개발과 관련이 있을 수 있습니다.",
            },
          ],
        },
        {
          text: "**[WBS 매칭] OAuth Microsoft 로그인(48)** 작업을 진행하였습니다.",
          task: "OAuth Microsoft 로그인",
          evidence: [
            {
              source: "GIT",
              title: "feat: 아바타 URL(프로필 사진) 컬럼 추가",
              content: "프로필 사진 URL 컬럼을 추가하여 사용자 정보를 확장.",
              llm_reference:
                "프로필 사진 관련 작업이 OAuth Microsoft 로그인 기능과 관련이 있을 수 있습니다.",
            },
          ],
        },
        {
          text: "**[WBS 매칭] 팀의 프로젝트 데이터 기반 개인 업무 파악 에이전트(36)** 작업을 진행하였습니다.",
          task: "팀의 프로젝트 데이터 기반 개인 업무 파악 에이전트",
          evidence: [
            {
              source: "GIT",
              title: "feat: Base Entity가 동작하도록 설정하기 위해 빈 등록",
              content: "Base Entity 동작을 위한 빈 등록.",
              llm_reference:
                "Base Entity 설정은 데이터 기반 에이전트 개발과 관련이 있을 수 있습니다.",
            },
          ],
        },
        {
          text: "**[WBS 매칭] 팀의 프로젝트 데이터 기반 개인 업무 파악 에이전트(36)** 작업을 진행하였습니다.",
          task: "팀의 프로젝트 데이터 기반 개인 업무 파악 에이전트",
          evidence: [
            {
              source: "GIT",
              title:
                "refactor: 사용자가 동기화 할 때마다 변경사항이 없더라도 updatedAt를 최신으로 업데이트 및 createdAt, updatedAt을 Response DTO로 리턴하도록 설정",
              content:
                "동기화 시 updatedAt을 최신으로 업데이트하고, 날짜 정보를 Response DTO로 반환.",
              llm_reference:
                "데이터 반환 구조 변경은 데이터 기반 에이전트 개발과 관련이 있을 수 있습니다.",
            },
          ],
        },
        {
          text: "**[WBS 매칭] OAuth Microsoft 로그인(48)** 작업을 진행하였습니다.",
          task: "OAuth Microsoft 로그인",
          evidence: [
            {
              source: "GIT",
              title: "feat: [#37] 아바타 URL(프로필 사진) 컬럼 추가",
              content: "프로필 사진 URL 컬럼을 추가하여 사용자 정보를 확장.",
              llm_reference:
                "프로필 사진 관련 작업이 OAuth Microsoft 로그인 기능과 관련이 있을 수 있습니다.",
            },
          ],
        },
        {
          text: "**[WBS 매칭] 팀의 프로젝트 데이터 기반 개인 업무 파악 에이전트(36)** 작업을 진행하였습니다.",
          task: "팀의 프로젝트 데이터 기반 개인 업무 파악 에이전트",
          evidence: [
            {
              source: "GIT",
              title: "feat: Base Entity 추가",
              content:
                "Base Entity를 추가하여 데이터 생성 및 업데이트 날짜를 관리.",
              llm_reference:
                "Base Entity 추가는 데이터 기반 에이전트 개발과 관련이 있을 수 있습니다.",
            },
          ],
        },
      ],
    },
    daily_reflection: {
      title: "🔍 오늘의 회고 및 개선점",
      summary:
        "오늘의 업무는 주로 데이터 구조 개선과 관련된 작업이었습니다. GIT을 통한 모든 활동이 WBS와 잘 매칭되었으며, 작업의 집중도가 높았습니다. 작업 시간이 15시에 집중되어 있어, 작업 피로도를 줄이기 위해 시간을 분산시키는 것이 필요합니다. 팀원들과의 협업이 원활하게 이루어지고 있으며, 명확한 작업 분담이 이루어지고 있습니다.",
      contents: [
        {
          source: "GIT",
          reflection:
            "총평: 오늘의 작업은 주로 데이터 구조 개선과 관련된 작업이었으며, 모든 활동이 WBS와 잘 매칭되었습니다.",
        },
        {
          source: "GIT",
          reflection:
            "작업 패턴 분석: 모든 커밋이 15시에 집중되어 있으며, 이는 집중적인 작업 시간대가 존재함을 나타냅니다.",
        },
        {
          source: "GIT",
          reflection:
            "개선 제안: 작업 시간을 분산시켜 다양한 시간대에 작업을 수행함으로써 작업 피로도를 줄일 수 있을 것입니다.",
        },
        {
          source: "GIT",
          reflection:
            "추가 의견: 팀원들과의 협업이 원활하게 이루어지고 있으며, 작업의 명확한 분담이 이루어지고 있는 것으로 보입니다.",
        },
        {
          source: "TEAMS",
          reflection:
            "분석할 Teams 게시물이 없어 업무 현황을 파악할 수 없습니다.",
        },
        {
          source: "EMAIL",
          reflection: "분석할 관련 이메일을 찾지 못했습니다.",
        },
        {
          source: "DOCS",
          reflection: "분석할 관련 문서를 찾지 못했습니다.",
        },
      ],
    },
  },
  {
    report_title: "조민서님의 2025-06-05 일일 업무 보고서",
    id: 6,
    daily_report: {
      title: "📌 일일 업무 진행 내용",
      summary:
        "총 5개의 WBS에 기여. 총 23개 업무 활동 중 WBS 매칭 10건, 미매칭 13건 수행 (Git 15건, Teams 4건, Email 0건, Docs 3건)",
      contents: [
        {
          text: "**[WBS 매칭] Outlook API 통한 메일 수집(23)** 작업을 진행하였습니다.",
          task: "Outlook API 통한 메일 수집",
          evidence: [
            {
              source: "GIT",
              title: "feat: Email 데이터 DB에 저장",
              content: "Email 데이터를 데이터베이스에 저장하는 기능 추가.",
              llm_reference:
                "커밋 메시지의 'Email 데이터 DB에 저장'이 WBS의 'Outlook API 통한 메일 수집' 작업과 관련됩니다.",
            },
          ],
        },
        {
          text: "**[WBS 매칭] Outlook API 통한 메일 수집(23)** 작업을 진행하였습니다.",
          task: "Outlook API 통한 메일 수집",
          evidence: [
            {
              source: "GIT",
              title: "refactor: Email 데이터 요청 모듈화",
              content: "Email 데이터 요청을 모듈화하여 코드 구조 개선.",
              llm_reference:
                "커밋 메시지의 'Email 데이터 요청 모듈화'가 WBS의 'Outlook API 통한 메일 수집' 작업과 관련됩니다.",
            },
          ],
        },
        {
          text: "**[WBS 매칭] VectorDB 구축(22)** 작업을 진행하였습니다.",
          task: "VectorDB 구축",
          evidence: [
            {
              source: "GIT",
              title: "refactor: [#40] 디렉토리 구조 수정",
              content: "디렉토리 구조를 수정하여 코드 리팩토링.",
              llm_reference:
                "PR 메시지의 '[#40] 디렉토리 구조 수정'이 WBS의 'VectorDB 구축' 작업과 관련됩니다.",
            },
          ],
        },
        {
          text: "**[WBS 매칭] SharePoint API 통한 문서 접근 이력을 확인(28)** 작업을 진행하였습니다.",
          task: "SharePoint API 통한 문서 접근 이력을 확인",
          evidence: [
            {
              source: "GIT",
              title: "refactor: Documents 요청 모듈화",
              content: "Documents 요청을 모듈화하여 코드 구조 개선.",
              llm_reference:
                "커밋 메시지의 'Documents 요청 모듈화'가 WBS의 'SharePoint API 통한 문서 접근 이력을 확인' 작업과 관련됩니다.",
            },
          ],
        },
        {
          text: "**[WBS 매칭] VectorDB 구축(22)** 작업을 진행하였습니다.",
          task: "VectorDB 구축",
          evidence: [
            {
              source: "GIT",
              title: "feat: [#29] Vector DB 구축 및 데이터 저장",
              content: "Qdrant DB 초기 연결 설정 및 데이터 저장 기능 추가.",
              llm_reference:
                "PR 메시지의 '[#29] Vector DB 구축 및 데이터 저장'이 WBS의 'VectorDB 구축' 작업과 관련됩니다.",
            },
          ],
        },
        {
          text: "**[WBS 매칭] VectorDB 구축(22)** 작업을 진행하였습니다.",
          task: "VectorDB 구축",
          evidence: [
            {
              source: "TEAMS",
              title: "조민서 created this issue: YAX-40 디렉토리 구조 수정",
              content:
                "조민서 created this issue: [YAX-40: 디렉토리 구조 수정](https://yaxim.atlassian.net/browse/YAX-40)",
              llm_reference:
                "이슈 생성 및 완료 상태 업데이트를 통해 작업이 완료되었음을 확인.",
            },
            {
              source: "TEAMS",
              title:
                "조민서 updated the Status on this issue: YAX-40 디렉토리 구조 수정",
              content:
                "조민서 updated the Status on this issue: [YAX-40 디렉토리 구조 수정](https://yaxim.atlassian.net/browse/YAX-40) From 해야 할 일 to 완료",
              llm_reference: "상태 업데이트를 통해 작업이 완료되었음을 확인.",
            },
          ],
        },
        {
          text: "**[WBS 매칭] 채팅 데이터 전처리 후 데이터베이스(RDB/VectorDB) 적재(30)** 작업을 진행하였습니다.",
          task: "채팅 데이터 전처리 후 데이터베이스(RDB/VectorDB) 적재",
          evidence: [
            {
              source: "TEAMS",
              title: "조민서 created this issue: YAX-42 문서 데이터 청킹",
              content:
                "조민서 created this issue: [YAX-42: 문서 데이터 청킹](https://yaxim.atlassian.net/browse/YAX-42)",
              llm_reference:
                "이슈 생성 및 진행 중 상태 업데이트를 통해 작업이 진행 중임을 확인.",
            },
            {
              source: "TEAMS",
              title:
                "조민서 updated the Status on this issue: YAX-42 문서 데이터 청킹",
              content:
                "조민서 updated the Status on this issue: [YAX-42 문서 데이터 청킹](https://yaxim.atlassian.net/browse/YAX-42) From 해야 할 일 to 진행 중",
              llm_reference: "상태 업데이트를 통해 작업이 진행 중임을 확인.",
            },
          ],
        },
        {
          text: "**[WBS 매칭] 프로젝트 초기 세팅 및 초안 Weekly 생성(AI)(17)** 작업을 진행하였습니다.",
          task: "프로젝트 초기 세팅 및 초안 Weekly 생성(AI)",
          evidence: [
            {
              source: "DOCS",
              title: "[야심]_100.개발표준 정의서_v1.0.docx",
              content:
                "문서는 개발 표준을 명확히 정의하고 있으며, 개발자가 따라야 할 절차와 방안을 구체적으로 설명하고 있다.",
              llm_reference:
                "이 문서는 '프로젝트 초기 세팅 및 초안 Weekly 생성(AI)' 작업과 직접 연관됩니다. 문서 내용에 '개발 표준'이라는 핵심 키워드가 포함되어 작업 완료를 증명합니다. docs_quality_result에 따르면 개발 표준 명확성에서 높은 평가를 받았으며, 작업 진행률 90% 수준으로 판단됩니다.",
            },
          ],
        },
        {
          text: "**[WBS 매칭] 고객 요구사항 취합(3)** 작업을 진행하였습니다.",
          task: "고객 요구사항 취합",
          evidence: [
            {
              source: "DOCS",
              title: "[야심]_300. 요구사항정의서_v0.1.xlsx",
              content:
                "요구사항 ID와 설명이 명확하게 정의되어 있으며, 각 요구사항의 상태와 중요도가 잘 구분되어 있다.",
              llm_reference:
                "이 문서는 '고객 요구사항 취합' 작업과 직접 연관됩니다. 문서 내용에 '요구사항 정의서'라는 핵심 키워드가 포함되어 작업 완료를 증명합니다. docs_quality_result에 따르면 요구사항 명확성에서 높은 평가를 받았으며, 작업 진행률 85% 수준으로 판단됩니다.",
            },
          ],
        },
        {
          text: "**[WBS 미매칭] 코드 정리 및 구조 개선** 작업을 수행하였습니다.",
          task: null,
          evidence: [
            {
              source: "GIT",
              title: "chore: 디렉토리 수정",
              content: "디렉토리 구조를 수정하여 코드 정리.",
              llm_reference:
                "WBS에 명시되지 않은 코드 정리 작업으로, 별도의 계획에 없는 작업으로 판단됩니다.",
            },
          ],
        },
        {
          text: "**[WBS 미매칭] 문서화 개선** 작업을 수행하였습니다.",
          task: null,
          evidence: [
            {
              source: "GIT",
              title: "docs: README 수정",
              content: "프로젝트의 README 파일을 수정하여 문서화 개선.",
              llm_reference:
                "WBS에 명시되지 않은 문서화 작업으로, 별도의 계획에 없는 작업으로 판단됩니다.",
            },
          ],
        },
        {
          text: "**[WBS 미매칭] 코드 리팩토링** 작업을 수행하였습니다.",
          task: null,
          evidence: [
            {
              source: "GIT",
              title:
                "refactor: Teams 게시물 코드에서 PostEntry만 사용할 수 있도록 수정",
              content:
                "Teams 게시물 코드에서 PostEntry만 사용하도록 코드 리팩토링.",
              llm_reference:
                "WBS에 명시되지 않은 코드 리팩토링 작업으로, 별도의 계획에 없는 작업으로 판단됩니다.",
            },
          ],
        },
        {
          text: "**[WBS 미매칭] 디렉토리 구조 수정** 작업을 수행하였습니다.",
          task: null,
          evidence: [
            {
              source: "GIT",
              title:
                "Merge pull request #10 from skala-yAXim/YAX-40-디렉토리-구조-수정",
              content: "디렉토리 구조 수정 PR 병합.",
              llm_reference:
                "WBS에 명시되지 않은 디렉토리 구조 수정 작업으로, 별도의 계획에 없는 작업으로 판단됩니다.",
            },
          ],
        },
        {
          text: "**[WBS 미매칭] 브랜치 병합** 작업을 수행하였습니다.",
          task: null,
          evidence: [
            {
              source: "GIT",
              title: "Dev",
              content: "dev -> main merge",
              llm_reference:
                "WBS에 명시되지 않은 브랜치 병합 작업으로, 별도의 계획에 없는 작업으로 판단됩니다.",
            },
          ],
        },
        {
          text: "**[WBS 미매칭] 문서 데이터 청킹** 작업을 수행하였습니다.",
          task: null,
          evidence: [
            {
              source: "GIT",
              title:
                "Merge pull request #12 from skala-yAXim/YAX-42-문서-데이터-청킹",
              content: "문서 데이터 청킹 PR 병합.",
              llm_reference:
                "WBS에 명시되지 않은 문서 데이터 청킹 작업으로, 별도의 계획에 없는 작업으로 판단됩니다.",
            },
          ],
        },
        {
          text: "**[WBS 미매칭] 문서 데이터 청킹** 작업을 수행하였습니다.",
          task: null,
          evidence: [
            {
              source: "GIT",
              title: "feat: [#42] 문서 데이터 청킹",
              content: "문서 데이터 청킹 기능 추가.",
              llm_reference:
                "WBS에 명시되지 않은 문서 데이터 청킹 작업으로, 별도의 계획에 없는 작업으로 판단됩니다.",
            },
          ],
        },
        {
          text: "**[WBS 미매칭] 문서 데이터 청킹** 작업을 수행하였습니다.",
          task: null,
          evidence: [
            {
              source: "GIT",
              title: "feat: txt, docx 문서 의미 기반 청킹하여 저장",
              content:
                "txt, docx 문서를 의미 기반으로 청킹하여 저장하는 기능 추가.",
              llm_reference:
                "WBS에 명시되지 않은 문서 데이터 청킹 작업으로, 별도의 계획에 없는 작업으로 판단됩니다.",
            },
          ],
        },
        {
          text: "**[WBS 미매칭] 코드 리팩토링** 작업을 수행하였습니다.",
          task: null,
          evidence: [
            {
              source: "GIT",
              title: "refactor: Git 데이터 요청 모듈화",
              content: "Git 데이터 요청을 모듈화하여 코드 구조 개선.",
              llm_reference:
                "WBS에 명시되지 않은 코드 리팩토링 작업으로, 별도의 계획에 없는 작업으로 판단됩니다.",
            },
          ],
        },
        {
          text: "**[WBS 미매칭] 데이터 저장 기능 개선** 작업을 수행하였습니다.",
          task: null,
          evidence: [
            {
              source: "GIT",
              title: "feat: 엑셀 시트별로 분리하여 DB에 저장",
              content:
                "엑셀 시트를 분리하여 데이터베이스에 저장하는 기능 추가.",
              llm_reference:
                "WBS에 명시되지 않은 데이터 저장 기능 개선 작업으로, 별도의 계획에 없는 작업으로 판단됩니다.",
            },
          ],
        },
        {
          text: "**[WBS 미매칭] 데이터 수집 베이스코드** 작업을 수행하였습니다.",
          task: null,
          evidence: [
            {
              source: "TEAMS",
              title:
                "조민서 updated the Status on this issue: YAX-8 데이터 수집 베이스코드",
              content:
                "조민서 updated the Status on this issue: [YAX-8 데이터 수집 베이스코드](https://yaxim.atlassian.net/browse/YAX-8) From 진행 중 to 완료",
              llm_reference: "상태 업데이트를 통해 작업이 완료되었음을 확인.",
            },
          ],
        },
        {
          text: "**[WBS 미매칭] Vector DB 구축 및 데이터 임베딩** 작업을 수행하였습니다.",
          task: null,
          evidence: [
            {
              source: "TEAMS",
              title:
                "조민서 updated the Status on this issue: YAX-29 Vector DB 구축 및 데이터 임베딩",
              content:
                "조민서 updated the Status on this issue: [YAX-29 Vector DB 구축 및 데이터 임베딩](https://yaxim.atlassian.net/browse/YAX-29) From 해야 할 일 to 완료",
              llm_reference: "상태 업데이트를 통해 작업이 완료되었음을 확인.",
            },
          ],
        },
        {
          text: "**[WBS 미매칭] 보고서 설계서 작성** 작업을 수행하였습니다.",
          task: null,
          evidence: [
            {
              source: "DOCS",
              title: "[야심]_300. 보고서설계서_v0.1.xlsx",
              content:
                "문서의 구조가 체계적이며, 각 시트가 명확한 목적을 가지고 있다.",
              llm_reference:
                "이 문서는 현재 WBS 작업 목록과 직접적 연관성을 찾을 수 없습니다. 개인 학습 자료나 참고 문서로 보이며, 프로젝트 직접 기여도는 낮습니다. 그러나 docs_quality_result에서 문서 완성도 7/10점으로 개인 역량 개발 측면에서는 의미가 있습니다.",
            },
          ],
        },
      ],
    },
    daily_reflection: {
      title: "🔍 오늘의 회고 및 개선점",
      summary:
        "오늘의 업무는 주로 데이터 저장과 모듈화 작업에 집중되었습니다. Git을 통한 커밋은 프로젝트의 중요 기능 개발에 직접적으로 연관되어 있으며, 문서 작업은 WBS 작업 목록과 잘 일치하고 있습니다. 하지만, 보고서 설계서 작성과 같은 미매칭 작업이 발생하였습니다. 이는 프로젝트 관리의 효율성을 높이기 위해 작업별로 문서의 필요성과 목적을 명확히 할 필요가 있음을 보여줍니다. 또한, Git 활동을 좀 더 자주 기록하여 변경 사항을 세분화하고 기록하는 습관을 개선할 필요가 있습니다.",
      contents: [
        {
          source: "GIT",
          reflection:
            "총 15개의 Git 활동 중 5개가 WBS와 매칭되었습니다. 특히, 이메일 데이터와 관련된 작업이 두드러졌습니다. 앞으로는 미매칭 작업도 사전에 계획에 포함시켜 명확한 목표를 설정하는 것이 좋겠습니다.",
        },
        {
          source: "TEAMS",
          reflection:
            "Teams 활동에서는 2개의 매칭 작업과 2개의 미매칭 작업이 있었습니다. 데이터 전처리 및 구조 수정 작업이 프로젝트의 데이터 관리 효율성을 높이는 데 기여할 것입니다. 앞으로는 작업의 우선순위를 명확히 하여 더욱 효율적인 업무 진행을 목표로 해야겠습니다.",
        },
        {
          source: "EMAIL",
          reflection:
            "분석할 관련 이메일을 찾지 못했습니다. 이메일 분석이 이루어지지 않아 관련 작업의 진행 상황을 파악하는 데 어려움이 있었습니다.",
        },
        {
          source: "DOCS",
          reflection:
            "문서 작업에서는 2개의 매칭 작업과 1개의 미매칭 작업이 있었습니다. 문서의 품질은 전반적으로 높았으나, 주석 예시 부족과 솔루션 설명 부족을 보완하여 문서의 구체성을 높이는 것이 필요합니다.",
        },
      ],
    },
  },
];
