import {
  View,
  Text,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import { FormTextInput, Loader, LongButton } from 'components';
import { Images } from 'theme/config';
import { styles } from './style';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthParamList } from 'utils/types/navigation-types';
import ResetPasswordHeader from '../reset-password/components/ResetPasswordHeader';
import { wp } from 'constants/layout';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { showMessage } from 'react-native-flash-message';

type AuthNavigationProps = StackNavigationProp<
  AuthParamList,
  'VerifyEmailAccount'
>;
type Props = {
  navigation: AuthNavigationProps;
};
export default function VerifyEmailAccount({
  navigation: { navigate },
}: Props) {
  const [otpNumber, setOtpNumber] = React.useState('');
  const { params } = useRoute<RouteProp<AuthParamList, 'VerifyOtp'>>();
  const [seconds, setSeconds] = React.useState(30);
  const email = params?.email;

  const {
    Auth: { resetPasswordToken, initResendToken },
  } = useDispatch();

  const loading = useSelector(
    (state: RootState) => state.loading.effects.Auth.resetPasswordToken,
  );

  const resendLoading = useSelector(
    (state: RootState) => state.loading.effects.Auth.initResendToken,
  );

  React.useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        clearInterval(myInterval);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const resendCode = async () => {
    const data = {
      email,
    };
    const res = await initResendToken(data);
    if (res) {
      setSeconds(30);
      showMessage({
        message: 'Resend token sent successfully',
        duration: 3000,
        type: 'success',
      });
    }
  };

  const verifyForgetPasswordEmail = async () => {
    const data = {
      token: otpNumber,
    };
    await resetPasswordToken(data);
    navigate('ResetPassword', { otpNumber });
  };

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
          <ResetPasswordHeader
            progressWidth={wp(98)}
            firstProgress={1}
            secondProgress={1}
          />
          <View>
            <Text style={styles.verifyAccountTextColor}>Hold on Tight</Text>
            <Text style={styles.getStartedText}>Verify your Account</Text>
            <Text style={styles.verifyAccountTextColor}>
              Hey Emmanuel, a 6-digit OTP has been sent to the mail. Kindly
              check your mail and provide OTP to verify account.
            </Text>

            <View style={styles.formContainer}>
              <FormTextInput
                label="OTP"
                autoCapitalize="none"
                keyboardType="numeric"
                onChangeText={(text: string) => setOtpNumber(text)}
                value={otpNumber}
                inputIcon={Images['help-circle']}
              />
            </View>
            <View style={styles.resendCodeContainer}>
              <Text style={styles.resendCodeText}>Didn't see the code?</Text>
              {seconds === 0 ? (
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => resendCode()}
                  style={styles.resendCodeButtonContainer}>
                  <Text style={styles.resendCodeButtonText}>Resend code</Text>
                </TouchableOpacity>
              ) : (
                <View
                  style={[
                    styles.resendCodeButtonContainer,
                    { width: wp(120) },
                  ]}>
                  <Text style={styles.resendCodeButtonText}>
                    Resend in {seconds < 10 ? `0${seconds}` : seconds}
                  </Text>
                </View>
              )}
            </View>
            <LongButton
              isNotBottom
              loading={loading}
              onPress={() => verifyForgetPasswordEmail()}
              buttonStyle={styles.buttonStyle}
              title="Verify Account"
              disabled={otpNumber.length === 6 ? false : true}
            />
          </View>
        </View>
        </KeyboardAvoidingView>
      </ImageBackground>
      <Loader loading={resendLoading} />
    </SafeAreaView>
  );
}
