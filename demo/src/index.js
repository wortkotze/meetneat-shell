import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store'
import { addLocalizationData } from '../../src/locales'
import locales from './locales'
import themes from './themes'
import registerServiceWorker from '../../src'
import App from '../../src'
import config from './config'
import getMenuItems from './menuItems'
import Routes from './Routes'


addLocalizationData(locales)

class Demo extends Component {

  render() {

    const appConfig = {
      configureStore: configureStore,
      firebaseLoad: () => import('./firebase'),
      getMenuItems,
      locales,
      routes: Routes,
      themes,
      ...config
    }

    return <App appConfig={appConfig} />
  }
}

render(<Demo />, document.querySelector('#demo'))

registerServiceWorker()
