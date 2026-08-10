/**
 * Static teams dataset and validation rules for HackerHouse Goa 2026.
 * Designed to be easily replaced by an API / Database service in future phases.
 */

export const TEAMS_DATA = [
    {
        id: 'phantom-ai',
        name: 'PHANTOM AI',
        tagline: 'Autonomous AI Agents & Proof Systems',
        members: ['Souza', 'Souza De Goa', 'Thushar', 'Alice', 'Bob', 'Carlos', 'Elena', 'Vikram'],
        verified: true,
        logoBadge: '✦ AI_AGENT'
    },
    {
        id: 'cyber-goa',
        name: 'CYBER GOA',
        tagline: 'Coastal Cypherpunks & Hardware Hacks',
        members: ['Rohan', 'Priya', 'Anand', 'Tanya', 'Karan'],
        verified: true,
        logoBadge: '⚡ HARDWARE'
    },
    {
        id: 'degen-labs',
        name: 'DEGEN LABS',
        tagline: 'High-Frequency DeFi & Yield Experiments',
        members: ['Alex', 'Satoshi', 'Vitalik', 'Chad', 'DegenOne'],
        verified: true,
        logoBadge: '🔥 DEFI'
    },
    {
        id: 'zero-knowledge',
        name: 'ZK GOA',
        tagline: 'Zero-Knowledge Proofs & Privacy Infra',
        members: ['Groth', 'Plonk', 'Stark', 'ZkDev', 'Niya'],
        verified: true,
        logoBadge: '🔒 PRIVACY'
    },
    {
        id: 'chaos-squad',
        name: 'CHAOS SQUAD',
        tagline: 'Full Stack Breakers & Rapid Prototypers',
        members: ['Neo', 'Trinity', 'Morpheus', 'Cipher', 'Ghost'],
        verified: true,
        logoBadge: '💀 CHAOS'
    },
    {
        id: 'matrix-protocol',
        name: 'MATRIX PROTOCOL',
        tagline: 'Distributed Nodes & Peer Mesh Networks',
        members: ['Agent Smith', 'Oracle', 'Seraph', 'Keymaker'],
        verified: true,
        logoBadge: '🌐 MESH'
    }
];

/**
 * Validates whether a participant belongs to a given team.
 * @param {string} teamId - The selected team ID
 * @param {string} participantName - The entered participant name
 * @returns {{ isValid: boolean, message: string, team?: object }}
 */
export function validateTeamMember(teamId, participantName) {
    if (!teamId) {
        return { isValid: false, message: 'No team selected.' };
    }

    const team = TEAMS_DATA.find(t => t.id === teamId || t.name.toLowerCase() === teamId.toLowerCase());

    if (!team) {
        return { isValid: false, message: 'Selected team does not exist in HH Goa registry.' };
    }

    if (!participantName || participantName.trim().length === 0) {
        return { isValid: false, message: 'Please enter your name to verify team membership.' };
    }

    const cleanInputName = participantName.trim().toLowerCase();

    // Check exact or partial match in team roster
    const isMember = team.members.some(member => {
        const cleanMember = member.toLowerCase();
        return cleanInputName.includes(cleanMember) || cleanMember.includes(cleanInputName);
    });

    if (isMember) {
        return {
            isValid: true,
            message: 'Team membership verified',
            team
        };
    } else {
        return {
            isValid: false,
            message: `That team doesn't appear to contain this builder.`,
            team
        };
    }
}
