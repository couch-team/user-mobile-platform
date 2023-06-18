import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { Images } from 'theme/config';
import CouchDropDown from 'components/base/drop-down';
import countryData from 'constants/countries.json';
import LongButton from 'components/base/long-button';
import { AuthParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { CountryList } from './modals';

type AuthNavigationProps = StackNavigationProp<AuthParamList, 'Nationality'>;
type Props = {
  navigation: AuthNavigationProps;
};

const Nationality = ({ navigation: { navigate } }: Props) => {
  const [openCountryList, setOpenCountryList] = useState(false);
  const [openStateList, setOpenStateList] = useState(false);

  const onSelectCountry = async (selectedCountry: any) => {
    console.log('onSelectCountry', selectedCountry);
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
            />
            <CouchDropDown
              label="State of residence"
              placeholder="Select State"
              onOpenDropDown={setOpenStateList}
            />
          </View>
        </View>
      </View>
      <CountryList
        countryData={countryData}
        isVisible={openCountryList}
        onComplete={onSelectCountry}
        onClose={() => setOpenCountryList(false)}
      />

      <LongButton
        hasLongArrow
        title="Continue"
        onPress={() => navigate('UploadProfile')}
      />
    </SafeAreaView>
  );
};

export default Nationality;
