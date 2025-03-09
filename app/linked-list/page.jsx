"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";
import { Plus, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

export default function LinkedListPage() {
  const [nodes, setNodes] = useState([]);
  const [value, setValue] = useState("");
  const [listType, setListType] = useState("singly");
  const [operation, setOperation] = useState(null);
  const [operationIndex, setOperationIndex] = useState(null);

  useEffect(() => {
    setNodes([]);
  }, []);

  const addNode = () => {
    if (!value.trim()) return;

    setOperation("add");
    setOperationIndex(nodes.length);
    setTimeout(() => {
      if (listType == "circular" && nodes.length > 0) {
        setNodes([...nodes, { value: value.trim(), next: 0 }]);
      } else {
        setNodes([...nodes, { value: value.trim(), next: nodes.length + 1 }]);
      }
      setValue("");
      setOperation(null);
    }, 500);
  };

  const resetList = () => {
    setNodes([]);
  };

  return (
    <>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Linked List Visualization</h1>

        <Tabs
          defaultValue="singly"
          className="mb-8"
          onValueChange={setListType}
        >
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="singly">Singly Linked</TabsTrigger>
            <TabsTrigger value="doubly">Doubly Linked</TabsTrigger>
            <TabsTrigger value="circular">Circular</TabsTrigger>
          </TabsList>

          <TabsContent value="singly">
            <Card>
              <CardHeader>
                <CardTitle>Singly Linked List</CardTitle>
                <CardDescription>
                  A linear collection of elements where each element points to
                  the next one
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="doubly">
            <Card>
              <CardHeader>
                <CardTitle>Doubly Linked List</CardTitle>
                <CardDescription>
                  Each node contains references to both the next and previous
                  nodes
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="circular">
            <Card>
              <CardHeader>
                <CardTitle>Circular Linked List</CardTitle>
                <CardDescription>
                  The last element points back to the first element, forming a
                  circle
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="flex gap-4 mb-8">
          <div className="flex-1">
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter node value"
              onKeyDown={(e) => e.key === "Enter" && addNode()}
            />
          </div>
          <Button onClick={addNode}>
            <Plus className="mr-2 h-4 w-4" /> Add Node
          </Button>
          <Button variant="outline" onClick={resetList}>
            <RotateCcw className="mr-2 h-4 w-4" /> Reset
          </Button>
        </div>
        
      </div>
    </>
  );
}
