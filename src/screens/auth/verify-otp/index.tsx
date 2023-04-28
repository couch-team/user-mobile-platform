import React from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { Images } from '../../../theme/config';
import FormTextInput from '../../../components/base/form-input';
import LongButton from '../../../components/base/long-button';
import { AuthParamList } from '../../../utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppRoute } from 'hooks/navigation';

type AuthNavigationProps = StackNavigationProp<AuthParamList, 'VerifyOtp'>;
type Props = {
  navigation: AuthNavigationProps;
};

const VerifyOtp = ({ navigation: { navigate } }: Props) => {
  const { params } = useAppRoute();
  const email = params?.email;
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={Images.background} style={styles.imageBg}>
        <View style={styles.logoContainer}>
          <Image
            source={Images.logo}
            resizeMode="contain"
            style={styles.logo}
          />
        </View>
        <KeyboardAvoidingView behavior="position">
          <View style={styles.bodyContainer}>
            <Text style={styles.welcomeText}>Welcome to couch</Text>
            <Text style={styles.getStartedText}>Verify your Email Address</Text>
            <View style={styles.formContainer}>
              <Text style={styles.instructionText}>
                A 6-digit OTP has been sent to the mail. Kindly check your mail
                and provide OTP to verify account.
              </Text>
              <View style={styles.emailTextContainer}>
                <Text style={styles.emailText}>{email}</Text>
              </View>
              <FormTextInput label="OTP" />
            </View>
            <View style={styles.resendCodeContainer}>
              <Text style={styles.resendCodeText}>Didn’t see the code?</Text>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.resendCodeButtonContainer}>
                <Text style={styles.resendCodeButtonText}>Resend code</Text>
              </TouchableOpacity>
            </View>
          </View>
          <LongButton
            onPress={() => navigate('BasicProfile')}
            buttonStyle={styles.buttonStyle}
            title="Verify Email Address"
          />
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default VerifyOtp;
