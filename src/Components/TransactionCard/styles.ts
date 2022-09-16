import styled from 'styled-components/native';
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
  background-color: ${ ({theme}) => theme.colors.shape};
  border-radius: 5px;
  padding: 17px 24px;
`;

export const Title = styled.Text`
  font-family: ${ ({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${ ({theme}) => theme.colors.text_dark};
`;

export const Amount = styled.Text`
  font-family: ${ ({theme}) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
  color: ${ ({theme}) => theme.colors.success};
  margin-top: ${RFValue(2)}px;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 19px;
`;

export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${ ({theme}) => theme.colors.text};
`;

export const CategoryDescription = styled.Text`
  font-family: ${ ({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${ ({theme}) => theme.colors.text};
  margin-left: 17px;
`;

export const DateAction = styled.Text`
  font-family: ${ ({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${ ({theme}) => theme.colors.text};
`;
