import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  role: 'user' | 'companion';
  content: string;
}

interface CompanionChatProps {
  companionName: string;
  companionRole: string;
}

const CompanionChat = ({ companionName, companionRole }: CompanionChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const { toast } = useToast();

  const evaluateMathExpression = (expression: string): string => {
    try {
      // Remove any whitespace and validate input contains only numbers and basic operators
      const sanitizedExp = expression.replace(/\s/g, '');
      if (!/^[0-9+\-*/().]+$/.test(sanitizedExp)) {
        return "I can only process basic mathematical operations (+, -, *, /) with numbers.";
      }
      
      // Safely evaluate the expression
      const result = Function(`'use strict'; return (${sanitizedExp})`)();
      return `The answer is ${result}`;
    } catch (error) {
      return "I couldn't process that mathematical expression. Please try something like '2 + 2' or '10 * 5'.";
    }
  };

  const getScientificResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    // Basic scientific concept responses
    if (lowerQuestion.includes('gravity')) {
      return "Gravity is a fundamental force that attracts objects with mass towards each other. On Earth, objects fall at approximately 9.8 meters per second squared.";
    } else if (lowerQuestion.includes('photosynthesis')) {
      return "Photosynthesis is the process by which plants convert sunlight, water, and carbon dioxide into glucose and oxygen. This process is essential for life on Earth.";
    } else if (lowerQuestion.includes('atom')) {
      return "An atom is the smallest unit of matter that retains the properties of an element. It consists of a nucleus (containing protons and neutrons) surrounded by electrons.";
    } else {
      return "I understand you're asking about: " + question + ". Could you please be more specific or rephrase your question about this scientific concept?";
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Generate response based on companion role
    let response = '';
    if (companionRole === 'math') {
      response = evaluateMathExpression(input);
    } else if (companionRole === 'science') {
      response = getScientificResponse(input);
    }

    const companionMessage: Message = {
      role: 'companion',
      content: response
    };

    setMessages(prev => [...prev, companionMessage]);
    
    toast({
      title: "Message sent",
      description: "Your question has been received!"
    });
  };

  return (
    <div className="flex flex-col h-[500px] w-full max-w-md mx-auto border rounded-lg p-4">
      <div className="text-xl font-bold mb-4">{companionName}</div>
      
      <ScrollArea className="flex-grow mb-4 p-4 border rounded-lg">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 p-3 rounded-lg ${
              message.role === 'user'
                ? 'bg-primary text-primary-foreground ml-auto max-w-[80%]'
                : 'bg-muted mr-auto max-w-[80%]'
            }`}
          >
            {message.content}
          </div>
        ))}
      </ScrollArea>

      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={companionRole === 'math' ? "Try '2 + 2' or '10 * 5'..." : "Ask your science question..."}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default CompanionChat;