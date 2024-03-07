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
    paddingBottom: wp(20),
  },
  viewref: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(10),
    // position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blue,
    alignSelf: 'flex-end',
    // top: wp(4),
    // right: wp(4),
  },
  ref: {
    width: wp(6),
    height: wp(6),
  },
  timerview: {
    width: wp(90),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    marginTop: wp(2),
  },
  Videoview: {
    backgroundColor: Colors.white,
    width: wp(90),
    // height: wp(75),
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: wp(3),
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
  reddot: {
    width: wp(3),
    height: wp(3),
    borderRadius: wp(5),
    backgroundColor: Colors.red,
    elevation: 2,
    shadowColor: Colors.red,
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowRadius: 1,
    shadowOpacity: 0.5,
  },
  texrec: {
    marginLeft: wp(2),
    fontSize: 14,
    fontWeight: '600',
    color: Colors.white,
  },
  imaginner: {
    width: wp(3),
    height: wp(3),
  },
  donttextor: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.black,
  },
  linview: {
    width: wp(40),
    backgroundColor: Colors.gray,
    height: 1,
  },
  uplodvideo: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 1,
    borderColor: Colors.blue,
    width: wp(87),
    height: wp(27),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgup: {
    width: wp(10),
    height: wp(10),
  },
  textup: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: '600',
    marginTop: wp(2),
  },
  orview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(90),
    marginTop: wp(5),
    alignSelf: 'center',
  },
  recodmenuview: {
    height: wp(46),
    width: wp(88),
    marginTop: wp(2),

    marginBottom: wp(4),
  },
  recodmenuview1: {
    flex: 1,
  },
  recoptin: {
    flexDirection: 'row',
    width: wp(90),
    height: wp(12),
    // backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
  },
  imaginner1: {
    width: wp(5),
    height: wp(5),
    tintColor: Colors.white,
  },
  touchrec1: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(10),
    backgroundColor: Colors.maincolor,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.maincolor,
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowRadius: 1,
    shadowOpacity: 0.5,
  },
  touchrec: {
    width: wp(32),
    height: wp(10),
    borderRadius: wp(10),
    backgroundColor: Colors.black,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowRadius: 1,
    shadowOpacity: 0.5,
  },
  Videoview1: {
    backgroundColor: Colors.white,
    width: wp(90),
    alignItems: 'center',
    justifyContent: 'center',
    height: wp(30),
    marginTop: wp(4),
    alignSelf: 'center',
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
});
