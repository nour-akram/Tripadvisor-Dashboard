import React from 'react'
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import CardTable from '../../components/UI/Cards/CardTable';
const index = () => {
  return (
    <Provider store={store}>
    <div >
<CardTable endpoint="/resturants" type="restaurant"/>
    </div>
  </Provider>
  )
}

export default index
