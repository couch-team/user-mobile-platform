import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  BackHandler,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { Images } from 'theme/config';
import { LongButton, CouchDatePicker } from 'components';
import { genderRoles } from 'constants/data';
import { AuthParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { isAndroid } from 'constants/platform';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import useAppDispatch from 'hooks/useAppDispatch';
import { RootState } from 'store';
import { setDob, setGender } from 'store/slice/onboardingSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useRoute } from '@react-navigation/native';

type AuthNavigationProps = NativeStackNavigationProp<
  AuthParamList,
  'BasicProfile'
>;
type Props = {
  navigation: AuthNavigationProps;
};

const BasicProfile = ({ navigation: { navigate } }: Props) => {
  const { params } = useRoute<RouteProp<AuthParamList, 'BasicProfile'>>();
  const { gender, dob } = useSelector((state: RootState) => state.Onboarding);
  const [selectedGender, setSelectedGender] = useState('');
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [dateValue, setDateValue] = useState('');
  const dispatch = useAppDispatch();

  const proceed = () => {
    navigate('Nationality', {
      token: params.token,
      email: params.email,
      password: params.password,
    });
  };

  // useEffect(() => {
  //   gender && dob && proceed();
  // }, []);

  const continueProcess = async () => {
    dispatch(setGender(selectedGender));
    dispatch(setDob(dayjs(dateValue).format('YYYY-MM-DD')));
    proceed();
  };

  console.log(selectedGender, dayjs(dateValue).format('YYYY-MM-DD'));

  useEffect(() => {
    if (isAndroid) {
      const backAction = () => {
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bodyContainer}>
        <Image source={Images.logo} resizeMode="contain" style={styles.logo} />
        <View style={styles.textBodyContainer}>
          <Text style={styles.welcomeText}>Setup Basic Profile</Text>
          <Text style={styles.getStartedText}>
            Let's get to know you more...
          </Text>
        </View>
        <View style={styles.profileStepContainer}>
          <View style={styles.profileItemStepContainer} />
          <View
            style={[styles.profileItemStepContainer, styles.notActiveStep]}
          />
        </View>
        <View style={styles.inputFormContainer}>
          <View>
            <Text style={styles.genderLabelText}>
              What Gender describes you best?
            </Text>
            <FlatList
              contentContainerStyle={styles.flatListContainer}
              data={genderRoles}
              numColumns={2}
              //@ts-ignore
              renderItem={({ item, index }) => {
                if (item.value !== 'other') {
                  return (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.6}
                      onPress={() => setSelectedGender(item.value)}
                      style={[
                        styles.genderItemContainer,
                        selectedGender === item.value && styles.selectedGender,
                      ]}>
                      <Text style={styles.genderItemText}>{item.title}</Text>
                      <Image
                        source={
                          selectedGender === item.value
                            ? Images['active-radio']
                            : Images.radio
                        }
                        resizeMode="contain"
                        style={styles.radioIcon}
                      />
                    </TouchableOpacity>
                  );
                }
                if (item.value === 'other') {
                  return (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.6}
                      onPress={() => setSelectedGender(item.value)}
                      style={[
                        styles.genderItemContainer,
                        styles.genderItemWidth,
                        selectedGender === item.value && styles.selectedGender,
                      ]}>
                      <Text style={styles.genderItemText}>{item.title}</Text>
                      <Image
                        source={
                          selectedGender === item.value
                            ? Images['active-radio']
                            : Images.radio
                        }
                        resizeMode="contain"
                        style={styles.radioIcon}
                      />
                    </TouchableOpacity>
                  );
                }
              }}
            />
          </View>
          <View>
            <CouchDatePicker
              label="Date of birth"
              dateValue={dateValue}
              setDateValue={setDateValue}
              openDateValue={openDatePicker}
              onOpenPicker={setOpenDatePicker}
            />
          </View>
        </View>
      </View>
      <LongButton
        hasLongArrow
        title="Continue"
        disabled={selectedGender && dateValue ? false : true}
        onPress={() => continueProcess()}
        loading={false}
      />
    </SafeAreaView>
  );
};

export default BasicProfile;
