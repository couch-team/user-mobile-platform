import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { Images } from '../../../theme/config';
import LongButton from '../../../components/base/long-button';
import { genderRoles } from '../../../constants';

const BasicProfile = () => {
  const [selectedGender, setSelectedGender] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bodyContainer}>
        <Image source={Images.logo} resizeMode="contain" style={styles.logo} />
        <View style={styles.textBodyContainer}>
          <Text style={styles.welcomeText}>Setup Basic Profile</Text>
          <Text style={styles.getStartedText}>
            Let’s get to know you more...
          </Text>
        </View>
        <View style={styles.profileStepContainer}>
          <View style={styles.profileItemStepContainer} />
          <View
            style={[styles.profileItemStepContainer, styles.notActiveStep]}
          />
        </View>
        <View style={styles.inputFormContainer}>
          <View>
            <Text style={styles.genderLabelText}>
              What Gender describes you best?
            </Text>
            <FlatList
              contentContainerStyle={styles.flatListContainer}
              data={genderRoles}
              numColumns={2}
              //@ts-ignore
              renderItem={({ item, index }) => {
                if (item.value !== 'other') {
                  return (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.6}
                      onPress={() => setSelectedGender(item.value)}
                      style={[
                        styles.genderItemContainer,
                        selectedGender === item.value && styles.selectedGender,
                      ]}>
                      <Text style={styles.genderItemText}>{item.title}</Text>
                      <Image
                        source={
                          selectedGender === item.value
                            ? Images['active-radio']
                            : Images.radio
                        }
                        resizeMode="contain"
                        style={styles.radioIcon}
                      />
                    </TouchableOpacity>
                  );
                }
                if (item.value === 'other') {
                  return (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.6}
                      onPress={() => setSelectedGender(item.value)}
                      style={[
                        styles.genderItemContainer,
                        styles.genderItemWidth,
                        selectedGender === item.value && styles.selectedGender,
                      ]}>
                      <Text style={styles.genderItemText}>{item.title}</Text>
                      <Image
                        source={
                          selectedGender === item.value
                            ? Images['active-radio']
                            : Images.radio
                        }
                        resizeMode="contain"
                        style={styles.radioIcon}
                      />
                    </TouchableOpacity>
                  );
                }
              }}
            />
          </View>
        </View>
      </View>
      <LongButton title="Continue" />
    </SafeAreaView>
  );
};

export default BasicProfile;
