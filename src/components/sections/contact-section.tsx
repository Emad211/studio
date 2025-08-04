"use client";

import { useState, useRef, useEffect } from "react";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type HistoryItem = {
    type: 'command' | 'response' | 'prompt' | 'error';
    text?: string;
    component?: React.ReactNode;
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

const SocialLink = ({ icon, name, url }: { icon: React.ReactNode, name: string, url: string }) => (
    <div className="flex items-center gap-4">
        {icon}
        <Link href={url} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary hover:underline">
            {name}
        </Link>
    </div>
);

const CommandHelp = ({ command, description }: { command: string, description: string }) => (
    <div className="flex items-start">
        <span className="w-28 shrink-0">{command}</span>
        <span className="mr-4 shrink-0">-</span>
        <span className="flex-1">{description}</span>
    </div>
);

const welcomeMessages: HistoryItem[] = [
    { type: 'response', text: "Welcome to my interactive terminal!" },
    { type: 'response', text: "Available commands:" },
    { type: 'response', component: <CommandHelp command="send-message" description="Send a message to me." /> },
    { type: 'response', component: <CommandHelp command="faq" description="Read frequently asked questions." /> },
    { type: 'response', component: <CommandHelp command="socials" description="View my social media profiles." /> },
    { type: 'response', component: <CommandHelp command="clear" description="Clear the terminal screen." /> },
];

const faqContent: HistoryItem[] = [
    { type: 'response', text: "Frequently Asked Questions:" },
    { type: 'response', text: "  Q: What technologies do you specialize in?" },
    { type: 'response', text: "  A: I specialize in the MERN stack, Next.js, and Tailwind CSS." },
    { type: 'response', text: "" },
    { type: 'response', text: "  Q: Are you available for freelance work?" },
    { type: 'response', text: "  A: Yes, I am currently accepting new projects. Use the 'send-message' command to get in touch!" },
    { type: 'response', text: "" },
    { type: 'response', text: "  Q: Where can I see your projects?" },
    { type: 'response', text: "  A: You can see my projects on the projects page or my GitHub profile." }
];

const socialsContent: HistoryItem[] = [
    { type: 'response', text: "My social media profiles:" },
    { type: 'response', component: <SocialLink icon={<Github className="w-5 h-5"/>} name="GitHub" url="https://github.com/Emad211" /> },
    { type: 'response', component: <SocialLink icon={<Linkedin className="w-5 h-5"/>} name="LinkedIn" url="https://linkedin.com/in/your-username" /> },
    { type: 'response', component: <SocialLink icon={<Twitter className="w-5 h-5"/>} name="Twitter" url="https://twitter.com/your-username" /> },
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
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        setHistory([]);
        setCommandHistory([{ type: 'prompt', text: '' }]);
    }, []);

    useEffect(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, [history, commandHistory]);

    const handleFocus = () => {
        inputRef.current?.focus();
    };

    const processCommand = (command: string) => {
        const newHistoryEntry: HistoryItem = { type: 'command', text: command };
        setHistory(prev => [...prev, newHistoryEntry]);

        let response: HistoryItem[] = [];
        
        switch (command.toLowerCase()) {
            case 'faq':
                response = [...faqContent];
                break;
            case 'socials':
                response = [...socialsContent];
                break;
            case 'send-message':
                response.push({ type: 'response', text: t.prompts[0] });
                setStep(1);
                break;
            case 'clear':
                setHistory([]);
                return;
            default:
                if (command.trim() !== '') {
                  response.push({ type: 'error', text: `${t.commandNotFound} ${command}` });
                }
        }
        setHistory(prev => [...prev, ...response]);
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(step === 4) return;

        const currentInput = inputValue.trim();
        setInputValue("");
        
        const newHistory = [...history, { type: 'command', text: currentInput }];
        setHistory(newHistory);


        if (step === 0) {
            processCommand(currentInput);
            return;
        }
        
        let response: HistoryItem[] = [];

        if (step === 1) { // Name
            setFormValues(v => ({ ...v, name: currentInput }));
            response.push({ type: 'response', text: t.prompts[1] });
            setStep(2);
        } else if (step === 2) { // Email
            setFormValues(v => ({ ...v, email: currentInput }));
            response.push({ type: 'response', text: t.prompts[2] });
            setStep(3);
        } else if (step === 3) { // Message
            setFormValues(v => ({ ...v, message: currentInput }));
            setStep(4);
            
            const sendingMessageHistory = [...newHistory, { type: 'response', text: t.prompts[3] }];
            setHistory(sendingMessageHistory);


            // Simulate sending message
            await new Promise(res => setTimeout(res, 1000));
            
            const finalLines = [
                { type: 'response', text: t.success },
                { type: 'response', text: t.restart }
            ];

            setHistory(prev => [...prev.slice(0, -1), ...finalLines]); // Replace "Sending message..."
            setStep(0);
            setFormValues({ name: "", email: "", message: "" });
            return;
        }

        setHistory(prev => [...prev, ...response]);
    };

    const renderHistoryItem = (item: HistoryItem, index: number) => {
        const key = `history-${index}`;
        switch (item.type) {
            case 'command':
                return (
                    <Prompt key={key}>
                        <span className="text-foreground">{item.text}</span>
                    </Prompt>
                );
            case 'error':
                return <p key={key} className="whitespace-pre-wrap text-red-500">{item.text}</p>;
            case 'response':
                if (item.component) {
                    return <div key={key} className={cn("pl-2", item.text ? "mt-1" : "")}>{item.component}</div>;
                }
                return <p key={key} className="whitespace-pre-wrap text-foreground">{item.text}</p>;
            default:
                return null;
        }
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
                <div ref={containerRef} className="p-4 h-96 overflow-y-auto text-sm md:text-base space-y-2">
                     {welcomeMessages.map((item, index) => renderHistoryItem(item, `welcome-${index}`))}
                    {history.map((item, index) => renderHistoryItem(item, index))}
                    <form onSubmit={handleSubmit}>
                        <Prompt>
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="bg-transparent border-0 focus:outline-none w-full text-foreground"
                                autoComplete="off"
                                aria-label="terminal-input"
                                disabled={step === 4}
                            />
                        </Prompt>
                    </form>
                </div>
            </div>
        </section>
    );
}
