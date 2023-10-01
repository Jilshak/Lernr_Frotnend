import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/Store.jsx'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js/pure";

const stripePromise = loadStripe('pk_test_51NviVdSGOR1waZmRsZM4rDDgS1oergDOYnfV3gX3t440vD0ED6GbO6QukHkcZbHTlaXUBL79UywEh4iQfd91BT4800oYhZiGeX');

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </Router>
  </Provider>
)
