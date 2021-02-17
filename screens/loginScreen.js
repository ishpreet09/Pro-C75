import * as React from 'react';
import {Text, View, Image, KeyboardAvoidingView, TextInput, ToastAndroid, StyleSheet,TouchableOpacity } from 'react-native';
import {  Header} from 'react-native-gesture-handler';


export default class LoginScreen extends React.Component{
    constructor(){
        super();
        this.state={
            email:'',
            pass:''
        }

    }

    login=async(mail, pass)=>{
        if(mail && pass){
            try{
                const response=firebase.auth().signInWithEmailAndPassword(mail, pass)
          if(response){
              this.props.navigation.navigate('Read')

          }
            } 
            catch(error){
                switch (error.code) {
                    case 'auth/user-not-found':
                        ToastAndroid.show("Invalid user", ToastAndroid.SHORT);
                        
                        break;
                    case 'auth/invalid-email':
                        ToastAndroid.show("Invalid E-mail or Password", ToastAndroid.SHORT);
                      break;
                
                    default:
                        break;
                }
            } 

        }else{
            ToastAndroid.show("Enter E-mail ID or password", ToastAndroid.SHORT);
        } 
   

    }

   
    render(){
        return(
            <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
            <View style={{marginBottom:200}}>
               <Text style={{fontSize:35, marginBottom:20, marginTop:0.5, color:"white", alignSelf:'center'}}>Bedtime Stories</Text>
            <Image 
                source={require("../assets/stories.png")}
                style={{width:220, height:220, borderWidth:5, borderRadius:30, borderColor:"white", alignSelf:'center'}}
                />
<View >
            <TextInput
            placeholder='abc@example.com'
           style={styles.inputBox}
           onChangeText={text => {
            this.setState({ email: text});
          }}
          value={this.state.email}
            />

            <TextInput
            placeholder='Password'
            style={styles.inputBox2}
            onChangeText={text1 => {
                this.setState({ pass: text1});
              }}
              value={this.state.pass}

            />

<TouchableOpacity
          style={styles.scanButton}
          onPress={()=>{this.login(this.state.email, this.state.pass)}}
          >
              <Text style={styles.buttonText}>Log-In</Text>

          </TouchableOpacity>
</View>
            </View>
            </KeyboardAvoidingView>
            )
    }
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:"#3C6382",
        marginTop:3
      },
      inputBox:{
        
            
            width: 250,
            
            height: 40,
            borderWidth: 2,
            padding:10,
            borderColor:'white',
            marginTop:25,
   alignSelf:'center',
            borderRadius:10
           
    },
    inputBox2:{
        
        marginTop:40,
        width: 250,
        
        height: 40,
        borderWidth: 2,
        padding:10,
        borderColor:'white',
        alignSelf:'center',
        fontSize:15,
        borderRadius:10
       
},
scanButton:{
    backgroundColor: 'green',
    padding: 10,
    margin: 10
  },
  buttonText:
  { fontSize: 15, 
    textAlign: 'center', 
    marginTop: 10 
},
})