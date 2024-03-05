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
import { Images } from 'theme/config';
import { FormTextInput, LongButton } from 'components';
import { AuthParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { showMessage } from 'react-native-flash-message';
import { $api } from 'services';
import useAppDispatch from 'hooks/useAppDispatch';
import { setAccessToken, setRefreshToken, setEmail as setStoreEmail, login as loginAction } from 'store/slice/authSlice';

type AuthNavigationProps = StackNavigationProp<AuthParamList, 'Login'>;
type Props = {
  navigation: AuthNavigationProps;
};

const Login = ({ navigation: { navigate } }: Props) => {
  const [ loading, setLoading ] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const dispatch = useAppDispatch()

  const login = async() => {
    try{
      setLoading(true)
      await dispatch(loginAction({ email, password }))
    }
    catch(err){
      console.log(err)
    }
    finally{
      setLoading(false)
    }
  }

  const isDisabled = email && password ? false : true;

  const loginAccount = async () => {
    if (!email) {
      return showMessage({
        message: 'Please enter a valid email address',
        duration: 2000,
        type: 'danger',
      });
    }
    if (!password) {
      return showMessage({
        message: 'Please enter a password',
        duration: 2000,
        type: 'danger',
      });
    }
    const data = {
      email,
      password,
    };
    await login();
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
            <Text style={styles.welcomeText}>Login</Text>
            <Text style={styles.getStartedText}>Welcome Back...</Text>
            <View style={styles.formContainer}>
              <FormTextInput
                label="Email address"
                editable
                placeholder='Enter your email'
                // autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(text: string) => setEmail(text)}
                value={email}
              />
              <FormTextInput
                label="Password"
                isPassword
                show={showPassword}
                placeholder='Enter your password'
                onChangeText={(text: string) => setPassword(text)}
                value={password}
                showPassword={() => setShowPassword(!showPassword)}
                inputIcon={Images['help-circle']}
              />
            </View>
            <View style={styles.forgetPassContainer}>
              <TouchableOpacity>
                <Text
                  onPress={() => navigate('ForgetPassword')}
                  style={styles.forgetPassText}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.forgetPassBtn} onPress={() => navigate('ForgetPassword')}>
                <Text
                  numberOfLines={1}
                  style={styles.forgetPassLink}>
                  Let’s help out
                </Text>
              </TouchableOpacity>
            </View>
            <LongButton
              isNotBottom
              loading={loading}
              onPress={loginAccount}
              buttonStyle={styles.buttonStyle}
              title="Log In to Account"
              disabled={isDisabled}
            />
            <View style={styles.signInLinkContainer}>
              <Text style={styles.signInText}>No account?</Text>
              <TouchableOpacity>
                <Text
                  onPress={() => navigate('Register')}
                  style={styles.signInLink}>
                  Create an account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Login;
