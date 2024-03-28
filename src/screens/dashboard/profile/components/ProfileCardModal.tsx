/* eslint-disable react-native/no-inline-styles */
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Images, Typography } from 'theme/config';
import ProfileCardTextInput from './ProfileCardTextInput';
import { differenceInYears } from 'date-fns';

interface Props {
  visible: boolean;
  onClose: () => void;
  title: string;
  animationType: 'none' | 'slide' | 'fade' | undefined;
  profile: any;
  name: string;
}

const ProfileCardModal = ({
  visible,
  onClose,
  title,
  animationType,
  profile,
  name,
}: Props) => {
  const calculateAge = (dateOfBirth: string) => {
    // Convert date of birth string to Date object
    const age = differenceInYears(new Date(), new Date(dateOfBirth));

    return age;
  };

  const agess = calculateAge(profile?.dob);
  return (
    <Modal
      animationType={animationType}
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <Pressable
        onPress={onClose}
        style={[
          styles.modalBackdrop,
          {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          },
        ]}>
        <Pressable onPress={() => {}} style={[styles.modalContainer]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 20,
            }}>
            <Text
              style={{
                color: 'rgba(255, 255, 255, 1)',
                fontSize: 24,
                fontFamily: Typography.fontFamily.SoraMedium,
              }}>
              {title}
            </Text>
            <Pressable
              style={{
                backgroundColor: 'rgba(243, 243, 252, 0.12)',
                padding: 10,
                borderRadius: 100,
              }}
              onPress={onClose}>
              <Image
                source={Images['cancel-audio']}
                style={{ width: 22, height: 22, resizeMode: 'contain' }}
              />
            </Pressable>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(6, 12, 35, 1)',
              paddingHorizontal: 20,
              paddingTop: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: 'rgba(227, 228, 248, 1)',
                  fontFamily: Typography.fontFamily.SoraMedium,
                  fontSize: 12,
                }}>
                PERSONAL INFORMATION
              </Text>
              <Text
                style={{
                  color: 'rgba(115, 120, 222, 1)',
                  fontFamily: Typography.fontFamily.SoraSemiBold,
                  fontSize: 16,
                }}>
                Edit Details
              </Text>
            </View>

            <View
              style={{
                backgroundColor: 'rgba(227, 228, 248, 0.04)',
                paddingHorizontal: 10,
                paddingVertical: 16,
                marginTop: 10,
                borderRadius: 16,
              }}>
              <ProfileCardTextInput
                title={'Name'}
                placeholderText="Enter your name"
                onChangeText={() => {}}
                value={'' || name}
                keyboardType="default"
              />

              <ProfileCardTextInput
                title={'Age'}
                placeholderText="Enter your age"
                onChangeText={() => {}}
                value={'' || agess.toString()}
                keyboardType="number-pad"
              />

              <ProfileCardTextInput
                title={'Gender'}
                placeholderText="Enter your gender"
                onChangeText={() => {}}
                value={'' || profile?.gender === 'M' ? 'Male' : 'Female'}
                keyboardType="default"
              />

              <ProfileCardTextInput
                title={'Relationship Status'}
                placeholderText="Enter your relationship status"
                onChangeText={() => {}}
                value={''}
                keyboardType="default"
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text
                style={{
                  color: 'rgba(227, 228, 248, 1)',
                  fontFamily: Typography.fontFamily.SoraMedium,
                  fontSize: 12,
                }}>
                OTHER INFORMATION
              </Text>
              <Text
                style={{
                  color: 'rgba(115, 120, 222, 1)',
                  fontFamily: Typography.fontFamily.SoraSemiBold,
                  fontSize: 16,
                }}>
                Edit Details
              </Text>
            </View>

            <View
              style={{
                backgroundColor: 'rgba(227, 228, 248, 0.04)',
                paddingHorizontal: 10,
                paddingVertical: 16,
                marginTop: 10,
                borderRadius: 16,
              }}>
              <ProfileCardTextInput
                title={'Are you currently Employed?'}
                placeholderText="Enter your employment status"
                onChangeText={() => {}}
                value={''}
                keyboardType="default"
              />

              <ProfileCardTextInput
                title={'how  is your current financial status?'}
                placeholderText="Enter your financial status"
                onChangeText={() => {}}
                value={''}
                keyboardType="default"
              />
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ProfileCardModal;

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    // backgroundColor: Colors.white,
    width: '100%',
    // height: '95%',
    flex: 1,
    position: 'relative',
    // paddingHorizontal: 16,
    // paddingVertical: 20,
    borderTopLeftRadius: 24,
    borderTopEndRadius: 24,
    backgroundColor: 'rgba(10, 11, 43, 1)',
  },
});
