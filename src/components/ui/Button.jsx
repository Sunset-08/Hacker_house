import React from 'react';

/**
 * A bold, high-contrast, gaming-inspired button component styled for HackerHouse Goa.
 */
export default function Button({
    children,
    onClick,
    className = '',
    variant = 'primary',
    type = 'button',
    disabled = false,
    ...props
}) {
    const baseStyle = "relative inline-flex items-center justify-center font-display font-extrabold tracking-wider uppercase text-sm py-3 px-6 transition-all duration-300 transform active:scale-95 select-none clip-button outline-none";

    const variants = {
        primary: "bg-neon-coral text-[#08080C] hover:bg-white hover:text-[#08080C] shadow-lg shadow-neon-coral/10 hover:shadow-white/20 border-r-2 border-b-2 border-transparent hover:border-white",
        secondary: "bg-sand text-[#08080C] hover:bg-white hover:text-[#08080C] shadow-lg shadow-sand/10 hover:shadow-white/20 border-r-2 border-b-2 border-transparent hover:border-white",
        ghost: "bg-transparent text-white border border-[#2E303C]/80 hover:border-beach-teal hover:text-beach-teal shadow-inner hover:shadow-beach-teal/5",
        teal: "bg-beach-teal text-[#08080C] hover:bg-white hover:text-[#08080C] shadow-lg shadow-beach-teal/10 hover:shadow-white/20 border-r-2 border-b-2 border-transparent hover:border-white",
    };

    const activeVariant = variants[variant] || variants.primary;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
        ${baseStyle} 
        ${activeVariant} 
        ${disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}
        ${className}
      `}
            {...props}
        >
            {/* Visual background slide accent */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:animate-[scanline_1.5s_ease-out_infinite]" />

            {/* Decorative details: small corner notch */}
            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>
        </button>
    );
}
