import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  let opneShareDialogAsync = async () => {
    if(Platform.OS === 'web'){
      alert('Sharing is not available on your platfomr');
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  }; 

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <TouchableOpacity
          onPress={opneShareDialogAsync}
          style={styles.button}
        >
            <Text style={styles.textButton}>Share this photo!</Text>
        </TouchableOpacity>
      </View>
    );
  }


  return (
    <View style={styles.container}>

    <Image source={{uri:'https://i.imgur.com/TkIrScD.png'}}  style={styles.image}></Image>

      <Text style={styles.title}>Selet an image to share</Text>

      <TouchableOpacity
        onPress={openImagePickerAsync}
        style={styles.button}
      >
        <Text style={styles.textButton} >Select a photo</Text>
      </TouchableOpacity>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    width: '300px',
    height: '300px',
    resizeMode: 'contain'
  },
  title: {
    color: '#fff',
    fontSize: '16px',
    marginBottom: '10px'
  },
  button: {
    backgroundColor: '#00AEFF',
    padding: '10px',
    borderRadius: "5px"
  },
  textButton: {
    fontSize: '20px',
    color: '#fff'
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  }
});
