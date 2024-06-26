import React, { createContext, useState, useContext } from 'react';

const ProjectContext = createContext();

export const useProject = () => {
    return useContext(ProjectContext);
};

export const ProjectProvider = ({ children }) => {
    const [project, setProject] = useState(null);

    return (
        <ProjectContext.Provider value={{ project, setProject }}>
            {children}
        </ProjectContext.Provider>
    );
};
