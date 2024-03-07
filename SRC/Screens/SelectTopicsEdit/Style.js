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
    paddingVertical: wp(5),
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
  checkview: {
    width: wp(5),
    height: wp(5),
    borderRadius: wp(5),
    top: wp(2),
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowRadius: 1,
    shadowOpacity: 0.5,
    left: wp(22),
    position: 'absolute',
    backgroundColor: Colors.backgr,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkview1: {
    width: wp(4),
    height: wp(4),
    borderRadius: wp(4),

    backgroundColor: Colors.maincolor,
  },
  imagsocial: {
    width: wp(15),
    height: wp(15),
  },
  textimg: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: '600',
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
  hedinfoview: {
    backgroundColor: Colors.transperentheader,
    width: wp(90),
    alignSelf: 'center',
    height: wp(7),
    justifyContent: 'center',
  },
  textforgot: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
  texthed: {
    fontSize: 12,
    color: Colors.black,
    fontWeight: '500',
  },
  flatlisview: {
    width: wp(90),

    alignSelf: 'center',
    paddingHorizontal: wp(1),
    paddingVertical: wp(1),
  },

  txt33: {
    fontSize: 14,
    fontWeight: '400',
  },
  crossimg: {
    width: wp(3),
    height: wp(3),
  },
  crosstouch: {
    backgroundColor: Colors.transperentheader,
    width: wp(7),
    height: wp(7),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(7),
  },
  haviewspace: {
    backgroundColor: Colors.transperentheader,
    height: wp(40),
    width: wp(29),
    paddingHorizontal: wp(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text3: {
    fontSize: 18,
    color: Colors.black,
    fontWeight: '400',
    width: wp(50),
    textAlign: 'center',
  },
  vietext: {
    backgroundColor: Colors.transperentheader,
    width: wp(90),
    height: wp(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  haview: {
    backgroundColor: Colors.backgr,
    height: wp(38),
    width: wp(27),
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowRadius: 1,
    shadowOpacity: 0.5,
    borderRadius: wp(2),
    alignItems: 'center',
    paddingVertical: wp(7),
    justifyContent: 'space-between',
    paddingHorizontal: wp(1),
  },
  texthedioo: {
    fontSize: 12,
    color: Colors.black,
    fontWeight: '500',
    alignSelf: 'center',
  },
  imaginner: {
    width: '55%',
    height: '55%',
    marginTop: wp(8),
  },
});
