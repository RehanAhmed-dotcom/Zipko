import { AppRegistry, AppState } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Store, persistor } from './SRC/redux/store';

import App from './App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import PushNotification from 'react-native-push-notification';
import PushNotificationConfig from './SRC/Config/PushNotification';
import RNCallKeep from 'react-native-callkeep';
import { name as appName } from './app.json';
import dynamicLinks from '@react-native-firebase/dynamic-links'
import messaging from '@react-native-firebase/messaging';
import { navigate } from './SRC/Config/NavigationServies'
import { navigationRef } from './SRC/Config/NavigationServies';
import { updateActivedisactive } from './SRC/Api';
import { v4 as uuidv4 } from 'uuid';

const Zikpo = ({ navigation }) => {

  const handleDynamicLink = link => {
    console.log("Dd", link.url)
    let paramString = link.url.split('?')[1];
    let params_arr = paramString.split('&');

    for (let i = 0; i < params_arr.length; i++) {
      let pair = params_arr[i].split('=');
      console.log("{{first}}", i)
      console.log("Key is:" + pair[0]);
      console.log("Value is:" + pair[1]);
    }

    let id = params_arr[0].split('=');
    let iddata = id[1];

    let vid = params_arr[1].split('=');
    let vdata = vid[1];

    // let vdes = params_arr[2].split('=');
    // let vdescription = vdes[2];

    // let like = params_arr[3].split('=');
    // let tolike = like[3];

    // let comt = params_arr[4].split('=');
    // let tocomt = comt[4];

    // let shr = params_arr[5].split('=');
    // let toshr = shr[5];

    // let ques = params_arr[6].split('=');
    // let toques = ques[6];
    // console.log("-=====", toques)

    // const obj = {
    //   id: iddata,
    //   file: vdata,
    //   description: vdescription,
    //   total_like: tolike,
    //   total_comment: tocomt,
    //   total_share: toshr,
    //   question_id: toques,
    // }

    // console.log("data:::::::::::::::", obj)
    // console.log("Video:::::::::::::", vdata)
    navigate("Dynamic", { ply: vdata, ddes: iddata })

  };

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, []);

  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background! inside index', remoteMessage);
  PushNotification.localNotification(remoteMessage);
});
PushNotificationConfig.congigurations();
AppRegistry.registerComponent(appName, () => Zikpo);
