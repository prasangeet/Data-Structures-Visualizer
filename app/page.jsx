import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import { BrainCircuit, ChevronRight, GitGraph, ListTree, Network, Trees } from "lucide-react";

export default function Home() {
  const dataStructures = [
    {
      title: "Linked Lists",
      description:
        "Visualize single, doubly, and circular linked lists with operations",
      icon: <ListTree className="h-8 w-8" />,
      href: "/linked-list",
    },
    {
      title: "Trees",
      description: "Binary trees, BST, AVL trees with traversal animations",
      icon: <GitGraph className="h-8 w-8" />,
      href: "/trees",
    },
    {
      title: "Graphs",
      description: "Graph traversal algorithms and shortest path algorithms",
      icon: <Network className="h-8 w-8" />,
      href: "/graphs",
    },
    {
      title: "Sorting Algorithms",
      description: "Visualize bubble, merge, quick sort and more",
      icon: <BrainCircuit className="h-8 w-8" />,
      href: "/sorting",
    },
  ];

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Data Structures & Algorithms Visualizer
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Interactive visualizations of common data structures and algorithms
          with step-by-step animations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dataStructures.map((item, index) => {
          return (
            <Card
              key={index}
              className="overflow-hidden transition-all hover:shadow-lg"
            >
              <CardHeader className="pb-2">
                <div className="mb-2 text-primary">{item.icon}</div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href={item.href} className="w-full">
                  <Button className="w-full justify-between">
                    Explore <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
