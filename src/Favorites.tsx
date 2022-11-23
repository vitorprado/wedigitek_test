import React, {useEffect, useState} from 'react';
import {AsyncStorage} from 'react-native';

export interface FavoritesContextType {
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const FavoritesContext = React.createContext<FavoritesContextType>({
  toggleFavorite: () => {},
  isFavorite: () => false,
});

type Props = {
  children: JSX.Element;
};

export const FavoritesProvider = ({children}: Props) => {
  const [currentFavorites, setCurrentFavorites] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('favorites').then(value => {
      if (value) {
        setCurrentFavorites(JSON.parse(value));
      }
    });
  }, []);

  const updateFavorites = (id: string) => {
    let newFavorites;
    if (currentFavorites.includes(id)) {
      newFavorites = currentFavorites.filter(item => item !== id);
    } else {
      newFavorites = [...currentFavorites, id];
    }
    setCurrentFavorites(newFavorites);
    currentFavorites.push(id);
    AsyncStorage.setItem('favorites', JSON.stringify(newFavorites)).then();
  };

  const isFavorite = (id: string): boolean => {
    return currentFavorites.includes(id);
  };

  const favoritesContextProvider: FavoritesContextType = {
    toggleFavorite: updateFavorites,
    isFavorite: isFavorite,
  };

  return (
    <FavoritesContext.Provider value={favoritesContextProvider}>
      {children}
    </FavoritesContext.Provider>
  );
};
