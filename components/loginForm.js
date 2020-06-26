import React from 'react';
import { Text, View, TextInput, TouchableOpacity, ImageBackground} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from '../src/style';

export default class LoginForm extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            email:'',
            password:'',
            isLoggedIn: false,
            token: '',
        }
    }

    
    goToHome = () => {
        Actions.home({'token': this.state.token})
    }

    goToRegister = () => {
        Actions.register()
    }
        
    
    checkData =async()=>{
        const {email,password} = this.state;
        
            let bodydata =   JSON.stringify({
            email: email,
            password: password,
            })
        
        fetch('http://snapi.epitech.eu/connection', {
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
            if(response.data){
                if(response.data == "Incorrect email or password"){
                    alert("Sorry, you're not register !")
                    //this.goToRegister()
                }
                else{
                    this.setState({isLoggedIn: true})
                    this.setState({token: response.data.token})
                    console.log(this.state.token)
                    this.goToHome();
                }
            }
        })            
    } 



    render(){
        return(   
            
        
        <View style={styles.container}>
            <ImageBackground source={require('../sky.jpg')} style={styles.backgroundImage}>
                <Text style={styles.title}>My Snapi</Text>
               
                <TextInput style={styles.inputBox}
                    onChangeText={(email) => this.setState({email})}
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Email"
                    placeholderTextColor = "#002f6c"
                    selectionColor="#fff"
                    autoFocus={true}
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

                <TouchableOpacity style={styles.buttonEnter}> 
                    <Text style={styles.buttonText} onPress={this.checkData}>Enter</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonRegister}> 
                    <Text style={styles.buttonText} onPress={this.goToRegister}>Register me</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
        
            
        )
    }
}
