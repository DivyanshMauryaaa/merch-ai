'use client'

import { FolderIcon, SearchIcon, Sparkles, Check, FileText, ArrowRight, Loader2, Globe, MessageCircle, Link as LinkIcon, Twitter } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Types
type FileType = {
    name: string;
    type: string;
    content?: string;
    status: 'new' | 'updated' | 'existing';
};

type SourceType = {
    id: string;
    title: string;
    url?: string;
    type: 'web' | 'reddit' | 'x' | 'database';
    icon?: any;
};

type ProcessStep = {
    id: string;
    title: string;
    subtext: string;
    fileAction?: {
        type: 'created' | 'updated';
        fileName: string;
    };
    sourceAction?: SourceType[]; // Sources discovered in this step
    status: 'pending' | 'running' | 'completed';
    url?: string;
};

type Message = {
    role: 'user' | 'assistant';
    content: string;
    steps?: ProcessStep[];
    isStreaming?: boolean;
    isThinking?: boolean;
};

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

const MainDemo = () => {
    const [message, setMessage] = useState('Who are my competitors & tell me about their products & what others think of them.');
    const [chats, setChats] = useState<Message[]>([]);
    const [demoFiles, setDemoFiles] = useState<FileType[]>([]);
    const [demoSources, setDemoSources] = useState<SourceType[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    // Auto-scroll to bottom
    const chatContainerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chats]);

    const runSimulation = async () => {
        if (!message) return;

        setIsProcessing(true);
        const userMsg = message;
        setMessage('');

        // 1. Add User Message
        const newChats: Message[] = [...chats, { role: 'user', content: userMsg }];
        const assistantMsgId = newChats.length;

        // 2. Add Assistant Message - Thinking State
        setChats([
            ...newChats,
            { role: 'assistant', content: '', isThinking: true }
        ]);

        // 3. Simulate Thinking Delay
        await sleep(3500);

        // 4. Initialize Steps
        const initialSteps: ProcessStep[] = [
            {
                id: '1',
                title: 'Searched YC Startups directory about "my niche"',
                subtext: 'Listed Competitors',
                fileAction: { type: 'created', fileName: 'Competitors.csv' },
                sourceAction: [{ id: 's1', title: 'YC Startup Directory', type: 'database', url: 'ycombinator.com/companies' }],
                status: 'pending'
            },
            {
                id: '2',
                title: 'Browsing "https://competitor1.com"',
                subtext: "Listed 'Competitor Product'",
                fileAction: { type: 'created', fileName: 'Competitor-products.csv' },
                sourceAction: [{ id: 's2', title: 'https://competitor1.com', type: 'web', url: 'https://competitor1.com' }],
                status: 'pending',
                url: 'https://competitor1.com'
            },
            {
                id: '3',
                title: 'Browsing "https://competitor2.com"',
                subtext: "Listed 'Competitor Product 2'",
                fileAction: { type: 'updated', fileName: 'Competitor-products.csv' },
                sourceAction: [{ id: 's3', title: 'https://competitor2.com', type: 'web', url: 'https://competitor2.com' }],
                status: 'pending',
                url: 'https://competitor2.com'
            },
            {
                id: '4',
                title: 'Browsing X, Reddit for Competitor Products',
                subtext: 'Listed 12000 Posts',
                fileAction: { type: 'created', fileName: 'user-reviews.csv' },
                sourceAction: [
                    { id: 's4', title: 'Why is Acme Corp so expensive? - r/SaaS', type: 'reddit', url: 'reddit.com' },
                    { id: 's5', title: 'Beta Inc just crushed it with the new update! 🚀', type: 'x', url: 'twitter.com' },
                    { id: 's6', title: 'Anyone else having issues with Acme onboarding?', type: 'reddit', url: 'reddit.com' }
                ],
                status: 'pending'
            },
            {
                id: '5',
                title: 'Generating Research summary',
                subtext: 'Generated Research summary',
                fileAction: { type: 'created', fileName: 'Market Research.md' },
                status: 'pending'
            }
        ];

        // Update to start processing (remove thinking, add steps)
        setChats(current => {
            const latest = [...current];
            latest[assistantMsgId] = { ...latest[assistantMsgId], isThinking: false, steps: initialSteps, isStreaming: true };
            return latest;
        });

        const updateStep = (index: number, updates: Partial<ProcessStep>) => {
            setChats(current => {
                const latest = [...current];
                const astMsg = { ...latest[assistantMsgId] };
                if (astMsg.steps) {
                    const newSteps = [...astMsg.steps];
                    newSteps[index] = { ...newSteps[index], ...updates };
                    astMsg.steps = newSteps;
                    latest[assistantMsgId] = astMsg;
                }
                return latest;
            });
        };

        const addFile = (name: string, status: 'new' | 'updated') => {
            setDemoFiles(prev => {
                const filtered = prev.filter(f => f.name !== name);
                return [{ name, type: name.split('.').pop() || 'file', status }, ...filtered];
            });
        };

        const addSources = (sources: SourceType[]) => {
            setDemoSources(prev => [...prev, ...sources]);
        };

        // 5. Execution Loop
        for (let i = 0; i < initialSteps.length; i++) {
            // Start Step
            updateStep(i, { status: 'running' });

            // Add sources immediately when step starts (feels snappier)
            if (initialSteps[i].sourceAction) {
                addSources(initialSteps[i].sourceAction!);
            }

            await sleep(800 + Math.random() * 500); // Simulate work

            // Complete Step & File Action
            if (initialSteps[i].fileAction) {
                const action = initialSteps[i].fileAction!;
                addFile(action.fileName, action.type === 'created' ? 'new' : 'updated');
            }

            updateStep(i, { status: 'completed' });
            await sleep(400); // Pause between steps
        }

        // 6. Stream Final Text Response (Same as before)
        const finalResponse = `
Based on the comprehensive research from YC directory, competitor sites, and social sentiment analysis (Reddit/X), here is a summary of your competitive landscape.

**Key Competitors Identified:**
*   **Acme Corp**: Dominates the enterprise segment. Strength in reliability.
*   **Beta Inc**: Focusing on bottom-up adoption. Very strong developer community.

**Product Gaps & Opportunities:**
Users on Reddit frequently complain about the *complexity* of Acme's onboarding. There is a clear opening for a "Simpler, Faster" alternative in this niche.

**Action Plan:**
1.  Target the specific subreddit threads identified in \`user-reviews.csv\`.
2.  Launch a comparison landing page highlighting "Setup in 5 minutes".
3.  Review the full breakdown in **Market Research.md**.
`.trim();

        let streamedContent = '';
        for (let i = 0; i < finalResponse.length; i += 3) {
            streamedContent += finalResponse.slice(i, i + 3);
            setChats(current => {
                const latest = [...current];
                latest[assistantMsgId] = { ...latest[assistantMsgId], content: streamedContent };
                return latest;
            });
            await sleep(15);
        }

        setChats(current => {
            const latest = [...current];
            latest[assistantMsgId] = { ...latest[assistantMsgId], isStreaming: false };
            return latest;
        });
        setIsProcessing(false);
    };

    return (
        <div className="flex h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
            {/* Sidebar: Organized Insights */}
            <div className="w-[300px] border-r border-gray-200 bg-white flex flex-col shadow-sm z-10 shrink-0">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <div className="flex items-center gap-3 text-indigo-700">
                        <FolderIcon size={24} />
                        <h2 className="text-xl font-bold tracking-tight">Organized Insights</h2>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    <AnimatePresence initial={false}>
                        {demoFiles.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="text-center text-gray-400 mt-10 text-sm"
                            >
                                No files generated yet.
                            </motion.div>
                        )}
                        {demoFiles.map((file) => (
                            <motion.div
                                key={file.name}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="group flex items-center p-3 rounded-xl hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-all cursor-pointer"
                            >
                                <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white text-gray-500 group-hover:text-indigo-600 transition-colors">
                                    <FileText size={18} />
                                </div>
                                <div className="ml-3 flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-800 truncate group-hover:text-indigo-900">{file.name}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] uppercase text-gray-400">{file.type}</span>
                                        {file.status === 'new' && <span className="text-[10px] font-bold text-green-600 bg-green-100 px-1.5 rounded-full">NEW</span>}
                                        {file.status === 'updated' && <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-1.5 rounded-full">UPDATED</span>}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col h-full relative bg-white min-w-0">
                <div className="p-6 border-b border-gray-100 flex items-center gap-3 bg-white/80 backdrop-blur-md sticky top-0 z-10">

                    <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
                        <Sparkles size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Merch Agent</h1>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Online & Ready
                        </p>
                    </div>
                </div>

                <div
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth"
                >
                    {chats.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-50">
                            <Sparkles size={48} className="mb-4 text-indigo-200" />
                            <p className="text-lg">Ask me to research, analyze, or generate content.</p>
                        </div>
                    )}

                    {chats.map((chat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                                "flex flex-col max-w-3xl",
                                chat.role === 'user' ? "ml-auto items-end" : "mr-auto items-start w-full"
                            )}
                        >
                            {chat.role === 'user' ? (
                                <div className="bg-indigo-600 text-white px-6 py-4 rounded-2xl rounded-tr-sm shadow-sm text-lg max-w-[90%] break-words">
                                    {chat.content}
                                </div>
                            ) : (
                                <div className="w-full space-y-6">
                                    {chat.isThinking ? (
                                        <div className="flex items-center gap-3 text-indigo-600 bg-white border border-indigo-100 rounded-2xl p-5 w-fit shadow-sm animate-pulse">
                                            <Loader2 className="animate-spin" size={20} />
                                            <span className="text-base font-medium">Thinking...</span>
                                        </div>
                                    ) : (
                                        <>
                                            {/* Workflow Steps Visualization */}
                                            {chat.steps && chat.steps.length > 0 && (
                                                <div className="bg-white border border-gray-200 rounded-2xl p-2 shadow-sm pointer-events-none select-none max-w-2xl">
                                                    {chat.steps.map((step, sIdx) => (
                                                        <StepItem key={step.id} step={step} isFirst={sIdx === 0} isLast={sIdx === chat.steps!.length - 1} />
                                                    ))}
                                                </div>
                                            )}

                                            {/* Markdown Content */}
                                            {chat.content && (
                                                <div className="prose prose-indigo prose-lg max-w-none text-gray-700 leading-relaxed bg-white p-2 md:p-0 rounded-xl">
                                                    <ReactMarkdown>{chat.content}</ReactMarkdown>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    ))}

                    {/* Padding for bottom scroll */}
                    <div className="h-32" />
                </div>

                {/* Input Area */}
                <div className="absolute bottom-6 left-0 right-0 px-4 md:px-8 max-w-4xl mx-auto w-full z-20">
                    <div className="relative group shadow-2xl rounded-2xl bg-white">
                        <input
                            type="text"
                            placeholder="Ask Merch Agent..."
                            className="w-full pl-6 pr-32 py-5 text-lg rounded-2xl border-2 border-indigo-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none bg-white text-gray-800 placeholder-gray-400"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && !isProcessing && runSimulation()}
                            disabled={isProcessing}
                        />
                        <button
                            onClick={runSimulation}
                            disabled={!message || isProcessing}
                            className={cn(
                                "absolute right-3 top-3 bottom-3 aspect-square rounded-xl flex items-center justify-center transition-all",
                                message && !isProcessing
                                    ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:scale-105 active:scale-95"
                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                            )}
                        >
                            {isProcessing ? <Loader2 className="animate-spin" size={24} /> : <ArrowRight size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Sidebar - Sources */}
            <div className="w-[350px] border-l border-gray-200 bg-gray-50/50 hidden xl:flex flex-col shrink-0 z-10">
                <div className="p-6 border-b border-gray-100 bg-white/50">
                    <div className="flex items-center gap-3 text-gray-700">
                        <SearchIcon size={24} />
                        <h2 className="text-xl font-bold tracking-tight">Sources</h2>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    <AnimatePresence>
                        {demoSources.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="text-center text-gray-400 mt-10 text-sm"
                            >
                                No sources analyzed yet.
                            </motion.div>
                        )}
                        {demoSources.map((source, idx) => (
                            <motion.a
                                href={source.url || '#'}
                                target="_blank"
                                key={source.id + idx}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30, delay: idx * 0.1 }}
                                className="flex flex-col p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 min-w-[20px]">
                                        {source.type === 'reddit' && <MessageCircle size={18} className="text-orange-500" />}
                                        {source.type === 'x' && <Twitter size={18} className="text-blue-400" />}
                                        {source.type === 'database' && <FolderIcon size={18} className="text-purple-500" />}
                                        {source.type === 'web' && <Globe size={18} className="text-blue-500" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-indigo-700 line-clamp-2">
                                            {source.title}
                                        </p>
                                        <div className="flex items-center gap-1 mt-1.5 text-xs text-gray-400">
                                            <LinkIcon size={10} />
                                            <span className="truncate">{source.url?.replace(/^https?:\/\//, '')}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

function StepItem({ step, isFirst, isLast }: { step: ProcessStep, isFirst: boolean, isLast: boolean }) {
    const isCompleted = step.status === 'completed';
    const isRunning = step.status === 'running';

    return (
        <div className="relative pl-0 py-3 flex gap-4 transition-opacity duration-300">
            {/* Status Icon */}
            <div className="relative z-10 flex-shrink-0 mt-1">
                <motion.div
                    initial={false}
                    animate={{
                        backgroundColor: isCompleted ? '#4F46E5' : isRunning ? '#E0E7FF' : '#F3F4F6',
                        scale: isRunning ? 1.1 : 1
                    }}
                    className="w-6 h-6 rounded-md flex items-center justify-center transition-colors duration-300"
                >
                    {isCompleted ? (
                        <Check size={14} className="text-white" strokeWidth={3} />
                    ) : isRunning ? (
                        <Loader2 size={14} className="text-indigo-600 animate-spin" />
                    ) : (
                        <div className="w-2 h-2 rounded-full bg-gray-300" />
                    )}
                </motion.div>

                {/* Connecting Line */}
                {!isLast && (
                    <div className="absolute top-7 left-3 w-[1px] h-[calc(100%+12px)] bg-gray-200 -z-10" />
                )}
            </div>

            {/* Content */}
            <div className={cn("flex-1", step.status === 'pending' && "opacity-40 grayscale")}>
                <h4 className="text-sm font-semibold text-gray-800 leading-tight">
                    {step.title}
                </h4>
                <div className="mt-1 text-xs text-gray-500 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-gray-400" />
                    {step.subtext}
                </div>

                {/* File Badge */}
                <AnimatePresence>
                    {step.fileAction && (isCompleted || isRunning) && (
                        <motion.div
                            initial={{ opacity: 0, y: -5, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 shadow-sm"
                        >
                            <span className={cn(
                                "text-[10px] font-bold uppercase tracking-wider",
                                step.fileAction.type === 'created' ? "text-gray-500" : "text-blue-500"
                            )}>
                                {step.fileAction.type}
                            </span>
                            <span className="text-sm font-medium text-gray-900 font-mono">
                                {step.fileAction.fileName}
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default MainDemo;