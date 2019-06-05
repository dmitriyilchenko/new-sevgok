import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  inputContainer: {
    padding: 5,
    height: 50,
    width: 200,
    borderWidth: 1,
    marginBottom: 15,
    borderColor: '#607D8B',
    justifyContent: 'center',
  },
  label: {

  },
  placeholder: {
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
    padding: 5,
    height: 30,
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: '#607D8B',
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
    fontSize: 15,
    marginRight: 5,
    color: '#FF1744'
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
