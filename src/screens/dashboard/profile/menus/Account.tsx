/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Colors, Images, Typography } from 'theme/config';
import { hp, wp } from 'constants/layout';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DashboardParamList } from 'utils/types/navigation-types';
import { FormTextInput } from 'components';
import FirstAccountModal from '../components/FirstAccountModal';
import SecondAccountModal from '../components/SecondAccountModal';
import ThirdAccountModal from '../components/ThirdAccountModal';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { $api } from 'services';
import { showMessage } from 'react-native-flash-message';
import useAppDispatch from 'hooks/useAppDispatch';
import { fetchUserDetails } from 'store/actions/userDetails';

type DashboardNavigationProps = NativeStackNavigationProp<
  DashboardParamList,
  'Account'
>;
type Props = {
  navigation: DashboardNavigationProps;
  route: any;
};

const Account = ({ navigation }: Props) => {
  const [showPassword, setShowPassword] = useState(true);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [email, setEmail] = useState('');
  const [showFirstAccountModal, setShowFirstAccountModal] = useState(false);
  const [showSecondAccountModal, setShowSecondAccountModal] = useState(false);
  const [showThirdAccountModal, setShowThirdAccountModal] = useState(false);
  const [modalEmail, setModalEmail] = useState('');
  const [modalPassword, setModalPassword] = useState('');
  const [showModalPassword, setShowModalPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { email: savedEmail } = useSelector((state: RootState) => state.Auth);

  const dispatch = useAppDispatch();

  const changePassword = async () => {
    try {
      setIsLoading(true);

      const response = await $api.post('/api/auth/password/change/', {
        old_password: password,
        password: newPassword,
        password_confirmation: newPassword,
      });
      if ($api.isSuccessful(response)) {
        showMessage({
          type: 'success',
          duration: 3000,
          message: 'Password updated successfully',
        });
        dispatch(fetchUserDetails());
        navigation.goBack();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(6, 12, 35, 1)',
        paddingHorizontal: 20,
        paddingTop: 20,
      }}>
      <FirstAccountModal
        visible={showFirstAccountModal}
        onClose={() => setShowFirstAccountModal(false)}
        animationType="fade"
        setSecondModal={() => setShowSecondAccountModal(true)}
      />
      <SecondAccountModal
        visible={showSecondAccountModal}
        onClose={() => setShowSecondAccountModal(false)}
        animationType="fade"
        modalEmail={modalEmail}
        setModalEmail={(text: string) => setModalEmail(text)}
        setShowThirdModal={() => setShowThirdAccountModal(true)}
      />
      <ThirdAccountModal
        visible={showThirdAccountModal}
        onClose={() => setShowThirdAccountModal(false)}
        animationType="fade"
        modalPassword={modalPassword}
        setModalPassword={(text: string) => setModalPassword(text)}
        showPassword={showModalPassword}
        seShowPassword={() => setShowModalPassword(!showModalPassword)}
      />
      <Pressable
        style={styles.headerLeftIconContainer}
        onPress={() => navigation.goBack()}>
        <Image
          source={Images['arrow-left-circle']}
          resizeMode="contain"
          style={[styles.backIcon]}
        />
      </Pressable>

      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ marginTop: 20, gap: 8 }}>
          <Text
            style={{
              color: 'rgba(255, 255, 255, 1)',
              fontSize: 20,
              fontFamily: Typography.fontFamily.SoraBold,
            }}>
            Account Settings
          </Text>
          <Text
            style={{
              color: 'rgba(159, 152, 178, 1)',
              fontSize: 14,
              fontFamily: Typography.fontFamily.SoraRegular,
            }}>
            Join Individuals of like minds and share.
          </Text>
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: 'rgba(227, 228, 248, 0.12)',
            padding: 20,
            borderRadius: 16,
            marginTop: 10,
            width: '100%',
            // paddingHorizontal: 20,
          }}>
          <Text
            style={{
              color: 'rgba(255, 255, 255, 1)',
              fontSize: 16,
              fontFamily: Typography.fontFamily.SoraRegular,
              marginBottom: 20,
            }}>
            Change Password
          </Text>

          <FormTextInput
            label="Password"
            isPassword
            show={showPassword}
            placeholder="Enter current password"
            onChangeText={(text: string) => setPassword(text)}
            value={password}
            showPassword={() => setShowPassword(!showPassword)}
            inputIcon={Images['help-circle']}
            containerStyle={{ width: '100%' }}
          />

          <FormTextInput
            label="New Password"
            isPassword
            show={showNewPassword}
            placeholder="Enter new password"
            onChangeText={(text: string) => setNewPassword(text)}
            value={newPassword}
            showPassword={() => setShowNewPassword(!showNewPassword)}
            inputIcon={Images['help-circle']}
            containerStyle={{ width: '100%' }}
          />

          <Pressable
            style={{
              backgroundColor: 'rgba(115, 120, 222, 1)',
              padding: 12,
              borderRadius: 64,
              height: 56,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: !password || !newPassword ? 0.4 : 1,
              marginTop: 10,
            }}
            onPress={changePassword}>
            {isLoading ? (
              <ActivityIndicator size={'small'} color={'white'} />
            ) : (
              <Text
                style={{
                  color: 'rgba(255, 255, 255, 1)',
                  fontFamily: Typography.fontFamily.SoraMedium,
                  fontSize: 16,
                }}>
                Change Password
              </Text>
            )}
          </Pressable>
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: 'rgba(227, 228, 248, 0.12)',
            padding: 20,
            borderRadius: 16,
            marginTop: 20,
            width: '100%',
            // paddingHorizontal: 20,
          }}>
          <Text
            style={{
              color: 'rgba(255, 255, 255, 1)',
              fontSize: 16,
              fontFamily: Typography.fontFamily.SoraRegular,
              marginBottom: 20,
            }}>
            Change of Email Address
          </Text>

          <FormTextInput
            label="Email address"
            editable
            placeholder="Enter your email"
            // autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={(text: string) => setEmail(text)}
            value={email || savedEmail}
            containerStyle={{
              width: '100%',
              color: '#8A8EE3',
            }}
            // style={{
            //   fontSize: 14,
            //   fontFamily: Typography.fontFamily.SoraMedium,
            // }}
          />

          <Pressable
            style={{
              backgroundColor: 'rgba(115, 120, 222, 1)',
              padding: 12,
              borderRadius: 64,
              height: 56,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: !email ? 0.4 : 1,
              marginTop: 10,
            }}
            onPress={() => setShowFirstAccountModal(true)}>
            <Text
              style={{
                color: 'rgba(255, 255, 255, 1)',
                fontFamily: Typography.fontFamily.SoraMedium,
                fontSize: 16,
              }}>
              Request Change
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  backIcon: {
    width: wp(24),
    height: hp(24),
    resizeMode: 'contain',
  },
  headerLeftIconContainer: {
    width: 30,
    padding: 20,
    height: 36,
    backgroundColor: Colors.COUCH_BLUE_600,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
