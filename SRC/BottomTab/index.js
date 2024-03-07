import {
  Fragment,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Ask from './Ask';
import Coins from './Coins';
import Colors from '../Colors';
import Home from './Home';
import Profile from './Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const BoyyomTab = () => {
  const designtab = (imag, focused, txt) => {
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          width: wp(17),
          height: wp(16),
          justifyContent: 'space-around',
          alignItems: 'center',
          // bottom: wp(6),
        }}>
        <Image
          resizeMode="contain"
          source={imag}
          style={{
            width: focused ? wp(6) : wp(5),
            height: focused ? wp(6) : wp(5),
            tintColor: focused ? Colors.maincolor : Colors.gray,
          }}
        />
        <Text
          style={{
            color: focused ? Colors.white : Colors.gray,
            fontSize: 11,
            bottom: wp(1),
            fontWeight: focused ? 'bold' : 'normal',
          }}>
          {txt}
        </Text>
      </View>
    );
  };

  const Imageinbotttombar = () => {
    return (
      <ImageBackground
        // resizeMode="contain"
        source={require('../Assests/barr.png')}
        style={{
          position: "absolute",
          bottom: 0,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          borderTopColor: 'black',
          // bottom: 15,
          // left: 20,
          // right: 20,
          flexDirection: 'row',
          zIndex: -1000,
          // elevation: 2,
          // borderRadius: 20,
          backgroundColor: "black",
          // borderTopLeftRadius: 15,
          // borderTopRightRadius: 15,
          overflow: "hidden",
        }}
      ></ImageBackground>
    );
  };
  return (
    <Tab.Navigator
      // tabBar={(props) =>
      //   <Imageinbotttombar {...props} />
      // }
      screenOptions={{
        tabBarHideOnKeyboard: true,

        tabBarStyle: {
          backgroundColor: 'transparent',
          position: 'absolute',
          borderTopWidth: 0,
          zIndex: 100,
          backgroundColor: Colors.black,
          // borderTopLeftRadius: true,
          borderTopLeftRadius: wp(10),
          // borderTopStartRadius: wp(100),
          // borderTopEndRadius: wp(100),
          borderTopRightRadius: wp(10),
          // width: 450,
          // right: 70,
          height: wp(16),
          // top: wp(175),

          // overflow: 'hidden',
          //  width: 105, 
          //  height: 210, 
          //  position: 'absolute',
          //   left: 80,
          //    bottom: 62, 
          //    borderTopLeftRadius: 150, 
          //    borderBottomLeftRadius: 150,
          //     backgroundColor: 'transparent'
          // bottom: 0

        },
      }}
      tabBarOptions={{ showLabel: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) =>
            designtab(require('../Assests/Vector-3.png'), focused, 'HOME'),

          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Ask"
        component={Ask}
        options={{
          tabBarIcon: ({ focused }) =>
            designtab(require('../Assests/Vector-2.png'), focused, 'ASK'),

          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) =>
            designtab(require('../Assests/Vector-1.png'), focused, 'Profile'),

          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Coins"
        component={Coins}
        options={{
          tabBarIcon: ({ focused }) =>
            designtab(require('../Assests/Vector.png'), focused, 'COINS'),

          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
export default BoyyomTab;
