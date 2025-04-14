import { cn } from '@/lib/utils'
import { CheckIcon } from 'lucide-react'

type InputProps = React.ComponentProps<'input'> & {
  Icon: React.ElementType
}

export function Input({ Icon, className, ...props }: InputProps) {
  return (
    <div className="relative w-full">
      <input
        className={cn(
          'peer w-full bg-transparent p-2 pl-10 border border-zinc-600 focus:border-zinc-300 placeholder-shown:border-zinc-600 text-white placeholder:text-zinc-400 rounded-lg outline-0',
          className,
        )}
        {...props}
      />
      <label
        htmlFor={props.id}
        className="absolute top-1/2 -translate-y-1/2 left-3"
      >
        <Icon className=" size-5 text-zinc-300 shrink-0" />
      </label>

      <label
        htmlFor={props.id}
        className="invisible peer-valid:visible absolute top-1/2 -translate-y-1/2 right-3"
      >
        <CheckIcon className=" size-5 text-zinc-300 shrink-0" />
      </label>
    </div>
  )
}
