"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
  cta?: "contact"; // when set, render Contact Us CTA
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m0",
      role: "assistant",
      text: "Hi! I\'m your AI assistant. Ask me anything about DemandTech.",
    },
  ]);

  // Track user turns and if we've already offered the Contact CTA
  const [userTurns, setUserTurns] = useState(0);
  const [ctaOffered, setCtaOffered] = useState(false);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const pulseRef = useRef<HTMLDivElement | null>(null);

  // Keyword heuristic for offering Contact Us CTA
  const shouldOfferContact = (text: string) => {
    const t = text.toLowerCase();
    return (
      /contact|talk|speak|call|demo|meet|meeting|sales|pricing|quote|quotation|reach/i.test(t) ||
      t.includes("reach out") ||
      t.includes("book a call") ||
      t.includes("schedule")
    );
  };

  useEffect(() => {
    // Floating button subtle bob + glow
    if (pulseRef.current) {
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(pulseRef.current, { y: -6, duration: 1.8, ease: "sine.inOut" });
      gsap.to(pulseRef.current, {
        boxShadow: "0 0 24px rgba(0, 12, 248, 0.35)",
        repeat: -1,
        yoyo: true,
        duration: 1.6,
        ease: "sine.inOut",
      });
    }
  }, []);

  useEffect(() => {
    if (open && panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { y: 40, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" }
      );
    }
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    setUserTurns((n) => n + 1);

    // Fake response for now. Replace with API call if needed.
    await new Promise((r) => setTimeout(r, 700));
    const assistantMsg: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      text:
        "That\'s interesting! I can connect you with the right DemandTech resources. What would you like to explore—lead gen, brand, or sales intent?",
    };
    setMessages((m) => [...m, assistantMsg]);
    setLoading(false);

    // Decide whether to append a final Contact Us CTA message
    try {
      const shouldOffer = shouldOfferContact(text) || userTurns + 1 >= 3; // after 3 user turns or keyword
      if (shouldOffer && !ctaOffered) {
        const ctaMsg: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          text:
            "If you\'d like tailored help from our team, you can contact us directly.",
          cta: "contact",
        };
        // small delay for nicer pacing
        await new Promise((r) => setTimeout(r, 500));
        setMessages((m) => [...m, ctaMsg]);
        setCtaOffered(true);
      }
    } catch (e) {
      // no-op; keep chat resilient
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") send();
  };

  return (
    <>
      {/* Floating trigger button */}
      <div
        ref={pulseRef}
        className="fixed z-[60] bottom-6 right-6 md:bottom-8 md:right-8"
      >
        <button
          aria-label="Open AI Chatbot"
          onClick={() => setOpen((v) => !v)}
          className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#000cf8] text-white shadow-xl focus:outline-none focus:ring-4 focus:ring-[#000cf8]/30"
        >
          {/* Chat icon */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-300 group-hover:scale-110"
          >
            <path
              d="M4 12C4 8.686 6.686 6 10 6h4c3.314 0 6 2.686 6 6s-2.686 6-6 6h-1.2c-.42 0-.79.26-.94.65l-.47 1.25a1 1 0 01-1.88 0l-.47-1.25A1 1 0 0 0 8.8 18H8c-2.21 0-4-1.79-4-4Z"
              fill="currentColor"
              opacity=".98"
            />
          </svg>
          {/* Ping */}
          <span className="absolute -z-10 inline-flex h-full w-full rounded-full bg-[#000cf8]/40 blur-lg animate-pulse" />
        </button>
      </div>

      {/* Chat panel */}
      {open && (
        <div
          ref={panelRef}
          className="fixed z-[70] bottom-24 right-4 md:right-8 w-[92vw] max-w-md bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 ring-1 ring-white/10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-white/10 backdrop-blur-2xl border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00d27a] animate-pulse" />
              <p className="text-sm font-medium text-black">AI Assistant</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-black/60 hover:text-black transition-colors"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="max-h-[50vh] overflow-y-auto p-4 space-y-3" id="chat-scroll">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`px-3 py-2 rounded-xl text-sm leading-relaxed shadow ${
                    m.role === "user"
                      ? "bg-[#000cf8]/70 text-white rounded-br-none backdrop-blur-md"
                      : "bg-white/15 text-black border border-white/20 rounded-bl-none backdrop-blur-md"
                  }`}
                >
                  <div>{m.text}</div>
                  {m.role === "assistant" && m.cta === "contact" && (
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#000cf8]/85 backdrop-blur-md text-white hover:brightness-110 text-xs"
                      >
                        Contact Us
                      </Link>
                      <a
                        href="mailto:hello@demandtech.com"
                        className="inline-flex items-center px-3 py-1.5 rounded-lg border border-white/20 text-xs text-black bg-white/10 backdrop-blur-md hover:bg-white/20"
                      >
                        Email
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-1 text-xs text-black/60">
                <span className="w-2 h-2 bg-black/30 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-black/30 rounded-full animate-bounce [animation-delay:120ms]" />
                <span className="w-2 h-2 bg-black/30 rounded-full animate-bounce [animation-delay:240ms]" />
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 p-3 border-t border-white/10 bg-white/10 backdrop-blur-2xl">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask about services, pricing, or strategy…"
              className="flex-1 px-3 py-2 text-sm rounded-lg border border-white/20 bg-white/10 backdrop-blur-md placeholder-black/60 text-black focus:outline-none focus:ring-2 focus:ring-[#000cf8]/30"
            />
            <button
              onClick={send}
              disabled={loading}
              className="px-3 py-2 text-sm rounded-lg bg-[#000cf8]/85 backdrop-blur-md text-white hover:brightness-110 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
