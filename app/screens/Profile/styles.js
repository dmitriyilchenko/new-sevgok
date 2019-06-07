import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  infoContainer: {
    marginTop: 20,
    alignSelf: 'stretch',
    paddingHorizontal: 10
  },
  fullname: {
    fontSize: 25,
  },
  warehouse: {
    fontSize: 15,
    marginBottom: 10
  },
  updateInfoContainer: {
    marginVertical: 20,
    alignSelf: 'stretch',
    paddingHorizontal: 10,
  },
  updateInfoItem: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  updateItemLabel: {
    maxWidth: '50%',
    fontSize: 16
  },
  input: {
    padding: 5,
    height: 50,
    width: 200,
    borderWidth: 1,
    marginBottom: 15,
    borderColor: '#607D8B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOut: {
    width: '100%',
    alignSelf: 'stretch',
    backgroundColor: '#FF1744'
  },
  separator: {
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: '#E0E0E0'
  },
});
