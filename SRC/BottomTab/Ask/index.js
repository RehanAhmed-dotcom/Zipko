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
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import {FaceDetector, RNCamera} from 'react-native-camera';
import React, {useEffect, useRef, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import Colors from '../../Colors';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import Header from '../../Components/Header';
import ImagePicker from 'react-native-image-crop-picker';
import Input from '../../Components/Input';
import MovToMp4 from 'react-native-mov-to-mp4';
import RButton from '../../Components/RButton';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';
// import Sound from 'react-native-sound';
import Styles from './Style';
import Video from 'react-native-video';
import {updateActivedisactive} from '../../Api';

const Ask = ({navigation}) => {
  const [videourl, setvideourl] = useState({});
  const [playpasuse, setplaypasuse] = useState(true);
  const [playpasusevideo, setplaypasusevideo] = useState(true);
  const [currentplyvideo, setcurrentplyvideo] = useState(0);
  const [playpasuse1, setplaypasuse1] = useState(true);
  const [opencamera, setopencamera] = useState(false);
  const [recrdfilepath, setrecrdfilepath] = useState('');
  const [currentply, setcurrentply] = useState(0);
  const [currentplyrecord, setcurrentplyrecord] = useState(0);
  const [currentply1, setcurrentply1] = useState(0);
  const [currentply2, setcurrentply2] = useState(0);
  const [cameratype, setcameratype] = useState(RNCamera.Constants.Type.back);
  const [isRecording, setRecording] = useState(false);
  const [currenttackplaeyrid, setcurrenttackplaeyrid] = useState('');
  const [Audioinprocess, setAudioinprocess] = useState(false);
  const [startrecording, setstartrecording] = useState(false);
  const {userData, isLoggedIn} = useSelector(({USER}) => USER);

  // console.log("000", userData)
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      activedisactive(1);
    });
    return unsubscribe;
  }, [navigation]);
  const activedisactive = async ad => {
    const data = new FormData();
    data.append('status', ad);
    console.log('----', data);
    updateActivedisactive({
      Auth: userData.userdata.api_token,
      data,
    })
      .then(res => {
        // fcm_token
        console.log('Stus aCtive Disative>>>>>>>>>>', res);
      })
      .catch(error =>
        console.log('Error Message Active In Avtive ', error.response.data),
      );
  };
  // const whoosh = useRef(null);
  var whoosh;
  const cameraRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const [duration, setDuration] = useState(0);
  console.log('[[==', currentply);
  const videoPlayer = useRef(null);

  console.log('---h--a--s--s--a--n---------', videourl);
  // let audioPath =
  //   AudioUtils.DocumentDirectoryPath +
  //   `/${Math.floor(Math.random() * 100) + 1}test.mp3`;

  let audioPath =
    Platform.OS == 'android'
      ? AudioUtils.DocumentDirectoryPath +
        `/${Math.floor(Math.random() * 100) + 1}test.mp3`
      : AudioUtils.DocumentDirectoryPath +
        `/${Math.floor(Math.random() * 100) + 1}test.ima4`;

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
      console.log('--', video.mime.split('/')[1]);
      if (video.mime.split('/')[1] == 'mp4') {
        if (video.duration <= 60000) {
          setvideourl(video);
        } else {
          alert(`Your Video Must Complete in 1 Minutes`);
        }
      } else {
        alert(`Upload only mp4 formate video`);
      }
      console.log(video);
    });
  };

  const start = async () => {
    // await AddTrackplayer();
    if (playpasuse) {
      console.log('111111');
      // SoundPlayer();

      // await TrackPlayer.play();
    } else {
      console.log('22222');
      whoosh.pause();
      // await TrackPlayer.stop();
    }
  };

  const tric = () => {
    if (this.tickInterval) {
      whoosh.getCurrentTime(seconds => {
        setplaypasuse(true);

        // if (parseInt(currentply1) == 0) {
        //   setcurrentply1(parseInt(seconds));

        //   setcurrentply2(parseInt(seconds) / parseInt(duration));
        // } else
        if (parseInt(seconds) > parseInt(currentply1)) {
          setcurrentply1(parseInt(seconds));

          setcurrentply2(parseInt(seconds) / parseInt(duration));
        } else if (parseInt(duration) == parseInt(currentply1)) {
          setplaypasuse(true);
          setcurrentply2(0);
          setcurrentply1(0);
        }
      });
    }
  };
  if (currentply1 != 0) {
    if (recrdfilepath != '' && parseInt(duration) == parseInt(currentply1)) {
      setcurrentply2(0);
      setcurrentply1(0);
      setplaypasuse(true);
      setplaypasuse1(true);
    }
  }

  useEffect(() => {
    if (recrdfilepath != '') {
    } else {
      setPlaying(false);
    }
    return () => {
      if (whoosh) {
        whoosh.stop();
      }
    };
  }, []);

  // const SoundPlayer = () =>

  if (recrdfilepath != '') {
    whoosh = new Sound(
      Platform.OS == 'android' ? `file://${recrdfilepath}` : recrdfilepath,
      null,
      error => {
        if (error) {
          return;
        }
        setDuration(whoosh.getDuration());
        setPlaying(true);
        console.log('999887777', whoosh.getDuration());

        if (!playpasuse) {
          this.tickInterval = setInterval(() => {
            tric();
          }, 550);
          whoosh.play(success => {
            if (success) {
              if (this.tickInterval) {
                clearInterval(this.tickInterval);
                this.tickInterval = null;
              }
            } else {
              if (this.tickInterval) {
                clearInterval(this.tickInterval);
                this.tickInterval = null;
              }
            }
          });
        } else {
          whoosh.stop(() => {
            whoosh.pause();
          });
        }
      },
    );
  }

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
      console.log('====---------99999', audioPath);
      await prepareRecordingPath(audioPath);
      console.log('[[--->>>>hassan123---', prepareRecordingPath(audioPath));
      const filePath = await AudioRecorder.startRecording();

      console.log('File Path---', filePath);
    } catch (error) {
      console.log('----', error);
    }
  };
  const stopRecording = async () => {
    const filePath = await AudioRecorder.stopRecording();
    if (Platform.OS == 'ios') {
      AudioRecorder.onFinished = ({audioFileURL}) => {
        console.log('----url---', audioFileURL);
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

  // const whoosh = useRef(null);
  // const [playing, setPlaying] = useState(false);
  // const [playAgain, setPlayAgain] = useState(false);
  // const [duration, setDuration] = useState(0);
  // const [soundUrls, setSoundUrls] = useState([]);
  // const [soundIndex, setSoundIndex] = useState(-1);

  // useEffect(() => {
  //   console.log('inside if block');
  //   SoundPlayer();

  //   setPlaying(false);

  //   return () => {
  //     if (whoosh.current) {
  //       whoosh.current.stop();
  //     }
  //   };
  // }, []);
  // const playSound = urls => {
  //   console.log('inside play soundUrls', urls);
  //   setSoundUrls(urls);
  //   setSoundIndex(0);
  // };

  // const SoundPlayer = () => {
  //   console.log('inside soundplyaer called index', soundIndex);
  //   whoosh.current = new Sound(soundUrls[soundIndex], null, error => {
  //     console.log('inside Sound object to play sound', error);
  //     if (error) {
  //       return;
  //     }
  //     setDuration(whoosh.current.getDuration());

  //     setPlaying(true);
  //     whoosh.current.play(success => {
  //       if (success) {
  //         console.log('success on play sound');
  //         if (soundIndex < soundUrls.length) {
  //           console.log('increment index on sound play success');
  //           setSoundIndex(soundIndex + 1);
  //           setPlayAgain(!playAgain);
  //         } else {
  //           setPlaying(false);
  //         }
  //       } else {
  //       }
  //     });
  //   });
  // };

  // const pauseSound = () => {
  //   whoosh.current.pause();
  //   setPlaying(false);
  // };

  // setInterval(() => {
  //   if (!playpasuse) {
  //     if (parseInt(currentply1) < parseInt(duration)) {

  // } else {
  //   whoosh.current.pause();
  //   setplaypasuse(true);
  //   setcurrentply1(0);
  //   setcurrentply2(0);
  // }
  // count = count + 1;
  // console.log('ppoo===----', count / 100);
  // setcurrentply1(count / 100);
  //   }
  // }, 1000);
  // if (recrdfilepath != '' && parseInt(duration) == parseInt(currentply1)) {
  //   setplaypasuse(true);
  //   setcurrentply1(0);
  //   setcurrentply2(0);
  //   whoosh.pause();
  // }

  const takeVideo = async () => {
    try {
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
            });

            // this.props.uploadVideo(data)
          })
          .catch(error => {
            console.log('recordAsync', {error});
            // this.setState({cameraRecordError: error})
          });
      } else {
        setplaypasusevideo(true);
        alert('No Camera is Available Currently');
      }
    } catch (error) {
      console.log('------', error);
    }
  };

  const stopVideo = async () => {
    setRecording(false);
    // setstartrecording(false);
    setopencamera(false);

    setstartrecording(false);
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
      source={require('../../Assests/bg1.png')}
      resizeMode="stretch"
      style={Styles.image}>
      <Header navigation={navigation} title="Ask A Question" />
      <ScrollView style={{flex: 1}}>
        <View style={Styles.innercontainer}>
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
              {/* <Image
                source={require('../../Assests/man.png')}
                resizeMode="contain"
                style={[
                  Styles.recodmenuview, {backgroundColor: 'red'}]}
              /> */}

              {Object.keys(videourl).length > 0 ? (
                <Video
                  resizeMode="cover"
                  ref={videoPlayer}
                  source={{uri: videourl.path}}
                  style={Styles.recodmenuview}
                  paused={playpasusevideo}
                  onProgress={data => setcurrentplyvideo(data.currentTime)}
                  // currentPlaybackTime={tim => setcurrentply(tim)}
                />
              ) : (
                <Image
                  source={require('../../Assests/man.png')}
                  resizeMode="contain"
                  style={Styles.recodmenuview}
                />
              )}
              {/* <TouchableOpacity
                onPress={() =>
                  setcameratype(
                    cameratype == RNCamera.Constants.Type.back
                      ? RNCamera.Constants.Type.front
                      : RNCamera.Constants.Type.back,
                  )
                }
                style={Styles.viewref}>
                <Image
                  source={require('../../Assests/ref.png')}
                  resizeMode="contain"
                  style={Styles.ref}
                />
              </TouchableOpacity> */}
            </View>
            {/* <Progress.Bar
              progress={
                recrdfilepath != ''
                  ? 60000 - (parseInt(currentply) * 1000) / 100
                  : null
              }
              width={wp(85)}
            /> */}

            {/* <Slider
              // ref={whoosh}
              style={{width: wp(85), height: wp(4)}}
              minimumValue={0}
              value={recrdfilepath != '' && !playpasuse ? currentply2 : 0}
              maximumValue={parseInt(duration) / 100}
              thumbTintColor={Colors.maincolor}
              minimumTrackTintColor={Colors.maincolor}
              maximumTrackTintColor={Colors.gray}
              // onValueChange={tim => {
              //   whoosh?.current?.setCurrentTime(tim * whoosh.getDuration());
              // }}
            /> */}
            <Slider
              style={{width: wp(85), height: wp(4)}}
              minimumValue={0}
              value={0}
              // value={
              //   videourl?.duration > 0
              //     ? parseInt(videourl.duration) / parseInt(currentplyvideo)
              //     : 0
              // }
              value={
                playpasuse1
                  ? !playpasusevideo
                    ? parseInt(currentplyvideo) /
                      (parseInt(videourl.duration) / 1000)
                    : 0
                  : currentply2
              }
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
                {parseInt(currentply1) < 60 && parseInt(currentply1) > 0
                  ? '00:' + parseInt(currentply1)
                  : parseInt(videourl.duration) > 0
                  ? '00:' + parseInt(currentplyvideo)
                  : '00:00'}
              </Text>
              <Text>
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
                  //     setAudioinprocess(false);
                  //     stopRecording();
                  //   }
                  // } else {
                  //   alert('First Clear Last Recording');
                  // }
                  if (Object.keys(videourl).length > 0) {
                    alert('First Clear the Previous Video');
                  }
                  // else if (isRecording) {
                  //   stopVideo();
                  // }
                  else {
                    setopencamera(true);
                    // setstartrecording(true);
                    // setRecording(true);
                    // setcurrentply(0);
                    // setcurrentplyrecord(0);
                    // takeVideo();
                  }
                }}
                style={Styles.touchrec}>
                <View
                  style={[
                    Styles.reddot,
                    {
                      backgroundColor: !Audioinprocess
                        ? Colors.red
                        : Colors.black,
                    },
                  ]}
                />
                <Text style={[Styles.texrec, {marginRight: wp(2)}]}>
                  Record
                </Text>
                {startrecording ? (
                  <CountdownCircleTimer
                    isPlaying={startrecording}
                    size={20}
                    duration={60}
                    onComplete={() => {
                      stopVideo();
                    }}
                    colors="#A30000"
                    strokeWidth={2}>
                    {({remainingTime}) => (
                      <Animated.Text style={{color: 'white'}}>
                        {
                          (setcurrentply(remainingTime),
                          setcurrentplyrecord(remainingTime))
                        }
                        {remainingTime}
                      </Animated.Text>
                    )}
                  </CountdownCircleTimer>
                ) : null}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // if (recrdfilepath != '') {
                  //   setcurrentply2(0);
                  //   setcurrentply1(0);
                  //   setplaypasuse(!playpasuse);
                  //   setplaypasuse1(!playpasuse1);
                  //   if (currentply1 == 0 && currentply2 == 0) {
                  //   }

                  //  start();
                  if (Object.keys(videourl).length > 0) {
                    // setplaypasusevideo(!playpasusevideo);
                    navigation.navigate('PlayVideoScreen', {
                      ply: {
                        description: videourl.duration,
                        file: videourl.path,
                        file_type: videourl.mime,
                        creationDate: null,
                      },
                      typ: 'record',
                    });
                  } else {
                    alert('first add your Recording or Upload Video');
                  }
                }}
                // onPress={() => playSound(recrdfilepath)}
                // onPress={() => setplaypasuse(!playpasuse)}
                style={Styles.touchrec1}>
                <Image
                  source={
                    isRecording || !playpasusevideo
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
                    setplaypasuse(true);
                    setDuration(0);
                    setcurrentply1(0);
                    setcurrentply2(0);
                    setrecrdfilepath('');
                  } else if (Object.keys(videourl).length > 0) {
                    setvideourl({});
                    setcurrentply(0);
                  } else {
                    alert('First Recod ypur Audio');
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
            onpress={() => {
              if (videourl?.path) {
                navigation.navigate('PostQuestion', {videourl, typ: 'mp4'});
              } else {
                if (recrdfilepath != '') {
                  navigation.navigate('PostQuestion', {
                    recrdfilepath,
                    typ: 'mp3',
                  });
                } else {
                  alert('First Select Video or Record Audio to upload');
                }
              }
            }}
            title="NEXT"
            width="45"
          />
        </View>
        <Modal animationType="fade" transparent={true} visible={opencamera}>
          <View style={{flex: 1, backgroundColor: Colors.red}}>
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
                  setcurrentplyrecord(0);
                  takeVideo();
                }
              }}
              style={[
                Styles.touchrec,
                {
                  // top: wp(150),
                  bottom: wp(15),
                  width: wp(20),
                  height: wp(20),
                  borderRadius: wp(20),
                  flexDirection: 'column',
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
            </TouchableOpacity>
            <RNCamera
              ref={cameraRef}
              style={Styles.recodmenuview1}
              defaultVideoQuality={RNCamera.Constants.VideoQuality['480p']}
              type={cameratype}
              flashMode={RNCamera.Constants.FlashMode.on}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'transparent',
                position: 'absolute',
                width: '100%',
                paddingVertical: wp(6),
                paddingHorizontal: wp(3),
              }}>
              <TouchableOpacity
                onPress={() => {
                  setopencamera(false);
                }}
                style={[
                  Styles.viewref,
                  {marginTop: wp(10), backgroundColor: 'transparent'},
                ]}>
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
                style={[Styles.viewref, {marginTop: wp(5)}]}>
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

export default Ask;
