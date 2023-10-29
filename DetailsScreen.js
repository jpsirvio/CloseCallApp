import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, Text, TextInput, View } from 'react-native';
import * as SQLite from 'expo-sqlite';

const DetailsScreen = ({ route, navigation }) => {
    const { item, saved } = route.params;
    const [note, setNote] = useState('');
    const [lastUpdated, setLastUpdated] = useState('');
    const data = Object.entries(item).map(([key, value]) => ({ key, value: JSON.stringify(value) }));

    useEffect(() => {
        if (saved) {
          setNote(item.note || '');
          setLastUpdated(item.lastUpdated || '');
        }
      }, [saved]);
    
    // Unsaved item only!
    // Save NeoW to database
    // First make a check if same unique item already exists
    const saveData = () => {
        const db = SQLite.openDatabase('my.db');
        db.transaction((tx) => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY NOT NULL, data TEXT NOT NULL, note TEXT, lastUpdated TEXT);'
          );
          tx.executeSql(
            'SELECT * FROM items WHERE data LIKE ?;',
            [`%${item.name}%`],
            (tx, results) => {
              if (results.rows.length > 0) {
                Alert.alert('This NeoW is already saved.');
              } else {
                const currentDate = new Date().toISOString();
                tx.executeSql(
                  'INSERT INTO items (data, note, lastUpdated) VALUES (?, ?, ?);',
                  [JSON.stringify(item), note, currentDate],
                  (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                      console.log('Success');
                      setLastUpdated(currentDate);
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

    // Saved item only!
    // Save note for saved NeoW
    const saveNote = () => {
        const db = SQLite.openDatabase('my.db');
        db.transaction((tx) => {
          const currentDate = new Date().toISOString();
          tx.executeSql(
            'UPDATE items SET note = ?, lastUpdated = ? WHERE id = ?;',
            [note, currentDate, item.id],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                console.log('Success');
                setLastUpdated(currentDate);
              } else {
                console.log('Failed');
              }
            }
          );
        });
      };      
    
    // Saved item only!
    // Delete NeoW from database
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
                navigation.navigate('HomeStack');
            } else {
                console.log('Failed');
            }
            }
        );
        });
    };
    // Deletion confirmation
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
    
    // VIEW:
    // List NeoW data
    // If saved Neow:
    //  - show Note field and Save Note Button
    //  - show Delete button
    // If non-saved NeoW:
    //  - show Save button
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
        {saved && (
        <View>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={setNote}
            value={note}
          />
          {lastUpdated && <Text>Last updated: {lastUpdated}</Text>}
          <Button title="Save Note" onPress={saveNote} />
        </View>
        )}
        {!saved && <Button title="Save" onPress={saveData} />}
        {saved && <Button title="Delete" color="red" onPress={confirmDelete} />}
        </View>
    );
};

export default DetailsScreen;
