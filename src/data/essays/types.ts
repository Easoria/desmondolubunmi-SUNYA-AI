export type EssaySection = {
  heading: string;
  paragraphs: string[];
};

export type Essay = {
  number: number;
  slug: string;
  title: string;
  group: "THE ORIGIN AND THE FALL" | "THE SYSTEM AND THE END";
  numbered: boolean;
  sourceSections: string[];
  targetWords: number;
  wordCount: number;
  standfirst: string;
  sections: EssaySection[];
};

export type WhereToBegin = {
  slug: string;
  title: string;
  description: string;
  sections: EssaySection[];
};
