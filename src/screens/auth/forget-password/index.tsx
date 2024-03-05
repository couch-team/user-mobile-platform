import { View, Text, ImageBackground, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import { styles } from './style';
import { Images } from 'theme/config';
import { FormTextInput, LongButton } from 'components';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthParamList } from 'utils/types/navigation-types';
import ResetPasswordHeader from '../reset-password/components/ResetPasswordHeader';
import { wp } from 'constants/layout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { showMessage } from 'react-native-flash-message';
import { $api } from 'services';

type AuthNavigationProps = StackNavigationProp<AuthParamList, 'ForgetPassword'>;
type Props = {
  navigation: AuthNavigationProps;
};

export default function ForgetPassword({ navigation: { navigate } }: Props) {
  const [ is_loading, setIsLoading ] = useState(false);
  const [email, setEmail] = React.useState('');

  const isDisabled = email ? false : true;

  const submitEmail = async () => {
    if (!email) {
      return showMessage({
        message: 'Please enter a valid email address',
        duration: 2000,
        type: 'danger',
      });
    }
    sendOtp();
  }

  const sendOtp = async() => {
    try{
      setIsLoading(true)
      const response = await $api.post('/api/auth/password_reset/',{
        email
      })
      if($api.isSuccessful(response)){
        navigate('VerifyEmailAccount',{email});
      }
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
        <View style={styles.bodyContainer}>
          <ResetPasswordHeader
            progressWidth={wp(98)} firstProgress={1} />
          <View>
            <Text style={styles.forgetPassTextColor}>Hey there It’s alright</Text>
            <Text style={styles.getStartedText}>
              Let’s help you recover your account
            </Text>
            <Text style={styles.forgetPassTextColor}>
              Kindly enter the email address used in registering on the Couch
              platform.
            </Text>
            <View style={styles.formContainer}>
              <FormTextInput
                label="Email address"
                autoCapitalize="none"
                placeholder='Enter your email'
                keyboardType="email-address"
                onChangeText={(text: string) => setEmail(text)}
                value={email}
                inputIcon={Images['help-circle']}
              />
            </View>
            <LongButton
              isNotBottom
              onPress={() => submitEmail()}
              loading={is_loading}
              buttonStyle={styles.buttonStyle}
              title="Verify Account"
              disabled={isDisabled}
            />
            <View style={styles.iconContainer}>
              <Text style={styles.forgetPassText}>Stuck?</Text>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={Images['contact-support']}
                  resizeMode="cover"
                  style={styles.contactIcon}
                />
                <TouchableOpacity>
                  <Text
                    // onPress={() => navigate('Register')}
                    style={styles.forgetPassLink}>
                    Contact Support
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>

  );
}
