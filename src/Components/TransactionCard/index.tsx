import React from "react";

import { 
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryDescription,
  DateAction
} from './styles';

export function TransactionCard() {
  return (
    <Container>
      <Title>Desenvolvimento de site</Title>
      <Amount>R$ 12.000,00</Amount>
      <Footer>
        <Category>
          <Icon name={'dollar-sign'}/>
          <CategoryDescription>Vendas</CategoryDescription>
        </Category>
        <DateAction>10/08/2020</DateAction>
      </Footer>
    </Container>
  )
}