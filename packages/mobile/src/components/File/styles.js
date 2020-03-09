import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 20px 0;
`;

export const Info = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  margin-left: 10px;
  color: #333;
  font-size: 16px;
`;

export const Date = styled.Text`
  color: #666;
  font-size: 14px;
`;
