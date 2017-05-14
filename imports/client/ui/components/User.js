import React, {Component} from 'react'

export default class User extends Component {
  render() {
    return(
      <div className="container">
        User: <br />
        {this.props.params.userId}
        <h2>Your places:</h2>
        <table className="table table-hover table-bordered">
          <tbody>
          <tr>
            <th>Place</th>
            <th>Last update</th>
            <th>Last update by</th>
            <th>Added</th>
            <th>Action</th>
        </tr>
          <tr>
            <td>placeholder</td>
            <td>placeholder</td>
            <td>placeholder</td>
            <td>placeholder</td>
            <td><button className="btn btn-danger">Remove</button></td>
          </tr>
        </tbody>
        </table>
        <h2>Places you can edit:</h2>
        <table className="table table-hover table-bordered">
          <tbody>
          <tr>
            <th>Place</th>
            <th>Last update</th>
            <th>Last update by</th>
            <th>Added</th>
            <th>Action</th>
        </tr>
          <tr>
            <td>placeholder</td>
            <td>placeholder</td>
            <td>placeholder</td>
            <td>placeholder</td>
            <td><button className="btn btn-danger">Remove</button></td>
          </tr>
        </tbody>
        </table>
      </div>
    );
  }
}
