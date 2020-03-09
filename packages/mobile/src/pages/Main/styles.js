import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #fff;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: stretch;
  padding: 0 30px;
`;

export const Logo = styled.Image`
  align-self: center;
`;

export const Input = styled.TextInput`
  align-self: stretch;
  height: 44px;
  margin: 30px 0 0;
  padding: 0 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

export const Button = styled.TouchableOpacity`
  align-self: stretch;
  justify-content: center;
  align-items: center;
  height: 44px;
  margin: 10px 0 0;
  padding: 0 15px;
  border-radius: 5px;
  background-color: #7159c1;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
