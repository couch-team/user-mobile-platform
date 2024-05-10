import { BaseModal, CouchDatePicker } from 'components'
import styles from "./styles"
import { ActivityIndicator, Text, TouchableOpacity, View, ScrollView, TextInput } from "react-native";
import { Dispatch, SetStateAction, useState } from 'react';
import { Colors } from 'theme/config';
import { CALENDAR, CONFIRM_PLAN_COMPLETE, CONFIRM_PLAN_DELETE, HELP_CIRCLE, TIME } from 'assets/svg';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import dayjs from 'dayjs';
import { $api } from 'services';
import { showMessage } from 'react-native-flash-message';
import useAppDispatch from 'hooks/useAppDispatch';
import { fetchPlans } from 'store/actions/planner';
import { setHasReachedEnd } from 'store/slice/plannerSlice';

const EditPlannerModal = ({ isActive, setIsActive, prev_title, prev_description, prev_date, prev_end_time, prev_start_time, prev_label, id, is_complete } : { 
    isActive: boolean,
    setIsActive: Dispatch<SetStateAction<boolean>>,
    prev_title: string,
    prev_description: string,
    prev_date: string, 
    prev_start_time: string,
    prev_end_time: string,
    prev_label: string,
    id: string,
    is_complete: boolean
 }) => {
    const [ title, setTitle ] = useState(prev_title);
    const [ description, setDescription ] = useState(prev_description);
    const [ date, setDate ] = useState<string>(prev_date);
    const [ startTime, setStartTime ] = useState<string>(prev_start_time);
    const [ endTime, setEndTime ] = useState<string>(prev_end_time);
    const [ label, setLabel ] = useState(prev_label);
    const [ showDatePicker, setShowDatePicker ] = useState(false);
    const [ showStartTimePicker, setShowStartTimePicker ] = useState(false);
    const [ showEndTimePicker, setShowEndTimePicker ] = useState(false);
    const [ showLabelPicker, setShowLabelPicker ] = useState(false);
    const [ is_loading, setIsLoading ] = useState(false);
    const [ is_updating, setIsUpdating ] = useState(false);
    const [ is_deleting, setIsDeleting ] = useState(false);
    const [ confirmCompleteModalActive, setConfirmCompleteModalActive ] = useState(false);
    const [ confirmDeleteModalActive, setConfirmDeleteModalActive ] = useState(false);
    const dispatch = useAppDispatch();

    const colors = ['#A2E080', '#7378DE', '#8A8EE3', '#B586F2', '#FB7CB2']

    const refetchPlans = () => {
        setIsActive(false)
        dispatch(setHasReachedEnd(false))
        dispatch(fetchPlans(1))
    }

    const finishPlan = async() => {
        try{
            setIsLoading(true)
            const response = await $api.patch(`/api/planner/todo/${id}/`, {
                is_complete: true
            })
            if($api.isSuccessful(response)){
                showMessage({
                    type: 'success',
                    message: 'Plan completed successfully',
                    duration: 3000,
                })
                refetchPlans()
            }
        }
        catch(err){
            console.log(err)
        }
        finally{
            setIsLoading(false)
        }
    }

    const updatePlan = async() => {
        try{
            setIsUpdating(true)
            const response = await $api.patch(`/api/planner/todo/${id}/`, {
                title,
                colour: label,
                description,
                start: prev_start_time === startTime ? undefined : date + 'T' + startTime,
                end: prev_end_time === endTime ? undefined : date + 'T' + endTime,
            })
            if($api.isSuccessful(response)){
                showMessage({
                    type: 'success',
                    message: 'Plan updated successfully',
                    duration: 3000,
                })
                refetchPlans()
            }
        }
        catch(err){
            console.log(err)
        }
        finally{
            setIsUpdating(false)
        }
    }

    const deletePlan = async() => {
        try{
            setIsDeleting(true)
            const response = await $api.delete(`/api/planner/todo/${id}/`)
            if($api.isSuccessful(response)){
                showMessage({
                    type: 'success',
                    message: 'Plan deleted successfully',
                    duration: 3000,
                })
                refetchPlans()
            }
        }
        catch(err){
            console.log(err)
        }
        finally{
            setIsDeleting(false)
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
                        editable={!is_complete}
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
                            editable={!is_complete}
                        />
                    </View>
                    <View style={styles.extraDetailsContainer}>
                        <TouchableOpacity style={styles.extraDetailsField} onPress={() => setShowDatePicker(true)} disabled={is_complete}>
                            <CALENDAR/>
                            <Text style={styles.extraDetailsFieldText}>{ date|| 'Date' }</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.extraDetailsField} onPress={() => setShowLabelPicker(true)} disabled={is_complete}>
                            <View style={[styles.labelIcon,{ backgroundColor: label }]}></View>
                            <Text style={styles.extraDetailsFieldText}>Label</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.extraDetailsField} onPress={() => setShowStartTimePicker(true)} disabled={is_complete}>
                            <TIME/>
                            <Text style={styles.extraDetailsFieldText}>{ startTime || 'Start time' }</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.extraDetailsField} onPress={() => setShowEndTimePicker(true)} disabled={is_complete}>
                            <TIME/>
                            <Text style={styles.extraDetailsFieldText}>{ endTime || 'End time' }</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {
                !is_complete
                    &&
                <View style={styles.buttonParent}>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={[styles.cancelButton, (!title || !startTime || !endTime || !label || !date) && { opacity: 0.5 } ]} disabled={!date || !startTime || !endTime || !label || !title || is_loading}  onPress={() => updatePlan()}>
                            {
                                is_updating
                                    ?
                                    <ActivityIndicator color={Colors.WHITE} size="small"/>
                                    :
                                    <Text style={styles.cancelButtonText}>Update</Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.submitButton} onPress={() => setConfirmCompleteModalActive(true)}>
                            {
                                is_loading
                                    ?
                                    <ActivityIndicator color={Colors.WHITE} size="small"/>
                                    :
                                    <Text style={styles.submitButtonText}>Done</Text>
                            }
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => setConfirmDeleteModalActive(true)}>
                        <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            }
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
            <BaseModal visible={confirmCompleteModalActive}>
                <View style={styles.secondaryModal}>
                    <View style={styles.secondaryModalContent}>
                        <Text style={styles.secondaryModalHeader}>Are you sure you want to mark as done ?</Text>
                        <CONFIRM_PLAN_COMPLETE/>
                    </View>
                    <View style={styles.buttonsSecondaryContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => setConfirmCompleteModalActive(false)}>
                            <Text style={styles.cancelButtonText}>NO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => finishPlan()} style={styles.submitButton}>
                            {
                                is_loading
                                    ?
                                    <ActivityIndicator color={Colors.WHITE} size="small"/>
                                    :
                                    <Text style={styles.submitButtonText}>YES</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </BaseModal>
            <BaseModal visible={confirmDeleteModalActive}>
                <View style={styles.secondaryModal}>
                    <View style={styles.secondaryModalContent}>
                        <Text style={styles.secondaryModalHeader}>Are you sure you want to delete this?</Text>
                        <CONFIRM_PLAN_DELETE/>
                    </View>
                    <View style={styles.buttonsSecondaryContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => setConfirmDeleteModalActive(false)}>
                            <Text style={styles.cancelButtonText}>NO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deletePlan()} style={styles.submitButton}>
                            {
                                is_deleting
                                    ?
                                    <ActivityIndicator color={Colors.WHITE} size="small"/>
                                    :
                                    <Text style={styles.submitButtonText}>YES</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </BaseModal>
        </BaseModal>
    )
}
export default EditPlannerModal;