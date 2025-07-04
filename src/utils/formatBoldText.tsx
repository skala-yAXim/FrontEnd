export const formatBoldText = (text: string | null | undefined) => {
  // 문자열이 아닌 경우 빈 문자열로 처리
  if (text === null || text === undefined || typeof text !== "string") {
    return "";
  }

  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const boldText = part.slice(2, -2);
      return <b key={index}>{boldText}</b>;
    }
    return part;
  });
};
