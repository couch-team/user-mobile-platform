import { hp, wp } from "constants/layout";
import { StyleSheet } from "react-native";
import { Colors } from "theme/config";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D0E36',
    },
    plusIconContainer: {
        width: 70,
        height: 70,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        right: wp(20),
        zIndex: 100000,
        backgroundColor: Colors.COUCH_BLUE,
      },
      plusIcon: {
        width: wp(44),
        height: hp(44),
      },
})
export default styles;