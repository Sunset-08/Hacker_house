import React from 'react';
import { useBuilderContext } from '../../context/BuilderContext';
import { Users, Camera, ShieldCheck, Terminal, Sparkles, AlertTriangle } from 'lucide-react';

export default function CardPreview() {
    const {
        name,
        role,
        teamMode,
        selectedTeam,
        teamValidation,
        photo,
        templateConfig,
        builderTitle,
        builderId
    } = useBuilderContext();

    const displayName = name.trim() ? name.toUpperCase() : 'BUILDER NAME';
    const displayRole = role.trim() ? role.toUpperCase() : 'STACK / ROLE';

    return (
        <div className="w-full flex flex-col items-center select-none">

            {/* Main Outer Card Container */}
            <div
                className={`w-full aspect-[4/6] max-w-[340px] relative shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-between p-5 rounded-none transition-all duration-300 ${templateConfig.bgClass}`}
            >
                {/* Background dot grid overlay */}
                {templateConfig.hudGrid && (
                    <div className={`absolute inset-0 ${templateConfig.hudGrid} opacity-30 pointer-events-none z-0`} />
                )}

                {/* Ambient template gradient overlay */}
                <div className={`absolute inset-0 pointer-events-none z-10 ${templateConfig.overlayClass}`} />

                {/* CRT Scanline overlay */}
                <div className="absolute inset-0 pointer-events-none z-20 opacity-5 bg-gradient-to-b from-transparent via-white/10 to-transparent animate-scanline" />

                {/* Top Header Row */}
                <div className={`relative z-20 flex justify-between items-center ${templateConfig.headerBg} p-2 -mx-5 -mt-5 mb-3 px-5`}>
                    <div className="flex items-center gap-2">
                        <div
                            className="w-5 h-5 flex items-center justify-center font-bold text-black text-[10px] clip-slanted"
                            style={{ backgroundColor: templateConfig.accentColor }}
                        >
                            HH
                        </div>
                        <div className="text-left font-mono">
                            <span className="text-[7px] text-gray-400 uppercase tracking-widest block leading-none">
                                HACKERHOUSE GOA
                            </span>
                            <span className="text-[10px] text-white font-extrabold uppercase tracking-wide leading-none mt-0.5 block">
                                BUILDER_ID
                            </span>
                        </div>
                    </div>

                    <div className={`text-[8px] font-mono font-bold py-0.5 px-2 uppercase border ${templateConfig.badgeClass}`}>
                        {templateConfig.badge}
                    </div>
                </div>

                {/* Photo Area Container */}
                <div className={`relative z-20 my-2 flex-1 bg-black/90 ${templateConfig.photoBorder} overflow-hidden flex items-center justify-center group`}>

                    {/* Corner Crosshair Accents */}
                    {templateConfig.cornerAccents && (
                        <>
                            <div className="absolute top-2 left-2 text-[9px] font-mono opacity-60" style={{ color: templateConfig.accentColor }}>+</div>
                            <div className="absolute top-2 right-2 text-[9px] font-mono opacity-60" style={{ color: templateConfig.accentColor }}>+</div>
                            <div className="absolute bottom-2 left-2 text-[9px] font-mono opacity-60" style={{ color: templateConfig.accentColor }}>+</div>
                            <div className="absolute bottom-2 right-2 text-[9px] font-mono opacity-60" style={{ color: templateConfig.accentColor }}>+</div>
                        </>
                    )}

                    {photo ? (
                        <img
                            src={photo}
                            alt={displayName}
                            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="text-center font-mono text-gray-500 flex flex-col items-center p-4">
                            <Camera className="w-9 h-9 mb-2 stroke-[1.5]" style={{ color: templateConfig.accentColor }} />
                            <span className="text-[9px] tracking-widest block uppercase text-gray-300 font-bold">
                                PHOTO PREVIEW
                            </span>
                            <span className="text-[8px] tracking-widest block uppercase text-gray-500 mt-1">
                                UPLOAD TO INITIALIZE
                            </span>
                        </div>
                    )}

                    {/* Team Verification Sticker Banner on Photo */}
                    {teamMode === 'team' && selectedTeam && (
                        <div className="absolute bottom-2 left-2 right-2 z-30">
                            {teamValidation.isValid ? (
                                <div className="bg-black/90 backdrop-blur-md border border-[#00F5FF]/60 px-2 py-1 flex items-center justify-between text-[8px] font-mono text-[#00F5FF]">
                                    <span className="font-extrabold uppercase truncate">{selectedTeam.name}</span>
                                    <span className="flex items-center gap-1 font-bold shrink-0">
                                        <ShieldCheck className="w-3 h-3" /> VERIFIED
                                    </span>
                                </div>
                            ) : (
                                <div className="bg-black/90 backdrop-blur-md border border-[#FF2E55] px-2 py-1 flex items-center justify-between text-[8px] font-mono text-[#FF2E55]">
                                    <span className="font-bold uppercase truncate">{selectedTeam.name}</span>
                                    <span className="flex items-center gap-1 font-bold shrink-0">
                                        <AlertTriangle className="w-3 h-3" /> UNVERIFIED
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Card Identity Footer */}
                <div className="relative z-20 flex flex-col justify-end text-left pt-2">

                    {/* Builder Aura / Class Title */}
                    <div className="flex items-center gap-1 mb-1">
                        <Sparkles className="w-3 h-3 shrink-0" style={{ color: templateConfig.accentColor }} />
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${templateConfig.classColor}`}>
                            {builderTitle}
                        </span>
                    </div>

                    {/* Name */}
                    <div className={`text-xl sm:text-2xl leading-none uppercase tracking-wide truncate ${templateConfig.nameColor}`}>
                        {displayName}
                    </div>

                    {/* Stack / Role */}
                    <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider truncate mt-1">
                        {displayRole}
                    </div>

                    {/* Bottom Metadata Bar */}
                    <div className="flex justify-between items-end mt-3 pt-2 border-t border-white/10 text-[8px] font-mono">
                        <div>
                            <span className="text-gray-500 block leading-tight uppercase">MODE</span>
                            <span className="text-white font-bold block uppercase mt-0.5">
                                {teamMode === 'team' && teamValidation.isValid ? selectedTeam.name : 'SOLO BUILDER'}
                            </span>
                        </div>

                        <div className="text-right">
                            <span className="text-gray-500 block leading-tight uppercase">ID CODE</span>
                            <span className="font-bold block uppercase mt-0.5" style={{ color: templateConfig.accentColor }}>
                                {builderId}
                            </span>
                        </div>
                    </div>

                </div>

                {/* Decorative side brackets */}
                {templateConfig.cornerAccents && (
                    <>
                        <div className="absolute top-1/2 -right-[1px] -translate-y-1/2 w-[3px] h-10" style={{ backgroundColor: templateConfig.accentColor }} />
                        <div className="absolute top-1/2 -left-[1px] -translate-y-1/2 w-[3px] h-10 bg-white/20" />
                    </>
                )}

            </div>

            {/* Sub-preview status */}
            <div className="mt-3 flex items-center justify-between w-full max-w-[340px] text-[9px] font-mono text-gray-500 px-1">
                <span>PREVIEW MODE // REALTIME</span>
                <span className="text-sand font-bold uppercase">{templateConfig.name} TEMPLATE</span>
            </div>

        </div>
    );
}
