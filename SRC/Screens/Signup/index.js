import { Emailverified_signup, checkUserName, getExperties, getandCreateExperties, registerUser } from '../../Api';
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
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../../Colors';
import Header from '../../Components/Header';
import Input from '../../Components/Input';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import Loder from '../../Components/Loder';
import RButton from '../../Components/RButton';
import Styles from './Style';
import { userAuthorize } from '../../redux/actions';

const Signup = ({ navigation }) => {


  const dispatch = useDispatch();
  // const [phone, setphone] = useState('');
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  const [fullname, setfullname] = useState('');
  const [usernme, setusernme] = useState('');
  const [conpass, setconpass] = useState('');
  const [idstag, setidstag] = useState([]);
  const [expertise, setexpertise] = useState('');
  const [tagarray, settagarray] = useState([]);
  const [tagdatabase, settagdatabase] = useState([]);
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
          console.log('Resonse of Experties', res);
        } else {
          alert('Some thing Went wrong');
        }
      })
      .catch(err => {
        console.log('Error Of Experties', err);
      });
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
  const [nameErr, setnameErr] = useState('')
  const checkFullName = () => {
    setnameErr('');
    const dat = new FormData();
    dat.append('username', usernme);
    checkUserName({ data: dat })
      .then(res => {
        if (res.status == 'success') {
          console.log(';>>', res)
          setnameErr('ok')
        }
      }).catch(error => {
        console.log(":::", error.response)
        setnameErr('no')

      });
  }

  const emailVarificatione = () => {
    setloding(true);

    const dat = new FormData();
    dat.append('email', email);

    Emailverified_signup({ data: dat })
      .then(res => {
        console.log('Response of Email Varification', res);
        if (res.status == 'success') {
          setloding(false);
          navigation.navigate('SignupVarification', {
            info: {
              name: fullname,
              expertise: idstag,
              username: usernme,
              password: pass,
              confirm: conpass,
              email: email,

            },
          });
        } else {
          alert('Some thing want wrong');
          setloding(false);
        }
      })
      .catch(error => {
        setloding(false);
        console.log('Error MEssage of Login', error.response.data);
        if (error?.response?.data?.status == 'error') {
          alert(`${error?.response?.data?.message}`);
        }
      });

  };

  const register = () => {
    setloding(true);
    if (validate()) {
      emailVarificatione()

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
      <Header navigation={navigation} left="true" title="Register" />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView style={{ flex: 1 }}>
          <View style={Styles.innercontainer}>
            <View style={Styles.hedinfoview}>
              <Text style={Styles.texthed}>PERSONAL DETAIL</Text>
            </View>
            <Input
              limag={require('../../Assests/person.png')}
              // rimg={require('../../Assests/innerwelcom.png')}
              val={fullname}
              plas="Full Name"
              onchang={txt => setfullname(txt)}
            />
            <Input
              limag={require('../../Assests/person.png')}
              // rimg={require('../../Assests/innerwelcom.png')}
              val={usernme}
              plas="User Name"
              onchang={txt => setusernme(txt)}
              end={() => checkFullName()}
            />
            {nameErr == 'no' ? <Text style={{ fontSize: 10, color: 'red' }}>Username already exists.</Text> : null}
            <Input
              limag={require('../../Assests/msg.png')}
              // rimg={require('../../Assests/innerwelcom.png')}
              val={email}
              plas="Email Address"
              onchang={txt => setemail(txt)}
            />
            {/* <View style={Styles.hedinfoview}>
              <Text style={Styles.texthedioo}>OR</Text>
            </View> */}
            {/* <Input
              limag={require('../../Assests/cell.png')}
              val={phone}
              plas="Mobile Number (optional)"
              onchang={txt => setphone(txt)}
            /> */}
            <View style={Styles.hedinfoview}>
              <Text style={Styles.texthed}>SETUP PASSWORD</Text>
            </View>
            <Input
              rcolor={Colors.white}
              limag={require('../../Assests/loc.png')}
              rimg={require('../../Assests/eye.png')}
              val={pass}
              entrytyp="Securee"
              plas="Password"
              onchang={txt => setpass(txt)}
            />
            <Input
              rcolor={Colors.white}
              limag={require('../../Assests/loc.png')}
              rimg={require('../../Assests/eye.png')}
              val={conpass}
              entrytyp="Securee"
              plas="Confirm Password"
              onchang={txt => setconpass(txt)}
            />
            <View style={Styles.hedinfoview}>
              <Text style={Styles.texthed}>ADD YOUR EXPERTISE</Text>
            </View>
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
                <FlatList horizontal data={tagarray} renderItem={hashestab} />
              </View>
            ) : null}
            <RButton
              onpress={() => nameErr == 'no' ? alert("Change User Name") : register()}
              title="CONTINUE"
              color={Colors.black}
            />
          </View>

          <Loder lodertyp={loding} />
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground >
  );
};

export default Signup;
