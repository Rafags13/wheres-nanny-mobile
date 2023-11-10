import { text } from '@styles/global.styles';
import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center' 
  },
  nameText: {
    ...text.common,
    fontFamily: 'Gellix-Bold',
  }
})

export default styles;