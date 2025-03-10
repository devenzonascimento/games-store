import { Button } from '@/components/ui/button'
import { HomeIcon, LayoutGridIcon, MenuIcon } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-12 flex items-center justify-center"
        >
          <MenuIcon className="size-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="p-4 pt-10  flex flex-col gap-4">
        <SheetTitle>Bem vindo ao nossa loja!</SheetTitle>
        <SheetDescription className="w-full">
          <Button
            variant="ghost"
            className="w-full flex items-center justify-start"
          >
            <HomeIcon className="size-5" />
            Início
          </Button>
          <Button
            variant="ghost"
            className="w-full flex items-center justify-start"
          >
            <LayoutGridIcon className="size-5" />
            Catálogo
          </Button>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}
