import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 0 20px;
`;

export const BoxTitle = styled.Text`
  margin-top: 50px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: #333;
`;

export const FilesList = styled.FlatList`
  margin-top: 30px;
`;

export const Separator = styled.View`
  height: 1px;
  background-color: #eee;
`;

export const File = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 20px 0;
`;

export const FileInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ButtonSubmit = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 30px;
  bottom: 30px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #7159c1;
`;
