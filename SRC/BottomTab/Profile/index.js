import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {EditProfile, hide_Del} from '../../Api';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Colors from '../../Colors';
import Header from '../../Components/Header';
import ImagePicker from 'react-native-image-crop-picker';
import Input from '../../Components/Input';
import RButton from '../../Components/RButton';
import Sound from 'react-native-sound';
import Styles from './Style';
import Stylesresponse from '../../Screens/Response/Style';
import Video from 'react-native-video';
import {detailUSer, deleteAcc} from '../../Api';

const Profile = ({navigation}) => {
  const videoPlayer = useRef(null);
  const [cu, setcu] = useState(0);
  const color = [
    {bac: 'rgba(6, 146, 203, 0.3)', col: '#0691CB'},
    {bac: 'rgba(128, 81, 205 ,0.3)', col: '#8051CD'},
    {bac: 'rgba(76 ,175 ,80 ,0.3)', col: '#4CAF50'},
    {bac: 'rgba(245 ,0 ,0 ,0.3)', col: '#F50000'},
  ];
  const [playpasuse, setplaypasuse] = useState({id: ''});
  const [currentply, setcurrentply] = useState(0);
  const {userData, isLoggedIn} = useSelector(({USER}) => USER);
  const [questionlist, setQuestionlist] = useState([]);
  const [responselist, setResponselist] = useState([]);
  const [experties, setExperties] = useState([]);
  const [imageparh, setimageparh] = useState('');
  const [interest, setinterest] = useState([]);
  const [pro, setpro] = useState({});
  const [confirm, setconfirm] = useState([]);
  const [loding, setloding] = useState(true);
  const [openmodal, setopenmodal] = useState(false);

  const [headloding, setheadloding] = useState(true);
  const [delid, setdelid] = useState(-1);
  const [typqr, settypqr] = useState('');
  const [hideindex, sethideindex] = useState(-1);
  console.log('++++', userData);
  console.log(':::question:::', questionlist);
  console.log(':::respose:::', responselist);
  const list = ({item}) => (
    <View style={[Styles.spaceview]}>
      <View style={[Styles.view, {backgroundColor: item.color.bac}]}>
        <Text style={[Styles.txt12, {color: item.color.col}]}>{item.name}</Text>
      </View>
    </View>
  );
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      detailPersonal();
    });
    return unsubscribe;
  }, [navigation]);
  let cui = 0;
  const getcurrenttime = (tim, item) => {
    setcurrentply(tim);
    console.log('---', tim);
    let it = parseInt(item.description) / 1000;
    let u = (parseInt(tim) / it) * 95;
    console.log('--', parseInt(u));
    cui = tim;
    setcu(parseInt(u));
    if (tim >= it - 1) {
      setplaypasuse(true);
    }
  };
  const editprofileimage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setimageparh(image.path);
      UpdateExperties(image.path);
    });
  };

  const UpdateExperties = path => {
    const data = new FormData();
    // console.log('=======HHHHHHHH===÷===', electeditmetopic);

    let y = {
      image: {
        uri: path,
        type: 'image/jpeg',
        name: 'image' + new Date() + '.jpg',
      },
    };
    console.log('--ddd-', data);
    EditProfile({Auth: userData.userdata.api_token, data: y})
      .then(res => {
        console.log('Response of Edit', res);
        if (res.status == 'success') {
          console.log('Edit');
        }
      })
      .catch(error => {
        console.log('Error MEssage of Signup', error.response.data);
      });
  };
  const detailPersonal = () => {
    setloding(true);
    detailUSer({Auth: userData.userdata.api_token})
      .then(res => {
        console.log('Response of PRofile', res);
        if (res.status == 'success') {
          console.log('--question---', res.userdata.questions);
          console.log('--response---', res.userdata.your_response);
          setQuestionlist(res.userdata.questions);

          setpro(res.userdata);
          // setinterest(res.userdata.topics);
          // setExperties(res.userdata.expertes);
          let arr = [];
          res.userdata.expertes.forEach(element => {
            arr.push({
              id: arr.length + 1,
              name: element,
              color: color[Math.floor(Math.random() * (0 - 1 + 1)) + 1],
            });
          });
          let arr1 = [];
          res.userdata.topics.forEach(element => {
            arr1.push({
              id: arr1.length + 1,
              name: element,
              color: color[Math.floor(Math.random() * (0 - 3 + 1)) + 3],
            });
          });
          setinterest(arr);
          setExperties(arr1);
          setResponselist(res.userdata.your_response);
          setloding(false);
        } else {
          setloding(false);
          console.log('Some thing wamt wrong');
        }
      })
      .catch(err => {
        setloding(false);
        console.log('Error Message of PRofile-------', err);
      });
  };

  const whoosh1 = useRef(null);
  const [playing, setPlaying] = useState(false);

  const [duration1, setDuration1] = useState(0);

  useEffect(() => {
    return () => {
      if (whoosh1.current) {
        whoosh1.current.stop();
      }
    };
  }, []);

  const hideDeleteQuestionResponse = typ => {
    setopenmodal(false);

    const data = new FormData();
    data.append('type', typqr);
    data.append('id', delid);
    data.append('operation', typ);
    console.log('--ddd-', data);
    hide_Del({Auth: userData.userdata.api_token, data: data})
      .then(res => {
        console.log('Response of DeleHIde', res);
        if (res.status == 'success') {
          console.log('Edit');
          detailPersonal();
        }
      })
      .catch(error => {
        console.log('Error MEssage of Signup', error.response.data);
      });
  };
  const start = async link => {
    // await AddTrackplayer();
    if (playpasuse.id != '') {
      console.log('111111');
      // whoosh1.current.pause();

      SoundPlayer1(link);

      // await TrackPlayer.play();
    } else {
      setplaypasuse({id: ''});
      console.log('1111111333333');
      whoosh1.current.pause();
      // await TrackPlayer.stop();
    }
  };

  const SoundPlayer1 = link => {
    whoosh1.current = new Sound(link, null, error => {
      if (error) {
        return;
      }
      setDuration1(whoosh1.current.getDuration());
      setPlaying(true);

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

  const ListQuestionResponse = ({item}) => (
    <View style={[Stylesresponse.coverrstylspace]}>
      <TouchableOpacity
        onPress={() => {
          setplaypasuse(true),
            navigation.navigate('QuestionAnswers', {
              qu: item.question_id,
              res: item,
            });
        }}>
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
          style={[
            Stylesresponse.coverrstyl,
            {
              borderWidth: 1,
              borderColor: Colors.maincolor,
              backgroundColor: Colors.white,
            },
          ]}
        />
        <View style={Stylesresponse.touchrec2}>
          <Image
            source={require('../../Assests/ply.png')}
            resizeMode="contain"
            style={Stylesresponse.imaginner2}
          />
        </View>
      </TouchableOpacity>
    </View>
  );

  const ListQuestion = ({item, index}) => (
    <>
      <View View style={Styles.spaceimgview}>
        <View style={Styles.videarroe}>
          <View style={Styles.videarroeinnewe}>
            {item.question ? (
              <Text style={Styles.textviwww}>
                {item.question?.duration_information != null
                  ? item.question?.duration_information
                  : 'No Title'}
              </Text>
            ) : (
              <Text style={Styles.textviwww}>
                {item?.duration_information != null
                  ? item?.duration_information
                  : 'No Title'}
              </Text>
            )}
            <Text style={Styles.textvi1}>
              {item.question ? "You've Responded" : "You've Asked Question"}
            </Text>
          </View>
          {/* <Text style={Styles.textvi}>{item?.question?.duration_information}</Text> */}
          {/* <TouchableOpacity onPress={() => console.log(":::::[[[", item)}>
            <Text>dd</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => {
              sethideindex(index),
                setopenmodal(true),
                setdelid(item.id),
                settypqr(headloding ? 'question' : 'response');
            }}>
            <Image
              resizeMode="contain"
              style={Styles.threestyl}
              source={require('../../Assests/dot.png')}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Response', {quesid: item})}
          style={Styles.imgview}>
          {item.id != playpasuse.id ? (
            <Image
              resizeMode={'cover'}
              style={Styles.videthumb}
              source={
                item.file_type == 'mp3'
                  ? require('../../Assests/man.png')
                  : {uri: item.thumbnail}
              }
            />
          ) : item.file_type == 'mp4' ? (
            <Video
              ref={videoPlayer}
              resizeMode="cover"
              source={{uri: item.file}}
              style={[Styles.videthumb, {backgroundColor: Colors.black}]}
              paused={playpasuse.id == item.id ? false : true}
              onComplete={() => setplaypasuse({id: ''})}
              onProgress={data => getcurrenttime(data.currentTime, item)}
              // currentPlaybackTime={tim => getcurrenttime(tim)}
            />
          ) : (
            <Image
              resizeMode={item.file_type == 'mp3' ? 'contain' : 'cover'}
              style={Styles.videthumb}
              source={
                item.file_type == 'mp3'
                  ? require('../../Assests/man.png')
                  : {uri: item.thumbnail}
              }
            />
          )}
          <View
            // onPress={() => {
            //   if (playpasuse.id == item.id) {
            //     setplaypasuse({id: ''});
            //   } else {
            //     if (item.file_type == 'mp3') {
            //       start(item.file);
            //       setplaypasuse({id: item.id});
            //     } else {
            //       setplaypasuse({id: item.id});
            //     }
            //   }
            // }}
            style={Styles.videimgth}>
            <Image
              resizeMode="cover"
              style={Styles.imgth}
              source={
                item.id == playpasuse.id
                  ? require('../../Assests/pas.png')
                  : require('../../Assests/ply.png')
              }
            />
          </View>
        </TouchableOpacity>
        {/* {headloding ?
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={item.response}
            renderItem={ListQuestionResponse}
          /> : null} */}
      </View>
      {/* <View style={{width: '100%', height: '10%'}}> */}
    </>
  );

  return (
    <ImageBackground
      source={require('../../Assests/bg1.png')}
      resizeMode="stretch"
      style={Styles.image}>
      <Header
        right="true"
        left="true"
        navigation={navigation}
        title="Profile"
      />
      {!loding ? (
        <ScrollView style={{flex: 1}}>
          <View style={Styles.innercontainer}>
            <TouchableOpacity
              onPress={() => editprofileimage()}
              style={Styles.viwprimg}>
              <Image
                resizeMode="contain"
                style={Styles.primg}
                source={
                  imageparh
                    ? {uri: imageparh}
                    : pro.image
                    ? {uri: pro.image}
                    : require('../../Assests/pro.png')
                }
              />
              <View style={Styles.primgtrans}>
                {/* <Image
                  resizeMode="contain"
                  style={Styles.primgicon}
                  source={require('../../Assests/campng.png')}
                /> */}
                <Text
                  style={[Styles.namtxt, {color: Colors.white, fontSize: 12}]}>
                  press to edit
                </Text>
              </View>
            </TouchableOpacity>
            <Text style={Styles.namtxt}>{pro.name}</Text>
            <View style={Styles.ratview}>
              <Image
                resizeMode="cover"
                style={Styles.rat}
                source={require('../../Assests/st.png')}
              />
              <Text style={Styles.rttxt}>4.9(2k)</Text>
            </View>
            {/* {experties.length > 0 || interest.length > 0 ? ( */}
            <View style={Styles.mainexpertiestopic}>
              <View style={Styles.maininner}>
                <View style={Styles.headerview}>
                  <Text style={Styles.txtexprt}>EXPERTISE</Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('EditInterest', {interest})
                    }>
                    <Text style={Styles.edittxt}>EDIT</Text>
                  </TouchableOpacity>
                </View>
                {interest.length > 0 ? (
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={interest}
                    renderItem={list}
                  />
                ) : null}
              </View>

              <View style={Styles.maininner1}>
                <View style={Styles.headerview}>
                  <Text style={Styles.txtexprt}>INTEREST</Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('SelectTopicsEdit', {experties})
                    }>
                    <Text style={Styles.edittxt}>EDIT</Text>
                  </TouchableOpacity>
                </View>
                {experties.length > 0 ? (
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={experties}
                    renderItem={list}
                  />
                ) : null}
              </View>
            </View>
            {/* ) : null} */}
            <View style={Styles.hedview}>
              <TouchableOpacity
                onPress={() => setheadloding(true)}
                style={[
                  Styles.touchhead,
                  {backgroundColor: headloding ? Colors.maincolor : null},
                ]}>
                <Text>My Questions</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setheadloding(false)}
                style={[
                  Styles.touchhead,
                  {backgroundColor: !headloding ? Colors.maincolor : null},
                ]}>
                <Text>My Responses</Text>
              </TouchableOpacity>
            </View>
            {headloding ? (
              questionlist.length > 0 ? (
                <View style={Styles.videview}>
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    // horizontal
                    data={questionlist}
                    renderItem={ListQuestion}
                  />
                </View>
              ) : (
                <Text
                  style={[
                    Styles.textvi1,
                    {marginTop: 10, alignSelf: 'center'},
                  ]}>
                  No Question Post..
                </Text>
              )
            ) : null}
            {!headloding ? (
              responselist.length > 0 ? (
                <View style={Styles.videview}>
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    // horizontal
                    data={responselist}
                    renderItem={ListQuestion}
                  />
                </View>
              ) : (
                <Text
                  style={[
                    Styles.textvi1,
                    {marginTop: 10, alignSelf: 'center'},
                  ]}>
                  No Response Post..
                </Text>
              )
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
      <Modal animationType="fade" transparent={true} visible={openmodal}>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.transperent,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={Styles.stmodal}>
            <TouchableOpacity
              onPress={() => hideDeleteQuestionResponse('hide')}
              style={Styles.lableview}>
              <Text style={Styles.textvie}>
                {hideindex != -1
                  ? typqr == 'question'
                    ? questionlist[hideindex]?.status == 'active'
                      ? 'Hide'
                      : 'Show'
                    : responselist[hideindex]?.status == 'active'
                    ? 'Hide'
                    : 'Show'
                  : 'Hide'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setopenmodal(false),
                  Alert.alert('Delete', 'Are You Sure You Want to Delete', [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'OK',

                      onPress: () => {
                        hideDeleteQuestionResponse('delete');
                      },
                    },
                  ]);
              }}
              style={Styles.lableview}>
              <Text style={Styles.textvie}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setopenmodal(false)}
              style={Styles.lableview}>
              <Text style={Styles.textvie}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default Profile;
