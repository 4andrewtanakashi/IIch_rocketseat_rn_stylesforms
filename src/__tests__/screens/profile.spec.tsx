import React from 'react'
import { render } from '@testing-library/react-native'

import { Profile } from '../../screens/Profile'

test('Check if show correctly user input name placeholder', () => {
  const { getByPlaceholderText } = render(<Profile />)
  const input = getByPlaceholderText('Nome')
  expect(input).toBeTruthy()
} )

test('Check if user data has been loaded', () => {
  const { getByTestId } = render(<Profile />)
  const inputName = getByTestId('input-name')
  const inputSurname = getByTestId('input-surname')

  expect(inputName.props.value).toEqual('Yusuke')
  expect(inputSurname.props.value).toEqual('Urameshi')
} )

test('checks of title render correctly', () => {
  const { getByTestId } = render(<Profile />)
  const textTitle = getByTestId('text-title')
  expect(textTitle.props.children).toContain('Perf')
} )