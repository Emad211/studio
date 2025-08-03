"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactSection({ lang = 'en' }: { lang?: 'en' | 'fa' }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [output, setOutput] = useState<string[]>([]);

    const t = {
        en: {
            getInTouch: "Get In Touch",
            prompt: "guest@codecanvas:~$",
            command: "send-message",
            formSubmitted: "Message sent successfully! Thank you for reaching out.",
            thankYou: "Thank you for your message. I will get back to you soon.",
            tryAgain: "Run 'send-message' again.",
            yourName: "Your Name",
            yourEmail: "Your Email",
            yourMessage: "Your Message",
        },
        fa: {
            getInTouch: "در تماس باشید",
            prompt: "مهمان@کدبوم:~$",
            command: "ارسال-پیام",
            formSubmitted: "پیام با موفقیت ارسال شد! از شما برای تماس سپاسگزارم.",
            thankYou: "از پیام شما متشکرم. به زودی با شما تماس خواهم گرفت.",
            tryAgain: "برای ارسال مجدد دستور 'ارسال-پیام' را اجرا کنید.",
            yourName: "نام شما",
            yourEmail: "ایمیل شما",
            yourMessage: "پیام شما",
        }
    };

    const translations = t[lang];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
        const newOutput = [
            ...output,
            `${translations.prompt} ${translations.command}`,
            `${translations.thankYou}`,
            ` `,
            `${translations.tryAgain}`
        ];
        setOutput(newOutput);
        // Reset form
        setName("");
        setEmail("");
        setMessage("");
    };

    return (
        <section id="contact" className="container">
            <div className="text-center">
                <h2 className="text-3xl font-bold font-headline text-primary">
                    <span className="font-mono text-xl text-secondary">05.</span> {translations.getInTouch}
                </h2>
            </div>
            <div className="max-w-4xl mx-auto mt-12 font-code bg-card border rounded-lg shadow-lg overflow-hidden">
                <div className="flex items-center px-4 py-2 bg-muted/30 border-b">
                    <div className="flex space-x-2">
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    </div>
                    <p className="text-sm text-center flex-grow text-muted-foreground">bash</p>
                </div>
                <div className="p-4 h-96 overflow-y-auto">
                    <div className="text-sm">
                        {output.map((line, index) => (
                            <p key={index} className="whitespace-pre-wrap">{line}</p>
                        ))}
                    </div>
                    {!submitted ? (
                        <form onSubmit={handleSubmit}>
                            <div className="flex items-center">
                                <span className="text-green-400">{translations.prompt}</span>
                                <p className="ml-2">{translations.command}</p>
                            </div>

                            <div className="mt-2 space-y-2">
                                <div className="flex items-center gap-2">
                                    <label htmlFor="name" className="text-blue-400 w-28 shrink-0">{`--name`}</label>
                                    <Input
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder={translations.yourName}
                                        className="bg-transparent border-0 focus-visible:ring-0 px-0"
                                        required
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <label htmlFor="email" className="text-blue-400 w-28 shrink-0">{`--email`}</label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={translations.yourEmail}
                                        className="bg-transparent border-0 focus-visible:ring-0 px-0"
                                        required
                                    />
                                </div>
                                <div className="flex items-start gap-2">
                                    <label htmlFor="message" className="text-blue-400 w-28 shrink-0 pt-2">{`--message`}</label>
                                    <Textarea
                                        id="message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder={translations.yourMessage}
                                        className="bg-transparent border-0 focus-visible:ring-0 px-0"
                                        rows={3}
                                        required
                                    />
                                </div>
                                <div className="flex justify-end pt-2">
                                    <Button type="submit" variant="ghost" className="hover:bg-primary/20 hover:text-primary">
                                        {lang === 'en' ? 'Execute' : 'اجرا'}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    ) : (
                       <p><span className="text-green-400">{translations.prompt}</span> <span className="animate-blink">|</span></p>
                    )}
                </div>
            </div>
        </section>
    );
}
