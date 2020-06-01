import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// get our fontawesome imports
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 
class ProductShow extends Component {
    constructor (props) {
        super(props)
        this.state = {
            product: {}
        }
    }

    componentDidMount () {
        const productId = this.props.match.params.id
        axios.get(`http://localhost:8080/api/product/${productId}`).then(response => {
            this.setState({
                product: response.data
            })
        })
    }

    render () {
        const { product } = this.state
        return (
            <div className='container py-4'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'><h3><FontAwesomeIcon icon={faEye} />&nbsp;View Record # {product.id}</h3></div>
                            <div className='card-body'>
                                <table className="table table-striped table-bordered" cellspacing="0" style={{fontStyle:'Calibri',fontSize:13}} >
                                    <tbody>
                                        <tr>
                                            <th width="150">Product Name</th>
                                            <td>{product.product_name}</td>
                                        </tr>
                                        <tr>
                                            <th>Product Price</th>
                                            <td>{product.product_price}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Link className='btn btn-secondary' title="Back" to={'/'}><FontAwesomeIcon icon={faArrowAltCircleLeft} />&nbsp;Back</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
 
export default ProductShow