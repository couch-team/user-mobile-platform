import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { Images } from 'theme/config';
import { CouchDropDown, LongButton } from 'components';
import { AuthParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { CountryList, StatesList } from './modals';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
// import useAppDispatch from 'hooks/useAppDispatch';
// import { setCountry, setStateOfResidence } from 'store/slice/onboardingSlice';
import { countryList } from 'constants/data';
import { setCountry, setStateOfResidence } from 'store/slice/onboardingSlice';

type AuthNavigationProps = StackNavigationProp<AuthParamList, 'Nationality'>;
type Props = {
  navigation: AuthNavigationProps;
};

const Nationality = ({ navigation: { navigate } }: Props) => {
  const { country, state_of_residence } = useSelector(
    (state: RootState) => state.Onboarding,
  );
  const [openCountryList, setOpenCountryList] = useState(false);
  const [openStateList, setOpenStateList] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>(country || '');
  const [selectedState, setSelectedState] = useState(state_of_residence || '');
  // const dispatch = useAppDispatch();
  const dispatch = useAppDispatch();
  
  const proceed = () => {
    navigate('UploadProfile');
  };

  const completeProfile = () => {
    dispatch(setCountry(selectedCountry));
    dispatch(setStateOfResidence(selectedState));
    proceed()

  // const completeProfile = () => {
  //   dispatch(setCountry(selectedCountry));
  //   dispatch(setStateOfResidence(selectedState));
  // };


  useEffect(() => {
    selectedCountry && state_of_residence && proceed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry, state_of_residence]);

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
          <View style={[styles.profileItemStepContainer]} />
        </View>
        <View style={styles.inputFormContainer}>
          <View>
            <CouchDropDown
              label="Country"
              placeholder="Select your country"
              onOpenDropDown={setOpenCountryList}
              dropDownValue={
                countryList.find(countrys => countrys.code === selectedCountry)
                  ?.name
              }
              openDropDown={openCountryList}
            />
            <CouchDropDown
              label="State of residence"
              placeholder="Select State"
              onOpenDropDown={setOpenStateList}
              openDropDown={openStateList}
              dropDownValue={selectedState}
            />
          </View>
        </View>
      </View>
      <CountryList
        isVisible={openCountryList}
        onComplete={data => setSelectedCountry(data?.code)}
        onClose={() => setOpenCountryList(false)}
      />
      <StatesList
        isVisible={openStateList}
        onClose={() => setOpenStateList(false)}
        onComplete={data => setSelectedState(data)}
      />

      <LongButton
        hasLongArrow
        title="Continue"
        // loading={loading}
        disabled={selectedCountry && selectedState ? false : true}
        onPress={() => completeProfile()}
      />
    </SafeAreaView>
  );
};

export default Nationality;
