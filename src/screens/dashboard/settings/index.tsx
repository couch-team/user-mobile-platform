/* eslint-disable react-native/no-inline-styles */
import useAppDispatch from 'hooks/useAppDispatch';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { logout } from 'store/actions/logout';
import { styles } from './styles';
import { Images, Typography } from 'theme/config';
import { SettingsMenus } from 'constants/data';
import { useNavigation } from '@react-navigation/native';
import { $api } from 'services';
import { showMessage } from 'react-native-flash-message';

const Settings = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const deleteAccount = async () => {
    try {
      setIsLoading(true);

      const response = await $api.delete('/api/user/destroy/');
      if ($api.isSuccessful(response)) {
        showMessage({
          type: 'success',
          duration: 3000,
          message: 'Account deleted successfully',
        });
        setShowDeleteModal(false);
        dispatch(logout());
        navigation.goBack();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}>
        <Pressable
          onPress={() => setShowDeleteModal(false)}
          style={[
            styles.modalBackdrop,
            {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
          ]}>
          <Pressable onPress={() => {}} style={[styles.modalContainer]}>
            <View style={{ gap: 20 }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  fontFamily: Typography.fontFamily.SoraMedium,
                }}>
                Are you sure you want to delete your account??
              </Text>

              <Pressable
                style={{
                  backgroundColor: 'rgba(229, 0, 0, 0.36)',
                  height: 50,
                  borderRadius: 64,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={deleteAccount}>
                {isLoading ? (
                  <ActivityIndicator size={'small'} color={'white'} />
                ) : (
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontSize: 16,
                      fontFamily: Typography.fontFamily.SoraMedium,
                    }}>
                    Yes, I'm sure
                  </Text>
                )}
              </Pressable>

              <Pressable
                style={{
                  backgroundColor: '#E6E7F914',
                  height: 50,
                  borderRadius: 64,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => setShowDeleteModal(false)}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 16,
                    fontFamily: Typography.fontFamily.SoraMedium,
                  }}>
                  No, This was a Mistake
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Image
          source={require('../../../../assets/couch.png')}
          style={{ width: 88, height: 22, resizeMode: 'cover' }}
        />

        <View
          style={{
            backgroundColor: 'rgba(238, 239, 251, 0.12)',
            padding: 10,
            paddingHorizontal: 13,
            borderRadius: 100,
          }}>
          <Image
            source={Images.notification}
            style={{ width: 20, height: 23, resizeMode: 'contain' }}
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={{ gap: 5, marginVertical: 20 }}>
          <Text
            style={{
              color: 'rgba(255, 255, 255, 1)',
              fontSize: 28,
              fontFamily: Typography.fontFamily.SoraMedium,
            }}>
            Settings
          </Text>
          <Text
            style={{
              color: 'rgba(159, 152, 178, 1)',
              fontSize: 14,
              fontFamily: Typography.fontFamily.SoraRegular,
            }}>
            What would you like to do today?...
          </Text>
        </View>

        {SettingsMenus.map(menu => (
          <Pressable
            style={{
              marginVertical: 5,
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: 'rgba(227, 228, 248, 0.12)',
              borderRadius: 16,
              padding: 15,
              gap: 12,
            }}
            onPress={() => {
              menu.title === 'Delete Account'
                ? setShowDeleteModal(true)
                : navigation.navigate(menu.screen);
            }}
            key={menu.id}>
            <View
              style={{
                backgroundColor: 'rgba(238, 239, 251, 0.09)',
                padding: 10,
                borderRadius: 100,
              }}>
              <Image
                source={menu.imgUrl}
                style={{ width: 24, height: 24, resizeMode: 'contain' }}
              />
            </View>

            <View style={{ gap: 8 }}>
              <Text
                style={{
                  color:
                    menu.title === 'Delete Account'
                      ? '#F56969'
                      : 'rgba(227, 228, 248, 1)',
                  fontSize: 16,
                  fontFamily: Typography.fontFamily.SoraMedium,
                }}>
                {menu.title}
              </Text>
              <Text
                style={{
                  color: 'rgba(159, 152, 178, 1)',
                  fontSize: 12,
                  fontFamily: Typography.fontFamily.SoraRegular,
                }}>
                {menu.desc}
              </Text>
            </View>
          </Pressable>
        ))}

        <Pressable
          style={{
            marginVertical: 5,
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'rgba(227, 228, 248, 0.12)',
            borderRadius: 16,
            padding: 15,
            gap: 12,
          }}
          onPress={() => dispatch(logout())}>
          <View
            style={{
              backgroundColor: 'rgba(238, 239, 251, 0.09)',
              padding: 10,
              borderRadius: 100,
            }}>
            <Image
              source={Images.logout}
              style={{ width: 24, height: 24, resizeMode: 'contain' }}
            />
          </View>

          <View style={{ gap: 8 }}>
            <Text
              style={{
                color: 'rgba(245, 105, 105, 1)',
                fontSize: 16,
                fontFamily: Typography.fontFamily.SoraMedium,
              }}>
              Log Out
            </Text>
            <Text
              style={{
                color: 'rgba(159, 152, 178, 1)',
                fontSize: 12,
                fontFamily: Typography.fontFamily.SoraRegular,
              }}>
              You can always come back!
            </Text>
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default Settings;
