import { ActivityIndicator, Modal, View } from 'react-native';

import Colors from '../../Colors';
import React from 'react';

const Loder = ({ lodertyp }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={lodertyp}>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.transperent,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color={Colors.maincolor} />
      </View>
    </Modal>
  );
};

export default Loder;
