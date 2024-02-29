import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors, Images } from 'theme/config';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { FormTextInput } from 'components';

export default function SearchJournal() {
  const [searchPhrase, setSearchPhrase] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <FormTextInput
          editable
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={(text: string) => setSearchPhrase(text)}
          value={searchPhrase}
        />
        
      </View>
      <View style={styles.emptyMoodTrackerContainer}>
          <View style={styles.emptyMoodIconContainer}>
            <Image
              source={Images.journal}
              resizeMode="contain"
              style={styles.emptyMoodIcon}
            />
          </View>
          <View style={styles.emptyTextContainer}>
            <Text style={styles.emptyMainText}>
              Not Notes in your Journal as for now
            </Text>
          </View>
        </View>
    </SafeAreaView>
  );
}
