import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, Terminal, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TerminalLine {
  id: number;
  type: 'input' | 'output' | 'error' | 'success' | 'ascii';
  text: string;
}

let lineId = 100;

const ASCII_BANNER = [
  ' ███████╗██╗   ██╗',
  ' ██╔════╝██║   ██║',
  ' █████╗  ██║   ██║',
  ' ██╔══╝  ██║   ██║',
  ' ███████╗╚██████╔╝',
  ' ╚══════╝ ╚═════╝ ',
  ' Enock Uwumukiza — Full-Stack & ML Engineer',
  ' Kigali, Rwanda 🇷🇼 → building for the world',
];

const COMMANDS: Record<string, (args?: string) => { lines: { type: TerminalLine['type']; text: string }[]; scroll?: string }> = {
  help: () => ({
    lines: [
      { type: 'output', text: '' },
      { type: 'success', text: 'AVAILABLE COMMANDS' },
      { type: 'output', text: '──────────────────────────────────────' },
      { type: 'output', text: '  whoami        — ASCII banner + bio' },
      { type: 'output', text: '  skills        — Full tech stack by category' },
      { type: 'output', text: '  projects      — All projects with GitHub links' },
      { type: 'output', text: '  contact        — Email & social channels' },
      { type: 'output', text: '  blog           — Recent writing topics' },
      { type: 'output', text: '  open blog      — Navigate to /blog' },
      { type: 'output', text: '  sudo hire enock — Make an important decision 😄' },
      { type: 'output', text: '  clear           — Clear terminal' },
      { type: 'output', text: '  exit / q        — Close terminal' },
      { type: 'output', text: '' },
      { type: 'output', text: '  ↑ / ↓          — Command history' },
      { type: 'output', text: '' },
    ],
  }),

  whoami: () => ({
    lines: [
      { type: 'output', text: '' },
      ...ASCII_BANNER.map(t => ({ type: 'ascii' as const, text: t })),
      { type: 'output', text: '' },
      { type: 'output', text: '  I\'m a self-taught developer who went from studying' },
      { type: 'output', text: '  biomedical sciences at INES Ruhengeri to building' },
      { type: 'output', text: '  full-stack products, ML systems, and React Native apps.' },
      { type: 'output', text: '' },
      { type: 'output', text: '  Currently: HandyRwanda (Sprint 10) + INZIRA EDRPS clinical AI' },
      { type: 'output', text: '  Stack:     TypeScript · FastAPI · Expo · PostgreSQL · sklearn' },
      { type: 'output', text: '  Available: Remote, Contract, Full-time (CAT UTC+2)' },
      { type: 'output', text: '' },
    ],
  }),

  skills: () => ({
    lines: [
      { type: 'output', text: '' },
      { type: 'success', text: 'TECH STACK' },
      { type: 'output', text: '──────────────────────────────────────' },
      { type: 'output', text: '  Frontend   React · TypeScript · Next.js · Tailwind · Framer Motion' },
      { type: 'output', text: '  Backend    FastAPI · Node.js/Express · Socket.IO · Prisma' },
      { type: 'output', text: '  Mobile     React Native (Expo) · NativeWind · WebRTC' },
      { type: 'output', text: '  Database   PostgreSQL · MongoDB · Redis · MySQL' },
      { type: 'output', text: '  ML/AI      scikit-learn · XGBoost · TensorFlow · SHAP · Pandas' },
      { type: 'output', text: '  DevOps     Docker · GitHub Actions · Nginx · Vercel · Railway' },
      { type: 'output', text: '  Learning   Rust (NAPI-RS) · WebGPU · Turborepo MFE' },
      { type: 'output', text: '' },
    ],
    scroll: '#skills',
  }),

  projects: () => ({
    lines: [
      { type: 'output', text: '' },
      { type: 'success', text: 'PROJECTS' },
      { type: 'output', text: '──────────────────────────────────────' },
      { type: 'output', text: '  [★] HandyRwanda     — Rwanda service marketplace (MTN MoMo, Socket.IO, Expo)' },
      { type: 'output', text: '       github.com/Enochrwa/HandyRwanda' },
      { type: 'output', text: '' },
      { type: 'output', text: '  [★] INZIRA EDRPS    — Clinical AI for 5 disease modules (XGBoost, SHAP)' },
      { type: 'output', text: '       github.com/Enochrwa/inzira-edrps' },
      { type: 'output', text: '' },
      { type: 'output', text: '  [ ] AI Wardrobe     — Outfit detection + recommendation (TensorFlow)' },
      { type: 'output', text: '       github.com/Enochrwa/myward' },
      { type: 'output', text: '' },
      { type: 'output', text: '  [ ] Resume Builder  — Professional résumés with PDF export (live on Vercel)' },
      { type: 'output', text: '       resumeforge-five.vercel.app' },
      { type: 'output', text: '' },
      { type: 'output', text: '  [ ] eChat           — Real-time team chat with WebRTC video/audio' },
      { type: 'output', text: '       github.com/enockuwumukiza/e-chat' },
      { type: 'output', text: '' },
    ],
    scroll: '#projects',
  }),

  contact: () => ({
    lines: [
      { type: 'output', text: '' },
      { type: 'success', text: 'CONTACT' },
      { type: 'output', text: '──────────────────────────────────────' },
      { type: 'output', text: '  Email     wwwenockuwumukiza@gmail.com' },
      { type: 'output', text: '  LinkedIn  linkedin.com/in/enock-uwumukiza-3086082b4' },
      { type: 'output', text: '  GitHub    github.com/enockuwumukiza' },
      { type: 'output', text: '  Twitter   @enochrw7' },
      { type: 'output', text: '' },
      { type: 'output', text: '  Timezone  CAT (UTC+2) · Kigali, Rwanda' },
      { type: 'output', text: '  Status    ✅ Open to opportunities' },
      { type: 'output', text: '  Reply in  < 24 hours' },
      { type: 'output', text: '' },
    ],
    scroll: '#contact',
  }),

  blog: () => ({
    lines: [
      { type: 'output', text: '' },
      { type: 'success', text: 'WRITING — live at /blog' },
      { type: 'output', text: '──────────────────────────────────────' },
      { type: 'output', text: '  → "Why I Chose FastAPI Over Node.js for HandyRwanda\'s Backend"' },
      { type: 'output', text: '     /blog/fastapi-vs-nodejs  ·  7 min  ·  Apr 2026' },
      { type: 'output', text: '' },
      { type: 'output', text: '  → "End-to-End Voice Messaging in React Native: Sprint 7 Debrief"' },
      { type: 'output', text: '     /blog/voice-messaging-react-native  ·  10 min  ·  Feb 2026' },
      { type: 'output', text: '' },
      { type: 'output', text: '  → "Building a Service Marketplace for Rwanda: What I Learned"' },
      { type: 'output', text: '     /blog/building-handyrwanda  ·  8 min  ·  Dec 2025' },
      { type: 'output', text: '' },
    ],
  }),
};

