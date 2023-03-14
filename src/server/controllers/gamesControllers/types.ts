export interface GameStructure {
  name: string;
  image: string;
  backupImage?: string;
  about: string;
  platforms: string[];
  categories: string[];
  gameplayTime: number;
  releaseYear: number;
  developer: string;
  ageRating: string;
}

export interface GameFormData {
  name: string;
  image: unknown;
  backupImage?: string;
  about: string;
  platforms: string[];
  categories: string[];
  gameplayTime: number;
  releaseYear: number;
  developer: string;
  ageRating: string;
}

export type GamesStructure = GameStructure[];
