import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useParams } from 'react-router-dom';

import { parseISO, formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { MdInsertDriveFile } from 'react-icons/md';

import api from '../../services/api';
import websocket from '../../services/websocket';

import logo from '../../assets/logo.svg';
import './styles.css';

export default function Box() {
  const { id } = useParams();

  const [box, setBox] = useState(null);

  useEffect(() => {
    async function loadBox() {
      const response = await api.get(`boxes/${id}`);

      const repository = response.data.files.map(file => ({
        ...file,
        dateFormatted: formatDistance(parseISO(file.createdAt), new Date(), {
          locale: ptBR,
          addSuffix: true,
        }),
      }));

      setBox({ ...response.data, repository });
    }

    loadBox();
  }, [id]);

  useEffect(() => {
    websocket.emit('connectRoom', id);

    websocket.on('file', data => {
      setBox({ ...box, files: [data, ...(box ? box.files : [])] });
    });
  }, [id, box]);

  const onDrop = useCallback(
    acceptedFiles => {
      acceptedFiles.forEach(file => {
        const data = new FormData();

        data.append('file', file);

        api.post(`boxes/${id}/files`, data);
      });
    },
    [id]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div id="box-container">
      <header>
        <img src={logo} alt="" />

        <h1>{box?.title}</h1>
      </header>

      <div className="upload" {...getRootProps()}>
        <input {...getInputProps()} />

        <p>Arraste arquivos ou clique aqui</p>
      </div>

      <ul>
        {box?.files &&
          box.files.map(file => (
            <li key={file._id}>
              <a
                className="fileInfo"
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MdInsertDriveFile size={24} color="#A5CFFF" />
                <strong>{file.title}</strong>
              </a>

              <span>{file.dateFormatted}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
