import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Colors from '../../Colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // paddingVertical: wp(24),
  },
  innercontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: wp(30),
  },
  forgotouch: {
    width: wp(40),
    height: wp(7),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.transparent,
    marginTop: wp(4),
  },
  orview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(80),
    marginTop: wp(5),
    alignSelf: 'center',
  },
  mainsocialview: {
    width: wp(50),
    marginTop: wp(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imagsocial: {
    width: wp(9),
    height: wp(9),
  },
  donttext: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.black,
  },
  donttextor: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.black,
  },
  donttextsign: {
    fontSize: 14,
    fontWeight: '400',
    marginLeft: wp(2),
    color: Colors.blue,
  },
  dontview: {
    flexDirection: 'row',
    marginTop: wp(5),
  },
  viewimagsocial: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(10),
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linview: {
    width: wp(36),
    backgroundColor: Colors.black,
    height: 1,
  },
  textforgot: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
  imaginner: {
    width: wp(80),
    height: wp(60),
    marginTop: wp(8),
  },
});
