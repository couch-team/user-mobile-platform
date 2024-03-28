/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';

import { Colors, Images, Typography } from 'theme/config';
import { hp, wp } from 'constants/layout';
import AppDateTimePicker from 'components/AppDateTimePicker';
import AppCountryPicker from 'components/AppCountryPicker';
import ProfilePictureModal from '../components/ProfilePictureModal';
import { Countries } from 'constants/country-states';
import { DashboardParamList } from 'utils/types/navigation-types';
import { RootState } from 'store';
import { $api } from 'services';
import { fetchUserDetails } from 'store/actions/userDetails';
import useAppDispatch from 'hooks/useAppDispatch';

type DashboardNavigationProps = NativeStackNavigationProp<
  DashboardParamList,
  'EditProfile'
>;
type Props = {
  navigation: DashboardNavigationProps;
  route: any;
};

type CountryProps = {
  code2: string;
  code3: string;
  name: string;
  capital: string;
  region: string;
  subregion: string;
  flag?: string;
  states: any[];
};

const EditProfile = ({ navigation }: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' },
  ]);
  const [date, setDate] = useState<any>();
  const [showPicker, setShowPicker] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  const [hasPermission, setHasPermission] = useState(false);
  const cameraRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [showPictureModal, setShowPictureModal] = useState(false);
  const [imageUri, setImageUri] = useState('');

  const [selectedCountry, setSelectedCountry] = useState<CountryProps | null>(
    null,
  );
  const [selectedState, setSelectedState] = useState<CountryProps | null>(null);
  const [showCountriesModal, setShowCountriesModal] = useState(false);
  const [showStatesModal, setShowStatesModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [formattedCountry, setFormattedCounry] = useState({
    name: '',
    flag: '',
  });
  const [profileImage, setProfileImage] = useState({
    uri: '',
    type: '',
    name: '',
  });
  const dispatch = useAppDispatch();

  const { profile, first_name, last_name } = useSelector(
    (state: RootState) => state.User,
  );

  const editProfile = async () => {
    const formData = new FormData();
    const localUri = profile?.avatar_url;
    const filename: any = localUri && localUri.split('/').pop();

    // Infer the type of the image
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : 'image';

    // const returnValue = ;
    setProfileImage({ uri: localUri, type, name: filename });
    try {
      setIsLoading(true);

      // Append the fields to the FormData object
      formData.append('gender', value || profile?.gender);
      formData.append('dob', values.current || profile?.dob);
      formData.append('country', selectedCountry?.code2 || profile?.country);
      formData.append(
        'state_of_residence',
        selectedState?.name || profile?.state_of_residence,
      );
      formData.append('avatar', profileImage);

      const response = await $api.patch(
        `/api/user/profile/${profile?.id}/`,
        formData,
        true,
      );
      if ($api.isSuccessful(response)) {
        showMessage({
          type: 'success',
          duration: 3000,
          message: 'Profile updated successfully',
        });
        dispatch(fetchUserDetails());
        navigation.goBack();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const values = useRef<string>('');
  useEffect(() => {
    if (profile) {
      setUserFirstName(first_name);
      setUserLastName(last_name);
      setDate(new Date(profile.dob).toLocaleDateString()); // Parse string to Date object and set state
      values.current = new Date(profile.dob).toLocaleDateString();
    }
  }, [first_name, last_name, profile]);
  values.current = profile?.dob
    ? profile.dob
    : date
    ? new Date(date).toLocaleDateString()
    : 'Select your date of birth';

  const handleCountrySelect = (country: any) => {
    setSelectedCountry(country);
    setShowCountriesModal(false);
  };

  const handleStateSelect = (state: any) => {
    setSelectedState(state);
    setShowStatesModal(false);
  };

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  const showDateTimePicker = () => {
    setShowPicker(!showPicker);
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);

        const localUri = result?.assets[0]?.uri;
        const filename: any = localUri.split('/').pop();

        // Infer the type of the image
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : 'image';

        // const returnValue = ;
        setProfileImage({ uri: localUri, type, name: filename });
        setShowCamera(false);
      }
    } catch (error: any) {
      Alert.alert('Error picking an image', error);
    }
  };

  useEffect(() => {
    if (showCamera === false) {
      return;
    }
    (async () => {
      const [cameraStatus] = await Promise.all([
        Camera.requestCameraPermissionsAsync(),
      ]);

      if (cameraStatus.status === 'granted') {
        setHasPermission(true);
      } else {
        setHasPermission(false);
      }
    })();
  }, [showCamera]);

  const toggleCamera = () => {
    setShowCamera(!showCamera);
    setCapturedImage(null); // Clear any previously captured image
  };

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current?.takePictureAsync();
      setImageUri(photo.uri);
      setShowCamera(false);
    }
  };

  useEffect(() => {
    const names = getCountryName(profile?.country);
    setFormattedCounry({ name: names.name, flag: names.flag });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  const getCountryName = (code: string | undefined) => {
    const country = Countries.find(countrys => countrys.code2 === code);
    return country ? { name: country.name, flag: country.flag } : ''; // Return the country name or an empty string if not found
  };

  const handleCameraTypeToggle = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(6, 12, 35, 1)',
        paddingHorizontal: 20,
        paddingTop: 20,
      }}>
      {showCamera && (
        <Camera style={styles.camera} type={cameraType} ref={cameraRef}>
          <View style={styles.cameraView}>
            <Pressable onPress={pickImage}>
              <Image
                source={require('../../../../assets/images/profile/photo-media-library.png')}
                style={{ width: 49, height: 49, resizeMode: 'contain' }}
              />
            </Pressable>
            <Pressable onPress={takePicture}>
              <Image
                source={Images['camera-shutter']}
                style={{ width: 72, height: 72, resizeMode: 'contain' }}
              />
            </Pressable>
            <Pressable
              style={{
                backgroundColor: '#FFFFFF33',
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderRadius: 100,
              }}
              onPress={handleCameraTypeToggle}>
              <Image
                source={require('../../../../assets/images/profile/camera-reverse.png')}
                style={{ width: 26, height: 21, resizeMode: 'contain' }}
              />
            </Pressable>
          </View>
        </Camera>
      )}
      <Modal
        visible={showCountriesModal}
        transparent={true}
        onRequestClose={() => setShowCountriesModal(false)}
        animationType="fade">
        <Pressable
          onPress={() => setShowCountriesModal(false)}
          style={[
            styles.modalBackdrop,
            {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
          ]}>
          <Pressable onPress={() => {}} style={[styles.modalContainer]}>
            <TextInput
              style={{
                backgroundColor: '#F7F7FD14',
                height: 44,
                padding: 10,
                borderRadius: 64,
                marginBottom: 20,
              }}
              placeholder="Search for your preferred country"
              placeholderTextColor={'#9F98B2'}
            />
            <FlatList
              data={Countries}
              keyExtractor={item => item.code3}
              renderItem={({ item }) => (
                <Pressable
                  style={{
                    flexDirection: 'row',
                    gap: 6,
                    alignItems: 'center',
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    borderColor: '#E3E4F81F',
                    borderWidth: 1,
                    marginVertical: 5,
                    borderRadius: 12,
                  }}
                  onPress={() => handleCountrySelect(item)}>
                  <Text style={{ fontSize: 20 }}>{item.flag}</Text>
                  <Text style={{ color: '#9F98B2', fontSize: 16 }}>
                    {item.name}
                  </Text>
                </Pressable>
              )}
            />
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        visible={showStatesModal}
        transparent={true}
        onRequestClose={() => setShowStatesModal(false)}
        animationType="fade">
        <Pressable
          onPress={() => setShowStatesModal(false)}
          style={[
            styles.modalBackdrop,
            {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
          ]}>
          <Pressable onPress={() => {}} style={[styles.modalContainer]}>
            <TextInput
              style={{
                backgroundColor: '#F7F7FD14',
                height: 44,
                padding: 10,
                borderRadius: 64,
              }}
              placeholder="Search for your state of origin"
              placeholderTextColor={'#9F98B2'}
            />
            <FlatList
              data={selectedCountry ? selectedCountry.states : []}
              keyExtractor={item => item.code}
              renderItem={({ item }) => (
                <Pressable
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    borderColor: '#E3E4F81F',
                    borderWidth: 1,
                    marginVertical: 5,
                    borderRadius: 12,
                  }}
                  onPress={() => handleStateSelect(item)}>
                  <Text style={{ color: 'white' }}>{item.name}</Text>
                </Pressable>
              )}
            />
          </Pressable>
        </Pressable>
      </Modal>
      <ProfilePictureModal
        visible={showPictureModal}
        animationType="fade"
        onClose={() => setShowPictureModal(false)}
        takePicture={toggleCamera}
        pickImage={pickImage}
      />
      <Pressable
        style={styles.headerLeftIconContainer}
        onPress={() => navigation.goBack()}>
        <Image
          source={Images['arrow-left-circle']}
          resizeMode="contain"
          style={[styles.backIcon]}
        />
      </Pressable>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={{ marginTop: 20, gap: 8, flex: 1 }}>
          <Text
            style={{
              color: 'rgba(255, 255, 255, 1)',
              fontSize: 20,
              fontFamily: Typography.fontFamily.SoraBold,
            }}>
            Edit Profile
          </Text>
          <Text
            style={{
              color: 'rgba(159, 152, 178, 1)',
              fontSize: 14,
              fontFamily: Typography.fontFamily.SoraRegular,
            }}>
            Join Individuals of like minds and share.
          </Text>
        </View>

        <View style={{ position: 'relative', width: 100, marginTop: 30 }}>
          {capturedImage && !showCamera ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={{ uri: capturedImage }} style={styles.picture} />
            </View>
          ) : imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.picture} />
          ) : profile?.avatar_url ? (
            <Image
              source={{ uri: profile.avatar_url }}
              style={styles.picture}
            />
          ) : (
            <Image
              source={Images['profile-image-placeholder']}
              style={{ width: 100, height: 100, resizeMode: 'contain' }}
            />
          )}
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'rgba(0, 0, 0, 0.35)',
              position: 'absolute',
              borderRadius: 100,
            }}
          />
          <Pressable
            style={styles.pictureOverlay}
            onPress={() => setShowPictureModal(true)}>
            <Image
              source={Images.camera}
              style={{ width: 26, height: 24, resizeMode: 'contain' }}
            />
          </Pressable>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
            marginTop: 20,
          }}>
          <View style={{ width: '47%', gap: 12 }}>
            <Text
              style={{
                color: 'rgba(227, 228, 248, 1)',
                fontFamily: Typography.fontFamily.SoraMedium,
                fontSize: 14,
              }}>
              Firstname
            </Text>
            <TextInput
              value={userFirstName || first_name}
              onChangeText={text => setUserFirstName(text)}
              placeholderTextColor={'white'}
              keyboardType={'default'}
              returnKeyType={'next'}
              autoComplete={'given-name'}
              autoCapitalize={'words'}
              style={styles.input}
            />
          </View>

          <View style={{ width: '47%', gap: 12 }}>
            <Text
              style={{
                color: 'rgba(227, 228, 248, 1)',
                fontFamily: Typography.fontFamily.SoraMedium,
                fontSize: 14,
              }}>
              Lastname
            </Text>
            <TextInput
              value={userLastName || last_name}
              onChangeText={text => setUserLastName(text)}
              placeholderTextColor={'white'}
              keyboardType={'default'}
              returnKeyType={'next'}
              autoComplete={'given-name'}
              autoCapitalize={'words'}
              style={styles.input}
            />
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontFamily: Typography.fontFamily.SoraMedium,
              fontSize: 14,
              color: 'rgba(227, 228, 248, 1)',
              // marginTop: 10,
            }}>
            Gender
          </Text>
          <DropDownPicker
            open={open}
            value={value || profile?.gender}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            listMode={'SCROLLVIEW'}
            ArrowDownIconComponent={() => (
              <Image
                source={Images['dropdown-img']}
                style={{ width: 14, height: 10, resizeMode: 'contain' }}
              />
            )}
            labelStyle={{
              color: 'rgba(159, 152, 178, 1)',
              fontFamily: Typography.fontFamily.SoraMedium,
              fontSize: 16,
            }}
            placeholder="Select your Gender"
            placeholderStyle={{
              fontFamily: Typography.fontFamily.SoraRegular,
              fontSize: 16,
              color: 'rgba(159, 152, 178, 1)',
            }}
            textStyle={{
              color: 'black',
              fontFamily: Typography.fontFamily.SoraRegular,
              fontSize: 14,
            }}
            style={styles.dropDownStyles}
          />
        </View>

        <AppDateTimePicker
          value={values.current}
          modes={date || new Date()}
          mode={'date'}
          showDateTimePicker={showDateTimePicker}
          label={'Date of Birth'}
          placeholder={'Pick your preferred date'}
          showPicker={showPicker}
          onChange={onChange}
          is24Hour={false}
          display={'calender'}
        />

        <AppCountryPicker
          showCountryPicker={() => setShowCountriesModal(true)}
          placeholder="Select your country of origin"
          label="Country"
          value={selectedCountry?.name || formattedCountry.name}
          flag={selectedCountry?.flag || formattedCountry.flag}
        />

        <AppCountryPicker
          showCountryPicker={() => setShowStatesModal(true)}
          placeholder="Select your state of origin"
          label="States"
          value={selectedState?.name || profile?.state_of_residence}
        />

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <Pressable style={[styles.editBtn]} onPress={editProfile}>
            {isLoading ? (
              <ActivityIndicator size={'small'} color="white" />
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  fontFamily: Typography.fontFamily.SoraMedium,
                  color: '#FFFFFF',
                }}>
                Save Changes
              </Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  backIcon: {
    width: wp(24),
    height: hp(24),
    resizeMode: 'contain',
  },
  headerLeftIconContainer: {
    width: 30,
    padding: 20,
    height: 36,
    backgroundColor: Colors.COUCH_BLUE_600,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    position: 'absolute',
    top: '0%',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5000,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    position: 'relative',
    height: '60%',
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopLeftRadius: 24,
    borderTopEndRadius: 24,
    backgroundColor: 'rgba(10, 11, 43, 1)',
  },
  cameraView: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#00000080',
    flexDirection: 'row',
    justifyContent: 'space-around',
    bottom: 0,
    height: 150,
    width: '100%',
    alignItems: 'center',
  },
  picture: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 100,
    overflow: 'hidden',
  },
  pictureOverlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  input: {
    backgroundColor: 'rgba(247, 247, 253, 0.06)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 64,
    width: '100%',
    color: '#9F98B2',
    fontSize: 16,
    fontFamily: Typography.fontFamily.SoraMedium,
  },
  dropDownStyles: {
    backgroundColor: 'rgba(247, 247, 253, 0.08)',
    borderRadius: 64,
    marginTop: 10,
    borderWidth: 0,
    height: 50,
    zIndex: 4000,
  },
  editBtn: {
    backgroundColor: 'rgba(115, 120, 222, 1)',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 64,
    marginVertical: 20,
  },
});
