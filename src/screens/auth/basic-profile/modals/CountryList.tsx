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
import { SEARCH_ICON } from 'assets/svg';

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
  const [countryInfo, setCountryInfo] = useState({ code: '', name: '' });

  const [countries, setCountries] = useState(countryList);

  useEffect(() => {
    onComplete(countryInfo);
    onClose();
    // eslint-disable-next-line prettier/prettier
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryInfo]);

  const onSearch = (val: string) => {
    if(!val){
      setCountries(countryList);
      return;
    }
    const searcher = new FuzzySearch(countryList, ['name'], {
      caseSensitive: false,
    });

    const result = searcher.search(val);
    setCountries(result as any);
  };

  return (
    <BaseModal visible={isVisible} onClose={() => onClose()}>
      <View style={styles.container}>
        <View style={styles.searchInputContainer}>
          <SEARCH_ICON/>
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
                onPress={() =>
                  setCountryInfo({ name: item.name, code: item?.code })
                }
                key={index}
                style={styles.singleCountryContainer}>
                <Text style={styles.countryName}>{item.flag}  {item.name}</Text>
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
