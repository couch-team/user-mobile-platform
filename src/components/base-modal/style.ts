import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../theme/config';

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 0,
  },
  generalContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
  dialogContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: '100%',
    maxHeight: screen.height - 100,
    alignSelf: 'flex-end',
    position: 'relative',
    backgroundColor: Colors.PRIMARY,
    zIndex: 10,
  },
});

export default styles;
