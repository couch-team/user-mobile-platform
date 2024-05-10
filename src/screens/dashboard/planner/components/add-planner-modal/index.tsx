import { BaseModal, CouchDatePicker } from 'components'
import styles from "./styles"
import { ActivityIndicator, Text, TouchableOpacity, View, ScrollView, TextInput } from "react-native";
import { Dispatch, SetStateAction, useState } from 'react';
import { Colors } from 'theme/config';
import { CALENDAR, HELP_CIRCLE, TIME } from 'assets/svg';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import dayjs from 'dayjs';
import { $api } from 'services';
import { showMessage } from 'react-native-flash-message';
import useAppDispatch from 'hooks/useAppDispatch';
import { fetchPlans } from 'store/actions/planner';

const AddPlannerModal = ({ isActive, setIsActive } : { 
    isActive: boolean,
    setIsActive: Dispatch<SetStateAction<boolean>>,
 }) => {
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ date, setDate ] = useState<string>('');
    const [ startTime, setStartTime ] = useState<string>('');
    const [ endTime, setEndTime ] = useState<string>('');
    const [ label, setLabel ] = useState('#7378DE');
    const [ showDatePicker, setShowDatePicker ] = useState(false);
    const [ showStartTimePicker, setShowStartTimePicker ] = useState(false);
    const [ showEndTimePicker, setShowEndTimePicker ] = useState(false);
    const [ showLabelPicker, setShowLabelPicker ] = useState(false);
    const [ is_loading, setIsLoading ] = useState(false);
    const dispatch = useAppDispatch();

    const colors = ['#A2E080', '#7378DE', '#8A8EE3', '#B586F2', '#FB7CB2']


    const createPlan = async() => {
        try{
            setIsLoading(true)
            const response = await $api.post('/api/planner/todo/', {
                title,
                colour: label,
                description,
                start: date + 'T' + startTime,
                end: date + 'T' + endTime,
                is_complete: false
            })
            console.log(response)
            if($api.isSuccessful(response)){
                showMessage({
                    type: 'success',
                    message: 'Plan added to routine successfully',
                    duration: 3000,
                })
                setIsActive(false)
                dispatch(fetchPlans(1))
            }
        }
        catch(err){
            console.log(err)
        }
        finally{
            setIsLoading(false)
        }
    }

    return(
        <BaseModal visible={isActive} onClose={() => setIsActive(false)}>
            <View style={styles.container}>
                {/* <View style={styles.recurringContainer}>
                    <Text style={styles.recurringText}>Recurring?</Text>
                    <TouchableOpacity style={[styles.recurringBox, is_recurring && { alignItems: 'flex-end' } ]} onPress={() => setIsRecurring(!is_recurring)}>
                        <View style={[styles.recurringCircle, is_recurring && { backgroundColor: Colors.COUCH_BLUE } ]}></View>
                    </TouchableOpacity>
                </View> */}
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.titleTextInput}
                        placeholder='e.g - Schedule a call with John ☎️'
                        placeholderTextColor="#9F98B273"
                        value={title}
                        onChangeText={(value) => setTitle(value)}
                        autoFocus
                    />
                    <View style={styles.unitInputContainer}>
                        <View style={styles.inputLabelContainer}>
                            <Text style={styles.inputLabel}>Description (Optional)</Text>
                            <HELP_CIRCLE/>
                        </View>
                        <TextInput
                            placeholder="Describe your task"
                            style={[styles.textInputBoxContainer]}
                            textAlignVertical="top"
                            multiline={true}
                            value={description}
                            placeholderTextColor={Colors.COUCH_BLUE_1800}
                            onChangeText={(text: string) => setDescription(text)}
                        />
                    </View>
                    <View style={styles.extraDetailsContainer}>
                        <TouchableOpacity style={styles.extraDetailsField} onPress={() => setShowDatePicker(true)}>
                            <CALENDAR/>
                            <Text style={styles.extraDetailsFieldText}>{ date|| 'Date' }</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.extraDetailsField} onPress={() => setShowLabelPicker(true)}>
                            <View style={[styles.labelIcon,{ backgroundColor: label }]}></View>
                            <Text style={styles.extraDetailsFieldText}>Label</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.extraDetailsField} onPress={() => setShowStartTimePicker(true)}>
                            <TIME/>
                            <Text style={styles.extraDetailsFieldText}>{ startTime || 'Start time' }</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.extraDetailsField} onPress={() => setShowEndTimePicker(true)}>
                            <TIME/>
                            <Text style={styles.extraDetailsFieldText}>{ endTime || 'End time' }</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setIsActive(false)}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.submitButton, (!title || !startTime || !endTime || !label || !date) && { opacity: 0.5 } ]} disabled={!date || !startTime || !endTime || !label || !title || is_loading} onPress={() => createPlan()}>
                    {
                        is_loading
                            ?
                            <ActivityIndicator color={Colors.WHITE} size="small"/>
                            :
                            <Text style={styles.submitButtonText}>Add</Text>
                    }
                </TouchableOpacity>
            </View>
            <DateTimePickerModal
                isVisible={showDatePicker}
                mode="date"
                onConfirm={date => {
                    setDate(dayjs(date).format('YYYY-MM-DD'))
                    setShowDatePicker(false)
                }}
                onCancel={() => {
                    setShowDatePicker(false)
                }}
            />
            <DateTimePickerModal
                isVisible={showStartTimePicker}
                mode="time"
                onConfirm={time => {
                    setStartTime(dayjs(time).format('HH:mm'))
                    setShowStartTimePicker(false)
                }}
                onCancel={() => {
                    setShowStartTimePicker(false)
                }}
            />
            <DateTimePickerModal
                isVisible={showEndTimePicker}
                mode="time"
                onConfirm={time => {
                    setEndTime(dayjs(time).format('HH:mm'))
                    setShowEndTimePicker(false)
                }}
                onCancel={() => {
                    setShowEndTimePicker(false)
                }}
            />
            <BaseModal visible={showLabelPicker} onClose={() => setShowLabelPicker(false)}>
                <View style={styles.labelContainer}>
                    <Text style={styles.labelPickerHeader}>Choose a label color</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.labelColorParent}>
                        {
                            colors.map((color, index) => {
                                return(
                                    <View key={index} style={ color === label && { backgroundColor: '#FFF9E052', borderWidth: 0.8, borderColor: '#FFB800', borderStyle: 'dashed', padding: 10, borderRadius: 100 }}>
                                        <TouchableOpacity onPress={() => {setLabel(color); setShowLabelPicker(false)}} key={index} style={[styles.labelColor, { backgroundColor: color }]}/>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </BaseModal>
        </BaseModal>
    )
}
export default AddPlannerModal;