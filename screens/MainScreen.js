import React, { useState, useEffect } from 'react';
import { Text, Button, Title } from 'react-native-paper';
import { Modal, Portal, Provider } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import MLModule from '../MLKit/MLModule';

export default function MainScreen() {
	const [hasPermission, setHasPermission] = useState(null);
	const [camera, setCamera] = useState(null);
	const [labels, setLabels] = useState([]);
	const [visible, setVisible] = React.useState(false);

	const type = Camera.Constants.Type.back;
	const isFocused = useIsFocused();

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	const takePicture = async () => {
		if (camera) {
			const data = await camera.takePictureAsync(null);
			const result = await MLModule.imageAnalyzer(data.uri);
			setLabels(result);
			showModal();
		}
	};

	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View style={styles.container}>
			<View style={styles.cameraContainer}>
				{isFocused && (
					<Camera
						useCamera2Api="true"
						autoFocus="true"
						ref={(ref) => setCamera(ref)}
						style={styles.fixedRatio}
						type={type}
						ratio={'1:1'}
					/>
				)}
			</View>
			<View style={styles.buttonContainer}>
				<Button
					icon="camera"
					color="#72147e"
					mode="contained"
					onPress={() => takePicture()}
				>
					Detect Object
				</Button>
			</View>
			<Provider>
				<Portal>
					<Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
						<Title style={styles.text}>{labels}</Title>
					</Modal>
				</Portal>
			</Provider>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	cameraContainer: {
		flex: 4,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
	fixedRatio: {
		flex: 1,
		aspectRatio: 1,
	},
	buttonContainer: {
		flex: 0.5,
		backgroundColor: 'transparent',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: '10%',
	},
	containerStyle: {
		backgroundColor: 'white',
		padding: 20,
		alignItems: 'center',
	},
	text: {
		color: 'black',
		fontWeight: "700",
	},
});
