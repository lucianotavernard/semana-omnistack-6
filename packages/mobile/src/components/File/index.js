import React, { useState } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import * as FileSystem from 'expo-file-system';
import PropTypes from 'prop-types';

import { MaterialIcons } from '@expo/vector-icons';

import { Container, Info, Title, Date } from './styles';

export default function File({ file }) {
  const [loading, setLoading] = useState(false);

  async function handleOpenFile() {
    try {
      setLoading(true);

      const filePath = `${FileSystem.documentDirectory}/${file.path}`;

      await FileSystem.downloadAsync(file.url, filePath);

      Alert.alert('Sucesso! Download efetuado com sucesso.');
    } catch (err) {
      Alert.alert('Oops! Arquivo não suportado :(');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container onPress={handleOpenFile}>
      <Info>
        <MaterialIcons name="insert-drive-file" size={24} color="#A5CFFF" />
        <Title>{file.title}</Title>
      </Info>

      {loading ? (
        <ActivityIndicator size="small" />
      ) : (
        <Date>{file.dateFormatted}</Date>
      )}
    </Container>
  );
}

File.propTypes = {
  file: PropTypes.shape({
    url: PropTypes.string,
    path: PropTypes.string,
    title: PropTypes.string,
    dateFormatted: PropTypes.string,
  }).isRequired,
};
