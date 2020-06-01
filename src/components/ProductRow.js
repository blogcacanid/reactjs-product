import React, {Component} from 'react';
import { Link } from 'react-router-dom';
// get our fontawesome imports
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 
class ProductRow extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <tr>
                <td width="100" className="text-center">
                    <div className="btn-group">
                        <Link className='btn btn-default btn-sm' title="View Record" to={`/product/${this.props.obj.id}`}><FontAwesomeIcon icon={faEye} /></Link>
                        <Link className='btn btn-default btn-sm' title="Edit Record" to={`/product/edit/${this.props.obj.id}`}><FontAwesomeIcon icon={faEdit} /></Link>
                        <Link className='btn btn-default btn-sm' title="Delete Record" to={`/product/delete/${this.props.obj.id}`}><FontAwesomeIcon icon={faTrash} /></Link>
                    </div>
                </td>
                <td>{this.props.obj.product_name}</td>
                <td>{this.props.obj.product_price}</td>
            </tr>
        )
    }
} 
 
export default ProductRow