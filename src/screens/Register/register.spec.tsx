import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import { ThemeProvider } from 'styled-components'

import { Register } from '.'
import theme from '.../../../src/global/styles/theme'


const Providers: React.FC = ( { children } ) => (
  <ThemeProvider theme={theme}>
    { children }
  </ThemeProvider>
)

describe('Register Screen', () => {
  it('Should be open category modal when user click onte category button',
    async () => {
      const { getByTestId } = render( <Register />, { wrapper: Providers } )
      
      const categoryModal = getByTestId('modal-category')
      const buttonCategory = getByTestId('button-category')
      fireEvent.press(buttonCategory)
      await waitFor( () => {
        expect(categoryModal.props.visible).toBeTruthy()
      } )
    } )
} )