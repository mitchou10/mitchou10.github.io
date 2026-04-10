import { useRef, useState } from 'react';
import OpenAI from 'openai';
import { Send, KeyRound, Eye, EyeOff, LogOut, Loader2, ChevronDown, Search } from 'lucide-react';

import allocation from '@/data/current-allocation.json';
import skills from '@/data/experience-skills.json';
import experiences from '@/data/experiences.json';

/* ─── System prompt built from portfolio data ────────────── */

const SYSTEM_PROMPT = `
You are an assistant embedded in mitchou10's portfolio — a Senior Data Scientist.
Answer in the same language as the user (French or English), concisely and professionally.
Base your answers strictly on the profile data below.

## Experience
${experiences.map((e) => `- **${e.title}** (${e.startDate.slice(0, 7)} → ${e.endDate ? e.endDate.slice(0, 7) : 'present'}) : ${e.description} | Tools: ${e.tools?.join(', ')}`).join('\n')}

## Current allocations
${allocation.map((a) => `- ${a.label}: ${a.percent}%`).join('\n')}

## Stack & skills
${skills.map((s) => `- ${s.label}: ${s.usage}`).join('\n')}

Only answer questions about the profile, skills, projects or contact.
For anything else, politely decline.
`.trim();

const SUGGESTIONS = ['Tech stack?', 'Experiences?', 'Allocations?', 'How to contact?'];

/* ─── Local keyword fallback ─────────────────────────────── */

function buildAnswer(q) {
  const lower = q.toLowerCase();
  if (/stack|tool|skill|tech|language|framework/.test(lower)) {
    return {
      text: 'Here are some tools & skills from the profile:\n' + skills.map((s) => `• ${s.label}: ${s.usage}`).join('\n'),
      source: { href: '#experiences', label: 'View Experiences section' },
    };
  }
  if (/experience|work|job|career|role|position/.test(lower)) {
    return {
      text: experiences
        .map((e) => `${e.title} (${e.startDate.slice(0, 7)}${e.endDate ? ' → ' + e.endDate.slice(0, 7) : ' → present'})\n${e.description}`)
        .join('\n\n'),
      source: { href: '#experiences', label: 'View Experiences section' },
    };
  }
  if (/allocat|time|split|focus/.test(lower)) {
    return {
      text: 'Current time allocations:\n' + allocation.map((a) => `• ${a.label}: ${a.percent}%`).join('\n'),
      source: { href: '#about', label: 'View About section' },
    };
  }
  if (/contact|email|reach|hire|message/.test(lower)) {
    return {
      text: 'You can reach mitchou10 via the Contact section at the bottom of the page!',
      source: { href: '#contact', label: 'Go to Contact section' },
    };
  }
  return {
    text: "I'm running in local mode — I can answer about tech stack, experiences, allocations or contact info. Try one of the suggestions!",
    source: null,
  };
}

/* ─── API key gate ───────────────────────────────────────── */

