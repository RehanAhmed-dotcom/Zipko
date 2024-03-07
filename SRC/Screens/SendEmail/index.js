import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Emailverified, registerUser } from '../../Api';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../../Colors';
import Header from '../../Components/Header';
import Input from '../../Components/Input';
import Loder from '../../Components/Loder';
import RButton from '../../Components/RButton';
import Styles from './Style';

const SendEmail = ({ navigation }) => {
  const [emailphone, setemailphone] = useState('');
  const [pass, setpass] = useState('');
  const [loding, setloding] = useState(false);
  const dispatch = useDispatch();
  const validate = () => {
    if (emailphone == '') {
      alert('Email or Phone no is Required');
      return false;
    } else {
      return true;
    }
  };
  const emailVarification = () => {
    setloding(true);
    setTimeout(() => {
      emailVarificatione();
    }, 2000);
  };
  const emailVarificatione = () => {
    setloding(true);
    if (validate()) {
      const dat = new FormData();
      dat.append('email', emailphone);

      Emailverified({ data: dat })
        .then(res => {
          console.log('Response of Email Varification', res);
          if (res.status == 'success') {
            setloding(false);
            navigation.navigate('VerifiyCode', { email: emailphone });
          } else {
            alert('Some thing want wrong');
            setloding(false);
          }
        })
        .catch(error => {
          setloding(false);
          console.log('Error MEssage of Login', error.response.data);
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
      resizeMode="cover"
      style={Styles.image}>
      <Header title="Code Verification" />

      <ScrollView style={{ flex: 1 }}>
        <Loder lodertyp={loding} />
        <View style={Styles.innercontainer}>
          <Image
            source={require('../../Assests/innerwelcom.png')}
            resizeMode="contain"
            style={Styles.imaginner}
          />
          <Input
            limag={require('../../Assests/msg.png')}
            // rimg={require('../../Assests/innerwelcom.png')}
            val={emailphone}
            plas="Email or Phone Number"
            onchang={txt => setemailphone(txt)}
          />

          <View>
            <RButton
              title="SEND EMAIL"
              onpress={() => {
                emailVarification();
              }}
              color={Colors.black}
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default SendEmail;
