import React, { Fragment, useEffect, useState } from 'react';
import { navigate, push } from '../NavigationServies';
import { useDispatch, useSelector } from 'react-redux';

import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { Store } from '../../redux/store';
import { allnotification } from '../redux/actions';
import { get_Unread_All_Notification } from '../ApiRoutes';
import { logout } from '../redux/actions';
import { viewQuestionDetailnotification } from '../../Api';

const PushNotificationsConfigs = {
  congigurations: () => {
    // console.log('store', Store.getState().userData.userdata.api_token);
    const token = Store.getState().USER.userData?.userdata?.api_token;
    const logi = Store.getState().USER.isLoggedIn;
    PushNotification.configure({
      onNotification: notification => {
        console.log(
          'NOOOOOOOOOOOOOOOOOOOOOOOOOOO',
          notification,

          notification.data.type,
          notification.data.question_id,
          token,
          logi,
        );
        console.log('-----', notification.data.type);
        if (notification.data.type == 'video_created') {
          navigate('Response', {
            quesid: JSON.parse(notification.data.question),
          });

          // navigate('BottomTab');
          // navigate('Response', {id: notification.data.question_id});
        } else if (notification.data.type == 'live_video') {
          navigate('AskLive', {
            callType: 'video',
            guestData: 'kkk',
            channel: 'ooo',
            Name: 'jjjj',
            Number: '00000000',
          });
        }
        // if (notification.userInteraction) {
        // navigate("VenderNotification");
        // navigate('Notifications');
        // console.log('vvvvvvvvvvvvvvvvv', Store.getState().USER.userData);
        // const ty = Store.getState().USER.userData.userdata.type;
        // if (ty == 'Vendor') {
        //   console.log('hhhhhhhhhhhh');
        //   navigate('VenderNotification');
        // } else if (ty == 'User') {
        //   console.log('hhhyyyyyyyyyyyyyhhhhhhhhh');
        //   navigate('Notification');
        // }
        // }
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      onRegistrationError: err => { },
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: false,
    });
  },
};
export default PushNotificationsConfigs;
