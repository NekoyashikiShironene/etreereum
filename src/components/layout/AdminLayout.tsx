import type { ReactNode } from "react"
import { Sidebar } from "./Sidebar"

type LayoutProps = {
  children: ReactNode
  activeComponent: string
  setActiveComponent: (component: string) => void
}

export function Layout({ children, activeComponent, setActiveComponent }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50 pt-[2rem]">
      <Sidebar activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <main className="flex-1 overflow-auto p-6 pl-[24rem]">{children}</main>
    </div>
  )
}