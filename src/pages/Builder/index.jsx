import React, { useState, useRef } from 'react';
import { BuilderProvider, useBuilderContext } from '../../context/BuilderContext';
import IdentityForm from '../../components/builder/IdentityForm';
import TeamSelector from '../../components/builder/TeamSelector';
import PhotoUpload from '../../components/builder/PhotoUpload';
import TemplateSelector from '../../components/builder/TemplateSelector';
import CardPreview from '../../components/builder/CardPreview';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { renderElementToPng, downloadDataUrl, sanitizeFilename } from '../../utils/cardExporter';
import { User, Users, Camera, Layout, Eye, Sparkles, Download, CheckCircle2, RefreshCw, AlertCircle } from 'lucide-react';

function BuilderWorkbench() {
    const { name, role, photo, teamMode, selectedTeam, teamValidation } = useBuilderContext();
    const [activeTab, setActiveTab] = useState('all');

    // Export Generation State
    const [isGenerating, setIsGenerating] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [generatedDataUrl, setGeneratedDataUrl] = useState(null);
    const [exportError, setExportError] = useState('');

    const cardRef = useRef(null);
    const exportCardRef = useRef(null);

    const isIdentityComplete = name.trim().length > 0 && role.trim().length > 0;
    const isTeamValid = teamMode === 'solo' || (teamMode === 'team' && teamValidation.isValid);
    const canGenerate = isIdentityComplete && isTeamValid;

    // Handle Generation Action
    const handleGenerate = async () => {
        if (!canGenerate) return;

        setExportError('');
        setIsGenerating(true);
        setLoadingMessage('Compiling your builder aura...');

        // Microcopy delay step for cinematic feel
        await new Promise(r => setTimeout(r, 400));
        setLoadingMessage('Negotiating with the renderer...');

        try {
            // Target export card ref for crisp PNG rendering
            const targetNode = exportCardRef.current || cardRef.current;
            const dataUrl = await renderElementToPng(targetNode);

            setGeneratedDataUrl(dataUrl);
            setLoadingMessage('');
        } catch (err) {
            console.error('Export failed:', err);
            setExportError('Something broke while generating your card.');
        } finally {
            setIsGenerating(false);
        }
    };

    // Handle Download Action
    const handleDownload = () => {
        if (!generatedDataUrl) return;
        const filename = sanitizeFilename(name, teamMode === 'team' && selectedTeam ? selectedTeam.name : 'SOLO');
        downloadDataUrl(generatedDataUrl, filename);
    };

    // Reset generated image if form state changes
    const resetExportState = () => {
        if (generatedDataUrl) setGeneratedDataUrl(null);
    };

    return (
        <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-6 md:py-10 relative z-10">

            {/* Hidden Offscreen Card Container for Fixed High-Res PNG Capture */}
            <div className="fixed top-[-9999px] left-[-9999px] pointer-events-none z-[-10]">
                <div className="w-[400px]">
                    <CardPreview ref={exportCardRef} isExportMode={true} />
                </div>
            </div>

            {/* Top Console Header */}
            <div className="text-left mb-6 border-b border-[#2E303C]/40 pb-4 flex flex-col sm:flex-row justify-between sm:items-end gap-3">
                <div>
                    <div className="inline-flex items-center gap-1.5 uppercase font-mono text-[10px] tracking-widest text-neon-coral font-bold border border-neon-coral/30 bg-neon-coral/5 py-0.5 px-2 mb-2">
                        <Sparkles className="w-3 h-3" /> CORE BUILDER // PHASE 3 EXPORT ENGINE
                    </div>
                    <h1 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-wider text-white">
                        BUILDER IDENTITY WORKBENCH
                    </h1>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center gap-3 text-xs font-mono text-gray-400">
                    <div className="flex items-center gap-2 bg-[#08080C] border border-border-card px-3 py-1.5">
                        <span className={`w-2 h-2 rounded-full ${canGenerate ? 'bg-beach-teal animate-pulse-slow' : 'bg-neon-coral'}`} />
                        <span className="text-[10px] uppercase font-bold text-white">
                            {generatedDataUrl
                                ? 'Identity acquired.'
                                : canGenerate
                                    ? 'Ready to compile ID card.'
                                    : 'Compiling your builder aura...'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Mobile Tab Navigation Bar */}
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
                        <div className="space-y-8" onChange={resetExportState}>

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

                {/* Right Column: Sticky Live Card Preview & Action Bar (lg:col-span-5) */}
                <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">

                    <div className="flex items-center justify-between font-mono text-[10px] text-gray-400 px-1 uppercase tracking-wider">
                        <span className="flex items-center gap-1 text-[#00F5FF]">
                            <Eye className="w-3.5 h-3.5" /> LIVE CARD PREVIEW
                        </span>
                        <span>REAL-TIME CANVAS</span>
                    </div>

                    {/* Card Preview Component */}
                    <CardPreview ref={cardRef} />

                    {/* Generation & Download Action Panel */}
                    <div className="bg-[#08080C] border border-border-card p-4 text-left space-y-3">

                        {/* Error state alert */}
                        {exportError && (
                            <div className="flex items-center gap-2 text-red-400 text-[10px] font-mono bg-red-500/10 p-2.5 border border-red-500/30">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <span>{exportError}</span>
                            </div>
                        )}

                        {!generatedDataUrl ? (
                            <Button
                                variant="primary"
                                onClick={handleGenerate}
                                disabled={!canGenerate || isGenerating}
                                className="w-full py-3.5 text-xs font-mono font-bold tracking-widest uppercase flex items-center justify-center gap-2"
                            >
                                {isGenerating ? (
                                    <>
                                        <RefreshCw className="w-4 h-4 animate-spin" />
                                        <span>{loadingMessage || 'GENERATING...'}</span>
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-4 h-4" />
                                        <span>GENERATE BUILDER ID</span>
                                    </>
                                )}
                            </Button>
                        ) : (
                            <div className="space-y-2 animate-fadeIn">
                                <div className="flex items-center justify-between text-[10px] font-mono text-beach-teal bg-beach-teal/10 border border-beach-teal/30 p-2 px-3">
                                    <span className="font-extrabold uppercase flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3.5 h-3.5" /> BUILDER ID READY
                                    </span>
                                    <span className="text-gray-400 text-[9px]">300 DPI PNG</span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <Button
                                        variant="primary"
                                        onClick={handleDownload}
                                        className="w-full py-3 text-xs font-mono font-bold tracking-wider uppercase flex items-center justify-center gap-1.5"
                                    >
                                        <Download className="w-4 h-4" /> DOWNLOAD PNG
                                    </Button>

                                    <Button
                                        variant="ghost"
                                        onClick={handleGenerate}
                                        disabled={isGenerating}
                                        className="w-full py-3 text-xs font-mono font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 text-gray-400"
                                    >
                                        <RefreshCw className="w-3.5 h-3.5" /> RE-GENERATE
                                    </Button>
                                </div>
                            </div>
                        )}

                        {!canGenerate && (
                            <p className="text-[9px] font-mono text-gray-500 text-center uppercase">
                                {!isIdentityComplete ? 'Enter Name & Role to enable generation.' : 'Fix team verification to continue.'}
                            </p>
                        )}
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
