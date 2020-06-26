import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import styles from '../src/style';


export default class Timing extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        to: this.props.userMail,
        token: this.props.token,
        image: this.props.image,
        duration: "",
        filename: this.props.filename,
        filetype: this.props.filetype
      }
    }

    goToHome = () => {
      Actions.home({'token': this.state.token})
    }

       uploadImageAsync = async () =>  {
           const {uri, token} = this.state.image
        let apiUrl = 'http://snapi.epitech.eu/snap';
      
        // Note:
        // Uncomment this if you want to experiment with local server
        //
        // if (Constants.isDevice) {
        //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
        // } else {
        //   apiUrl = `http://localhost:3000/upload`
        // }
      
        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];
      
        let formData = new FormData();
        formData.append('image', {
          uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      
        let options = {
          method: 'POST',
          body: formData,
          headers: {
            'token': token,
            'Content-Type': 'multipart/form-data',
          },
        };
      
        return fetch(apiUrl, options);
      }

    sendSnap =async()=>{
        const {to,token,image,duration,filetype,filename} = this.state;
        console.log(token)
        console.log(duration)
        console.log(to)
        console.log(image)
        console.log(filename)
        console.log(filetype)

        
        
        
        // let regex = /data:(image\/[a-z]+);base64,/g;
        // var b64Data = regex.exec(image);
        // console.log(b64Data)
        // let newimage = image.replace(b64Data[0],'')
        // console.log(newimage)
       
        // var blob = b64toBlob(newimage, b64Data[0]);
        // console.log(blob)
        // var blobUrl = URL.createObjectURL(blob);
        
        let formdata = new FormData()
        formdata.append('duration', duration)
        formdata.append('to', to)
        formdata.append('image', {uri:image, name: 'photo.jpg',
        type: 'image/jpg'});
          
       
        fetch('http://snapi.epitech.eu/snap', {
            method: 'post',
            dataType: 'json',
            headers: { 
                "Content-Type": "multipart/form-data",
                'token': token
                },
            body: formdata,
            
            })
        .then(response => response.json())
        .then(response => {
            
            console.log(response)
            if(response.data == 'Snap Created'){
                console.log(response.data)
                this.goToHome({'alert':'Your Snap has been sent !'});
            }
            else{
                this.goToHome({'alert':'Sorry, something went wrong !'});
            }
        })
        .catch((error) => {
            console.error(error);
            console.log('catch')
          });
    }

    render(){
        return (
            <View>
                <TextInput style={styles.inputBox}
                onChangeText={(duration) => this.setState({duration})}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Timing in sec"
                placeholderTextColor = "#002f6c"
                selectionColor="#fff"
                keyboardType="numeric"
                />
                <TouchableOpacity> 
                    <Text style={styles.buttonSend} onPress={this.sendSnap}> Send</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

