import React, { useEffect, useState } from 'react';
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
import { Images } from 'theme/config';
import { FormTextInput, Loader, LongButton } from 'components';
import { AuthParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import * as yup from 'yup';
import { Formik } from 'formik';
import { showMessage } from 'react-native-flash-message';
import { wp } from 'constants/layout';
import { RouteProp, useRoute } from '@react-navigation/native';
import { navigationRef } from 'navigation/utils';
import { $api } from 'services';
import useAppDispatch from 'hooks/useAppDispatch';
import { login as loginAction } from 'store/actions/login';
// import { NavigationContext } from 'navigation';


type AuthNavigationProps = StackNavigationProp<AuthParamList, 'VerifyOtp'>;
type Props = {
  navigation: AuthNavigationProps;
};

const registerSchema = yup.object().shape({
  otp: yup.string().required('Otp is required'),
});

const VerifyOtp = ({ navigation: { navigate } }: Props) => {
  const { params } = useRoute<RouteProp<AuthParamList, 'VerifyOtp'>>();
  const [seconds, setSeconds] = useState(30);
  const email = params?.email;
  const [ resendCodeLoading, setResendCodeLoading ] = useState(false);
  const [ is_loading, setIsLoading ] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
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
    try{
      setResendCodeLoading(true);
      const response = await $api.post('/api/auth/otp/resend/', {
        email
      })
      if($api.isSuccessful(response)){
        setSeconds(30);
        showMessage({
          message: 'Resend token sent successfully',
          duration: 3000,
          type: 'success',
        });
      }
    }
    catch(err){
      console.log(err)
    }
    finally{
      setResendCodeLoading(false)
    }
  };

 
  // const completeVerification = async (values: any) => {
  //   const data = {
  //     email,
  //     otp: values.otp,
  //   };
  //   const res = await verifyEmailAccount(data);
  //   if (res) {
  //     navigate('L');
  //   }
  // };

  const verifyToken = async(values: any) => {
    try{
      setIsLoading(true);
      const response = await $api.post('/api/auth/otp/verify/', {
        email,
        password: params.password,
        otp: values?.otp
      })
      if($api.isSuccessful(response)){
        login()
      }
    }
    catch(err){
      console.log(err)
    }
  }

  const login = async() => {
    try{
      setIsLoading(true)
      await dispatch(loginAction({ email: email || '', password: params?.password || '' }))
    }
    catch(err){
      console.log(err)
    }
    finally{
      setIsLoading(false)
    }
  }

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
          <Formik
            initialValues={{
              otp: '',
            }}
            validateOnBlur={true}
            validationSchema={registerSchema}
            onSubmit={verifyToken}>
            {({ errors, handleChange, values }) => {
              return (
                <>
                  <View style={styles.bodyContainer}>
                    <Text style={styles.welcomeText}>Welcome to couch</Text>
                    <Text style={styles.getStartedText}>
                      Verify your Email Address
                    </Text>
                    <View style={styles.formContainer}>
                      <Text style={styles.instructionText}>
                        A 6-digit OTP has been sent to the mail. Kindly check
                        your mail and provide OTP to verify account.
                      </Text>
                      <View style={styles.emailTextContainer}>
                        <Text style={styles.emailText}>{email}</Text>
                      </View>

                      <FormTextInput
                        label="OTP"
                        onChangeText={handleChange('otp')}
                        value={values.otp}
                        hasError={errors.otp}
                      />
                    </View>
                    <View style={styles.resendCodeContainer}>
                      <Text style={styles.resendCodeText}>
                        Didn't see the code?
                      </Text>
                      {seconds === 0 ? (
                        <TouchableOpacity
                          activeOpacity={0.6}
                          onPress={() => resendCode()}
                          style={styles.resendCodeButtonContainer}>
                          <Text style={styles.resendCodeButtonText}>
                            Resend code
                          </Text>
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
                  </View>
                  <LongButton
                    onPress={() => verifyToken(values)}
                    buttonStyle={styles.buttonStyle}
                    title="Verify Email Address"
                    disabled={values.otp.length === 6 ? false : true}
                    loading={is_loading}
                  />
                </>
              );
            }}
          </Formik>
        </KeyboardAvoidingView>
      </ImageBackground>
      <Loader loading={resendCodeLoading} />
    </SafeAreaView>
  );
};

export default VerifyOtp;
