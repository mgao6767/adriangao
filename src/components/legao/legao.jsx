import { Provider } from 'react-redux'
import { legacy_createStore as createStore } from 'redux'

import { allReducers } from './reducers'
import UploadDragger from './upload'
import Control from './control'

import 'antd/lib/upload/style/index.css'
import 'antd/lib/button/style/index.css'
import 'antd/lib/progress/style/index.css'
import 'antd/lib/tooltip/style/index.css'
import 'antd/lib/message/style/index.css'
import 'antd/lib/grid/style/index.css'
import 'antd/lib/form/style/index.css'
import 'antd/lib/radio/style/index.css'
import 'antd/lib/slider/style/index.css'
import 'antd/lib/spin/style/index.css'
import 'antd/lib/input-number/style/index.css'

const store = createStore(allReducers /* preloadedState, */)

export default function LeGaoApp() {
  return (
    <Provider store={store}>
      <div className="App">
        <UploadDragger />
        <br />
        <Control />
      </div>
    </Provider>
  )
}
