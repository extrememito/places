import React, {Component} from 'react'
import { Link, browserHistory  } from 'react-router'

export default class PlaceTile extends Component {

  render() {
    return(
    <div className="col-sm-6 col-md-4">
      <div className="thumbnail">
        <Link to={'/'+this.props.place._id}>
          { this.props.place.thumbnail
            ? (<img height='200' width='251'
                    src={this.props.place.thumbnail.uri}
                    alt={this.props.place.thumbnail.descr}
                    title={this.props.place.thumbnail.name}
               />)
            : (<img height='200' width='251' src="/assets/noimage.png" alt="No Image Available" />)
          }
        </Link>
        <div className="caption text-center">
          <h3>
            <Link to={'/'+this.props.place._id}>
                {this.props.place.name}
            </Link>
          </h3>
       </div>
      </div>
    </div>
  );
  }
}
