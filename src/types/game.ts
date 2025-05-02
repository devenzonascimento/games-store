// types/igdb.ts
export interface IGDBRawGame {
  id: number;
  name: string;
  summary?: string;
  first_release_date?: number;
  cover?: { url: string };
  artworks?: { url: string }[];
  screenshots?: { url: string }[];
  platforms?: number[];
  genres?: { name: string }[];
}

// types/game.ts
export enum Platform {
  Pc = 0,
  Xbox = 1,
  PlayStation = 2,
  NintendoSwitch = 3,
}

export type Game = {
  id: number;
  title: string;
  description: string;
  price: number;
  platformsAvailable: Platform[];
  imageUrl: string;      // portrait
  bannerUrl?: string;    // paisagem principal
  gallery?: string[];    // banners alternativos
  year?: number;
  category?: string;
};
