"use client";

import ReactFlow from "reactflow";

import React from "react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Graphs() {
  const [algorihtm, setAlgorithm] = useState("djikstra");

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-semibold ">Graphs Algorithms</h1>

      <Tabs
        defaultValue="djikstra"
        className={"w-full mt-5"}
        onValueChange={setAlgorithm}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="djikstra">Djikstra</TabsTrigger>
          <TabsTrigger value="bfs">Breadth-First Search</TabsTrigger>
        </TabsList>
        <TabsContent value="djikstra">
          <Card>
            <CardHeader>
              <CardTitle>Djikstra's Algorithm</CardTitle>
              <CardDescription>
                Finds the shortest path between nodes in a graph with weighted
                edges
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value="bfs">
          <Card>
            <CardHeader>
              <CardTitle>Breadth-First Search</CardTitle>
              <CardDescription>
                Explores all neighbor nodes at the present depth before moving
                to nodes at the next depth level
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>

        
      </Tabs>
    </div>
  );
}

export default Graphs;
