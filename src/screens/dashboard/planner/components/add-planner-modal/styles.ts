import { StyleSheet } from "react-native";
import { Colors, Typography } from "theme/config";

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.PRIMARY,
        paddingHorizontal: 24,
        paddingTop: 26,
        paddingBottom: 40,
        borderTopEndRadius: 24,
        borderTopLeftRadius: 24,
    },
    recurringContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 12,
    },
    recurringText: {
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: -0.48,
        color: '#E3E4F870',
    },
    recurringBox: {
        backgroundColor: '#8A8EE32B',
        width: 48,
        height: 24,
        borderRadius: 50,
        padding: 2,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    recurringCircle: {
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: Colors.WHITE
    },
    titleTextInput: {
        fontSize: 20,
        lineHeight: 25,
        letterSpacing: -0.48,
        fontFamily: Typography.fontFamily.SoraSemiBold,
        fontWeight: '600',
        color: Colors.WHITE
    },
    formContainer: {
        marginTop: 16,
    },
    unitInputContainer: {
        marginTop: 32,
    },
    inputLabelContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    inputLabel: {
        color: Colors.WHITE,
        fontSize: 14,
        lineHeight: 18,
        letterSpacing: -0.48,
    },
    textInputBoxContainer: {
        height: 172,
        marginTop: 12,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        paddingTop: 16,
        fontFamily: Typography.fontFamily.SoraMedium,
        borderColor: Colors.COUCH_BLUE_1800,
        color: Colors.WHITE,
    },
    extraDetailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 29
    },
    extraDetailsField: {
        flexDirection: 'row',
        gap: 9,
        backgroundColor: '#A2A5E914',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 64,
    },
    extraDetailsFieldText: {
        fontSize: 11,
        lineHeight: 16,
        letterSpacing: -0.48,
        fontFamily: Typography.fontFamily.SoraBold,
        fontWeight: '700',
        color: Colors.COUCH_TEXT_COLOR
    },
    labelIcon: {
        width: 12,
        height: 12,
        backgroundColor: Colors.COUCH_BLUE,
        borderRadius: 12,
    },
    labelContainer: {
        backgroundColor: Colors.PRIMARY,
        // paddingHorizontal: 24,
        paddingTop: 44,
        paddingBottom: 73,
        borderTopEndRadius: 24,
        borderTopLeftRadius: 24,
    },
    labelPickerHeader: {
        color: Colors.WHITE,
        fontSize: 22,
        lineHeight: 28,
        letterSpacing: -0.48,
        fontFamily: Typography.fontFamily.SoraSemiBold,
        fontWeight: '600',
        textAlign: 'center'
    },
    labelColor: {
        width: 80,
        height: 80,
        borderRadius: 80
    },
    labelColorParent: {
        gap: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 62,
    },
    buttonsContainer: {
        paddingHorizontal: 16,
        paddingVertical: 32,
        backgroundColor: Colors.PRIMARY_DARKBLUE,
        flexDirection: 'row',
        gap: 21,
    },
    cancelButton:{
        borderWidth: 1,
        borderColor: '#BDBDBD',
        borderRadius: 64,
        paddingVertical: 20,
        flex: 1,
    },
    cancelButtonText: {
        color: '#CDCDCD',
        fontSize: 16,
        lineHeight: 20,
        fontFamily: Typography.fontFamily.SoraSemiBold,
        fontWeight: '600',
        textAlign: 'center'
    },
    submitButton:{
        backgroundColor: Colors.COUCH_BLUE,
        borderRadius: 64,
        paddingVertical: 20,
        flex: 1,
    },
    submitButtonText: {
        color: Colors.WHITE,
        fontSize: 16,
        lineHeight: 20,
        fontFamily: Typography.fontFamily.SoraSemiBold,
        fontWeight: '600',
        textAlign: 'center'
    }
})
export default styles;