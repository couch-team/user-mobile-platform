/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Colors, Images, Typography } from 'theme/config';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DashboardParamList } from 'utils/types/navigation-types';
import { hp, wp } from 'constants/layout';
import SubscriptionTypes from '../components/SubscriptionTypes';
import PaymentCard from '../components/PaymentCard';
import { Billings, PaymentCards, Subscriptions } from 'constants/data';
import SubscriptionModal from '../components/SubscriptionModal';

type DashboardNavigationProps = NativeStackNavigationProp<
  DashboardParamList,
  'Subscription'
>;
type Props = {
  navigation: DashboardNavigationProps;
  route: any;
};

const Subscription = ({ navigation }: Props) => {
  const [activeSub, setActiveSub] = useState('');
  const [paymentActive, setPaymentActive] = useState('');
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [subType, setSubType] = useState<any>({});

  const handleSubscriptionClick = (id: string) => {
    setActiveSub(id); // Update selected state
  };

  const handlePaymentClick = (id: string) => {
    setPaymentActive(id);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(6, 12, 35, 1)',

        paddingTop: 20,
      }}>
      <SubscriptionModal
        visible={showSubscriptionModal}
        animationType="fade"
        onClose={() => setShowSubscriptionModal(false)}
        subDesc={subType?.desc}
        subType={subType?.title}
      />
      <View style={{ paddingHorizontal: 20 }}>
        <Pressable
          style={styles.headerLeftIconContainer}
          onPress={() => navigation.goBack()}>
          <Image
            source={Images['arrow-left-circle']}
            resizeMode="contain"
            style={[styles.backIcon]}
          />
        </Pressable>
      </View>

      <ScrollView>
        <View style={{ marginTop: 20, gap: 8, paddingHorizontal: 20 }}>
          <Text
            style={{
              color: 'rgba(255, 255, 255, 1)',
              fontSize: 20,
              fontFamily: Typography.fontFamily.SoraBold,
            }}>
            Subscription & Payments
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

        <View style={{ paddingLeft: 20 }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: Typography.fontFamily.SoraMedium,
              color: '#E3E4F8',
              marginTop: 20,
              marginBottom: 10,
            }}>
            Subscription
          </Text>
          <ScrollView horizontal>
            {Subscriptions.map(sub => (
              <SubscriptionTypes
                title={sub.title}
                desc={sub.desc}
                handleClick={() => {
                  handleSubscriptionClick(sub.id);
                }}
                key={sub.id}
                subId={activeSub}
                id={sub.id}
                openModal={() => {
                  setSubType(sub);
                  setShowSubscriptionModal(true);
                }}
              />
            ))}
          </ScrollView>
        </View>

        <View style={{ paddingLeft: 20 }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: Typography.fontFamily.SoraMedium,
              color: '#E3E4F8',
              marginTop: 30,
              marginBottom: 10,
            }}>
            Payment Methods
          </Text>
          {PaymentCards.length === 2 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {PaymentCards.map(card => (
                <PaymentCard
                  cardNumber={card.number}
                  cardOrigin={card.origin}
                  cardType={card.name}
                  key={card.id}
                  subId={paymentActive}
                  id={card.id}
                  handleClick={() => handlePaymentClick(card.id)}
                  removeCard={() => {}}
                />
              ))}
            </ScrollView>
          ) : (
            <View
              style={{
                paddingVertical: 40,
                paddingHorizontal: 30,
                borderColor: 'rgba(185, 187, 238, 0.5)',
                borderWidth: 1,
                borderRadius: 16,
                alignItems: 'center',
                marginRight: 20,
              }}>
              <View style={{ gap: 12, alignItems: 'center' }}>
                <Text
                  style={{
                    color: 'rgba(227, 228, 248, 1)',
                    fontSize: 16,
                    fontFamily: Typography.fontFamily.SoraMedium,
                  }}>
                  No payment Method added yet
                </Text>

                <Text
                  style={{
                    color: 'rgba(159, 152, 178, 1)',
                    fontSize: 12,
                    fontFamily: Typography.fontFamily.SoraRegular,
                    textAlign: 'center',
                    lineHeight: 20,
                    letterSpacing: -0.02,
                  }}>
                  Add a payment method to make payments on couch
                </Text>

                <Pressable
                  style={{
                    backgroundColor: '#7378DE',
                    paddingHorizontal: 50,
                    paddingVertical: 14,
                    borderRadius: 64,
                    marginTop: 10,
                  }}
                  // onPress={() => setShowModal(true)}
                >
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontFamily: Typography.fontFamily.SoraBold,
                    }}>
                    Add Payment Method
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>

        <Text
          style={{
            fontSize: 16,
            fontFamily: Typography.fontFamily.SoraMedium,
            color: '#E3E4F8',
            marginTop: 30,
            marginBottom: 10,
            paddingHorizontal: 20,
          }}>
          Billing History
        </Text>

        {Billings.length > 0 ? (
          Billings.map(bill => (
            <View
              style={{
                backgroundColor: '#FFFFFF0A',
                borderRadius: 16,
                padding: 20,
                marginHorizontal: 20,
                borderColor: '#E3E4F81F',
                borderWidth: 1,
                marginBottom: 20,
              }}
              key={bill.id}>
              <Text
                style={{
                  color: '#E3E4F8',
                  fontSize: 16,
                  fontFamily: Typography.fontFamily.SoraSemiBold,
                }}>
                ${bill.price}
              </Text>
              <Text
                style={{
                  color: '#9F98B2',
                  fontSize: 12,
                  fontFamily: Typography.fontFamily.SoraRegular,
                }}>
                {bill.desc} for {bill.date}
              </Text>
            </View>
          ))
        ) : (
          <View
            style={{
              paddingVertical: 40,
              paddingHorizontal: 30,
              borderColor: 'rgba(185, 187, 238, 0.5)',
              borderWidth: 1,
              borderRadius: 16,
              alignItems: 'center',
              marginHorizontal: 20,
            }}>
            <View style={{ gap: 12, alignItems: 'center' }}>
              <Text
                style={{
                  color: 'rgba(227, 228, 248, 1)',
                  fontSize: 16,
                  fontFamily: Typography.fontFamily.SoraMedium,
                }}>
                No Bills paid yet
              </Text>

              <Text
                style={{
                  color: 'rgba(159, 152, 178, 1)',
                  fontSize: 12,
                  fontFamily: Typography.fontFamily.SoraRegular,
                  textAlign: 'center',
                  lineHeight: 20,
                  letterSpacing: -0.02,
                }}>
                Add a payment method to make payments on couch
              </Text>

              <Pressable
                style={{
                  backgroundColor: '#7378DE',
                  paddingHorizontal: 50,
                  paddingVertical: 14,
                  borderRadius: 64,
                  marginTop: 10,
                }}
                // onPress={() => setShowModal(true)}
              >
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontFamily: Typography.fontFamily.SoraBold,
                  }}>
                  Add Payment Method
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Subscription;

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
