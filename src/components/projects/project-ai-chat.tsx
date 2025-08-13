"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, Loader, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { answerProjectQuestion, type ProjectQnAInput } from "@/ai/flows/project-qna-flow";

interface Message {
  role: "user" | "ai";
  content: string;
}

export function ProjectAIChat({ projectContext, lang = 'en' }: { projectContext: string, lang?: 'en' | 'fa' }) {
  const isFa = lang === 'fa';
  const t = {
    title: isFa ? "از این پروژه بپرسید" : "Ask About This Project",
    welcome: isFa ? "سلام! من ربات هوشمند این پروژه هستم. در مورد جزئیات فنی، چالش‌ها یا هر چیز دیگری که کنجکاو هستید از من بپرسید. برای شروع می‌توانید یکی از سوالات زیر را انتخاب کنید." : "Hi! I'm the smart bot for this project. Ask me about technical details, challenges, or anything you're curious about. You can pick one of the questions below to start.",
    placeholder: isFa ? "سوال خود را اینجا تایپ کنید..." : "Type your question here...",
    button: isFa ? "ارسال" : "Send",
    suggestedQuestions: isFa ? [
        "بزرگترین چالش فنی در این پروژه چه بود؟",
        "چرا از TensorFlow استفاده کردی؟",
        "این پروژه چه مشکلی را حل می‌کند؟"
    ] : [
        "What was the biggest technical challenge?",
        "Why did you use TensorFlow?",
        "What problem does this project solve?"
    ]
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSendMessage = (content: string) => {
    if (!content.trim() || isPending) return;

    const userMessage: Message = { role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    
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
    setInput("");
  };

  const handleSuggestedQuestionClick = (question: string) => {
    setInput(question);
    handleSendMessage(question);
    setInput("");
  }

  return (
    <div className="mt-12 w-full max-w-2xl mx-auto">
      <div className="rounded-lg border bg-card/50 p-4 space-y-4">
        <ScrollArea className="h-[350px] w-full pr-4">
          <div className="space-y-4">
             {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                    <div className="p-3 bg-primary/20 rounded-full mb-4">
                        <Sparkles className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-headline text-lg font-semibold mb-2">{t.title}</h3>
                    <p className="text-sm text-muted-foreground mb-6" dir={isFa ? "rtl" : "ltr"}>
                        {t.welcome}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                        {t.suggestedQuestions.map((q, i) => (
                           <Button 
                                key={i}
                                variant="outline" 
                                size="sm" 
                                className="text-xs h-auto py-2"
                                onClick={() => handleSuggestedQuestionClick(q)}
                                disabled={isPending}
                            >
                                {q}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
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
                    "p-3 rounded-lg max-w-md",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <p className={cn("text-sm", isFa && "text-right")} dir="auto">{message.content}</p>
                </div>
                {message.role === "user" && (
                   <div className="p-2 bg-muted rounded-full">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
             {isPending && messages.length > 0 && (
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
