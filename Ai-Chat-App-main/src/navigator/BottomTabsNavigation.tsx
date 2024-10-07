import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/HomeScreen';
import Presiction from '../screen/Presiction';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Charts from '../screen/Charts';
import Chat from '../screen/Chat';

const BottomTabs = createBottomTabNavigator();

export const BottomTabsNavigation: React.FC = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        tabBarStyle: {backgroundColor: '#fff', height: 70},
        tabBarInactiveTintColor: '#6366f1',
        tabBarActiveTintColor: 'red',
        tabBarLabelStyle: {
          fontSize: 14,
        },
        headerShown: false,
      }}>
      <BottomTabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={30} />
          ),
        }}
      />
        <BottomTabs.Screen
        name="Charts"
        component={Charts}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="line-chart" color={color} size={30} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Prediction"
        component={Presiction}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="online-prediction" color={color} size={30} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AI Chat"
        component={Chat}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="chat" color={color} size={30} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};
