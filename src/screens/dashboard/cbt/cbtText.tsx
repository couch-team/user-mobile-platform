import { StackNavigationProp } from "@react-navigation/stack";
import { CLOSE } from "assets/svg";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Colors, Typography } from "theme/config";
import { DashboardParamList } from "utils/types/navigation-types";

type DashboardNavigationProps = StackNavigationProp<
  DashboardParamList,
  'CbtText'
>;
type Props = {
  navigation: DashboardNavigationProps;
};
const CbtText = ({ navigation: { goBack } }: Props) => {
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.parent}>
                <TouchableOpacity style={styles.closeButton} onPress={() => goBack()}><CLOSE/></TouchableOpacity>
                <View style={styles.contentContainer}>
                    <View>
                        <View style={styles.progressIndicator}>
                            <View style={styles.progress}></View>
                        </View>
                        <View style={styles.imageContainer}></View>
                        <Text style={styles.headerText}>You might be Imagining the worst possible outcomes of things</Text>
                        <Text style={styles.subheaderText}>I Love coffee. I’m addicted for sure. But I  also have anxiety so I know I shouldn’t drink it  when I do bc my heart will flutter</Text>
                    </View>
                    <TouchableOpacity style={styles.startButton}>
                        <Text style={styles.buttonText}>Start Reading</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}
export default CbtText;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.PRIMARY_MODAL_200,
        paddingTop: 24
    },
    parent: {
        paddingHorizontal:24,
    },
    imageContainer: {
        backgroundColor: '#F3F3FC0F',
        height: 417,
        borderRadius: 16,
        marginTop: 16
    },
    closeButton: {
        width: 48,
        height: 48,
        borderRadius: 48,
        backgroundColor: '#E3E4F83B',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end'
    },
    contentContainer: {
        // flex: 1,
        justifyContent: 'space-between'
    },
    startButton: {
        backgroundColor: Colors.COUCH_BLUE,
        paddingVertical: 22,
        borderRadius: 64,
    },
    buttonText: {
        fontFamily: Typography.fontFamily.SoraSemiBold,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 20,
        letterSpacing: -0.48,
        color: '#fff',
        textAlign: 'center'
    },
    headerText: {
        fontSize: 18,
        lineHeight: 32,
        letterSpacing: -0.64,
        fontFamily: Typography.fontFamily.SoraRegular,
        color: Colors.COUCH_BLUE_1100,
        textAlign: 'center',
        marginTop: 40,
        paddingHorizontal: 13.5,
    },
    subheaderText: {
        fontSize: 14,
        lineHeight: 25,
        letterSpacing: -0.48,
        fontFamily: Typography.fontFamily.SoraRegular,
        color: Colors.COUCH_TEXT_COLOR,
        textAlign: 'center',
        marginTop: 20,
        paddingHorizontal: 13.5,
    },
    progressIndicator: {
        width: 187,
        height: 7,
        borderRadius: 128,
        backgroundColor: '#E3E4F840',
    },
    progress: {
        height: 7,
        borderRadius: 128,
        backgroundColor: Colors.DATE_COLOR, 
    }
})