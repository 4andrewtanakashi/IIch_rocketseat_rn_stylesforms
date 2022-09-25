import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { VictoryPie } from 'victory-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectIcon,
  MonthSelectButton,
  Month
 } from './styles'
import { HistoryCard } from '../../components/HistoryCard'
import { TransactionCardProps } from '../../components/TransactionCard'
import { categories } from '../../utils/categories'

interface CategoryData {
  key: string
  name: string
  totalFormatted: string
  color: string
  total: number,
  percent: string
}

export function Resume() {
  const [time, setTime] = useState(2)
  const [totalCategories, setTotalByCategories] = useState<CategoryData[]>([])

  const theme = useTheme()

  async function loadingData () {
    const dataKey = '@gofinances:transactions'
    const response = await AsyncStorage.getItem(dataKey)
    const responseFormatted = response? JSON.parse(response) : []

    const expensives = responseFormatted
      .filter( (expensive : TransactionCardProps) => expensive.type === 'negative')
    
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
  }

  useEffect( () => {
    const t = setInterval(
      () => setTime(2),
      200,
    );
    loadingData()
    return () => clearInterval(t)
  }, [] )

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={ {
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight()
        } }
      >

        <MonthSelect>
          <MonthSelectButton>
            <MonthSelectIcon name={'chevron-left'} />
          </MonthSelectButton>

          <Month>Agosto</Month>

          <MonthSelectButton>
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
    </Container>
  )
}