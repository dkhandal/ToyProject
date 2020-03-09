import React,{ useEffect }  from "react";
import { Provider } from "react-native-paper";
import App from "./src";
import { theme } from "./src/core/theme";
import SplashScreen from 'react-native-splash-screen'
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();

const Main = () => (
  useEffect(()=>{
    SplashScreen.hide();
  },[]),
  <Provider theme={theme}>
    <App />
  </Provider>
);

export default Main;