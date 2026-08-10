import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { TEAMS_DATA, validateTeamMember } from '../config/teams';
import { TEMPLATES, getTemplateById } from '../config/templates';
import { generateBuilderTitle, generateBuilderId } from '../utils/builderTitles';

const BuilderContext = createContext(null);

export function BuilderProvider({ children }) {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [teamMode, setTeamMode] = useState('solo'); // 'solo' | 'team'
    const [selectedTeamId, setSelectedTeamId] = useState('');
    const [photo, setPhoto] = useState(null); // Local object URL or base64
    const [selectedTemplateId, setSelectedTemplateId] = useState('goa');
    const [validationError, setValidationError] = useState('');

    // Derived team validation
    const teamValidation = useMemo(() => {
        if (teamMode === 'solo') {
            return { isValid: true, message: 'Solo Builder Mode', team: null };
        }
        if (!selectedTeamId) {
            return { isValid: false, message: 'Please select a team.', team: null };
        }
        return validateTeamMember(selectedTeamId, name);
    }, [teamMode, selectedTeamId, name]);

    const selectedTeam = useMemo(() => {
        if (teamMode === 'solo') return null;
        return TEAMS_DATA.find(t => t.id === selectedTeamId) || null;
    }, [teamMode, selectedTeamId]);

    // Computed builder class title
    const builderTitle = useMemo(() => {
        return generateBuilderTitle(role, name);
    }, [role, name]);

    // Computed Builder ID
    const builderId = useMemo(() => {
        return generateBuilderId(name || 'BUILDER', selectedTeam ? selectedTeam.name : 'SOLO');
    }, [name, selectedTeam]);

    // Selected template object
    const templateConfig = useMemo(() => {
        return getTemplateById(selectedTemplateId);
    }, [selectedTemplateId]);

    // Reset function if needed
    const resetForm = () => {
        setName('');
        setRole('');
        setTeamMode('solo');
        setSelectedTeamId('');
        setPhoto(null);
        setSelectedTemplateId('goa');
        setValidationError('');
    };

    const value = {
        name,
        setName,
        role,
        setRole,
        teamMode,
        setTeamMode,
        selectedTeamId,
        setSelectedTeamId,
        selectedTeam,
        teamValidation,
        photo,
        setPhoto,
        selectedTemplateId,
        setSelectedTemplateId,
        templateConfig,
        builderTitle,
        builderId,
        validationError,
        setValidationError,
        resetForm
    };

    return (
        <BuilderContext.Provider value={value}>
            {children}
        </BuilderContext.Provider>
    );
}

export function useBuilderContext() {
    const context = useContext(BuilderContext);
    if (!context) {
        throw new Error('useBuilderContext must be used within a BuilderProvider');
    }
    return context;
}
