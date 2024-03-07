import {AccessToken, LoginManager} from 'react-native-fbsdk';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {loginUser, registerUser} from '../../Api';
import {useDispatch, useSelector} from 'react-redux';

import Colors from '../../Colors';
import {GoogleSignin} from '@react-native-community/google-signin';
import Header from '../../Components/Header';
import Input from '../../Components/Input';
import Loder from '../../Components/Loder';
import RButton from '../../Components/RButton';
import SplashScreen from 'react-native-splash-screen';
import Styles from './Style';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {userAuthorize} from '../../redux/actions';

const Login = ({navigation}) => {
  const [emailphone, setemailphone] = useState('');
  const [pass, setpass] = useState('');
  const [loding, setloding] = useState(false);
  const dispatch = useDispatch();
  const validate = () => {
    if (pass == '' || emailphone == '') {
      alert('Login info is Required');
      return false;
    } else {
      return true;
    }
  };
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId:
        '569587202958-gmnj4g4lla1vjst9937tkue34q6rtd1b.apps.googleusercontent.com',

      webClientId:
        '569587202958-gmnj4g4lla1vjst9937tkue34q6rtd1b.apps.googleusercontent.com',
      offlineAccess: false,
    });
  }, []);

  useEffect(() => {
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    return appleAuth.onCredentialRevoked(async () => {
      console.warn(
        'If this function executes, User Credentials have been Revoked',
      );
    });
  }, []);

  const appleLogin = async () => {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    console.log('------', appleAuthRequestResponse);
    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
      appleloginSignupfunction(appleAuthRequestResponse);
    }
  };

  const appleloginSignupfunction = res => {
    try {
      setloding(true);
      const data = new FormData();
      data.append('email', res.email);
      data.append('password', res.user);
      // data.append('social', 'true');
      loginUser({
        data: data,
      })
        .then(res => {
          if (res.status == 'success') {
            setloding(false);
            userAuthorize(res)(dispatch);
            // navigation.navigate(use == 'stu' ? 'StudentTab' : 'TeacherTab');
          } else {
            setloding(false);
            console.log('Some Thing Wrong');
          }
        })
        .catch(error => {
          if (error.response.data.status == 'error') {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            let vrifiddate = yyyy + '-' + mm + '-' + dd;
            const data = new FormData();

            data.append('name', res.fullName.familyName);
            data.append('username', res.fullName.familyName);
            data.append('password', res.user);
            data.append('password_confirmation', res.user);
            data.append('email', res.email);
            // data.append('email_verified_at', vrifiddate);
            // data.append('type', type);
            // if (res.user.photo) {
            //   res.user.photo &&
            //     data.append('image', {
            //       uri: res.user.photo,
            //       type: 'image/jpeg',
            //       name: 'image' + new Date() + '.jpg',
            //     });
            //   console.log('data,,,,,', data);
            // }
            registerUser({
              data: data,
            })
              .then(res => {
                if (res.status == 'success') {
                  setloding(false);
                  userAuthorize(res)(dispatch);
                  // navigation.navigate(use == 'stu' ? 'StudentTab' : 'Verificatiion');
                } else {
                  setloding(false);
                  console.log('Some Thing Wrong');
                }
              })
              .catch(error => {
                setloding(false);
                console.log('Message Error', error.response.data);
                if (error?.response?.data?.message?.email) {
                  alert(error?.response?.data?.message?.email);
                } else {
                  setloding(false);
                  console.log('Error Meaasge', error.response.data);
                }
              });
          } else {
            console.log('Message Error', error?.response?.data?.message);
          }
        });
    } catch (error) {
      console.log('Error in Apple Login', error);
    }
  };

  const GoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const res = await GoogleSignin.signIn();
      console.log('{{{{{{{{{{{{{{{{{{', res);
      // const data = {
      //   email: res.user.email,
      //   name: res.user.name,
      //   id: res.user.id,
      //   image: res.user.photo,
      //   loginVia: "google",
      // };
      // setSocialLoginCredentials(data)(dispatch);
      // socialUserLogin(res.user.email, res.user.id);
      setloding(true);
      const data = new FormData();
      data.append('email', res.user.email);
      data.append('password', res.user.id);
      // data.append('social', 'true');
      loginUser({
        data: data,
      })
        .then(res => {
          if (res.status == 'success') {
            setloding(false);
            userAuthorize(res)(dispatch);
            // navigation.navigate(use == 'stu' ? 'StudentTab' : 'TeacherTab');
          } else {
            setloding(false);
            console.log('Some Thing Wrong');
          }
        })
        .catch(error => {
          if (error.response.data.status == 'error') {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            let vrifiddate = yyyy + '-' + mm + '-' + dd;
            const data = new FormData();

            data.append('name', res.user.name);
            data.append('username', res.user.name);
            data.append('password', res.user.id);
            data.append('password_confirmation', res.user.id);
            data.append('email', res.user.email);
            // data.append('email_verified_at', vrifiddate);
            // data.append('type', type);
            if (res.user.photo) {
              res.user.photo &&
                data.append('image', {
                  uri: res.user.photo,
                  type: 'image/jpeg',
                  name: 'image' + new Date() + '.jpg',
                });
              console.log('data,,,,,', data);
            }
            registerUser({
              data: data,
            })
              .then(res => {
                if (res.status == 'success') {
                  setloding(false);
                  userAuthorize(res)(dispatch);
                  // navigation.navigate(use == 'stu' ? 'StudentTab' : 'Verificatiion');
                } else {
                  setloding(false);
                  console.log('Some Thing Wrong');
                }
              })
              .catch(error => {
                setloding(false);
                console.log('Message Error', error.response.data);
                if (error?.response?.data?.message?.email) {
                  alert(error?.response?.data?.message?.email);
                } else {
                  setloding(false);
                  console.log('Error Meaasge', error.response.data);
                }
              });
          } else {
            console.log('Message Error', error?.response?.data?.message);
          }
        });
    } catch (error) {
      setloding(false);
      // alert(error);
    }
  };

  const Faceboologin = async () => {
    LoginManager.logOut();
    LoginManager.setLoginBehavior('web_only');
    LoginManager.logInWithPermissions(['email', 'public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('cancled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            console.log('userdata', data.permissions);
            // const {accessToken} = data;
            // initUser(accessToken);
            const accessToken = data.accessToken.toString();
            getInfoFromToken(accessToken);
          });
        }
      },

      function (error) {
        alert(error);
        console.log('error', error);
      },
    );
  };

  const getInfoFromToken = token => {
    console.log('------------------');
    fetch(
      'https://graph.facebook.com/v2.5/me?fields=email,name,friends,picture&access_token=' +
        token,
    )
      .then(response => response.json())
      .then(json => {
        setloding(true);
        const data = new FormData();
        data.append('email', json.email);
        data.append('password', json.id);
        // data.append('social', 'true');
        loginUser({
          data: data,
        })
          .then(res => {
            console.log('---------', res);

            if (res.status == 'success') {
              setloding(false);
              userAuthorize(res)(dispatch);
              // navigation.navigate(use == 'stu' ? 'StudentTab' : 'TeacherTab');
            } else {
              setloding(false);
              console.log('Some Thing Wrong');
            }
          })
          .catch(error => {
            // setloding(false);
            // console.log('Message Error', error?.response?.data);
            // seterr(error?.response?.data?.message);

            if (error.response.data.status == 'error') {
              var today = new Date();
              var dd = String(today.getDate()).padStart(2, '0');
              var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
              var yyyy = today.getFullYear();

              let vrifiddate = yyyy + '-' + mm + '-' + dd;

              const data = new FormData();

              // data.append('email_verified_at', vrifiddate);

              data.append('name', json.name);
              data.append('username', json.name);
              data.append('password', json.id);
              data.append('password_confirmation', json.id);
              data.append('email', json.email);
              if (json.picture.data.url) {
                json.picture.data.url &&
                  data.append('image', {
                    uri: json.picture.data.url,
                    type: 'image/jpeg',
                    name: 'image' + new Date() + '.jpg',
                  });
                console.log('data,,,,,', data);
              }
              registerUser({
                data: data,
              })
                .then(res => {
                  console.log('-----', res);
                  if (res.status == 'success') {
                    setloding(false);
                    userAuthorize(res)(dispatch);
                    // navigation.navigate(use == 'stu' ? 'StudentTab' : 'Verificatiion');
                  } else {
                    setloding(false);
                    console.log('Some Thing Wrong');
                  }
                })
                .catch(error => {
                  setloding(false);

                  if (error?.response?.data?.message?.email) {
                    alert(error?.response?.data?.message?.email);
                  } else {
                    setloding(false);
                    console.log('Error Meaasge sign up', error.response.data);
                  }
                });
            } else {
              setloding(false);
              console.log('Message Error', error);
            }
          });
      })
      .catch(error => {
        setloding(false);
        alert(error);
      });
  };

  const loginUserInApp = () => {
    setloding(true);
    if (validate()) {
      const data = new FormData();
      data.append('email', emailphone);

      data.append('password', pass);
      console.log('/', data);
      loginUser({
        data: data,
      })
        .then(res => {
          console.log('Response of Login', res);
          if (res.status == 'success') {
            console.log('Signup');
            userAuthorize(res)(dispatch);
            setloding(false);
            // navigation.navigate('SelectTopics');
          } else {
            alert('Some thing want wrong');
            setloding(false);
          }
        })
        .catch(error => {
          setloding(false);
          console.log('Error MEssage of Login', error);
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
      <Header title="LOGIN" />

      <ScrollView style={{flex: 1}}>
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
          <Input
            rcolor={Colors.white}
            limag={require('../../Assests/loc.png')}
            rimg={require('../../Assests/eye.png')}
            val={pass}
            entrytyp="Securee"
            plas="Enter Your Password"
            onchang={txt => setpass(txt)}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SendEmail');
            }}
            style={Styles.forgotouch}>
            <Text style={Styles.textforgot}>Forgot Password?</Text>
          </TouchableOpacity>
          <RButton
            title="LOGIN"
            onpress={() => loginUserInApp()}
            color={Colors.black}
          />
          <View style={Styles.orview}>
            <View style={Styles.linview} />
            <Text style={Styles.donttextor}>OR</Text>
            <View style={Styles.linview} />
          </View>
          <View style={Styles.mainsocialview}>
            <TouchableOpacity
              onPress={() => GoogleLogin()}
              style={Styles.viewimagsocial}>
              <Image
                source={require('../../Assests/google.png')}
                resizeMode="contain"
                style={Styles.imagsocial}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => appleLogin()}
              style={Styles.viewimagsocial}>
              <Image
                source={require('../../Assests/apple.png')}
                resizeMode="contain"
                style={Styles.imagsocial}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Faceboologin()}
              style={Styles.viewimagsocial}>
              <Image
                source={require('../../Assests/facebook.png')}
                resizeMode="contain"
                style={Styles.imagsocial}
              />
            </TouchableOpacity>
          </View>
          <View style={Styles.dontview}>
            <Text style={Styles.donttext}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={Styles.donttextsign}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Login;
