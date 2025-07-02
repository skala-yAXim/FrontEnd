/**
 * 긴 텍스트를 읽기 쉬운 구조로 변환하는 유틸 함수
 */

/**
 * 텍스트를 구조화된 리스트로 변환
 * - feat:, refactor:, fix: 등으로 시작하는 항목들을 분리
 * - 긴 문장을 자연스럽게 분리
 */
export const formatToReadableList = (text: any): string[] => {
  // 타입 가드: text가 문자열인지 확인
  if (typeof text !== "string" || !text || text.trim().length === 0) {
    return [];
  }

  // 1. Git 커밋 메시지 스타일 분리 (feat:, refactor:, fix: 등)
  const gitPatterns =
    /(?:^|\s)(feat|refactor|fix|add|update|remove|improve|chore|docs|style|test|build|ci|perf|revert):/gi;

  if (gitPatterns.test(text)) {
    return text
      .split(
        /(?=(?:feat|refactor|fix|add|update|remove|improve|chore|docs|style|test|build|ci|perf|revert):)/gi
      )
      .map(item => item.trim())
      .filter(item => item.length > 0)
      .map(item =>
        item.replace(
          /^(feat|refactor|fix|add|update|remove|improve|chore|docs|style|test|build|ci|perf|revert):/i,
          match => `**${match}**`
        )
      );
  }

  // 2. 마침표나 세미콜론으로 구분된 문장 분리
  const sentences = text
    .split(/[.;]\s+/)
    .map(sentence => sentence.trim())
    .filter(sentence => sentence.length > 10); // 너무 짧은 문장 제거

  if (sentences.length > 1) {
    return sentences;
  }

  // 3. 쉼표로 구분된 항목들 (50자 이상일 때만)
  if (text.length > 50 && text.includes(",")) {
    const items = text
      .split(",")
      .map(item => item.trim())
      .filter(item => item.length > 5);

    if (items.length > 1) {
      return items;
    }
  }

  // 4. 기본값: 원본 텍스트 반환
  return [text];
};

/**
 * 볼드 텍스트 포맷팅 (기존 함수와 호환)
 */
export const formatBoldText = (text: any) => {
  // 타입 가드: text가 문자열인지 확인
  if (typeof text !== "string" || !text) {
    return text; // 문자열이 아니면 그대로 반환
  }

  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const boldText = part.slice(2, -2);
      return <strong key={index}>{boldText}</strong>;
    }
    return part;
  });
};
