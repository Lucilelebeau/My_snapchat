import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    backgroundImage: {
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover',
        flex: 1,
    },
    title:{
        marginBottom: 10,
        color: 'green',
        fontSize: 40,
    },
    inputBox: {
        width: 300,
        backgroundColor: '#eeeeee', 
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 20,
        color: '#002f6c',
        marginVertical: 10,
        paddingVertical: 12
    },
    buttonEnter: {
        width: 250,
        backgroundColor: 'green',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    buttonRegister: {
        width: 150,
        backgroundColor: '#64CD00',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 6
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    buttonSend: {
        width: 250,
        backgroundColor: '#8AD500',
        color: '#ffffff',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12,
        textAlign: 'center'
    },
    buttonBack: {
        width: 150,
        backgroundColor: '#8AD500',
        color: '#ffffff',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12,
        textAlign: 'center'
    }
  })
  