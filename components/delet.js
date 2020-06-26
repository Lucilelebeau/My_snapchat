import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, View } from 'react-native';
import styles from '../src/style';

export default class Delete extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        token: this.props.token,
        snap_id: this.props.snap_id,
        from: this.props.from,
        duration: this.props.duration
      }
    }

    componentDidMount(){
        console.log(this.state.token)
        console.log(this.state.snap_id)
        this.deleteSnap()
    }

    goToReceive = () => {
        setTimeout(() => {
            this.attend();
          }, 2000);
    }

    attend(){
        Actions.receive({'token': this.state.token})
    }

    deleteSnap =async()=>{
        const {token,snap_id} = this.state;
        
        let bodydata = JSON.stringify({
            id: snap_id
        })
        
        fetch('http://snapi.epitech.eu/seen', {
            method: 'post',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json",
                "token": token
                },
            body: bodydata,
            mode: "cors"
        })
        .then(this.goToReceive())
        /*.then(response => response.json())
        .then(response => {
            console.log(response)
            this.goToReceive()
            if(response.data == "Snap Deleted"){
                console.log(reponse.data)
                this.goToReceive()
            }
        })  */          
    } 

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.title}>End of snap !</Text>
            </View>
        )
    }
}