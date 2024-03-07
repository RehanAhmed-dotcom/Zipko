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
  reportVideoDetail,
  viewFileDetail,
  view_all_comment,
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

const Dynamic = ({navigation, route}) => {
  // console.log('{}{}signup', route.params?.ply)

  const plys = route.params?.ply;
  const dis = route.params?.ddes;
  console.log('+++++', plys);
  console.log('+++++', dis);
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
  const [currentply, setcurrentply] = useState(0);
  const [cu, setcu] = useState(0);

  const getcurrenttime = tim => {
    setcurrentply(tim);
    // console.log('---', tim);
    let it = parseInt(dis) / 1000;
    let u = (parseInt(tim) / it) * 95;
    // console.log('--', parseInt(u));
    cui = tim;
    setcu(parseInt(u));
    if (tim >= it - 1) {
      //   setplaypasuse(true);
    }
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
        resizeMode="cover"
        source={{uri: plys}}
        style={{flex: 1, backgroundColor: Colors.black}}
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
      </View>

      {/* <Loder lodertyp={loderfalse} /> */}
    </View>
  );
};

export default Dynamic;
