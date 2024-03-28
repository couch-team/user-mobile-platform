import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { Images } from 'theme/config';
import { CouchDropDown, LongButton } from 'components';
import { AuthParamList } from 'utils/types/navigation-types';
import { CountryList, StatesList } from './modals';
import { countryList } from 'constants/data';
import { setCountry, setStateOfResidence } from 'store/slice/onboardingSlice';
import useAppDispatch from 'hooks/useAppDispatch';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useRoute } from '@react-navigation/native';

type AuthNavigationProps = NativeStackNavigationProp<
  AuthParamList,
  'Nationality'
>;
type Props = {
  navigation: AuthNavigationProps;
};

const Nationality = ({ navigation: { navigate } }: Props) => {
  const { params } = useRoute<RouteProp<AuthParamList, 'Nationality'>>();
  const [openCountryList, setOpenCountryList] = useState(false);
  const [openStateList, setOpenStateList] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedState, setSelectedState] = useState('');
  const dispatch = useAppDispatch();

  const proceed = () => {
    navigate('UploadProfile', {
      token: params.token,
      email: params.email,
      password: params.password,
    });
  };

  const completeProfile = () => {
    dispatch(setCountry(selectedCountry));
    dispatch(setStateOfResidence(selectedState));
    proceed();
  };

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
// };
export default Nationality;
