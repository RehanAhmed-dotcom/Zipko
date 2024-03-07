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
    alignItems: 'center',
    paddingVertical: wp(24),
  },
  imaginner: {
    width: '65%',
    height: '65%',
  },
  log: {
    width: '12%',
    height: '12%',
  },
  txt1: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.blue,
  },
  txt2: {
    fontSize: 22,
    fontWeight: 'bold',
    width: wp(45),
    color: Colors.black,
    marginTop: wp(2),
  },
  textview: {
    width: wp(90),
  },
  txt3: {
    marginTop: wp(2),
    fontSize: 14,
    fontWeight: '400',
    color: Colors.black,
  },
});
