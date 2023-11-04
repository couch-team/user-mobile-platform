import { noteOptionsIcons } from 'constants/data';
import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { styles } from './style';
import { Images } from 'theme/config';
import JournalPromptModal from './JournalPrompt';

export type NoteTakerOptionType = {
  id: string;
  value: string;
  type: 'image' | 'text' | 'mood' | 'video' | 'voice';
};

interface NoteOptionProps {
  addNoteTaker: (item: NoteTakerOptionType) => void;
}

export const NoteOption = ({ addNoteTaker }: NoteOptionProps) => {
  const [activeNoteOption, setActiveNoteOption] = useState('');
  const [openPromptModal, setOpenPromptModal] = useState(false);

  return (
    <View style={styles.noteOptionContainer}>
      <TouchableOpacity onPress={() => setOpenPromptModal(true)}>
        <Image
          source={Images['note-text']}
          resizeMode="contain"
          style={styles.infoContainer}
        />
      </TouchableOpacity>
      {noteOptionsIcons.map(option => {
        return (
          <TouchableOpacity
            onPress={() => {
              const newNoteTaker: NoteTakerOptionType = {
                id: Date.now() + Math.random() + '',
                type: option.value as any,
                value: '',
              };
              addNoteTaker(newNoteTaker);
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
      <JournalPromptModal
        isVisible={openPromptModal}
        onClose={() => setOpenPromptModal(false)}
      />
    </View>
  );
};
