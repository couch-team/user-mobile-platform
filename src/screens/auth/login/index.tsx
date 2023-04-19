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

type AuthNavigationProps = StackNavigationProp<AuthParamList, 'Login'>;
type Props = {
  navigation: AuthNavigationProps;
};

const Login = ({ navigation: { navigate } }: Props) => {
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
              <FormTextInput label="Email address" />
              <FormTextInput
                label="Password"
                isPassword
                inputIcon={Images['help-circle']}
              />
            </View>
            <LongButton
              isNotBottom
              buttonStyle={styles.buttonStyle}
              title="Log In to Account"
              disabled
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
