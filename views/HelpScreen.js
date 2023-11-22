import React from 'react';
import { View, Text, Linking, TouchableOpacity, StyleSheet } from 'react-native';

export default HelpScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.detailsText}>CloseCall is mobile device application to track near-Earth Objects (NEOs) in relative close proximity. The application uses open NASA NeoWs API to fetch current day NEOs and lists object details. Application User can store single NEOs in the application for later follow ups.</Text>
      <Text></Text>
      <Text style={styles.detailsText}>Application details in Github</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://github.com/jpsirvio/CloseCallApp')}>
        <Text style={styles.detailsLink}>https://github.com/jpsirvio/CloseCallApp</Text>
      </TouchableOpacity>
      <Text></Text>
      <Text style={styles.detailsTextHeader}>NASA NEO Earth Close Approaches:</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://cneos.jpl.nasa.gov/ca/')}>
        <Text style={styles.detailsLink}>https://cneos.jpl.nasa.gov/ca/</Text>
      </TouchableOpacity>
      <Text></Text>
      <Text style={styles.detailsTextHeader}>NASA API documentation:</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://api.nasa.gov/')}>
        <Text style={styles.detailsLink}>https://api.nasa.gov/</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles= StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#A9A9A9',
    alignItems: 'stretch',
    paddingLeft: 5,
    paddingRight: 5,
  },
  itemButton: {
    backgroundColor: '#2F4F4F',
    width: '97%',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  itemButtonText: {
    color: '#FFFAF0',
    fontWeight: '700',
    fontSize: 16,
  },
  detailsTextHeader: {
    fontWeight: '900',
    fontSize: 20,
    color: '#000000',
  },
  detailsText: {
    fontWeight: '400',
    fontSize: 18,
    color: '#000000',
    paddingBottom: 15,
  },
  detailsLink: {
    color: '#0000CD',
    fontWeight: '400',
    fontSize: 16,
  },

})