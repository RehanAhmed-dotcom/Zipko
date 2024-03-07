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
    paddingVertical: wp(10),
  },
  mainreciverview: {
    height: wp(60),
    width: wp(93),
    flexDirection: 'row',

    justifyContent: 'space-between',
    backgroundColor: Colors.transperentheader,
  },
  reciverview: {
    width: wp(35),
    height: wp(50),
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowRadius: 1,
    shadowOpacity: 0.5,
    borderRadius: wp(2),
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  uuu: {
    width: wp(35),
    height: wp(50),
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowRadius: 1,
    shadowOpacity: 0.5,
    borderRadius: wp(2),
  },
  arroeback: {
    width: wp(10),
    height: wp(10),
  },
  press: {
    width: wp(12),
    height: wp(12),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 6,
    backgroundColor: Colors.transperentheader,
  },
  menuview: {
    backgroundColor: Colors.transperentheader,
    width: wp(90),
    height: wp(27),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
  },
  iconimag: {
    width: wp(5),
    height: wp(5),
    tintColor: Colors.white,
  },
  icmenuview: {
    width: wp(12),
    height: wp(12),
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowRadius: 1,
    shadowOpacity: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
    borderRadius: wp(10),
  },
  menuview1: {
    backgroundColor: Colors.transperentheader,
    width: wp(90),
    height: hp(48),
  },
  refimg: {
    width: wp(7),
    height: wp(7),
  },
  text11: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
    alignSelf: 'center',
    position: 'absolute',
    left: wp(28),
    top: wp(17),
  },
  reptxt: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
    alignSelf: 'center',
    top: wp(35),
  },
  refreshview: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(14),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blue,
    position: 'absolute',
    top: wp(44),
    left: wp(12),
  },
  hidenview: {
    width: wp(100),
    height: hp(90),

    backgroundColor: Colors.transperentheader,
    paddingHorizontal: wp(4),
    position: 'absolute',
    zIndex: -100,
    paddingVertical: wp(4),
  },
  imaginner1: {
    width: wp(100),
    height: hp(70),
    position: 'absolute',
  },
});
