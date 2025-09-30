export const extractTags = (tagsString: string) =>
  tagsString.split(",").map((tag) => tag.trim());
