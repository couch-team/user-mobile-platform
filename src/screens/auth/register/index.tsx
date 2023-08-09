import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { styles } from './style';
import { Images } from 'theme/config';
import { FormTextInput, LongButton } from 'components';
import { AuthParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';

type AuthNavigationProps = StackNavigationProp<AuthParamList, 'Register'>;
type Props = {
  navigation: AuthNavigationProps;
};

const registerSchema = Yup.object().shape({
  fullName: Yup.string().required('Fullname is required'),
  email: Yup.string().email().required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

const Register = ({ navigation: { navigate } }: Props) => {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const {
    Auth: { register },
  } = useDispatch();
  const isLoading = useSelector(
    (state: RootState) => state.loading.effects.Auth.register,
  );

  const handleSubmit = async (values: any) => {
    const { fullName, password, email } = values;
    const data = {
      full_name: fullName,
      password,
      email,
      role: 2,
    };
    const res = await register(data);
    if (res) {
      navigate('VerifyOtp', { email });
    }
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
            <Text style={styles.welcomeText}>Welcome to couch</Text>
            <Text style={styles.getStartedText}>Let's get you Started</Text>
            <Formik
              initialValues={{
                fullName: '',
                email: '',
                password: '',
                terms: false,
              }}
              validateOnBlur={true}
              validationSchema={registerSchema}
              onSubmit={handleSubmit}>
              {({ errors, handleChange, values, isValid }) => {
                return (
                  <>
                    <View style={styles.formContainer}>
                      <FormTextInput
                        label="Fullname"
                        onChangeText={handleChange('fullName')}
                        hasError={errors.fullName}
                        value={values.fullName}
                      />
                      <FormTextInput
                        label="Email address"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onChangeText={handleChange('email')}
                        value={values.email}
                        hasError={errors.email}
                      />
                      <FormTextInput
                        label="Password"
                        isPassword
                        show={showPassword}
                        showPassword={() => setShowPassword(!showPassword)}
                        hasError={errors.password}
                        onChangeText={handleChange('password')}
                        value={values.password}
                        inputIcon={Images['help-circle']}
                      />
                    </View>
                    <View style={styles.termsTextContainer}>
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => setAcceptTerms(!acceptTerms)}>
                        <Image
                          source={
                            acceptTerms
                              ? Images['active-checkbox']
                              : Images.checkbox
                          }
                          resizeMode="contain"
                          style={styles.checkBox}
                        />
                      </TouchableOpacity>
                      <Text style={styles.termsText}>
                        I agree with the{' '}
                        <Text style={styles.termsLink}>Terms & Conditions</Text>{' '}
                        of Couch
                      </Text>
                    </View>
                    <LongButton
                      isNotBottom
                      buttonStyle={styles.buttonStyle}
                      title="Get Started"
                      loading={isLoading}
                      disabled={isValid && acceptTerms ? false : true}
                      onPress={() => handleSubmit(values)}
                    />
                  </>
                );
              }}
            </Formik>
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
