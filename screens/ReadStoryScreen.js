import React from 'react';
import { StyleSheet, Text, View , FlatList, KeyboardAvoidingView, ScrollView} from 'react-native';
import { SearchBar } from 'react-native-elements';
import {Header} from 'react-native-elements';
import db from '../config';

export default class ReadStory extends React.Component{
    constructor(){
        super();
        this.state={
            allStories:[],
            data:[],
            search:''
        }
    }

    componentDidMount(){
        this.retrieveStories();

    }

    retrieveStories=async()=>{
        var allStories=[];
        var stories= await db.collection("stories")
        .get()
        .then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                allStories.push(doc.data())
            })
            this.setState({allStories})
        })
    }

    SearchFilterFunction(text) {
        const newData = this.state.allStories.filter((item) => {
          const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        this.setState({
          data: newData,
          search: text,
        });
      }

    updateSearch = (search) => {
        this.setState({ search });
      };

    render(){
        return(
            <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
            
            <View>
            
        <Header    
            backgroundColor={'#FFC0CB'}
            centerComponent={{
                text:'Bed Time Stories',
                style:{color:'black', fontSize:20}
            }}
        />
        
                <View styles={{ height: 20, width: '100%' }}>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={text => this.SearchFilterFunction(text)}
            onClear={text => this.SearchFilterFunction('')}
            value={this.state.search}
          />
        </View>
        <FlatList
                data={this.state.search === "" ?  this.state.allStories: this.state.data}
                renderItem={({ item }) => (
                  <View style={styles.itemContainer}>
                    <Text>  Title: {item.title}</Text>
                    <Text>  Author : {item.author}</Text>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                /> 
        <ScrollView>
        <View>
          {
            this.state.search === "" ?
              this.state.allStories.map((item) => (
                <View style={{ width:'100%', height:75, padding: 20, marginTop: 5 , backgroundColor:'white',}}>
                  <Text>
                    Title : {item.title}
                  </Text>
                  <Text>
                    Author : {item.author}
                  </Text>
                </View>
              ))
              :
              this.state.data.map((item) => (
                <View style={{ width:'100%', height:75, padding: 20, marginTop: 5 , backgroundColor:'white',}}>
                  <Text>
                    Title : {item.title}
                  </Text>
                  <Text>
                    Author : {item.author}
                  </Text>
                </View>
              ))
          }
        </View>
       </ScrollView>
            </View>

           
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: 'pink',
    },
    item: {
      backgroundColor: '#6200EE',
      padding: 10,
      marginVertical: 8,
      backgroundColor:'white',
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    itemContainer: {
      height: 80,
      width: '100%',
      borderWidth: 2,
      borderColor: '#6200EE',
      backgroundColor:'white',
      alignSelf: 'center',
    },
    
  });