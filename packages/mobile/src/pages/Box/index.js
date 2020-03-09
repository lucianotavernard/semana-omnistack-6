import React, { useState, useEffect } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import { launchImageLibraryAsync } from 'expo-image-picker';

import { parseISO, formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { MaterialIcons } from '@expo/vector-icons';

import api from '../../services/api';
import websocket from '../../services/websocket';

import File from '../../components/File';

import {
  Container,
  BoxTitle,
  FilesList,
  Separator,
  ButtonSubmit,
} from './styles';

export default function Box() {
  const [box, setBox] = useState({});
  const [files, setFiles] = useState([]);

  useEffect(() => {
    async function loadBox() {
      const boxId = await AsyncStorage.getItem('@RocketBox:box');

      const response = await api.get(`boxes/${boxId}`);

      const { files: boxFiles, ...rest } = response.data;

      setBox(rest);
      setFiles(
        boxFiles.map(file => ({
          ...file,
          dateFormatted: formatDistance(parseISO(file.createdAt), new Date(), {
            locale: ptBR,
            addSuffix: true,
          }),
        }))
      );
    }

    loadBox();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('@RocketBox:box').then(boxId => {
      websocket.emit('connectRoom', boxId);

      websocket.on('file', data => {
        setFiles([
          {
            ...data,
            dateFormatted: formatDistance(
              parseISO(data.createdAt),
              new Date(),
              {
                locale: ptBR,
                addSuffix: true,
              }
            ),
          },
          ...files,
        ]);
      });
    });
  }, [files]);

  async function handleSubmit() {
    try {
      const upload = await launchImageLibraryAsync();

      if (upload.cancelled) {
        console.log('Canceled');
      }

      const data = new FormData();

      const [suffix] = upload.uri.split('.').reverse();
      const ext = suffix.toLowerCase() === 'heic' ? 'jpg' : suffix;

      data.append('file', {
        uri: upload.uri,
        type: `${upload.type}/${ext}`,
        name: `${box._id}.${ext}`,
      });

      await api.post(`boxes/${box._id}/files`, data);
    } catch (error) {
      Alert.alert('Oops! Ocorreu um erro ao efetuar o upload :(');
    }
  }

  return (
    <Container>
      <BoxTitle>{box && box.title}</BoxTitle>

      <FilesList
        data={files}
        keyExtractor={item => String(item._id)}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ item: file }) => <File file={file} />}
      />

      <ButtonSubmit onPress={handleSubmit}>
        <MaterialIcons name="cloud-upload" size={24} color="#FFF" />
      </ButtonSubmit>
    </Container>
  );
}
