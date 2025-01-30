import React, { useState } from 'react';
import CompanionChat from '@/components/CompanionChat';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="min-h-screen p-8 bg-background">
      <h1 className="text-4xl font-bold text-center mb-8">Cogni Companions Hub</h1>
      
      <Tabs defaultValue="math" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="math">Math Mentor</TabsTrigger>
          <TabsTrigger value="science">Science Guide</TabsTrigger>
        </TabsList>
        
        <TabsContent value="math">
          <Card className="p-6">
            <CompanionChat
              companionName="Math Mentor"
              companionRole="math"
            />
          </Card>
        </TabsContent>
        
        <TabsContent value="science">
          <Card className="p-6">
            <CompanionChat
              companionName="Science Guide"
              companionRole="science"
            />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;