import React, { useState } from 'react';
import { useBuilderContext } from '../../context/BuilderContext';
import { TEAMS_DATA } from '../../config/teams';
import { Users, CheckCircle2, AlertTriangle, Search, ShieldCheck } from 'lucide-react';

export default function TeamSelector() {
    const {
        teamMode,
        setTeamMode,
        selectedTeamId,
        setSelectedTeamId,
        selectedTeam,
        teamValidation,
        name
    } = useBuilderContext();

    const [searchQuery, setSearchQuery] = useState('');

    const filteredTeams = TEAMS_DATA.filter(team =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.tagline.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-4 text-left">

            {/* Micro Header */}
            <div className="flex items-center justify-between border-b border-[#2E303C]/40 pb-2">
                <span className="text-[10px] font-mono text-neon-coral font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> 2. ALLIANCE / TEAM MODE
                </span>
                <span className="text-[9px] font-mono text-gray-500 uppercase">
                    CHOOSE SOLO OR TEAM
                </span>
            </div>

            {/* Mode Switch Buttons */}
            <div className="grid grid-cols-2 gap-3">
                <button
                    type="button"
                    onClick={() => setTeamMode('solo')}
                    className={`py-3 px-4 text-xs font-mono font-extrabold tracking-widest uppercase transition-all flex items-center justify-center gap-2 border ${teamMode === 'solo'
                            ? 'bg-neon-coral text-black border-neon-coral shadow-[0_0_15px_rgba(255,91,53,0.3)]'
                            : 'bg-[#08080C] text-gray-400 border-border-card hover:text-white hover:border-gray-600'
                        }`}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    [ SOLO BUILDER ]
                </button>

                <button
                    type="button"
                    onClick={() => setTeamMode('team')}
                    className={`py-3 px-4 text-xs font-mono font-extrabold tracking-widest uppercase transition-all flex items-center justify-center gap-2 border ${teamMode === 'team'
                            ? 'bg-[#00F5FF] text-black border-[#00F5FF] shadow-[0_0_15px_rgba(0,245,255,0.3)]'
                            : 'bg-[#08080C] text-gray-400 border-border-card hover:text-white hover:border-gray-600'
                        }`}
                >
                    <Users className="w-3.5 h-3.5" />
                    [ TEAM ALLIANCE ]
                </button>
            </div>

            {/* Team Mode Content */}
            {teamMode === 'team' && (
                <div className="space-y-3 pt-1 animate-fadeIn">

                    {/* Search & Selector Input */}
                    <div>
                        <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                            Search & Select Registered Team
                        </label>

                        <div className="relative mb-2">
                            <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-3" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search team name..."
                                className="w-full bg-[#08080C] border border-border-card focus:border-[#00F5FF] py-2.5 pl-9 pr-3 text-xs text-white uppercase placeholder-gray-600 outline-none"
                            />
                        </div>

                        {/* Team Options Grid */}
                        <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1 border border-border-card bg-[#08080C]/80 p-2 scrollbar-thin">
                            {filteredTeams.length > 0 ? (
                                filteredTeams.map((team) => (
                                    <div
                                        key={team.id}
                                        onClick={() => setSelectedTeamId(team.id)}
                                        className={`p-2.5 cursor-pointer text-left transition-all border ${selectedTeamId === team.id
                                                ? 'bg-[#00F5FF]/10 border-[#00F5FF] text-white'
                                                : 'bg-zinc-950/60 border-transparent hover:border-gray-700 text-gray-300'
                                            }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="font-mono font-bold text-xs uppercase">
                                                {team.name}
                                            </span>
                                            <span className="text-[8px] font-mono text-[#00F5FF] border border-[#00F5FF]/30 px-1">
                                                {team.logoBadge}
                                            </span>
                                        </div>
                                        <p className="text-[9px] font-sans text-gray-400 truncate mt-0.5">
                                            {team.tagline}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-[10px] font-mono text-gray-500 py-3 text-center uppercase">
                                    No team found matching "{searchQuery}"
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Team Validation Result Banner */}
                    {selectedTeamId && (
                        <div className="mt-3">
                            {teamValidation.isValid ? (
                                <div className="bg-[#00F5FF]/10 border border-[#00F5FF]/40 p-3 flex items-start justify-between">
                                    <div className="space-y-0.5">
                                        <span className="text-[9px] font-mono text-gray-400 uppercase block">TEAM</span>
                                        <span className="text-sm font-mono font-black text-white uppercase block">
                                            {selectedTeam?.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 bg-[#00F5FF]/20 text-[#00F5FF] text-[9px] font-mono py-1 px-2 uppercase font-bold border border-[#00F5FF]/40">
                                        <CheckCircle2 className="w-3.5 h-3.5" /> ✓ VERIFIED
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-[#FF2E55]/10 border border-[#FF2E55]/40 p-3 flex items-start gap-2 text-[#FF2E55]">
                                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                                    <div>
                                        <span className="text-xs font-mono font-bold uppercase block">
                                            UNVERIFIED MEMBER
                                        </span>
                                        <p className="text-[10px] font-mono text-gray-300 mt-0.5">
                                            {teamValidation.message}
                                        </p>
                                        {!name.trim() && (
                                            <p className="text-[9px] font-mono text-amber-400 mt-1 uppercase">
                                                Tip: Type your name above to match the team roster (e.g. Souza, Thushar, Rohan).
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                </div>
            )}

        </div>
    );
}
