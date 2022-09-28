import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'

import { useTheme } from 'styled-components'
import { HighligthCard } from '../../components/HighlightCard'
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard'
import { useAuth } from '../../hooks/auth'

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
  TransactionList,
  LogoutButton,
  LoadingContainer
} from './styles'

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighLightProps {
  amountTotal: string
  lastTrasactionDate: string
}

interface HighLightData {
  entries: HighLightProps
  expensives: HighLightProps
  total: HighLightProps
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<DataListProps[]>([])
  const [highLightData, setHighLightData] = useState<HighLightData>({} as HighLightData)

  const theme = useTheme()
  const { signOut, user } = useAuth()

  function getLastTransactionDate (collection : DataListProps[], type : 'positive' | 'negative') {
    const lastTransactionEntries = new Date( Math.max.apply( Math, 
        collection.filter(
          (transaction) => transaction.type === type
        ).map(
          (transaction) => new Date(transaction.date).getTime()
        )
      ) 
    )

    return lastTransactionEntries
  }

  async function loadTransactions () {
    const dataKey = '@gofinances:transactions'
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response? JSON.parse(response) : []

    let entriesTotal = 0
    let expensiveTotal = 0

    const transactionsFormatted : DataListProps[] = transactions.map( 
      (item : DataListProps) => {
        const amount = Number(item.amount)
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          } )

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        } ).format(new Date(item.date))
      
        if (item.type === 'positive') {
          entriesTotal += Number(item.amount)
        } else {
          expensiveTotal += Number(item.amount)
        }

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date
        }
      }
    )
    
    setData(transactionsFormatted)
    
    const lastTrasactionEntries = getLastTransactionDate(transactions, 'positive')
    const lastTrasactionExpensives = getLastTransactionDate(transactions, 'negative')
    const totalInterval = `01 à ${lastTrasactionExpensives.getDate()} de ${lastTrasactionExpensives.toLocaleString('pt-BR', { month: 'long' } ) }`
    

    const total = entriesTotal - expensiveTotal
    setHighLightData( {
        entries: {
          amountTotal: entriesTotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          } ),
          lastTrasactionDate: `${lastTrasactionEntries.getDate()} de ${lastTrasactionEntries.toLocaleString('pt-BR', { month: 'long' } ) }`
        },
        expensives: {
          amountTotal: expensiveTotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          } ),
          lastTrasactionDate: `${lastTrasactionExpensives.getDate()} de ${lastTrasactionExpensives.toLocaleString('pt-BR', { month: 'long' } ) }`
        },
        total: {
          amountTotal: total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          } ),
          lastTrasactionDate: totalInterval
        }
    } )
    setIsLoading(false)
  }

  useFocusEffect(useCallback( () => {
        loadTransactions()
      }, [] 
    )
  )

  return (
    <Container>
      {
        isLoading? 
        <LoadingContainer>
          <ActivityIndicator 
            color={theme.colors.primary}
            size={'large'}
          />
        </LoadingContainer>
        :
        <>
          <Header>
            <UserWrapper> 
              <UserInfo>
                <Photo 
                  source={{ uri: user.photo }} 
                />
                <User>
                  <UserGreeting>Olá, </UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={signOut}>
                <Icon name='power'/>
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighligthCards>
            <HighligthCard
              type={'up'}
              title={'Entradas'}
              amount={highLightData?.entries?.amountTotal}
              lastTransaction={`Última entrada dia ${highLightData.entries.lastTrasactionDate}`}
            />
            <HighligthCard
              type={'down'}
              title={'Saídas'}
              amount={highLightData?.expensives?.amountTotal}
              lastTransaction={`Última saída dia ${highLightData.expensives.lastTrasactionDate}`}
            />
            <HighligthCard
              type={'total'}
              title={'Total'}
              amount={highLightData?.total?.amountTotal}
              lastTransaction={`${highLightData.total.lastTrasactionDate}`}
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
        </>
      }
    </Container>
  )
}