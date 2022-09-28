import React, { useCallback, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator } from 'react-native'
import { VictoryPie } from 'victory-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { addMonths, subMonths, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectIcon,
  MonthSelectButton,
  Month,
  LoadingContainer
 } from './styles'
import { HistoryCard } from '../../components/HistoryCard'
import { TransactionCardProps } from '../../components/TransactionCard'
import { categories } from '../../utils/categories'
import { useFocusEffect } from '@react-navigation/native'
import { useAuth } from '../../hooks/auth'

interface CategoryData {
  key: string
  name: string
  totalFormatted: string
  color: string
  total: number,
  percent: string
}

export function Resume() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [totalCategories, setTotalByCategories] = useState<CategoryData[]>([])

  const theme = useTheme()
  const { user } = useAuth()

  function handleDateChange (action: 'next' | 'prev') {
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1))
    } else {
      setSelectedDate(subMonths(selectedDate, 1))
    }
  }

  async function loadingData () {
    setIsLoading(true)
    const dataKey = `@gofinances:transactions_user:${user.id}`
    const response = await AsyncStorage.getItem(dataKey)
    const responseFormatted = response? JSON.parse(response) : []

    const expensives = responseFormatted
      .filter( (expensive : TransactionCardProps) => 
        expensive.type === 'negative' && 
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
      )
    
    const expensivesTotal = expensives
      .reduce( (acumullator: number, expensive: TransactionCardProps) => {
        return acumullator + Number(expensive.amount)
      }, 0)
    
    const totalByCategory : CategoryData[] = []
    
    categories.forEach( category => {
      let categorySum = 0
      
      expensives.forEach( (expensive : TransactionCardProps) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount)
        }
      } )

      if (categorySum > 0) {
        const totalFormatted = categorySum
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          } )
        
        const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`

        totalByCategory.push( {
          key: category.key,
          name: category.name,
          color: category.color,
          totalFormatted,
          total: categorySum,
          percent
        } )
      }
    } )
    setTotalByCategories(totalByCategory)
    setIsLoading(false)
  }

  useFocusEffect(useCallback( () => {
    loadingData()
    }, [selectedDate] )
  )

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      {
        isLoading? 
        <LoadingContainer>
          <ActivityIndicator 
            color={theme.colors.primary}
            size={'large'}
          />
        </LoadingContainer>
        :
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={ {
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight()
          } }
        >

          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange('prev')}>
              <MonthSelectIcon name={'chevron-left'} />
            </MonthSelectButton>

            <Month>{ format(selectedDate, 'MMMM, yyyy', {locale: ptBR} ) }</Month>

            <MonthSelectButton onPress={() => handleDateChange('next')}>
              <MonthSelectIcon name={'chevron-right'} />
            </MonthSelectButton>

          </MonthSelect>

          <ChartContainer>
            <VictoryPie
              data={totalCategories}
              colorScale={totalCategories.map( category => category.color) }
              style={ {
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fill: theme.colors.shape
                }
              } }
              labelRadius={50}
              x={'percent'}
              y={'total'}
            />
          </ChartContainer>
          
            {
              totalCategories.map( item =>
                <HistoryCard
                  key={item.key}
                  title={item.name}
                  amount={item.totalFormatted}
                  color={item.color}
                />
              )
            }
        </Content>
      
      }
    </Container>
  )
}