import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Minus, Square, Terminal } from "lucide-react";

interface TerminalLine {
  id: number;
  type: 'input' | 'output' | 'error';
  text: string;
  timestamp?: string;
}

const TerminalEmulator = ({ onClose }: { onClose: () => void }) => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: 1, type: 'output', text: 'Welcome to DevTerminal v2.0.1', timestamp: new Date().toLocaleTimeString() },
    { id: 2, type: 'output', text: 'Interactive developer portfolio terminal' },
    { id: 3, type: 'output', text: 'Type "help" for available commands' },
    { id: 4, type: 'output', text: '' }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: () => [
      'Available commands:',
      '  about         - Learn about me',
      '  skills        - View my technical skills',
      '  projects      - List recent projects',
      '  contact       - Get contact information',
      '  experience    - View work experience',
      '  easter        - Find hidden features',
      '  clear         - Clear terminal',
      '  whoami        - Current user info',
      '  date          - Current date and time',
      '  echo <text>   - Echo text back',
      '  exit          - Close terminal'
    ],
    about: () => [
      'ENOCK UWUMUKIZA',
      '================',
      'Full-Stack Developer & ML Engineer',
      'Passionate about creating intelligent web experiences',
      'Specializing in React, Node.js, Python, and Machine Learning',
      'Building the future, one line of code at a time 🚀',
      '',
      'Navigating to About section...'
    ],
    skills: () => [
      'Technical Skills:',
      '================',
      'Frontend: React, TypeScript, Next.js, Vue.js',
      'Backend:  Node.js, Python, Express, FastAPI',
      'Database: PostgreSQL, MongoDB, Redis',
      'ML/AI:    TensorFlow, PyTorch, scikit-learn',
      'Cloud:    AWS, Docker, Kubernetes',
      'Other:    Git, Linux, CI/CD, WebGL',
      '',
      'Navigating to Skills section...'
    ],
    projects: () => [
      'Recent Projects:',
      '===============',
      '1. AI Analytics Dashboard - ML-powered insights platform',
      '2. Smart E-Commerce - Intelligent recommendation engine',
      '3. Real-time Collaboration Tool - Live editing with AI',
      '4. Portfolio Terminal - Interactive command interface',
      '',
      'Use "project <number>" for details',
      '',
      'Navigating to Projects section...'
    ],
    contact: () => [
      'Contact Information:',
      '==================',
      'Email:    hello@portfolio.dev',
      'LinkedIn: /in/yourprofile',
      'GitHub:   @yourusername',
      'Twitter:  @yourhandle',
      '',
      'Response time: Usually within 24 hours ⚡',
      '',
      'Navigating to Contact section...'
    ],
    experience: () => [
      'Work Experience:',
      '===============',
      '2022-Present: Senior Full-Stack Developer @ TechCorp',
      '2020-2022:    Full-Stack Developer @ StartupXYZ',
      '2019-2020:    Frontend Developer @ DesignStudio',
      '2019:         Software Engineering Intern @ BigTech',
      '',
      'Education: MS Computer Science, Stanford University',
      '',
      'Navigating to Experience section...'
    ],
    easter: () => [
      'Easter Eggs Found! 🥚',
      '===================',
      '• Try typing "matrix" for a surprise',
      '• Use "joke" for developer humor',
      '• Type "coffee" to fuel your coding',
      '• Enter "wisdom" for programming quotes',
      '• Use "ascii" for ASCII art'
    ],
    whoami: () => [
      'guest@portfolio-terminal',
      'Visitor exploring the developer portfolio',
      'Access level: Public',
      'Session started: ' + new Date().toLocaleString()
    ],
    date: () => [new Date().toString()],
    matrix: () => [
      '01001000 01100101 01101100 01101100 01101111',
      '01010111 01101111 01110010 01101100 01100100',
      '',
      'The Matrix has you... 🕴️'
    ],
    joke: () => [
      'Why do programmers prefer dark mode?',
      '',
      'Because light attracts bugs! 🐛😄'
    ],
    coffee: () => [
      '      (',
      '       )     (',
      '    ___...(-------)-...___',
      '.-""       )    (          """-.',
      '\'--.___..-(     )-.___..--\'/',
      '          \'\_____/\'',
      '',
      'Coffee dispensed! ☕ Keep coding!'
    ],
    wisdom: () => [
      '"Talk is cheap. Show me the code." - Linus Torvalds',
      '',
      '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
      '',
      '"The best error message is the one that never shows up." - Thomas Fuchs'
    ],
    ascii: () => [
      '    ____                 __                  ',
      '   / __ \\___  _   _____  / /___  ____  ___  _____',
      '  / / / / _ \\| | / / _ \\/ / __ \\/ __ \\/ _ \\/ ___/',
      ' / /_/ /  __/| |/ /  __/ / /_/ / /_/ /  __/ /',
      '/_____/\\___/ |___/\\___/_/\\____/ .___/\\___/_/',
      '                            /_/',
      '',
      'Welcome to the developer zone! 👨‍💻'
    ]
  };

  const executeCommand = (cmd: string) => {
    const [command, ...args] = cmd.toLowerCase().trim().split(' ');
    const timestamp = new Date().toLocaleTimeString();

    // Add the input line
    const inputLine: TerminalLine = {
      id: Date.now(),
      type: 'input',
      text: `guest@portfolio:~$ ${cmd}`,
      timestamp
    };

    if (command === 'clear') {
      setLines([inputLine]);
      return;
    }

    if (command === 'exit') {
      onClose();
      return;
    }

    if (command === 'echo') {
      const outputLines = [
        inputLine,
        { id: Date.now() + 1, type: 'output' as const, text: args.join(' ') },
        { id: Date.now() + 2, type: 'output' as const, text: '' }
      ];
      setLines(prev => [...prev, ...outputLines]);
      return;
    }

    const commandFunction = commands[command as keyof typeof commands];
    if (commandFunction) {
      const output = commandFunction();
      const outputLines = [
        inputLine,
        ...output.map((line, index) => ({
          id: Date.now() + index + 1,
          type: 'output' as const,
          text: line
        })),
        { id: Date.now() + output.length + 1, type: 'output' as const, text: '' }
      ];
      setLines(prev => [...prev, ...outputLines]);

      // Navigation handling for section commands
      const navigationCommands = ['about', 'skills', 'projects', 'experience', 'contact'];
      if (navigationCommands.includes(command)) {
        setTimeout(() => {
          const sectionId = command === 'about' ? 'about' : command;
          const section = document.getElementById(sectionId);
          if (section) {
            onClose(); // Close terminal first
            setTimeout(() => {
              section.scrollIntoView({ behavior: 'smooth' });
            }, 300);
          }
        }, 2500); // Wait for message to be read (2.5 seconds)
      }
    } else {
      const errorLines = [
        inputLine,
        { id: Date.now() + 1, type: 'error' as const, text: `Command not found: ${command}` },
        { id: Date.now() + 2, type: 'output' as const, text: 'Type "help" for available commands' },
        { id: Date.now() + 3, type: 'output' as const, text: '' }
      ];
      setLines(prev => [...prev, ...errorLines]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      setIsTyping(true);
      setTimeout(() => {
        executeCommand(currentInput);
        setCurrentInput('');
        setIsTyping(false);
      }, 200);
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-4 z-50 flex items-center justify-center"
    >
      <Card className="w-full max-w-4xl h-full max-h-[80vh] bg-black border-primary/30 shadow-glow">
        <CardHeader className="flex flex-row items-center justify-between p-3 bg-muted/10 border-b border-border/30">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-primary" />
            <span className="text-sm font-mono">terminal@portfolio</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-yellow-500/20">
              <Minus className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-green-500/20">
              <Square className="h-3 w-3" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0 hover:bg-red-500/20"
              onClick={onClose}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0 h-full">
          <div 
            ref={terminalRef}
            className="h-full font-mono text-sm p-4 overflow-y-auto bg-black text-green-400"
            style={{ maxHeight: 'calc(80vh - 60px)' }}
          >
            <AnimatePresence>
              {lines.map((line) => (
                <motion.div
                  key={line.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`mb-1 ${
                    line.type === 'input' 
                      ? 'text-white' 
                      : line.type === 'error' 
                      ? 'text-red-400' 
                      : 'text-green-400'
                  }`}
                >
                  {line.text}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Current input line */}
            <form onSubmit={handleSubmit} className="flex items-center text-white">
              <span className="text-primary mr-1">guest@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                className="flex-1 bg-transparent outline-none border-none text-white font-mono"
                disabled={isTyping}
              />
              <span className="animate-pulse">_</span>
            </form>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TerminalEmulator;