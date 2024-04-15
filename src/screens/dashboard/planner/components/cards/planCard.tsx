import { Text, TouchableOpacity, View } from "react-native"
import EditPlannerModal from "../edit-planner-modal"
import { useState } from "react"
import moment from "moment";
import styles from "../../styles";
import { CHECK } from "assets/svg";
import dayjs from "dayjs";

const PlanCard = ({item, index} : { item: any, index: number }) => {
    const [ editPlannerModalActive, setEditPlannerModalActive ] = useState(false);

    return(
        <View style={styles.cardParent}>
            <View style={styles.cardStatus}>
                <View style={[styles.horizontalLine,{ height: 33 }]}></View>
                <View style={styles.completeCircle}>{ item?.is_complete == true && <CHECK/> }</View>
                <View style={[styles.horizontalLine,{ height: 33 }]}></View>
            </View>
            <TouchableOpacity key={index} style={styles.cardContainer} onPress={() => setEditPlannerModalActive(true)}>
                <View style={[ styles.cardLabel, { backgroundColor: item?.colour } ]}></View>
                <View style={styles.itemMoodBodyContainer}>
                    <Text style={[styles.cardHeader]}>{item?.title}</Text>
                    <View style={styles.timeWrapper}>
                        <View style={styles.cardTimeContainer}>
                            <Text style={styles.cardTimeText}>
                                {moment(item?.start).format('hh:mm A')} -
                                {moment(item?.end).format('hh:mm A')}
                            </Text>
                        </View>
                        <View style={styles.cardTimeContainer}>
                            <Text style={styles.cardTimeText}>
                                {
                                    moment.duration(moment(item?.end).diff(moment(item?.start))).asMinutes() > 60 
                                        ?
                                        (Math.floor(moment.duration(moment(item?.end).diff(moment(item?.start))).asMinutes()/60)) + ' Hours' + '  ' + (moment.duration(moment(item?.end).diff(moment(item?.start))).asMinutes()%60) + ' Mins'
                                        :
                                        (moment.duration(moment(item?.end).diff(moment(item?.start))).asMinutes()) + ' Mins'
                                }
                            </Text>
                        </View>
                    </View>
                    <Text>

                    </Text>
                </View>
            </TouchableOpacity>
            {
                editPlannerModalActive
                    &&
                <EditPlannerModal 
                    prev_title={item?.title} 
                    prev_label={item?.colour}
                    prev_date={item?.start?.split('T')[0]}
                    prev_end_time={dayjs(item?.end).format('HH:mm')}
                    prev_start_time={dayjs(item?.start).format('HH:mm')}
                    prev_description={item?.description}
                    isActive={editPlannerModalActive} 
                    setIsActive={setEditPlannerModalActive} 
                    id={item?.id}
                    is_complete={item?.is_complete}
                />
            }
        </View>
    )
}
export default PlanCard;