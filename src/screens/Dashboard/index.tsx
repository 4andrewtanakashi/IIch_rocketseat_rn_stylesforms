import React from 'react';
import { HighligthCard } from '../../Components/HighlightCard';

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
  HighligthCards
} from './styles';

export function Dashboard() {
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
    </Container>
  )
}