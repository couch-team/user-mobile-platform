import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { Images } from 'theme/config';
import { moods } from 'constants/data';
import { LongButton } from 'components';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthParamList } from 'utils/types/navigation-types';
import PrivacyModal from './modals/PrivacyModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';

type AuthNavigationProps = StackNavigationProp<AuthParamList, 'UserOnboarding'>;
type Props = {
  navigation: AuthNavigationProps;
};

const UserOnboarding = ({ navigation: { navigate } }: Props) => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // const {
  //   User: { getUserMoods},
  // } = useDispatch();

  const {
    Auth: { getAuthenticate },
  } = useDispatch();


  useEffect(() => {
    // getUserMoods();
    getAuthenticate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authProfileDetails = useSelector(
    (state: RootState) => state.Auth.authProfile,
  );

  const completePrivacy = async () => {
    setShowPrivacyModal(false);
    setTimeout(() => {
      navigate('UserOnboarding1');
    }, 500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={Images.logo} resizeMode="contain" style={styles.logo} />
        <View style={styles.profileImageContainer}>
          <Image
            source={{uri: `${authProfileDetails?.profile?.avatar_url}`}}
            resizeMode="contain"
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Hi {authProfileDetails?.first_name},</Text>
        </View>
        <Text style={styles.instructionText}>
          Let's customize your account better you would help in answering a few
          questions. Would you love to answer the questions now?
        </Text>

        <View style={styles.moodIconContainer}>
          {moods.map(mood => {
            return (
              <TouchableOpacity key={mood.id} style={styles.moodContainer}>
                <Image
                  source={mood.icon}
                  resizeMode="contain"
                  style={styles.moodIcon}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <LongButton
          isNotBottom
          onPress={() => setShowPrivacyModal(true)}
          buttonStyle={styles.buttonStyle}
          title="Yes, proceed"
        />
        {/* <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigate('UserOnboarding1')}
          style={styles.longArrowContainer}>
          <Text style={styles.longArrowText}>No, Skip for now</Text>
          <Image
            source={Images['long-arrow']}
            resizeMode="contain"
            style={styles.longArrow}
          />
        </TouchableOpacity> */}
      </View>

      <PrivacyModal
        isVisible={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
        onComplete={completePrivacy}
      />
    </SafeAreaView>
  );
};

export default UserOnboarding;
