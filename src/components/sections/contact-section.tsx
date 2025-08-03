"use client";

import { useState, useRef, useEffect, useCallback } from "react";

type HistoryItem = {
    type: 'command' | 'response' | 'prompt' | 'error';
    text: string;
};

const Prompt = ({ children }: { children?: React.ReactNode }) => (
    <div className="flex items-center gap-2">
        <span className="text-green-400">guest@codecanvas</span>
        <span className="text-foreground">:</span>
        <span className="text-blue-400">~</span>
        <span className="text-foreground">$</span>
        <div className="flex-1">{children}</div>
    </div>
);

const welcomeMessages: HistoryItem[] = [
    { type: 'response', text: "Welcome to my interactive terminal!" },
    { type: 'response', text: "Available commands:" },
    { type: 'response', text: "  send-message    - Send a message to me." },
    { type: 'response', text: "  faq             - Read frequently asked questions." },
    { type: 'response', text: "  clear           - Clear the terminal screen." }
];

const faqContent: HistoryItem[] = [
    { type: 'response', text: "Frequently Asked Questions:"},
    { type: 'response', text: "  Q: What technologies do you specialize in?"},
    { type: 'response', text: "  A: I specialize in the MERN stack, Next.js, and Tailwind CSS."},
    { type: 'response', text: ""},
    { type: 'response', text: "  Q: Are you available for freelance work?"},
    { type: 'response', text: "  A: Yes, I am currently accepting new projects. Use the 'send-message' command to get in touch!"},
    { type: 'response', text: ""},
    { type: 'response', text: "  Q: Where can I see your projects?"},
    { type: 'response', text: "  A: You can see my projects on the projects page or my GitHub profile."}
];

