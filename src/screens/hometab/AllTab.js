import React, { Component } from 'react';
//import react in our code.
import { Text, View, StatusBar, ActivityIndicator, ScrollView,StyleSheet,Image,TouchableOpacity,Alert,ImageBackground} from 'react-native';
import { theme } from '../../core/theme';
import * as ConstantsClass from '../../util/Constants';
import axiosAPI from '../../util/axiosConfig';
import styles from '../../styles/alltab';

export default class AllTab extends React.Component {

    constructor(props) {
        super(props);

        // console.log(this.props.navigation.state);

        const { goForAxios, axiosData, loading, navigation } = props

        // console.log(ConstantsClass.API_LECTURE_LIST);
           this.state = {
           	  navigation: this.props.navigation,
           	  loading: true,
		      axiosData: {}
		   }

    }

    goForAxios = () => {
        this.setState({
            loading: true,
        })
		axiosAPI.get(ConstantsClass.API_LECTURE_LIST)
		  .then(response => {
		  		// console.log('getting data from axios', response.data);

				setTimeout(() => {
			    	this.setState({
	                        loading: false,
	                        axiosData: response.data
	                    })

					// If any error comes from server in response then show with alert message
					if(this.state.axiosData && this.state.axiosData.meta.errCode != 0){
						console.log('Error Code', this.state.axiosData.meta.errCode);
						console.log('Error Message Received: ', this.state.axiosData.meta.errMsg);
						this.sendAlertMessage('Server Error',this.state.axiosData.meta.errMsg);
					}

			    }, 1000)

		  })
		  .catch(error => {
		    console.log(error);
		  });
    }

    componentDidMount() {

		this.goForAxios();
    }

    sendAlertMessage(title,message) {

        Alert.alert(
          //title
          title,
          //body
          message,
          [
            {text: 'OK', onPress: () => console.log('Cancel on error message'), style: 'cancel'},
          ],
          { cancelable: false }
          //clicking out side of alert will not cancel
        );
    }


  render() {
  	const { axiosData,loading,navigation } = this.state;
  	// console.log('axiosData ' + JSON.stringify(axiosData));
  	// console.log('Loading state ' + loading);

  	
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
				        <View >
					        {
		                        this.state.axiosData.data.content.map((item, key) => {
		                            return (
				          					<SingleRowLectureList navigator={navigation} data={item} key={key}/>
		                            	);
		                        })
	                    	}


				        </View>
				    </ScrollView>

		       </>
		    );
	  	}else{
	  		return null;
	  	}

  } // render
} // AllTab class



class SingleRowLectureList extends React.Component {
  constructor(props) {
    super(props);

    // console.log(props);
  }
  onPressViewAll() {
    alert('View All');
  }
	openLectureDetailBasic() {
	    console.log('came into openLectureDetailBasic');
	    this.props.navigator.navigate('LectureDetailBasic');
	}
  render() {
  	// console.log(global.slides);
  	// console.log(this.props);
    return (
      <View style={{ backgroundColor: '#ffffff', padding: 20 }}>
         <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ffffff',marginBottom: 10 }}>
            <Text style={styles.s1}>
              {this.props.data.category.name}
            </Text>
            <Text style={styles.btn1Button} onPress={() => this.onPressViewAll()}>
              View All
            </Text>
          </View>

	         <View style={{ flexDirection: 'row', width: '100%', backgroundColor: '#ffffff' }}>
	            <ScrollView
	              horizontal={true}
	              showsHorizontalScrollIndicator={false}>
	              {this.props.data.degrees.map((item, key) => (
	              	<TouchableOpacity onPress={this.openLectureDetailBasic.bind(this)} key={key} >
	                <View style={{
	                		  width: 232,
							  height: item.thumbnail ? 310 : 201,
							  borderRadius: 10,
							  backgroundColor: "#ffffff",
							  marginRight: 20,
							  borderWidth: 0.5,
						      borderColor: '#a3a3a3',
						      borderBottomWidth: 2,
						      shadowColor: '#000000',
						      shadowOffset: { width: 0, height: 2 },
						      shadowOpacity: 0.3,
						      shadowRadius: 10
	                }} key={key}>
		                {item.thumbnail ? 
		                	(
		                		<View>
			            		    <ImageBackground style={styles.thumnail} source={item.thumbnail ? {uri: item.thumbnail} : require('../../assets/thumnail.png')} >
				                      <View style={styles.lession156}>
								        <Text style={styles.ct}>{item.lessonCount} lessons</Text>
								      </View>
						            </ImageBackground>
							      
							  	</View>
		                	)
		                	: 
		                	(
		                		null
		                	)
		                }

	                  <Text style={styles.s2} >{item.name}</Text>
		              {!item.thumbnail ? 
			               (
		                  		<Text style={styles.b3lession} >{!item.thumbnail ? item.lessonCount + ' lessons' : ''}</Text>
			                )
			                : 
		                	(
		                		null
		                	)
		                }
	                  <Text style={styles.b3} >{item.levels[0].text}</Text>
	                  <View style={styles.byContainer}>
	                  		<Text style={styles.eB3By} >By</Text>
	                  		<Text style={styles.b2} >{item.teacher.name.fullName}</Text>
	                  </View>
	                  {item.goods.price != 0  ? (
		                  <View style={styles.priceContainer}>
		                  		<Text style={styles.eB3} >{item.goods.currency.key}</Text>
		                  		<Text style={styles.eH5} >{item.goods.paymentPrice}</Text>
								<Text style={styles.eB1} >{item.goods.discountPrice != 0 ? item.goods.price : ''}</Text>
		                  </View>
	                  ) : (
		                  <View style={styles.priceContainer}>
		                  		<Text style={styles.eH5} >Free</Text>
		                  </View>	
	                  )
	              	}
 	                  
	                </View>
	                </TouchableOpacity>
	              ))}
	            </ScrollView>
	         </View>
      </View>
    );
  }
}