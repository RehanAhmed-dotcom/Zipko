import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {
  confirm_payment,
  getCoinsAcrtiveinfo,
  paymentFirst,
  postNewCoins,
  DailyCoins,
  Onoffcheck,
} from '../../Api';
import {useDispatch, useSelector} from 'react-redux';

import Colors from '../../Colors';
import Header from '../../Components/Header';
import Input from '../../Components/Input';
import RButton from '../../Components/RButton';
import Styles from './Style';
import {useStripe} from '@stripe/stripe-react-native';
import {userAuthorize} from '../../redux/actions';
import { Alert } from 'react-native';

const Coins = ({navigation}) => {
  const dispatch = useDispatch();
  const [purchasecoin, setpurchasecoin] = useState(false);
  const [historycoins, sethistorycoins] = useState([]);
  const [activitycoins, setactivitycoins] = useState([]);
  const [paymentmethod, setPaymentmethod] = useState('');
  const [datas, setdatas] = useState();
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [coin, setcoin] = useState(0);
  console.log('________', datas);
  const color = [
    {bac: 'rgba(6, 146, 203, 0.3)', col: '#0691CB'},
    {bac: 'rgba(128, 81, 205 ,0.3)', col: '#8051CD'},
    {bac: 'rgba(76 ,175 ,80 ,0.3)', col: '#4CAF50'},
    {bac: 'rgba(245 ,0 ,0 ,0.3)', col: '#F50000'},
  ];
  const rate = [
    {id: 1, price: 1, coin: 10},
    {id: 2, price: 2, coin: 20},
    {id: 3, price: 3, coin: 30},
    {id: 4, price: 4, coin: 40},
    {id: 5, price: 5, coin: 50},
    {id: 6, price: 6, coin: 60},
  ];
  const {userData, isLogged, In} = useSelector(({USER}) => USER);
  // console.log('---', userData);
  const [loding, setloding] = useState(false);
  const purcaecoin = itm => {
    setpurchasecoin(false);
    const data = new FormData();
    data.append('coin_count', itm.coin);
    paymentFirst({Auth: userData.userdata.api_token, data})
      .then(res => {
        // console.log('Response of coinPost', res);
        if (res.status == 'success') {
          initializePaymentSheet(res);
          getYourIngo();
          // navigation.navigate('SelectTopics');
          // console.log('Enter');
        } else {
          setpurchasecoin(false);
          alert('Somt thing want Wrong');
        }
      })
      .catch(error => {
        setpurchasecoin(false);
        console.log('Error in post Coin', error.response.message);
      });
  };
  // console.log('9090', userData);

  const confirmPayment = itm => {
    const data = new FormData();
    data.append('customer_id', itm.customer);
    data.append('payment_intent_id', itm.payment_intent_id);
    data.append('coin_amount', itm.coin_amount);
    confirm_payment({Auth: userData.userdata.api_token, data})
      .then(res => {
        console.log('Response of confirm_payment', res);
        if (res.status == 'success') {
          // console.log("Enter")
          getYourIngo();
        } else {
          setpurchasecoin(false);
        }
      })
      .catch(error => {
        setpurchasecoin(false);
        console.log('Error in post Coin', error.response.data.message);
      });
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setloding(true);
      getYourIngo();
      oncheckoff();
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(()=>{

  })
  const getYourIngo = async () => {
    await getCoinsAcrtiveinfo({Auth: userData.userdata.api_token})
      .then(res => {
        console.log('Response of Coin Info', res);
        if (res.status == 'success') {
          // console.log("+", userData)
          const newdata = {...userData, coin: res.coin};
          // console.log(">>>", newdata)
          userAuthorize(newdata)(dispatch);
          setloding(false);
          sethistorycoins(res.purchased);
          setactivitycoins(res.activity);
          setcoin(res.coin);
          // navigation.navigate('SelectTopics');
        } else {
          setloding(false);
          alert('Somt thing want Wrong');
        }
      })
      .catch(error => {
        setloding(false);
        console.log('Error in Get Coin info', error.response.data);
      });
  };

  const allactivity = ({item}) => (
    <View style={Styles.viewwithspace}>
      <View style={Styles.viewwith}>
        <View style={Styles.textview}>
          <Image
            source={require('../../Assests/dll.png')}
            resizeMode="cover"
            style={Styles.coverrstyl}
          />

          <Text
            style={[
              Styles.texiner,
              {color: color[Math.floor(Math.random() * (0 - 1 + 1)) + 1].col},
            ]}>
            {item.message.split('-')[0]}
          </Text>
          <Text style={Styles.texiner1}>{item.message.split('-')[1]}</Text>
        </View>
        <Text style={Styles.texiner2}>{item.date}</Text>
      </View>
    </View>
  );
  const allcoins = ({item}) => (
    <View style={Styles.spccoinview}>
      <TouchableOpacity
        onPress={() => purcaecoin(item)}
        style={Styles.coinview}>
        <Text style={Styles.txtcoin}>{item.coin} Coins</Text>
        <Text style={Styles.txtcoin}>{item.price} $</Text>
      </TouchableOpacity>
    </View>
  );

  const initializePaymentSheet = async responce => {
    console.log('dgfcfgvgh', responce);
    const {error} = await initPaymentSheet({
      customerId: responce.customer,
      customerEphemeralKeySecret: responce.ephemeralKey,
      paymentIntentClientSecret: responce.paymentIntent,
      merchantDisplayName: 'zipki',
      allowsDelayedPaymentMethods: true,
      style: 'alwaysLight',
    });
    if (!error) {
      openPaymentSheet(responce);
      // await presentPaymentSheet();
    }
  };

  const openPaymentSheet = async responce => {
    const {error} = await presentPaymentSheet();
    if (error) {
      // setIsError(true);
      console.log(error);
    } else {
      confirmPayment(responce);
    }
  };

  const oncheckoff = async () => {
    await Onoffcheck({Auth: userData.userdata?.api_token})
      .then(res => {
        console.log('Response Of lidve----------', res);
        setdatas(res.coinStatus);
      })
      .catch(err => {
        console.log('Error of Post Question', err.response);
      });
  };
  // console.log("moment",)
  const GiftCoin = ()=>{
DailyCoins({Auth: userData.userdata.api_token,date:moment().format("YYYY-MM-DD")})
.then(res => {
  console.log('Response of daily coin', res);
  if (res.status == 'success') {
  Alert.alert("Purchased",res.message);
  getYourIngo();
  }
})
.catch(error => {
  getYourIngo();
  console.log('Error in post Coin', error.response.message);
});
  }
  return (
    <ImageBackground
      source={require('../../Assests/bg1.png')}
      resizeMode="stretch"
      style={Styles.image}>
      <Header navigation={navigation} title="Coins" />
      {!loding ? (
        <ScrollView style={{flex: 1}}>
          <View style={Styles.innercontainer}>
            <View style={Styles.firstcard}>
              <Text style={Styles.textrs}>{coin}</Text>
              <Text style={Styles.textrs1}>BALANCE</Text>
              <TouchableOpacity
                onPress={() => {
                  datas == 0
                    ? GiftCoin()
                    : setpurchasecoin(true);
                }}
                style={Styles.touchpurch}>
                <Text style={Styles.textrs2}>PURCHASE COINS</Text>
              </TouchableOpacity>
            </View>
            {activitycoins.length > 0 ? (
              <View style={Styles.cointextview}>
                <Text style={Styles.texthead}>COINS ACTIVITY</Text>
              </View>
            ) : null}
            {activitycoins.length > 0 ? (
              <View style={Styles.firstcard1}>
                <FlatList data={activitycoins} renderItem={allactivity} />
              </View>
            ) : null}
            {historycoins.length > 0 ? (
              <View style={Styles.cointextview}>
                <Text style={Styles.texthead}>PURCHASE HISTORY</Text>
              </View>
            ) : null}
            {historycoins.length > 0 ? (
              <View style={Styles.firstcard1}>
                <FlatList data={historycoins} renderItem={allactivity} />
              </View>
            ) : null}
          </View>
          <Modal animationType="fade" transparent={true} visible={purchasecoin}>
            <View style={Styles.mainmodal}>
              <View style={Styles.inner}>
                <FlatList data={rate} renderItem={allcoins} />
                <View style={Styles.mainview}>
                  <View style={Styles.touchcan1}>
                    <Text style={Styles.txtcan1}>Purchase</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setpurchasecoin(false)}
                    style={Styles.touchcan}>
                    <Text style={Styles.txtcan}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
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
    </ImageBackground>
  );
};

export default Coins;
