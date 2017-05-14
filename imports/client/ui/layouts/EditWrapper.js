import React, {Component} from 'react'
import { Link, browserHistory } from 'react-router'

export default class EditBasic extends Component{

  render(){
    return(
      <div className="col-sm-12">
        {this.props.children}
      </div>
    )
  }
}
