import React, { useState, useEffect } from 'react';
import { Text, Button, Appbar } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';

export default function MainScreen() {
	const [hasPermission, setHasPermission] = useState(null);
	const [camera, setCamera] = useState(null);
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
		}
	};

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
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	cameraContainer: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
	fixedRatio: {
		flex: 1,
		aspectRatio: 1,
	},
	buttonContainer: {
		flex: 1,
		backgroundColor: 'transparent',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
