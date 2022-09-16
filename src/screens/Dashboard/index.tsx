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
        <HighligthCard />
        <HighligthCard />
        <HighligthCard />
      </HighligthCards>
    </Container>
  )
}