function fireConfetti() {
  // Simple CSS confetti burst using DOM
  const colours = ['#F5A623', '#C4501A', '#F5F2EE', '#22c55e', '#3b82f6'];
  for (let i = 0; i < 80; i++) {
    const el = document.createElement('div');
    el.style.cssText = `
      position:fixed; pointer-events:none; z-index:9999;
      width:8px; height:8px; border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
      background:${colours[Math.floor(Math.random() * colours.length)]};
      left:${Math.random() * 100}vw; top:-10px;
      animation: confettiFall ${0.8 + Math.random() * 1.4}s ${Math.random() * 0.6}s ease-in forwards;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2500);
  }
  // Inject keyframes once
  if (!document.getElementById('confetti-style')) {
    const style = document.createElement('style');
    style.id = 'confetti-style';
    style.textContent = `@keyframes confettiFall { to { transform: translateY(110vh) rotate(${Math.random() > 0.5 ? '' : '-'}720deg); opacity:0; } }`;
    document.head.appendChild(style);
  }
}

const TerminalEmulator = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: lineId++, type: 'output', text: '╔══════════════════════════════════════╗' },
    { id: lineId++, type: 'output', text: '║  DevTerminal v3.0 — Enock Uwumukiza  ║' },
    { id: lineId++, type: 'output', text: '╚══════════════════════════════════════╝' },
    { id: lineId++, type: 'output', text: '' },
    { id: lineId++, type: 'output', text: 'Type "help" for available commands.' },
    { id: lineId++, type: 'output', text: 'Tip: try "sudo hire enock" 😉' },
    { id: lineId++, type: 'output', text: '' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [minimized, setMinimized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, 30);
  }, []);

  const addLines = useCallback((newLines: { type: TerminalLine['type']; text: string }[]) => {
    setLines(prev => [...prev, ...newLines.map(l => ({ ...l, id: lineId++ }))]);
    scrollToBottom();
  }, [scrollToBottom]);

  const handleCommand = useCallback((raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    // Add input echo
    addLines([{ type: 'input', text: `❯ ${trimmed}` }]);

    // History
    setHistory(h => [trimmed, ...h].slice(0, 50));
    setHistIdx(-1);

    const lower = trimmed.toLowerCase();

    if (lower === 'clear') {
      setLines([]);
      return;
    }
    if (lower === 'exit' || lower === 'q') {
      onClose();
      return;
    }
    if (lower === 'sudo hire enock') {
      fireConfetti();
      addLines([
        { type: 'output', text: '' },
        { type: 'success', text: '🎉 EXCELLENT DECISION! 🎉' },
        { type: 'output', text: '  Initiating onboarding sequence...' },
        { type: 'output', text: '' },
        { type: 'output', text: '  ✅ TypeScript proficiency: verified' },
        { type: 'output', text: '  ✅ FastAPI backend: deployed' },
        { type: 'output', text: '  ✅ Rwanda time zone: UTC+2, compatible' },
        { type: 'output', text: '  ✅ Coffee dependency: Rwandan beans ✓' },
        { type: 'output', text: '' },
        { type: 'success', text: '  → Reach out at: wwwenockuwumukiza@gmail.com' },
        { type: 'output', text: '' },
      ]);
      return;
    }

    // Scroll hint commands
    const scrollMap: Record<string, string> = { about: '#about', projects: '#projects', skills: '#skills', contact: '#contact', experience: '#experience' };
    const goTo = scrollMap[lower];
    if (goTo && !COMMANDS[lower]) {
      addLines([{ type: 'output', text: `Navigating to ${lower}…` }]);
      setTimeout(() => document.querySelector(goTo)?.scrollIntoView({ behavior: 'smooth' }), 300);
      return;
    }

    // Navigate to blog
    if (lower === 'open blog' || lower === 'goto blog' || lower === 'go blog' || lower === 'navigate blog') {
      addLines([{ type: 'output', text: 'Opening blog…' }]);
      setTimeout(() => { onClose(); navigate('/blog'); }, 400);
      return;
    }

    const cmdFn = COMMANDS[lower];
    if (cmdFn) {
      const result = cmdFn();
      addLines(result.lines);
      if (result.scroll) {
        setTimeout(() => document.querySelector(result.scroll!)?.scrollIntoView({ behavior: 'smooth' }), 500);
      }
      return;
    }

    // Unknown command
    addLines([
      { type: 'error', text: `Command not found: ${trimmed}` },
      { type: 'output', text: 'Type "help" to see available commands.' },
      { type: 'output', text: '' },
    ]);
  }, [addLines, onClose]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIdx = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(newIdx);
      setInput(history[newIdx] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIdx = Math.max(histIdx - 1, -1);
      setHistIdx(newIdx);
      setInput(newIdx === -1 ? '' : history[newIdx] ?? '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const partial = input.toLowerCase();
      const match = Object.keys(COMMANDS).find(k => k.startsWith(partial));
      if (match) setInput(match);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  // Focus input on mount
  useEffect(() => { inputRef.current?.focus(); }, []);

  const lineClass: Record<TerminalLine['type'], string> = {
    input:   'text-primary font-semibold',
    output:  'text-muted-foreground',
    error:   'text-red-400',
    success: 'text-green-400 font-semibold',
    ascii:   'text-primary/80 font-mono text-xs',
  };

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: minimized ? 0.4 : 1, opacity: 1, y: minimized ? 200 : 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="w-full max-w-2xl bg-card border border-border/60 rounded-xl shadow-2xl overflow-hidden select-none"
        style={{ cursor: 'grab' }}
        onPointerDown={() => { document.body.style.cursor = 'grabbing'; }}
        onPointerUp={() => { document.body.style.cursor = ''; }}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-muted/40 border-b border-border/50 drag-handle">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-primary" />
            <span className="text-sm font-mono font-medium">enock@portfolio:~</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="p-1 rounded hover:bg-muted/60 text-muted-foreground hover:text-yellow-400 transition-colors"
              onClick={() => setMinimized(m => !m)}
              aria-label="Minimize"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <button
              className="p-1 rounded hover:bg-muted/60 text-muted-foreground hover:text-red-400 transition-colors"
              onClick={onClose}
              aria-label="Close terminal"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Terminal body */}
        {!minimized && (
          <>
            <div
              ref={scrollRef}
              className="h-80 overflow-y-auto p-4 font-mono text-xs leading-6 space-y-0.5"
              style={{ scrollbarWidth: 'thin' }}
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map(line => (
                <div key={line.id} className={lineClass[line.type]}>
                  {line.text || '\u00A0'}
                </div>
              ))}
            </div>
            {/* Input row */}
            <div className="flex items-center gap-2 px-4 py-3 border-t border-border/50 bg-muted/20">
              <span className="text-primary font-mono text-xs font-bold flex-shrink-0">❯</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                className="flex-1 bg-transparent text-xs font-mono text-foreground outline-none placeholder:text-muted-foreground/40 caret-primary"
                placeholder="type a command…"
                autoComplete="off"
                spellCheck={false}
                aria-label="Terminal input"
              />
              <span className="w-2 h-4 bg-primary animate-pulse rounded-sm flex-shrink-0" aria-hidden="true" />
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default TerminalEmulator;
