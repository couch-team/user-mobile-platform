import React, { useState } from 'react';
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

type AuthNavigationProps = StackNavigationProp<AuthParamList, 'Register'>;
type Props = {
  navigation: AuthNavigationProps;
};

const Register = ({ navigation: { navigate } }: Props) => {
  const [acceptTerms, setAcceptTerms] = useState(false);
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
            <Text style={styles.getStartedText}>Let's get you Started</Text>
            <View style={styles.formContainer}>
              <FormTextInput label="Fullname" />
              <FormTextInput label="Email address" />
              <FormTextInput
                label="Password"
                isPassword
                inputIcon={Images['help-circle']}
              />
            </View>
            <View style={styles.termsTextContainer}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setAcceptTerms(!acceptTerms)}>
                <Image
                  source={
                    acceptTerms ? Images['active-checkbox'] : Images.checkbox
                  }
                  resizeMode="contain"
                  style={styles.checkBox}
                />
              </TouchableOpacity>
              <Text style={styles.termsText}>
                I agree with the{' '}
                <Text style={styles.termsLink}>Terms & Conditions</Text> of
                Couch
              </Text>
            </View>
            <LongButton
              isNotBottom
              buttonStyle={styles.buttonStyle}
              title="Get Started"
              onPress={() => navigate('VerifyOtp')}
            />
            <View style={styles.signInLinkContainer}>
              <Text style={styles.signInText}>Have an account?</Text>
              <TouchableOpacity>
                <Text
                  onPress={() => navigate('Login')}
                  style={styles.signInLink}>
                  Sign in
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Register;
