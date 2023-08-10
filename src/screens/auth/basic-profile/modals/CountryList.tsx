import React, { useEffect, useMemo, useState } from 'react';
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
import { countryList } from 'constants/data';
import FuzzySearch from 'fuzzy-search';

interface CountryListProps {
  isVisible: boolean;
  onClose: () => void;
  onComplete: (countryData: any) => void;
}

export const CountryList = ({
  isVisible,
  onClose,
  onComplete,
}: CountryListProps) => {
  const [countryInfo, setCountryInfo] = useState('');
  const formattedCountryList = useMemo(
    () =>
      countryList.map((item, index) => {
        return {
          ...item,
          id: index + 1,
        };
      }),
    [],
  );

  const [countries, setCountries] = useState(formattedCountryList);

  useEffect(() => {
    onComplete(countryInfo);
    onClose();
    // eslint-disable-next-line prettier/prettier
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryInfo]);

  const onSearch = (val: string) => {
    const searcher = new FuzzySearch(countries, ['name'], {
      caseSensitive: false,
    });

    const result = searcher.search(val);
    setCountries(result as any);
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
            onChangeText={onSearch}
            selectionColor={Colors.COUCH_BLUE}
            style={styles.searchInput}
            placeholder="Search country"
            placeholderTextColor={Colors.PLACEHOLDER_COLOR}
          />
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          data={countries}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => setCountryInfo(item.name)}
                key={index}
                style={styles.singleCountryContainer}>
                <Text style={styles.countryName}>{item.name}</Text>
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
