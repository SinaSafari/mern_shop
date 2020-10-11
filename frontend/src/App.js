import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// UI Component
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'

// public
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'

// authentication
import LoginScreen from './screens/auth/LoginScreen'
import RegisterScreen from './screens/auth/RegisterScreen'
import ProfileScreen from './screens/auth/ProfileScreen'

// puchase proccess
import CartScreen from './screens/purchase/CartScreen'
import ShippingScreen from './screens/purchase/ShippingScreen'
import PaymentScreen from './screens/purchase/PaymentScreen'
import PlaceOrderScreen from './screens/purchase/PlaceOrderScreen'
import OrderScreen from './screens/purchase/OrderScreen'

// admin specific
import UserListScreen from './screens/admin/UserListScreen'
import UserEditScreen from './screens/admin/UserEditScreen'
import ProductListScreen from './screens/admin/ProductListScreen'
import ProductEditScreen from './screens/admin/ProductEditScreen'
import OrderListScreen from './screens/admin/OrderListScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          {/* authentication routes */}
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />

          {/* purchase proccess routes */}
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />

          {/* admin specific routes */}
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/admin/productlist' component={ProductListScreen} exact />
          <Route path='/admin/productlist/:pageNumber' component={ProductListScreen} exact />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />

          {/* public routes */}
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact />
          <Route path='/' component={HomeScreen} exact />

        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
