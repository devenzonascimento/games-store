import { cn } from '@/lib/utils'

type TagProps = {
  title: string
  Icon: React.ElementType
  isActive?: boolean
  onClick?: () => void
}

export function Tag({ title, Icon, isActive, onClick }: TagProps) {
  return (
    <button
      type="button"
      className={cn(
        'min-w-max p-2 flex items-center gap-2 border rounded-lg',
        isActive
          ? 'bg-zinc-300 border-zinc-300 *:text-zinc-900'
          : 'bg-transparent border-zinc-600 *:text-zinc-300',
      )}
      onClick={onClick}
    >
      <Icon className="size-5 shrink-0" />
      <span className="text-sm font-medium">{title}</span>
    </button>
  )
}
