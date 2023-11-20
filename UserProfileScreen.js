import React from 'react';
import { View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const UserProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Button
        title="Back"
        onPress={() => navigation.navigate('Main')}
      />
      <Input
        placeholder='User Name'
      />
      <Input
        placeholder='Password'
        secureTextEntry={true}
      />
    </View>
  );
};

export default UserProfileScreen;
