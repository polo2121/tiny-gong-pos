import { ReactNode } from "react";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function highlightMatch(text: string, query: string): ReactNode {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return text;
  }

  const matchPattern = new RegExp(`(${escapeRegExp(normalizedQuery)})`, "gi");
  const textParts = text.split(matchPattern);

  return textParts.map((textPart, index) => {
    const isMatch = textPart.toLowerCase() === normalizedQuery.toLowerCase();

    if (!isMatch) {
      return textPart;
    }

    return (
      <mark
        key={`${textPart}-${index}`}
        className="rounded bg-amber-200 px-0.5 text-inherit"
      >
        {textPart}
      </mark>
    );
  });
}
