import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Download, Code, Zap, Sparkles, Cpu } from "lucide-react";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Typing animation effect
  const [typedText, setTypedText] = useState('');
  const roles = ['Full-Stack Developer', 'ML Enthusiast', 'Problem Solver', 'Code Architect'];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting && typedText.length < currentRole.length) {
        setTypedText(currentRole.substring(0, typedText.length + 1));
      } else if (isDeleting && typedText.length > 0) {
        setTypedText(currentRole.substring(0, typedText.length - 1));
      } else if (!isDeleting && typedText.length === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typedText.length === 0) {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentRoleIndex, roles]);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{
        background: `
          radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
          rgba(59, 130, 246, 0.15) 0%, 
          rgba(147, 51, 234, 0.1) 25%, 
          rgba(236, 72, 153, 0.05) 50%, 
          transparent 70%),
          linear-gradient(135deg, 
          rgba(0, 0, 0, 0.95) 0%, 
          rgba(15, 23, 42, 0.98) 50%, 
          rgba(0, 0, 0, 0.95) 100%)
        `
      }}
    >
      {/* Enhanced animated background grid */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-flow 20s linear infinite'
        }}
      />

      {/* Dynamic floating orbs */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-xl animate-pulse"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${20 + (i * 8)}%`,
              width: `${60 + Math.random() * 40}px`,
              height: `${60 + Math.random() * 40}px`,
              background: `radial-gradient(circle, ${
                ['rgba(59, 130, 246, 0.4)', 'rgba(147, 51, 234, 0.4)', 'rgba(236, 72, 153, 0.4)', 'rgba(34, 197, 94, 0.4)'][i % 4]
              } 0%, transparent 70%)`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
              transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          />
        ))}
      </div>

      {/* Floating code symbols */}
      <div className="absolute inset-0 pointer-events-none">
        {['{', '}', '<', '>', '/', '*', '+', '='].map((symbol, i) => (
          <div
            key={i}
            className="absolute text-primary/20 font-mono text-2xl animate-float"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 80}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            {symbol}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Enhanced name and title with holographic effect */}
          <div className="mb-8">
            <div 
              className={`transition-all duration-1000 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="text-xl md:text-2xl text-gray-400 mb-3 font-light tracking-widest">
                <span className="inline-block animate-pulse">◆</span> HELLO, I'M <span className="inline-block animate-pulse">◆</span>
              </h2>
              
              <h1 className="relative">
                <span className="text-4xl sm:text-7xl md:text-9xl font-bold mb-6 block leading-none">
                  <span 
                    className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x"
                    style={{
                      textShadow: '0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(147, 51, 234, 0.3), 0 0 90px rgba(236, 72, 153, 0.2)'
                    }}
                  >
                    Enock
                  </span>
                </span>
                <span className="text-3xl sm:text-6xl md:text-8xl font-bold block leading-none">
                  <span 
                    className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 bg-clip-text text-transparent animate-gradient-x-reverse"
                    style={{
                      textShadow: '0 0 30px rgba(236, 72, 153, 0.5), 0 0 60px rgba(147, 51, 234, 0.3), 0 0 90px rgba(59, 130, 246, 0.2)'
                    }}
                  >
                    UWUMUKIZA
                  </span>
                </span>
                
                {/* Holographic overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer" />
              </h1>

              {/* Dynamic typing role display */}
              <div className="text-2xl md:text-4xl font-semibold mb-8 h-16 flex items-center justify-center">
                <Code className="mr-3 h-8 w-8 text-blue-400 animate-pulse" />
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </span>
                <Zap className="ml-3 h-8 w-8 text-purple-500 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Enhanced subtitle with better animations */}
          <div
            className={`transition-all duration-1000 delay-300 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-4xl mx-auto">
              Crafting intelligent web experiences with cutting-edge technologies, specializing in{" "}
              <span className="text-blue-400 font-semibold relative">
                React
                <Sparkles className="inline w-4 h-4 ml-1 animate-pulse" />
              </span>,{" "}
              <span className="text-green-400 font-semibold relative">
                Node.js
                <Cpu className="inline w-4 h-4 ml-1 animate-spin" />
              </span>, and{" "}
              <span className="text-purple-400 font-semibold">Machine Learning</span>
            </p>
          </div>

          {/* Animated tech stack with interactive hover effects */}
          <div
            className={`transition-all duration-1000 delay-500 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { name: "React", color: "from-blue-400 to-blue-600" },
                { name: "TypeScript", color: "from-blue-500 to-blue-700" },
                { name: "Node.js", color: "from-green-400 to-green-600" },
                { name: "Python", color: "from-yellow-400 to-yellow-600" },
                { name: "PostgreSQL", color: "from-blue-600 to-indigo-700" },
                { name: "Docker", color: "from-cyan-400 to-cyan-600" }
              ].map((tech, index) => (
                <span
                  key={tech.name}
                  className={`
                    px-6 py-3 rounded-full text-sm font-medium cursor-pointer
                    bg-gradient-to-r ${tech.color} text-white
                    hover:scale-110 hover:rotate-3 transform transition-all duration-300
                    animate-pulse shadow-lg hover:shadow-xl
                  `}
                  style={{
                    animationDelay: `${index * 0.2}s`,
                    boxShadow: `0 0 20px rgba(59, 130, 246, 0.3)`
                  }}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          {/* Enhanced action buttons with more effects */}
          <div
            className={`transition-all duration-1000 delay-700 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              <button 
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="
                  relative overflow-hidden px-8 py-4 rounded-full font-semibold text-white
                  bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
                  hover:from-blue-400 hover:via-purple-400 hover:to-pink-400
                  transform hover:scale-105 transition-all duration-300
                  shadow-2xl hover:shadow-blue-500/25
                  group
                "
                style={{
                  boxShadow: '0 0 30px rgba(59, 130, 246, 0.4), 0 0 60px rgba(147, 51, 234, 0.2)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/5 to-white/20 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700" />
                <Mail className="inline mr-2 h-5 w-5" />
                Let's Collaborate
              </button>

              <button 
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/resume.pdf';
                  link.download = 'Enock_Uwumukiza_Resume.pdf';
                  link.click();
                }}
                className="
                  relative overflow-hidden px-8 py-4 rounded-full font-semibold
                  border-2 border-purple-500 text-purple-400 hover:text-white
                  hover:bg-purple-500 transform hover:scale-105 transition-all duration-300
                  shadow-lg hover:shadow-purple-500/25 group
                "
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700" />
                <Download className="inline mr-2 h-5 w-5 group-hover:animate-bounce relative z-10" />
                <span className="relative z-10">Download Resume</span>
              </button>
            </div>
          </div>

          {/* Enhanced social links with better animations */}
          <div
            className={`transition-all duration-1000 delay-900 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex justify-center space-x-8 mb-20">
              {[
                { Icon: Github, href: "https://github.com/enockuwumukiza", label: "GitHub", color: "hover:text-gray-400" },
                { Icon: Linkedin, href: "https://linkedin.com/in/enockuwumukiza", label: "LinkedIn", color: "hover:text-blue-400" },
                { Icon: Mail, href: "mailto:enock@uwumukiza.dev", label: "Email", color: "hover:text-green-400" },
              ].map(({ Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    p-4 rounded-full text-gray-400 ${color}
                    transform hover:scale-125 hover:rotate-12 transition-all duration-300
                    border border-gray-600 hover:border-current
                    shadow-lg hover:shadow-xl backdrop-blur-sm
                    bg-black/20 hover:bg-black/40
                  `}
                  aria-label={label}
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Enhanced scroll indicator */}
          <div
            className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex flex-col items-center">
              <div className="h-8 w-0.5 bg-gradient-to-b from-transparent to-blue-400 mb-2" />
              <ChevronDown className="h-8 w-8 text-blue-400 animate-bounce" />
              <div className="h-8 w-0.5 bg-gradient-to-t from-transparent to-blue-400 mt-2" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes gradient-x-reverse {
          0%, 100% { background-position: 100% 50%; }
          50% { background-position: 0% 50%; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        @keyframes grid-flow {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(1deg); }
          66% { transform: translateY(-10px) rotate(-1deg); }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-gradient-x-reverse {
          background-size: 200% 200%;
          animation: gradient-x-reverse 3s ease infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;