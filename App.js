import * as RootNavigation from './SRC/Config/NavigationServies';

import { AppState, Platform, SafeAreaView, StatusBar, StatusBarManager } from 'react-native';
import React, { Fragment, useEffect, useRef } from 'react';
import { Store, persistor } from './SRC/redux/store';

import AgoraUIKit from 'agora-rn-uikit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from './SRC/Colors';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import RNCallKeep from 'react-native-callkeep';
import Root from './SRC/Navigation';
import RtcEngine from 'react-native-agora';
import { StripeProvider } from '@stripe/stripe-react-native';
import { initializeCallKeep } from './SRC/initializeCallKeep';
import messaging from '@react-native-firebase/messaging';
import { updateActivedisactive } from './SRC/Api';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  // useEffect(() => {
  //   initializeCallKeep();
  // });

  console.log(
    '--------hhhh--aaa--SSS--SSS--aaa----nnn----',
    Store.getState().userData,
  );
  const token = Store.getState().USER.userData?.userdata?.api_token;
  const logi = Store.getState().USER.isLoggedIn;
  console.log('--online check---', token);
  AppState.addEventListener('change', nextAppState => {
    console.log("))))))))))))))", AppState.currentState);
    // AppState.currentState == 'background'
    //   ? logi
    //     ? activedisactive(0)
    //     : null
    //   : logi
    //     ? activedisactive(1)
    //     : null;

    AppState.currentState == 'background' ? activedisactive(0) : activedisactive(1)
  });

  const activedisactive = async ad => {
    const data = new FormData();
    data.append('status', ad);
    console.log('----', data);
    updateActivedisactive({
      Auth: token,
      data,
    })
      .then(res => {
        // fcm_token
        console.log('Stus aCtive Disative>>>>>>>>>>', res);
      })
      .catch(error =>
        console.log('Error Message Active In Avtive ', error.response.data),
      );
  };

  const init = async () => {
    await AgoraUIKit.create('009784133fa7421b8877ef50ccb552e4');
    // AgoraEngine.current.enableVideo();
    AgoraUIKit.enableVideo();
    AgoraUIKit.enableAudio();
    AgoraUIKit.addListener(
      'JoinChannelSuccess',

      (channel, uid, elapsed) => {
        RootNavigation.navigate('AskLive', {
          callType: 'video',
          guestData: 'kkk',
          channel: 'ooo',
          Name: 'jjjj',
          Number: '00000000',
        });
      },
    );
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    getNotifications();
    _createChannel();
    const unsubscribe = messaging().onMessage(remoteMessage => {
      Platform.OS === 'ios' &&
        PushNotificationIOS.addNotificationRequest({
          id: new Date().toString(),
          title: remoteMessage.notification?.title,
          body: remoteMessage.notification?.body,
          category: 'userAction',
          userInfo: remoteMessage.data,
        });
    });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => { });
    return unsubscribe;
  }, []);

  const getNotifications = async () => {
    await messaging().onNotificationOpenedApp(remoteMessage => { });
    await messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log('00000000000000000000000000>>>>>>>>>>>', remoteMessage);
      });
  };

  const _createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'fcm_fallback_notification_channel', // (required)
        // channelId: "1", // (required)
        channelName: 'fcm_fallback_notification_channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      created => console.log('created channel', created),
    );
  };

  return (
    <Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: Colors.maincolor }} />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.black,
          // bottom: 45,
        }}>
        <StatusBar barStyle='light-content' />
        <StripeProvider
          publishableKey='pk_test_51MgawGF7ULYs8Sfnfxg5GuyMj04W4SV3NPbXby6vJID0uhd8bdApPF04cMYqOb1BwIVZbOertCL2WuACqhyVR6kh00w3TlqQta'
        >
          <Root />

        </StripeProvider>
      </SafeAreaView>
    </Fragment>
  );
};

export default App;
