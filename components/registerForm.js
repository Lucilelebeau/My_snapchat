import React from 'react';
import { Text, View, TextInput, TouchableOpacity, ImageBackground} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from '../src/style';

export default class RegisterForm extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            email:'',
            password:'',
            isLoggingIn: false,
            proceed: false,
        }
    }

    goToHome = () => {
        Actions.home()
    }

    goToLogin = () => {
        Actions.login()
    }
    
    saveData =async()=>{
        const {email,password} = this.state;
        

            let bodydata =   JSON.stringify({
            email: email,
            password: password,
            })
        
        fetch('http://snapi.epitech.eu/inscription', {
            method: 'post',
            dataType: 'json',
            body: bodydata,
                headers: { 
                    "Content-Type": "application/json;charset=UTF-8"
                    },
                mode: "cors"
            })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                if(response.data.email[0] !== "has already been taken"){
                    console.log(response.data.email)
                    this.goToLogin();
                }
                else{
                    alert('This email has already been taken')
                }
            })
            
        }      
   
    render(){
        return(
            <View style={styles.container}>
                <ImageBackground source={require('../sky.jpg')} style={styles.backgroundImage}>
                    <Text style={styles.title}>Register me</Text>

                    <TextInput style={styles.inputBox}
                        onChangeText={(email) => this.setState({email})}
                        underlineColorAndroid='rgba(0,0,0,0)' 
                        placeholder="Email"
                        placeholderTextColor = "#002f6c"
                        selectionColor="#fff"
                        keyboardType="email-address"
                        onSubmitEditing={()=> this.password.focus()}
                    />
                    
                    <TextInput style={styles.inputBox}
                        onChangeText={(password) => this.setState({password})} 
                        underlineColorAndroid='rgba(0,0,0,0)' 
                        placeholder="Password"
                        secureTextEntry={true}
                        placeholderTextColor = "#002f6c"
                        ref={(input) => this.password = input}
                    />
    
                    <TouchableOpacity style={styles.buttonRegister}> 
                        <Text style={styles.buttonText} onPress={this.saveData}>OK</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        )
    }
}


    