/**
 * Deterministic Builder Title / Class Generator for HackerHouse Goa 2026.
 * Evaluates role, stack, name, or team inputs to compute a shareable hacker title.
 */

const TITLE_RULES = [
    { keywords: ['solana', 'rust', 'anchor', 'svm'], title: 'THE RUST MAGICEER' },
    { keywords: ['smart contract', 'solidity', 'evm', 'web3', 'crypto'], title: 'THE PROTOCOL WARLOCK' },
    { keywords: ['agent', 'ai', 'llm', 'rag', 'neural', 'prompt'], title: 'THE AGENTIC MENACE' },
    { keywords: ['fullstack', 'full stack', 'next', 'react', 'frontend', 'ui', 'ux'], title: 'THE SHIP-IT ENGINEER' },
    { keywords: ['backend', 'infra', 'devops', 'database', 'docker', 'system'], title: 'THE SYSTEM BREAKER' },
    { keywords: ['security', 'auditor', 'exploit', 'zk', 'zero knowledge', 'proof'], title: 'THE CIPHERPUNK SPECTRE' },
    { keywords: ['designer', 'creative', 'css', 'tailwind', 'figma'], title: 'THE AESTHETIC ARCHITECT' },
    { keywords: ['founder', 'hustler', 'product', 'pm', 'lead'], title: 'THE CHAOS DIRECTOR' },
    { keywords: ['debug', 'bug', 'fix', 'qa', 'test'], title: 'THE DEBUGGING WIZARD' }
];

const FALLBACK_TITLES = [
    'THE CHAOS BUILDER',
    'THE SYSTEM BREAKER',
    'THE SHIP-IT ENGINEER',
    'THE DEBUGGING WIZARD',
    'THE AURA OPERATOR',
    'THE SPEED RUNNER',
    'THE PROTOCOL PHANTOM',
    'THE BYTE SURFER'
];

/**
 * Computes a deterministic builder title based on user inputs.
 * @param {string} role - Entered stack or role
 * @param {string} name - Participant name
 * @returns {string} Builder Class Title
 */
export function generateBuilderTitle(role = '', name = '') {
    const combinedInput = `${role} ${name}`.toLowerCase().trim();

    if (!combinedInput) {
        return 'THE CHAOS BUILDER';
    }

    // Check keyword matches first
    for (const rule of TITLE_RULES) {
        if (rule.keywords.some(kw => combinedInput.includes(kw))) {
            return rule.title;
        }
    }

    // Deterministic hash fallback
    let hash = 0;
    for (let i = 0; i < combinedInput.length; i++) {
        hash = (hash << 5) - hash + combinedInput.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }

    const index = Math.abs(hash) % FALLBACK_TITLES.length;
    return FALLBACK_TITLES[index];
}

/**
 * Generates a unique Builder ID string (e.g., HHG-26-A7F42)
 * @param {string} name
 * @param {string} team
 * @returns {string}
 */
export function generateBuilderId(name = '', team = '') {
    const seed = `${name}-${team}-GOA2026`;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = (hash << 5) - hash + seed.charCodeAt(i);
        hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).toUpperCase().padStart(5, '0').slice(0, 5);
    return `HHG-26-${hex}`;
}
