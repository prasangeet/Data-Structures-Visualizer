"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { ListTree, Network, GitGraph, BrainCircuit, Home } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { name: "Home", href: "/", icon: <Home className="h-4 w-4 mr-2" /> },
    { name: "Linked Lists", href: "/linked-list", icon: <ListTree className="h-4 w-4 mr-2" /> },
    { name: "Trees", href: "/trees", icon: <GitGraph className="h-4 w-4 mr-2" /> },
    { name: "Graphs", href: "/graphs", icon: <Network className="h-4 w-4 mr-2" /> },
    { name: "Sorting", href: "/sorting", icon: <BrainCircuit className="h-4 w-4 mr-2" /> },
  ]

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Network className="h-6 w-6" />
            <span className="font-bold">DS Visualizer</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            {navItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <Button variant={pathname === item.href ? "default" : "ghost"} size="sm" className="flex items-center">
                  {item.icon}
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

