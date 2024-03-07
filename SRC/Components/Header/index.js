import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {deleteAcc} from '../../Api/index';
import Colors from '../../Colors';
import {logout} from '../../redux/actions';

const Header = ({title, left, navigation, right}) => {
  const {userData, isLoggedIn} = useSelector(({USER}) => USER);
  const [confirm, setconfirm] = useState(false);
  const [dlmodal, setdlmodal] = useState(false);
  const dispatch = useDispatch();
  const _logout = () => {
    setconfirm(false);

    setTimeout(() => {
      logout()(dispatch);
    }, 1000);
  };

  const deleteAccount = async () => {
    setdlmodal(false);
    await deleteAcc({Auth: userData.userdata?.api_token})
      .then(res => {
        console.log('Response Of lidve----------', res);
        _logout();
      })
      .catch(err => {
        console.log('Error of Post Question', err.response);
      });
  };
  return (
    <View style={style.mainview}>
      {left == 'true' && title != 'Profile' ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={style.touchleft}>
          <Image
            source={require('../../Assests/arrow.png')}
            resizeMode="cover"
            style={style.letarrow}
          />
        </TouchableOpacity>
      ) : left == 'true' && title == 'Profile' ? (
        <TouchableOpacity
          onPress={() => setdlmodal(true)}
          style={style.touchleft}>
          <Image
            source={require('../../Assests/deletekr.png')}
            resizeMode="cover"
            style={style.letarrow}
          />
        </TouchableOpacity>
      ) : (
        <View style={style.touchleft}></View>
      )}
      <Text style={style.titletext}>{title}</Text>
      {right == 'true' ? (
        <TouchableOpacity
          onPress={() => setconfirm(true)}
          style={style.touchleft}>
          <Image
            source={require('../../Assests/log1.png')}
            resizeMode="cover"
            style={style.letarrow}
          />
        </TouchableOpacity>
      ) : (
        <View style={style.touchleft}></View>
      )}
      <Modal animationType="fade" transparent={true} visible={confirm}>
        <View style={style.trans}>
          <View style={style.innetrans}>
            <Text style={style.text}>Are You Sure You Want To Log Out?</Text>
            <View style={style.viewtolog}>
              <TouchableOpacity
                onPress={() => setconfirm(false)}
                style={[
                  style.tolog,
                  {
                    backgroundColor: Colors.white,
                    borderWidth: 1,
                    borderColor: Colors.black,
                  },
                ]}>
                <Text style={style.text}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => _logout()}
                style={[
                  style.tolog,
                  {
                    backgroundColor: Colors.black,
                    borderWidth: 1,
                    borderColor: Colors.white,
                  },
                ]}>
                <Text style={[style.text, {color: Colors.white}]}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal animationType="fade" transparent={true} visible={dlmodal}>
        <View style={style.trans}>
          <View style={[style.innetrans, {width: wp(80)}]}>
            <Text style={style.text}>
              Are You Sure You Want To Delete Account?
            </Text>
            <View style={style.viewtolog}>
              <TouchableOpacity
                onPress={() => setdlmodal(false)}
                style={[
                  style.tolog,
                  {
                    backgroundColor: Colors.white,
                    borderWidth: 1,
                    borderColor: Colors.black,
                  },
                ]}>
                <Text style={style.text}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteAccount()}
                style={[
                  style.tolog,
                  {
                    backgroundColor: Colors.black,
                    borderWidth: 1,
                    borderColor: Colors.white,
                  },
                ]}>
                <Text style={[style.text, {color: Colors.white}]}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Header;
const style = StyleSheet.create({
  viewtolog: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(43),
    alignSelf: 'flex-end',
    marginTop: wp(3),
  },
  tolog: {
    width: wp(20),
    height: wp(8),
    borderRadius: wp(10),
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: '600',
  },
  innetrans: {
    backgroundColor: Colors.white,
    elevation: 2,
    width: wp(70),
    height: wp(20),
    borderRadius: wp(3),
    paddingHorizontal: wp(2),
    paddingVertical: wp(2),
  },
  trans: {
    flex: 1,
    backgroundColor: Colors.transperent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainview: {
    width: '100%',
    height: '8%',
    backgroundColor: Colors.transperentheader,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
  },
  titletext: {
    fontSize: 18,
    color: Colors.white,
    fontWeight: '600',
  },
  touchleft: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(10),
    backgroundColor: Colors.transperentheader,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letarrow: {
    width: wp(6),
    height: wp(6),
    tintColor: Colors.white,
  },
});
