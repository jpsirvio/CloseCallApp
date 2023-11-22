import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from '@firebase/auth';
import { KeyboardAvoidingView } from 'react-native';

export default UserProfileScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  // Handle user sign in
  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      navigation.navigate('Main')
    } catch (error) {
      console.log(error);
      alert('Signing in failed: ' + error.message)
    } finally {
      setLoading(false);
    }
  }

  // Handle user registration
  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert(email + ' registered as user')
    } catch (error) {
      console.log(error);
      alert('Registering failed: ' + error.message)
    } finally {
      setLoading(false);
    }
  }

  // Check if user is signed in
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    })
  }, [])

  return (
    <View style={styles.container}>
      {user && <View><Text style={styles.detailsText}>Signed in as {user.email}</Text>
        <>
          <TouchableOpacity
            style={styles.itemButton}
            onPress={() => FIREBASE_AUTH.signOut()}>
              <Text style={styles.itemButtonText}>Sign out</Text>
          </TouchableOpacity>
        </></View>}
      {!user && <KeyboardAvoidingView behavior='padding'>
        <Input
          value={email}
          placeholder='User Name'
          autoCapitalize='none'
          onChangeText={(text) => setEmail(text)}
          containerStyle={{backgroundColor: '#F0FFFF', margin: 10, width: '95%'}}
          inputStyle={{fontSize: 20, fontWeight: '500'}}
          leftIcon={{ type: 'material', name: 'chevron-right'}}
        />
        <Input
          secureTextEntry={true}
          value={password}
          placeholder='password'
          autoCapitalize='none'
          onChangeText={(text) => setPassword(text)}
          containerStyle={{backgroundColor: '#F0FFFF', margin: 10, width: '95%'}}
          inputStyle={{fontSize: 20, fontWeight: '500'}}
          leftIcon={{ type: 'material', name: 'chevron-right'}}
        />
        { loading 
        ? <ActivityIndicator size="large" color="#0000gg" />
        : <>
            <TouchableOpacity
            style={styles.itemButton}
            onPress={signIn}>
              <Text style={styles.itemButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.itemButton}
            onPress={signUp}>
              <Text style={styles.itemButtonText}>Register account</Text>
            </TouchableOpacity>
          </>
        }
      </KeyboardAvoidingView>}
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
  input: {
    color: '#F0FFFF',
  },

})