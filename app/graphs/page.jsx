import ReactFlow from "reactflow";

import React from "react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Graphs() {

  const [algorihtm, setAlgorithm] = useState("djikstra");

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-semibold ">Graphs Algorithms</h1>

      <Tabs defaultValue="djikstra" className={"w-full mt-5"} onValueChange={setAlgorithm}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="djikstra">
            Djikstra
          </TabsTrigger>
          <TabsTrigger value="bfs">
            BFS
          </TabsTrigger>
        </TabsList>
        <TabsContent>
          
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Graphs;
