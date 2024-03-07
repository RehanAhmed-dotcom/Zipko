import { Codeverified, registerUser } from '../../Api';
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
import Header from '../../Components/Header';
import Input from '../../Components/Input';
import Loder from '../../Components/Loder';
import RButton from '../../Components/RButton';
import Styles from './Style';
import { userAuthorize } from '../../redux/actions';

const VerifiyCode = ({ navigation, route }) => {
  const [emailphone, setemailphone] = useState('');
  const [pass, setpass] = useState('');
  const [loding, setloding] = useState(false);
  const dispatch = useDispatch();
  const validate = () => {
    if (emailphone == '') {
      alert('Enter Your Verification Code');
      return false;
    } else if (!emailphone.match(/^-?\d+$/)) {
      alert('Code is Not Correct');
      return false;
    } else {
      return true;
    }
  };
  const Varificationtoken = () => {
    setloding(true);
    setTimeout(() => {
      Varificationtoken_api();
    }, 2000);
  };
  const Varificationtoken_api = () => {
    setloding(true);
    if (validate()) {
      const dat = new FormData();
      // data.append('email', route.params.email);
      dat.append('token', emailphone);

      Codeverified({
        data: dat,
      })
        .then(res => {
          console.log('Response of Code Varification', res);
          if (res.status == 'success') {
            setloding(false);
            navigation.navigate('ChangePassword', {
              token: emailphone,
              email: route.params.email,
            });
          } else {
            alert('Some thing want wrong');
            setloding(false);
          }
        })
        .catch(error => {
          setloding(false);
          console.log('Error MEssage of Code', error.response.data);
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
      <Header title="Email Verification" />

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
            plas="Enter Verification Code"
            onchang={txt => setemailphone(txt)}
          />
          {/* <Input
            rcolor={Colors.white}
            limag={require('../../Assests/loc.png')}
            rimg={require('../../Assests/eye.png')}
            val={pass}
            entrytyp="Securee"
            plas="Enter Your Password"
            onchang={txt => setpass(txt)}
          /> */}

          <RButton
            title="SUBMIT"
            onpress={() => Varificationtoken()}
            color={Colors.black}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default VerifiyCode;
