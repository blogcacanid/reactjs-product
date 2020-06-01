import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import ProductIndex from './components/ProductIndex';
import ProductCreate from './components/ProductCreate';
import ProductShow from './components/ProductShow';
import ProductEdit from './components/ProductEdit';
import ProductDelete from './components/ProductDelete';
import './App.css';
 
class App extends Component {
    render () {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path='/' component={ProductIndex}/>
                        <Route path='/product/create' component={ProductCreate} />
                        <Route path='/product/edit/:id' component={ProductEdit} />
                        <Route path='/product/delete/:id' component={ProductDelete} />
                        <Route path='/product/:id' component={ProductShow} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}
 
export default App
