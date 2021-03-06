import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  title: {
    fontFamily: 'OpenSans',
    marginBottom: 5,
    textAlignVertical: 'center'
  },
  input: {
    fontFamily: 'OpenSans',
    padding: 5,
    height: 50,
    width: 200,
    borderWidth: 1,
    marginBottom: 15,
    borderColor: '#607D8B',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