function ApiKeyGate({ onSubmit }) {
  const [key, setKey] = useState('');
  const [baseURL, setBaseURL] = useState('');
  const [show, setShow] = useState(false);
  const [models, setModels] = useState(null);   // null = not fetched
  const [modelsLoading, setModelsLoading] = useState(false);
  const [modelsError, setModelsError] = useState('');
  const [modelSearch, setModelSearch] = useState('');
  const [selectedModel, setSelectedModel] = useState('');

  const isCredsValid = key.trim().length > 0 && (baseURL.trim() || key.trim().startsWith('sk-'));
  const isValid = isCredsValid && selectedModel;

  const fetchModels = async () => {
    setModelsLoading(true);
    setModelsError('');
    setModels(null);
    setSelectedModel('');
    try {
      const client = new OpenAI({
        apiKey: key.trim(),
        baseURL: baseURL.trim() || undefined,
        dangerouslyAllowBrowser: true,
      });
      const res = await client.models.list();
      const ids = res.data.map((m) => m.id).sort();
      setModels(ids);
      if (ids.length === 1) setSelectedModel(ids[0]);
    } catch (err) {
      setModelsError(err?.message?.includes('401') ? 'Invalid API key.' : `Failed to fetch models: ${err.message}`);
    } finally {
      setModelsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    onSubmit({ apiKey: key.trim(), baseURL: baseURL.trim() || undefined, model: selectedModel });
    setKey('');
  };

  const filteredModels = models?.filter((m) =>
    m.toLowerCase().includes(modelSearch.toLowerCase()),
  ) ?? [];

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 rounded-2xl border border-slate-700/70 bg-slate-950/50 px-8 py-10">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-900">
          <KeyRound className="h-5 w-5 text-cyan-400" />
        </span>
        <p className="text-sm font-semibold text-slate-200">API credentials required</p>
        <p className="text-xs text-slate-500 max-w-xs">
          Your key is never stored — it lives only in memory for this session.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-3">
        {/* API key */}
        <div className="relative">
          <input
            type={show ? 'text' : 'password'}
            value={key}
            onChange={(e) => { setKey(e.target.value); setModels(null); setSelectedModel(''); }}
            placeholder="sk-... (API key)"
            autoComplete="off"
            spellCheck={false}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 pr-10 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-cyan-500/60"
          />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            aria-label={show ? 'Hide' : 'Show'}
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {/* Base URL (optional) */}
        <input
          type="url"
          value={baseURL}
          onChange={(e) => { setBaseURL(e.target.value); setModels(null); setSelectedModel(''); }}
          placeholder="Base URL (optional — e.g. http://localhost:11434/v1)"
          autoComplete="off"
          spellCheck={false}
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-cyan-500/60"
        />

        {/* Fetch models button */}
        {isCredsValid && !models && (
          <button
            type="button"
            onClick={fetchModels}
            disabled={modelsLoading}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 py-2 text-sm text-slate-300 transition hover:border-cyan-500/50 hover:text-cyan-300 disabled:opacity-50"
          >
            {modelsLoading
              ? <><Loader2 className="h-4 w-4 animate-spin" /> Fetching models…</>
              : <><ChevronDown className="h-4 w-4" /> Browse available models</>}
          </button>
        )}

        {/* Error */}
        {modelsError && (
          <p className="text-xs text-red-400">{modelsError}</p>
        )}

        {/* Model picker */}
        {models && models.length > 0 && (
          <div className="flex flex-col gap-2">
            {models.length > 5 && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={modelSearch}
                  onChange={(e) => setModelSearch(e.target.value)}
                  placeholder="Search models…"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2 pl-8 pr-4 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-cyan-500/60"
                />
              </div>
            )}
            <div className="max-h-40 overflow-y-auto rounded-xl border border-slate-700 bg-slate-900 p-2">
              <div className="flex flex-wrap gap-1.5">
                {filteredModels.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setSelectedModel(m)}
                    className={`rounded-full border px-3 py-1 text-[11px] font-medium transition ${
                      selectedModel === m
                        ? 'border-cyan-500 bg-cyan-500/20 text-cyan-200'
                        : 'border-slate-700 text-slate-400 hover:border-cyan-500/40 hover:text-cyan-300'
                    }`}
                  >
                    {m}
                  </button>
                ))}
                {filteredModels.length === 0 && (
                  <p className="px-2 py-1 text-xs text-slate-500">No models match.</p>
                )}
              </div>
            </div>
            {selectedModel && (
              <p className="text-[11px] text-cyan-400">Selected: <span className="font-semibold">{selectedModel}</span></p>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={!isValid}
          className="rounded-xl bg-cyan-500 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-40"
        >
          Start conversation
        </button>
      </form>
      <button
        onClick={() => onSubmit({ local: true })}
        className="text-xs text-slate-500 hover:text-slate-300 transition-colors underline underline-offset-2"
      >
        Continue without API key (local search)
      </button>
    </div>
  );
}

/* ─── Chat ───────────────────────────────────────────────── */

