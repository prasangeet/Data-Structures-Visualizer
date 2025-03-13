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
import { Tabs } from "@/components/ui/tabs";
import { Plus, RotateCcw, Trash2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export default function LinkedListPage() {
  const [nodes, setNodes] = useState([]);
  const [value, setValue] = useState("");
  const [listType, setListType] = useState("singly");
  const [selectedNode, setSelectedNode] = useState(null);
  
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 100, y: 250 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Initialize canvas
  useEffect(() => {
    setNodes([]);
  }, []);

  // Set up wheel event listener
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const handleWheelEvent = (e) => {
      // Prevent the default browser scrolling
      e.preventDefault();
      
      // Get mouse position relative to canvas
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Calculate new scale
      const newScale = Math.max(0.5, Math.min(5, scale - e.deltaY * 0.001));
      
      // Adjust offset to zoom toward mouse position
      const scaleChange = newScale / scale;
      
      setOffset({
        x: mouseX - (mouseX - offset.x) * scaleChange,
        y: mouseY - (mouseY - offset.y) * scaleChange
      });
      
      setScale(newScale);
    };
    
    // Add the event listener with passive: false to allow preventDefault()
    canvas.addEventListener('wheel', handleWheelEvent, { passive: false });
    
    return () => {
      canvas.removeEventListener('wheel', handleWheelEvent);
    };
  }, [scale, offset]);
  
  // Draw the linked list
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const containerWidth = canvasContainerRef.current.clientWidth;
    const containerHeight = canvasContainerRef.current.clientHeight;
    
    // Set canvas dimensions
    canvas.width = containerWidth;
    canvas.height = containerHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    
    // Apply transformations for pan and zoom
    ctx.translate(offset.x, offset.y);
    ctx.scale(scale, scale);
    
    // Node dimensions
    const nodeRadius = 30;
    const nodeSpacing = 100;
    
    // Draw nodes
    nodes.forEach((node, index) => {
      const x = index * (nodeRadius * 2 + nodeSpacing);
      const y = 0;
      
      // Draw node circle
      ctx.beginPath();
      ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
      
      // Set node style based on position and selection
      if (index === 0) {
        ctx.fillStyle = "#bbeebb"; // Head node (green)
        ctx.strokeStyle = "#4CAF50";
      } else if (index === nodes.length - 1) {
        ctx.fillStyle = "#ffcccc"; // Tail node (red)
        ctx.strokeStyle = "#F44336";
      } else {
        ctx.fillStyle = "#f0f0f0"; // Middle nodes
        ctx.strokeStyle = "#9e9e9e";
      }
      
      // Highlight selected node
      if (selectedNode === index) {
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#2196F3";
      } else {
        ctx.lineWidth = 2;
      }
      
      ctx.fill();
      ctx.stroke();
      
      // Draw node value
      ctx.fillStyle = "#000000";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(node.value, x, y);
      
      // Draw arrow to next node
      if (index < nodes.length - 1 || listType === "circular") {
        const nextIndex = index < nodes.length - 1 ? index + 1 : 0;
        const nextX = nextIndex * (nodeRadius * 2 + nodeSpacing);
        const nextY = 0;
        
        // Arrow settings
        const arrowLength = 10;
        const arrowWidth = 6;
        
        // Calculate start and end points
        const startX = x + nodeRadius;
        const endX = nextX - nodeRadius;
        
        // Draw line
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(endX, y);
        ctx.strokeStyle = index === nodes.length - 1 && listType === "circular" ? "#4CAF50" : "#666666";
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw arrowhead
        ctx.beginPath();
        ctx.moveTo(endX, y);
        ctx.lineTo(endX - arrowLength, y - arrowWidth);
        ctx.lineTo(endX - arrowLength, y + arrowWidth);
        ctx.closePath();
        ctx.fillStyle = index === nodes.length - 1 && listType === "circular" ? "#4CAF50" : "#666666";
        ctx.fill();
        
        // Draw curved arrow for circular list
        if (index === nodes.length - 1 && listType === "circular") {
          ctx.beginPath();
          ctx.setLineDash([5, 3]);
          ctx.moveTo(endX, y - nodeRadius - 10);
          ctx.bezierCurveTo(
            (endX + startX) / 2, y - 100,
            (endX + startX) / 2, y - 100,
            startX, y - nodeRadius - 10
          );
          ctx.strokeStyle = "#4CAF50";
          ctx.stroke();
          ctx.setLineDash([]);
          
          // Add "Circular" label
          ctx.fillStyle = "#4CAF50";
          ctx.font = "14px Arial";
          ctx.fillText("Circular", (startX + endX) / 2, y - 80);
        }
      }
      
      // Draw prev arrows for doubly linked list
      if (listType === "doubly" && index > 0) {
        const prevX = (index - 1) * (nodeRadius * 2 + nodeSpacing);
        
        // Calculate points
        const startX = x - nodeRadius;
        const endX = prevX + nodeRadius;
        const offsetY = 15; // Offset to separate the arrows
        
        // Draw line slightly below the forward arrow
        ctx.beginPath();
        ctx.moveTo(startX, y + offsetY);
        ctx.lineTo(endX, y + offsetY);
        ctx.strokeStyle = "#999999";
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw arrowhead
        ctx.beginPath();
        ctx.moveTo(endX, y + offsetY);
        ctx.lineTo(endX + 10, y + offsetY - 6);
        ctx.lineTo(endX + 10, y + offsetY + 6);
        ctx.closePath();
        ctx.fillStyle = "#999999";
        ctx.fill();
      }
    });
    
    ctx.restore();
  }, [nodes, selectedNode, listType, scale, offset]);
  
  // Handle mouse events for interactivity
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale - offset.x / scale;
    const y = (e.clientY - rect.top) / scale - offset.y / scale;
    
    // Check if a node was clicked
    const nodeRadius = 30;
    const nodeSpacing = 100;
    
    let clickedNodeIndex = -1;
    
    nodes.forEach((_, index) => {
      const nodeX = index * (nodeRadius * 2 + nodeSpacing);
      const nodeY = 0;
      
      // Check if click is within node circle
      const distance = Math.sqrt(Math.pow(x - nodeX, 2) + Math.pow(y - nodeY, 2));
      if (distance <= nodeRadius) {
        clickedNodeIndex = index;
      }
    });
    
    if (clickedNodeIndex !== -1) {
      setSelectedNode(clickedNodeIndex);
    } else {
      // Start dragging the canvas
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };
  
  const handleMouseMove = (e) => {
    if (isDragging) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      
      setOffset(prev => ({
        x: prev.x + dx,
        y: prev.y + dy
      }));
      
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const addNode = () => {
    if (!value.trim()) return;
    
    const newNode = {
      value: value.trim(),
      next: listType === "circular" && nodes.length > 0 ? 0 : nodes.length + 1,
      prev: listType === "doubly" ? nodes.length - 1 : null
    };
    
    setNodes([...nodes, newNode]);
    setValue("");
  };
  
  const resetList = () => {
    setNodes([]);
    setSelectedNode(null);
    setScale(1);
    setOffset({ x: 100, y: 250 });
  };
  
  const deleteNode = (index) => {
    setNodes(nodes.filter((_, i) => i !== index));
    setSelectedNode(null);
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
                  the next one.
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
                  nodes.
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
                  circle.
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
          {selectedNode !== null && (
            <Button variant="destructive" onClick={() => deleteNode(selectedNode)}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete Node
            </Button>
          )}
        </div>
        
        <div 
          ref={canvasContainerRef}
          className="h-[500px] w-full rounded-lg border border-gray-200 shadow-sm overflow-hidden relative"
        >
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          />
          <div className="absolute bottom-4 right-4 bg-white p-2 rounded-md shadow-md text-sm">
            <div>Zoom: {Math.round(scale * 100)}%</div>
            <div className="text-xs text-gray-500">Scroll to zoom, drag to pan</div>
          </div>
        </div>
      </div>
    </>
  );
}