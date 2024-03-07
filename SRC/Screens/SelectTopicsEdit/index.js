import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { EditProfileex, registerUser } from '../../Api';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../../Colors';
import Header from '../../Components/Header';
import Input from '../../Components/Input';
import Loder from '../../Components/Loder';
import RButton from '../../Components/RButton';
import SplashScreen from 'react-native-splash-screen';
import Styles from './Style';
import { getTopics } from '../../Api';
import { userAuthorize } from '../../redux/actions';

const SelectTopicsEdit = ({ navigation, route }) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const dispatch = useDispatch();
  const [expertise, setexpertise] = useState('');
  const [electeditmetopic, setelecteditmetopic] = useState([]);
  const [interses, setinterses] = useState([]);
  const [interses1, setinterses1] = useState([]);
  const { userData, isLoggedIn } = useSelector(({ USER }) => USER);
  console.log('----', route.params.experties);
  console.log('pp--', electeditmetopic);
  const [err, seterr] = useState(false);
  const [topicdatabase, settopicdatabase] = useState([]);
  const [loding, setloding] = useState(true);
  const [loding1, setloding1] = useState(false);
  useEffect(() => {
    getAllExperties();
  }, [navigation]);
  let arr = [];
  const editscreen = dst => {
    console.log('-------hhhhhh', route?.params?.experties, '000-------', dst);
    if (isLoggedIn && route?.params?.experties) {
      route.params.experties.forEach(element => {
        let y = dst.findIndex(iof => iof.title == element.name);
        if (y != -1) {
          arr.push(dst[y]);
        }
      });
      setelecteditmetopic(arr);
    }
  };
  const getAllExperties = () => {
    getTopics()
      .then(res => {
        if (res.status == 'success') {
          setinterses(res.data);
          setinterses1(res.data);

          setloding(false);
          if (isLoggedIn) {
            editscreen(res.data);
          }
          console.log('Resonse of Topics', res);
        } else {
          setloding(false);
          alert('Some thing Went wrong');
        }
      })
      .catch(err => {
        setloding(false);
        console.log('Error Of Topics', err);
      });
  };
  if (!err) {
    setTimeout(() => {
      seterr(false);
    }, 3000);
  }

  const UpdateExperties = () => {
    setloding1(true);
    const data = new FormData();
    console.log('=======HHHHHHHH======', electeditmetopic);
    if (electeditmetopic.length > 0) {
      electeditmetopic.forEach(element => {
        data.append('topic[]', element.id);
      });
    }
    console.log('--ddd-', data);
    EditProfileex({ Auth: userData.userdata.api_token, data: data })
      .then(res => {
        setloding1(false);
        console.log('Response of Edit', res);
        if (res.status == 'success') {
          console.log('Edit');

          navigation.goBack();
        }
      })
      .catch(error => {
        setloding1(false);
        console.log('Error MEssage of Signup', error.response.data);
        if (error?.response?.data?.status == 'error') {
          if (error?.response?.data?.message?.email) {
            alert(`${error?.response?.data?.message?.email}`);
          } else if (error?.response?.data?.message?.username) {
            alert(`${error?.response?.data?.message?.username}`);
          }
        } else {
          alert('Some thing wrong');
        }
      });
  };

  const register_Skip = () => {
    setloding1(true);
    const data = new FormData();
    data.append('name', route.params.info.name);
    data.append('username', route.params.info.username);
    data.append('password', route.params.info.password);
    data.append('password_confirmation', route.params.info.confirm);
    data.append('email', route.params.info.email);
    route.params.info.expertise.forEach(element => {
      data.append('expertise[]', element);
    });
    // if (electeditmetopic.length > 0) {
    //   electeditmetopic.forEach(element => {
    //     data.append('topic[]', element.id);
    //   });
    // }
    console.log('---', data);
    registerUser({
      data: data,
    })
      .then(res => {
        setloding1(false);
        console.log('Response of Signup', res);
        if (res.status == 'success') {
          console.log('Signup');
          userAuthorize(res)(dispatch);
          navigation.navigate('BottomTab');
        }
      })
      .catch(error => {
        setloding1(false);
        console.log('Error MEssage of Signup', error.response.data);
        if (error?.response?.data?.status == 'error') {
          if (error?.response?.data?.message?.email) {
            alert(`${error?.response?.data?.message?.email}`);
          } else if (error?.response?.data?.message?.username) {
            alert(`${error?.response?.data?.message?.username}`);
          }
        } else {
          alert('Some thing wrong');
        }
      });
  };

  const register = () => {
    setloding1(true);
    const data = new FormData();
    data.append('name', route.params.info.name);
    data.append('username', route.params.info.username);
    data.append('password', route.params.info.password);
    data.append('password_confirmation', route.params.info.confirm);
    data.append('email', route.params.info.email);
    route.params.info.expertise.forEach(element => {
      data.append('expertise[]', element);
    });
    if (electeditmetopic.length > 0) {
      electeditmetopic.forEach(element => {
        data.append('topic[]', element.id);
      });
    }
    console.log('---', data);
    registerUser({
      data: data,
    })
      .then(res => {
        setloding1(false);
        console.log('Response of Signup', res);
        if (res.status == 'success') {
          console.log('Signup');
          userAuthorize(res)(dispatch);
          navigation.navigate('BottomTab');
        }
      })
      .catch(error => {
        setloding1(false);
        console.log('Error MEssage of Signup', error.response.data);
        if (error?.response?.data?.status == 'error') {
          if (error?.response?.data?.message?.email) {
            alert(`${error?.response?.data?.message?.email}`);
          } else if (error?.response?.data?.message?.username) {
            alert(`${error?.response?.data?.message?.username}`);
          }
        } else {
          alert('Some thing wrong');
        }
      });
  };

  const __selectTopics = item => {
    console.log('====', electeditmetopic, item);
    if (electeditmetopic.length > 0) {
      let arr = [];

      let y = electeditmetopic.findIndex(ite => ite.id == item.id);
      console.log('pp', y);
      if (y !== -1) {
        arr = [...electeditmetopic];
        arr.splice(y, 1);
        setelecteditmetopic(arr);
      } else {
        // if (electeditmetopic.length == 3) {
        //   seterr(true);
        //   // alert('Select only 3 topics');
        // } else {
        setelecteditmetopic([...electeditmetopic, item]);
        // }
      }
    } else {
      console.log('---');
      setelecteditmetopic([...electeditmetopic, item]);
    }
  };

  const searchTopic = txt => {
    let y = interses.filter(sub =>
      String(sub.title.toLowerCase()).startsWith(txt.toLowerCase()),
    );
    if (y.length > 0) {
      setexpertise('');
      setinterses(y);
    } else {
      setexpertise('');
      setinterses(interses1);
    }
  };
  const checktopicedit = item => {
    // let arr = [electeditmetopic];
    // arr = selecteditme;
    console.log('-gggggg----', electeditmetopic, item);
    if (electeditmetopic.length > 0) {
      let y = electeditmetopic.findIndex(ite => ite.title == item.title);
      if (y !== -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  const checktopic = item => {
    // let arr = [electeditmetopic];
    // arr = selecteditme;
    console.log('-gggggg----', electeditmetopic, item);
    if (electeditmetopic.length > 0) {
      let y = electeditmetopic.findIndex(ite => ite.id == item.id);
      if (y !== -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  const topics = ({ item }) => (
    <View style={Styles.haviewspace}>
      <TouchableOpacity
        onPress={() => __selectTopics(item)}
        style={Styles.haview}>
        <Image
          source={{ uri: item.image }}
          resizeMode="contain"
          style={Styles.imagsocial}
        />
        <Text style={Styles.textimg}>{item.title}</Text>
      </TouchableOpacity>
      {checktopic(item) == true ? (
        <View style={Styles.checkview}>
          <View style={Styles.checkview1}></View>
        </View>
      ) : null}
    </View>
  );
  return (
    <ImageBackground
      source={require('../../Assests/bac1.png')}
      resizeMode="cover"
      style={Styles.image}>
      <Header
        navigation={navigation}
        left="true"
        title={isLoggedIn ? 'Edit Topics' : 'Select Topics'}
      />
      <Loder lodertyp={loding1} />
      {interses.length > 0 ? (
        <ScrollView style={{ flex: 1 }}>
          <View style={Styles.innercontainer}>
            <View style={Styles.vietext}>
              <Text
                numberOfLines={2}
                style={[
                  Styles.text3,
                  {
                    fontWeight: err ? 'bold' : '400',
                    color: err ? Colors.red : Colors.black,
                  },
                ]}>
                Select any
                <Text
                  style={{
                    fontWeight: err ? 'bold' : '400',
                    color: err ? Colors.red : Colors.maincolor,
                  }}>
                  {' '}
                  3 topics
                </Text>{' '}
                of your interests
              </Text>
            </View>
            <Input
              rcolor={Colors.white}
              limag={require('../../Assests/search.png')}
              val={expertise}
              plas="Search Topics"
              onchang={txt => {
                searchTopic(txt), setexpertise(txt);
              }}
            />
            <View style={Styles.flatlisview}>
              <FlatList
                numColumns={3}
                key={3}
                data={interses}
                renderItem={topics}
              />
            </View>
            {!isLoggedIn ? (
              <>
                <RButton
                  onpress={() => register_Skip()}
                  title="SKIP FOR NOW"
                  color={Colors.blue}
                />
                <RButton
                  onpress={() => register()}
                  title="CONTINUE"
                  color={Colors.black}
                />
              </>
            ) : (
              <RButton
                onpress={() => UpdateExperties()}
                title="Update"
                color={Colors.black}
              />
            )}
          </View>
        </ScrollView>
      ) : loding ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={Colors.maincolor} />
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>No Record Yet Found...</Text>
        </View>
      )}
    </ImageBackground>
  );
};

export default SelectTopicsEdit;
