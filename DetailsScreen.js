import React, { useEffect, useState } from 'react';
import { Alert, Button, Text, View, Linking, TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite';

const DetailsScreen = ({ route, navigation }) => {
    const { item, saved } = route.params;
    const data = Object.entries(item).map(([key, value]) => ({ key, value: JSON.stringify(value) }));
    
  // Unsaved item only!
  // Save NEO to database
  // First make a check if same unique item already exists
  const saveData = () => {
    const db = SQLite.openDatabase('my.db');
  
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, data TEXT NOT NULL);'
      );
      tx.executeSql(
        'SELECT * FROM items WHERE data LIKE ?;',
        [`%${item.name}%`],
        (tx, results) => {
          if (results.rows.length > 0) {
            Alert.alert('This NEO is already saved.');
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
  
    
  // Saved item only!
  // Delete NEO from database
  const deleteItem = () => {
    const db = SQLite.openDatabase('my.db');

    db.transaction(
      (tx) => {
        tx.executeSql(
          'DELETE FROM items WHERE data = ?;',
          [JSON.stringify(item)],
          (_, results) => {
            if (results.rowsAffected > 0) {
              console.log('Deletion success');
              navigation.navigate('Saved NEOs');
              // Optionally, you can navigate here or perform any other actions after successful deletion
            } else {
              console.log('Deletion failed');
              // Optionally, show an alert or handle failure
            }
          },
          (_, error) => {
            console.error('Error during DELETE:', error);
            // Optionally, show an alert or handle error
          }
        );
      },
      (error) => {
        console.error('Error during transaction:', error);
        // Optionally, show an alert or handle error
      }
    );
  };


    
  // VIEW:
  // List NEO data
  // If saved NEO:
  //  - show Delete button
  // If non-saved NEO:
  //  - show Save button
  return (
    <View>
    <View>
      <Text style={{ fontWeight: 'bold' }}>Name:</Text>
      <Text>{item.name}</Text>
      <Text style={{ fontWeight: 'bold' }}>ID:</Text>
      <Text>{item.id}</Text>
      <Text style={{ fontWeight: 'bold' }}>Potentially hazardous?</Text>
      <Text>{item.is_potentially_hazardous_asteroid?'true':'false'}</Text>
      <Text style={{ fontWeight: 'bold' }}>NASA URL:</Text>
      <TouchableOpacity onPress={() => Linking.openURL(item.nasa_jpl_url)}>
        <Text style={{color: 'blue'}}>{item.nasa_jpl_url}</Text>
      </TouchableOpacity>
      <Text style={{ fontWeight: 'bold' }}>Absolute magnitude:</Text>
      <Text>{item.absolute_magnitude_h}</Text>       
      <Text style={{ fontWeight: 'bold' }}>Estimated diameter:</Text>
      <Text>{item.estimated_diameter.meters.estimated_diameter_min.toFixed(2)} - {item.estimated_diameter.meters.estimated_diameter_max.toFixed(2)} m</Text>
      <Text style={{ fontWeight: 'bold' }}>Relative Velocity</Text>  
      <Text>{parseFloat(item.close_approach_data[0].relative_velocity.kilometers_per_hour).toLocaleString('fi-FI', { maximumFractionDigits: 0 })} km/s</Text>
      <Text style={{ fontWeight: 'bold' }}>Miss Distance</Text>
      <Text>{parseFloat(item.close_approach_data[0].miss_distance.kilometers).toLocaleString('fi-FI', { maximumFractionDigits: 0 })} km</Text>            
    </View>
    {!saved && <Button title="Save" onPress={saveData} />}
    {saved && <Button title="Remove saved NEO" color="red" onPress={deleteItem} />}
    </View>
  );
};

export default DetailsScreen;
