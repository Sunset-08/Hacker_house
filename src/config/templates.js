/**
 * Configuration-driven Template System for Builder ID Cards.
 * Each template defines visually distinct styling, backgrounds, color palettes,
 * borders, font styles, and badge accents.
 */

export const TEMPLATES = [
    {
        id: 'goa',
        name: 'Goa',
        tag: 'TROPICAL CYBER',
        description: 'Warm coastal vibes infused with high-contrast cyber elements',
        badge: 'GOA // 2026',
        accentColor: '#FF5B35', // Neon Coral
        bgClass: 'bg-dark-card border-[#FF5B35]/40',
        headerBg: 'bg-[#FF5B35]/10 border-b border-[#FF5B35]/30',
        badgeClass: 'bg-[#FF5B35]/20 text-[#FF5B35] border-[#FF5B35]/40',
        photoBorder: 'border-2 border-[#FF5B35]/50 group-hover:border-[#FF5B35]',
        titleColor: 'text-[#FF5B35]',
        nameColor: 'text-white font-display font-black',
        classColor: 'text-[#F5D061]', // Sand Gold
        teamColor: 'text-[#00F5FF]', // Teal
        overlayClass: 'bg-gradient-to-tr from-[#FF5B35]/10 via-transparent to-[#00F5FF]/10',
        hudGrid: 'dot-grid',
        cornerAccents: true,
        styleVariant: 'goa-card'
    },
    {
        id: 'minimal',
        name: 'Minimal',
        tag: 'SWISS BRUTALIST',
        description: 'Clean monochrome typography, high contrast, distraction-free',
        badge: 'MIN // SPEC',
        accentColor: '#FFFFFF',
        bgClass: 'bg-zinc-950 border-zinc-700',
        headerBg: 'bg-zinc-900/80 border-b border-zinc-800',
        badgeClass: 'bg-zinc-800 text-zinc-200 border-zinc-700',
        photoBorder: 'border border-zinc-700',
        titleColor: 'text-zinc-400',
        nameColor: 'text-white font-mono font-bold tracking-tight',
        classColor: 'text-zinc-300',
        teamColor: 'text-zinc-400',
        overlayClass: 'bg-transparent',
        hudGrid: '',
        cornerAccents: false,
        styleVariant: 'minimal-card'
    },
    {
        id: 'dark',
        name: 'Dark',
        tag: 'ELECTRIC MIDNIGHT',
        description: 'Deep midnight void with glowing neon cyan accents & matrix grid',
        badge: 'CYAN // VOID',
        accentColor: '#00F5FF', // Beach Teal / Cyan
        bgClass: 'bg-[#060B12] border-[#00F5FF]/40',
        headerBg: 'bg-[#00F5FF]/10 border-b border-[#00F5FF]/30',
        badgeClass: 'bg-[#00F5FF]/20 text-[#00F5FF] border-[#00F5FF]/40',
        photoBorder: 'border-2 border-[#00F5FF]/50 shadow-[0_0_15px_rgba(0,245,255,0.2)]',
        titleColor: 'text-[#00F5FF]',
        nameColor: 'text-white font-display font-extrabold',
        classColor: 'text-[#00F5FF]',
        teamColor: 'text-white',
        overlayClass: 'bg-gradient-to-b from-[#00F5FF]/15 via-transparent to-[#00F5FF]/5',
        hudGrid: 'dot-grid-teal',
        cornerAccents: true,
        styleVariant: 'dark-card'
    },
    {
        id: 'chaotic',
        name: 'Chaotic',
        tag: 'RAW GLITCH',
        description: 'Asymmetric cyber slashes, warning banners, raw glitch energy',
        badge: 'SYSTEM // CORRUPT',
        accentColor: '#FF2E55', // Hot Neon Pink/Red
        bgClass: 'bg-[#0D0509] border-[#FF2E55]/60',
        headerBg: 'bg-[#FF2E55]/20 border-b-2 border-[#FF2E55]',
        badgeClass: 'bg-[#FF2E55] text-black font-black border-none animate-pulse-slow',
        photoBorder: 'border-2 border-dashed border-[#FF2E55]',
        titleColor: 'text-[#FF2E55]',
        nameColor: 'text-white font-mono font-black uppercase tracking-wider',
        classColor: 'text-[#FF5B35]',
        teamColor: 'text-[#F5D061]',
        overlayClass: 'bg-gradient-to-br from-[#FF2E55]/20 via-transparent to-black/80',
        hudGrid: 'dot-grid',
        cornerAccents: true,
        styleVariant: 'chaotic-card'
    },
    {
        id: 'experimental',
        name: 'Experimental',
        tag: 'RETRO SYNTH',
        description: 'Golden hour sand tones, retro arcade HUD grids & warm aura glow',
        badge: 'RETRO // PROTO',
        accentColor: '#F5D061', // Sand Gold
        bgClass: 'bg-[#120F08] border-[#F5D061]/40',
        headerBg: 'bg-[#F5D061]/10 border-b border-[#F5D061]/30',
        badgeClass: 'bg-[#F5D061]/20 text-[#F5D061] border-[#F5D061]/40',
        photoBorder: 'border-2 border-[#F5D061]/50',
        titleColor: 'text-[#F5D061]',
        nameColor: 'text-white font-display font-black',
        classColor: 'text-[#F5D061]',
        teamColor: 'text-[#FF5B35]',
        overlayClass: 'bg-gradient-to-t from-[#F5D061]/10 via-transparent to-transparent',
        hudGrid: 'dot-grid-gold',
        cornerAccents: true,
        styleVariant: 'experimental-card'
    }
];

export function getTemplateById(id) {
    return TEMPLATES.find(t => t.id === id) || TEMPLATES[0];
}
