/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Images, Typography } from 'theme/config';
import { styles } from './styles';
import ProfileCardModal from './components/ProfileCardModal';
import ProfileNumbersModal from './components/ProfileNumbersModal';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DashboardParamList } from 'utils/types/navigation-types';
import ProfileNumber from './components/ProfileNumber';
import MIndfulPoint from './components/MindfulPoint';

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
  const [showMindfulModal, setShowMindfulModal] = useState(false);
  const { profile, first_name, last_name } = useSelector(
    (state: RootState) => state.User,
  );
  const { moods } = useSelector((state: RootState) => state.Mood);

  const { email } = useSelector((state: RootState) => state.Auth);
  const { journals } = useSelector((state: RootState) => state.Journal);

  const handleMarkerPress = () => {
    setShowNumberModals(true);
  };
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
        title={'Moods Logged'}
        animationType={'fade'}
        data={moods}
      />
      <MIndfulPoint
        visible={showMindfulModal}
        onClose={() => setShowMindfulModal(false)}
        title={'Mindful points'}
        animationType={'fade'}
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
            top: Dimensions.get('window').height / 30,
          }}>
          {profile?.avatar_url ? (
            <Image
              source={{ uri: profile.avatar_url }}
              style={{
                width: 140,
                height: 140,
                resizeMode: 'cover',
                borderRadius: 100,
                overflow: 'hidden',
              }}
            />
          ) : (
            <Image
              source={Images['profile-image-placeholder']}
              style={{
                width: 150,
                height: 150,
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
          // zIndex: 0,
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

          <ProfileNumber
            title="Mindful Points"
            handleMarkerPress={() => setShowMindfulModal(true)}
          />
          <ProfileNumber
            value={moods.length}
            title="Moods Logged"
            handleMarkerPress={() => handleMarkerPress()}
          />
          <ProfileNumber value={journals.length} title="Journal Entries" />

          <ProfileNumber value={20} title="Mindspace" />
        </View>
      </ScrollView>
    </View>
  );
};
export default Profile;
