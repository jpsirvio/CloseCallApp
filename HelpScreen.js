import React from 'react';
import { View, Text, Linking, TouchableOpacity } from 'react-native';

const HelpScreen = () => {
  return (
    <View>
      <Text>CloseCall is mobile device application to track near-Earth Objects (NEOs) in relative close proximity. The application uses open NASA NeoWs API to fetch current day NEOs and lists object details. Application User can store single NEOs in the application for later follow ups.</Text>
      <Text></Text>
      <Text>Application details in Github</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://github.com/jpsirvio/CloseCallApp')}>
        <Text style={{color: 'blue'}}>https://github.com/jpsirvio/CloseCallApp</Text>
      </TouchableOpacity>
      <Text></Text>
      <Text style={{ fontWeight: 'bold'}}>NASA NEO Earth Close Approaches:</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://cneos.jpl.nasa.gov/ca/')}>
        <Text style={{color: 'blue'}}>https://cneos.jpl.nasa.gov/ca/</Text>
      </TouchableOpacity>
      <Text></Text>
      <Text style={{ fontWeight: 'bold'}}>NASA API documentation:</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://api.nasa.gov/')}>
        <Text style={{color: 'blue'}}>https://api.nasa.gov/</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HelpScreen;