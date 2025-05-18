// src/components/submit-button.tsx
'use client'

import { useFormStatus } from 'react-dom'

type SubmitButtonProps = {
  children: React.ReactNode
}

export function SubmitButton({ children }: SubmitButtonProps) {
  const { pending } = useFormStatus()
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full p-2 flex items-center justify-center gap-2 text-lg font-medium text-zinc-950 bg-white rounded-lg group-invalid:opacity-70 group-invalid:pointer-events-none disabled:opacity-50"
    >
      {pending ? 'Processing...' : children}
    </button>
  )
}