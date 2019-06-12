import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  inputContainer: {
    padding: 5,
    height: 50,
    width: 200,
    borderWidth: 1,
    marginBottom: 15,
    borderColor: 'rgba(19,30,67, 0.5)',
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'OpenSans',
  },
  placeholder: {
    fontFamily: 'OpenSans',
    color: '#BDBDBD'
  },
  findIconContainer: {
    right: 10,
    position: 'absolute'
  },
  modalContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  modalIcon: {
    alignSelf: 'flex-start',
    marginBottom: 10
  },
  input: {
    fontFamily: 'OpenSans',
    padding: 5,
    height: 30,
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: 'rgba(19,30,67, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    marginVertical: 10,
    alignSelf: 'stretch',
  },
  pickCityButton: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  selectedCity: {
    fontFamily: 'OpenSans',
    fontSize: 15,
    marginRight: 5,
    color: '#FF1744'
  },
  itemLabel: {
    fontFamily: 'OpenSans',
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0'
  },
  itemContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10
  }
});
