import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, View, Image } from 'react-native';
import axios from 'axios';
import styles from '../src/style';
import base64ArrayBuffer from '../src/abTo64'

export default class Snap extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        token: this.props.token,
        snap_id: this.props.snap_id,
        from: this.props.from,
        duration: this.props.duration,
        image:null
      }
    }
    
    componentDidMount(){
        this.viewSnap()
        
    }

    goToDelet = () => {
        Actions.delet({
            'token': this.state.token, 
            'snap_id': this.state.snap_id,
        })
    }

    timing = () => {
        setTimeout(() => {
            this.goToDelet();
        }, this.timeSnap(this.state.duration))
    }
    
    timeSnap(sec){
        sec = sec + "000"
        console.log(sec)
        return sec
    }

    viewImage = () => {
        Actions.modal({
            'image': this.state.image,
            'duration': this.state.duration,
            'snap_id': this.state.snap_id,
            'token' : this.state.token    
        })
    }

    async viewSnap(){
        try{
            let resp = await axios.get('http://snapi.epitech.eu/snap/'+this.state.snap_id,{
                headers: {"token": this.state.token},
                responseType: 'arraybuffer'
            })
            let result= base64ArrayBuffer(resp.data)
            let imageUri = "data:image/jpg;base64," + result;
            this.setState({image: imageUri})
            this.timing()
            
        }
        catch(error){
            console.log(error);
        }
    }

    render(){
        return (
            <View>
                <Text style={styles.title}>... Loading ...</Text>
                <Image source={this.state.image && this.state.image ? {uri: this.state.image} : null} style={{ width: 400, resizeMode: "contain", height: 300, backgroundColor: "black", borderColor: 'red' }} />
            </View>
        )
    }
}
