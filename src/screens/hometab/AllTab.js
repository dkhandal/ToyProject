import React, { Component } from 'react';
//import react in our code.
import { Text, View, StatusBar, ActivityIndicator, ScrollView,StyleSheet,Image} from 'react-native';
import { Card } from 'react-native-paper'
import { theme } from '../../core/theme';
import * as ConstantsClass from '../../util/Constants';
import axiosAPI from '../../util/axiosConfig';

export default class AllTab extends React.Component {

    constructor(props) {
        super(props);

        const { goForAxios, axiosData, loading } = props

        console.log(ConstantsClass.API_LECTURE_LIST);
           this.state = {
           	  loading: true,
		      axiosData: []
		   }

    }

    goForAxios = () => {
        this.setState({
            loading: true,
        })
		axiosAPI.get(ConstantsClass.API_LECTURE_LIST)
		  .then(response => {
		  		console.log('getting data from axios', response.data);

				setTimeout(() => {
			    	this.setState({
	                        loading: false,
	                        axiosData: response.data
	                    })
			    }, 1000)
		  })
		  .catch(error => {
		    console.log(error);
		  });
    }

    componentDidMount() {

		this.goForAxios();
    }




  render() {
  	const { axiosData,loading } = this.state;
  	console.log('axiosData ' + axiosData);
  	console.log('Loading state ' + loading);

  	
  		if (this.state.loading) {
              return (
			        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
	                    <ActivityIndicator size="large" color="{theme.colors.surface}" />
	                    <Text>Fetching Data</Text>
	                </View> 
              );
        }
		if(this.state && this.state.axiosData){        
	  		return (
		    	<>
				    <StatusBar
			            barStyle="light-content"
			            // dark-content, light-content and default
			            hidden={false}
			            //To hide statusBar
			            backgroundColor={theme.colors.surface}
			            //Background color of statusBar
			            translucent={false}
			            //allowing light, but not detailed shapes
			            networkActivityIndicatorVisible={true}
			      />
			        <ScrollView style={styles.container}>
				        <View style={{ backgroundColor: '#ffffff' }}>
				          <SingleRow style={{ backgroundColor: '#ffffff' }}/>
				          <SingleRow />
				          <SingleRow />
				          <SingleRow />
				          <SingleRow />
				        </View>
				    </ScrollView>

		       </>
		    );
	  	}else{
	  		return null;
	  	}

  } // render
} // AllTab class

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        // margin: 10
    },
    whiteText: {
        color: '#FFFFFF',
        fontSize: 20
    },
   s1: {
	  width: 110,
	  height: 26,
	  fontFamily: "Roboto",
	  fontSize: 20,
	  fontWeight: "bold",
	  fontStyle: "normal",
	  lineHeight: 26,
	  letterSpacing: 0,
	  textAlign: "left",
	  color: "#212121"
	},
	btn1Button: {
	  width: 130,
	  height: 20,
	  fontFamily: "NotoSansCJKkr",
	  fontSize: 14,
	  fontWeight: "500",
	  fontStyle: "normal",
	  lineHeight: 22,
	  letterSpacing: 0.98,
	  textAlign: "right",
	  color: "#fc5356"
	},
	bg: {
	  width: 232,
	  height: 310,
	  borderRadius: 6,
	  backgroundColor: "#ffffff",
	  marginRight: 20,
	  borderWidth: 0.5,
      borderColor: '#a3a3a3',
      alignItems: 'center'
	}
});

class SingleRow extends React.Component {
  constructor(props) {
    super(props);
    const slides = [
      {
        key: '11 MB',
        text: 'FREE ',
        title: 'Mobile ',
        uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
        backgroundColor: '#ffffff',
      },
      {
        key: '52 MB',
        title: 'Flight ',
        uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
        backgroundColor: '#febe29',
      },
      {
        key: '14 MB',
        text: 'FREE',
        title: 'Great ',
        uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
        backgroundColor: '#22bcb5',
      },
      {
        key: '45 MB',
        title: 'Best ',
        uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
        backgroundColor: '#3395ff',
      },
      {
        key: '33 MB',
        title: 'Bus ',
        text: 'FREE',
        uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
        backgroundColor: '#f6437b',
      },
      {
        key: '77 MB',
        title: 'Train ',
        uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
        backgroundColor: '#febe29',
      },
    ];
    global.slides = slides;
  }
  onPressLearnMore() {
    alert('Hello');
  }
  render() {
    return (
      <View style={{ backgroundColor: '#ffffff', padding: 20 }}>
         <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ffffff',marginBottom: 10 }}>
            <Text style={styles.s1}>
              Category 1
            </Text>
            <Text style={styles.btn1Button} onPress={() => alert('View All')}>
              View All
            </Text>
          </View>
        <Card>

          <View style={{ flexDirection: 'row', width: '100%', backgroundColor: '#ffffff' }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {global.slides.map((item, key) => (
                <View style={styles.bg} key={key}>
                  <Image
                    source={{
                      uri: item.uri,
                    }}
                    style={{ width: 70, height: 70, margin: 10 }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{ color: '#494949', fontWeight: '200' }}
                      onPress={() => {
                        alert('Title ' + item.title + ' Clicked');
                      }}>
                      {item.title}
                    </Text>
                    <Text style={{ color: '#228B22' }}>⋮</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{ color: '#606070', fontWeight: '200' }}>
                      {item.key}
                    </Text>
                    <Text style={{ color: '#228B22' }}>{item.text}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </Card>
      </View>
    );
  }
}