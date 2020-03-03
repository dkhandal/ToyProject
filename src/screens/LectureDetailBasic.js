import React from 'react'
import { Text, View, Image, Platform,StatusBar,TouchableOpacity } from 'react-native'
import styles from '../styles/lecturedetail'
import { theme } from '../core/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class LectureDetailBasic extends React.Component {
    static navigationOptions = {
    title: "Recommendation",
    headerTitleAlign: "center",
    headerStyle: { backgroundColor: theme.colors.surface },
    headerTitleStyle: styles.h8PageTitle,
    // headerTransparent:  true,
    headerLeft:  () => (
        <TouchableOpacity style={styles.iconLeftArrow}>
          <Icon name='arrow-left' iconStyle={styles.icon77} color='#ffffff'/>
        </TouchableOpacity>
    ),
    headerRight:  () => (
        <TouchableOpacity style={styles.iconRightSearch}>
          <Icon name='search' iconStyle={styles.iconactionsearch24Px} color='#ffffff'/>
        </TouchableOpacity>
    )
  };

  render() {
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
      <View style={styles.container}>
        <Text>Welcome to LectureDetailBasic</Text>
      </View>
      </>
    );
  }
  
}