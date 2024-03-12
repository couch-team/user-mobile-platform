import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { Images } from 'theme/config';
import { LongButton } from 'components';
import { AuthParamList, DashboardParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import * as ImagePicker from 'expo-image-picker';
import useAppDispatch from 'hooks/useAppDispatch';
import { $api } from 'services';
import { fetchUserDetails } from 'store/actions/userDetails';

type AuthNavigationProps = StackNavigationProp<DashboardParamList, 'UserOnboarding'>;
type Props = {
  navigation: AuthNavigationProps;
};

const redirectToSettings = () => {
  // const settingsUrl = Platform.select({
  //   ios: 'app-settings:',
  //   android: 'app-settings:',
  // });

  Linking.openSettings();
};

const UploadProfile = ({ navigation: { navigate } }: Props) => {
  const { country, dob, gender, state_of_residence } = useSelector(
    (state: RootState) => state.Onboarding,
  );
  const [is_loading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

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
        'Sorry, we need camera roll permission to upload images.',
        [
          {
            text: 'Try Again',
            onPress: async () => redirectToSettings(),
          },
        ],
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

  const completeProfile = () => {
    const formdata = new FormData();
    formdata.append('gender', gender);
    formdata.append('dob', dob);
    formdata.append('country', country);
    formdata.append('state_of_residence', state_of_residence);
    formdata.append('avatar', profileImage);
    completeOnboarding(formdata);
  };

  const completeOnboarding = async (data: FormData) => {
    try {
      setIsLoading(true);
      const response = await $api.post('/api/user/profile/', data, true);
      if ($api.isSuccessful(response)) {
        dispatch(fetchUserDetails());
        navigate('UserOnboarding');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch(fetchUserDetails());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            resizeMode="cover"
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
            loading={is_loading}
            disabled={profileImage?.uri ? false : true}
            buttonStyle={styles.buttonStyle}
            title="Complete basic profile"
            onPress={() => completeProfile()}
            // onPress={() => console.log('Clicked')}
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
