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
  textrs: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.black,
  },
  textrs1: {
    fontSize: 14,
    marginTop: wp(1),
    fontWeight: '400',
    color: Colors.black,
  },
  touchpurch: {
    width: wp(50),
    borderWidth: 1,
    height: wp(12),
    marginTop: wp(5),
    borderRadius: wp(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.maincolor,
  },
  textrs2: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.maincolor,
  },
  firstcard: {
    width: wp(90),
    height: wp(40),
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(2),
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowRadius: 1,
    shadowOpacity: 0.5,
  },
  cointextview: {
    width: wp(90),
    height: wp(6),
    marginTop: wp(3),
    backgroundColor: Colors.transperentheader,
    justifyContent: 'center',
    paddingHorizontal: wp(2),
  },
  texiner: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: '600',
    marginLeft: wp(2),
  },
  textview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  texiner1: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: '400',
  },
  texiner2: {
    fontSize: 12,
    color: Colors.black,
    fontWeight: '400',
  },
  coverrstyl: {
    width: wp(7),
    height: wp(7),
  },
  viewwithspace: {
    width: wp(86),
    height: wp(14),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.transperentheader,
  },
  viewwith: {
    width: wp(86),
    height: wp(12),
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(1),
  },
  texthead: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.black,
  },
  firstcard1: {
    width: wp(90),
    paddingHorizontal: wp(2),
    paddingVertical: wp(2),
    marginTop: wp(3),
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(2),
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowRadius: 1,
    shadowOpacity: 0.5,
  },
  innercontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: wp(10),
    paddingBottom: wp(20),
  },
  mainmodal: {
    flex: 1,
    backgroundColor: Colors.transperent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    width: wp(70),
    paddingHorizontal: wp(1),
    paddingVertical: wp(6),
    borderRadius: wp(2),
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spccoinview: {
    width: wp(70),
    height: wp(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinview: {
    width: wp(68),
    height: wp(9),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    borderBottomWidth: 1,
  },
  touchcan: {
    width: wp(25),
    height: wp(10),
    borderRadius: wp(7),
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchcan1: {
    width: wp(25),
    height: wp(10),
    borderRadius: wp(7),
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtcan: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.black,
  },
  txtcan1: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.white,
  },
  mainview: {
    flexDirection: 'row',
    width: wp(55),
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    marginTop: wp(5),
  },
  txtcoin: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.black,
  },
});
