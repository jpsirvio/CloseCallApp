import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@firebase/auth';
import { KeyboardAvoidingView } from 'react-native';

const UserProfileScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

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

  return (
    <View>
      <KeyboardAvoidingView behavior='padding'>
        <Input
          value={email}
          placeholder='User Name'
          autoCapitalize='none'
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          secureTextEntry={true}
          value={password}
          placeholder='password'
          autoCapitalize='none'
          onChangeText={(text) => setPassword(text)}
        />
        { loading 
        ? <ActivityIndicator size="large" color="#0000gg" />
        : <>
            <Button
            title="Login"
            onPress={signIn} />
            <Button
            title="Register account"
            onPress={signUp} />
          </>
        }
      </KeyboardAvoidingView>
    </View>
  );
};

export default UserProfileScreen;
