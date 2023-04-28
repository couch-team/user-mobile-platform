import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import { styles } from './style';
import { Colors, Images } from '../../../../theme/config';
import { deviceWidth } from '../../../../constants/layout';

interface CountryListProps {
  isVisible: boolean;
  onClose: () => void;
  countryData: any;
  onComplete: (countryData: any) => void;
}

const CountryList = ({
  isVisible,
  onClose,
  countryData,
  onComplete,
}: CountryListProps) => {
  const countryDataArray: any[] = [];
  const [countryInfo, setCountryInfo] = useState('');
  const [countries, setCountries] = useState(countryDataArray);
  Object.entries(countryData).map((item: any) => {
    const flag = item[1].flag;
    const callingCode = item[1].callingCode;

    if (callingCode.length !== 0) {
      countryDataArray.push({
        value: callingCode[0],
        label: flag,
        name: item[1].name.common,
      });
    }
  });

  useEffect(() => {
    onComplete(countryInfo);
    onClose();
    // eslint-disable-next-line prettier/prettier
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryInfo]);

  const filterCountries = (text: string) => {
    const newData = countryDataArray.filter(item => {
      const itemData = `${item.name.toLowerCase()}`;
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });

    setCountries(newData);
  };
  return (
    <Modal
      hasBackdrop
      isVisible={isVisible}
      onBackButtonPress={() => onClose()}
      deviceWidth={deviceWidth}>
      <View style={styles.container}>
        <View style={styles.searchInputContainer}>
          <Image
            source={Images.search}
            resizeMode="contain"
            style={styles.searchIcon}
          />
          <TextInput
            onChangeText={text => filterCountries(text)}
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
    </Modal>
  );
};

export default CountryList;
