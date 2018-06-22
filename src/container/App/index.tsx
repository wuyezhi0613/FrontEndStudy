import * as React from 'react'
import Loadable from 'react-loadable'
import Loading from '../../components/Loading'

const AppLoadable = Loadable({
  loader: () => import('./AppSrc'),
  loading: Loading
})

// export default class LoadableApp extends React.Component {
//   render() {
//     return <App />
//   }
// }
export default function App () {
  return <AppLoadable />
}