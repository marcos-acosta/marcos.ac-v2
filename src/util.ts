import { COLORS } from "./consts";

const hash = (s: string) => {
  let arr = s.split("");
  return arr.reduce(
    (hashCode, currentVal) =>
      (hashCode =
        currentVal.charCodeAt(0) +
        (hashCode << 6) +
        (hashCode << 16) -
        hashCode),
    0
  );
};

export const extractTags = (tagsString: string) =>
  tagsString
    .split(",")
    .map((tag) => tag.trim())
    .toSorted();

export const tagNameToColor = (tagName: string) =>
  COLORS[Math.abs(hash(`${tagName}`)) % COLORS.length];

export const formatDate = (date: Date) => {
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
