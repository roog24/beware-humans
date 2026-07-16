export interface Relationship {
  targetId: string;
  targetName: string;
  thought: string;
  quote: string;
}

export interface Character {
  id: string;
  name: string;
  affiliation: string;
  quote: string;
  info: string[];
  secretInfo?: string[];
  relationships: Relationship[];
  color: string;
  imageUrl?: string;
  gallery?: string[];
  themeSongUrl?: string;
  themeSongName?: string;
}

export interface Zone {
  id: string;
  name: string;
  type: string;
  description: string[];
  visuals: string[];
  characterIds: string[];
  color: string;
  imageUrl?: string;
}
