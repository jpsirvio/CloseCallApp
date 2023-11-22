import React, { useEffect, useState } from 'react';
import { Button, FlatList, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default SavedNeoWsScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  // fetch items from database
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

    // run the fetchData() when the view is focused
    const focusListener = navigation.addListener('focus', () => {
      fetchData();
    });
    // Cleanup the event listener when the component is unmounted
    return () => {
      focusListener();
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemButton}
            onPress={() => navigation.navigate('Details', { item, saved: true })}
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