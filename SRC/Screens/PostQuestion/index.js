import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  OnlineNotification,
  getExperties,
  getandCreateExperties,
  postNewQuestion,
} from '../../Api';
import React, {useEffect, useRef, useState} from 'react';
// import {Role, RtcTokenBuilder} from 'react-native-agora';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import Colors from '../../Colors';
import Header from '../../Components/Header';
import ImagePicker from 'react-native-image-crop-picker';
import Input from '../../Components/Input';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import Loder from '../../Components/Loder';
import RButton from '../../Components/RButton';
import SignupStyle from '../Signup/Style';
import Sound from 'react-native-sound';
import Styles from './Style';
import Video from 'react-native-video';
import {createThumbnail} from 'react-native-create-thumbnail';

// const {
//   RtcTokenBuilder,
//   RtmTokenBuilder,
//   RtcRole,
//   RtmRole,
// } = require('agora-access-token');
const PostQuestion = ({navigation, route}) => {
  const {userData, isLoggedIn} = useSelector(({USER}) => USER);

  const [modalVisible, setmodalVisible] = useState(false);
  const [typequestion, settypequestion] = useState('');
  const [thumbailarr, setthumbailarr] = useState([]);
  const [currentply, setcurrentply] = useState(0);
  const [currentply1, setcurrentply1] = useState(0);
  const [currentply2, setcurrentply2] = useState(0);
  const [idstag, setidstag] = useState([]);
  const [shoethumb, setshoethumb] = useState('');

  const videoPlayer = useRef(null);
  const [expertise, setexpertise] = useState('');
  const [playpasuse, setplaypasuse] = useState(true);
  const [tagarray, settagarray] = useState([]);
  const [tagdatabase, settagdatabase] = useState([]);
  const [allSemilar, setallSemilar] = useState([]);
  const [loding, setloding] = useState(false);
  const whoosh = useRef(null);
  const [playing, setPlaying] = useState(false);

  const [duration, setDuration] = useState(0);
  const color = [
    {bac: 'rgba(6, 146, 203, 0.3)', col: '#0691CB'},
    {bac: 'rgba(128, 81, 205 ,0.3)', col: '#8051CD'},
    {bac: 'rgba(76 ,175 ,80 ,0.3)', col: '#4CAF50'},
    {bac: 'rgba(245 ,0 ,0 ,0.3)', col: '#F50000'},
  ];
  useEffect(() => {
    if (route?.params?.videourl) {
      createThumbail();
    }
  }, [navigation]);
  // console.log('000--', thumbailarr);
  // const createThumbailmain = async () => {
  //   let r = await createThumbail();
  //   console.log('000----', r);
  //   // setthumbailarr(r);
  // };
  useEffect(() => {
    getAllExperties();
  }, [navigation]);
  const getAllExperties = () => {
    getExperties()
      .then(res => {
        if (res.status == 'success') {
          settagdatabase(res.data);
          // console.log('Experties++++++++++++++++++++++++++', res);
        } else {
          alert('Some thing Went wrong');
        }
      })
      .catch(err => {
        console.log('Error Of Experties', err);
      });
  };
  const searchExpertiseFilters = txt => {
    let y = tagdatabase.filter(x =>
      x.title.toLowerCase().startsWith(txt.toLowerCase()),
    );
    setallSemilar(y);
  };
  const validate = () => {
    if (idstag.length == 0) {
      alert('Add your hashtags');
      return false;
    } else if (typequestion == '') {
      alert('Plyes Type Your Question');
      return false;
    } else {
      return true;
    }
  };

  const LiceCallAnoused1 = async () => {
    const appId = '009784133fa7421b8877ef50ccb552e4';
    const appCertificate = '273d7f672051477ca02a8fd74baed8ef';
    const channelName = 'hassan';
    const uid = 2882341273; // The integer uid, required for an <Vg k="VSDK" /> token
    const expirationTimeInSeconds = 3600; // The time after which the token expires

    // Set the user role.
    let role = 1;
    // Set token expire time.
    let ExpireTime = 60;
    // The base URL to your token server. For example, https://agora-token-service-production-92ff.up.railway.app".
    let serverUrl =
      'https://agora-token-service-production-92ff.up.railway.app';
    try {
      const response = await fetch(
        serverUrl +
          channelName +
          '/' +
          role +
          '/uid/' +
          uid +
          '/?expiry=' +
          ExpireTime,
      );
      const data = await response.json();
      let token = data.rtcToken;
      console.log('New Token Generate Successfully', token);
    } catch (error) {
      console.log('Error in Token Genration', error);
    }
  };
  const LiceCallAnoused = () => {
    if (userData.coin >= 10) {
      OnlineNotification({Auth: userData.userdata.api_token})
        .then(res => {
          console.log('Response Of live call notication', res);
          navigation.navigate('AskLive', {
            callType: 'video',
            guestData: 'kkk',
            channel: 'ooo',
            Name: 'jjjj',
            Number: '00000000',
            User: true,
          });
        })
        .catch(err => {
          setloding(false);
          console.log('Error of Post Question', err.response);
        });
    } else {
      Alert.alert('Zero Coins', 'Purchase coins to make a live call', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => navigation.navigate('BottomTab', {screen: 'Coins'}),
        },
      ]);
    }
  };

  const postQuestion = freepay => {
    setloding(true);
    if (validate()) {
      const data = new FormData();

      const datanew = {
        file_type: route?.params?.videourl?.path ? 'mp4' : 'mp3',
        duration_information: typequestion,
        is_paid: freepay,
        description: duration ? duration : route?.params?.videourl?.duration,
        file: {
          uri: route?.params?.videourl?.path,
          type: 'video/mp4',
          name: 'Video' + new Date() + '.mp4',
        },
        thumbnail: {
          uri: shoethumb,
          type: 'image/jpeg',
          name: 'image' + new Date() + '.jpg',
        },
        'expertise[]': idstag,
      };
      data.append('file_type', route?.params?.videourl?.path ? 'mp4' : 'mp3');
      data.append('duration_information', typequestion);
      data.append('is_paid', freepay);

      data.append(
        'description',
        duration ? duration : route?.params?.videourl?.duration,
      );

      if (route?.params?.videourl?.path) {
        route?.params?.videourl?.path &&
          data.append('file', {
            uri: route?.params?.videourl?.path,
            type: 'video/mp4',
            name: 'Video' + new Date() + '.mp4',
          });
        console.log('data,,,,,', data);
      }
      if (route?.params?.recrdfilepath) {
        route?.params?.recrdfilepath &&
          data.append('file', {
            uri: `file://${route?.params?.recrdfilepath}`,
            type: 'audio/mp3',
            name: 'audio' + new Date() + '.mp3',
          });
        console.log('data,,,,,', data);
      }
      if (route?.params?.videourl?.path) {
        shoethumb &&
          data.append('thumbnail', {
            uri: shoethumb,
            type: 'image/jpeg',
            name: 'image' + new Date() + '.jpg',
          });
        console.log('data,,,,,', data);
      }
      idstag.forEach(element => {
        data.append('expertise[]', element);
      });
      console.log('Post Data', data);
      postNewQuestion({Auth: userData.userdata.api_token}, data)
        .then(res => {
          console.log('Response Of Post New Question', res);
          alert('Question Post Successfully');
          if (res.status == 'success' && res.type == 'coin') {
            setloding(false);
            alert(`${res.message}`);
          } else {
            setloding(false);
            navigation.navigate('BottomTab');
          }
        })
        .catch(err => {
          setloding(false);
          console.log('Error of Post Question', err.response);
        });
    } else {
      setloding(false);
    }
  };
  const createThumbail = async () => {
    let uy = '1';
    let iy = route.params.videourl.duration.toString().length;
    let y = parseInt(uy.padEnd(iy, 0));
    console.log('----6666666', y, iy);
    let num = parseInt(route.params.videourl.duration / y);

    let count = 0;
    let arr = [];
    for (let i = 1; i <= num; i++) {
      await runThummail(i)
        .then(res => {
          arr.push(res);
          if (shoethumb == '') {
            setshoethumb(arr[0].path);
          }
          count = count + 1;
          if (count == num) {
            setthumbailarr(arr);
          }
          // console.log('--------------->', res);
        })
        .catch(err => {
          console.log('Con', err);
        });
      // console.log('---9999----', arr);

      // arr.push(r);
    }
  };
  const runThummail = async i => {
    let tim = parseInt(
      parseInt(route.params.videourl.duration / 5) * parseInt(i),
    );
    console.log('--------', route.params.videourl);
    return createThumbnail({
      url: route.params.videourl.path,
      // timeStamp: parseInt(1000, 10),
      timeStamp: tim,
      format: 'png',
    })
      .then(response => {
        // console.log('ooo000----', response);
        let u = {id: i, path: response.path};
        return u;
      })
      .catch(err => {
        console.log('Error Message-->', err);
      });
  };
  const addTag = tx => {
    if (tx != '') {
      let arr = [];
      arr = [...tagarray];
      if (arr.length > 0) {
        let ides = arr.length - 1;
        arr.push({
          id: parseInt(arr[ides].id) + 1,
          tagtext: tx,
          color: color[Math.floor(Math.random() * (0 - 3 + 1)) + 3],
        });

        settagarray(arr);
        setexpertise('');
      } else {
        arr.push({
          id: 1,
          tagtext: tx,
          color: color[Math.floor(Math.random() * (0 - 3 + 1)) + 3],
        });
        settagarray(arr);
        setexpertise('');
      }
    } else {
      setexpertise('');
    }
  };
  const removetag = id => {
    let arr = [];
    arr = [...tagarray];
    if (arr.length > 0) {
      let y = arr.findIndex(x => x.id == id);
      if (y != -1) {
        arr.splice(y, 1);
      }
      settagarray(arr);
    } else {
      settagarray([]);
    }
  };
  const [cu, setcu] = useState(0);

  // setTimeout(() => {
  //   if (!playpasuse) {
  //     getcurrenttime();
  //   }
  // }, 1000);
  whoosh?.current?.getCurrentTime((seconds, isPlaying) => {
    setcurrentply1(parseInt(seconds));
    setcurrentply2(seconds / 100);
    getcurrenttimesound(parseInt(seconds));
    console.log('----,', seconds);
  });
  let cui = 0;
  const getcurrenttime = tim => {
    setcurrentply(tim);
    console.log('---', tim);
    let it = parseInt(route.params.videourl.duration) / 1000;
    let u = (parseInt(tim) / it) * 95;
    console.log('--', parseInt(u));
    cui = tim;
    setcu(parseInt(u));
    if (tim >= it - 1) {
      setplaypasuse(true);
    }
  };

  const getcurrenttimesound = tim => {
    setcurrentply(tim);
    console.log('---', tim);
    let it = parseInt(duration) / 1000;
    let u = (parseInt(tim) / it) * 95;
    console.log('--', parseInt(u));
    cui = tim;
    setcu(parseInt(u));
    if (tim >= it - 1) {
      setplaypasuse(true);
    }
  };
  const containsWhitespace = str => {
    return /\s/.test(str);
  };
  const addTagtoList = item => {
    console.log('first--', tagarray, idstag, tagarray.length, item);
    if (tagarray.length > 0) {
      let y = tagarray.findIndex(itm => itm.tagtext == item.title);

      if (y != -1) {
        alert('allready here');
      } else {
        setidstag([...idstag, item.id]);
        addTag(item.title);
      }
    } else {
      setidstag([...idstag, item.id]);
      addTag(item.title);
    }
  };
  const removieidtag = item => {
    if (tagarray.length > 0) {
      let y = tagarray.find(item => item.tagtext == item.title);
      if (y != -1) {
        let ar = [...idstag];
        ar.splice(y, 1);
        setidstag(ar);
        removetag(item.id);
      } else {
      }
    }
  };

  const start = async () => {
    // await AddTrackplayer();
    if (playpasuse) {
      console.log('111111');
      SoundPlayer();

      // await TrackPlayer.play();
    } else {
      console.log('22222');
      whoosh.current.pause();
      // await TrackPlayer.stop();
    }
  };
  // setTimeout(() => {
  //   console.log('==09999', currentply);
  //   if (recrdfilepath != '' && !playpasuse) {
  //     if (!playpasuse && currentply != 0) {
  //       setcurrentply(parseInt(currentply) * 1000 - 1000);
  //     } else {
  //       setplaypasuse(false);
  //     }
  //   }
  // }, 1000);

  useEffect(() => {
    if (route?.params?.recrdfilepath != '') {
    } else {
      setPlaying(false);
    }
    return () => {
      if (whoosh.current) {
        whoosh.current.stop();
      }
    };
  }, []);

  const SoundPlayer = () => {
    whoosh.current = new Sound(
      `file://${route?.params?.recrdfilepath}`,
      null,
      error => {
        if (error) {
          return;
        }
        setDuration(whoosh.current.getDuration());
        setPlaying(true);

        whoosh.current.play(success => {
          if (success) {
            // if (soundIndex < soundUrls.length) {
            //   setSoundIndex(soundIndex + 1);
            // } else {
            //   setPlaying(false);
            // }
          } else {
          }
        });
      },
    );
  };
  const addnewExperties = () => {
    getandCreateExperties({nam: expertise})
      .then(res => {
        if (res.status == 'success') {
          console.log('Resonse of new Experties', res);
          setallSemilar([]), setexpertise(''), setidstag([...idstag, res.id]);
          addTag(expertise);
        } else {
          alert('Some thing Went wrong');
        }
      })
      .catch(err => {
        console.log('Error Of Experties', err);
      });
  };
  const allcoversvideo = ({item}) => (
    <View style={Styles.coverrstylspace}>
      <TouchableOpacity
        style={[
          Styles.coverrstyl12,
          {
            backgroundColor:
              shoethumb == item?.path ? Colors.maincolor : Colors.white,
          },
        ]}
        onPress={() => setshoethumb(item?.path)}>
        <Image
          // source={require('../../Assests/vi.png')}
          source={{uri: item?.path}}
          resizeMode="cover"
          style={Styles.coverrstyl}
        />
      </TouchableOpacity>
    </View>
  );
  const hashestab = ({item}) => (
    <View style={SignupStyle.haviewspace}>
      <View style={[SignupStyle.haview, {backgroundColor: item.color.bac}]}>
        <Text style={[SignupStyle.txt33, {color: item.color.col}]}>
          #{item.tagtext}
        </Text>
        <TouchableOpacity
          onPress={() => removieidtag(item)}
          style={SignupStyle.crosstouch}>
          <Image
            source={require('../../Assests/cross.png')}
            resizeMode="contain"
            style={[SignupStyle.crossimg, {tintColor: item.color.col}]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
  const listtag = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        setallSemilar([]), setexpertise(''), addTagtoList(item);
      }}
      style={Styles.touchtag}>
      <Text style={Styles.textouch}>{item.title}</Text>
    </TouchableOpacity>
  );
  return (
    <ImageBackground
      source={require('../../Assests/bac1.png')}
      resizeMode="cover"
      style={Styles.image}>
      <Header left="true" navigation={navigation} title="Ask A Question" />
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <ScrollView style={{flex: 1}}>
          <View style={Styles.innercontainer}>
            <Loder lodertyp={loding} />
            <View style={Styles.Videoview}>
              <View style={Styles.recodmenuview}>
                {/* {videourl ? (
                <Video
                  ref={videoPlayer}
                  source={{uri: videourl.path}}
                  style={Styles.recodmenuview}
                  paused={playpasuse}
                  onProgress={data => setcurrentply(data.currentTime)}
                  // currentPlaybackTime={tim => setcurrentply(tim)}
                />
              ) : ( */}
                <Text style={Styles.text}>
                  {typequestion != '' ? typequestion : 'Add Your Question'}
                </Text>
                {route.params.typ != 'mp3' ? (
                  route?.params?.videourl?.path && !playpasuse ? (
                    <>
                      <Video
                        ref={videoPlayer}
                        resizeMode="cover"
                        source={{uri: route?.params?.videourl?.path}}
                        style={Styles.thumbimg}
                        paused={playpasuse}
                        onComplete={() => setplaypasuse(true)}
                        onProgress={data => getcurrenttime(data.currentTime)}
                        // currentPlaybackTime={tim => getcurrenttime(tim)}
                      />
                      <View
                        style={{
                          width: wp(cu),

                          height: wp(1),
                          backgroundColor: Colors.maincolor,
                          position: 'absolute',
                          alignSelf: 'flex-start',
                          top: wp(56),
                        }}
                      />
                      <Text
                        style={{
                          fontWeight: '600',
                          fontSize: 14,
                          color: Colors.black,
                        }}>
                        {parseInt(
                          parseInt(route.params.videourl.duration) / 1000 -
                            currentply,
                        )}
                      </Text>
                    </>
                  ) : (
                    <Image
                      source={
                        shoethumb == ''
                          ? thumbailarr.length > 0
                            ? {uri: thumbailarr[0]?.path}
                            : require('../../Assests/vi.png')
                          : {uri: shoethumb}
                      }
                      resizeMode="cover"
                      style={Styles.thumbimg}
                    />
                  )
                ) : playpasuse ? (
                  <Image
                    source={require('../../Assests/man.png')}
                    resizeMode="contain"
                    style={[
                      Styles.recodmenuview,
                      {elevation: 2, backgroundColor: Colors.white},
                    ]}
                  />
                ) : (
                  <>
                    <View
                      style={[
                        Styles.recodmenuview23,
                        {
                          elevation: 2,
                          backgroundColor: Colors.white,
                          borderBottomWidth: 3,
                          borderBottomColor: Colors.red,
                        },
                      ]}>
                      <Image
                        source={require('../../Assests/man.png')}
                        resizeMode="contain"
                        style={[
                          Styles.recodmenuview,
                          {
                            elevation: 2,
                            backgroundColor: Colors.white,
                          },
                        ]}
                      />
                    </View>
                    <View
                      style={{
                        width: wp(cu),
                        // width: wp(40),
                        height: wp(1),
                        backgroundColor: Colors.maincolor,
                        position: 'absolute',
                        alignSelf: 'flex-start',
                        top: wp(60),
                      }}
                    />
                    <Text
                      style={{
                        fontWeight: '600',
                        fontSize: 14,
                        color: Colors.black,
                        bottom: wp(10),
                      }}>
                      {duration}
                    </Text>
                  </>
                )}
                {/* {videourl ? (
               
              ) : ( */}
                {/* )} */}
                <TouchableOpacity
                  onPress={() => {
                    // if (route?.params?.recrdfilepath != '') {
                    //   // start(), setplaypasuse(!playpasuse);
                    //   if (!playpasuse) {
                    //     whoosh.current.stop();
                    //   }
                    // } else {
                    // setplaypasuse(!playpasuse);
                    navigation.navigate('PlayVideoScreen', {
                      ply: {
                        description: route?.params?.videourl.duration,
                        file: route?.params?.videourl.path,
                        file_type: route?.params?.videourl.mime,
                        creationDate: null,
                      },
                      typ: 'question',
                    });
                    // }
                  }}
                  style={Styles.touchrec1}>
                  <Image
                    source={
                      playpasuse
                        ? require('../../Assests/ply.png')
                        : require('../../Assests/pas.png')
                    }
                    resizeMode="contain"
                    style={Styles.imaginner1}
                  />
                </TouchableOpacity>
              </View>
              {/* <Progress.Bar progress={currentply / 100} width={330} /> */}

              {/* <View style={Styles.timerview}>
              <Text>00:00</Text>
              <Text>01:00</Text>
            </View> */}
            </View>
            {route.params.typ != 'mp3' ? (
              <View style={[Styles.hedview, {marginTop: 20}]}>
                <Text style={Styles.textheader}>SELECT VIDEO COVER</Text>
              </View>
            ) : null}
            {thumbailarr.length > 0 && route.params.typ != 'mp3' ? (
              <View style={Styles.flatviecover}>
                <FlatList
                  horizontal
                  data={thumbailarr}
                  renderItem={allcoversvideo}
                />
              </View>
            ) : null}
            <View style={Styles.hedview}>
              <Text style={Styles.textheader}>TYPE QUESTION</Text>
            </View>

            <TextInput
              multiline={true}
              value={typequestion}
              style={Styles.inputstyl}
              placeholderTextColor={Colors.gray}
              placeholder="Write a question"
              onChangeText={txt => {
                let arr = typequestion.split(' ');

                let y = arr.filter(word => word !== '').length;
                if (y < 50) {
                  settypequestion(txt);
                } else {
                  alert('Enter your Question in 50 Words');
                }
              }}></TextInput>
            <View style={Styles.hedview}>
              <Text style={Styles.textheader}>FIELD OF EXPERTISE</Text>
            </View>
            <Input
              rcolor={Colors.white}
              limag={require('../../Assests/search.png')}
              val={expertise}
              plas="Search Expertise"
              // onchang={txt => {
              //   searchExpertiseFilters(txt), setexpertise(txt);
              // }}
              sub={() => {
                addnewExperties();
              }}
              onchang={txt => {
                searchExpertiseFilters(txt);
                setexpertise(txt);
              }}
              // onchang={txt =>
              //   txt
              //     ? containsWhitespace(txt)
              //       ? addTag(txt)
              //       : setexpertise(txt)
              //     : setexpertise(txt)
              // }
            />
            {allSemilar.length > 0 ? (
              <View style={Styles.flatlisviewlist}>
                <FlatList data={allSemilar} renderItem={listtag} />
              </View>
            ) : expertise != '' ? (
              <Text style={Styles.textouch}>No tag yet found...</Text>
            ) : null}
            {tagarray.length > 0 ? (
              <View style={SignupStyle.flatlisview}>
                <FlatList horizontal data={tagarray} renderItem={hashestab} />
              </View>
            ) : null}
            <View style={Styles.buttonview}>
              <View style={{flexDirection: 'column', marginTop: hp(1.3)}}>
                <RButton
                  onpress={() => LiceCallAnoused()}
                  color={Colors.red}
                  title={
                    <View
                      style={[
                        Styles.liveview,
                        {width: wp(40), height: wp(12)},
                      ]}>
                      <Image
                        source={require('../../Assests/liv.png')}
                        resizeMode="contain"
                        style={[
                          Styles.imaginner1,
                          {width: wp(6), height: wp(6)},
                        ]}
                      />
                      <Text style={Styles.asklivtxt}>ASK LIVE</Text>
                    </View>
                  }
                  width="40"
                  height="12"
                />
                <Text
                  style={{textAlign: 'center', fontSize: 16, color: 'green'}}>
                  Rate: 10 coins/min
                </Text>
              </View>

              <RButton
                onpress={() => setmodalVisible(true)}
                title="POST"
                width="40"
                height="12"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={Styles.centeredView}>
          <View style={Styles.confmodal}>
            <Text style={Styles.temodal}>
              Whould you prefer quick response?
            </Text>
            <Text style={Styles.temodal1}>
              (Paying 25 coins will notifiy experties on field)
            </Text>
            <View style={Styles.viewmobu}>
              <TouchableOpacity
                onPress={() => {
                  postQuestion(0), setmodalVisible(false);
                }}
                style={Styles.touchmodalbu1}>
                <Text style={Styles.textmo1}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  postQuestion(1), setmodalVisible(false);
                }}
                style={Styles.touchmodalbu}>
                <Text style={Styles.textmo}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default PostQuestion;
