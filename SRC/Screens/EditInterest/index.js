import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { getExperties, getandCreateExperties, registerUser } from '../../Api';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../../Colors';
import { EditProfileex } from '../../Api';
import Header from '../../Components/Header';
import Input from '../../Components/Input';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import Loder from '../../Components/Loder';
import RButton from '../../Components/RButton';
import Styles from './Style';
import { userAuthorize } from '../../redux/actions';

const EditInterest = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [phone, setphone] = useState('');
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  const [fullname, setfullname] = useState('');
  const [usernme, setusernme] = useState('');
  const [conpass, setconpass] = useState('');
  const [idstag, setidstag] = useState([]);
  const [expertise, setexpertise] = useState('');
  const [tagarray, settagarray] = useState([]);
  const [tagdatabase, settagdatabase] = useState([]);
  const { userData, isLoggedIn } = useSelector(({ USER }) => USER);

  const [loding, setloding] = useState(false);
  const [allSemilar, setallSemilar] = useState([]);
  const color = [
    { bac: 'rgba(6, 146, 203, 0.3)', col: '#0691CB' },
    { bac: 'rgba(128, 81, 205 ,0.3)', col: '#8051CD' },
    { bac: 'rgba(76 ,175 ,80 ,0.3)', col: '#4CAF50' },
    { bac: 'rgba(245 ,0 ,0 ,0.3)', col: '#F50000' },
  ];
  useEffect(() => {
    getAllExperties();
  }, [navigation]);
  const getAllExperties = () => {
    getExperties()
      .then(res => {
        if (res.status == 'success') {
          settagdatabase(res.data);
          infoapp(res.data);
          console.log('Resonse of Experties', res);
        } else {
          alert('Some thing Went wrong');
        }
      })
      .catch(err => {
        console.log('Error Of Experties', err);
      });
  };
  let arr = [];
  let arr1 = [];
  const infoapp = data => {
    console.log('----', data, route?.params?.interest);
    if (isLoggedIn && route?.params?.interest) {
      route.params.interest.forEach(element => {
        let y = data.findIndex(itm => itm.title == element.name);
        arr1.push(data[y].id);
        arr.push({
          id: element.id,
          tagtext: element.name,
          color: color[Math.floor(Math.random() * (0 - 3 + 1)) + 3],
        });
      });
      settagarray(arr);
      setidstag(arr1);
    }
  };
  const addnewExperties = () => {
    getandCreateExperties({ nam: expertise })
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
  const validate = () => {
    if (
      fullname == '' ||
      email == '' ||
      usernme == '' ||
      pass == '' ||
      conpass == ''
    ) {
      alert('All Field is Required');
      return false;
    } else if (idstag.length == 0) {
      alert('Experties is Required');
      return false;
    } else {
      return true;
    }
  };
  const UpdateExperties = () => {
    setloding(true);
    const data = new FormData();
    console.log('--jjjjj---', expertise);
    if (idstag.length > 0) {
      idstag.forEach(element => {
        data.append('expertise[]', element);
      });
    }
    console.log('--ddd-', data);
    EditProfileex({ Auth: userData.userdata.api_token, data: data })
      .then(res => {
        setloding(true);
        console.log('Response of Edit', res);
        if (res.status == 'success') {
          console.log('Edit');

          navigation.goBack();
        }
      })
      .catch(error => {
        setloding(true);
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
    setloding(true);
    if (validate()) {
      navigation.navigate('SelectTopics', {
        info: {
          name: fullname,
          expertise: idstag,
          username: usernme,
          password: pass,
          confirm: conpass,
          email: email,
        },
      });
    }
    {
      setloding(false);
    }
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
  const searchExpertiseFilters = txt => {
    let y = tagdatabase.filter(x =>
      x.title.toLowerCase().startsWith(txt.toLowerCase()),
    );
    setallSemilar(y);
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
  const containsWhitespace = str => {
    return /\s/.test(str);
  };
  console.log('tag', tagarray, idstag);

  const addTagtoList = item => {
    if (tagarray.length > 0) {
      let y = tagarray.findIndex(item => item == item.title);
      if (y != -1) {
      } else {
        console.log(item.id);
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
      let y = tagarray.find(item => item == item.title);
      if (y != -1) {
        let ar = [...idstag];
        ar.splice(y, 1);
        setidstag(ar);
        removetag(item.id);
      } else {
      }
    }
  };
  const listtag = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setallSemilar([]), setexpertise(''), addTagtoList(item);
      }}
      style={Styles.touchtag}>
      <Text style={Styles.textouch}>{item.title}</Text>
    </TouchableOpacity>
  );

  const hashestab = ({ item }) => (
    <View style={Styles.haviewspace}>
      <View style={[Styles.haview, { backgroundColor: item.color.bac }]}>
        <Text style={[Styles.txt33, { color: item.color.col }]}>
          #{item.tagtext}
        </Text>
        <TouchableOpacity
          onPress={() => removieidtag(item)}
          style={Styles.crosstouch}>
          <Image
            source={require('../../Assests/cross.png')}
            resizeMode="contain"
            style={[Styles.crossimg, { tintColor: item.color.col }]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <ImageBackground
      source={require('../../Assests/bac1.png')}
      resizeMode="cover"
      style={Styles.image}>
      <Header navigation={navigation} left="true" title="Edit Experties" />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView style={{ flex: 1 }}>
          <View style={Styles.innercontainer}>
            {/* <View style={Styles.hedinfoview}>
              <Text style={Styles.texthed}>ADD YOUR EXPERTISE</Text>
            </View> */}
            <Input
              rcolor={Colors.white}
              limag={require('../../Assests/search.png')}
              val={expertise}
              plas="Search Expertise"
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
              <View style={Styles.flatlisview}>
                <FlatList
                  numColumns={3}
                  key={3}
                  data={tagarray}
                  renderItem={hashestab}
                />
              </View>
            ) : null}
            {!isLoggedIn ? (
              <RButton
                onpress={() => register()}
                title="UPDATE"
                color={Colors.black}
              />
            ) : (
              <RButton
                onpress={() => UpdateExperties()}
                title="UPDATE"
                color={Colors.black}
              />
            )}
          </View>

          <Loder lodertyp={loding} />
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default EditInterest;
