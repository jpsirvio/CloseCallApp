import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';

export default CurrentNeosScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  // fetch current day NEO data from API
  // NASA_API_KEY imported from .env
  // For testing: DEMO_KEY can be used as API key, but not that the usage is limited.
  useEffect(() => {
    const fetchData = async () => {
      try {
      const result = await axios(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${new Date().toISOString().slice(0,10)}&end_date=${new Date().toISOString().slice(0,10)}&api_key=${process.env.NASA_API_KEY}`
        //`https://api.nasa.gov/neo/rest/v1/feed?start_date=${new Date().toISOString().slice(0,10)}&end_date=${new Date().toISOString().slice(0,10)}&api_key=DEMO_KEY`
      );
      setData(result.data.near_earth_objects[new Date().toISOString().slice(0,10)]);
      console.log('data fetched');
      } catch (error) {
        console.error(error.response.data);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemButton}
            onPress={() => navigation.navigate('Details', { item })}
          >
            <Text style={styles.itemButtonText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
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