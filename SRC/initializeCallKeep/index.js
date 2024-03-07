import * as RootNavigation from '../Config/NavigationServies';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platfrom} from 'react-native';
import RNCallKeep from 'react-native-callkeep';

export const initializeCallKeep = async () => {
  try {
    RNCallKeep.setup({
      ios: {
        appName: 'ZikPo',
      },
      android: {
        alertTitle: 'Permissions required',
        alertDescription:
          'This application needs to access your phone accounts',
        cancelButton: 'Cancel',
        okButton: 'ok',
      },
    });
    RNCallKeep.setAvailable(true);
  } catch (err) {
    console.log('initializeCallKeep error:', err.message);
  }

  // Add RNCallKit Events
  RNCallKeep.addEventListener('answerCall', onAnswerCallAction);
  RNCallKeep.addEventListener('endCall', onEndCallAction);
  RNCallKeep.addEventListener(
    'didDisplayIncomingCall',
    onIncomingCallDisplayed,
  );
};

const onAnswerCallAction = ({callUUID}) => {
  // called when the user answer the incoming call

  AsyncStorage.getItem('callData').then(data => {
    console.log('The Data is ' + JSON.stringify(data));

    if (data) {
      const callData = JSON.parse(data);
      RNCallKeep.rejectCall(callUUID);

      RootNavigation.navigate('AskLive', {
        callType: callData.type,
        guestData: callData.guestData,
        channel: callData.channel,
        Name: callData.Name,
        Number: callData.Number,
      });
    }
  });

  // On Android display the app when answering a video call
  if (Platform.OS == 'android') {
    RNCallKeep.backToForeground();
  }
};

const onIncomingCallDisplayed = ({callUUID, handle, fromPushKit}) => {
  console.log('calling...');
};
