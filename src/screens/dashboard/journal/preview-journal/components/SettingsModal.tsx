import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BaseModal, LongButton } from 'components';
import { wp, hp } from 'constants/layout';
import { Colors, Images, Typography } from 'theme/config';
import DeleteModal from './DeleteModal';

interface SettingsModalProps {
  isVisible: boolean;
  onClose: () => void;
  onPressEdit?: () => any;
  onPressDelete?: () => any;
}

export default function SettingsModal({
  isVisible,
  onClose,
  onPressEdit,
  onPressDelete,
  
}: SettingsModalProps) {

  
  

  return (
    <View>
    <BaseModal visible={isVisible} onClose={() => onClose()}>
      <View style={{ marginTop: wp(50), marginLeft: wp(24) }}>
        <Text style={{ color: 'white', fontSize: wp(16), fontWeight: '900' }}>
          More Options
        </Text>
      </View>
      <View style={styles.container}>
        <View>
          <LongButton
          onPress={onPressEdit}
            icon={
              <Image
                source={Images.edit}
                resizeMode="contain"
                style={styles.editIcon}
              />
            }
            titleStyle={{
              fontWeight: '900',
              fontSize: wp(14),
              color: "#A2A5E9"
            }}
            title="Edit Note"
            buttonStyle={styles.buttonStyle}
          />
        </View>
        <View>
          <LongButton
           onPress={onPressDelete}
            icon={
              <Image
                source={Images.delete}
                resizeMode="contain"
                style={styles.editIcon}
              />
            }
            title="Delete Note"
            titleStyle={{ color: '#F56969', fontWeight: '900', fontSize: wp(14) }}
            buttonStyle={styles.button2Style}
          />
        </View>
      </View>
    </BaseModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginHorizontal: wp(160),
    width: wp(50),
    height: hp(30),
    marginTop: wp(250),
  },
  buttonStyle: {
    marginBottom: hp(100),
    backgroundColor: Colors.COUCH_BLUE_1000,
  },
  button2Style: {
    backgroundColor: Colors.COUCH_BLUE_1000,
  },
  editIcon: {
    height: hp(34),
  },
});
