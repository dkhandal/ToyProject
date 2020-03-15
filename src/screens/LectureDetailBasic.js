import React from 'react'
import { Text, View, Image, Platform,StatusBar,TouchableOpacity,ImageBackground,ActivityIndicator,ScrollView,FlatList,Alert } from 'react-native'
import styles from '../styles/lecturedetail'
import { theme } from '../core/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ConstantsClass from '../util/Constants';
import utility from '../util/Utility';
import axiosAPI from '../util/axiosConfig';
import DynamicTabView from 'react-native-dynamic-tab-view';
import { Button } from 'react-native-paper';

export default class LectureDetailBasic extends React.Component {

      constructor(props) {
        super(props);

        // console.log(this.props.navigation.state);
          // const { goForAxios, axiosDataLectureDetail, loading, navigation } = props

          // console.log(ConstantsClass.API_LECTURE_DETAIL_BASIC);
             this.state = {
                navigation: this.props.navigation,
                loading: true,
                loadingLessionList: true,
                axiosDataLectureDetail: {},
                axiosDataLessionList: {},
                defaultIndex: 0,
                tabBarData: [],
                FlatListItems: [
                    {key: 'One'},
                    {key: 'Two'},
                    {key: 'Three'},
                    {key: 'Four'},
                    {key: 'Five'},
                    {key: 'Six'},
                    {key: 'Seven'},
                    {key: 'Eight'},
                    {key: 'Nine'},
                    {key: 'Ten'},
                    {key: 'Eleven'},
                    {key: 'Twelve'}
                  ]
              }
      }

      FlatListItemSeparator = () => {
            return (
              <View
                style={{
                  height: 1,
                  // marginLeft: 50,
                  width: "100%",
                  backgroundColor: "#607D8B",
                }}
              />
            );
          }
         
          GetItem (item) {
           
          Alert.alert('Start Lesson of ' + item);
         
          }

          startLession(){
            Alert.alert('Start Lesson');   
          }

        _renderItem = (item, index) => {
          console.log("renderItem", index);
          return (
            <View
              key={item["key"]}
              style={{backgroundColor:'white',height: 800 }} >

              <View style={styles.rectangle} elevation={5}>
                <View style={styles.banner}>
                  <Image style={styles.bell} source={require('../assets/banner_alarm.png')} />
                  <Text style={styles.b2}>It’s time to take a lesson on Analyzing the Social Media Platforms.</Text>
                </View>
                <Button uppercase={false} style={styles.btn1Button} onPress={() => this.startLession()}><Text style={{color:"#fc5356"}}>Start Lesson</Text></Button>
              </View>

              <View style={styles.containercard} >
                <Text style={styles.s2}>Course</Text>
                <FlatList 
                    data={ this.state.FlatListItems }
                    ItemSeparatorComponent = {this.FlatListItemSeparator}
                    renderItem={({item}) => <Text style={{padding: 10, fontSize: 18, height: 44}} onPress={this.GetItem.bind(this, item.key)} > {item.key} </Text>}
                   />
              </View>

              <View style={styles.appbarbg} elevation={15}>
                <Text style={styles.appbarb3}>Learning Progress</Text>
                <Text style={styles.appbareH5}>62 %</Text>
                <Button uppercase={false} style={styles.appbarrectangle} onPress={() => this.startLession()}><Text style={{color:"#ffffff"}}>Start Lesson</Text></Button>
              </View>
            
              
            </View>
          );
        };

      onChangeTab = index => {
        console.log('changed index: ' + index);
      };

      goForAxiosLectureDetail = () => {
          this.setState({
              loading: true,
          })
          axiosAPI.get(ConstantsClass.API_LECTURE_DETAIL_BASIC)
            .then(response => {
                // console.log('getting data from goForAxiosLectureDetail', response.data);

              setTimeout(() => {
                  this.setState({
                                loading: false,
                                axiosDataLectureDetail: response.data
                            })

                // If any error comes from server in response then show with alert message
                if(this.state.axiosDataLectureDetail && this.state.axiosDataLectureDetail.meta.errCode != 0){
                  console.log('Error Code', this.state.axiosDataLectureDetail.meta.errCode);
                  console.log('Error Message Received: ', this.state.axiosDataLectureDetail.meta.errMsg);
                  this.sendAlertMessage('Server Error',this.state.axiosDataLectureDetail.meta.errMsg);
                }

                }, 1000)
                
            })
            .catch(error => {
              console.log(error);
            });
      }

