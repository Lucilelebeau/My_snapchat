import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { ListItem } from "react-native-elements";
import axios from 'axios';
import styles from '../src/style';

export default class Timing extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        token: this.props.token,
        snaps: [],
        snap_id: '',
        from: '',
        duration:''
      }
    }

    goToSnap = () => {
        Actions.snap({
            'token': this.state.token, 
            'snap_id': this.state.snap_id,
            'from': this.state.from,
            'duration': this.state.duration
        })
    }

    componentDidMount(){
        this.getSnaps()
    }

    async getSnaps(){
        try{
          let resp = await axios.get('http://snapi.epitech.eu/snaps',{
            headers: {"token": this.props.token}
          })
          console.log(resp.data.data)
          this.setState({snaps: resp.data.data})
          //this.setState({snap_id: })
        }
        catch(error){
          console.log(error);
        }
    }

    goToDetail = (i, id, snapFrom, snapDuration) => {
        //console.log(item)
        this.setState({from: snapFrom})
        this.setState({duration: snapDuration})
        this.setState({snap_id: id});
        setTimeout(() => {
          this.attend();
        }, 1000);
        
      }
  
      attend(){
        console.log(this.state.snap_id)
        console.log(this.state.from)
        console.log(this.state.duration)
        this.goToSnap()
      }
    
      goToHome = () => {
        Actions.home({'token': this.state.token })
      }


    render(){
        return (
            <View style={styles.container}>
              <ScrollView persistentScrollbar={true}>
                <Text style={styles.title}>My Snap-box</Text>
                {this.state.snaps.map((item, i) => (
                <ListItem 
                  value={item.snap_id}
                  button onPress={(i) => this.goToDetail(i, item.snap_id, item.from, item.duration)}
                  key={i}
                  leftAvatar={{ source: { uri: "https://www.shareicon.net/data/2015/12/07/197449_avatar_128x128.png"}, containerStyle: { marginRight: 5 }  }}
                  title={item.from}
                  // subtitle={item.duration}
                  badge={{ value: item.duration , textStyle: { color: 'white' }, containerStyle: { marginLeft: 5 } }}
                />
                ))}
                <TouchableOpacity> 
                  <Text style={styles.buttonSend} onPress={this.goToHome}>Back</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
        )
    }
}

