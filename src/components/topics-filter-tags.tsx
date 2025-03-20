'use client'

import { useState } from 'react'
import { Tag } from './tag'
import { TrophyIcon, CalendarIcon, SparklesIcon } from 'lucide-react'

export function TopicsFilterTags() {
  const [activeTag, setActiveTag] = useState('Vencedor')

  return (
    <div className="px-4 grid grid-flow-col gap-2 overflow-x-auto no-scrollbar">
      <Tag
        title="Vencedor"
        Icon={TrophyIcon}
        isActive={'Vencedor' === activeTag}
        onClick={() => setActiveTag('Vencedor')}
      />
      <Tag
        title="Mais vendidos na semana"
        Icon={CalendarIcon}
        isActive={'Mais vendidos na semana' === activeTag}
        onClick={() => setActiveTag('Mais vendidos na semana')}
      />
      <Tag
        title="Novidades"
        Icon={SparklesIcon}
        isActive={'Novidades' === activeTag}
        onClick={() => setActiveTag('Novidades')}
      />
    </div>
  )
}
