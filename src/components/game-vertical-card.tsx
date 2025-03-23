import { Game } from '@/types/game'

type GameVerticalCardProps = {
  game: Game
}

// TODO: Verificar estrutura para desconto, jogo gratis etc, também precisa colocar os icones de plataformas nos cards e adionar a navegação para os detalhes após clicar nele
export function GameVerticalCard({ game }: GameVerticalCardProps) {
  return (
    <div className="w-full min-w-[150px] flex flex-col gap-2 active:scale-105 transition-transform duration-300 delay-200">
      <div className="aspect-[3/4] overflow-hidden rounded-xl">
        <img
          src={game.imageUrl}
          alt="game"
          className="size-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-base font-bold text-white">{game.title}</span>

        <p className="line-clamp-3 text-xs text-zinc-400">{game.description}</p>

        <span className="min-w-max text-sm text-white font-semibold">
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            maximumFractionDigits: 2,
          }).format(game.price)}
        </span>
      </div>
    </div>
  )
}
