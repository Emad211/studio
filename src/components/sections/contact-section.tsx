"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

type HistoryItem = {
    type: 'command' | 'response' | 'prompt';
    text: string;
};

const Prompt = ({ text, children }: { text: string, children?: React.ReactNode }) => (
    <div className="flex items-center gap-2">
        <span className="text-green-400">{text}</span>
        {children}
    </div>
);

export function ContactSection({ lang = 'en' }: { lang?: 'en' | 'fa' }) {
    const t = {
        en: {
            title: "Get In Touch",
            prompt: "guest@codecanvas:~$",
            command: "send-message",
            prompts: ["Enter your name:", "Enter your email:", "Enter your message:", "Sending message..."],
            success: "Message sent successfully! Thank you for reaching out.",
            restart: "You can run 'send-message' again to send another message.",
        },
        fa: {
            title: "در تماس باشید",
            prompt: "مهمان@کدبوم:~$",
            command: "ارسال-پیام",
            prompts: ["نام خود را وارد کنید:", "ایمیل خود را وارد کنید:", "پیام خود را وارد کنید:", "در حال ارسال پیام..."],
            success: "پیام با موفقیت ارسال شد! از شما برای تماس سپاسگزارم.",
            restart: "می‌توانید دستور 'ارسال-پیام' را برای ارسال پیام دیگر اجرا کنید.",
        }
    };

    const translations = t[lang];

    const [history, setHistory] = useState<HistoryItem[]>([
      { type: 'prompt', text: translations.prompt }
    ]);
    const [step, setStep] = useState(0);
    const [inputValue, setInputValue] = useState(translations.command);
    const [formValues, setFormValues] = useState({ name: "", email: "", message: "" });
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, [history]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleFocus = () => {
        inputRef.current?.focus();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(step === 4) return; // Already submitting

        const newHistory: HistoryItem[] = [
            ...history.slice(0, -1), // remove current prompt
            { type: 'prompt', text: `${translations.prompt} ${inputValue}` }
        ];

        setInputValue("");

        if (step === 0) { // Command
            newHistory.push({ type: 'response', text: translations.prompts[0] });
            newHistory.push({ type: 'prompt', text: ' >' });
            setStep(1);
        } else if (step === 1) { // Name
            setFormValues(v => ({ ...v, name: inputValue }));
            newHistory.push({ type: 'response', text: translations.prompts[1] });
            newHistory.push({ type: 'prompt', text: ' >' });
            setStep(2);
        } else if (step === 2) { // Email
            setFormValues(v => ({ ...v, email: inputValue }));
            newHistory.push({ type: 'response', text: translations.prompts[2] });
            newHistory.push({ type: 'prompt', text: ' >' });
            setStep(3);
        } else if (step === 3) { // Message
            setFormValues(v => ({ ...v, message: inputValue }));
            newHistory.push({ type: 'response', text: translations.prompts[3] });
            setHistory(newHistory);
            setStep(4); // Submitting state

            // Simulate API call
            await new Promise(res => setTimeout(res, 1500));
            
            const finalHistory: HistoryItem[] = [...newHistory];
            finalHistory.push({ type: 'response', text: translations.success });
            finalHistory.push({ type: 'response', text: translations.restart });
            finalHistory.push({ type: 'prompt', text: translations.prompt });
            setHistory(finalHistory);

            // Reset
            setStep(0);
            setInputValue(translations.command);
            setFormValues({ name: "", email: "", message: "" });
            return;
        }
        
        setHistory(newHistory);
    };

    return (
        <section id="contact" className="container">
            <div className="text-center">
                <h2 className="text-3xl font-bold font-headline text-primary">
                    <span className="font-mono text-xl text-secondary">05.</span> {translations.title}
                </h2>
            </div>
            <div 
                className="max-w-4xl mx-auto mt-12 font-code bg-card border rounded-lg shadow-lg overflow-hidden cursor-text"
                onClick={handleFocus}
            >
                <div className="flex items-center px-4 py-2 bg-muted/30 border-b">
                    <div className="flex space-x-2">
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    </div>
                    <p className="text-sm text-center flex-grow text-muted-foreground">bash</p>
                </div>
                <div ref={containerRef} className="p-4 h-96 overflow-y-auto text-sm">
                    {history.map((item, index) => {
                        if (item.type === 'prompt') {
                            return (
                                <Prompt key={index} text={item.text}>
                                  {index === history.length - 1 && step < 4 && (
                                    <form onSubmit={handleSubmit} className="flex-1">
                                      <input
                                        ref={inputRef}
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        className="bg-transparent border-0 focus:outline-none w-full text-foreground"
                                        autoFocus
                                        autoComplete="off"
                                        aria-label="terminal-input"
                                        disabled={step >= 4}
                                      />
                                    </form>
                                  )}
                                </Prompt>
                            );
                        }
                        return <p key={index} className="whitespace-pre-wrap">{item.text}</p>;
                    })}
                     {step < 4 && <div className="inline-block w-2 h-4 bg-foreground animate-blink ml-1" />}
                </div>
            </div>
        </section>
    );
}