export function ContactSection({ lang = 'en' }: { lang?: 'en' | 'fa' }) {
    // For now, we ignore `lang` as requested and only use English.
    const t = {
        title: "Get In Touch",
        prompts: ["Enter your name:", "Enter your email:", "Enter your message:", "Sending message..."],
        success: "Message sent successfully! Thank you for reaching out.",
        restart: "You can run 'send-message' again to send another message.",
        commandNotFound: "command not found:",
    };

    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [commandHistory, setCommandHistory] = useState<HistoryItem[]>([]);
    const [step, setStep] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [formValues, setFormValues] = useState({ name: "", email: "", message: "" });
    const [isTyping, setIsTyping] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        setHistory([...welcomeMessages]);
        setCommandHistory([{ type: 'prompt', text: '' }]);
    }, []);

    useEffect(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, [history, commandHistory]);

    useEffect(() => {
        if (!isTyping) {
            inputRef.current?.focus();
        }
    }, [isTyping]);

    const handleFocus = () => {
        if (!isTyping) {
            inputRef.current?.focus();
        }
    };

    const typeResponse = useCallback((lines: HistoryItem[], onFinished?: () => void) => {
        setIsTyping(true);
        let lineIndex = 0;
        
        const typeLine = () => {
            if (lineIndex >= lines.length) {
                setIsTyping(false);
                onFinished?.();
                return;
            }

            const currentLine = lines[lineIndex];
            setCommandHistory(prev => [...prev, { type: currentLine.type, text: "" }]);

            let charIndex = 0;
            const typeChar = () => {
                if (charIndex < currentLine.text.length) {
                    setCommandHistory(prev => {
                        const newHist = [...prev];
                        newHist[newHist.length - 1].text += currentLine.text[charIndex];
                        return newHist;
                    });
                    charIndex++;
                    setTimeout(typeChar, 10);
                } else {
                    lineIndex++;
                    setTimeout(typeLine, 10);
                }
            };
            typeChar();
        };
        typeLine();
    }, []);

    const processCommand = (command: string) => {
        const newCommandHistory: HistoryItem[] = [...commandHistory];
        newCommandHistory[newCommandHistory.length - 1] = { type: 'command', text: command };
        
        switch (command.toLowerCase()) {
            case 'faq':
                setCommandHistory(newCommandHistory);
                typeResponse(faqContent, () => {
                     setCommandHistory(prev => [...prev, { type: 'prompt', text: '' }]);
                });
                break;
            case 'send-message':
                setCommandHistory(newCommandHistory);
                typeResponse([{ type: 'response', text: t.prompts[0] }], () => {
                    setCommandHistory(prev => [...prev, { type: 'prompt', text: '' }]);
                });
                setStep(1);
                break;
            case 'clear':
                 setCommandHistory([{ type: 'prompt', text: '' }]);
                return;
            default:
                if (command.trim() !== '') {
                  newCommandHistory.push({ type: 'error', text: `${t.commandNotFound} ${command}` });
                }
                newCommandHistory.push({ type: 'prompt', text: '' });
                setCommandHistory(newCommandHistory);
        }
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(step === 4 || isTyping) return;

        const currentInput = inputValue.trim();
        setInputValue("");

        if (step === 0) {
            processCommand(currentInput);
            return;
        }

        const newHistory: HistoryItem[] = [ ...commandHistory ];
        newHistory[newHistory.length - 1] = { type: 'command', text: `> ${currentInput}` };
        setCommandHistory(newHistory);

        if (step === 1) { // Name
            setFormValues(v => ({ ...v, name: currentInput }));
            typeResponse([{ type: 'response', text: t.prompts[1] }], () => {
                 setCommandHistory(prev => [...prev, { type: 'prompt', text: '' }]);
            });
            setStep(2);
        } else if (step === 2) { // Email
            setFormValues(v => ({ ...v, email: currentInput }));
            typeResponse([{ type: 'response', text: t.prompts[2] }], () => {
                 setCommandHistory(prev => [...prev, { type: 'prompt', text: '' }]);
            });
            setStep(3);
        } else if (step === 3) { // Message
            setFormValues(v => ({ ...v, message: currentInput }));
            setStep(4);
            
            typeResponse([{ type: 'response', text: t.prompts[3] }], async () => {
                await new Promise(res => setTimeout(res, 1000));
                const finalLines = [
                    { type: 'response', text: t.success },
                    { type: 'response', text: t.restart }
                ];
                typeResponse(finalLines, () => {
                    setCommandHistory(prev => [...prev, { type: 'prompt', text: '' }]);
                    setStep(0);
                    setFormValues({ name: "", email: "", message: "" });
                });
            });
            return;
        }
    };
    
    const allHistory = [...history, ...commandHistory];

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
                <div ref={containerRef} className="p-4 h-96 overflow-y-auto text-sm text-foreground">
                    {allHistory.map((item, index) => {
                        if (item.type === 'prompt') {
                             if (index === allHistory.length - 1) { // Only render input for the last prompt
                                return (
                                    <form onSubmit={handleSubmit} key={index}>
                                      <Prompt>
                                          <input
                                            ref={inputRef}
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            className="bg-transparent border-0 focus:outline-none w-full text-foreground"
                                            autoFocus
                                            autoComplete="off"
                                            aria-label="terminal-input"
                                            disabled={step >= 4 || isTyping}
                                          />
                                      </Prompt>
                                    </form>
                                );
                            }
                             // Render previous prompts as static text
                             return (
                                 <Prompt key={index}>
                                     <span className="text-foreground">{item.text}</span>
                                 </Prompt>
                             );
                        }
                        if (item.type === 'command') {
                            return (
                                <Prompt key={index}>
                                    <span className="text-foreground">{item.text}</span>
                                </Prompt>
                            );
                        }
                        if(item.type === 'error'){
                            return <p key={index} className="whitespace-pre-wrap text-red-500">{item.text}</p>;
                        }
                        return <p key={index} className="whitespace-pre-wrap text-foreground">{item.text}</p>;
                    })}
                     {isTyping && <div className="inline-block w-2 h-4 bg-foreground animate-blink" />}
                </div>
            </div>
        </section>
    );
}
