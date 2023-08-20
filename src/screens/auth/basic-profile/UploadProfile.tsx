import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { Images } from 'theme/config';
import { LongButton } from 'components';
import { AuthParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';

type AuthNavigationProps = StackNavigationProp<AuthParamList, 'UploadProfile'>;
type Props = {
  navigation: AuthNavigationProps;
};

const UploadProfile = ({ navigation: { navigate } }: Props) => {
  const [profileImage, setProfileImage] = useState('');
  const avatars = useSelector((state: RootState) => state.User.avatars);
  const {
    User: { getUserAvatars },
  } = useDispatch();

  useEffect(() => {
    getUserAvatars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onPressSkip = async () => {
    navigate('UserOnboarding');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={Images.logo} resizeMode="contain" style={styles.logo} />
        <View style={styles.bodyContainer}>
          {profileImage ? (
            <View style={styles.bodyTextContainer}>
              <Text style={styles.bodyMainText}>Gasps!</Text>
              <Text style={styles.bodySubText}>You look Awesome!</Text>
            </View>
          ) : (
            <View style={styles.bodyTextContainer}>
              <Text style={styles.bodyMainText}>One last thing...</Text>
              <Text style={styles.bodySubText}>Upload that cute face...</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.profileSectionContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.profileImageContainer}>
          <Image
            source={
              profileImage ? { uri: profileImage } : Images['profile-group']
            }
            resizeMode="contain"
            style={[
              styles.profileImage,
              profileImage && styles.selectedProfileImage,
            ]}
          />
        </TouchableOpacity>

        <View>
          <ScrollView horizontal style={styles.imageListContainer}>
            {avatars?.map(avatar => {
              return (
                <TouchableOpacity
                  key={avatar?.id}
                  onPress={() => setProfileImage(avatar?.image_url)}
                  activeOpacity={0.8}
                  style={styles.imageIconContainer}>
                  <Image
                    source={{ uri: avatar.image_url }}
                    style={styles.uriProfile}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <Text style={styles.instructionText}>
          Kindly tap the icon to select or change an image from your phone's
          gallery.
        </Text>

        <LongButton
          isNotBottom
          disabled={profileImage ? false : true}
          buttonStyle={styles.buttonStyle}
          title="Complete basic profile"
          onPress={() => onPressSkip()}
        />
      </View>
    </SafeAreaView>
  );
};

export default UploadProfile;
