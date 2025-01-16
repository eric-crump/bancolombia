'use client'

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import Personalize from '@contentstack/personalize-edge-sdk';

// const defpersonalizeConfig = {
//     audiences: {},
//     taxonomy_path: ''
// }

const PersonalizationContext = createContext({
    isInitialized: false,
    personalizationSDK: Personalize,
    // personalizeConfig: defpersonalizeConfig
});

export const usePersonalization = () => {
    return useContext(PersonalizationContext);
};

const PersonalizationProvider = ({ children }) => {

    const [personalizeConfig, setPersonalizeConfig] = useState({})

    const [isInitialized, setIsInitialized] = useState(false);

    const initializePersonalizationSDK = async () => {
        try {
            
            Personalize.setEdgeApiUrl("https://personalize-edge.contentstack.com");

            await Personalize.init(
                process.env.CONTENTSTACK_PERSONALIZATION,
                {
                    edgeMode: true,
                    // request
                }
            );

            console.log(Personalize.getExperiences())
            
        }

        catch(e) {
            console.log({initError: e})
        }
    };

    useEffect(() => {
        initializePersonalizationSDK().then(() => {
            setIsInitialized(true);
        });
    }, []);

    return (
        
        <PersonalizationContext.Provider
            value={{ isInitialized, Personalize, personalizeConfig }}
        >
            {isInitialized && children}
        </PersonalizationContext.Provider>
    );
};


export default PersonalizationProvider;