import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import Footer from '../Footer'

Enzyme.configure({ adapter: new Adapter() })

describe('Footer', () => {
    it('renders properly', () => {
        const component = shallow(<Footer />)
        expect(component).toMatchSnapshot()
    })
})