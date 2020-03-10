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
      inactiveTintColor: '#C0C5CA',
      style: styles.tabBg,
      labelStyle: styles.b2TabItem,
      indicatorStyle: styles.tabSelectionOn,
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
            <TouchableOpacity style={styles.iconLeftArrow155}>
              <Icon name='arrow-left' size={16} style={styles.icon77}/>
            </TouchableOpacity>
        ),
        headerRight:  () => (
            <TouchableOpacity style={styles.iconRightSearchrectangle3}>
              <Icon name='search' size={16}  style={styles.iconactionsearch24Px}/>
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
