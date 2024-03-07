import {
  ActivityIndicator,
  AppState,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getHome, updatefcm} from '../../Api';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import Colors from '../../Colors';
import Header from '../../Components/Header';
import Input from '../../Components/Input';
import RButton from '../../Components/RButton';
import SplashScreen from 'react-native-splash-screen';
import Styles from './Style';
import messaging from '@react-native-firebase/messaging';
import {userAuthorize} from '../../redux/actions';

const Home = ({navigation}) => {
  const dispatch = useDispatch();

  const [expertise, setexpertise] = useState('');
  const {userData, isLoggedIn} = useSelector(({USER}) => USER);
  const [trend, settrend] = useState([]);
  const [foryou, setforyou] = useState([]);
  const [newit, setnewit] = useState([]);
  const [loding, setloding] = useState(true);
  // console.log('----rdux--------', userData);
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getinitaiap();
      fcm_update();
    });
    return unsubscribe;
  }, [navigation]);

  const fcm_update = async () => {
    let fcmToken = await messaging().getToken();
    const data = new FormData();
    data.append('fcm_token', fcmToken);
    console.log('--------1000009--', fcmToken);
    updatefcm({
      Auth: userData.userdata.api_token,
      data,
    })
      .then(res => {
        let arr = {...userData};
        arr.userdata['fcm_token'] = fcmToken;
        userAuthorize(arr)(dispatch);
        // fcm_token
        console.log(
          'FCM_REASPONDE--------------------...........>>>>>>>>>>>',
          res,
        );
      })
      .catch(error => console.log('Error Message FCm', error));
  };
  const getinitaiap = () => {
    // setloding(true);
    getHome({Auth: userData.userdata.api_token})
      .then(res => {
        console.log('Response of Home66666666', res);
        if (res.status == 'success') {
          settrend(res.trending);
          setforyou(res.foryou);
          setnewit(res.latest);
          setloding(false);
        } else {
          setloding(false);

          console.log('Some thing wamt wrong');
        }
      })
      .catch(err => {
        setloding(false);

        console.log('Error Message of Home', err.response.data);
      });
  };
  const alltrending = ({item}) => (
    <View style={Styles.viewspace}>
      <View style={Styles.viewstrend}>
        <Image
          source={
            item.thumbnail
              ? {uri: item.thumbnail}
              : item.file_type == 'mp3'
              ? require('../../Assests/man.png')
              : require('../../Assests/vi.png')
          }
          resizeMode={item.file_type == 'mp3' ? 'contain' : 'cover'}
          style={[Styles.imaginner, {backgroundColor: Colors.white}]}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Response', {quesid: item});
        }}
        style={[
          Styles.viewstrend,
          {
            position: 'absolute',
            justifyContent: 'space-around',
            alignItems: 'center',
            // backgroundColor: Colors.transperent,
          },
        ]}>
        <View style={[Styles.rowview, {top: 0}]}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={Styles.videoname}>
            {item.expertes[0]}
          </Text>
        </View>
        {/* <View style={Styles.imagevie}> */}
        <Image
          source={require('../../Assests/ply.png')}
          resizeMode="cover"
          style={Styles.iocnimag}
        />
        {/* </View> */}
        <View style={Styles.rowview}>
          <View>
            <Image
              source={require('../../Assests/Heart.png')}
              resizeMode="cover"
              style={[
                Styles.iocnimag,
                {tintColor: item.is_like ? Colors.red : Colors.gray},
              ]}
            />
            <Text style={Styles.cottxt}>
              {item.total_like != '00' ? item.total_like : null}
            </Text>
          </View>
          <View>
            <Image
              source={require('../../Assests/Chat.png')}
              resizeMode="cover"
              style={[
                Styles.iocnimag,
                {tintColor: item.is_comment ? Colors.blue : Colors.gray},
              ]}
            />
            <Text style={Styles.cottxt}>
              {item.total_comment != '00' ? item.total_comment : null}
            </Text>
          </View>
          <View>
            <Image
              source={require('../../Assests/Send.png')}
              resizeMode="cover"
              style={[
                Styles.iocnimag,
                {tintColor: item.is_share ? Colors.blue : Colors.gray},
              ]}
            />
            <Text style={Styles.cottxt}>
              {item.total_share != '00' ? item.total_share : null}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
  const [trend1, settrend1] = useState([]);
  const [foryou1, setforyou1] = useState([]);
  const [newit1, setnewit1] = useState([]);
  const search = txt => {
    if (txt != '') {
      let arr = [];
      let arr1 = [];
      let arr2 = [];
      if (trend1.length == 0 || foryou1.length == 0 || newit1.length == 0) {
        settrend1(trend);
        setforyou1(foryou);
        setnewit1(newit1);
        trend.forEach(item => {
          let y = item.expertes.filter(sub =>
            String(sub.toLowerCase()).startsWith(txt.toLowerCase()),
          );
          if (y.length > 0) {
            arr.push(item);
          }
        });
        foryou.forEach(item => {
          let y = item.expertes.filter(sub =>
            String(sub.toLowerCase()).startsWith(txt.toLowerCase()),
          );
          if (y.length > 0) {
            arr1.push(item);
          }
        });
        newit.forEach(item => {
          let y = item.expertes.filter(sub =>
            String(sub.toLowerCase()).startsWith(txt.toLowerCase()),
          );
          if (y.length > 0) {
            arr2.push(item);
          }
        });
        settrend(arr);
        setforyou(arr1);
        setnewit(arr2);
        console.log('-----', arr, arr1, arr2);
      } else {
        trend1.forEach(item => {
          let y = item.expertes.filter(sub =>
            String(sub.toLowerCase()).startsWith(txt.toLowerCase()),
          );
          if (y.length > 0) {
            arr.push(item);
          }
        });
        foryou1.forEach(item => {
          let y = item.expertes.filter(sub =>
            String(sub.toLowerCase()).startsWith(txt.toLowerCase()),
          );
          if (y.length > 0) {
            arr1.push(item);
          }
        });
        newit1.forEach(item => {
          let y = item.expertes.filter(sub =>
            String(sub.toLowerCase()).startsWith(txt.toLowerCase()),
          );
          if (y.length > 0) {
            arr2.push(item);
          }
        });
        settrend(arr);
        setforyou(arr1);
        setnewit(arr2);
        console.log('-----', arr, arr1, arr2);
      }
    } else {
      getinitaiap();
    }
  };

  return (
    <ImageBackground
      source={require('../../Assests/bg1.png')}
      resizeMode="stretch"
      style={Styles.image}>
      <Header navigation={navigation} title="Home" />
      {!loding ? (
        <ScrollView style={{flex: 1}}>
          <View style={Styles.innercontainer}>
            <Input
              rcolor={Colors.white}
              limag={require('../../Assests/search.png')}
              val={expertise}
              plas="Search Topics"
              onchang={txt => {
                search(txt), setexpertise(txt);
              }}
            />

            {trend.length > 0 ? (
              <View>
                <View style={Styles.hedview}>
                  <Text style={Styles.hrtitle}>TRENDING</Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('SeeAll', {type: 'Trending'})
                    }
                    style={Styles.seetouch}>
                    <Text style={Styles.hrtitlesee}>See More</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <View
                    style={{
                      backgroundColor: 'transparent',
                      height: wp(35),
                      width: wp(100),
                      alignItems: 'center',
                      // position: 'absolute',
                      // zIndex: 9,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={Styles.leftstyle}>
                      <Image
                        source={require('../../Assests/left.png')}
                        resizeMode="cover"
                        style={[Styles.imaginner1]}
                      />
                    </View>
                    <View style={Styles.flatview}>
                      <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={trend}
                        renderItem={alltrending}
                      />
                    </View>
                    <View style={Styles.rightstyle}>
                      <Image
                        source={require('../../Assests/right.png')}
                        resizeMode="cover"
                        style={[Styles.imaginner1]}
                      />
                    </View>
                  </View>
                </View>
              </View>
            ) : null}
            <View style={Styles.lineview} />
            {foryou.length > 0 ? (
              <>
                <View style={Styles.hedview}>
                  <Text style={Styles.hrtitle}>FOR YOU</Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('SeeAll', {type: 'Foryou'})
                    }
                    style={Styles.seetouch}>
                    <Text style={Styles.hrtitlesee}>See More</Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    backgroundColor: 'transparent',
                    height: wp(35),
                    width: wp(100),
                    alignItems: 'center',
                    // position: 'absolute',
                    // zIndex: 9,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={Styles.leftstyle}>
                    <Image
                      source={require('../../Assests/left.png')}
                      resizeMode="cover"
                      style={[Styles.imaginner1]}
                    />
                  </View>
                  <View style={Styles.flatview}>
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      data={foryou}
                      renderItem={alltrending}
                    />
                  </View>
                  <View style={Styles.rightstyle}>
                    <Image
                      source={require('../../Assests/right.png')}
                      resizeMode="cover"
                      style={[Styles.imaginner1]}
                    />
                  </View>
                </View>
              </>
            ) : null}
            <View style={Styles.lineview} />

            {newit.length > 0 ? (
              <>
                <View style={Styles.hedview}>
                  <Text style={Styles.hrtitle}>NEW</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('SeeAll', {type: 'New'})}
                    style={Styles.seetouch}>
                    <Text style={Styles.hrtitlesee}>See More</Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    backgroundColor: 'transparent',
                    height: wp(35),
                    width: wp(100),
                    // position: 'absolute',
                    // zIndex: 9,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={Styles.leftstyle}>
                    <Image
                      source={require('../../Assests/left.png')}
                      resizeMode="cover"
                      style={[Styles.imaginner1]}
                    />
                  </View>
                  <View style={Styles.flatview}>
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      data={newit}
                      renderItem={alltrending}
                    />
                  </View>
                  <View style={Styles.rightstyle}>
                    <Image
                      source={require('../../Assests/right.png')}
                      resizeMode="cover"
                      style={[Styles.imaginner1]}
                    />
                  </View>
                </View>
              </>
            ) : null}
          </View>
        </ScrollView>
      ) : loding ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={Colors.maincolor} />
        </View>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>No Record Yet Found...</Text>
        </View>
      )}
    </ImageBackground>
  );
};

export default Home;
