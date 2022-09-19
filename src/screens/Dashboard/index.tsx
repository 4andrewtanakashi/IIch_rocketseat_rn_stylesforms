import React from 'react';
import { HighligthCard } from '../../Components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../Components/TransactionCard/';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighligthCards,
  Transactions,
  Title,
  TransactionList
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data : DataListProps[] = [ 
    {
      id: '0',
      type: 'positive',
      title: 'Desenvolvimento de site',
      amount: '12.000,00',
      categoryDescription: {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date: '13/04/2020'
    },
    {
      id: '1',
      type: 'negative',
      title: 'Hamburgueria Pizzy',
      amount: '59,00',
      categoryDescription: {
        name: 'Alimentação',
        icon: 'coffee'
      },
      date: '10/04/2020'
    },
    {
      id: '2',
      type: 'negative',
      title: 'Aluguel do apartamento',
      amount: '1.200,00',
      categoryDescription: {
        name: 'Casa',
        icon: 'home'
      },
      date: '27/03/2022'
    } 
  ]
  return (
    <Container>
      <Header>
        <UserWrapper> 
          <UserInfo>
            <Photo 
              source={{ uri: 'https://avatars.githubusercontent.com/u/35871646?v=4' }} 
            />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>4SHI</UserName>
            </User>
          </UserInfo>
          <Icon name='power'/>
        </UserWrapper>
      </Header>

      <HighligthCards>
        <HighligthCard
          type={'up'}
          title={'Entradas'}
          amount={'17.400,00'}
          lastTransaction={'Última entrada dia 13 de abril'}
        />
        <HighligthCard
          type={'down'}
          title={'Saídas'}
          amount={'1.259,00'}
          lastTransaction={'Última entrada dia 03 de abril'}
        />
        <HighligthCard
          type={'total'}
          title={'Total'}
          amount={'16.141,00'}
          lastTransaction={'01 à 16 de abril'}
        />
      </HighligthCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
          keyExtractor={ item => item.id }
          renderItem={ ({item}) => <TransactionCard data={item}/> }
        />
        
      </Transactions>
    </Container>
  )
}