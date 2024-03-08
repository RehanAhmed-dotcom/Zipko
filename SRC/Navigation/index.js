// In App.js in a new project

import React, {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import AskLive from '../Screens/AskLive';
import BottomTab from '../BottomTab';
import ChangePassword from '../Screens/ChangePassword';
import Dynamic from '../Screens/dynamic';
import EditInterest from '../Screens/EditInterest';
import Login from '../Screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import PlayVideoScreen from '../Screens/PlayVideoScreen';
import PostQuestion from '../Screens/PostQuestion';
import QuestionAnswers from '../Screens/QuestionAnswers';
import Response from '../Screens/Response';
import ResponseToQuestion from '../Screens/ResponseToQuestion';
import SeeAll from '../Screens/SeeAll';
import SelectTopics from '../Screens/SelectTopics';
import SelectTopicsEdit from '../Screens/SelectTopicsEdit';
import SendEmail from '../Screens/SendEmail';
import Signup from '../Screens/Signup';
import SignupVarification from '../Screens/SignupVarification';
import {Text} from 'react-native';
import VerifiyCode from '../Screens/VerifiyCode';
import CityPdf from '../Screens/CityPdf';
import Welcome from '../Screens/Welcome';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import messaging from '@react-native-firebase/messaging';
import {navigationRef} from '../Config/NavigationServies';
import {updatefcm} from '../Api';
import {userAuthorize} from '../redux/actions';

const Stack = createNativeStackNavigator();

const Root = () => {
  const {userData, isLoggedIn} = useSelector(({USER}) => USER);
  console.log('--Navigator Screen', userData, isLoggedIn);

  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     fcm_update();
  //   }
  // }, []);

  // const fcm_update = async () => {
  //   let fcmToken = await messaging().getToken();
  //   const data = new FormData();
  //   data.append('fcm_token', fcmToken);
  //   console.log('--------1000009--', fcmToken);
  //   updatefcm({
  //     Auth: userData.userdata.api_token,
  //     data,
  //   })
  //     .then(res => {
  //       let arr = { ...userData };
  //       arr.userdata['fcm_token'] = fcmToken;
  //       userAuthorize(arr)(dispatch);
  //       // fcm_token
  //       console.log(
  //         'FCM_REASPONDE--------------------...........>>>>>>>>>>>',
  //         res,
  //       );
  //     })
  //     .catch(error => console.log('Error Message FCm', error));
  // };

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <Fragment>
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{title: '', headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{title: '', headerShown: false}}
            />
            <Stack.Screen
              name="SignupVarification"
              component={SignupVarification}
              options={{title: '', headerShown: false}}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{title: '', headerShown: false}}
            />
            <Stack.Screen
              name="CityPdf"
              component={CityPdf}
              options={{title: '', headerShown: false}}
            />
            <Stack.Screen
              name="ChangePassword"
              component={ChangePassword}
              options={{title: '', headerShown: false}}
            />
            <Stack.Screen
              name="VerifiyCode"
              component={VerifiyCode}
              options={{title: '', headerShown: false}}
            />
            <Stack.Screen
              name="SendEmail"
              component={SendEmail}
              options={{title: '', headerShown: false}}
            />
            <Stack.Screen
              name="SelectTopics"
              component={SelectTopics}
              options={{title: '', headerShown: false}}
            />
          </Fragment>
        ) : (
          <Fragment>
            <Stack.Screen
              name="BottomTab"
              component={BottomTab}
              options={{title: '', headerShown: false}}
            />
            <Stack.Screen
              name="PostQuestion"
              component={PostQuestion}
              options={{title: '', headerShown: false}}
            />
            <Stack.Screen
              name="SelectTopicsEdit"
              component={SelectTopicsEdit}
              options={{title: '', headerShown: false}}
            />

            <Stack.Screen
              name="EditInterest"
              component={EditInterest}
              options={{title: '', headerShown: false}}
            />
            <Stack.Screen
              name="Response"
              component={Response}
              options={{title: '', headerShown: false}}
            />
            <Stack.Screen
              name="QuestionAnswers"
              component={QuestionAnswers}
              options={{title: '', headerShown: false}}
            />
            <Stack.Screen
              name="ResponseToQuestion"
              component={ResponseToQuestion}
              options={{title: '', headerShown: false}}
            />
            <Stack.Screen
              name="AskLive"
              component={AskLive}
              options={{title: '', headerShown: false}}
            />

            <Stack.Screen
              name="PlayVideoScreen"
              component={PlayVideoScreen}
              options={{title: '', headerShown: false}}
            />
            <Stack.Screen
              name="SeeAll"
              component={SeeAll}
              options={{title: '', headerShown: false}}
            />
            <Stack.Screen
              name="Dynamic"
              component={Dynamic}
              options={{title: '', headerShown: false}}
            />
          </Fragment>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
