"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { answerProjectQuestion, type ProjectQnAInput } from "@/ai/flows/project-qna-flow";

interface Message {
  role: "user" | "ai";
  content: string;
}

export function ProjectAIChat({ projectContext, lang = 'en' }: { projectContext: string, lang?: 'en' | 'fa' }) {
  const isFa = lang === 'fa';
  const t = {
    initialMessage: isFa ? "سلام! من ربات هوشمند این پروژه هستم. در مورد جزئیات فنی، چالش‌ها یا هر چیز دیگری که کنجکاو هستید از من بپرسید." : "Hi! I'm the smart bot for this project. Ask me about technical details, challenges, or anything you're curious about.",
    placeholder: isFa ? "سوال خود را اینجا تایپ کنید..." : "Type your question here...",
    button: isFa ? "ارسال" : "Send",
  };

  const [messages, setMessages] = useState<Message[]>([
      { role: "ai", content: t.initialMessage }
  ]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: "smooth",
        });
    }
  }, [messages]);


  const handleSendMessage = (content: string) => {
    if (!content.trim() || isPending) return;

    const userMessage: Message = { role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    startTransition(async () => {
      try {
        const payload: ProjectQnAInput = {
          context: projectContext,
          question: content,
        };
        const result = await answerProjectQuestion(payload);
        const aiMessage: Message = { role: "ai", content: result.answer };
        setMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
        console.error("Error getting AI answer:", error);
        const errorMessage: Message = {
          role: "ai",
          content: isFa ? "متاسفانه مشکلی پیش آمد. لطفا دوباره تلاش کنید." : "Sorry, something went wrong. Please try again.",
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  return (
    <div className="mt-12 w-full max-w-2xl mx-auto">
      <div className="rounded-lg border bg-card/50 p-4 space-y-4">
        <ScrollArea className="h-[400px] w-full pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "ai" && (
                  <div className="p-2 bg-primary/20 rounded-full">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                )}
                <div
                  className={cn(
                    "p-3 rounded-lg max-w-[85%]",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <p className={cn("text-sm", isFa && message.role === 'ai' && "text-right")} dir="auto">{message.content}</p>
                </div>
                {message.role === "user" && (
                   <div className="p-2 bg-muted rounded-full">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
             {isPending && (
                <div className="flex items-start gap-3 justify-start">
                    <div className="p-2 bg-primary/20 rounded-full">
                        <Bot className="w-5 h-5 text-primary" />
                    </div>
                    <div className="p-3 rounded-lg bg-muted flex items-center">
                        <Loader className="w-5 h-5 text-muted-foreground animate-spin" />
                    </div>
                </div>
             )}
          </div>
        </ScrollArea>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.placeholder}
            disabled={isPending}
            className="flex-grow"
          />
          <Button type="submit" disabled={isPending || !input.trim()}>
            {isPending ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span className="sr-only">{t.button}</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
