import React, { useState } from 'react';
import { BuilderProvider, useBuilderContext } from '../../context/BuilderContext';
import IdentityForm from '../../components/builder/IdentityForm';
import TeamSelector from '../../components/builder/TeamSelector';
import PhotoUpload from '../../components/builder/PhotoUpload';
import TemplateSelector from '../../components/builder/TemplateSelector';
import CardPreview from '../../components/builder/CardPreview';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { User, Users, Camera, Layout, Eye, Sparkles, CheckCircle2 } from 'lucide-react';

function BuilderWorkbench() {
    const { name, role, photo, teamMode, selectedTeam, teamValidation } = useBuilderContext();
    const [activeTab, setActiveTab] = useState('all'); // 'all' | 'identity' | 'alliance' | 'photo' | 'template'

    const isIdentityComplete = name.trim().length > 0 && role.trim().length > 0;
    const isTeamValid = teamMode === 'solo' || (teamMode === 'team' && teamValidation.isValid);

    return (
        <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-6 md:py-10 relative z-10">

            {/* Top Console Header */}
            <div className="text-left mb-6 border-b border-[#2E303C]/40 pb-4 flex flex-col sm:flex-row justify-between sm:items-end gap-3">
                <div>
                    <div className="inline-flex items-center gap-1.5 uppercase font-mono text-[10px] tracking-widest text-neon-coral font-bold border border-neon-coral/30 bg-neon-coral/5 py-0.5 px-2 mb-2">
                        <Sparkles className="w-3 h-3" /> CORE BUILDER // PHASE 2 ACTIVE
                    </div>
                    <h1 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-wider text-white">
                        BUILDER IDENTITY WORKBENCH
                    </h1>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center gap-3 text-xs font-mono text-gray-400">
                    <div className="flex items-center gap-2 bg-[#08080C] border border-border-card px-3 py-1.5">
                        <span className={`w-2 h-2 rounded-full ${isIdentityComplete && isTeamValid ? 'bg-beach-teal animate-pulse-slow' : 'bg-neon-coral'}`} />
                        <span className="text-[10px] uppercase font-bold text-white">
                            {isIdentityComplete && isTeamValid ? 'Identity acquired.' : 'Compiling your builder aura...'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Mobile Tab Navigation Bar (Shown on small screens for quick tab navigation) */}
            <div className="lg:hidden flex overflow-x-auto bg-[#08080C] border border-border-card p-1 mb-6 gap-1 scrollbar-none">
                <button
                    onClick={() => setActiveTab('all')}
                    className={`px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-wider whitespace-nowrap ${activeTab === 'all' ? 'bg-neon-coral text-black' : 'text-gray-400 hover:text-white'
                        }`}
                >
                    ALL CONTROLS
                </button>
                <button
                    onClick={() => setActiveTab('identity')}
                    className={`px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-wider whitespace-nowrap flex items-center gap-1 ${activeTab === 'identity' ? 'bg-neon-coral text-black' : 'text-gray-400 hover:text-white'
                        }`}
                >
                    <User className="w-3 h-3" /> 1. IDENTITY
                </button>
                <button
                    onClick={() => setActiveTab('alliance')}
                    className={`px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-wider whitespace-nowrap flex items-center gap-1 ${activeTab === 'alliance' ? 'bg-neon-coral text-black' : 'text-gray-400 hover:text-white'
                        }`}
                >
                    <Users className="w-3 h-3" /> 2. TEAM
                </button>
                <button
                    onClick={() => setActiveTab('photo')}
                    className={`px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-wider whitespace-nowrap flex items-center gap-1 ${activeTab === 'photo' ? 'bg-neon-coral text-black' : 'text-gray-400 hover:text-white'
                        }`}
                >
                    <Camera className="w-3 h-3" /> 3. PHOTO
                </button>
                <button
                    onClick={() => setActiveTab('template')}
                    className={`px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-wider whitespace-nowrap flex items-center gap-1 ${activeTab === 'template' ? 'bg-neon-coral text-black' : 'text-gray-400 hover:text-white'
                        }`}
                >
                    <Layout className="w-3 h-3" /> 4. TEMPLATE
                </button>
            </div>

            {/* Desktop & Mobile Responsive Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Left Column: Form Controls (lg:col-span-7) */}
                <div className="lg:col-span-7 space-y-6">

                    <Card
                        title="IDENTITY CONTROLLER"
                        subtitle="CONFIGURABLE SCHEMA & TEMPLATES"
                    >
                        <div className="space-y-8">

                            {/* Section 1: Identity Info */}
                            {(activeTab === 'all' || activeTab === 'identity') && (
                                <IdentityForm />
                            )}

                            {/* Section 2: Solo / Team Selector */}
                            {(activeTab === 'all' || activeTab === 'alliance') && (
                                <TeamSelector />
                            )}

                            {/* Section 3: Photo Upload */}
                            {(activeTab === 'all' || activeTab === 'photo') && (
                                <PhotoUpload />
                            )}

                            {/* Section 4: Template Selector */}
                            {(activeTab === 'all' || activeTab === 'template') && (
                                <TemplateSelector />
                            )}

                        </div>
                    </Card>

                </div>

                {/* Right Column: Sticky Live Card Preview (lg:col-span-5) */}
                <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">

                    <div className="flex items-center justify-between font-mono text-[10px] text-gray-400 px-1 uppercase tracking-wider">
                        <span className="flex items-center gap-1 text-[#00F5FF]">
                            <Eye className="w-3.5 h-3.5" /> LIVE CARD PREVIEW
                        </span>
                        <span>REAL-TIME CANVAS</span>
                    </div>

                    {/* Card Preview Component */}
                    <CardPreview />

                    {/* Completion Checklist Status Box */}
                    <div className="bg-[#08080C] border border-border-card p-4 text-left font-mono space-y-2">
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold border-b border-[#2E303C]/30 pb-1.5">
                            IDENTITY COMPLETION STATUS
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                            <div className="flex items-center gap-1.5">
                                <span className={name.trim() ? 'text-beach-teal' : 'text-gray-600'}>●</span>
                                <span className={name.trim() ? 'text-gray-200' : 'text-gray-500'}>NAME ENTERED</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className={role.trim() ? 'text-beach-teal' : 'text-gray-600'}>●</span>
                                <span className={role.trim() ? 'text-gray-200' : 'text-gray-500'}>ROLE ENTERED</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className={isTeamValid ? 'text-beach-teal' : 'text-red-400'}>●</span>
                                <span className={isTeamValid ? 'text-gray-200' : 'text-red-400'}>TEAM VALIDATED</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className={photo ? 'text-beach-teal' : 'text-gray-600'}>●</span>
                                <span className={photo ? 'text-gray-200' : 'text-gray-500'}>PHOTO LOADED</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default function Builder() {
    return (
        <BuilderProvider>
            <BuilderWorkbench />
        </BuilderProvider>
    );
}
