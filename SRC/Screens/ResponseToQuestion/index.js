import {
  Animated,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import { FaceDetector, RNCamera } from 'react-native-camera';
import React, { useEffect, useRef, useState } from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../../Colors';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import Header from '../../Components/Header';
import ImagePicker from 'react-native-image-crop-picker';
import Input from '../../Components/Input';
import Loder from '../../Components/Loder';
import MovToMp4 from 'react-native-mov-to-mp4';
import RButton from '../../Components/RButton';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';
import Styles from './Style';
import Stylevideo from '../Response/Style';
import Video from 'react-native-video';
import { createThumbnail } from 'react-native-create-thumbnail';
import { postQuestionResponse } from '../../Api';

const ResponseToQuestion = ({ navigation, route }) => {
  let audioPath =
    Platform.OS == 'android'
      ? AudioUtils.DocumentDirectoryPath +
      `/${Math.floor(Math.random() * 100) + 1}test.mp3`
      : AudioUtils.DocumentDirectoryPath +
      `/${Math.floor(Math.random() * 100) + 1}test.ima4`;

  const [videourl, setvideourl] = useState({});
  const [playpasuse, setplaypasuse] = useState(true);
  const [playpasuse1, setplaypasuse1] = useState(true);
  const [cameratype, setcameratype] = useState(true);
  const [playpasusevideo, setplaypasusevideo] = useState(true);
  const [currentplyvideo, setcurrentplyvideo] = useState(0);
  const [playpasuse12, setplaypasuse12] = useState(true);
  const [currentply, setcurrentply] = useState(0);
  const [isRecording, setRecording] = useState(false);
  const [opencamera, setopencamera] = useState(false);
  const [recrdfilepath, setrecrdfilepath] = useState('');
  const { userData, isLoggedIn } = useSelector(({ USER }) => USER);
  const [shoethumb, setshoethumb] = useState('');
  const [loding, setloding] = useState(false);
  const [startrecording, setstartrecording] = useState(false);
  const [Audioinprocess, setAudioinprocess] = useState(false);
  const [currentply1, setcurrentply1] = useState(0);
  const [currentply2, setcurrentply2] = useState(0);
  const cameraRef = useRef(null);
  const [cu, setcu] = useState(0);
  console.log('[[==', currentply);
  const videoPlayer = useRef(null);

  setTimeout(() => {
    if (startrecording) {
      setAudioinprocess(!Audioinprocess);
      // setcurrentply(500);
    }
  }, 500);

  const uploadVideo = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    }).then(video => {
      if (video.mime.split('/')[1] == 'mp4') {
        if (video.duration <= 60000) {
          setvideourl(video);
          runThummail(video.path);
        } else {
          alert(`Your Video Must Complete in 1 Minutes`);
        }
      } else {
        alert(`Upload only mp4 formate video`);
      }

      console.log(video);
    });
  };
  let cui = 0;

  const runThummail = pt => {
    createThumbnail({
      url: pt,
      // timeStamp: parseInt(1000, 10),
      timeStamp: 1000,
      format: 'png',
    })
      .then(response => {
        setshoethumb(response);
        console.log('ooo000---thumbmails-', response);
      })
      .catch(err => {
        console.log('Error Message-thummailes->', err);
      });
  };

  const validate = () => {
    if (videourl || recrdfilepath != '') {
      return true;
    } else {
      return false;
    }
  };
  const __postQuestionResponse = () => {
    setloding(true);
    if (validate()) {
      const data = new FormData();
      data.append('file_type', videourl?.path ? 'mp4' : 'mp3');
      // data.append('description', videourl?.duration);

      data.append('question_id', route.params.rou.id);
      if (videourl?.path) {
        videourl.path &&
          data.append('file', {
            uri: videourl.path,
            type: 'video/mp4',
            name: 'Video' + new Date() + '.mp4',
          });
      }
      if (recrdfilepath != '') {
        recrdfilepath &&
          data.append('file', {
            uri:
              Platform.OS == 'android'
                ? `file://${recrdfilepath}`
                : recrdfilepath,
            type: 'audio/mp3',
            name: 'audio' + new Date() + '.mp3',
          });
      }

      if (shoethumb) {
        shoethumb &&
          data.append('thumbnail', {
            uri: shoethumb.path,
            type: 'image/jpeg',
            name: 'image' + new Date() + '.jpg',
          });
      }
      console.log('pp--==', data);
      // idstag.forEach(element => {
      //   data.append('expertise[]', element);
      // });
      console.log('Post Data', data);
      postQuestionResponse({ Auth: userData.userdata.api_token }, data)
        .then(res => {
          setloding(false);
          alert("Response Add Successfully")
          console.log('Response Of Response Question', res);
          navigation.goBack();
        })
        .catch(err => {
          setloding(false);
          console.log('Error of Response Question', err);
        });
    } else {
      setloding(false);
    }
  };
  const getcurrenttime = tim => {
    setcurrentply(tim);
    console.log('---', tim);
    let it = parseInt(route.params.rou.description) / 1000;
    let u = (parseInt(tim) / it) * 95;
    console.log('--', parseInt(u));
    cui = tim;
    setcu(parseInt(u));
    if (tim >= it - 1) {
      setplaypasuse(true);
    }
  };

  const whoosh = useRef(null);
  // const whoosh1 = useRef(null);
  var whoosh1;
  const [playing, setPlaying] = useState(false);

  const [duration, setDuration] = useState(0);
  const [playing1, setPlaying1] = useState(false);

  const [duration1, setDuration1] = useState(0);

  useEffect(() => {
    if (route.params.rou.file_type == 'mp3') {
    } else {
      setPlaying(false);
    }
    return () => {
      if (whoosh.current) {
        whoosh.current.stop();
      }
    };
  }, []);
  useEffect(() => {
    if (recrdfilepath != '') {
    } else {
      setPlaying(false);
    }
    return () => {
      if (whoosh1) {
        whoosh1.stop();
      }
    };
  }, []);
  const start = async () => {
    // await AddTrackplayer();
    if (playpasuse) {
      console.log('111111');
      // whoosh1.current.pause();
      whoosh1?.current?.pause();
      setplaypasuse1(true);
      SoundPlayer();

      // await TrackPlayer.play();
    } else {
      console.log('22222');
      whoosh.current.pause();
      // await TrackPlayer.stop();
    }
  };

  const tric = () => {
    if (this.tickInterval) {
      whoosh1.getCurrentTime(seconds => {
        console.log('--==ppp', duration1);
        setplaypasuse1(true);

        // if (parseInt(currentply1) == 0) {
        //   setcurrentply1(parseInt(seconds));

        //   setcurrentply2(parseInt(seconds) / parseInt(duration));
        // } else
        if (parseInt(seconds) > parseInt(currentply1)) {
          setcurrentply1(parseInt(seconds));

          setcurrentply2(parseInt(seconds) / parseInt(duration1));
        } else if (parseInt(duration1) == parseInt(currentply1)) {
          setplaypasuse1(true);
          setcurrentply2(0);
          setcurrentply1(0);
        }
      });
    }
  };
  if (currentply1 != 0) {
    if (recrdfilepath != '' && parseInt(duration1) == parseInt(currentply1)) {
      setcurrentply2(0);
      setcurrentply1(0);
      setplaypasuse12(true);
      // setplaypasuse(true);
      setplaypasuse1(true);
    }
  }

  const start1 = async () => {
    // await AddTrackplayer();
    if (playpasuse1) {
      console.log('222222');
      // whoosh.current.pause();
      whoosh?.current?.pause();
      setplaypasuse(true);
      // SoundPlayer1();
    } else {
      console.log('22222');
      whoosh1.pause();
      // await TrackPlayer.stop();
    }
  };
  // const SoundPlayer1 = () =>
  if (recrdfilepath != '') {
    whoosh1 = new Sound(
      Platform.OS == 'android' ? `file://${recrdfilepath}` : recrdfilepath,
      null,
      error => {
        if (error) {
          return;
        }
        setDuration1(whoosh1.getDuration());
        if (!playpasuse1) {
          setPlaying1(true);
          this.tickInterval = setInterval(() => {
            tric();
          }, 550);
          whoosh1.play(success => {
            if (success) {
              if (this.tickInterval) {
                clearInterval(this.tickInterval);
                this.tickInterval = null;
              }
              // if (soundIndex < soundUrls.length) {
              //   setSoundIndex(soundIndex + 1);
              // } else {
              //   setPlaying(false);
              // }
            } else {
              if (this.tickInterval) {
                clearInterval(this.tickInterval);
                this.tickInterval = null;
              }
            }
          });
        } else {
          whoosh1.stop(() => {
            whoosh1.pause();
          });
        }
      },
    );
  }
  const SoundPlayer = () => {
    whoosh.current = new Sound(route.params.rou.file, null, error => {
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

  useEffect(() => {
    AudioRecorder.requestAuthorization().then(isAuthorised => {
      if (!isAuthorised) return;
    });
  }, []);
  const prepareRecordingPath = audioPath => {
    if (Platform.OS === 'ios') {
      return AudioRecorder.prepareRecordingAtPath(
        audioPath,

        {
          SampleRate: 44100.0,
          Channels: 2,
          AudioQuality: 'High',
          AudioEncoding: 'ima4',

          MeteringEnabled: false,
          MeasurementMode: false,

          IncludeBase64: false,
        },
      );
    } else {
      return AudioRecorder.prepareRecordingAtPath(audioPath, {
        SampleRate: 22050,
        Channels: 1,
        AudioQuality: 'Low',
        AudioEncoding: 'mp3',
        AudioEncodingBitRate: 32000,
      });
    }
  };

  const recordAudio = async () => {
    try {
      console.log('====', audioPath);
      await prepareRecordingPath(audioPath);
      console.log('[[---', prepareRecordingPath(audioPath));
      const filePath = await AudioRecorder.startRecording();

      console.log('File Path---', filePath);
    } catch (error) {
      console.log('----', error);
    }
  };
  const stopRecording = async () => {
    const filePath = await AudioRecorder.stopRecording();
    if (Platform.OS === 'ios') {
      AudioRecorder.onFinished = ({ audioFileURL }) => {
        console.log('----', audioFileURL);
        setrecrdfilepath(audioFileURL);
        // Android callback comes in the form of a promise instead.
        // devLogger('Audio', audioFileURL);
        if (audioFileURL) {
          console.log('---1', audioFileURL);
          //verify that audio on ios saving bucket
          // goForFetch(audioFileURL);
        }
      };
    } else {
      setrecrdfilepath(filePath);
      // goForFetch(filePath);
    }
    // AudioRecorder.onFinished = (data) => {
    //   // Android callback comes in the form of a promise instead.
    //   console.log('sfs', data);
    //   goForFetch(data.audioFileURL);
    // };
    // AudioRecorder.o

    // console.log('the file chat created', filePath);
  };

  const takeVideo = async () => {
    try {
      console.log('------', cameraRef.current);
      if (cameraRef.current) {
        cameraRef.current
          .recordAsync()
          .then(data => {
            console.log('recordAsync', data);
            const filename = Date.now().toString();
            MovToMp4.convertMovToMp4(data.uri, filename).then(function (
              results,
            ) {
              //here you can upload the video...
              let y = {
                creationDate: null,
                cropRect: null,
                data: null,
                duration: 30000,
                exif: null,
                filename: 'IMG_0298.MP4',
                height: 480,
                mime: 'video/mp4',
                modificationDate: null,
                path: `file://${results}`,
                size: 2686298,
                sourceURL: `file://${results}`,
                width: 272,
              };
              console.log(results);
              // let arr = data;
              // arr['duration'] = (60 - parseInt(currentply)) * 1000;
              // console.log('0009999', arr);
              setvideourl(y);
              let linkthumb = `file://${results}`;
              runThummail(linkthumb);
            });

            // this.props.uploadVideo(data)
          })
          .catch(error => {
            console.log('recordAsync', { error });
            // this.setState({cameraRecordError: error})
          });
      } else {
        alert('No Camera is Available Currently');
      }
    } catch (error) {
      console.log('----Error In Recording--', error);
    }
  };

  const stopVideo = async () => {
    setRecording(false);
    setstartrecording(false);
    setplaypasusevideo(true);
    setopencamera(false);
    cameraRef.current.stopRecording();
  };
  if (
    !playpasusevideo &&
    parseInt(currentplyvideo) == parseInt(videourl.duration) / 1000
  ) {
    console.log('------');
    setcurrentplyvideo(0);
    setplaypasusevideo(true);
  }

  return (
    <ImageBackground
      source={require('../../Assests/bac1.png')}
      rresizeMode="cover"
      style={Styles.image}>
      <Header
        left="true"
        navigation={navigation}
        title="Response To Question"
      />
      <Loder lodertyp={loding} />
      <ScrollView style={{ flex: 1 }}>
        <View style={Styles.innercontainer}>
          <View style={Stylevideo.Videoview}>
            <View style={Stylevideo.recodmenuview}>
              {/* <Text style={Stylevideo.text}>
                {route.params.rou.duration_information
                  ? route.params.rou.duration_information
                  : 'No Question Added Yet'}
              </Text> */}

              {/* {!playpasuse ? (
                <>
                  {route.params.rou.file_type == 'mp4' ? (
                    <Video
                      ref={videoPlayer}
                      resizeMode="cover"
                      source={{ uri: route.params.rou.file }}
                      style={[
                        Styles.thumbimg1,
                        { backgroundColor: Colors.black },
                      ]}
                      paused={playpasuse}
                      onComplete={() => setplaypasuse(true)}
                      onProgress={data => getcurrenttime(data.currentTime)}
                      currentPlaybackTime={tim => getcurrenttime(tim)}
                    />
                  ) : (
                    <Image
                      source={require('../../Assests/man.png')}
                      resizeMode={'contain'}
                      style={[
                        Styles.thumbimg1,
                        {
                          backgroundColor: Colors.white,
                          borderBottomColor: Colors.white,
                        },
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
                </>
              ) : (
                <Image
                  source={
                    route?.params?.rou?.file_type == 'mp4'
                      ? route?.params?.rou?.thumbnail != null
                        ? { uri: route?.params?.rou?.thumbnail }
                        : require('../../Assests/vi.png')
                      : require('../../Assests/man.png')
                  }
                  resizeMode={
                    route?.params?.rou?.file_type == 'mp4'
                      ? route?.params?.rou?.thumbnail != null
                        ? 'cover'
                        : 'cover'
                      : 'contain'
                  }
                  style={[
                    Stylevideo.thumbimg1,
                    { backgroundColor: Colors.white, bottom: 10 },
                  ]}
                />
              )} */}
              {/* <Text style={Stylevideo.text}>Response added here</Text> */}

              {Object.keys(videourl).length > 0 ? (
                <Video
                  resizeMode="cover"
                  ref={videoPlayer}
                  source={{ uri: videourl.path }}
                  style={[
                    Styles.thumbimg1,
                    {
                      backgroundColor: Colors.black,
                      borderBottomWidth: 0,
                    },
                  ]}
                  paused={playpasusevideo}
                  onProgress={data => setcurrentplyvideo(data.currentTime)}
                // currentPlaybackTime={tim => setcurrentply(tim)}
                />
              ) : (
                <Image
                  source={require('../../Assests/man.png')}
                  resizeMode="contain"
                  style={[Styles.thumbimg1, { borderBottomWidth: 0 }]}
                />
              )}
              {playpasusevideo && Object.keys(videourl).length > 0 ? (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('PlayVideoScreen', {
                      ply: route.params.rou,
                      typ: 'record'
                    });
                  }}
                  style={Stylevideo.touchrec1}>
                  <Image
                    source={
                      !playpasuse
                        ? require('../../Assests/pas.png')
                        : require('../../Assests/ply.png')
                    }
                    resizeMode="contain"
                    style={Stylevideo.imaginner1}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          <View style={Styles.Videoview}>
            {/* <Progress.Bar progress={currentply / 100} width={wp(85)} /> */}
            {/* <Slider
              // ref={whoosh}
              style={{width: wp(85), height: wp(4)}}
              minimumValue={0}
              value={0.5}
              maximumValue={1}
              thumbTintColor={Colors.maincolor}
              minimumTrackTintColor={Colors.maincolor}
              maximumTrackTintColor={Colors.gray}
              // onValueChange={tim => {
              //   whoosh?.current?.setCurrentTime(
              //     tim * whoosh.current.getDuration(),
              //   );
              // }}
            /> */}

            <Slider
              style={{ width: wp(85), height: wp(4) }}
              minimumValue={0}
              value={0}
              // value={playpasuse12 ? 0 : currentply2}
              // value={
              //   playpasuse12
              //     ? !playpasusevideo
              //       ? parseInt(currentplyvideo) /
              //         (parseInt(videourl.duration) / 1000)
              //       : 0
              //     : currentply2
              // }
              maximumValue={1}
              thumbTintColor={Colors.maincolor}
              minimumTrackTintColor={Colors.maincolor}
              maximumTrackTintColor={Colors.gray}
            // onSlidingComplete={tim => {
            //   whoosh?.setCurrentTime(tim * whoosh.getDuration());
            // }}
            />
            <View style={Styles.timerview}>
              <Text>
                {/* {parseInt(currentply1) < 60
                  ? '00:' + parseInt(currentply1)
                  : '01:00'} */}

                {parseInt(currentply1) < 60 && parseInt(currentply1) > 0
                  ? '00:' + parseInt(currentply1)
                  : parseInt(videourl.duration) > 0
                    ? '00:' + parseInt(currentplyvideo)
                    : '00:00'}
              </Text>
              <Text>
                {/* {parseInt(duration1) < 60
                  ? '00:' + parseInt(duration1)
                  : '01:00'} */}
                {parseInt(duration) < 60 && parseInt(currentply1) > 0
                  ? '00:' + parseInt(duration)
                  : parseInt(videourl.duration) > 0
                    ? '00:' + parseInt(videourl.duration) / 1000
                    : '01:00'}
              </Text>
            </View>
            <View style={Styles.recoptin}>
              <TouchableOpacity
                onPress={() => {
                  // if (recrdfilepath == '') {
                  //   if (!startrecording) {
                  //     console.log('Recording Start');
                  //     setstartrecording(true);
                  //     recordAudio();
                  //   } else {
                  //     console.log('Recording End');
                  //     setstartrecording(false);
                  //     stopRecording();
                  //   }
                  // } else {
                  //   alert('First Clear Last Recording');
                  // }
                  if (Object.keys(videourl).length > 0) {
                    alert('First Clear the Previous Video');
                  }
                  //  else if (isRecording) {
                  //   stopVideo();
                  // }
                  else {
                    setopencamera(true);
                    // setplaypasusevideo(false);
                    // setstartrecording(true);
                    // setRecording(true);
                    // setcurrentply(0);
                    // // setcurrentplyrecord(0);
                    // takeVideo();
                  }
                }}
                style={Styles.touchrec}>
                <View style={Styles.reddot} />
                <Text style={Styles.texrec}>Record</Text>
                {startrecording ? (
                  <CountdownCircleTimer
                    isPlaying={startrecording}
                    size={20}
                    duration={60}
                    onComplete={() => {
                      setstartrecording(false);
                      stopRecording();
                    }}
                    colors="#A30000"
                    strokeWidth={2}>
                    {({ remainingTime }) => (
                      <Animated.Text style={{ color: 'white' }}>
                        {setcurrentply(remainingTime)}
                        {remainingTime}
                      </Animated.Text>
                    )}
                  </CountdownCircleTimer>
                ) : null}
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={() => setplaypasuse(!playpasuse)}
                onPress={() => {
                  // if (recrdfilepath != '') {
                  //   setplaypasuse12(!playpasuse12);
                  //   setcurrentply2(0);
                  //   setcurrentply1(0);
                  //   setplaypasuse1(!true);
                  //   if (currentply1 == 0 && currentply2 == 0) {
                  //     setplaypasuse1(!playpasuse1);
                  //   }

                  //   //  start();
                  // } else {
                  //   alert('first add your Recording');
                  // }
                  if (Object.keys(videourl).length > 0) {
                    // setplaypasusevideo(!playpasusevideo);
                    navigation.navigate('PlayVideoScreen', {
                      ply: {
                        description: videourl.duration,
                        file: videourl.path,
                        file_type: videourl.mime,
                        creationDate: null,
                      },
                      typ: "record",
                    });
                  } else {
                    alert(`Please Record or Upload Video `);
                  }
                }}
                style={Styles.touchrec1}>
                <Image
                  source={
                    !playpasuse12 || !playpasusevideo
                      ? require('../../Assests/pas.png')
                      : require('../../Assests/ply.png')
                  }
                  resizeMode="contain"
                  style={Styles.imaginner1}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (recrdfilepath != '') {
                    // whoosh.current.remove();
                    setrecrdfilepath('');
                  } else if (Object.keys(videourl).length > 0) {
                    setvideourl({});
                    setcurrentply(0);
                  } else {
                    alert('First Recod or Upload Video');
                  }
                }}
                style={Styles.touchrec}>
                <Image
                  source={require('../../Assests/cross.png')}
                  resizeMode="contain"
                  style={Styles.imaginner}
                />
                <Text style={Styles.texrec}>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={Styles.orview}>
            <View style={Styles.linview} />
            <Text style={Styles.donttextor}>OR</Text>
            <View style={Styles.linview} />
          </View>
          <View style={Styles.Videoview1}>
            <TouchableOpacity
              onPress={() => uploadVideo()}
              style={Styles.uplodvideo}>
              <Image
                source={require('../../Assests/up.png')}
                resizeMode="contain"
                style={Styles.imgup}
              />
              <Text style={Styles.textup}>Upload</Text>
            </TouchableOpacity>
          </View>
          <RButton
            onpress={() => __postQuestionResponse()}
            title="NEXT"
            width="45"
          />
        </View>
        <Modal animationType="fade" transparent={true} visible={opencamera}>
          <View style={{ flex: 1, backgroundColor: Colors.red }}>
            <TouchableOpacity
              onPress={() => {
                if (Object.keys(videourl).length > 0) {
                  alert('First Clear the Previous Video');
                } else if (isRecording) {
                  stopVideo();
                } else {
                  setstartrecording(true);
                  setRecording(true);
                  setcurrentply(0);
                  // setcurrentplyrecord(0);
                  takeVideo();
                }
              }}
              style={[
                Styles.touchrec,
                {
                  // top: wp(160),
                  bottom: wp(15),
                  width: wp(20),
                  height: wp(20),
                  borderRadius: wp(20),
                  alignSelf: 'center',
                  position: 'absolute',
                  backgroundColor: 'white',
                  zIndex: 5,
                },
              ]}>
              <View
                style={[
                  Styles.reddot,
                  {
                    width: wp(18),
                    height: wp(18),
                    borderRadius: wp(18),
                    backgroundColor: !Audioinprocess
                      ? Colors.red
                      : Colors.black,
                  },
                ]}
              />
              {/* <Text style={[Styles.texrec, { marginRight: wp(2) }]}>Record</Text> */}
              {/* {startrecording ? (
                <CountdownCircleTimer
                  isPlaying={startrecording}
                  size={20}
                  duration={60}
                  onComplete={() => {
                    stopVideo();
                  }}
                  strokeWidth={2}>
                  {({ remainingTime }) => (
                    <Animated.Text style={{ color: 'white' }}>
                      {setcurrentply(remainingTime)}
                      {remainingTime}
                    </Animated.Text>
                  )}
                </CountdownCircleTimer>
              ) : null} */}
            </TouchableOpacity>
            <RNCamera
              ref={cameraRef}
              style={{ flex: 1 }}
              defaultVideoQuality={RNCamera.Constants.VideoQuality['480p']}
              type={
                cameratype
                  ? RNCamera.Constants.Type.back
                  : RNCamera.Constants.Type.front
              }
              flashMode={RNCamera.Constants.FlashMode.on}
            />
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between', backgroundColor: "transparent", position: 'absolute', width: '100%', paddingVertical: wp(6), paddingHorizontal: wp(3) }} >
              <TouchableOpacity
                onPress={() => {
                  setopencamera(false)
                }}
                style={[Styles.viewref, { marginTop: wp(10), backgroundColor: 'transparent' }]}>
                <Image
                  source={require('../../Assests/arrow.png')}
                  resizeMode="contain"
                  style={Styles.ref}
                />
              </TouchableOpacity>
              {/* {startrecording ? (
                <CountdownCircleTimer
                  isPlaying={startrecording}
                  size={20}
                  duration={60}
                  onComplete={() => {
                    stopVideo();
                  }}
                  colors="#A30000"
                  strokeWidth={2}>
                  {({ remainingTime }) => (
                    <Animated.Text style={{ color: 'white' }}>
                      {
                        (setcurrentply(remainingTime),
                          setcurrentplyrecord(remainingTime))
                      }
                      {remainingTime}
                    </Animated.Text>
                  )}
                </CountdownCircleTimer>
              ) : null} */}
              <TouchableOpacity
                onPress={() => {
                  if (Object.keys(videourl).length > 0) {
                    stopVideo();
                  } else if (isRecording) {
                    stopVideo();
                  } else {
                    setcameratype(
                      cameratype == RNCamera.Constants.Type.back
                        ? RNCamera.Constants.Type.front
                        : RNCamera.Constants.Type.back,
                    );
                  }
                }}
                style={[Styles.viewref, { marginTop: wp(5) }]}>
                <Image
                  source={require('../../Assests/ref.png')}
                  resizeMode="contain"
                  style={Styles.ref}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </ImageBackground>
  );
};

export default ResponseToQuestion;
