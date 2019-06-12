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
    fontSize: 20,
    color: '#131E43',
    fontFamily: 'OpenSans-Semibold',
  },
  descriptionContainer: {
    marginVertical: 10,
    maxHeight: 100
  },
  descriptionLabel: {
    color: '#131E43',
    fontFamily: 'OpenSans',
  },
  routeContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  routeLabel: {
    color: '#131E43',
    fontFamily: 'OpenSans',
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
    color: '#131E43',
    fontFamily: 'OpenSans',
  },
  detailValue: {
    color: '#FF1744',
    fontFamily: 'OpenSans',
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
