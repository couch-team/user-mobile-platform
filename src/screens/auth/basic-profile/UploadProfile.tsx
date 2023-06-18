import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { Images } from 'theme/config';
import { LongButton } from 'components';
import { AuthParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';

type AuthNavigationProps = StackNavigationProp<AuthParamList, 'UploadProfile'>;
type Props = {
  navigation: AuthNavigationProps;
};

const UploadProfile = ({ navigation: { navigate } }: Props) => {
  const [profileImage, setProfileImage] = useState('');
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
            source={Images['profile-group']}
            resizeMode="contain"
            style={styles.profileImage}
          />
        </TouchableOpacity>

        <Text style={styles.instructionText}>
          Kindly tap the icon to select or change an image from your phone's
          gallery.
        </Text>

        <LongButton
          isNotBottom
          disabled={profileImage ? false : true}
          buttonStyle={styles.buttonStyle}
          title="Complete basic profile"
        />
        {!profileImage && (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigate('UserOnboarding')}
            style={styles.longArrowContainer}>
            <Text style={styles.longArrowText}>No, Skip for now</Text>
            <Image
              source={Images['long-arrow']}
              resizeMode="contain"
              style={styles.longArrow}
            />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default UploadProfile;
