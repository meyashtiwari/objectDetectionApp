import React from 'react';

import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import Tabs from './navigation/Tabs';

export default function App() {
	return (
		<PaperProvider>
			<NavigationContainer>
				<Tabs />
			</NavigationContainer>
		</PaperProvider>
	);
}
