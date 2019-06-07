import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.4)',
    elevation: 9999,
  },
  touchableContainer: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginVertical: 20,
    width: '90%',
    alignItems: 'center'
  },
  title: {
    width: 250,
    fontSize: 18,
    marginVertical: 20,
    textAlign: 'center',
  },
  itemContainer: {
    marginVertical: 5,
    width: 250,
    alignItems: 'center'
  },
  separator: {
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: '#E0E0E0'
  },
});