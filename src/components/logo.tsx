import React from 'react'

import { Jaini } from 'next/font/google'

const jaini = Jaini({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: true,
  fallback: ['sans-serif'],
})

export function Logo() {
  return (
    <div className="flex items-center gap-2 px-2">
      <HorseIcon className="size-10 fill-white" />
      <span
        className="font-logo font-semibold text-4xl"
        style={{ ...jaini.style }}
      >
        Xtreme GH
      </span>
    </div>
  )
}

export function HorseIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Horse</title>
      <path d="M23 4c-2.043 0-3.305 1.207-4 2.156V5C3.184 5 3 27.77 3 28h4s-.016-4.875 1.531-9.688c.774-2.406 1.95-4.785 3.625-6.5S15.973 9 19 9h.625l.281-.563S20.793 6.954 22 6.313V9.25l4.094 8.188l.093.156l.125.125c.403.379.555.738.625.968c.055.168.032.165.032.188c-.028.098-.07.309-.25.594c-.219.347-.414.531-.719.531s-.5-.184-.719-.531s-.312-.719-.312-.719l-.219-.844l-.875.094s-.832.098-1.75-.156s-1.785-.703-2.156-2.094l-.344-1.281l-1.125.656c-1.293.758-2.043 1.914-2.188 3.094c-.144 1.18.204 2.316.625 3.437C17.777 23.898 19 26.184 19 28h2c0-2.621-1.465-5.055-2.219-7.063c-.375-1.003-.547-1.851-.468-2.468a1.8 1.8 0 0 1 .468-1c.762 1.191 1.805 2.035 2.813 2.312c.93.258 1.308.176 1.75.157c.09.234.062.292.25.593C24 21.184 24.804 22 26 22c1.195 0 2-.816 2.406-1.469c.407-.652.563-1.281.563-1.281l.031-.094v-.093s.008-.481-.156-1c-.137-.438-.496-.97-.969-1.5h.031L24 8.75V4zm-4.531 3.031c-.004.008-.028.024-.032.032c-.406.019-.8.039-1.187.093c-.313.043-.61.121-.906.188a10 10 0 0 1 .906-.188c.39-.066.8-.105 1.219-.125M22 12c-.55 0-1 .45-1 1s.45 1 1 1s1-.45 1-1s-.45-1-1-1" />
    </svg>
  )
}
