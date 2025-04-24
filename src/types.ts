
export type Category = {
  id: string;
  title: string;
  description: string;
};

export type Question = {
  id: string;
  categoryId: string;
  title: string;
  date: string;
  url: string;
  tags: string[];
};

export type Project = {
  id: string;
  title: string;
  description: string;
  date: string;
  url: string;
  tags: string[];
};
