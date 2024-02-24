import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { BaseModal, LongButton } from 'components';
import { wp, hp } from 'constants/layout';
import { Colors, Images } from 'theme/config';

interface MoodViewModalProps {
  isVisible: boolean;
  onClose: () => void;
  onPressEditMood?: () => any;
  onPressViewMood?: () => any;
}

export default function MoodViewModal({
  isVisible,
  onClose,
  onPressEditMood,
  onPressViewMood,
  
}: MoodViewModalProps) {

  
  

  return (
    <View>
    <BaseModal visible={isVisible} onClose={() => onClose()}>
      <View style={styles.container}>
        <View>
          <LongButton
          onPress={onPressEditMood}
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
            title="Edit Mood"
            buttonStyle={styles.buttonStyle}
          />
        </View>
        <View>
          <LongButton
           onPress={onPressViewMood}
            title="View Mood Tracker"
            titleStyle={{ color: '#FFE063', fontWeight: '900', fontSize: 14 }}
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
