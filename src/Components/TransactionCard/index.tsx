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

export interface TransactionCardProps {
  type: 'positive' | 'negative',
  title: string;
  amount: string;
  categoryDescription: CategoryProps;
  date: string;

}

interface Props {
  data: TransactionCardProps;
}

export function TransactionCard( {data} : Props) {
  return (
    <Container>
      <Title>{data.title}</Title>
      <Amount type={data.type}>
        { data.type === 'negative' && '- ' }
        R$ {data.amount}
      </Amount>
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