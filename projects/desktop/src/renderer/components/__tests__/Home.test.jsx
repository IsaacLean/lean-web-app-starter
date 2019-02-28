import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'

import Home from '../Home'

Enzyme.configure({ adapter: new Adapter() })

describe('Home', () => {
  it('renders properly', () => {
    const component = shallow(<Home />)
    expect(component).toMatchSnapshot()
  })
})
