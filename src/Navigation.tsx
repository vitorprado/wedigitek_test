import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RestaurantList} from './screens/RestaurantList';
import {RestaurantShow} from './screens/RestaurantShow';
const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'home'}>
        <Stack.Screen name={'home'} component={RestaurantList} />
        <Stack.Screen name={'details'} component={RestaurantShow} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
