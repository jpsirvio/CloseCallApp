import React, { useEffect, useState } from 'react';
import { Button, FlatList, View } from 'react-native';
import * as SQLite from 'expo-sqlite';

const SavedNeoWsScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const db = SQLite.openDatabase('my.db');
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM items;', [], (tx, results) => {
          let temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(JSON.parse(results.rows.item(i).data));
          }
          setData(temp);
        });
      });
    };

    // Use the `focus` event to run the fetchData function when the view is focused
    const focusListener = navigation.addListener('focus', () => {
      fetchData();
    });
    // Cleanup the event listener when the component is unmounted
    return () => {
      focusListener();
    };
  }, [navigation]);

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Button
            title={item.name}
            onPress={() => navigation.navigate('Details', { item, saved: true })}
          />
        )}
      />
    </View>
  );
};

export default SavedNeoWsScreen;
