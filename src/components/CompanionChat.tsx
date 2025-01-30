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

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate companion response based on role
    let response = '';
    if (companionRole === 'math') {
      response = `As your Math Mentor, let me help you with that mathematical question: ${input}`;
    } else if (companionRole === 'science') {
      response = `As your Science Guide, let me explain this scientific concept: ${input}`;
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
          placeholder="Ask your question..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default CompanionChat;