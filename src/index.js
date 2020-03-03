import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import { ViewStatusBar,TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles/lecturelist'
import { theme } from './core/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  LectureDetailBasic,
  LectureDetailLessionList,
  AllTab,
  PopularTab,
  NewTab
} from "./screens";


const TabScreenLectureList = createMaterialTopTabNavigator(
  {
    All: { screen: AllTab },
    Popular: { screen: PopularTab },
    New: { screen: NewTab }
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#FFFFFF',
      inactiveTintColor: '#F8F8F8',
      style: {
        backgroundColor: '#313d4b',
      },
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: '#FFFFFF',
        borderBottomWidth: 2,
      },
      upperCaseLabel: false
    },
  }
);


const Router = createStackNavigator(
  {
    TabScreenLectureList: {
      screen: TabScreenLectureList,
      navigationOptions: {

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
      }
    },
    LectureDetailBasic: {
      screen: LectureDetailBasic,
    },
    LectureDetailLessionList: {
      screen: LectureDetailLessionList,
    }
  },
  {
    initialRouteName: "TabScreenLectureList",
    // headerMode: "none"
  }
);

export default createAppContainer(Router);
