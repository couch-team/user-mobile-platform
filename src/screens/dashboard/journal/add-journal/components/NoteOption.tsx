import { noteOptionsIcons } from 'constants/data';
import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { styles } from './style';

interface NoteOptionProps {
  setNoteTakerOption: any;
  noteTakerOption: any[];
}

export const NoteOption = ({
  setNoteTakerOption,
  noteTakerOption,
}: NoteOptionProps) => {
  const [activeNoteOption, setActiveNoteOption] = useState('');

  return (
    <View style={styles.noteOptionContainer}>
      {noteOptionsIcons.map(option => {
        return (
          <TouchableOpacity
            onPress={() => {
              setNoteTakerOption([...noteTakerOption, option.value]);
              setActiveNoteOption(option.value);
            }}
            style={[
              styles.noteIconContainer,
              activeNoteOption === option.value &&
                styles.activeNoteIconContainer,
            ]}
            key={option.id}>
            <Image
              source={
                activeNoteOption === option.value
                  ? option['active-icon']
                  : option.icon
              }
              resizeMode="contain"
              style={styles.noteIcon}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
