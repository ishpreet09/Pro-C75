import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet, KeyboardAvoidingView , ToastAndroid} from 'react-native';
import {Header} from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';

export default class WriteStory extends React.Component{
  constructor(){
        super();
        this.state = {
            title: '',
            author: '',
            storyText: '',
        }
    }

    submitStory=()=>{
      var submitMessage;
        db.collection("stories").add({
            title: this.state.title,
            author: this.state.author,
            storyText: this.state.storyText,
            //date: firebase.firestore.FieldValue.serverTimestamp().now().toDate()
        })
        var text=this.state.title;
        var author=this.state.author;
        var story=this.state.storyText;

        if(text===""){
            ToastAndroid.show("Write a title of your story", ToastAndroid.SHORT)

        }

        

        if(author===""){
            ToastAndroid.show("Write the author of your story", ToastAndroid.SHORT)

        }

        
        if(story===""){
            ToastAndroid.show("Write your story", ToastAndroid.SHORT)

        }else{
            submitMessage = "Story Submitted";

            ToastAndroid.show(submitMessage, ToastAndroid.SHORT);
        }

    }
  
    render(){
        return(
            
            
              
<KeyboardAvoidingView style={styles.container} behavior='padding' enabled>

       <View>
           
       <Header    
            backgroundColor={'#FFC0CB'}
            centerComponent={{
                text:'Bed Time Stories',
                style:{color:'black', fontSize:25, fontWeight:'bold'}
            }}
        />
            
                
                    <TextInput
                   placeholder={'Story Title'}
                  style={styles.inputBox}
                  onChangeText={text => {
                    this.setState({ title: text });
                  }}
                  value={this.state.title}
            
                    />

                <TextInput
                   placeholder={'Author'}
                  style={styles.inputBox2}
                  onChangeText={text => {
                    this.setState({ author: text });
                  }}
                  value={this.state.author}
            
                    />

            <TextInput
                   placeholder={'Write your story'}
                  style={styles.inputBox3}
                  multiline={true}
                  onChangeText={text => {
                    this.setState({ storyText: text});
                  }}
                  value={this.state.storyText}
            
                    />



                </View>
                <TouchableOpacity
            style={{
                backgroundColor:'#FFC0CB',
                marginTop:15,
                height:50,
                width:120,
                alignItems:'center',
                alignSelf:'center'
            }}
            onPress={async () => {this.submitStory(); this.setState({
                author: '',
                storyText: '',
                title: ''
            });
        }}>
            
                <Text
                style={{
                    color:'black',
                    marginTop:10,
                    fontWeight:'bold',
                    fontSize:20
                }}
                >Submit</Text>
            </TouchableOpacity>
           
                </KeyboardAvoidingView>
           
               
               
            
            
        );
      
      
    }
  
    
}

const styles=StyleSheet.create({
    
    inputBox:{
        
            marginTop: 50,
            width: '90%',
            alignSelf: 'center',
            height: 40,
            borderWidth: 4,
            padding:10,
           
    },

    inputBox2:{
        
        marginTop: 25,
        width: '90%',
        alignSelf: 'center',
        height: 40,
        borderWidth: 4,
        padding:10,
       
},

inputBox3:{
        
    marginTop: 25,
    width: '90%',
    alignSelf: 'center',
    height: 340,
    borderWidth: 4,
    padding:10,
   
}
})