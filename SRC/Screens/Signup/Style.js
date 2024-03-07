import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Colors from '../../Colors';
import {StyleSheet} from 'react-native';

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
    paddingVertical: wp(10),
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
    height: wp(15),
    alignSelf: 'center',
    paddingHorizontal: wp(1),
    paddingVertical: wp(1),
  },
  touchtag: {
    width: wp(90),
    backgroundColor: Colors.white,
    elevation: 2,
    height: wp(8),
    justifyContent: 'center',
    paddingHorizontal: wp(2),
  },
  textouch: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: '600',
  },
  flatlisviewlist: {
    width: wp(90),
    alignItems: 'center',
    justifyContent: 'center',

    alignSelf: 'center',
    paddingHorizontal: wp(1),
    paddingVertical: wp(2),
  },
  haview: {
    backgroundColor: Colors.red,
    height: wp(8),
    // width: wp(20),
    borderRadius: wp(10),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(1),
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
    height: wp(10),
    paddingHorizontal: wp(1),
    alignItems: 'center',
    justifyContent: 'center',
    // width: wp(90),
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
