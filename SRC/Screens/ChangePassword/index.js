import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { ChangePassword, registerUser } from '../../Api';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../../Colors';
import { GoogleSignin } from '@react-native-community/google-signin';
import Header from '../../Components/Header';
import Input from '../../Components/Input';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import Loder from '../../Components/Loder';
import RButton from '../../Components/RButton';
import Styles from './Style';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { userAuthorize } from '../../redux/actions';

const ChangePassword_ = ({ navigation, route }) => {
  const [emailphone, setemailphone] = useState('');
  const [pass, setpass] = useState('');
  const [confirmpass, setconfirmpass] = useState('');
  const [loding, setloding] = useState(false);
  const dispatch = useDispatch();
  const validate = () => {
    if (confirmpass == '' || pass == '') {
      alert('Passsword is required');
      return false;
    } else if (pass.length < 4) {
      alert('Password length must greater then 4');
      return false;
    } else if (confirmpass.length < 4) {
      alert('Password length must greater then 4');
      return false;
    } else if (confirmpass != pass) {
      alert('password  and confirm password must match');
      return false;
    } else {
      return true;
    }
  };
  const SendEmailForVarification = () => {
    setloding(true);
    setTimeout(() => {
      SendEmailForVarification_api();
    }, 2000);
  };
  const SendEmailForVarification_api = () => {
    setloding(true);
    if (validate()) {
      const dat = new FormData();

      dat.append('email', route.params.email);
      dat.append('token', route.params.token);
      dat.append('password', pass);
      dat.append('password_confirmation', confirmpass);

      ChangePassword({
        data: dat,
      })
        .then(res => {
          console.log('Response of Change password', res);
          if (res.status == 'success') {
            setloding(false);
            navigation.navigate('Login');
          } else {
            alert('Some thing want wrong');
            setloding(false);
          }
        })
        .catch(error => {
          setloding(false);
          console.log('Error MEssage of Change password', error.response.data);
          if (error?.response?.data?.status == 'error') {
            alert(`${error?.response?.data?.message}`);
          }
        });
    } else {
      setloding(false);
    }
  };
  return (
    <ImageBackground
      source={require('../../Assests/bac1.png')}
      resizeMode='stretch'
      style={Styles.image}>
      <Header title="Change Password" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView style={{ flex: 1 }}>
          <Loder lodertyp={loding} />
          <View style={Styles.innercontainer}>
            <Image
              source={require('../../Assests/innerwelcom.png')}
              resizeMode="contain"
              style={Styles.imaginner}
            />
            {/* <Input
            limag={require('../../Assests/msg.png')}
            // rimg={require('../../Assests/innerwelcom.png')}
            val={emailphone}
            plas="Enter Verification Code"
            onchang={txt => setemailphone(txt)}
          /> */}
            <Input
              rcolor={Colors.white}
              limag={require('../../Assests/loc.png')}
              rimg={require('../../Assests/eye.png')}
              val={pass}
              entrytyp="Securee"
              plas="Enter Your Password"
              onchang={txt => setpass(txt)}
            />

            <Input
              rcolor={Colors.white}
              limag={require('../../Assests/loc.png')}
              rimg={require('../../Assests/eye.png')}
              val={confirmpass}
              entrytyp="Securee"
              plas="Enter Your Password"
              onchang={txt => setconfirmpass(txt)}
            />

            <RButton
              title="SUBMIT"
              onpress={() => SendEmailForVarification()}
              color={Colors.black}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default ChangePassword_;
