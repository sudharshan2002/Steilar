"use client";

import { m } from "framer-motion";
import { ArrowUp, Image, Loader2, Plus, Sparkles, UserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/brand/app-shell";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useSteilarStore } from "@/lib/stores/use-steilar-store";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type ChatThread = {
  id: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: string;
};

function makeId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function makeThread(): ChatThread {
  return {
    id: makeId("chat"),
    title: "New design",
    messages: [],
    updatedAt: new Date().toISOString()
  };
}

export function GenerateScreen() {
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const setUploadedImage = useSteilarStore((state) => state.setUploadedImage);
  const uploadedImage = useSteilarStore((state) => state.uploadedImage);
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeId, setActiveId] = useState("");
  const [draft, setDraft] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [composerFocused, setComposerFocused] = useState(false);

  const activeThread = threads.find((thread) => thread.id === activeId) || threads[0];
  const canSend = draft.trim().length > 0 && !isThinking;

  useEffect(() => {
    const saved = window.localStorage.getItem("steilar_chat_threads");
    if (saved) {
      const parsed = JSON.parse(saved) as ChatThread[];
      setThreads(parsed);
      setActiveId(parsed[0]?.id || "");
      return;
    }

    const first = makeThread();
    setThreads([first]);
    setActiveId(first.id);
  }, []);

  useEffect(() => {
    if (!threads.length) return;
    window.localStorage.setItem("steilar_chat_threads", JSON.stringify(threads));
  }, [threads]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [activeThread?.messages.length, isThinking]);

  function updateThread(threadId: string, updater: (thread: ChatThread) => ChatThread) {
    setThreads((current) => current.map((thread) => (thread.id === threadId ? updater(thread) : thread)));
  }

  function newChat() {
    const thread = makeThread();
    setThreads((current) => [thread, ...current]);
    setActiveId(thread.id);
    setDraft("");
  }

  async function submitPrompt() {
    const content = draft.trim();
    if (!content || !activeThread) return;

    const userMessage: ChatMessage = { id: makeId("msg"), role: "user", content };
    const nextTitle = activeThread.messages.length <= 1 ? content.slice(0, 34) : activeThread.title;

    updateThread(activeThread.id, (thread) => ({
      ...thread,
      title: nextTitle || "Design chat",
      messages: [...thread.messages, userMessage],
      updatedAt: new Date().toISOString()
    }));
    setDraft("");
    setIsThinking(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hasReference: Boolean(uploadedImage),
          messages: [...activeThread.messages, userMessage].map((message) => ({
            role: message.role,
            content: message.content
          }))
        })
      });
      const data = (await response.json()) as { message?: string };
      const assistantMessage: ChatMessage = {
        id: makeId("msg"),
        role: "assistant",
        content: data.message || "Send a clear face/reference image and I will prepare the design review timeline."
      };

      updateThread(activeThread.id, (thread) => ({
        ...thread,
        messages: [...thread.messages, assistantMessage],
        updatedAt: new Date().toISOString()
      }));
    } catch {
      updateThread(activeThread.id, (thread) => ({
        ...thread,
        messages: [
          ...thread.messages,
          {
            id: makeId("msg"),
            role: "assistant",
            content: "Send a clear face/reference image and I will prepare the design review timeline."
          }
        ],
        updatedAt: new Date().toISOString()
      }));
    } finally {
      setIsThinking(false);
    }
  }

  return (
    <AppShell showNav={false} tone="dark">
      <main className="relative flex min-h-dvh overflow-hidden bg-black text-white">
        <div className="chat-gradient-glow pointer-events-none absolute -bottom-28 left-[18%] h-72 w-[34rem] opacity-75" />
        <div className="subtle-dot-pattern pointer-events-none absolute inset-x-0 bottom-0 h-[52%] opacity-28" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.96),rgba(0,0,0,0.88)_52%,rgba(0,0,0,0.72))]" />

        <aside className="safe-top safe-bottom relative z-20 flex w-[4.25rem] shrink-0 flex-col items-center border-r border-white/8 bg-black/58 px-2 backdrop-blur-2xl">
          <img src="/Logo/logo only.png" alt="Steilar" className="mt-1 h-8 w-8 object-contain" />
          <button className="mt-7 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-[0_10px_24px_rgba(0,0,0,0.25)]" onClick={newChat} aria-label="New chat">
            <Plus className="h-4 w-4" />
          </button>
          <div className="mt-5 flex w-full flex-1 flex-col gap-2 overflow-hidden">
            {threads.slice(0, 7).map((thread) => (
              <button
                key={thread.id}
                className={cn(
                  "mx-auto h-2.5 w-2.5 rounded-full bg-white/18 transition-all duration-500",
                  thread.id === activeId && "h-8 w-1.5 rounded-full bg-white/80"
                )}
                onClick={() => setActiveId(thread.id)}
                aria-label={thread.title}
              />
            ))}
          </div>
        </aside>

        <section className="safe-x safe-top relative z-10 flex min-w-0 flex-1 flex-col pb-0">
          <header className="flex items-center justify-end gap-2">
            <Link href="/stylist" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/8 bg-white/8 text-white/72 backdrop-blur-xl" aria-label="Stylist">
              <Sparkles className="h-4 w-4" />
            </Link>
            <Link href="/profile" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/8 bg-white/8 text-white/72 backdrop-blur-xl" aria-label="Profile">
              <UserRound className="h-4 w-4" />
            </Link>
          </header>

          <div className="mb-8 mt-8">
            <p className="text-[12px] font-medium text-white/42">Steilar</p>
            <h1 className="font-title mt-2 text-left text-[2.05rem] font-normal leading-tight text-white">Design chat</h1>
          </div>

          <div className="hide-scrollbar min-h-0 flex-1 overflow-y-auto pb-5">
            <div className="space-y-4">
              {activeThread?.messages.map((message) => (
                <m.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.34, ease: [0.2, 0.8, 0.2, 1] }}
                  className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[18.5rem] rounded-[1.35rem] px-4 py-3 text-[13px] leading-5 shadow-[0_10px_28px_rgba(0,0,0,0.18)]",
                      message.role === "user"
                        ? "rounded-br-md bg-white text-black"
                        : "rounded-tl-md border border-white/10 bg-white/10 text-white/76"
                    )}
                  >
                    {message.content}
                  </div>
                </m.div>
              ))}

              {uploadedImage && (
                <div className="ml-auto w-32 overflow-hidden rounded-[1.1rem] border border-white/10 bg-white/8">
                  <img src={uploadedImage} alt="Reference" className="h-40 w-full object-cover" />
                </div>
              )}

              {isThinking && (
                <m.div
                  initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.28 }}
                  className="flex justify-start"
                >
                  <div className="rounded-[1.25rem] rounded-tl-md border border-white/10 bg-white/10 px-4 py-3 text-[13px] text-white/62">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </m.div>
              )}
              <div ref={endRef} />
            </div>
          </div>

          <div className="safe-bottom pb-5">
            <m.div
              animate={{
                y: composerFocused ? -6 : 0,
                scale: composerFocused ? 1.015 : 1,
                filter: composerFocused ? "blur(0px)" : "blur(0px)"
              }}
              transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
              className="rounded-[1.45rem] border border-white/12 bg-[#0d0d0f]/92 p-2 shadow-[0_18px_60px_rgba(0,0,0,0.42)] backdrop-blur-2xl"
            >
              <Textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onFocus={() => setComposerFocused(true)}
                onBlur={() => setComposerFocused(false)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    submitPrompt();
                  }
                }}
                disabled={isThinking}
                placeholder="Message Steilar"
                className="min-h-16 rounded-[1.15rem] border-0 bg-transparent px-3 py-3 text-[13px] leading-6 text-white shadow-none placeholder:text-white/35 focus:bg-transparent focus:ring-0 disabled:bg-transparent disabled:text-white/70 disabled:opacity-100"
              />
              <div className="flex items-center justify-between px-1 pb-1">
                <div className="flex items-center gap-1.5">
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) setUploadedImage(URL.createObjectURL(file));
                    }}
                  />
                  <button className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/8" onClick={newChat} aria-label="New chat">
                    <Plus className="h-4 w-4 text-white/70" />
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/8" onClick={() => inputRef.current?.click()} aria-label="Upload image">
                    <Image className="h-4 w-4 text-white/70" />
                  </button>
                </div>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black disabled:bg-white/15 disabled:text-white/30"
                  disabled={!canSend}
                  onClick={submitPrompt}
                  aria-label="Send"
                >
                  {isThinking ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUp className="h-4 w-4" />}
                </button>
              </div>
            </m.div>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
