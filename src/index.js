import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import App from './containers/App'
import rootReducer from './reducers'
import inputReader from './middlewares/inputReader'

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(inputReader))
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
