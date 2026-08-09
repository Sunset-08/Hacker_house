import React from 'react';
import { Terminal, Award, HelpCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

/**
 * AppShell renders the main wrapper for the application.
 * It features a persistent cyberpunk header, technical details, a scanline overlay,
 * and a status bar footer.
 */
export default function AppShell({ children }) {
    const location = useLocation();
    const dateStr = "AUG 2026";

    return (
        <div className="min-height-screen flex flex-col bg-dark-coal relative overflow-hidden select-none">

            {/* Ambient backgrounds & VFX */}
            <div className="absolute inset-0 dot-grid-white pointer-events-none z-0" />

            {/* CRT Scanline effect (subtle animation) */}
            <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03] overflow-hidden">
                <div className="w-full h-1/2 bg-gradient-to-b from-transparent via-[#FF5B35]/30 to-transparent animate-scanline" />
            </div>

            {/* Header element */}
            <header className="relative z-20 border-b border-border-card bg-dark-coal/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">

                    {/* Logo / Brand Heading */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-8 h-8 bg-neon-coral flex items-center justify-center clip-slanted group-hover:bg-white transition-colors duration-300">
                            <Terminal className="w-4 h-4 text-black" />
                        </div>
                        <div className="text-left">
                            <span className="font-display font-black text-lg tracking-wider text-white block leading-none uppercase group-hover:text-neon-coral transition-colors">
                                HACKERHOUSE <span className="text-neon-coral group-hover:text-white">GOA</span>
                            </span>
                            <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase leading-none block mt-1">
                                IDENTITY_GEN // VER_1.0
                            </span>
                        </div>
                    </Link>

                    {/* Navigation Links */}
                    <nav className="flex items-center gap-6 font-mono text-xs text-gray-400">
                        <Link
                            to="/"
                            className={`hover:text-white transition-colors uppercase tracking-widest ${location.pathname === '/' ? 'text-neon-coral font-bold valorant-bracket-l valorant-bracket-r' : ''}`}
                        >
                            PORTAL
                        </Link>
                        <Link
                            to="/builder"
                            className={`hover:text-white transition-colors uppercase tracking-widest ${location.pathname === '/builder' ? 'text-neon-coral font-bold valorant-bracket-l valorant-bracket-r' : ''}`}
                        >
                            GENERATOR
                        </Link>
                    </nav>

                    {/* Subtle Right HUD indicators */}
                    <div className="hidden md:flex items-center gap-4 text-right">
                        <div className="border-l border-[#2E303C]/60 pl-4">
                            <span className="text-[10px] font-mono text-gray-500 block leading-tight">STATUS //</span>
                            <span className="text-xs font-mono font-bold text-beach-teal block leading-tight flex items-center gap-1.5 uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-beach-teal animate-pulse-slow" />
                                SYSTEM_LIVE
                            </span>
                        </div>
                    </div>

                </div>

                {/* Slanted border highlight */}
                <div className="h-[1px] bg-gradient-to-r from-neon-coral via-transparent to-beach-teal" />
            </header>

            {/* Main Container Area */}
            <main className="flex-1 relative z-10 flex flex-col">
                {children}
            </main>

            {/* Footer bar */}
            <footer className="relative z-20 border-t border-border-card bg-zinc-950 py-3 text-gray-500">
                <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between text-[10px] font-mono tracking-widest uppercase">

                    <div className="mb-2 md:mb-0">
                        <span>© 2026 HACKERHOUSE GOA. LAB_DEPLOYED.</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="text-gray-400">
                            <span className="text-gray-600 mr-2">EVT //</span>
                            <span className="text-sand font-bold">GOA_2026.SHPMT</span>
                        </div>
                        <div className="hidden sm:block text-gray-400">
                            <span className="text-gray-600 mr-2">SYS_CRD //</span>
                            <span className="text-neon-coral font-bold">100_AUTO</span>
                        </div>
                        <div className="text-gray-400">
                            <span className="text-gray-600 mr-2">LAT //</span>
                            <span className="text-[#00F5FF]">~2MS // SECURE</span>
                        </div>
                    </div>

                </div>
            </footer>
        </div>
    );
}
