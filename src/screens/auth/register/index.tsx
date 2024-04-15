import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { styles } from './style';
import { Images } from 'theme/config';
import { FormTextInput, LongButton } from 'components';
import { AuthParamList } from 'utils/types/navigation-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { $api } from 'services';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AuthNavigationProps = NativeStackNavigationProp<AuthParamList, 'Register'>;
type Props = {
  navigation: AuthNavigationProps;
};

const registerSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email().required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

const Register = ({ navigation: { navigate } }: Props) => {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [is_loading, setIsLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    const { firstName, lastName, password, email } = values;
    try {
      setIsLoading(true);
      const response = await $api.post('/api/auth/register/', {
        first_name: firstName,
        last_name: lastName,
        password,
        email: email.toLowerCase(),
        role: 2,
      });
      if ($api.isSuccessful(response)) {
        console.log(response.data?.tokens?.access);
        const token = response.data?.tokens?.access;
        navigate('VerifyOtp', { email, password, token });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ImageBackground source={Images.background} style={styles.imageBg}>
          <View style={styles.logoContainer}>
            <Image
              source={Images.logo}
              resizeMode="contain"
              style={styles.logo}
            />
          </View>
          {/* <KeyboardAvoidingView behavior="position"> */}
          <View style={styles.bodyContainer}>
            <Text style={styles.welcomeText}>Welcome to couch</Text>
            <Text style={styles.getStartedText}>Let's get you Started</Text>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
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
                        label="First Name"
                        onChangeText={handleChange('firstName')}
                        hasError={errors.firstName}
                        value={values.firstName}
                      />
                      <FormTextInput
                        label="Last Name"
                        onChangeText={handleChange('lastName')}
                        hasError={errors.lastName}
                        value={values.lastName}
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
                      loading={is_loading}
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
          {/* </KeyboardAvoidingView> */}
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
