import React from 'react'
import { expect } from 'chai'
import { shallow, render } from 'enzyme'
import App from '../components/App'

describe('<App />', () => {
  it('Displays "oh, hey there"', () => {
    let wrapper = shallow(<App />)
    expect(wrapper.text()).to.be.equal(" oh, hey there ")
  })
})
