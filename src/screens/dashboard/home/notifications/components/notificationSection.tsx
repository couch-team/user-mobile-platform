import { useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, SectionList, Text, View } from "react-native";
import { $api } from "services";
import { styles } from "../style";
import RenderNotificationList from "./RenderNotificationList";
import { Colors, Typography } from "theme/config";
import { deviceWidth } from "constants/layout";
import { groupTransactions } from "utils";
import { Loader } from "components";
import { setHasReachedEnd } from "store/slice/plannerSlice";

const NotificationSection = ({ index } : { index: number }) => {
    const types = [
        '',
        'mood',
        'journal',
        'planner'
    ]
    const [ isFetchingNotifications, setIsFetchingNotifications ] = useState(false);
    const [ notifications, setNotifications ] = useState<any[]>([]);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ hasFetchedNotifications, setHasFetchedNotifications ] = useState(false)
    const [ reached_end, setReachedEnd ] = useState(false);
  
    const fetchNotifications = async(current_page: number) => {
      try{
        setIsFetchingNotifications(true)
        const response = await $api.fetch(`/api/notification/message/?page=${current_page}&type=${types[index]}`)
        if($api.isSuccessful(response)){
          setNotifications(response?.data?.results);
          setReachedEnd(response?.data?.next == null);
          setHasFetchedNotifications(true);
        }
      }
      catch(err){
        console.log(err)
      }
      finally{
        setIsFetchingNotifications(false)
      }
    }
  
    useEffect(() => {
      fetchNotifications(currentPage)
    },[ currentPage, index ])

    useEffect(() => {
      setHasFetchedNotifications(false);
      setCurrentPage(1);
      setHasReachedEnd(false)
    },[ index ])

    return(
        <View>
            <SectionList
                style={styles.sectionListStyle}
                sections={groupTransactions(notifications)}
                contentContainerStyle={styles.sectionListContainer}
                onEndReached={() =>
                  !reached_end && !isFetchingNotifications && setCurrentPage(currentPage + 1)
                }
                refreshControl={
                  <RefreshControl
                      refreshing={isFetchingNotifications && notifications?.length === 0}
                      onRefresh={() => fetchNotifications(currentPage)}
                      colors={['#ffffff']}
                      progressBackgroundColor="#0D0E36"
                  />
                }
                ListEmptyComponent={
                    isFetchingNotifications
                      ?
                      <View style={[styles.reachedEndContainer, {width: deviceWidth - 48 }]}>
                        <ActivityIndicator size={'small'} color={Colors.WHITE}/>
                      </View>
                      :
                      <View style={{ paddingVertical: 40, width: deviceWidth - 48 }}>
                        <Text style={{ fontFamily: Typography.fontFamily.SoraRegular, textAlign: 'center', color: Colors.WHITE }}>No result</Text>
                      </View>
                  }
                renderItem={({ item, index }) => {
                    return <RenderNotificationList key={index} item={item} />;
                }}
                ListFooterComponent={
                  reached_end ? (
                    notifications?.length > 0 ? (
                      <View style={styles.reachedEndContainer}>
                        <Text style={styles.reachedEnd}>
                          You have reached the end! 🎉
                        </Text>
                      </View>
                    ) : (
                      <View style={styles.reachedEndContainer}></View>
                    )
                  ) : hasFetchedNotifications && isFetchingNotifications ? (
                    <View style={styles.reachedEndContainer}>
                      <ActivityIndicator size={'small'} color={Colors.WHITE} />
                    </View>
                  ) : (
                    <View style={styles.reachedEndContainer}></View>
                  )
                }
            />
      </View>
    )
}
export default NotificationSection;