import * as React from 'react';
import { Title } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

export default function AppBar({ appBarHeading, accentColor }) {
	return (
		<View style={[styles.appBar, { backgroundColor: `${accentColor}` }]}>
			<Title style={styles.title}>{appBarHeading}</Title>
		</View>
	);
}

const styles = StyleSheet.create({
	appBar: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		paddingTop: 10,
		color: '#fff',
	},
});
