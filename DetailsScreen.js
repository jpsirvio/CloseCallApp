import React from 'react';
import { Alert, Button, FlatList, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';

const DetailsScreen = ({ route, navigation }) => {
  const { item, saved } = route.params;
  const data = Object.entries(item).map(([key, value]) => ({ key, value: JSON.stringify(value) }));

  const saveData = () => {
    const db = SQLite.openDatabase('my.db');
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM items WHERE data LIKE ?;',
        [`%${item.name}%`],
        (tx, results) => {
          if (results.rows.length > 0) {
            Alert.alert('This NeoW is already saved.');
          } else {
            tx.executeSql(
              'INSERT INTO items (data) VALUES (?);',
              [JSON.stringify(item)],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  console.log('Success');
                } else {
                  console.log('Failed');
                }
              }
            );
          }
        }
      );
    });
  };
  const deleteData = () => {
    const db = SQLite.openDatabase('my.db');
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM items WHERE id = ?;',
        [item.id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('Success');
            navigation.navigate('Home');
          } else {
            console.log('Failed');
          }
        }
      );
    });
  };

  const confirmDelete = () =>
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        { text: 'OK', onPress: deleteData }
      ],
      { cancelable: false }
    );

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View>
            <Text style={{ fontWeight: 'bold' }}>{item.key}:</Text>
            <Text>{item.value}</Text>
          </View>
        )}
      />
      {!saved && <Button title="Save" onPress={saveData} />}
      {saved && <Button title="Delete" color="red" onPress={confirmDelete} />}
    </View>
  );
};

export default DetailsScreen;
