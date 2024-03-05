import {
  View,
  Text,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState } from 'react';
import { FormTextInput, LongButton } from 'components';
import { Images } from 'theme/config';
import { styles } from '../verify-email/style';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthParamList } from 'utils/types/navigation-types';
import ResetPasswordHeader from '../reset-password/components/ResetPasswordHeader';
import { wp } from 'constants/layout';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { $api } from 'services';
import { showMessage } from 'react-native-flash-message';

type AuthNavigationProps = StackNavigationProp<AuthParamList, 'ResetPassword'>;
type Props = {
  navigation: AuthNavigationProps;
};
export default function ResetPassword({ navigation: { navigate } }: Props) {
  const { params } = useRoute<RouteProp<AuthParamList, 'ResetPassword'>>();
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(true);
  const token = params?.otpNumber;
  const [ is_loading, setIsLoading ] = useState(false);

  const resetPassword = async () => {
    try{
      setIsLoading(true)
      const response = await $api.post('/api/auth/password_reset/confirm/', {
        password,
        token,
      })
      if($api.isSuccessful(response)){
        navigate('Login');
        showMessage({
          message: 'Password updated successfully',
          type: 'success',
          duration: 3000,
        })
      }
    }
    catch(err){
      console.log(err)
    }
    finally{
      setIsLoading(false)
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
          <ResetPasswordHeader
            progressWidth={wp(98)}
            firstProgress={1}
            secondProgress={1}
          />
           
          <View>
            <Text style={styles.verifyAccountTextColor}>Get back on Track!...</Text>
            <Text style={styles.getStartedText}>Set New Password</Text>
            <Text style={styles.verifyAccountTextColor}>
            Hurray, your account is safe. Kindly enter in a new password to complete account recovery.
            </Text>
           
            <View style={styles.formContainer}>
              <FormTextInput
                label="New Password"
                isPassword
                show={showPassword}
                onChangeText={(text: string) => setPassword(text)}
                value={password}
                showPassword={() => setShowPassword(!showPassword)}
                inputIcon={Images['help-circle']}
              />
            </View>
            <LongButton
              isNotBottom
              loading={is_loading}
              onPress={() => resetPassword()}
              buttonStyle={styles.buttonStyle}
              title="Save New Password"
              disabled={password ? false : true}
            />
          </View>
          <View style={styles.infoContainer}>
          <Image
            source={Images.info}
            resizeMode="contain"
            style={styles.infoIcon}
            // style={styles.in}
          />
          <Text style={styles.infoText}>Try not to forget this password.</Text>
          </View>
        </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}
