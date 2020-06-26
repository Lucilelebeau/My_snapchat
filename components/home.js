import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, View, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import styles from '../src/style';
import * as ImagePicker from 'expo-image-picker';

export default class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      image: null,
      token: this.props.token,
      filename: null,
      filetype: '',
      userText:''
    }
  }

  goToList = () => {
    const userText =this.state
    Actions.list({'token': this.state.token,'image': this.state.image, 'filename':this.state.filename, 'filetype':this.state.filetype})
  }
   
  goToReceive = () => {
    Actions.receive({'token': this.state.token})
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };


  _pickImage = async () => {
    
    try {
      
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        noData: true
      });
  
      if (!result.cancelled) {
        this.setState({ image: result.uri });
        let localUri = result.uri;
        let name = 'image'+  Math.random(4000);
        this.setState({filename: name})
        let uri = result.uri
        let cT = uri.match('^data:(image\/[a-z]+);base64,')
        let imgtype = cT[1]
        this.setState({filetype: imgtype})
      }
    }
    catch (E) {
      console.log(E);
    }
  };
  

  render() {
    const { image } = this.state;
         
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../sky.jpg')} style={styles.backgroundImage}>
        {image && 
        <View>
    
        <Text style={{textAlign: 'center'}}>Add comments...</Text>
        <TextInput placeholder={'write here...'} style={styles.buttonAddText} onChangeText={(userText) => this.setState({userText})}></TextInput>
        
        </View>}
       
        {image && <TouchableOpacity ><Text style={styles.buttonSend} onPress={this.goToList}>Send</Text></TouchableOpacity>}
        <View>
          {!image && <TouchableOpacity ><Text style={styles.buttonSend} onPress={this._pickImage}>Send a new Snap</Text></TouchableOpacity>}
        </View>
        <TouchableOpacity style={styles.buttonEnter}>
          <Text style={styles.buttonText} onPress={this.goToReceive}>Check my Snaps</Text>
        </TouchableOpacity>
        {this.props.alert && <Text>{this.props.alert}</Text>}
        </ImageBackground>
      </View>
    );  
  }   
}




