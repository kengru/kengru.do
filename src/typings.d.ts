type TProject = {
  name: string;
  desc: string;
  img: string;
  code: string;
  live: string;
  skills: string[];
};

type OdinResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T;
};

export type { TProject, OdinResponse };
