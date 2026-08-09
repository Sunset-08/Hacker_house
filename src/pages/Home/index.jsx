import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ShieldCheck, Users, Sparkles, ChevronRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="flex-1 flex flex-col justify-center items-center py-10 md:py-20 px-4 max-w-7xl mx-auto w-full relative">

            {/* Background Neon Accent Glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-neon-coral/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-beach-teal/5 rounded-full blur-[80px] pointer-events-none" />

            {/* Grid Layout Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full z-10">

                {/* Left Side: Copy and CTA */}
                <div className="lg:col-span-7 text-left flex flex-col space-y-6">

                    <div className="inline-flex items-center gap-1.5 uppercase font-mono text-xs tracking-widest text-[#FF5B35] font-bold border border-[#FF5B35]/20 bg-[#FF5B35]/5 py-1 px-3 w-fit clip-slanted">
                        <Sparkles className="w-3.5 h-3.5" />
                        HACKERHOUSE GOA VIP SYSTEM
                    </div>

                    <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl leading-[0.95] text-white tracking-tighter uppercase uppercase-decor">
                        BUILD YOUR <br className="hidden md:inline" />
                        <span className="text-neon-coral">IDENTITY.</span> <br />
                        CLAIM YOUR <span className="text-sand">AURA.</span>
                    </h1>

                    <p className="text-gray-300 font-sans text-base md:text-lg max-w-xl leading-relaxed">
                        Generate a premium, experimental digital builder ID for <span className="text-white font-bold">HackerHouse Goa 2026</span>. Customize templates, choose your hacker class, claim your team aura, and share it instantly. Locked and loaded in 30 seconds.
                    </p>

                    {/* Valorant styling lines / accents */}
                    <div className="flex items-center gap-4 text-xs font-mono text-gray-500 uppercase tracking-widest my-2 py-2 border-y border-[#2E303C]/30 w-fit">
                        <span>SOLO MODE</span>
                        <span className="w-1.5 h-1.5 bg-neon-coral rotate-45" />
                        <span>TEAM ALLIANCE</span>
                        <span className="w-1.5 h-1.5 bg-neon-coral rotate-45" />
                        <span>INSTANT EXPORT</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        <Button
                            variant="primary"
                            onClick={() => navigate('/builder')}
                            className="px-8 py-4 text-base"
                        >
                            INITIALIZE BUILDER CARD
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => {
                                const element = document.getElementById('features');
                                element?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="px-8"
                        >
                            SYS_INFO
                        </Button>
                    </div>

                    {/* Micro HUD status */}
                    <div className="flex items-center gap-6 pt-4 text-[10px] font-mono text-gray-500">
                        <div>
                            <span className="text-gray-600 block">RENDER SPEED</span>
                            <span className="text-white font-bold">~150MS LOCAL</span>
                        </div>
                        <div className="border-l border-[#2E303C]/50 pl-6">
                            <span className="text-gray-600 block">RESOL_OUP</span>
                            <span className="text-[#00F5FF] font-bold">300 DPI PNG</span>
                        </div>
                        <div className="border-l border-[#2E303C]/50 pl-6">
                            <span className="text-gray-600 block">SECURITY</span>
                            <span className="text-sand font-bold">KEEPALIVE_OFF</span>
                        </div>
                    </div>

                </div>

                {/* Right Side: Valorant Inspired Cyber Card Preview Mock */}
                <div className="lg:col-span-5 flex justify-center items-center relative">

                    {/* Card Ambient Glow Container */}
                    <div className="relative group cursor-pointer transition-transform duration-500 hover:scale-[1.03] rotate-1 select-none">

                        {/* Visual background framing lines */}
                        <div className="absolute top-[-15px] left-[-15px] -right-[-15px] -bottom-[-15px] border border-[#2E303C]/20 pointer-events-none rounded-sm transition-all group-hover:border-neon-coral/20" />
                        <div className="absolute top-[-5px] left-[-5px] right-[-5px] bottom-[-5px] border border-[#2E303C]/40 pointer-events-none rounded-sm" />

                        {/* Card Widget */}
                        <div className="w-[300px] sm:w-[320px] aspect-[4/6] bg-dark-card border-2 border-border-card relative shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-between p-5 rounded-none">

                            {/* Background dots */}
                            <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none z-0" />

                            {/* Card Scanlines overlay */}
                            <div className="absolute inset-0 pointer-events-none z-20 opacity-5 bg-gradient-to-b from-transparent via-[#00F5FF]/10 to-transparent animate-scanline" />

                            {/* Card Top Title Block */}
                            <div className="relative z-10 flex justify-between items-start border-b border-[#2E303C]/60 pb-3">
                                <div className="text-left font-mono">
                                    <span className="text-[7px] text-gray-500 uppercase tracking-widest block leading-none">HHG // GEN_CARD</span>
                                    <span className="text-[11px] text-white font-extrabold uppercase tracking-wide leading-none mt-1 block">IDENT_CARD</span>
                                </div>
                                <div className="flex items-center gap-1 bg-neon-coral/10 text-neon-coral text-[8px] font-mono py-0.5 px-1.5 uppercase font-bold border border-neon-coral/30 clip-slanted">
                                    VERIFIED BUILDER
                                </div>
                            </div>

                            {/* Mock Photo Area */}
                            <div className="relative z-10 my-4 flex-1 bg-zinc-950/80 border border-[#2E303C] overflow-hidden group-hover:border-neon-coral/30 transition-all flex items-center justify-center">

                                {/* Crosshairs visual */}
                                <div className="absolute top-2 left-2 text-neon-coral text-[9px] font-mono opacity-50">+</div>
                                <div className="absolute top-2 right-2 text-neon-coral text-[9px] font-mono opacity-50">+</div>
                                <div className="absolute bottom-2 left-2 text-neon-coral text-[9px] font-mono opacity-50">+</div>
                                <div className="absolute bottom-2 right-2 text-neon-coral text-[9px] font-mono opacity-50">+</div>

                                <div className="text-center font-mono opacity-60 text-gray-400 group-hover:opacity-100 group-hover:text-white transition-opacity select-none flex flex-col items-center">
                                    <Users className="w-10 h-10 text-neon-coral mb-2 stroke-[1.5]" />
                                    <span className="text-[9px] tracking-widest block uppercase">UP_IMG // REQ</span>
                                    <span className="text-[8px] tracking-widest block uppercase text-gray-500 mt-1">UPLOADED_LOCAL</span>
                                </div>
                            </div>

                            {/* Card Footer Info */}
                            <div className="relative z-10 flex flex-col justify-end text-left select-none">

                                <div className="font-display font-black text-2xl tracking-wide uppercase text-white leading-none">
                                    BUILDER NAME
                                </div>

                                <div className="flex justify-between items-end mt-2 pt-2 border-t border-[#2E303C]/40">
                                    <div className="text-left font-mono">
                                        <span className="text-[8px] text-gray-500 block leading-tight uppercase font-medium">AURA_CLASS</span>
                                        <span className="text-[10px] text-sand font-bold block uppercase mt-0.5">THE CHAOS BUILDER</span>
                                    </div>
                                    <div className="text-right font-mono">
                                        <span className="text-[8px] text-gray-500 block leading-tight uppercase font-medium">TEAM_ALLI</span>
                                        <span className="text-[10px] text-white font-bold block uppercase mt-0.5">PHANTOM AI</span>
                                    </div>
                                </div>

                            </div>

                            {/* Overlay side brackets */}
                            <div className="absolute top-1/2 -right-[1px] -translate-y-1/2 w-[2px] h-8 bg-neon-coral" />
                            <div className="absolute top-1/2 -left-[1px] -translate-y-1/2 w-[2px] h-8 bg-beach-teal" />
                        </div>

                        {/* Corner retro HUD labels */}
                        <div className="absolute bottom-[-22px] right-2 text-[8px] font-mono text-gray-500 tracking-widest uppercase">
                            GRID_COORD // 15.2976° N, 73.7222° E (GOA)
                        </div>

                    </div>

                </div>

            </div>

            {/* Features Overview Grid Section */}
            <section id="features" className="w-full mt-24 py-16 scroll-mt-20 border-t border-[#2E303C]/40 relative">
                <div className="absolute inset-0 dot-grid-teal opacity-10 pointer-events-none" />

                {/* Banner with slash line */}
                <div className="text-left mb-12 flex items-center justify-between">
                    <div>
                        <span className="text-xs font-mono tracking-widest text-[#00F5FF] uppercase block mb-1">CAPABILITIES</span>
                        <h2 className="font-display font-extrabold text-2xl md:text-3xl text-white uppercase tracking-wider">
                            VIP ARCHITECTURE STACK
                        </h2>
                    </div>
                    <div className="w-[100px] md:w-[400px] h-[1px] bg-gradient-to-r from-beach-teal/40 to-transparent hidden sm:block" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <Card
                        title="STATIC SERVERLESS"
                        subtitle="PERFORMANCE"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 flex items-center justify-center bg-beach-teal/10 border border-beach-teal/30 text-beach-teal clip-slanted shrink-0">
                                <Zap className="w-5 h-5" />
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed text-left">
                                Every calculation, cropping, rendering, and PNG packaging is performed on the user's phone or desktop browser. No API delays. No server slowdowns.
                            </p>
                        </div>
                    </Card>

                    <Card
                        title="CRASH PROOF"
                        subtitle="PRIVACY GUARDED"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 flex items-center justify-center bg-sand/10 border border-sand/30 text-sand clip-slanted shrink-0">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed text-left">
                                Your images and personal details never leave your hardware. No remote uploads, zero retention. Secure and fully compliant by design.
                            </p>
                        </div>
                    </Card>

                    <Card
                        title="ALLIANCES"
                        subtitle="TEAM & MEMBERSHIP"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 flex items-center justify-center bg-neon-coral/10 border border-neon-coral/30 text-neon-coral clip-slanted shrink-0">
                                <Users className="w-5 h-5" />
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed text-left">
                                Claim your team aura and verify membership. Configured verification rules prevent uninvited users from hijacking your team name on the final ID badge.
                            </p>
                        </div>
                    </Card>

                </div>
            </section>

        </div>
    );
}
