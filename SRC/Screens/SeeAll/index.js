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
import { Foryou, New, Trending } from '../../Api';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../../Colors';
import Header from '../../Components/Header';
import Input from '../../Components/Input';
import RButton from '../../Components/RButton';
import Styles from './Style';

const SeeAll = ({ navigation, route }) => {
  const [expertise, setexpertise] = useState('');
  const { userData, isLoggedIn } = useSelector(({ USER }) => USER);
  const [arr, setarr] = useState([]);
  const [loding, setloding] = useState(true);
  useEffect(() => {
    seeAllResponse();
    setloding(true);
  }, [navigation]);
  const seeAllResponse = () => {
    let fun =
      route.params.type == 'Trending'
        ? Trending
        : route.params.type == 'Foryou'
          ? Foryou
          : New;
    fun({
      Auth: userData.userdata.api_token,
    })
      .then(res => {
        if (res.status == 'success') {
          setloding(false);
          route.params.type == 'Trending'
            ? setarr(res.trending)
            : route.params.type == 'Foryou'
              ? setarr(res.foryou)
              : setarr(res.latest);

          console.log(`Resonse of ${route.params.type}`, res);
        } else {
          setloding(false);
          alert('Some thing Went wrong');
        }
      })
      .catch(err => {
        setloding(false);
        console.log(`Error Of ${route.params.type}`, err.response.data);
      });
  };
  const alltrending = ({ item }) => (
    <View style={Styles.viewspace}>
      <View style={Styles.viewstrend}>
        <Image
          source={
            item.thumbnail
              ? { uri: item.thumbnail }
              : item.file_type == 'mp3'
                ? require('../../Assests/man.png')
                : require('../../Assests/vi.png')
          }
          resizeMode={item.file_type == 'mp3' ? 'contain' : 'cover'}
          style={[Styles.imaginner, { backgroundColor: Colors.white }]}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Response', { quesid: item })}
        style={[
          Styles.viewstrend,
          {
            position: 'absolute',
            justifyContent: 'space-around',
            alignItems: 'center',
            // backgroundColor: Colors.transperent,
          },
        ]}>
        <View style={[Styles.rowview, { top: 0 }]}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={Styles.videoname}>
            {item.expertes[0]}
          </Text>
        </View>
        <Image
          source={require('../../Assests/ply.png')}
          resizeMode="cover"
          style={Styles.iocnimag}
        />
        <View style={Styles.rowview}>
          <View>
            <Image
              source={require('../../Assests/Heart.png')}
              resizeMode="cover"
              style={[
                Styles.iocnimag,
                { tintColor: item.is_like ? Colors.red : Colors.gray },
              ]}
            />
            <Text style={Styles.cottxt}>
              {item.total_like != '00' ? item.total_like : null}
            </Text>
          </View>
          <View>
            <Image
              source={require('../../Assests/Chat.png')}
              resizeMode="cover"
              style={[
                Styles.iocnimag,
                { tintColor: item.is_comment ? Colors.blue : Colors.gray },
              ]}
            />
            <Text style={Styles.cottxt}>
              {item.total_comment != '00' ? item.total_comment : null}
            </Text>
          </View>
          <View>
            <Image
              source={require('../../Assests/Send.png')}
              resizeMode="cover"
              style={[
                Styles.iocnimag,
                { tintColor: item.is_share ? Colors.blue : Colors.gray },
              ]}
            />
            <Text style={Styles.cottxt}>
              {item.total_share != '00' ? item.total_share : null}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  const [trend1, settrend1] = useState([]);
  const search = txt => {
    if (txt != '') {
      let arrys = [];

      if (trend1.length == 0) {
        settrend1(arr);

        arr.forEach(item => {
          let y = item.expertes.filter(sub =>
            String(sub.toLowerCase()).startsWith(txt.toLowerCase()),
          );
          if (y.length > 0) {
            arrys.push(item);
          }
        });

        setarr(arrys);
      } else {
        trend1.forEach(item => {
          let y = item.expertes.filter(sub =>
            String(sub.toLowerCase()).startsWith(txt.toLowerCase()),
          );
          if (y.length > 0) {
            arr.push(item);
          }
        });

        setarr(arrys);
      }
    } else {
      seeAllResponse();
    }
  };

  return (
    <ImageBackground
      source={require('../../Assests/bac1.png')}
      resizeMode="cover"
      style={Styles.image}>
      <Header left="true" navigation={navigation} title={route.params.type} />
      {/* <ScrollView style={{flex: 1}}> */}
      <View style={Styles.innercontainer}>
        <Input
          rcolor={Colors.white}
          limag={require('../../Assests/search.png')}
          val={expertise}
          plas="Search Topics"
          onchang={txt => {
            search(txt), setexpertise(txt);
          }}
        />
        {arr.length > 0 ? (
          <View style={Styles.flatview}>
            <FlatList
              showsVerticalScrollIndicator={false}
              numColumns={3}
              keys={3}
              data={arr}
              renderItem={alltrending}
            />
          </View>
        ) : loding ? (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color={Colors.maincolor} />
          </View>
        ) : (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>No Record Yet Found...</Text>
          </View>
        )}
      </View>
      {/* </ScrollView> */}
    </ImageBackground>
  );
};

export default SeeAll;