      goForAxiosLessionList = () => {
          this.setState({
              loadingLessionList: true,
          })
          axiosAPI.get(ConstantsClass.API_LECTURE_DETAILS_LESSION_LIST)
            .then(response => {
                // console.log('getting data from goForAxiosLessionList', response.data);

              setTimeout(() => {
                  this.setState({
                                loadingLessionList: false,
                                axiosDataLessionList: response.data
                            })

                // If any error comes from server in response then show with alert message
                if(this.state.axiosDataLessionList && this.state.axiosDataLessionList.meta.errCode != 0){
                  console.log('Error Code', this.state.axiosDataLessionList.meta.errCode);
                  console.log('Error Message Received: ', this.state.axiosDataLessionList.meta.errMsg);
                  this.sendAlertMessage('Server Error',this.state.axiosDataLessionList.meta.errMsg);
                }

                var i = 0;
                this.state.axiosDataLessionList.data.map((itemdata, itemdatakey) => {
                    itemdata.lessons.map((itemlession, itemlessionkey) => {
                      var objLession = {'title':itemlession.name, 'key':'item'+i};
                      this.state.tabBarData.push(objLession);
                      // console.log(itemlession.name);
                      // console.log(i);
                      i++;          
                    })
                })

                }, 1000)
                
            })
            .catch(error => {
              console.log(error);
            });
      }

      componentDidMount() {

        this.goForAxiosLectureDetail();
        this.goForAxiosLessionList();
        // axiosAPI.all([this.goForAxiosLectureDetail(), this.goForAxiosLessionList()])
        // .then(axios.spread(function (acct, perms) {
        //   // Both requests are now complete
        //   console.log('Both requests are now complete');
        // }));
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


    static navigationOptions = ({navigation, screenProps}) => {
      return {
        title: "",
        headerTitleAlign: "center",
        headerStyle: { 
          backgroundColor: theme.colors.transparent
         },
        headerTitleStyle: styles.h8PageTitle,
        headerTransparent:  true,
        headerLeft:  () => (
            <TouchableOpacity style={styles.iconLeftArrow} onPress={() => navigation.goBack()} >
              <Icon name='arrow-left' size={16}  style={styles.icon77}/>
            </TouchableOpacity>
        ),
        headerRight:  () => (
            <TouchableOpacity style={styles.iconRightSearch}>
              <Icon name='ellipsis-v' size={16}  style={styles.iconactionsearch24Px}/>
            </TouchableOpacity>
        )
      }
  };

  // seconds to days convert method
  // convertSectoDay( seconds ) {
  //     var days = Math.floor(seconds / 86400); //86400 seconds to 1 day
  //     return days;
  // }

  render() {
    // const { axiosDataLectureDetail,loading,navigation } = this.state;
    // console.log('axiosData ' + JSON.stringify(axiosDataLectureDetail));
    // console.log('Loading state ' + loading);

    if (this.state.loading) {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="{theme.colors.surface}" />
                <Text>Fetching Data</Text>
            </View> 
        );
    }

    if(this.state && this.state.axiosDataLectureDetail){
      const learnRemainDays = utility.convertSectoDay(this.state.axiosDataLectureDetail.data.learnRemainDays);
        return (
            <>
                <StatusBar
                  barStyle="light-content"
                  // dark-content, light-content and default
                  hidden={false}
                  //To hide statusBar
                  backgroundColor={theme.colors.transparent}
                  //Background color of statusBar
                  translucent={true}
                  //allowing light, but not detailed shapes
                  networkActivityIndicatorVisible={true}
                />
                <ScrollView style={styles.scrollView}>
                    <ImageBackground blurRadius={2} source={this.state.axiosDataLectureDetail.data.thumbnail ? {uri: this.state.axiosDataLectureDetail.data.thumbnail} : require('../assets/thumnailbg.png')} style={styles.ImageBackground} >
                      <View style={styles.containerimg}>
                          <Text style={styles.h6}>{this.state.axiosDataLectureDetail.data.name}</Text>
                          <View style={styles.categoryInfo}>
                            <Text style={styles.b4}>{this.state.axiosDataLectureDetail.data.category.text} > {this.state.axiosDataLectureDetail.data.category.child.text}</Text>
                          </View>
                          <Text style={styles.b4Level}>{this.state.axiosDataLectureDetail.data.levels[0].text}</Text>
                          <View style={styles.categoryInfoTags}>
                            {
                              this.state.axiosDataLectureDetail.data.tags.map((item, key) => {
                                    return (
                                      <View style={styles.view286} key={key}>
                                        <Text style={styles.ht} >{item.name}</Text>
                                      </View>
                                    );
                                })
                            }
                          </View>
                          <View style={styles.viewProgressRate}>
                            <Text style={styles.eH5} >{this.state.axiosDataLectureDetail.data.progression} %</Text>
                            <Text style={styles.eH5} >D - {learnRemainDays}</Text>
                          </View>                                
                      </View>

                  </ImageBackground>
                    
                    <DynamicTabView
                      data={this.state.tabBarData}
                      renderTab={this._renderItem}
                      defaultIndex={this.state.defaultIndex}
                      containerStyle={styles.container}
                      headerBackgroundColor={'white'}
                      headerTextStyle={styles.headerText}
                      onChangeTab={this.onChangeTab}
                      headerUnderlayColor={'black'}
                    />
                    


                </ScrollView>

            </>
        );
      }else{
        return null;
      }

  } // render
} // LectureDetailBasic class