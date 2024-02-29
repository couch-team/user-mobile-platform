import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { Images } from 'theme/config';
import { CouchDropDown, LongButton } from 'components';
import { AuthParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { CountryList, StatesList } from './modals';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';

type AuthNavigationProps = StackNavigationProp<AuthParamList, 'Nationality'>;
type Props = {
  navigation: AuthNavigationProps;
};

interface SelectedCountryProps {
  name: string;
  code: string;
}

const Nationality = ({ navigation: { navigate } }: Props) => {
  const [openCountryList, setOpenCountryList] = useState(false);
  const [openStateList, setOpenStateList] = useState(false);
  const [selectedCountry, setSelectedCountry] =
    useState<SelectedCountryProps>();
  const [selectedState, setSelectedState] = useState('');

  const {
    User: {pendingProfileCountry ,pendingProfileState},
  } = useDispatch();
  
  const onSelectCountry = async (selectedUserCountry: SelectedCountryProps) => {
    setSelectedCountry(selectedUserCountry);
  };
  const onSelectState = async (selectedUserState: string) => {
    setSelectedState(selectedUserState);
  };


  const completeProfile = async () => {
    const res = await pendingProfileCountry(selectedCountry?.code)
    const resp = await pendingProfileState(selectedState)
      if(resp && res ){
        navigate('UploadProfile');
      }
        
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
              dropDownValue={selectedCountry?.name}
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
        onComplete={onSelectCountry}
        onClose={() => setOpenCountryList(false)}
      />
      <StatesList
        isVisible={openStateList}
        onClose={() => setOpenStateList(false)}
        onComplete={onSelectState}
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
