import { IGDBRawGame } from '@/types/game';
import { Game, Platform } from '@/types/game';

export function mapPlatforms(ids: number[]): Platform[] {
  return ids
    .map((id) => {
      if (id === 6) return Platform.Pc;
      if (id === 167) return Platform.Xbox;
      if (id === 187) return Platform.PlayStation;
      if (id === 130) return Platform.NintendoSwitch;
    })
    .filter((p): p is Platform => p !== undefined);
}

export function toGame(raw: IGDBRawGame): Game {
  const year = raw.first_release_date
    ? new Date(raw.first_release_date * 1000).getFullYear()
    : undefined;

  return {
    id: raw.id,
    title: raw.name,
    description: raw.summary ?? '',
    price: Math.floor(Math.random() * 200) + 50,  // placeholder ou vindo de outro serviço
    platformsAvailable: raw.platforms ? mapPlatforms(raw.platforms) : [],
    imageUrl: raw.cover?.url.replace('t_thumb', 't_cover_big') ?? '',
    bannerUrl: raw.artworks?.[0]?.url.replace('t_thumb', 't_screenshot_huge'),
    gallery: raw.screenshots?.map((s) =>
      s.url.replace('t_thumb', 't_screenshot_huge')
    ),
    year,
    category: raw.genres?.[0]?.name,
  };
}
