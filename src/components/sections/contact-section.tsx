"use client";

import { useState, useRef, useEffect } from "react";

type HistoryItem = {
    type: 'command' | 'response' | 'prompt' | 'error';
    text: string;
};

const Prompt = ({ text, children }: { text: string, children?: React.ReactNode }) => (
    <div className="flex items-center gap-2">
        <span className="text-green-400">guest@codecanvas</span>
        <span className="text-foreground">:</span>
        <span className="text-blue-400">~</span>
        <span className="text-foreground">$</span>
        <div className="flex-1">{children}</div>
    </div>
);

export function ContactSection({ lang = 'en' }: { lang?: 'en' | 'fa' }) {
    // For now, we ignore `lang` as requested and only use English.
    const t = {
        title: "Get In Touch",
        command: "send-message",
        helpText: [
          "Available commands:",
          "  send-message    - Send a message to me.",
          "  help            - Show this help message.",
          "  clear           - Clear the terminal screen."
        ],
        prompts: ["Enter your name:", "Enter your email:", "Enter your message:", "Sending message..."],
        success: "Message sent successfully! Thank you for reaching out.",
        restart: "You can run 'send-message' again to send another message.",
        commandNotFound: "command not found:",
        welcome: "Welcome to my interactive terminal! Type 'help' to see available commands."
    };

    const [history, setHistory] = useState<HistoryItem[]>([
      { type: 'response', text: t.welcome },
      { type: 'prompt', text: '' }
    ]);
    const [step, setStep] = useState(0);
    const [inputValue, setInputValue] = useState("");
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

    const processCommand = (command: string) => {
        const newHistory: HistoryItem[] = [
            ...history.slice(0, -1),
            { type: 'prompt', text: '' }
        ];
        
        switch (command.toLowerCase()) {
            case 'help':
                newHistory.push(...t.helpText.map(line => ({ type: 'response' as const, text: line })));
                break;
            case 'send-message':
                newHistory.push({ type: 'response', text: t.prompts[0] });
                newHistory.push({ type: 'prompt', text: ' >' });
                setStep(1);
                break;
            case 'clear':
                setHistory([{ type: 'prompt', text: '' }]);
                return;
            default:
                newHistory.push({ type: 'error', text: `${t.commandNotFound} ${command}` });
        }
        newHistory.push({ type: 'prompt', text: '' });
        setHistory(newHistory);
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(step === 4) return;

        const currentInput = inputValue.trim();
        setInputValue("");

        if (step === 0) {
            const newHistory: HistoryItem[] = [
                ...history.slice(0, -1),
                { type: 'prompt', text: '' }
            ];
            setHistory(newHistory);
            processCommand(currentInput);
            return;
        }

        const newHistory: HistoryItem[] = [
            ...history.slice(0, -1),
            { type: 'prompt', text: ` > ${currentInput}` }
        ];

        if (step === 1) { // Name
            setFormValues(v => ({ ...v, name: currentInput }));
            newHistory.push({ type: 'response', text: t.prompts[1] });
            newHistory.push({ type: 'prompt', text: ' >' });
            setStep(2);
        } else if (step === 2) { // Email
            setFormValues(v => ({ ...v, email: currentInput }));
            newHistory.push({ type: 'response', text: t.prompts[2] });
            newHistory.push({ type: 'prompt', text: ' >' });
            setStep(3);
        } else if (step === 3) { // Message
            setFormValues(v => ({ ...v, message: currentInput }));
            newHistory.push({ type: 'response', text: t.prompts[3] });
            setHistory(newHistory);
            setStep(4);

            await new Promise(res => setTimeout(res, 1500));
            
            const finalHistory: HistoryItem[] = [...newHistory];
            finalHistory.push({ type: 'response', text: t.success });
            finalHistory.push({ type: 'response', text: t.restart });
            finalHistory.push({ type: 'prompt', text: '' });
            setHistory(finalHistory);

            setStep(0);
            setFormValues({ name: "", email: "", message: "" });
            return;
        }
        
        setHistory(newHistory);
    };

    return (
        <section id="contact" className="container">
            <div className="text-center">
                <h2 className="text-3xl font-bold font-headline text-primary">
                    <span className="font-mono text-xl text-secondary">05.</span> {t.title}
                </h2>
            </div>
            <div 
                className="dark max-w-4xl mx-auto mt-12 font-code bg-card border rounded-lg shadow-lg overflow-hidden cursor-text"
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
                                <div key={index} className="flex items-center gap-2">
                                  {item.text.startsWith(' >') ? <span className="text-muted-foreground">{item.text}</span> : <Prompt text={item.text} />}
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
                                </div>
                            );
                        }
                        if(item.type === 'error'){
                            return <p key={index} className="whitespace-pre-wrap text-red-500">{item.text}</p>;
                        }
                        return <p key={index} className="whitespace-pre-wrap">{item.text}</p>;
                    })}
                     {step < 4 && <div className="inline-block w-2 h-4 bg-foreground animate-blink ml-1" />}
                </div>
            </div>
        </section>
    );
}
