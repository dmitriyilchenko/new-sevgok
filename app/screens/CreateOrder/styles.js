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
    fontFamily: 'OpenSans',
    color: '#131E43',
    fontSize: 17,
    marginBottom: 10
  },
  senderInfoLabel: {
    fontSize: 15,
    color: '#131E43',
    fontFamily: 'OpenSans',
  },
  senderInfoValue: {
    fontFamily: 'OpenSans',
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
    marginTop: 5,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: 'rgba(19,30,67, 0.5)',
    height: 100
  },
  separator: {
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: '#E0E0E0'
  },
  clear: {
    fontFamily: 'OpenSans',
    marginHorizontal: 10,
    backgroundColor: '#FF1744'
  },
  send: {
    fontFamily: 'OpenSans',
    marginHorizontal: 10,
  },
});
