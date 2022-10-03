import { Provider, useSelector } from 'react-redux'
import { legacy_createStore as createStore } from 'redux'
import { Statistic } from 'antd'
import 'antd/lib/card/style/index.css'
import 'antd/lib/form/style/index.css'
import 'antd/lib/radio/style/index.css'
import 'antd/lib/slider/style/index.css'
import 'antd/lib/tooltip/style/index.css'
import 'antd/lib/input-number/style/index.css'
import 'antd/lib/statistic/style/index.css'
import 'antd/lib/grid/style/index.css'

import { allReducers } from './reducers'
import CtrlForm from './CtrlForm'
import Formula from './Formula'

const store = createStore(allReducers /* preloadedState, */)

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function OptionValue() {
  const optionValue = useSelector(state => state.optionValue)
  const optionType = useSelector(state => state.optionType)
  return (
    <Statistic
      prefix="$"
      precision={2}
      title={`${capitalize(optionType)} Option Value`}
      value={(Math.round(parseFloat(optionValue) * 100) / 100).toFixed(4)}
    ></Statistic>
  )
}

export default function OptionPricingApp() {
  return (
    <Provider store={store}>
      <div className="App">
        <CtrlForm></CtrlForm>
        <OptionValue></OptionValue>
        <Formula></Formula>
      </div>
    </Provider>
  )
}
