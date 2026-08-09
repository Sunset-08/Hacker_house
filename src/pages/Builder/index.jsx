import React from 'react';
import { Camera, ShieldAlert, Award, Grid, RefreshCw, Eye } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function Builder() {
    return (
        <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8 md:py-12 relative z-10">

            {/* Page Title Header */}
            <div className="text-left mb-8 border-b border-[#2E303C]/40 pb-4 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
                <div>
                    <span className="text-[10px] font-mono tracking-widest text-neon-coral uppercase block mb-1">
                        CORE_CONSOLE // IN_DEV
                    </span>
                    <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-wider text-white">
                        BUILDER IDENTITY WORKBENCH
                    </h2>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase">
                    <span>PORT: 3000</span>
                    <span className="w-1 h-1 bg-gray-600 rounded-full" />
                    <span>PHASE_1_STABLE</span>
                </div>
            </div>

            {/* Responsive Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Column 1: Live Card Preview (lg:col-span-5) */}
                <div className="lg:col-span-5 flex flex-col items-center space-y-4">

                    <div className="w-full text-left font-mono text-[10px] text-gray-500 flex justify-between items-center px-1 uppercase tracking-wider">
                        <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3 text-[#00F5FF]" /> Live Preview
                        </span>
                        <span>Scale: 100% // Local Canvas</span>
                    </div>

                    {/* Valorant Styled Card Outer Container */}
                    <div className="w-full aspect-[4/6] max-w-[340px] bg-dark-card border-2 border-border-card relative shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-between p-5 rounded-none group select-none">

                        {/* Background elements */}
                        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none z-0" />
                        <div className="absolute inset-0 pointer-events-none z-20 opacity-5 bg-gradient-to-b from-transparent via-[#00F5FF]/10 to-transparent animate-scanline" />

                        {/* Top Indicator info */}
                        <div className="relative z-10 flex justify-between items-start border-b border-[#2E303C]/60 pb-3">
                            <div className="text-left font-mono">
                                <span className="text-[7px] text-gray-500 uppercase tracking-widest block leading-none">HHG // GEN_CARD</span>
                                <span className="text-[11px] text-white font-extrabold uppercase tracking-wide leading-none mt-1 block">IDENT_CARD</span>
                            </div>
                            <div className="flex items-center gap-1 bg-neon-coral/10 text-neon-coral text-[8px] font-mono py-0.5 px-1.5 uppercase font-bold border border-neon-coral/30 clip-slanted">
                                VERIFIED BUILDER
                            </div>
                        </div>

                        {/* Image Box Placeholder */}
                        <div className="relative z-10 my-4 flex-1 bg-zinc-950/80 border border-[#2E303C] overflow-hidden flex items-center justify-center">
                            {/* Corner brackets */}
                            <div className="absolute top-2 left-2 text-neon-coral text-[9px] font-mono opacity-50">+</div>
                            <div className="absolute top-2 right-2 text-neon-coral text-[9px] font-mono opacity-50">+</div>
                            <div className="absolute bottom-2 left-2 text-neon-coral text-[9px] font-mono opacity-50">+</div>
                            <div className="absolute bottom-2 right-2 text-neon-coral text-[9px] font-mono opacity-50">+</div>

                            <div className="text-center font-mono opacity-60 text-gray-400 flex flex-col items-center">
                                <Camera className="w-10 h-10 text-neon-coral mb-2 stroke-[1.5]" />
                                <span className="text-[9px] tracking-widest block uppercase">UP_IMG // REQ</span>
                                <span className="text-[8px] tracking-widest block uppercase text-gray-500 mt-1">UPLOADED_LOCAL</span>
                            </div>
                        </div>

                        {/* Title / Identity Labels */}
                        <div className="relative z-10 flex flex-col justify-end text-left">
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

                    <p className="text-gray-500 font-mono text-[10px] max-w-[340px] leading-relaxed text-center">
                        SYSTEM NOTE: Under dynamic compile mode. The real canvas rendering operations trigger in Phase 2 core development setup.
                    </p>

                </div>

                {/* Column 2: Form Options Placeholders (lg:col-span-7) */}
                <div className="lg:col-span-7 space-y-6 text-left">

                    <Card
                        title="CONTROL PANEL"
                        subtitle="IDENTITY SCHEMA & THEMING"
                    >
                        {/* Header placeholder tabs */}
                        <div className="flex border-b border-[#2E303C]/40 mb-6 bg-zinc-950/40 p-1">
                            <button className="flex-1 py-2 text-center text-xs font-mono font-bold uppercase tracking-wider text-neon-coral border-b border-neon-coral">
                                1. IDENTITY
                            </button>
                            <button disabled className="flex-1 py-2 text-center text-xs font-mono font-bold uppercase tracking-wider text-gray-600 cursor-not-allowed">
                                2. CUSTOMIZE
                            </button>
                            <button disabled className="flex-1 py-2 text-center text-xs font-mono font-bold uppercase tracking-wider text-gray-600 cursor-not-allowed">
                                3. ACTIONS
                            </button>
                        </div>

                        {/* Placeholder identity form */}
                        <div className="space-y-4 opacity-50 relative pointer-events-none select-none">

                            {/* Alert block */}
                            <div className="flex gap-3 bg-[#FF5B35]/5 border border-[#FF5B35]/20 p-4 mb-4 text-[#FF5B35]">
                                <ShieldAlert className="w-5 h-5 shrink-0" />
                                <div className="text-xs leading-relaxed">
                                    <span className="font-bold uppercase block mb-1">FOUNDATION SHUTDOWN //</span>
                                    Interactive controllers are currently locked. Phase 1 layout verification checks the visuals and responsiveness of active components before binding logical handles.
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5">
                                        Hacker Real Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. SOUZA DE GOA"
                                        disabled
                                        className="w-full bg-[#08080C] border border-border-card py-2.5 px-3.5 text-xs text-white uppercase placeholder-gray-600 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5">
                                        Hacker Stack / Role
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. CORE CONTRACT DEV"
                                        disabled
                                        className="w-full bg-[#08080C] border border-border-card py-2.5 px-3.5 text-xs text-white uppercase placeholder-gray-600 outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5">
                                    Alliance Team Name (Validated)
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="e.g. PHANTOM AI"
                                        disabled
                                        className="w-full bg-[#08080C] border border-border-card py-2.5 px-3.5 text-xs text-white uppercase placeholder-gray-600 outline-none"
                                    />
                                    <span className="absolute right-3 top-2.5 text-[8px] font-mono text-green-500 uppercase border border-green-500/20 px-1 bg-green-500/5">
                                        ✓ VAL_PASS
                                    </span>
                                </div>
                            </div>

                            {/* Photo Upload area visual mock */}
                            <div>
                                <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5">
                                    Static Photo File Picker
                                </label>
                                <div className="bg-[#08080C] border border-dashed border-border-card p-6 flex flex-col items-center justify-center text-center">
                                    <Camera className="w-8 h-8 text-gray-600 mb-2" />
                                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
                                        DRAG & DROP IMAGE FILE OR CLICK SELECT
                                    </span>
                                    <span className="text-[8px] font-mono text-gray-600 mt-1 uppercase">
                                        PNG, JPG, JPEG (MAX SIZE 5MB)
                                    </span>
                                </div>
                            </div>

                        </div>

                        {/* Bottom Generate Button visual placement */}
                        <div className="mt-8 pt-4 border-t border-[#2E303C]/30 flex items-center justify-between">
                            <span className="text-[9px] font-mono text-gray-500 uppercase">
                                ENGINE STATE // LOCKED_PHASE_1
                            </span>
                            <Button variant="primary" disabled className="px-6 py-2.5">
                                GENERATE BUILDER ID
                            </Button>
                        </div>

                    </Card>

                </div>

            </div>

        </div>
    );
}
