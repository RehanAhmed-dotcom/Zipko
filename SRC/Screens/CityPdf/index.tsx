import React, {useEffect, useState} from 'react';
// import {useTranslation} from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
// import
import * as Progress from 'react-native-progress';
// import Icon from 'react-native-vector-icons/AntDesign';
import Pdf from 'react-native-pdf';
import styles from './style';
import {widthPercentageToDP} from 'react-native-responsive-screen';
const CityPdf = ({navigation, route}) => {
  const {item} = route.params;
  const [headerMesg, setHeaderMesg] = useState(route.params.name);
  useEffect(() => {
    // setHeaderMesg(route.params.name);
  }, []);
  console.log('pdf', item.name);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>
      <TouchableOpacity activeOpacity={1} style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.empty}>
          <Image
            source={require('../../Assests/arrow.png')}
            style={{
              width: widthPercentageToDP(6),
              height: widthPercentageToDP(6),
              tintColor: 'white',
            }}
          />
          {/* <Icon name="arrowleft" size={25} color={'white'} /> */}
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.text}>{item.name}</Text>
        </View>
        <TouchableOpacity style={styles.logout}></TouchableOpacity>
      </TouchableOpacity>
      <View style={styles.container}>
        <Pdf
          trustAllCerts={Platform.OS == 'android' ? false : true}
          source={{
            uri: item.pdf_file
              ? item.pdf_file
              : 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
            cache: true,
          }}
          renderActivityIndicator={progress => (
            <Progress.Bar progress={progress} color="#3EC1BA" width={200} />
          )}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          onLoadProgress={uri => {
            console.log('uri', uri);
          }}
          style={styles.pdf}
        />
      </View>
    </SafeAreaView>
  );
};
export default CityPdf;
