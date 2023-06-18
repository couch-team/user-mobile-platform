import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { styles } from './style';
import { Colors, Images } from 'theme/config';
import { BaseModal } from 'components';
import { states as useStates } from 'constants/data';

interface StatesListProps {
  isVisible: boolean;
  onClose: () => void;
  onComplete: (countryData: any) => void;
}

export const StatesList = ({
  isVisible,
  onClose,
  onComplete,
}: StatesListProps) => {
  const [stateInfo, setStateInfo] = useState('');
  const [states, setStates] = useState(useStates);

  useEffect(() => {
    onComplete(stateInfo);
    onClose();
    // eslint-disable-next-line prettier/prettier
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateInfo]);

  const filterStates = (text: string) => {
    const newData = states.filter(item => {
      const itemData = `${item.toLowerCase()}`;
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });

    setStates(newData);
  };
  return (
    <BaseModal visible={isVisible} onClose={() => onClose()}>
      <View style={styles.container}>
        <View style={styles.searchInputContainer}>
          <Image
            source={Images.search}
            resizeMode="contain"
            style={styles.searchIcon}
          />
          <TextInput
            onChangeText={text => filterStates(text)}
            selectionColor={Colors.COUCH_BLUE}
            style={styles.searchInput}
            placeholder="Search state..."
            placeholderTextColor={Colors.PLACEHOLDER_COLOR}
          />
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={states}
          // eslint-disable-next-line react-native/no-inline-styles
          contentContainerStyle={{ marginTop: 20 }}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => setStateInfo(item)}
                key={index}
                style={styles.singleCountryContainer}>
                <Text style={styles.countryName}>{item}</Text>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View style={styles.emptyContainer}>
                <Text style={styles.countryName}>No matching country</Text>
              </View>
            );
          }}
        />
      </View>
    </BaseModal>
  );
};
