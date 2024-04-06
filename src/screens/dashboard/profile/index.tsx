/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import { Images, Typography } from 'theme/config';
import { styles } from './styles';
import { ProfileNumbers } from 'constants/data';
import ProfileCardModal from './components/ProfileCardModal';
import ProfileNumbersModal from './components/ProfileNumbersModal';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DashboardParamList } from 'utils/types/navigation-types';

type DashboardNavigationProps = NativeStackNavigationProp<
  DashboardParamList,
  'UserProfile'
>;
type Props = {
  navigation: DashboardNavigationProps;
};

const Profile = ({ navigation }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [showNumberModals, setShowNumberModals] = useState(false);
  const [markerData, setMarkerData] = useState<any>([]);
  const { profile, first_name, last_name } = useSelector(
    (state: RootState) => state.User,
  );
  const { email } = useSelector((state: RootState) => state.Auth);

  const handleMarkerPress = (markerDatas: any) => {
    setShowNumberModals(true);
    setMarkerData(markerDatas);
  };

  const totalSum = (data: any) =>
    data.reduce(
      (accumulator: any, current: any) => accumulator + current.value,
      0,
    );
  return (
    <View style={styles.container}>
      <ProfileCardModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        title={'Profile Card'}
        animationType={'fade'}
        profile={profile}
        name={`${first_name} ${last_name}`}
      />
      <ProfileNumbersModal
        visible={showNumberModals}
        onClose={() => setShowNumberModals(false)}
        title={markerData && markerData.name}
        animationType={'fade'}
        data={markerData.data}
      />
      <View style={styles.editBtnContainer}>
        <Pressable
          style={styles.editBtn}
          onPress={() =>
            navigation.navigate('EditProfile', { id: profile?.id })
          }>
          <Text style={styles.btnText}>Edit Profile</Text>
        </Pressable>
        <View
          style={{
            alignItems: 'center',
            position: 'absolute',
            left: 0,
            right: 0,
            top: '-30%',
          }}>
          {profile?.avatar_url ? (
            <Image
              source={{ uri: profile.avatar_url }}
              style={{
                width: 160,
                height: 160,
                resizeMode: 'cover',
                top: '100%',
                zIndex: 1,
                borderRadius: 100,
                overflow: 'hidden',
              }}
            />
          ) : (
            <Image
              source={Images['profile-image-placeholder']}
              style={{
                width: 160,
                height: 160,
                resizeMode: 'contain',
                top: '100%',
                zIndex: 1,
              }}
            />
          )}
        </View>
      </View>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'rgba(6, 12, 35, 1)',
        }}>
        <View style={{ alignItems: 'center', marginTop: '20%', gap: 6 }}>
          <Text
            style={{
              color: 'rgba(227, 228, 248, 1)',
              fontSize: 24,
              fontFamily: Typography.fontFamily.SoraBold,
            }}>
            {first_name} {last_name}
          </Text>
          <Text
            style={{
              color: 'rgba(159, 152, 178, 1)',
              fontSize: 14,
              fontFamily: Typography.fontFamily.SoraRegular,
            }}>
            {email}
          </Text>
        </View>

        <View
          style={{
            marginTop: 20,
            paddingVertical: 20,
            paddingHorizontal: 30,
            borderColor: 'rgba(185, 187, 238, 0.5)',
            borderWidth: 1,
            borderStyle: 'dashed',
            marginHorizontal: 20,
            borderRadius: 16,
            alignItems: 'center',
          }}>
          <Image
            source={Images['profile-card']}
            style={{ width: 60, height: 12, resizeMode: 'contain' }}
          />

          <View style={{ gap: 12, alignItems: 'center', marginTop: 30 }}>
            <Text
              style={{
                color: 'rgba(227, 228, 248, 1)',
                fontSize: 16,
                fontFamily: Typography.fontFamily.SoraMedium,
              }}>
              My Profile Card
            </Text>

            <Text
              style={{
                color: 'rgba(159, 152, 178, 1)',
                fontSize: 12,
                fontFamily: Typography.fontFamily.SoraRegular,
                textAlign: 'center',
                lineHeight: 20,
                letterSpacing: -0.02,
              }}>
              We collected some data to know you better earlier! We stored them
              here for you!
            </Text>

            <Pressable
              style={{
                backgroundColor: 'rgba(255, 255, 255, 1)',
                paddingHorizontal: 50,
                paddingVertical: 14,
                borderRadius: 64,
                marginTop: 10,
              }}
              onPress={() => setShowModal(true)}>
              <Text
                style={{
                  color: 'rgba(115, 120, 222, 1)',
                  fontFamily: Typography.fontFamily.SoraBold,
                }}>
                View Details
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
          <Text
            style={{
              color: 'rgba(255, 255, 255, 1)',
              fontFamily: Typography.fontFamily.SoraBold,
              marginBottom: 10,
            }}>
            You’ve got some interesting Numbers
          </Text>

          {ProfileNumbers.map(numbers => (
            <Pressable
              style={{
                backgroundColor: 'rgba(243, 243, 252, 0.04)',
                flexDirection: 'row',
                padding: 16,
                borderRadius: 12,
                marginBottom: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              key={numbers.id}
              onPress={() => handleMarkerPress(numbers)}>
              <View style={{ gap: 12 }}>
                <Text
                  style={{
                    color: 'rgba(227, 228, 248, 1)',
                    fontSize: 20,
                    fontFamily: Typography.fontFamily.SoraBold,
                  }}>
                  {numbers.name}
                </Text>
                <Text
                  style={{
                    color: 'rgba(159, 152, 178, 1)',
                    fontSize: 14,
                    fontFamily: Typography.fontFamily.SoraRegular,
                  }}>
                  View full details
                </Text>
              </View>

              <Text
                style={{
                  color:
                    numbers.name === 'Therapy'
                      ? 'rgba(115, 120, 222, 1)'
                      : numbers.name === 'Relaxation'
                      ? 'rgba(176, 232, 153, 1)'
                      : 'rgba(255, 234, 151, 0.8)',
                  fontSize: 80,
                  fontFamily: Typography.fontFamily.SoraExtraBold,
                  letterSpacing: -0.09,
                }}>
                {totalSum(numbers.data)}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
export default Profile;
