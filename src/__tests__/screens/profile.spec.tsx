import React from 'react'
import { render } from '@testing-library/react-native'

import { Profile } from '../../screens/Profile'

describe('Profile', () => {
  it('Should have placeholder correctly in user name input', () => {
    const { getByPlaceholderText } = render(<Profile />)
    const input = getByPlaceholderText('Nome')
    expect(input).toBeTruthy()
  } )
  
  it('Should be have user data has been loaded', () => {
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
} )