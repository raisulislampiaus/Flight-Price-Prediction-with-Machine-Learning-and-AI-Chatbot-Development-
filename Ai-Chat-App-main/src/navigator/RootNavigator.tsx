import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabsNavigation } from './BottomTabsNavigation';

const RootStack = createNativeStackNavigator();

export const RootNavigator: React.FC = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="BottomTabs"
        component={BottomTabsNavigation}
        options={{ headerShown: false }}
      />
      
    </RootStack.Navigator>
  );
};