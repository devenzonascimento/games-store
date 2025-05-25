// src/app/(public)/store/catalog/page.tsx
import { Suspense } from 'react'
import { CatalogContent } from './catalog-content'
import { GameHorizontalCardSkeleton } from '@/components/game-horizontal-card'

export default function CatalogPage() {
  return (
    <Suspense fallback={<CatalogLoading />}>
      <CatalogContent />
    </Suspense>
  )
}

function CatalogLoading() {
  return (
    <main className="w-full flex-1 flex flex-col bg-zinc-900 overflow-hidden">
      <section className="w-full p-4">
        <div className="p-2 flex items-center gap-2 bg-zinc-800 border border-zinc-600 rounded-xl">
          <div className="size-4 bg-zinc-700 rounded-full animate-pulse" />
          <div className="flex-1 h-4 bg-zinc-700 rounded-md animate-pulse" />
        </div>
      </section>

      <section className="flex-1 flex flex-col gap-3 p-4 overflow-y-auto max-lg:no-scrollbar">
        {Array.from({ length: 10 }).map((_, index) => (
          <GameHorizontalCardSkeleton key={index.toString()} />
        ))}
      </section>
    </main>
  )
}
