import { FlameIcon } from 'lucide-react'
import { GameBannersCarousel } from '@/components/game-banners-carousel'
import { GameCards } from '@/components/game-cards'
import { GameBanner, IGDBPlatform } from '@/types/game'

// TODO: Pensar na posibilidade de gerar um script para mockar muitos dados deles, ao invés de usar a api, pensando em performance e disponibilidade para o dia da apresentação

// TODO: Integrar um endpoint de mock para pegar os principais jogos para o banner da home

// TODO: Pensar na integração com o banco de dados principal para conectar jogos em produtos e vendas

// TODO: Reimaginar a pagina e colocar mais features como carrinho de compras, toasts, checkout, busca e filtragem complexa etc,

// TODO: Vitrine: trazer os produtos em destaque da API de produtos e mostrar a listagem com foto e detalhe, habilitar botao de comprar para adicionar item a cesta e link na foto para abrir o detalhe do produto.

// TODO: Detalhe: trazer detalhes do produto selecionado

// TODO: Busca: atraves de termo pesquisado usar api de produto para trazer produtos filtrados 

// TODO: Login: utilizar api de clientes para identificar se os dados de e-mail e senha estao corretos redirecionar para a pagina de cadastro, caso retorne um objeto vazio mostre a mensagem usuario e senha invalidos

// TODO: cadastro: utillizar a api de cliente para trazer os dados cadastrados de clientes, ou inserir um novo ou alterar dados.

// TODO: reenvio de senha: implementar rotina com api para simular o reenvio de senha de um email existente

// TODO: cesta de compras: ao clicar em gravar pedido, gravar itens da cesta e gerar uma numeração de pedido e dados de entrega.

export default async function HomePage() {
  return (
    <main className="w-full flex-1 flex flex-col items-center bg-zinc-900 overflow-y-auto max-lg:no-scrollbar">
      <section className="w-full max-w-[1240px] py-2 px-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <FlameIcon className="fill-amber-500 text-red-500" />
          <h2 className="text-xl font-medium text-zinc-200">Destaques</h2>
        </div>
        <GameBannersCarousel />
      </section>

      <section className="w-full max-w-[1240px] py-2 px-0">
        <GameCards />
      </section>
    </main>
  )
}
