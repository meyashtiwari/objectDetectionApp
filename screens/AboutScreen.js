import React from 'react';
import { Paragraph, List } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import AppBar from '../components/AppBar';

import { AboutData, DeveloperList } from '../data/AboutScreenData';

export default function AboutScreen() {
	return (
		<View style={styles.container}>
			<View style={styles.appBarContainer}>
				<AppBar appBarHeading="About" accentColor="#f21170" />
			</View>
			<View style={styles.contentContainer}>
				<View style={styles.topSection}>
					<Paragraph style={styles.description}>
						{AboutData.description}
					</Paragraph>
				</View>
				<View style={styles.bottomSection}>
					<List.Section>
						<List.Subheader style={styles.subHeading}>
							Developed By
						</List.Subheader>
						{DeveloperList.map((data, index) => {
							return (
								<List.Item
									key={index}
									style={styles.content}
									title={data.title}
									description={data.desc}
									left={() => <List.Icon icon={data.icon} />}
								/>
							);
						})}
					</List.Section>
				</View>
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
	description: {
		textAlign: 'center',
		color: 'black',
	},
	subHeading: {
		textAlign: 'center',
		color: 'black',
	},
	topSection: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		margin: '2%',
	},
	bottomSection: {
		flex: 2,
	},
	content: {
		backgroundColor: '#f21170',
	},
});
