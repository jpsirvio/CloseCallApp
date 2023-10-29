import React, { useEffect, useState } from 'react';
import { Button, FlatList, View } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${new Date().toISOString().slice(0,10)}&end_date=${new Date().toISOString().slice(0,10)}&api_key=${process.env.NASA_API_KEY}`
      );
      setData(result.data.near_earth_objects[new Date().toISOString().slice(0,10)]);
    };
    fetchData();
  }, []);

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Button
            title={item.name}
            onPress={() => navigation.navigate('Details', { item })}
          />
        )}
      />
    </View>
  );
};

export default HomeScreen;
