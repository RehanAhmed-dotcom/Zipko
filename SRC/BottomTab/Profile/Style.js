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
  namtxt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
    marginTop: wp(3),
  },
  headerview: {
    width: wp(89),
    alignSelf: 'center',
    paddingHorizontal: wp(2),
    alignItems: 'center',
    marginBottom: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spaceview: {
    // width: wp(16),
    paddingHorizontal: wp(2),
    height: wp(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  maininner: {
    height: wp(20),
    width: wp(85),
    borderBottomWidth: 1,

    borderBottomColor: Colors.gray,
  },
  maininner1: {
    height: wp(20),
    width: wp(85),
    borderBottomWidth: 0,
    marginTop: wp(4),

    borderBottomColor: Colors.gray,
  },
  view: {
    paddingHorizontal: wp(4),
    borderRadius: wp(10),
    height: wp(7),
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt12: {
    fontSize: 14,
    color: Colors.gray,
    fontWeight: '400',
  },
  edittxt: {
    fontSize: 14,
    color: Colors.gray,
    fontWeight: '600',
  },
  textvi: {
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    color: Colors.black,
    marginTop: wp(2),
  },
  textviwww: {
    fontSize: 14,
    fontWeight: '600',
    alignSelf: 'flex-start',
    color: Colors.black,
    marginTop: wp(2),
  },
  threestyl: {
    width: wp(5),
    height: wp(5)
  },
  videarroe: {
    flexDirection: "row",
    width: '100%',
    alignItems: "center",
    justifyContent: 'space-between',
  },
  stmodal: {
    width: '40%',
    paddingVertical: wp(2),
    height: wp(40),
    backgroundColor: Colors.white,
    borderRadius: wp(3)
  },
  videarroeinnewe: {

    width: '90%',
    alignItems: "center",

  },
  textvie: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.black
  },
  lableview: {
    width: '100%',
    height: '25%',
    justifyContent: "center",
    paddingHorizontal: wp(2),

    borderBottomWidth: 1,
  },
  hedview: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: wp(2),
    width: '90%',
    height: wp(8),
    marginTop: wp(2),
    borderBottomWidth: 1,
    borderBottomColor: Colors.maincolor,
    alignSelf: 'center',
  },
  touchhead: {
    width: '50%',
    height: '100%',
    alignItems: "center",
    justifyContent: 'center',

  },
  spaceimgview: {
    width: wp(90),
    // height: wp(50),
    borderWidth: 1,
    borderColor: Colors.maincolor,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    marginTop: wp(2),
    borderRadius: wp(2),
    paddingHorizontal: wp(2),
  },
  imgview: {
    width: wp(85),
    // height: wp(45),
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: wp(2),
    justifyContent: 'center',
  },
  videthumb: {
    width: wp(87),
    height: wp(38),
    // borderRadius: wp(4),
  },
  videimgth: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(20),
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: Colors.transperent,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    top: wp(18),
  },
  imgth: {
    width: wp(4),
    height: wp(4),
  },
  textvi1: {
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'italic',
    color: Colors.gray,
    alignSelf: 'flex-start',
  },
  videview: {
    marginTop: wp(0),
    borderRadius: wp(4),
    width: wp(90),
    // paddingHorizontal: wp(2),
    paddingVertical: wp(0),
    // backgroundColor: Colors.white,
    elevation: 2,
  },
  txtexprt: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: '600',
  },
  mainexpertiestopic: {
    width: wp(90),
    paddingVertical: wp(3),
    paddingHorizontal: wp(2),
    marginTop: wp(5),
    alignSelf: 'center',
    backgroundColor: Colors.white,
    elevation: 2,
    borderRadius: wp(2),
  },
  rttxt: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray,
  },
  rat: {
    width: wp(4),
    height: wp(4),
  },
  ratview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    width: wp(17),
    marginTop: wp(2),
  },
  viwprimg: {
    width: wp(30),
    height: wp(30),
    borderRadius: wp(25),
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  primg: {
    width: wp(28),
    height: wp(28),
    borderRadius: wp(25),
  },
  primgicon: {
    width: wp(7),
    height: wp(7),
    tintColor: Colors.white,
    // borderRadius: wp(25),
  },
  primgtrans: {
    width: wp(28),
    height: wp(28),
    borderRadius: wp(25),
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.transperent1,
  },
  innercontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: wp(20),
  },
});
