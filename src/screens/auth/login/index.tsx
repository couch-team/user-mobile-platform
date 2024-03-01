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
import { FormTextInput, LongButton } from 'components';
import { AuthParamList } from 'utils/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { showMessage } from 'react-native-flash-message';

type AuthNavigationProps = StackNavigationProp<AuthParamList, 'Login'>;
type Props = {
  navigation: AuthNavigationProps;
};

const Login = ({ navigation: { navigate } }: Props) => {
  const {
    Auth: { login,getAuthenticate},
  } = useDispatch();



  const loading = useSelector(
    (state: RootState) => state.loading.effects.Auth.login,
  );

  

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const isDisabled = email && password ? false : true;

  const loginAccount = async () => {
    console.log('hhh')
    // eslint-disable-next-line no-useless-escape 
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
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
      // console.log('Logging in with email:', email && data);
      await login(data);
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
                // autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(text: string) => setEmail(text)}
                value={email}
              />
              <FormTextInput
                label="Password"
                isPassword
                show={showPassword}
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

              <TouchableOpacity style={styles.forgetPassBtn}>
                <Text
                  // onPress={() => navigate('Register')}
                  style={styles.forgetPassLink}>
                  Let’s help out
                </Text>
              </TouchableOpacity>
            </View>
            <LongButton
              isNotBottom
              loading={loading}
              onPress={() => loginAccount()}
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


