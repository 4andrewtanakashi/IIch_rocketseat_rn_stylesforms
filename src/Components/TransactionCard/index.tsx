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

interface CategoryProps {
  name: string;
  icon: string;
}

interface Data {
  title: string;
  amount: string;
  categoryDescription: CategoryProps;
  date: string;

}

interface Props {
  data: Data;
}

export function TransactionCard( {data} : Props) {
  return (
    <Container>
      <Title>{data.title}</Title>
      <Amount>R$ {data.amount}</Amount>
      <Footer>
        <Category>
          <Icon name={data.categoryDescription.icon}/>
          <CategoryDescription>{data.categoryDescription.name}</CategoryDescription>
        </Category>
        <DateAction>{data.date}</DateAction>
      </Footer>
    </Container>
  )
}