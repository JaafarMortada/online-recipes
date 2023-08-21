import { createContext, useState, useContext } from 'react';

const showShoppingList = createContext();

export const ShoppingListStateProvider = ({ children }) => {
    const [shoppingListIsShown, setShoppingListIsShown] = useState(false);

    return (
        <showShoppingList.Provider value={{ shoppingListIsShown, setShoppingListIsShown }}>
            {children}
        </showShoppingList.Provider>
    );
};

export const useShoppingListState = () => {
    return useContext(showShoppingList);
};