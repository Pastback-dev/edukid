
export type TopicID = 'addition' | 'subtraction' | 'multiplication' | 'division';

export interface Topic {
  id: TopicID;
  title: string;
  description: string;
  icon: string;
  color: string;
  image: any;
}

export interface Question {
  question: string;
  options: number[];
  correctIndex: number;
}

export interface TopicProgress {
  highestLevel: number;
  badges: string[]; // badge ids
}

export type ProgressState = Record<TopicID, TopicProgress>;

export interface Badge {
  id: string;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  threshold: number;
}
