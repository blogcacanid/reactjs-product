import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
// get our fontawesome imports
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 
class ProductDelete extends Component {

    constructor (props) {
        super(props)
        this.state = {
            product_id: '',
            product_name: '',
            product_price: '',
            alert: null,
            message:'',
            errors: []
        }
        this.handleDeleteProduct = this.handleDeleteProduct.bind(this)
    }
 
    handleFieldChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
 
    componentDidMount () {
        const productId = this.props.match.params.id
        axios.get(`http://localhost:8080/api/product/edit/${productId}`).then(response => {
            this.setState({
                product_id: response.data.id,
                product_name: response.data.product_name,
                product_price: response.data.product_price
            })
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
                {this.state.message}
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

    handleDeleteProduct (event) {
        event.preventDefault()
        const product = {
            product_name: this.state.product_name,
            product_price: this.state.product_price
        }
        const productId = this.props.match.params.id
        axios.delete(`http://localhost:8080/api/product/${productId}`, product)
            .then(response => {
                // redirect to the homepage
                var msg = response.data.success;
                if(msg == true){
                    this.setState({
                        message: response.data.message
                    })
                    return this.goToHome();
                }
            });
    }

    render () {
        const { product } = this.state
        return (
            <div className='container py-4'>
                <div className='row'>
                    <div className='col-md-6'>
                      <div className='card'>
                            <div className='card-header'><h3><FontAwesomeIcon icon={faTrash} />&nbsp;Delete Record # {this.state.product_id}</h3></div>
                            <div className='card-body'>
                                <form onSubmit={this.handleDeleteProduct}>
                                    <table className="table table-striped table-bordered" cellspacing="0" style={{fontStyle:'Calibri',fontSize:13}} >
                                        <tbody>
                                            <tr>
                                                <th width="150">Product Name</th>
                                                <td>{this.state.product_name}</td>
                                            </tr>
                                            <tr>
                                                <th>Product Price</th>
                                                <td>{this.state.product_price}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <p><b>Are you sure delete this record ?</b></p>
                                    <Link className='btn btn-secondary' title="Cancel" to={'/'}><FontAwesomeIcon icon={faArrowAltCircleLeft} />&nbsp;Cancel</Link>
                                    &nbsp;&nbsp;
                                    <button className='btn btn-danger' title="Delete Record"><FontAwesomeIcon icon={faTrash} />&nbsp;Delete Record</button>
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

export default ProductDelete