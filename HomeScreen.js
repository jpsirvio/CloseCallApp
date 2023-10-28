import React, { useEffect, useState } from 'react';
import { Button, FlatList, View } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${new Date().toISOString().slice(0,10)}&end_date=${new Date().toISOString().slice(0,10)}&api_key=7kAlXl3XmDxE1rf6jEXYeRLjW67ZxeXrQiQwmRNN`
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
      <Button title="Go to Saved NeoWs" onPress={() => navigation.navigate('Saved NeoWs')} />
    </View>
  );
};

export default HomeScreen;
