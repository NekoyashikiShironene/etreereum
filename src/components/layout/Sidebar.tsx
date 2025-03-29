"use client"

import { User, Coins, Trees, CircleDashed } from "lucide-react"

type SidebarProps = {
  activeComponent: string
  setActiveComponent: (component: string) => void
}

export function Sidebar({ activeComponent, setActiveComponent }: SidebarProps) {
  const menuItems = [
    { id: "pending", label: "Pending Trees", icon: CircleDashed },
    { id: "etreereum", label: "Etreereum", icon: Coins },
    { id: "nftree", label: "NFTree", icon: Trees },
    { id: "role", label: "Role", icon: User },
  ]

  return (
    <aside className="fixed left-0 w-[24rem] border-r border-gray-200 bg-white">
      <nav className="h-[calc(100vh-4rem)] overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveComponent(item.id)}
                  className={`flex w-full items-center rounded-md px-10 py-2 text-sm font-medium transition-colors ${
                    activeComponent === item.id
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="mr-6 h-5 w-5" />
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

