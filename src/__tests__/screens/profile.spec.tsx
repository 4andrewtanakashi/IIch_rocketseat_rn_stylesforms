import React from 'react'
import { render } from '@testing-library/react-native'

import { Profile } from '../../screens/Profile'

test('Check if show correctly button name placeholder', () => {
  const { debug } = render(<Profile />)
  debug()
} )