import React from 'react';

/**
 * A sci-fi, gaming-inspired Card container with technical corner accents,
 * border highlights, and optional sub-headers. Fits the HackerHouse Goa aesthetic.
 */
export default function Card({
    children,
    title,
    subtitle,
    className = '',
    headerAction,
    variant = 'normal',
    ...props
}) {
    return (
        <div
            className={`
        relative bg-dark-card border border-border-card p-6 shadow-2xl transition-all duration-300
        hover:border-neon-coral/30 hover:shadow-neon-coral/3 group
        ${className}
      `}
            {...props}
        >
            {/* Reticle Corner Brackets (┌ ┐ └ ┘) */}
            <span className="absolute top-[-1px] left-[-1px] w-2 h-2 border-t-2 border-l-2 border-neon-coral opacity-40 group-hover:opacity-100 transition-opacity" />
            <span className="absolute top-[-1px] right-[-1px] w-2 h-2 border-t-2 border-r-2 border-neon-coral opacity-40 group-hover:opacity-100 transition-opacity" />
            <span className="absolute bottom-[-1px] left-[-1px] w-2 h-2 border-b-2 border-l-2 border-neon-coral opacity-40 group-hover:opacity-100 transition-opacity" />
            <span className="absolute bottom-[-1px] right-[-1px] w-2 h-2 border-b-2 border-r-2 border-neon-coral opacity-40 group-hover:opacity-100 transition-opacity" />

            {/* Subtle top indicator bar */}
            <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#FF5B35]/20 to-transparent group-hover:via-[#FF5B35]/60 transition-all duration-500" />

            {/* Header Container */}
            {(title || subtitle || headerAction) && (
                <div className="flex items-center justify-between border-b border-[#2E303C]/60 pb-4 mb-5">
                    <div>
                        {title && (
                            <h3 className="font-display font-extrabold text-lg uppercase tracking-wider text-white flex items-center gap-2">
                                <span className="w-1.5 h-3 bg-neon-coral inline-block clip-slanted" />
                                {title}
                            </h3>
                        )}
                        {subtitle && (
                            <p className="text-xs text-gray-400 font-sans tracking-wide mt-1 uppercase">
                                {subtitle}
                            </p>
                        )}
                    </div>
                    {headerAction && (
                        <div className="flex items-center">
                            {headerAction}
                        </div>
                    )}
                </div>
            )}

            {/* Body Content */}
            <div className="relative z-10 font-sans">
                {children}
            </div>

            {/* Small tech details on the footer block */}
            <div className="mt-4 flex items-center justify-between text-[9px] font-mono text-gray-500/60 select-none uppercase tracking-widest pt-2 border-t border-[#2E303C]/30">
                <div>SYS_LOC // GOA_IN</div>
                <div>SYS_REF.ID_{Math.floor(1000 + Math.random() * 9000)}</div>
            </div>
        </div>
    );
}
