import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
  },
  searchContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultContainer: {
    marginTop: 15,
    paddingHorizontal: 20,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  orderName: {
    fontSize: 20
  },
  descriptionContainer: {
    marginVertical: 10,
    maxHeight: 100
  },
  routeContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  routeIcon: {
    color: '#616161',
    fontSize: 15,
    marginHorizontal: 5
  },
  detailsContainer: {
    marginTop: 20,
    alignSelf: 'stretch',
  },
  detailLabel: {
    marginVertical: 3,
    fontSize: 15,
    color: '#212121'
  },
  detailValue: {
    color: '#FF1744'
  },
  receive: {
    width: '100%',
    alignSelf: 'stretch',
  },
  separator: {
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: '#E0E0E0'
  },
});
