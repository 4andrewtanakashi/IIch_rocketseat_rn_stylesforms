import React from 'react'
import { render } from '@testing-library/react-native'
import { ThemeProvider } from 'styled-components/native'

import { Input } from '.'
import theme from '.../../../src/global/styles/theme'

const Providers: React.FC = ( { children } ) => (
  <ThemeProvider theme={theme}>
    { children }
  </ThemeProvider>
)

describe('Component: Input ', () => {

  it('Must have specific border color when active', () => {
 
    const { getByTestId, debug } = render(
        <Input
          testID={'input-email'}
          placeholder={'E-mail'}
          keyboardType={'email-address'}
          autoCorrect={false}
          active={true}
        />,
        {
          wrapper: Providers
        }
      )
    
    debug()

    const inputComponent = getByTestId('input-email')

    expect(inputComponent.props.style[0].borderWidth).toEqual(3)

    expect(inputComponent.props.style[0].borderColor)
      .toEqual(theme.colors.attention)
  } )
} )