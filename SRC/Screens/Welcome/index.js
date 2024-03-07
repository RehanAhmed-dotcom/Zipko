import { Image, ImageBackground, ScrollView, Text, View } from 'react-native';
import React, { useEffect } from 'react';

import Color from '../../Colors';
import RButton from '../../Components/RButton';
import SplashScreen from 'react-native-splash-screen';
import Styles from './Style';

const Welcome = ({ navigation }) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <ImageBackground
      source={require('../../Assests/back.png')}
      resizeMode="cover"
      style={Styles.image}>
      <Image
        source={require('../../Assests/log.png')}
        resizeMode="contain"
        style={Styles.log}
      />
      <Image
        source={require('../../Assests/innerwelcom.png')}
        resizeMode="contain"
        style={Styles.imaginner}
      />
      <View style={Styles.textview}>
        <Text style={Styles.txt1}>GET STARTED</Text>
        <Text style={Styles.txt2}>Hello , Welcome to Zikpo</Text>
        <Text style={Styles.txt3}>Library of Video responses</Text>
      </View>
      <RButton
        onpress={() => navigation.navigate('Login')}
        title="LOGIN"
        color={Color.black}
      />
      <RButton onpress={() => navigation.navigate('Signup')} title="SIGNUP" />
    </ImageBackground>
  );
};

export default Welcome;
