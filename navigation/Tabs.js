import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import MainScreen from '../screens/MainScreen';
import InfoScreen from '../screens/InfoScreen';
import AboutScreen from '../screens/AboutScreen';

const Tab = createMaterialBottomTabNavigator();

export default function Tabs() {
	return (
		<Tab.Navigator
			shifting={true}
			backBehavior="initialRoute"
			initialRouteName="Main"
		>
			<Tab.Screen
				name="Info"
				component={InfoScreen}
				options={{
					tabBarLabel: 'Info',
					tabBarIcon: 'information-outline',
					tabBarColor: '#ff5200',
				}}
			/>
			<Tab.Screen
				name="Main"
				component={MainScreen}
				options={{
					tabBarLabel: 'Detect',
					tabBarIcon: 'image-filter-center-focus-strong',
					tabBarColor: '#72147e',
				}}
			/>
			<Tab.Screen
				name="About"
				component={AboutScreen}
				options={{
					tabBarLabel: 'About',
					tabBarIcon: 'cards-heart',
					tabBarColor: '#f21170',
				}}
			/>
		</Tab.Navigator>
	);
}
