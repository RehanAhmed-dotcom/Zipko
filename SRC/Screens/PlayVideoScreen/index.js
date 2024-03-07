import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Share,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CommentQuestion,
  CommentResponse,
  FlatList,
  LikeQuestion,
  LikeResponse,
  Modal,
  SafeAreaView,
  ShareQuestion,
  ShareResponse,
  ViewDetail,
  coinTransper,
  DeleteUser,
  reportVideoDetail,
  viewFileDetail,
  view_all_comment,
  PayTipCoin,
  BlockUser,
} from '../../Api';
import React, {UseEffect, useEffect, useRef, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import Colors from '../../Colors';
import {Header} from '../../Components/Header';
import Input from '../../Components/Input';
import Loder from '../../Components/Loder';
import RBSheet from 'react-native-raw-bottom-sheet';
import Styles from './Style';
import Video from 'react-native-video';
import dynamicLinks from '@react-native-firebase/dynamic-links';
const PlayVideoScreen = ({navigation, route}) => {
  // console.log('{}{}signup', route.params?.ply);
  // if (route.params?.x == 'ok') {
  //   const ply = route.params?.ply;
  // }
  // else {
  const {ply, typ} = route.params;
  // }
console.log("route",route.params)
  // console.log('++++++++++', ply);
  const refRBSheet = useRef();
  // console.log('----hhhhhhhh-------', typ);
  const videoPlayer = useRef(null);
  // console.log('---Play video---', ply);
  const [cm, setcm] = useState([]);
  const [text_com, setText_com] = useState('');
  const [radio, setradio] = useState('Harassment');
  const [playpasuse, setplaypasuse] = useState(false);
  const [iconshow, seticonshow] = useState(false);
  const [loderfalse, setloderfalse] = useState(false);
  const [likedislike, setlikedislike] = useState(false);
  const [reportvideo, setreportvideo] = useState(false);
  const [currentply, setcurrentply] = useState(0);
  const [cu, setcu] = useState(0);
  const {userData, isLoggedIn} = useSelector(({USER}) => USER);
  const [coment, setcoment] = useState('');
  const [coment1, setcoment1] = useState('');
  const [commentarr, setcommentarr] = useState([]);
  const [likecount, setlikecount] = useState(0);
  const [commentcount, setcommentcount] = useState(0);
  const [modalVisible, setmodalVisible] = useState(false);
  const [modalMenu, setmodalMenu] = useState(false);
  const [warblock, setwarblock] = useState(false);
  const [wardelete, setwardelete] = useState(false);
  const [commentarr1, setcommentarr1] = useState([]);
  const [likecount1, setlikecount1] = useState(0);
  const [commentcount1, setcommentcount1] = useState(0);
  const [likes, setlikes] = useState(false);
  const [likes1, setlikes1] = useState(ply.is_like);
  const [cmShow, setcmShow] = useState(false);
  const [mdl, setmdl] = useState(false);
  // const [cn, setcn] = useState('');
  const [qu, setqu] = useState(
    ply.question_id != null ? ply.question_id : null,
  );
  let cui = 0;
  console.log('(((((((first)))))))', userData.userdata?.id);
  console.log('(((((((secd)))))))', ply.id);

  const lock_User = () => {
    const data = new FormData();
    data.append('block_user_id', ply.user?.id);
    BlockUser({Auth: userData.userdata.api_token, data: data})
      .then(res => {
        // console.log('first======', res);
        navigation.navigate('BottomTab');
      })
      .catch(err => {
        console.log('Error of Response Question', err);
      });
  };
  const delete_User = () => {
    const data = new FormData();
    data.append('id', ply.id);
    DeleteUser({Auth: userData.userdata.api_token, data: data})
      .then(res => {
        console.log('delete user', res);
        
        navigation.navigate('BottomTab');
      })
      .catch(err => {
        console.log('Error of Response Question', err);
      });
  };

  const onShare = async () => {
    try {
      const link = await dynamicLinks().buildLink({
        link: `https://zikpo.page.link/?id=${ply.description}&video=${ply.file}`,

        // domainUriPrefix is created in your Firebase console
        domainUriPrefix: 'https://zikpo.page.link',
        // optional setup which updates Firebase analytics campaign
        // "banner". This also needs setting up before hand
        analytics: {
          campaign: 'banner',
        },
      });
      console.log('::::----', link);

      const result = await Share.share({
        message: 'Zikpo : Share this post',
        url: link,
        imv: '1',
      });
    } catch (error) {
      Alert.alert(error.message);
    }

    const link = await dynamicLinks().buildShortLink({
      link: ply.file,

      domainUriPrefix: 'https://zikpo.page.link',
    });
    _shareItem(link);
  };

  setTimeout(() => {
    if (!playpasuse) {
      seticonshow(false);
    } else {
      seticonshow(true);
    }
  }, 1000);
  const getcurrenttime = tim => {
    setcurrentply(tim);
    // console.log('---', tim);
    let it = parseInt(ply.description) / 1000;
    let u = (parseInt(tim) / it) * 95;
    // console.log('--', parseInt(u));
    cui = tim;
    setcu(parseInt(u));
    if (tim >= it - 1) {
      //   setplaypasuse(true);
    }
  };

  const shares = () => {
    if (typ == 'question') {
      sharePosted();
    } else if (typ == 'response') {
      sharePostedResponse();
    } else {
      alert('Video not Yet Posted');
    }
  };

  const likeses = () => {
    if (typ == 'question') {
      _LikeResponse1();
    } else if (typ == 'response') {
      _LikeResponse();
    } else {
      alert('Video not Yet Posted');
    }
  };
  const sharePosted = () => {
    const data = new FormData();
    // data.append('response_id', route.params.res.id);

    data.append('question_id', route.params.ply.id);
    // data.append('response_id', route.params.qu.id);

    // console.log('Post Data', data);
    ShareQuestion({Auth: userData.userdata.api_token}, data)
      .then(res => {
        console.log('Response Of Response Question', res);
      })
      .catch(err => {
        console.log('Error of Response Question', err);
      });
  };
  const sharePostedResponse = () => {
    const data = new FormData();
    // data.append('response_id', route.params.res.id);

    data.append('question_id', route.params.ply.id);
    data.append('response_id', route.params.ply.id);

    // console.log('Post Data', data);
    ShareResponse({Auth: userData.userdata.api_token}, data)
      .then(res => {
        // console.log('Response Of Response Question', res);
      })
      .catch(err => {
        // console.log('Error of Response Question', err);
      });
  };

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
    data.append('question_id', route.params.ply.id);
    data.append('comment', text_com);

    // data.append('user_id', route.params.ply.user_id);

    // console.log('Post Data', data);
    CommentQuestion({Auth: userData.userdata.api_token}, data)
      .then(res => {
        // console.log('Response Of Comment', res);
        comment_get_all();
      })
      .catch(err => {
        // console.log('Error of Response Question', error.response.data);
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
    data.append('response_id', route.params.ply.id);

    data.append('question_id', route.params.ply.id);
    data.append('comment', text_com);

    // data.append('user_id', route.params.ply.user_id);

    // console.log('Post Data', data);
    CommentResponse({Auth: userData.userdata.api_token}, data)
      .then(res => {
        // console.log('Response Of Response Question', res);
        comment_get_all();
      })
      .catch(err => {
        // console.log('Error of Response Question', error.response.data);
      });
  };
  useEffect(() => {
    if (typ == 'question' || typ == 'response') {
      getVewinfo();
    }
  }, [navigation]);

  const getVewinfo = () => {
    const data = new FormData();
    data.append('type', typ);
    data.append('id', route?.params?.ply?.id);
    data.append('operation', typ);
    viewFileDetail({Auth: userData.userdata.api_token, data: data})
      .then(response => {
        // console.log("----hassan--", response)
      })
      .catch(error => {
        // console.log('Error Response ', error);
      });
  };

  useEffect(() => {
    comment_get_all();
  }, []);

  // console.log("pppppppppppppppppp", ply.question_id)
  const comment_get_all = () => {
    const data = new FormData();
    if (ply.question_id != null) {
      //Is Rersponse
      data.append('response_id', ply?.id);
    } else {
      //Is Question
      data.append('question_id', ply?.id);
    }
    view_all_comment({Auth: userData.userdata.api_token, data: data})
      .then(response => {
        // console.log("---+++++++++++++++++++++++++++++++--", response)
        setcm(response.comments);
      })
      .catch(error => {
        // console.log('Error Response __-----__________------', error);
      });
  };

  // console.log("------+=======================---------", cm)

  const report_this_video = () => {
    // console.log(";;;ddddd")
    const data = new FormData();
    if (ply.question_id != null) {
      data.append('response_id', ply?.id);
      data.append('reason', radio);
    } else {
      data.append('question_id', ply.id);
      data.append('reason', radio);
    }
    reportVideoDetail({Auth: userData.userdata.api_token, data: data})
      .then(response => {
        // console.log("----hassan--", response)
        setreportvideo(false);
        alert('Report Suucessfully');
      })
      .catch(error => {
        // console.log('Error Resposssnse ', error.response.data);
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

    data.append('question_id', ply.id);

    console.log('Post Data', data);
    LikeQuestion({Auth: userData.userdata.api_token}, data)
      .then(res => {
        // console.log('Response Of Response Question', res);
      })
      .catch(err => {
        // console.log('Error of Response Question', err);
      });
  };
  const pay_coin_tip = tp => {
    const data = new FormData();
    data.append('id', ply.id);
    data.append('coin', tp);
    PayTipCoin({Auth: userData.userdata.api_token}, data)
      .then(res => {
        console.log('=============', res);
        setmdl(false);

        alert(res.message);
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
    data.append('response_id', route.params.ply.id);

    data.append('question_id', route.params.ply.id);

    console.log('Post Data', data);
    LikeResponse({Auth: userData.userdata.api_token}, data)
      .then(res => {
        // console.log('Response Of Response Question', res);
      })
      .catch(err => {
        // console.log('Error of Response Question', err);
      });
  };

  const allcoversvideo_comm = ({item}) => (
    <View
      style={{
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
      }}>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'grey',
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          width: wp(12),
          height: wp(12),
        }}>
        <Image
          source={require('../../Assests/cm.png')}
          resizeMode="contain"
          style={{width: wp(10), height: wp(10)}}
        />
      </View>
      <View style={{flexDirection: 'column', marginLeft: wp(2)}}>
        <Text
          style={{
            fontSize: 14,
            color: 'black',
            fontWeight: '700',
            marginBottom: 3,
          }}>
          Arish
        </Text>
        <Text style={{fontSize: 12, color: 'grey', fontWeight: '400'}}>
          My bro is using app
        </Text>
      </View>
    </View>
  );

  const AllcomentShoes = () => {
    return (
      <View style={{width: '100%', height: '100%', zIndex: 1000}}>
        <View style={Styles.headcoment}>
          <Text style={Styles.textcoment}>Comments</Text>
          <TouchableOpacity onPress={() => refRBSheet.current.close()}>
            <Image
              style={Styles.crosstouch}
              resizeMode="contain"
              source={require('../../Assests/cross.png')}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'grey',
            width: '90%',
            alignSelf: 'center',
            borderRadius: 30,
            paddingLeft: wp('5%'),
            height: '10%',
            justifyContent: 'center',
          }}>
          <TextInput
            value={text_com}
            onChangeText={text => setText_com(text)}
            placeholder="Enter Your Comment"
            placeholderTextColor="grey"
            style={{paddingRight: wp('5%')}}
          />

          {ply.question_id != null ? (
            <TouchableOpacity
              style={{position: 'absolute', right: 0, padding: 10}}
              onPress={() => _CommentResponse()}>
              <Image
                source={require('../../Assests/cm.png')}
                resizeMode="contain"
                style={{width: wp(7), height: wp(7)}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{position: 'absolute', right: 0, padding: 10}}
              onPress={() => _CommentResponse1()}>
              <Image
                source={require('../../Assests/cm.png')}
                resizeMode="contain"
                style={{width: wp(7), height: wp(7)}}
              />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '700',
              color: 'black',
              marginLeft: wp(5),
              marginVertical: wp(5),
            }}>
            All Comments
          </Text>
          {cm.map(data => {
            return (
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  marginBottom: wp(2),
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: 'grey',
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: wp(12),
                    height: wp(12),
                  }}>
                  <Image
                    source={require('../../Assests/pro.png')}
                    resizeMode="contain"
                    style={{
                      width: wp(10),
                      height: wp(10),
                      borderRadius: wp(10),
                    }}
                  />
                </View>
                <View style={{flexDirection: 'column', marginLeft: wp(2)}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'black',
                      fontWeight: '700',
                      marginBottom: 3,
                    }}>
                    {data.user.name}
                  </Text>
                  <Text
                    style={{fontSize: 12, color: 'grey', fontWeight: '400'}}>
                    {data.comment}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>

      // </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={Styles.touchleft}>
        <Image
          source={require('../../Assests/arrow.png')}
          resizeMode="contain"
          style={Styles.letarrow}
        />
      </TouchableOpacity>
      <Video
        ref={videoPlayer}
        resizeMode="contain"
        source={{uri: ply.file}}
        style={{
          flex: 1,
          backgroundColor: Colors.black,
          width: '100%',
          height: '100%',
        }}
        paused={playpasuse}
        repeat={true}
        onEnd={() => setplaypasuse(false)}
        onBuffer={isBuffering => {
          if (isBuffering.isBuffering) {
            setloderfalse(true);
            // console.log('hassan', isBuffering.isBuffering);
          } else {
            setloderfalse(false);
            // console.log('iiiiiii', isBuffering.isBuffering);
          }
        }}
        onLoad={() => {
          console.log('iiiiiii');
        }}
        // onComplete={() => setplaypasuse(true)}
        onProgress={data => getcurrenttime(data.currentTime)}
        currentPlaybackTime={tim => getcurrenttime(tim)}
      />
      <View style={Styles.touchrec1}>
        <View style={Styles.profilview}></View>
        <TouchableOpacity
          onPress={() => setplaypasuse(!playpasuse)}
          style={Styles.touchrec}>
          {iconshow ? (
            <Image
              source={
                playpasuse
                  ? require('../../Assests/ply.png')
                  : require('../../Assests/pas.png')
              }
              resizeMode="contain"
              style={Styles.imaginner1}
            />
          ) : null}
        </TouchableOpacity>

        <View style={Styles.profilview}>
          {/* <View style={[Styles.profileview, { borderWidth: 1 }]}>
            <Image
              source={require('../../Assests/Heart.png')}
              resizeMode="contain"
              style={Styles.proimag1}
            />
          </View> */}
          {/* {ply?.question?.user?.id == userData.userdata?.id ? ( */}
          <TouchableOpacity
            onPress={() => {
              setmdl(true);
            }}
            style={Styles.profileview}>
            <Image
              source={require('../../Assests/dol_pay.png')}
              resizeMode="cover"
              style={[
                Styles.proimag1,
                {
                  tintColor: null,
                  width: wp(10),
                  height: wp(10),
                },
              ]}
            />
          </TouchableOpacity>
          {/* ) : null} */}
          <TouchableOpacity
            onPress={() => {
              likeses();
            }}
            style={Styles.profileview}>
            <Image
              source={require('../../Assests/Heart.png')}
              resizeMode="contain"
              style={[
                Styles.proimag1,
                {tintColor: likes1 ? Colors.red : Colors.white},
              ]}
            />
            <Text style={Styles.counttxt}>{ply.total_like}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setcmShow(true)}
            style={Styles.profileview}>
            <Image
              source={require('../../Assests/Chat.png')}
              resizeMode="contain"
              style={Styles.proimag1}
            />
            <Text style={Styles.counttxt}>{ply.total_comment}</Text>
            {/* <RBSheet
              ref={refRBSheet}
              height={600}
              closeOnDragDown={true}
              closeOnPressMask={true}
              openDuration={250}
              customStyles={{
                container: {
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 1000
                }
              }}
            >
              <AllcomentShoes />
            </RBSheet> */}
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => shares()}
            onPress={onShare}
            style={Styles.profileview}>
            <Image
              source={require('../../Assests/sh.png')}
              resizeMode="contain"
              style={Styles.proimag1}
            />
            <Text style={Styles.counttxt}>{ply.total_share}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setmodalMenu(!modalMenu)}
            style={Styles.profileview}>
            <Image
              source={require('../../Assests/dot.png')}
              resizeMode="contain"
              style={Styles.proimag1}
            />
          </TouchableOpacity>
        </View>
        {modalVisible ? (
          <View style={Styles.verifiyview}>
            <Text style={Styles.extbutton}>You Want To Report this video</Text>
            <View style={Styles.tovieconfirmuch}>
              <TouchableOpacity
                onPress={() => {
                  setmodalVisible(false), setreportvideo(true);
                }}
                style={Styles.touch}>
                <Text style={Styles.extbutton}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setmodalVisible(false)}
                style={Styles.touch}>
                <Text style={Styles.extbutton}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        {warblock ? (
          <View style={Styles.verifiyview}>
            <Text style={Styles.extbutton}>You Want To Block this User</Text>
            <View style={Styles.tovieconfirmuch}>
              <TouchableOpacity
                onPress={() => {
                  setwarblock(false);
                  lock_User();
                }}
                style={Styles.touch}>
                <Text style={Styles.extbutton}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setwarblock(false)}
                style={Styles.touch}>
                <Text style={Styles.extbutton}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : wardelete?
        <View style={Styles.verifiyview}>
            <Text style={Styles.extbutton}>You Want To Delete this User</Text>
            <View style={Styles.tovieconfirmuch}>
              <TouchableOpacity
                onPress={() => {
                  setwardelete(false);
                  delete_User();
                }}
                style={Styles.touch}>
                <Text style={Styles.extbutton}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setwardelete(false)}
                style={Styles.touch}>
                <Text style={Styles.extbutton}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        :null}
        {modalMenu ? (
          <View
            style={{
              // paddingHorizontal: 5,
              bottom: wp(30),
              paddingVertical: 10,
              width: '35%',
              height: '20%',
              backgroundColor: Colors.white,
              borderRadius: 10,
              position: 'absolute',
              zIndex: 100,
              right: wp(10),
              bottom: hp(22),
            }}>
            <View
              style={{
                width: '100%',
                alignSelf: 'center',
                backgroundColor: 'transparent',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setwarblock(true);
                  setmodalMenu(false);
                }}
                style={{
                  height: '33%',
                  justifyContent: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: 'grey',
                }}>
                <Text style={[Styles.extbutton, {textAlign: 'center'}]}>
                  Block User
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setwardelete(true);
                  setmodalMenu(false);
                }}
                style={{
                  height: '33%',
                  justifyContent: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: 'grey',
                }}>
                <Text style={[Styles.extbutton, {textAlign: 'center'}]}>
                  Delete Video
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setmodalMenu(false);
                  setmodalVisible(true);
                }}
                style={{
                  height: '33%',
                   justifyContent: 'center'}}>
                <Text style={[Styles.extbutton, {textAlign: 'center'}]}>
                  Report Video
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        {reportvideo ? (
          <View style={Styles.verifiyview1}>
            <View style={{marginTop: wp(5), marginHorizontal: wp(5)}}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: wp(2),
                }}
                onPress={() => setradio('Harassment')}>
                <Image
                  source={
                    radio == 'Harassment'
                      ? require('../../Assests/radio_fil.png')
                      : require('../../Assests/radio_empty.png')
                  }
                  resizeMode="contain"
                  style={{width: wp(5), height: wp(5), marginRight: wp(1)}}
                />
                <Text>Harassment</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: wp(2),
                }}
                onPress={() => setradio('Spam')}>
                <Image
                  source={
                    radio == 'Spam'
                      ? require('../../Assests/radio_fil.png')
                      : require('../../Assests/radio_empty.png')
                  }
                  resizeMode="contain"
                  style={{width: wp(5), height: wp(5), marginRight: wp(1)}}
                />
                <Text>Spam</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: wp(2),
                }}
                onPress={() => setradio('Nudity')}>
                <Image
                  source={
                    radio == 'Nudity'
                      ? require('../../Assests/radio_fil.png')
                      : require('../../Assests/radio_empty.png')
                  }
                  resizeMode="contain"
                  style={{width: wp(5), height: wp(5), marginRight: wp(1)}}
                />
                <Text>Nudity</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: wp(2),
                }}
                onPress={() => setradio('Self Harm')}>
                <Image
                  source={
                    radio == 'Self Harm'
                      ? require('../../Assests/radio_fil.png')
                      : require('../../Assests/radio_empty.png')
                  }
                  resizeMode="contain"
                  style={{width: wp(5), height: wp(5), marginRight: wp(1)}}
                />
                <Text>Self Harm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: wp(2),
                }}
                onPress={() => setradio('Sensitive or Disturbing')}>
                <Image
                  source={
                    radio == 'Sensitive or Disturbing'
                      ? require('../../Assests/radio_fil.png')
                      : require('../../Assests/radio_empty.png')
                  }
                  resizeMode="contain"
                  style={{width: wp(5), height: wp(5), marginRight: wp(1)}}
                />
                <Text>Sensitive or Disturbing</Text>
              </TouchableOpacity>
            </View>

            <View style={Styles.tovieconfirmuch}>
              <TouchableOpacity
                style={Styles.touch}
                onPress={() => report_this_video()}>
                <Text style={Styles.extbutton}>Report</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setreportvideo(false)}
                style={Styles.touch}>
                <Text style={Styles.extbutton}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        {cmShow ? (
          <View style={Styles.verifiyview2}>
            <View style={Styles.headcoment}>
              <Text style={Styles.textcoment}>Comments</Text>
              <TouchableOpacity onPress={() => setcmShow(false)}>
                <Image
                  style={Styles.crosstouch}
                  resizeMode="contain"
                  source={require('../../Assests/cross.png')}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'grey',
                width: '90%',
                alignSelf: 'center',
                borderRadius: 30,
                paddingLeft: wp('5%'),
                height: '10%',
                justifyContent: 'center',
              }}>
              <TextInput
                value={text_com}
                onChangeText={text => setText_com(text)}
                placeholder="Enter Your Comment"
                placeholderTextColor="grey"
                style={{paddingRight: wp('5%')}}
              />

              {ply.question_id != null ? (
                <TouchableOpacity
                  style={{position: 'absolute', right: 0, padding: 10}}
                  onPress={() => _CommentResponse()}>
                  <Image
                    source={require('../../Assests/cm.png')}
                    resizeMode="contain"
                    style={{width: wp(7), height: wp(7)}}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{position: 'absolute', right: 0, padding: 10}}
                  onPress={() => _CommentResponse1()}>
                  <Image
                    source={require('../../Assests/cm.png')}
                    resizeMode="contain"
                    style={{width: wp(7), height: wp(7)}}
                  />
                </TouchableOpacity>
              )}
            </View>

            <ScrollView
              style={{flex: 1}}
              contentContainerStyle={{
                flexGrow: 1,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '700',
                  color: 'black',
                  marginLeft: wp(5),
                  marginVertical: wp(5),
                }}>
                All Comments
              </Text>
              {cm.map(data => {
                return (
                  <View
                    style={{
                      width: '90%',
                      alignSelf: 'center',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                      marginBottom: wp(2),
                    }}>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: 'grey',
                        borderRadius: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: wp(12),
                        height: wp(12),
                      }}>
                      <Image
                        source={require('../../Assests/pro.png')}
                        resizeMode="contain"
                        style={{
                          width: wp(10),
                          height: wp(10),
                          borderRadius: wp(10),
                        }}
                      />
                    </View>
                    <View style={{flexDirection: 'column', marginLeft: wp(2)}}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: 'black',
                          fontWeight: '700',
                          marginBottom: 3,
                        }}>
                        {data.user.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'grey',
                          fontWeight: '400',
                        }}>
                        {data.comment}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        ) : null}
      </View>
      {mdl ? (
        <KeyboardAvoidingView
          behavior="height"
          style={{
            paddingHorizontal: 5,
            bottom: wp(70),
            width: '65%',
            height: '30%',
            backgroundColor: Colors.white,
            borderRadius: 10,
            position: 'absolute',
            zIndex: 100,
            alignSelf: 'center',
          }}>
          <TouchableOpacity onPress={() => setmdl(false)}>
            <Image
              style={{
                // justifyContent: 'flex-end',
                // alignItems: 'center',
                width: wp(8),
                height: wp(8),
                alignSelf: 'flex-end',
                bottom: hp(1),
                left: wp(2.5),
                tintColor: 'red',
              }}
              source={require('../../Assests/cn.png')}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              alignItems: 'center',
              paddingBottom: wp(2),
              paddingHorizontal: 10,
            }}
            onPress={() => pay_coin_tip(5)}>
            <Image
              source={require('../../Assests/dol_pay.png')}
              resizeMode="cover"
              style={{width: wp(7), height: wp(7)}}
            />
            <Text style={{color: 'black', fontSize: 15, marginLeft: wp(3)}}>
              5 Coins
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              alignItems: 'center',
              paddingBottom: wp(2),
              paddingHorizontal: 10,
              marginTop: wp(2),
            }}
            onPress={() => pay_coin_tip(10)}>
            <Image
              source={require('../../Assests/dol_pay.png')}
              resizeMode="cover"
              style={{width: wp(7), height: wp(7)}}
            />
            <Text style={{color: 'black', fontSize: 15, marginLeft: wp(3)}}>
              10 Coins
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              alignItems: 'center',
              paddingBottom: wp(2),
              paddingHorizontal: 10,
              marginTop: wp(2),
            }}
            onPress={() => pay_coin_tip(15)}>
            <Image
              source={require('../../Assests/dol_pay.png')}
              resizeMode="cover"
              style={{width: wp(7), height: wp(7)}}
            />
            <Text style={{color: 'black', fontSize: 15, marginLeft: wp(3)}}>
              15 Coins
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              alignItems: 'center',
              paddingBottom: wp(2),
              paddingHorizontal: 10,
              marginTop: wp(2),
            }}
            onPress={() => pay_coin_tip(20)}>
            <Image
              source={require('../../Assests/dol_pay.png')}
              resizeMode="cover"
              style={{width: wp(7), height: wp(7)}}
            />
            <Text style={{color: 'black', fontSize: 15, marginLeft: wp(3)}}>
              20 Coins
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      ) : null}
    </View>
  );
};

export default PlayVideoScreen;
