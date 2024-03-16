import { StackNavigationProp } from "@react-navigation/stack";
import styles from "./styles";
import { View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context"
import { BottomTabParamList, DashboardParamList } from "utils/types/navigation-types";
import { HeaderBar, HeaderText } from "components";
import { Images } from "theme/config";

type DashboardNavigationProps = StackNavigationProp<
  BottomTabParamList,
  'Activities'
>;
type Props = {
  navigation: DashboardNavigationProps;
};
const Planner = ({ navigation: { goBack, navigate } }: Props) => {
    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.plusIconContainer}>
                <Image source={Images.plus} style={styles.plusIcon} />
            </TouchableOpacity>
            <HeaderBar hasBackButton onPressLeftIcon={() => goBack()} />
            <HeaderText
                text="Hi Daniella,"
                hasSubText="Here’s your routine for today"
            />
        </SafeAreaView>
    )
}
export default Planner;