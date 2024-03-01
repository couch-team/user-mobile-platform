import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { Images } from 'theme/config';
import { LongButton } from 'components';
import { AuthParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import * as ImagePicker from 'expo-image-picker';

type AuthNavigationProps = StackNavigationProp<AuthParamList, 'UploadProfile'>;
type Props = {
  navigation: AuthNavigationProps;
};

const UploadProfile = ({ navigation: { navigate } }: Props) => {
  const {
    User: { completeProfileCreation },
  } = useDispatch();

  const {
    Auth: { getAuthenticate },
  } = useDispatch();

  const loading = useSelector(
    (state: RootState) => state.loading.effects.User.completeProfileCreation,
  );

  useEffect(() => {
    getAuthenticate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gender = useSelector((state: RootState) => state.User.gender);
  const dob = useSelector((state: RootState) => state.User.dataOfbirth);
  const country = useSelector((state: RootState) => state.User.country);
  const state = useSelector((states: RootState) => states.User.state);

  const [profileImage, setProfileImage] = useState({
    uri: '',
    type: '',
    name: '',
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        `Sorry, we need camera  
             roll permission to upload images.`,
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync();

      if (!result.canceled) {
        const localUri = result?.assets[0]?.uri;
        const filename: any = localUri.split('/').pop();

        // Infer the type of the image
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : 'image';

        // const returnValue = ;
        setProfileImage({ uri: localUri, type, name: filename });
      }
    }
  };

  const completeProfile = async () => {
    const formdata = new FormData();
    formdata.append('gender', gender);
    formdata.append('dob', dob);
    formdata.append('country', country);
    formdata.append('state_of_residence', state);
    formdata.append('avatar', profileImage);

    await completeProfileCreation(formdata);
    navigate('UserOnboarding');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={Images.logo} resizeMode="contain" style={styles.logo} />
        <View style={styles.bodyContainer}>
          {profileImage?.uri ? (
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
        {/* {profileImage?.uri ? null : ( */}
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={pickImage}
          style={styles.profileImageContainer}>
          <Image
            source={
              profileImage?.uri
                ? { uri: profileImage?.uri }
                : Images['profile-group']
            }
            resizeMode="contain"
            style={[
              styles.profileImage,
              profileImage && styles.selectedProfileImage,
            ]}
          />
        </TouchableOpacity>
        {/* )} */}
        <View style={styles.imageListContainer}>
          <Text style={styles.instructionText}>
            Kindly tap the icon to select or change an image from your phone's
            gallery.
          </Text>
          <LongButton
            isNotBottom
            loading={loading}
            disabled={profileImage?.uri ? false : true}
            buttonStyle={styles.buttonStyle}
            title="Complete basic profile"
            onPress={() => completeProfile()}
          />

          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.longArrowContainer}>
            <Text style={styles.longArrowText}>Choose an avatar</Text>
            <Image
              source={Images['long-arrow']}
              resizeMode="contain"
              style={styles.longArrow}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UploadProfile;
