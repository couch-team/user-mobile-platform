import { RouteProp, useRoute } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { HeaderBar, HeaderText } from "components"
import { SafeAreaView, ScrollView, StyleSheet } from "react-native"
import { Colors } from "theme/config";
import { DashboardParamList } from "utils/types/navigation-types";

type ScreenProps = StackScreenProps<DashboardParamList, 'MindSpaceSection'>;
const MindSpaceSection = ({ navigation: { navigate, goBack } }: ScreenProps) => {
    const { params } = useRoute<RouteProp<DashboardParamList, 'MindSpaceSection'>>();

    return(
        <SafeAreaView style={styles.container}>
            <HeaderBar hasBackButton onPressLeftIcon={() => goBack()} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <HeaderText
                    text={params?.header}
                    hasSubText={params?.sub_header}
                />
            </ScrollView>
        </SafeAreaView>
    )
};
export default MindSpaceSection;
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.PRIMARY,
    },
})