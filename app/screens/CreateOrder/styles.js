import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
  },
  senderInfoContainer: {
    marginVertical: 20,
    alignSelf: 'stretch',
    paddingHorizontal: 10,
  },
  senderInfoTitle: {
    fontSize: 20,
    marginBottom: 10
  },
  senderInfoLabel: {
    fontSize: 15,
    color: '#212121'
  },
  senderInfoValue: {
    color: '#FF1744'
  },
  recipientInfoContainer: {
    marginVertical: 20,
    alignSelf: 'stretch',
    paddingHorizontal: 10,
  },
  orderInfoContainer: {
    marginVertical: 20,
    alignSelf: 'stretch',
    paddingHorizontal: 10,
  },
  orderInfoDescription: {
    padding: 5,
    marginVertical: 10,
    borderWidth: 1,
    height: 100
  },
  separator: {
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: '#E0E0E0'
  },
  clear: {
    marginHorizontal: 10,
    backgroundColor: '#FF1744'
  },
  send: {
    marginHorizontal: 10,
  },
});