export default function AskMeChat() {
  const [creds, setCreds] = useState(null);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! Ask me anything about mitchou10\'s profile — stack, experience, allocations…' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const abortRef = useRef(null);

  const scrollBottom = () =>
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);

  const send = async (text) => {
    const q = text.trim();
    if (!q || loading) return;
    setInput('');

    const nextMessages = [...messages, { role: 'user', content: q }];
    setMessages(nextMessages);
    setLoading(true);
    scrollBottom();

    // Placeholder assistant message
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    try {
      if (creds.local) {
        // Local keyword-based fallback
        const { text, source } = buildAnswer(q);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: text, source };
          return updated;
        });
      } else {
        const client = new OpenAI({ apiKey: creds.apiKey, baseURL: creds.baseURL, dangerouslyAllowBrowser: true });
        const stream = client.beta.chat.completions.stream({
          model: creds.model,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...nextMessages.map((m) => ({ role: m.role, content: m.content })),
          ],
        });
        abortRef.current = stream;

        for await (const chunk of stream) {
          const delta = chunk.choices[0]?.delta?.content ?? '';
          if (delta) {
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                role: 'assistant',
                content: updated[updated.length - 1].content + delta,
              };
              return updated;
            });
            scrollBottom();
          }
        }
      }
    } catch (err) {
      const msg = err?.message?.includes('401')
        ? 'Invalid or expired API key.'
        : err?.message?.includes('429')
          ? 'Quota exceeded for this key.'
          : 'An error occurred.';
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'assistant', content: `⚠️ ${msg}` };
        return updated;
      });
    } finally {
      setLoading(false);
      abortRef.current = null;
      scrollBottom();
    }
  };

  const reset = () => {
    abortRef.current?.abort?.();
    setCreds(null);
    setMessages([{ role: 'assistant', content: 'Hello! Ask me anything about mitchou10\'s profile — stack, experience, allocations…' }]);
    setInput('');
    setLoading(false);
  };

  if (!creds) return <ApiKeyGate onSubmit={setCreds} />;

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-700/70 bg-slate-950/50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
          </span>
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">Ask Me · {creds.local ? 'Local mode' : creds.model}</p>
        </div>
        <button
          onClick={reset}
          title="Clear credentials and reset"
          className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors"
        >
          <LogOut className="h-3.5 w-3.5" />
          {creds.local ? 'Reset' : 'Clear key'}
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ minHeight: 0 }}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === 'user'
                  ? 'bg-cyan-500/20 text-cyan-100 border border-cyan-500/30'
                  : 'bg-slate-800/80 text-slate-300 border border-slate-700/50'
              }`}
            >
              {creds?.local && m.role === 'assistant' ? (
                <div>
                  <p className="text-sm text-slate-300">Here is the source / response</p>
                  {m.source ? (
                    <div className="mt-2">
                      <button
                        type="button"
                        onClick={() => {
                          const href = m.source?.href || '#about';
                          try {
                            const id = href.startsWith('#') ? href.slice(1) : href;
                            const headerButton = document.querySelector(`#${id} button`);
                            if (headerButton) {
                              headerButton.click();
                              document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                              return;
                            }
                          } catch (e) {
                            // ignore and fallback to scroll
                          }
                          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }}
                        className="inline-flex items-center gap-2 rounded-md border border-slate-700 px-3 py-1 text-xs text-cyan-300 hover:bg-slate-800/40 transition"
                      >
                        Source
                        {m.source?.label ? <span className="text-[11px] text-slate-400">· {m.source.label}</span> : null}
                      </button>
                    </div>
                  ) : null}
                </div>
              ) : (
                <>
                  {m.content || (loading && i === messages.length - 1
                    ? <Loader2 className="h-4 w-4 animate-spin text-slate-500" />
                    : null)}

                  {m.role === 'assistant' && m.source ? (
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const href = m.source?.href || '#about';
                          try {
                            const id = href.startsWith('#') ? href.slice(1) : href;
                            const headerButton = document.querySelector(`#${id} button`);
                            if (headerButton) {
                              headerButton.click();
                              // ensure section is visible
                              document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                              return;
                            }
                          } catch (e) {
                            // ignore and fallback to scroll
                          }
                          document.querySelector(m.source?.href || '#about')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }}
                        className="inline-flex items-center gap-2 rounded-md border border-slate-700 px-3 py-1 text-xs text-cyan-300 hover:bg-slate-800/40 transition"
                      >
                        Source
                        {m.source?.label ? <span className="text-[11px] text-slate-400">· {m.source.label}</span> : null}
                      </button>
                    </div>
                  ) : null}
                </>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {(creds.local || messages.length <= 2) && (
        <div className="flex flex-wrap gap-1.5 px-4 pb-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="rounded-full border border-slate-700 bg-slate-900 px-3 py-0.5 text-[11px] text-slate-400 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => { e.preventDefault(); send(input); }}
        className="flex items-center gap-2 border-t border-slate-800 px-4 py-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question…"
          disabled={loading}
          className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-cyan-500/60 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-500 text-slate-950 transition hover:bg-cyan-400 disabled:opacity-40"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </button>
      </form>
    </div>
  );
}
