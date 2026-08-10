import React from 'react';
import { useBuilderContext } from '../../context/BuilderContext';
import { TEMPLATES } from '../../config/templates';
import { Layout, Check } from 'lucide-react';

export default function TemplateSelector() {
    const { selectedTemplateId, setSelectedTemplateId } = useBuilderContext();

    return (
        <div className="space-y-4 text-left">

            {/* Micro Header */}
            <div className="flex items-center justify-between border-b border-[#2E303C]/40 pb-2">
                <span className="text-[10px] font-mono text-neon-coral font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <Layout className="w-3.5 h-3.5" /> 4. TEMPLATE SELECTION
                </span>
                <span className="text-[9px] font-mono text-gray-500 uppercase">
                    5 PRESETS AVAILABLE
                </span>
            </div>

            {/* Grid of Templates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {TEMPLATES.map((tmpl) => {
                    const isSelected = selectedTemplateId === tmpl.id;
                    return (
                        <div
                            key={tmpl.id}
                            onClick={() => setSelectedTemplateId(tmpl.id)}
                            className={`p-3 cursor-pointer border transition-all relative overflow-hidden flex flex-col justify-between ${isSelected
                                    ? 'bg-[#08080C] border-neon-coral shadow-[0_0_15px_rgba(255,91,53,0.2)]'
                                    : 'bg-[#08080C]/60 border-border-card hover:border-gray-600 hover:bg-zinc-950'
                                }`}
                        >
                            {/* Selected Badge */}
                            {isSelected && (
                                <div className="absolute top-0 right-0 bg-neon-coral text-black p-1">
                                    <Check className="w-3 h-3 stroke-[3]" />
                                </div>
                            )}

                            <div>
                                <div className="flex items-center justify-between">
                                    <span className="font-display font-black text-sm text-white uppercase tracking-wide">
                                        {tmpl.name}
                                    </span>
                                    <span
                                        className="text-[8px] font-mono font-bold px-1.5 py-0.5 border"
                                        style={{ color: tmpl.accentColor, borderColor: `${tmpl.accentColor}40` }}
                                    >
                                        {tmpl.tag}
                                    </span>
                                </div>
                                <p className="text-[9px] font-sans text-gray-400 leading-tight mt-1.5">
                                    {tmpl.description}
                                </p>
                            </div>

                            {/* Color sample bar */}
                            <div className="mt-3 flex items-center gap-1.5 pt-2 border-t border-[#2E303C]/30">
                                <div
                                    className="w-3 h-3 rounded-none border border-white/20"
                                    style={{ backgroundColor: tmpl.accentColor }}
                                />
                                <span className="text-[8px] font-mono text-gray-500 uppercase">
                                    PALETTE PRESET
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}
