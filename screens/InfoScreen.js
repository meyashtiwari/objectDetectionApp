import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import AppBar from '../components/AppBar';

import { InfoData } from '../data/InfoScreenData';

export default function InfoScreen() {
	return (
		<View style={styles.container}>
			<View style={styles.appBarContainer}>
				<AppBar appBarHeading="Information" accentColor="#ff5200" />
			</View>
			<View style={styles.contentContainer}>
				{InfoData.map((data, index) => {
					return (
						<Card style={styles.card} key={index}>
							<Card.Content>
								<Title>{data.title}</Title>
								<Paragraph>{data.desc}</Paragraph>
							</Card.Content>
						</Card>
					);
				})}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	appBarContainer: {
		flex: 0.1,
	},
	contentContainer: {
		flex: 1,
	},
	card: {
		marginBottom: '3%',
		marginTop: '2%',
	},
});
