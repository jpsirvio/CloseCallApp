import React from 'react';
import { Alert, Button, Text, View, Linking, TouchableOpacity, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default DetailsScreen = ({ route, navigation }) => {
    const { item, saved } = route.params;
    const data = Object.entries(item).map(([key, value]) => ({ key, value: JSON.stringify(value) }));
    
  // Unsaved item only!
  // Save NEO to database:
  // Check if db table exists, create if doesn't.
  // Then check if the item is already in db. Stop and alert if same item is found.
  // Then insert item in db.
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
                  console.log('Saving item succeeded');
                } else {
                  console.log('Saving item failed');
                  Alert.alert('Saving item failed');
                }
              }
            );
          }
        }
      );
    });
  };
  
    
  // Saved item only!
  // Delete NEO from database:
  // Then navigate to Saved NEOs screen.
  // Alert if error.
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
            } else {
              console.log('Deletion failed');
              Alert.alert('Deletion failed');
            }
          },
          (_, error) => {
            console.error('Error during DELETE:', error);
            Alert.alert('Error during DELETE:', error);
          }
        );
      },
      (error) => {
        console.error('Error during transaction:', error);
        Alert.alert('Error during transaction:', error);
      }
    );
  };


    
  // VIEW:
  // List selected NEO (item) data
  //      name
  //      id
  //      is_potentially_hazardous_asteroid
  //      nasa_jpl_url
  //      absolute_magnitude_h
  //      estimated_diameter.meters.estimated_diameter_min
  //      estimated_diameter.meters.estimated_diameter_max
  //      close_approach_data[0].relative_velocity.kilometers_per_hour
  //      close_approach_data[0].miss_distance.kilometers
  // If saved NEO:
  //  - show Delete button
  // If non-saved NEO:
  //  - show Save button
  return (
    <View style={styles.container}>
      <View>
        
        <Text style={styles.detailsTextHeader}>Name:</Text>
        <Text style={styles.detailsText}>{item.name}</Text>

        <Text style={styles.detailsTextHeader}>ID:</Text>
        <Text style={styles.detailsText}>{item.id}</Text>

        <Text style={styles.detailsTextHeader}>Potentially hazardous?</Text>
        <Text style={styles.detailsText}>{item.is_potentially_hazardous_asteroid?'true':'false'}</Text>

        <Text style={styles.detailsTextHeader}>NASA URL:</Text>
        <TouchableOpacity onPress={() => Linking.openURL(item.nasa_jpl_url)}>
          <Text style={styles.detailsLink}>{item.nasa_jpl_url}</Text>
        </TouchableOpacity>

        <Text style={styles.detailsTextHeader}>Absolute magnitude:</Text>
        <Text style={styles.detailsText}>{item.absolute_magnitude_h}</Text>       

        <Text style={styles.detailsTextHeader}>Estimated diameter:</Text>
        <Text style={styles.detailsText}>{item.estimated_diameter.meters.estimated_diameter_min.toFixed(2)} - {item.estimated_diameter.meters.estimated_diameter_max.toFixed(2)} m</Text>
        
        <Text style={styles.detailsTextHeader}>Relative Velocity</Text>  
        <Text style={styles.detailsText}>{parseFloat(item.close_approach_data[0].relative_velocity.kilometers_per_hour).toLocaleString('fi-FI', { maximumFractionDigits: 0 })} km/s</Text>
        
        <Text style={styles.detailsTextHeader}>Miss Distance</Text>
        <Text style={styles.detailsText}>{parseFloat(item.close_approach_data[0].miss_distance.kilometers).toLocaleString('fi-FI', { maximumFractionDigits: 0 })} km</Text>            
      
      </View>
      {!saved && <TouchableOpacity 
        style={styles.saveButton} onPress={saveData}>
          <Text style={styles.itemButtonText}>Save NEO</Text>
      </TouchableOpacity>}
      {saved && <TouchableOpacity 
        style={styles.deleteButton} onPress={deleteItem}>
          <Text style={styles.itemButtonText}>Remove saved NEO</Text>
      </TouchableOpacity>}
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
  saveButton: {
    backgroundColor: '#1E90FF',
    width: '97%',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#DC143C',
    width: '97%',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
})