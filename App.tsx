import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Navigation} from './src/Navigation';
import {FavoritesProvider} from './src/Favorites';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <Navigation />
      </FavoritesProvider>
    </QueryClientProvider>
  );
};

export default App;
