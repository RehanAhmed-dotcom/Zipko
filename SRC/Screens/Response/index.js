import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import Colors from '../../Colors';
import Header from '../../Components/Header';
import ImagePicker from 'react-native-image-crop-picker';
import Input from '../../Components/Input';
import RButton from '../../Components/RButton';
import SignupStyle from '../Signup/Style';
import Sound from 'react-native-sound';
import Styles from './Style';
import Video from 'react-native-video';
import {viewQuestionDetail} from '../../Api';

const Response = ({navigation, route}) => {
  const {userData, isLoggedIn} = useSelector(({USER}) => USER);

  const [modalVisible, setmodalVisible] = useState(false);
  const [typequestion, settypequestion] = useState('');
  const [currentply, setcurrentply] = useState(0);
  // console.log('[[==', JSON.stringify(route.params.quesid));
  // console.log('[[==', JSON.parse(route.params.quesid));
  const videoPlayer = useRef(null);

  const [videourl, setvideourl] = useState({});
  const [playpasuse, setplaypasuse] = useState(true);
  const [cu, setcu] = useState(0);
  const [loding, setloding] = useState(false);
  const [expertise, setexpertise] = useState('');
  const [responarr, setresponarr] = useState([]);
  const [responarr1, setresponarr1] = useState([]);
  const [tagarray, settagarray] = useState([]);
  const [whole, setwhole] = useState({});
  // console.log("[[[[firsthfhfhfhfhfhfhfhfhfhfhfhfh]]]]", whole.thumbnail)
  // console.log("[[[[firsthfhfhfhfhfhfhfhfhfhfhfhfh]]]]", responarr1)
  // console.log("[[[[firstyyyyyyyyyyi]]]]", responarr)

  // console.log('::::::+++++++++', route.params.quesid);
  console.log('----00pp000', responarr);
  console.log('----00pp00s0', responarr1);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setresponarr([]);
      setresponarr1([]);
      questionSingleView();
    });
    return unsubscribe;
  }, []);

  console.log(
    '{}{}{}{}{}{}{}{}{}{}{}',
    route.params.quesid?.question_id
      ? `response ${route.params.quesid?.question_id}`
      : route.params.quesid?.id,
  );
  console.log('{}{}{}{}{}{}{}{}{}{}{}', route.params.quesid);
  const questionSingleView = () => {
    setloding(true);
    // console.log("------sssssssss", route.params.quesid?.question_id ? route.params.quesid?.question_id : route.params.quesid?.id);
    viewQuestionDetail({
      Auth: userData.userdata.api_token,
      data: route.params.quesid?.question_id
        ? route.params.quesid?.question_id
        : route.params.quesid?.id,
    })
      .then(res => {
        // console.log(
        //   '---Response data against single question',
        //   res
        // );
        if (!Array.isArray(res)) {
          if (res.data.response.length > 2) {
            let arr = [];
            let arr1 = [];
            for (let i = 1; i <= res.data.response.length; i++) {
              // if (i % 2 == 0) {
              //   arr.push(res.data.response[i]);
              // } else {
              //   arr1.push(res.data.response[i]);
              // }
              // console.log('first', res.data.response[i].file_type);
              if (arr.length == arr1.length) {
                arr.push(res.data.response[i - 1]);
              } else if (arr.length < arr1.length) {
                arr.push(res.data.response[i - 1]);
              } else if (arr.length > arr1.length) {
                arr1.push(res.data.response[i - 1]);
              }
            }

            setresponarr(arr);
            setwhole(res.data);
            setresponarr1(arr1);

            setloding(false);
          } else {
            setresponarr(res.data.response);
            setloding(false);
          }
          let y = (L = JSON.stringify(res));
          // console.log('Resonse of Single Qestion', y);
        } else {
          setloding(false);
        }
      })
      .catch(err => {
        setloding(false);
        console.log('Error Of Single Question', err);
      });
  };

  const color = [
    {bac: 'rgba(6, 146, 203, 0.3)', col: '#0691CB'},
    {bac: 'rgba(128, 81, 205 ,0.3)', col: '#8051CD'},
    {bac: 'rgba(76 ,175 ,80 ,0.3)', col: '#4CAF50'},
    {bac: 'rgba(245 ,0 ,0 ,0.3)', col: '#F50000'},
  ];

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

  let cui = 0;
  const getcurrenttime = tim => {
    setcurrentply(tim);
    console.log('---', tim);
    let it = parseInt(route.params.quesid.description) / 1000;
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
  const allcoversvideo = ({item}) => (
    <View style={Styles.coverrstylspace}>
      <TouchableOpacity
        onPress={() => {
          setplaypasuse(true),
            navigation.navigate('PlayVideoScreen', {
              ply: item,
              typ: 'response',
            });
          // navigation.navigate('QuestionAnswers', {
          //   qu: route.params.quesid,
          //   res: item,
          // });
        }}>
        {/* <Text>{item?.file_type}</Text> */}
        <Image
          source={
            item.file_type == 'mp4'
              ? item.thumbnail != null
                ? {uri: item.thumbnail}
                : require('../../Assests/vi.png')
              : require('../../Assests/man.png')
          }
          resizeMode={
            item.file_type == 'mp4'
              ? item.thumbnail != null
                ? 'cover'
                : 'cover'
              : 'contain'
          }
          style={[Styles.coverrstyl, {backgroundColor: Colors.white}]}
        />
        <View
          // onPress={() => setplaypasuse(!playpasuse)}
          style={Styles.touchrec2}>
          <Image
            source={require('../../Assests/ply.png')}
            resizeMode="contain"
            style={Styles.imaginner2}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setplaypasuse(true),
            navigation.navigate('PlayVideoScreen', {
              ply: item,
              typ: 'response',
            });
        }}
        style={Styles.likeview1}>
        <View
          style={{
            width: '100%',
            backgroundColor: 'transparent',
            height: '20%',
          }}>
          <View style={Styles.inear}>
            <View style={Styles.profilview}>
              <Image
                style={Styles.imgt}
                source={
                  item?.user?.image
                    ? {uri: item?.user?.image}
                    : require('../../Assests/Heart.png')
                }
                resizeMode="contain"
              />
            </View>
            <Text style={Styles.tttxt}>{item?.user?.name}</Text>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            backgroundColor: 'transparent',
            height: '55%',
          }}></View>
        <View
          style={{
            width: '100%',
            backgroundColor: 'transparent',
            height: '25%',
            flexDirection: 'row',
          }}>
          <View style={Styles.socview1}>
            <Image
              source={require('../../Assests/Heart.png')}
              resizeMode="contain"
              style={[
                Styles.imgin1,
                {tintColor: item?.is_like ? Colors.red : null},
              ]}
            />
            <Text style={Styles.tttxt}>{item?.total_like}</Text>
          </View>
          <View style={Styles.socview1}>
            <Image
              source={require('../../Assests/Chat.png')}
              resizeMode="contain"
              style={[
                Styles.imgin1,
                {tintColor: item?.is_comment ? Colors.blue : null},
              ]}
            />
            <Text style={Styles.tttxt}>{item?.total_comment}</Text>
          </View>
          <View style={Styles.socview1}>
            <Image
              source={require('../../Assests/sh.png')}
              resizeMode="contain"
              style={[
                Styles.imgin1,
                {tintColor: item?.is_share ? Colors.blue : null},
              ]}
            />
            <Text style={Styles.tttxt1}>{item?.total_share}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
  const whoosh = useRef(null);
  const [playing, setPlaying] = useState(false);

  const [duration, setDuration] = useState(0);
  whoosh?.current?.play(success => {
    if (success) {
      setplaypasuse(true);
      whoosh.current.pause();
      console.log('successfully finished playing');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });

  useEffect(() => {
    if (route.params.quesid.file_type == 'mp3') {
    } else {
      setPlaying(false);
    }

    return () => {
      if (whoosh.current) {
        whoosh.current.stop();
      }
    };
  }, []);
  const start = async () => {
    // await AddTrackplayer();
    // if (playpasuse) {
    console.log('111111');
    SoundPlayer();

    // await TrackPlayer.play();
    // } else {
    //   console.log('22222');
    //   whoosh.current.pause();
    //   // await TrackPlayer.stop();
    // }
  };
  const SoundPlayer = () => {
    whoosh.current = new Sound(route.params.quesid.file, null, error => {
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
    });
  };

  return (
    <ImageBackground
      source={require('../../Assests/bac1.png')}
      resizeMode="stretch"
      style={Styles.image}>
      <Header
        left="true"
        navigation={navigation}
        title="Question and Responses"
      />
      <ScrollView style={{flex: 1}}>
        <View style={Styles.innercontainer}>
          <View style={Styles.Videoview}>
            <View style={Styles.recodmenuview}>
              <Text style={[Styles.text, {width: wp(80)}]}>
                {route.params?.quesid?.question?.duration_information
                  ? route.params?.quesid?.question?.duration_information
                  : route.params?.quesid?.duration_information != null
                  ? route.params?.quesid?.duration_information
                  : 'No Title'}
              </Text>
              <View>
                {!playpasuse ? (
                  <>
                    {route.params.quesid.file_type == 'mp4' ? (
                      <Video
                        ref={videoPlayer}
                        resizeMode="cover"
                        source={{uri: whole.file}}
                        style={[
                          Styles.thumbimg1,
                          {backgroundColor: Colors.black},
                        ]}
                        paused={playpasuse}
                        onComplete={() => setplaypasuse(true)}
                        onProgress={data => getcurrenttime(data.currentTime)}
                        currentPlaybackTime={tim => getcurrenttime(tim)}
                      />
                    ) : (
                      <Image
                        source={require('../../Assests/man.png')}
                        resizeMode="contain"
                        style={[
                          Styles.thumbimg,
                          {backgroundColor: Colors.white},
                        ]}
                      />
                    )}
                    <View
                      style={{
                        width: wp(cu),
                        left: wp(2.5),
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
                        left: wp(2.5),
                        fontSize: 14,
                        color: Colors.black,
                      }}>
                      {route.params.quesid.file_type == 'mp4'
                        ? parseInt(
                            parseInt(route.params.quesid.description) / 1000 -
                              currentply,
                          )
                        : null}
                    </Text>
                  </>
                ) : (
                  <Image
                    source={
                      route?.params?.quesid?.question
                        ? {uri: route?.params?.quesid?.question?.thumbnail}
                        : {uri: route?.params?.quesid?.thumbnail}
                    }
                    resizeMode={
                      route?.params?.quesid?.thumbnail != null
                        ? 'cover'
                        : 'cover'
                    }
                    style={[Styles.thumbimg, {backgroundColor: Colors.white}]}
                  />
                )}
                <TouchableOpacity
                  onPress={() => {
                    route.params.quesid.file_type == 'mp3'
                      ? !playpasuse
                        ? (whoosh?.current?.pause(), setplaypasuse(true))
                        : (start(), setplaypasuse(!playpasuse))
                      : navigation.navigate('PlayVideoScreen', {
                          ply: route?.params?.quesid,
                          typ: 'question',
                        });
                    // setplaypasuse(!playpasuse);
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
              <TouchableOpacity
                onPress={() => {
                  route.params.quesid.file_type == 'mp3'
                    ? !playpasuse
                      ? (whoosh?.current?.pause(), setplaypasuse(true))
                      : (start(), setplaypasuse(!playpasuse))
                    : navigation.navigate('PlayVideoScreen', {
                        ply: route.params.quesid?.question_id
                          ? route.params.quesid?.question
                          : route.params.quesid,
                        typ: 'question',
                      });
                  // setplaypasuse(!playpasuse);
                }}
                style={Styles.likeview}>
                <View
                  style={{
                    width: '100%',
                    backgroundColor: 'transparent',
                    height: '20%',
                  }}>
                  <View style={Styles.inear}>
                    <View style={Styles.profilview}>
                      <Image
                        style={Styles.imgt}
                        source={
                          whole?.user?.image
                            ? {uri: whole?.user?.image}
                            : require('../../Assests/Heart.png')
                        }
                        resizeMode="contain"
                      />
                    </View>
                    <Text style={Styles.tttxt}>{whole?.user?.name}</Text>
                  </View>
                </View>
                <View
                  style={{
                    width: '100%',
                    backgroundColor: 'transparent',
                    height: '60%',
                  }}></View>
                <View
                  style={{
                    width: '100%',
                    backgroundColor: 'transparent',
                    height: '20%',
                    flexDirection: 'row',
                  }}>
                  <View style={Styles.socview}>
                    <Image
                      source={require('../../Assests/Heart.png')}
                      resizeMode="contain"
                      style={[
                        Styles.imgin,
                        {
                          tintColor: route.params.quesid.is_like
                            ? Colors.red
                            : null,
                        },
                      ]}
                    />
                    <Text style={Styles.tttxt}>
                      {route.params.quesid.total_like}
                    </Text>
                  </View>
                  <View style={Styles.socview}>
                    <Image
                      source={require('../../Assests/Chat.png')}
                      resizeMode="contain"
                      style={[
                        Styles.imgin,
                        {
                          tintColor: route.params.quesid.is_comment
                            ? Colors.blue
                            : null,
                        },
                      ]}
                    />
                    <Text style={Styles.tttxt}>
                      {route.params.quesid.total_comment}
                    </Text>
                  </View>
                  <View style={Styles.socview}>
                    <Image
                      source={require('../../Assests/sh.png')}
                      resizeMode="contain"
                      style={[
                        Styles.imgin,
                        {
                          tintColor: route.params.quesid.is_share
                            ? Colors.blue
                            : null,
                        },
                      ]}
                    />
                    <Text style={Styles.tttxt}>
                      {route.params.quesid.total_share}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            {/* <Progress.Bar progress={currentply / 100} width={330} /> */}

            {/* <View style={Styles.timerview}>
              <Text>00:00</Text>
              <Text>01:00</Text>
            </View> */}
          </View>
          {/* <View style={Styles.Videoview1}> */}
          <View style={Styles.recodmenuview1}>
            <Text style={[Styles.text, {width: wp(80)}]}>Responses</Text>

            {responarr.length > 0 ? (
              <ScrollView horizontal style={{width: '100%'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    marginTop: wp(0),
                    width: '100%',
                    backgroundColor: Colors.white,
                  }}>
                  {responarr.length > 0 ? (
                    <FlatList
                      horizontal
                      scrollEnabled={false}
                      data={responarr}
                      renderItem={allcoversvideo}
                    />
                  ) : loding ? (
                    <View
                      style={{
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                        backgroundColor: 'red',
                      }}>
                      <ActivityIndicator
                        size="large"
                        color={Colors.maincolor}
                      />
                    </View>
                  ) : null}
                  {responarr1.length > 0 ? (
                    <FlatList
                      scrollEnabled={false}
                      horizontal
                      data={responarr1}
                      renderItem={allcoversvideo}
                    />
                  ) : null}
                </View>
              </ScrollView>
            ) : loding ? (
              <View
                style={{
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <ActivityIndicator size="large" color={Colors.maincolor} />
              </View>
            ) : null}
          </View>
          {/* </View> */}
          <View style={{marginTop: wp(10)}} />
          <RButton
            onpress={() =>
              navigation.navigate('ResponseToQuestion', {
                rou: route.params.quesid,
              })
            }
            color={Colors.blue}
            title="ADD YOUR RESPONSE"
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Response;
