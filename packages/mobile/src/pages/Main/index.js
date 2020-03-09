import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AsyncStorage } from 'react-native';

import api from '../../services/api';

import logo from '../../assets/logo.png';

import { Container, Content, Logo, Input, Button, ButtonText } from './styles';

export default function Main() {
  const navigation = useNavigation();
  const [newBox, setNewBox] = useState('');

  useEffect(() => {
    async function loadBox() {
      const boxId = await AsyncStorage.getItem('@RocketBox:box');

      if (boxId) navigation.navigate('Box');
    }

    loadBox();
  }, []);

  async function handleSubmit() {
    const response = await api.post('boxes', { title: newBox });

    await AsyncStorage.setItem('@RocketBox:box', response.data._id);

    navigation.navigate('Box', { box: response.data });
  }

  function handleChangeInput(text) {
    setNewBox(text);
  }

  return (
    <Container>
      <Content>
        <Logo source={logo} />

        <Input
          placeholder="Criar um box"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          value={newBox}
          onChangeText={handleChangeInput}
        />

        <Button onPress={handleSubmit}>
          <ButtonText>Criar</ButtonText>
        </Button>
      </Content>
    </Container>
  );
}
