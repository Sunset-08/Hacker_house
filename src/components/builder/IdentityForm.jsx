import React from 'react';
import { useBuilderContext } from '../../context/BuilderContext';
import { User, Cpu, Sparkles } from 'lucide-react';

export default function IdentityForm() {
    const { name, setName, role, setRole, builderTitle } = useBuilderContext();

    return (
        <div className="space-y-5 text-left">

            {/* Micro Header */}
            <div className="flex items-center justify-between border-b border-[#2E303C]/40 pb-2">
                <span className="text-[10px] font-mono text-neon-coral font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> 1. IDENTITY INFORMATION
                </span>
                <span className="text-[9px] font-mono text-gray-500 uppercase">
                    REQ // NAME + ROLE
                </span>
            </div>

            {/* Name Input */}
            <div>
                <label htmlFor="builder-name" className="block text-[11px] font-mono text-gray-300 uppercase tracking-wider mb-1.5 font-semibold">
                    Builder Name <span className="text-neon-coral">*</span>
                </label>
                <div className="relative">
                    <input
                        id="builder-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. SOUZA DE GOA"
                        autoComplete="off"
                        autoCorrect="off"
                        maxLength={32}
                        className={`w-full bg-[#08080C] border ${name.trim() ? 'border-border-card focus:border-neon-coral' : 'border-border-card focus:border-neon-coral'} py-3 px-4 text-sm text-white font-sans uppercase placeholder-gray-600 outline-none transition-colors rounded-none`}
                    />
                    {name.trim().length > 0 && (
                        <span className="absolute right-3 top-3 text-[9px] font-mono text-beach-teal uppercase font-bold">
                            ✓ READY
                        </span>
                    )}
                </div>
                {!name.trim() && (
                    <p className="text-[10px] font-mono text-gray-500 mt-1 uppercase">
                        Required for Builder Card identity badge.
                    </p>
                )}
            </div>

            {/* Role / Stack Input */}
            <div>
                <label htmlFor="builder-role" className="block text-[11px] font-mono text-gray-300 uppercase tracking-wider mb-1.5 font-semibold">
                    Stack / Primary Role <span className="text-neon-coral">*</span>
                </label>
                <div className="relative">
                    <input
                        id="builder-role"
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="e.g. SOLANA RUST / FULLSTACK"
                        autoComplete="off"
                        autoCorrect="off"
                        maxLength={36}
                        className="w-full bg-[#08080C] border border-border-card focus:border-neon-coral py-3 px-4 text-sm text-white font-sans uppercase placeholder-gray-600 outline-none transition-colors rounded-none"
                    />
                    {role.trim().length > 0 && (
                        <span className="absolute right-3 top-3 text-[9px] font-mono text-beach-teal uppercase font-bold">
                            ✓ READY
                        </span>
                    )}
                </div>
                <p className="text-[10px] font-mono text-gray-500 mt-1 uppercase">
                    Influences your deterministic Builder Title aura.
                </p>
            </div>

            {/* Generated Builder Title Preview Widget */}
            <div className="bg-[#08080C] border border-border-card p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 bg-sand/10 border border-sand/30 flex items-center justify-center text-sand clip-slanted">
                        <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                        <span className="text-[9px] font-mono text-gray-500 uppercase block leading-none">
                            COMPUTED HACKER CLASS
                        </span>
                        <span className="text-xs font-mono font-bold text-sand uppercase block mt-1 tracking-wide">
                            {builderTitle}
                        </span>
                    </div>
                </div>
                <span className="text-[8px] font-mono text-gray-600 uppercase border border-gray-800 px-1.5 py-0.5">
                    DETERMINISTIC
                </span>
            </div>

        </div>
    );
}
