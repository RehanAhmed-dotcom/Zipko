import {
  CommentQuestion,
  CommentResponse,
  LikeQuestion,
  LikeResponse,
  ShareQuestion,
  ShareResponse,
  ViewDetail,
  coinTransper,
} from '../../Api';
import {
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
import React, { useEffect, useRef, useState } from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../../Colors';
import Header from '../../Components/Header';
import ImagePicker from 'react-native-image-crop-picker';
import Input from '../../Components/Input';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import RButton from '../../Components/RButton';
import SignupStyle from '../Signup/Style';
import Sound from 'react-native-sound';
import Styles from './Style';
import Video from 'react-native-video';

const QuestionAnswers = ({ navigation, route }) => {
  const [playesrec, setplayesrec] = useState({ id: '0' });
  const [modalVisible, setmodalVisible] = useState(false);
  const [typequestion, settypequestion] = useState('');
  const [questionuser, setquestionuser] = useState({});
  const [playvideo, setplayvideo] = useState(false);
  const [playvideo1, setplayvideo1] = useState(false);
  const [openchat, setopenchat] = useState(false);
  const [openchat1, setopenchat1] = useState(false);
  const [coment, setcoment] = useState('');
  const [coment1, setcoment1] = useState('');
  const [commentarr, setcommentarr] = useState([]);
  const [likecount, setlikecount] = useState(0);
  const [commentcount, setcommentcount] = useState(0);

  const [commentarr1, setcommentarr1] = useState([]);
  const [likecount1, setlikecount1] = useState(0);
  const [commentcount1, setcommentcount1] = useState(0);
  const [doleroprn, setdoleroprn] = useState(false);
  const [playoff, setplayoff] = useState(false);
  const [videourl, setvideourl] = useState({});
  const [playpasuse, setplaypasuse] = useState(true);
  const [playpasuse1, setplaypasuse1] = useState(true);
  const [currentply, setcurrentply] = useState(0);
  const { userData, isLoggedIn } = useSelector(({ USER }) => USER);
  const [likes, setlikes] = useState(false);
  const [likes1, setlikes1] = useState(false);
  console.log('----', userData);
  const [cu, setcu] = useState(0);
  console.log('[[==', currentply);
  const videoPlayer = useRef(null);
  console.log('[[==', currentply);
  const rate = [
    { id: 1, price: 5, coin: 10 },
    { id: 2, price: 9, coin: 15 },
    { id: 3, price: 15, coin: 20 },
    { id: 4, price: 25, coin: 30 },
    { id: 5, price: 35, coin: 45 },
    { id: 6, price: 45, coin: 60 },
  ];
  useEffect(() => {
    getVewinfo();
  }, [navigation]);
  const sharePosted = () => {
    const data = new FormData();
    // data.append('response_id', route.params.res.id);

    data.append('question_id', route.params.qu.id);
    // data.append('response_id', route.params.qu.id);

    console.log('Post Data', data);
    ShareQuestion({ Auth: userData.userdata.api_token }, data)
      .then(res => {
        if (res.status == 'success') {
          alert(`${res.message}`);
        }
        console.log('Response Of Response Question', res);
      })
      .catch(err => {
        console.log('Error of Response Question', err);
      });
  };
  const sharePostedResponse = () => {
    const data = new FormData();
    // data.append('response_id', route.params.res.id);

    data.append('question_id', route.params.qu.id);
    data.append('response_id', route.params.res.id);

    console.log('Post Data', data);
    ShareResponse({ Auth: userData.userdata.api_token }, data)
      .then(res => {
        console.log('Response Of Response Question', res);
        if (res.status == 'success') {
          alert(`${res.message}`);
        }
      })
      .catch(err => {
        console.log('Error of Response Question', err);
      });
  };
  const GiveCoinonVideo = itm => {
    const data = new FormData();
    data.append('user2', route.params.res.user_id);
    data.append('coin', itm);
    data.append('type', 'response');
    data.append('question_id', route.params.qu.id);
    data.append('response_id', route?.params?.res?.id);
    data.append('status', `Spend ${itm} Coins - on ... Video`);
    data.append('status2', `Gain ${itm} Coins - on ... Video`);

    coinTransper({ Auth: userData.userdata.api_token }, data)
      .then(res => {
        console.log('Response of coinPost', res);
        if (res.status == 'success') {
          setdoleroprn(false);
          // navigation.navigate('SelectTopics');
        } else {
          setdoleroprn(false);
          alert('Somt thing want Wrong');
        }
      })
      .catch(error => {
        setdoleroprn(false);
        if (error?.response?.data?.status == 'error') {
          alert(`${error.response.data.message}`);
          setdoleroprn(false);
          // navigation.navigate('SelectTopics');
        }
        console.log('Error in post Coin', error.response.data);
      });
  };

  const getVewinfo = () => {
    ViewDetail({ Auth: userData.userdata.api_token }, route?.params?.res?.id)
      .then(response => {
        console.log('Response of View Detail', response);
        setquestionuser(response.data.question);
        setcommentcount(route?.params?.res?.comments?.length);
        setlikecount(route?.params?.res?.likes.length);

        setcommentcount1(response.data.question.comments.length);
        setlikecount1(response.data.question.likes.length);
        if (response.data.question.comments.length > 0) {
          let arr = [];
          response.data.question.comments.forEach(element => {
            let r = {
              id: element.id,
              comment: element.comment,
              image: element.user.image,
              username: element.user.username,
            };
            arr.push(r);
          });
          setcommentarr1(arr);
        }
        if (response.data.question.likes.length > 0) {
          console.log('1');
          response.data.question.likes?.forEach(element => {
            console.log('2');
            if (element.user.email == userData.userdata.email) {
              console.log('3');
              setlikes1(true);
            }
          });
        }

        if (route?.params?.res?.comments.length > 0) {
          let arr = [];
          route?.params?.res?.comments?.forEach(element => {
            let r = {
              id: element.id,
              comment: element.comment,
              image: element.user.image,
              username: element.user.username,
            };
            arr.push(r);
          });
          setcommentarr(arr);
        }
        if (route?.params?.res?.likes.length > 0) {
          console.log('1');
          route?.params?.res?.likes?.forEach(element => {
            console.log('2');
            if (element.user.email == userData.userdata.email) {
              console.log('3');
              setlikes(true);
            }
          });
        }
      })
      .catch(error => {
        console.log('Error Response ', error);
      });
  };
  //   setTimeout(() => {
  //     if (playvideo && !playoff) {
  //       setplayoff(true);
  //     }
  //   }, 5000);
  const allcoins = ({ item }) => (
    <View style={Styles.coinspace}>
      <TouchableOpacity
        onPress={() => GiveCoinonVideo(item.coin)}
        style={Styles.coin}>
        <Image
          source={require('../../Assests/dll.png')}
          resizeMode="contain"
          style={Styles.proimag}
        />
        <Text style={Styles.txt}>{item.coin} Coins</Text>
      </TouchableOpacity>
    </View>
  );

  const _CommentResponse1 = () => {
    setcommentcount1(commentcount1 + 1);
    let r = {
      id:
        commentarr1.length > 0 ? commentarr1[commentarr1.length - 1].id + 1 : 1,
      comment: coment1,
      image: userData.userdata.image,
      username: userData.userdata.username,
    };
    setcommentarr1([...commentarr1, r]);
    const data = new FormData();

    data.append('question_id', route.params.qu.id);
    data.append('comment', coment);

    data.append('user_id', route.params.res.user_id);

    console.log('Post Data', data);
    CommentQuestion({ Auth: userData.userdata.api_token }, data)
      .then(res => {
        console.log('Response Of Response Question', res);
      })
      .catch(err => {
        console.log('Error of Response Question', err);
      });
  };

  const _CommentResponse = () => {
    setcommentcount(commentcount + 1);
    let r = {
      id: commentarr.length > 0 ? commentarr[commentarr.length - 1].id + 1 : 1,
      comment: coment,
      image: userData.userdata.image,
      username: userData.userdata.username,
    };
    setcommentarr([...commentarr, r]);
    const data = new FormData();
    data.append('response_id', route.params.res.id);

    data.append('question_id', route.params.qu.id);
    data.append('comment', coment);

    data.append('user_id', route.params.res.user_id);

    console.log('Post Data', data);
    CommentResponse({ Auth: userData.userdata.api_token }, data)
      .then(res => {
        console.log('Response Of Response Question', res);
      })
      .catch(err => {
        console.log('Error of Response Question', err);
      });
  };

  const _LikeResponse1 = () => {
    if (!likes1) {
      setlikecount1(likecount1 + 1);
      setlikes1(true);
    } else {
      setlikecount1(likecount1 - 1);
      setlikes1(false);
    }
    const data = new FormData();
    // data.append('response_id', route.params.res.id);

    data.append('question_id', route.params.qu.id);

    console.log('Post Data', data);
    LikeQuestion({ Auth: userData.userdata.api_token }, data)
      .then(res => {
        console.log('Response Of Response Question', res);
      })
      .catch(err => {
        console.log('Error of Response Question', err);
      });
  };
  const _LikeResponse = () => {
    if (!likes) {
      setlikecount(likecount + 1);
      setlikes(true);
    } else {
      setlikecount(likecount - 1);
      setlikes(false);
    }
    const data = new FormData();
    data.append('response_id', route.params.res.id);

    data.append('question_id', route.params.qu.id);

    console.log('Post Data', data);
    LikeResponse({ Auth: userData.userdata.api_token }, data)
      .then(res => {
        console.log('Response Of Response Question', res);
      })
      .catch(err => {
        console.log('Error of Response Question', err);
      });
  };
  let cui = 0;
  const getcurrenttime = tim => {
    setcurrentply(tim);
    console.log('---', tim);
    let it = parseInt(route.params.qu.description) / 1000;
    let u = (parseInt(tim) / it) * 95;
    console.log('--', parseInt(u));
    cui = tim;
    setcu(parseInt(u));
    if (tim >= it - 1) {
      setplaypasuse(true);
    }
  };

  const whoosh = useRef(null);
  const whoosh1 = useRef(null);
  const [playing, setPlaying] = useState(false);

  const [duration, setDuration] = useState(0);
  const [playing1, setPlaying1] = useState(false);

  const [duration1, setDuration1] = useState(0);

  useEffect(() => {
    if (route.params.res.file_type == 'mp3') {
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
    if (route.params.qu.file_type == 'mp3') {
    } else {
      setPlaying(false);
    }
    return () => {
      if (whoosh1.current) {
        whoosh1.current.stop();
      }
    };
  }, []);
  const start = async () => {
    // await AddTrackplayer();
    if (playpasuse1 == false) {
      console.log('111111');
      // whoosh1.current.pause();

      if (playpasuse == false) {
        whoosh1.current.pause();
      }
      setplaypasuse(true);
      SoundPlayer();

      // await TrackPlayer.play();
    } else {
      console.log('1111111333333');
      whoosh.current.pause();
      // await TrackPlayer.stop();
    }
  };
  const start1 = async () => {
    console.log('222222');
    // await AddTrackplayer();
    if (playpasuse == false) {
      console.log('222222');
      // whoosh.current.pause();
      if (playpasuse1 == false) {
        whoosh.current.pause();
      }
      setplaypasuse1(true);
      SoundPlayer1();
    } else {
      console.log('22233333');
      whoosh1.current.pause();
      // await TrackPlayer.stop();
    }
  };
  const SoundPlayer1 = () => {
    whoosh1.current = new Sound(route.params.qu.file, null, error => {
      if (error) {
        return;
      }
      setDuration1(whoosh1.current.getDuration());
      setPlaying1(true);

      whoosh1.current.play(success => {
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
  const SoundPlayer = () => {
    whoosh.current = new Sound(route.params.res.file, null, error => {
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

  const allcomments = ({ item }) => (
    <View style={Styles.viewspacecoment}>
      <View style={Styles.viewcoment}>
        <View style={Styles.proview}>
          <Image
            source={
              item.image ? { uri: item.image } : require('../../Assests/vi.png')
            }
            resizeMode="contain"
            style={Styles.proimag}
          />
        </View>
        <View>
          <Text style={Styles.textpro}>{item.username}</Text>
          <Text style={[Styles.textpro, { color: Colors.gray }]}>
            {item.comment}
          </Text>
        </View>
      </View>
    </View>
  );
  return (
    <ImageBackground
      source={require('../../Assests/bac1.png')}
      resizeMode="cover"
      style={Styles.image}>
      <Header left="true" navigation={navigation} title="Question & Answer" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView style={{ flex: 1 }}>
          <View style={Styles.innercontainer}>
            <View style={Styles.Videoview}>
              <View style={Styles.recodmenuview}>
                <Text style={Styles.text}>
                  {route.params.qu.duration_information
                    ? route.params.qu.duration_information
                    : 'No Question Added Yet'}
                </Text>
                {!playpasuse ? (
                  <>
                    {route.params.qu.file_type == 'mp4' ? (
                      <Video
                        ref={videoPlayer}
                        resizeMode="cover"
                        source={{ uri: route.params.qu.file }}
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
                        style={Styles.thumbimg1}
                        source={require('../../Assests/man.png')}
                        resizeMode={'contain'}
                      />
                    )}
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
                      {route.params.qu.file_type == 'mp4'
                        ? parseInt(
                          parseInt(route.params.qu.description) / 1000 -
                          parseInt(currentply),
                        )
                        : null}
                    </Text>
                  </>
                ) : (
                  <Image
                    style={[Styles.thumbimg, { backgroundColor: Colors.white }]}
                    source={
                      route.params.qu.file_type == 'mp4'
                        ? route.params.qu.thumbnail != null
                          ? { uri: route.params.qu.thumbnail }
                          : require('../../Assests/vi.png')
                        : require('../../Assests/man.png')
                    }
                    resizeMode={
                      route.params.qu.file_type == 'mp4'
                        ? route.params.qu.thumbnail != null
                          ? 'cover'
                          : 'cover'
                        : 'contain'
                    }
                  />
                )}

                {!openchat1 ? (
                  <View style={Styles.touchrec2}>
                    <View style={Styles.touchrec21}>
                      <View style={Styles.perreponpro}>
                        <View style={Styles.proview}>
                          <Image
                            source={
                              questionuser?.user?.image
                                ? { uri: questionuser?.user?.image }
                                : require('../../Assests/vi.png')
                            }
                            resizeMode="contain"
                            style={Styles.proimag}
                          />
                        </View>
                        <Text style={Styles.textpro}>
                          {questionuser?.user?.username}
                        </Text>
                      </View>
                      <View style={Styles.sharmain}>
                        <View
                          // onPress={() => setdoleroprn(!doleroprn)}
                          style={[
                            Styles.shview,
                            { backgroundColor: Colors.transperentheader },
                          ]}>
                          {/* <Image
                          source={require('../../Assests/dol.png')}
                          resizeMode="contain"
                          style={Styles.shview}
                        /> */}
                        </View>
                        <TouchableOpacity
                          onPress={() => sharePosted()}
                          style={Styles.shview}>
                          <Image
                            source={require('../../Assests/sh.png')}
                            resizeMode="contain"
                            style={Styles.proimag1}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={Styles.touchrec22}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('PlayVideoScreen', {
                            ply: route?.params?.qu,
                            typ: "question",
                          });
                          // setplaypasuse(!playpasuse),
                          //   setplaypasuse1(true),
                          //   setplayvideo(!playvideo);
                          if (route.params.qu.file_type == 'mp3') {
                            start1();
                          }
                        }}
                        style={Styles.touchrecplay}>
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
                      {/* {doleroprn ? (
                      <View style={Styles.listvflat}>
                        <FlatList
                          showsVerticalScrollIndicator={false}
                          data={[1, 2, 3, 4, 5]}
                          renderItem={allcoins}
                        />
                      </View>
                    ) : null} */}
                    </View>
                    <View style={Styles.touchrec23}>
                      <TouchableOpacity
                        onPress={() => _LikeResponse1()}
                        style={Styles.likview}>
                        <Image
                          source={require('../../Assests/Heart.png')}
                          resizeMode="contain"
                          style={[
                            Styles.imaginnerherart,
                            {
                              tintColor: likes1 ? Colors.red : Colors.gray,
                            },
                          ]}
                        />
                        <Text style={Styles.licktxt}>{likecount1}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setopenchat1(true)}
                        style={Styles.likview}>
                        <Image
                          source={require('../../Assests/Chat.png')}
                          resizeMode="contain"
                          style={[
                            Styles.imaginnerherart,
                            { tintColor: Colors.blue },
                          ]}
                        />
                        <Text style={Styles.licktxt}>{commentcount1}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View style={Styles.touchrec6}>
                    <View style={Styles.touchrec61}></View>
                    <View style={Styles.touchrec62}>
                      <View style={Styles.comtxtcrossview}>
                        <Text style={Styles.comtxt}>Comments</Text>
                        <TouchableOpacity onPress={() => setopenchat1(false)}>
                          <Image
                            source={require('../../Assests/cross.png')}
                            resizeMode="cover"
                            style={Styles.cros}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={Styles.flatlistview}>
                        <FlatList data={commentarr1} renderItem={allcomments} />
                      </View>
                      <View style={Styles.sendchat}>
                        <TextInput
                          value={coment1}
                          style={Styles.inputstyl}
                          placeholderTextColor={Colors.gray}
                          placeholder="Write.."
                          onChangeText={txt => setcoment1(txt)}></TextInput>
                        <TouchableOpacity
                          onPress={() => {
                            coment1 != '' ? _CommentResponse1() : null;
                          }}>
                          <Image
                            source={require('../../Assests/com.png')}
                            resizeMode="cover"
                            style={Styles.sendcom}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </View>
            <View style={Styles.Videoview}>
              <View style={Styles.recodmenuview}>
                <Text style={Styles.text}>Response</Text>
                {playpasuse1 ? (
                  <Image
                    source={
                      route.params.res.file_type == 'mp4'
                        ? route.params.res.thumbnail != null
                          ? { uri: route.params.res.thumbnail }
                          : require('../../Assests/vi.png')
                        : require('../../Assests/man.png')
                    }
                    resizeMode={
                      route.params.res.file_type == 'mp4'
                        ? route.params.res.thumbnail != null
                          ? 'cover'
                          : 'cover'
                        : 'contain'
                    }
                    style={[Styles.thumbimg, { backgroundColor: Colors.white }]}
                  />
                ) : (
                  <View
                    style={[Styles.thumbimg, { backgroundColor: Colors.black }]}>
                    {route.params.res.file_type == 'mp4' ? (
                      <Video
                        ref={videoPlayer}
                        resizeMode="cover"
                        source={{ uri: route.params.res.file }}
                        style={Styles.thumbimg}
                        paused={playpasuse1}
                        onComplete={() => {
                          setplaypasuse1(true),
                            setplayoff(true),
                            setplayvideo(false);
                        }}
                        onProgress={data => setcurrentply(data.currentTime)}
                      // currentPlaybackTime={tim => setcurrentply(tim)}
                      />
                    ) : (
                      <Image
                        source={require('../../Assests/man.png')}
                        resizeMode={'contain'}
                        style={Styles.thumbimg}
                      />
                    )}
                  </View>
                )}
                {!openchat ? (
                  <View style={Styles.touchrec2}>
                    <View style={Styles.touchrec21}>
                      <View style={Styles.perreponpro}>
                        <View style={Styles.proview}>
                          <Image
                            source={
                              route.params.res.user.image
                                ? { uri: route.params.res.user.image }
                                : require('../../Assests/vi.png')
                            }
                            resizeMode="contain"
                            style={Styles.proimag}
                          />
                        </View>
                        <Text style={Styles.textpro}>
                          {route.params.res.user.username}
                        </Text>
                      </View>
                      <View style={Styles.sharmain}>
                        <TouchableOpacity
                          onPress={() => setdoleroprn(!doleroprn)}
                          style={Styles.shview}>
                          <Image
                            source={require('../../Assests/dol.png')}
                            resizeMode="contain"
                            style={Styles.shview}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => sharePostedResponse()}
                          style={Styles.shview}>
                          <Image
                            source={require('../../Assests/sh.png')}
                            resizeMode="contain"
                            style={Styles.proimag1}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={Styles.touchrec22}>
                      <TouchableOpacity
                        onPress={() => {
                          // setplayoff(!playoff),
                          //   setplayvideo1(!playvideo1),
                          //   setplaypasuse1(!playpasuse1),
                          //   setplaypasuse(true);
                          navigation.navigate('PlayVideoScreen', {
                            ply: route?.params?.res,
                            typ: "response",
                          });
                          if (route.params.res.file_type == 'mp3') {
                            start();
                          }
                        }}
                        style={Styles.touchrecplay}>
                        <Image
                          source={
                            playpasuse1
                              ? require('../../Assests/ply.png')
                              : require('../../Assests/pas.png')
                          }
                          resizeMode="contain"
                          style={Styles.imaginner1}
                        />
                      </TouchableOpacity>
                      {doleroprn ? (
                        <View style={Styles.listvflat}>
                          <FlatList
                            showsVerticalScrollIndicator={false}
                            data={rate}
                            renderItem={allcoins}
                          />
                        </View>
                      ) : null}
                    </View>
                    <View style={Styles.touchrec23}>
                      <TouchableOpacity
                        onPress={() => _LikeResponse()}
                        style={Styles.likview}>
                        <Image
                          source={require('../../Assests/Heart.png')}
                          resizeMode="contain"
                          style={[
                            Styles.imaginnerherart,
                            {
                              tintColor: likes ? Colors.red : Colors.gray,
                            },
                          ]}
                        />
                        <Text style={Styles.licktxt}>{likecount}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setopenchat(true)}
                        style={Styles.likview}>
                        <Image
                          source={require('../../Assests/Chat.png')}
                          resizeMode="contain"
                          style={[
                            Styles.imaginnerherart,
                            { tintColor: Colors.blue },
                          ]}
                        />
                        <Text style={Styles.licktxt}>{commentcount}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View style={Styles.touchrec6}>
                    <View style={Styles.touchrec61}></View>
                    <View style={Styles.touchrec62}>
                      <View style={Styles.comtxtcrossview}>
                        <Text style={Styles.comtxt}>Comments</Text>
                        <TouchableOpacity onPress={() => setopenchat(false)}>
                          <Image
                            source={require('../../Assests/cross.png')}
                            resizeMode="cover"
                            style={Styles.cros}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={Styles.flatlistview}>
                        <FlatList data={commentarr} renderItem={allcomments} />
                      </View>
                      <View style={Styles.sendchat}>
                        <TextInput
                          value={coment}
                          style={Styles.inputstyl}
                          placeholderTextColor={Colors.gray}
                          placeholder="Write.."
                          onChangeText={txt => setcoment(txt)}></TextInput>
                        <TouchableOpacity
                          onPress={() => {
                            coment != '' ? _CommentResponse() : null;
                          }}>
                          <Image
                            source={require('../../Assests/com.png')}
                            resizeMode="cover"
                            style={Styles.sendcom}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default QuestionAnswers;
