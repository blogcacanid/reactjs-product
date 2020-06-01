import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
// get our fontawesome imports
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 
class ProductCreate extends Component {
     
    constructor (props) {
        super(props)
        this.state = {
            product_name: '',
            product_price: '',
            alert: null,
            errors: []
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleCreateNewProduct = this.handleCreateNewProduct.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }
 
    handleFieldChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
 
    goToHome(){
        const getAlert = () => (
            <SweetAlert
                success
                title="Success!"
                onConfirm={() => this.onSuccess() }
                onCancel={this.hideAlert()}
                timeout={2000}
                confirmBtnText="OK"
                >
                Created product successfully
            </SweetAlert>
        );
        this.setState({
            alert: getAlert()
        });
    }
 
    onSuccess() {
        this.props.history.push('/');
    }
 
    hideAlert() {
        this.setState({
            alert: null
        });
    }
 
    handleCreateNewProduct (event) {
        event.preventDefault()
        const product = {
          product_name: this.state.product_name,
          product_price: this.state.product_price
        }
        axios.post(`http://localhost:8080/api/product/store`, product).then(response => { 
            var msg = response.data.success;
            if(msg =- true){
                return this.goToHome();
            }
        })
    }
 
    hasErrorFor (field) {
        return !!this.state.errors[field]
    }
 
    renderErrorFor (field) {
        if (this.hasErrorFor(field)) {
            return (
            <span className='invalid-feedback'>
                <strong>{this.state.errors[field][0]}</strong>
            </span>
            )
        }
    }
 
    render () {
        return (
            <div className='container py-4'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'><h3><FontAwesomeIcon icon={faPlusCircle} />&nbsp;Add Record</h3></div>
                            <div className='card-body'>
                                <form onSubmit={this.handleCreateNewProduct}>
                                    <div className='form-group'>
                                        <label htmlFor='product_name'>Product Name</label>
                                        <input
                                            id='product_name'
                                            type='text'
                                            className={`form-control ${this.hasErrorFor('product_name') ? 'is-invalid' : ''}`}
                                            name='product_name'
                                            value={this.state.product_name}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor('product_name')}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='product_price'>Product Price</label>
                                        <input
                                            id='product_price'
                                            type='text'
                                            className={`form-control ${this.hasErrorFor('product_price') ? 'is-invalid' : ''}`}
                                            name='product_price'
                                            value={this.state.product_price}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor('product_price')}
                                    </div>
                                    <Link className='btn btn-secondary' title="Cancel" to={'/'}><FontAwesomeIcon icon={faArrowAltCircleLeft} />&nbsp;Cancel</Link>
                                    &nbsp;&nbsp;
                                    <button className='btn btn-success' title="Save Record"><FontAwesomeIcon icon={faSave} />&nbsp;Save Record</button>
                                    {this.state.alert}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductCreate