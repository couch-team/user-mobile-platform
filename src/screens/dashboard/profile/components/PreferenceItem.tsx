/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, Pressable, Switch, Text, View } from 'react-native';
import { CheckBox } from '@rneui/themed';
import { Images, Typography } from 'theme/config';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setPreference } from 'store/slice/notificationPreferenceSlice';
import { RootState } from 'store';

const PreferenceItem = ({ preference }: any) => {
  const dispatch = useDispatch();

  const isChecked = useSelector(
    (state: RootState) => state.NotificationPreferences[preference.id],
  );

  const handlePreferenceChange = () => {
    const updatedValue = !isChecked;

    dispatch(
      setPreference({ preferenceId: preference.id, value: updatedValue }),
    );
  };

  return (
    <Pressable
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
        backgroundColor: '#F7F7FD0F',
        height: 53,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E3E4F80F',
      }}
      onPress={handlePreferenceChange}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {preference.type === 'toggle' ? (
          <Switch
            trackColor={{ false: '#767577', true: '#E3E4F8' }}
            thumbColor={isChecked ? '#7378DE' : '#E3E4F8'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={handlePreferenceChange}
            value={isChecked}
          />
        ) : (
          <CheckBox
            checked={isChecked}
            //   onPress={handlePreferenceChange}
            onPress={handlePreferenceChange}
            checkedIcon={
              <Image
                source={Images['checked-img']}
                style={{ width: 22, height: 22, resizeMode: 'contain' }}
              />
            }
            uncheckedIcon={
              <Image
                source={Images['checked-img']}
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: 'contain',
                  tintColor: '#E3E4F8',
                }}
              />
            }
            containerStyle={{ margin: 0, padding: 0, borderRadius: 20 }}
          />
        )}
        <Text
          style={{
            color: '#A2A5E9',
            fontSize: 14,
            fontFamily: Typography.fontFamily.SoraRegular,
          }}>
          {preference.name}
        </Text>
      </View>

      {preference.type === 'toggle' && (
        <Text
          style={{
            color: '#7378DE',
            marginRight: 15,
            fontFamily: Typography.fontFamily.SoraBold,
          }}>
          {isChecked ? 'On' : 'Off'}
        </Text>
      )}
    </Pressable>
  );
};

export default PreferenceItem;
