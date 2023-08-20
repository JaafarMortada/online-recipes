import { createContext, useState, useContext } from 'react';

const searchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [search, setSearch] = useState('');
    const updateSearch = (searchUrl) => {
        setSearch(searchUrl);
    };
    return (
        <searchContext.Provider value={{ search, updateSearch }}>
            {children}
        </searchContext.Provider>
    );
};

export const useSearchContext = () => {
    return useContext(searchContext);
};