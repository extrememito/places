import React, {Component} from 'react';

import { Places } from '../api/collections'
import Header from './ui/components/Header'
import Footer from './ui/components/Footer'
import PlacesBoard from './ui/components/PlacesBoard'

export default class App extends Component {

  // getHome(){
  //   return (
  //     <div className="container">
  //       <PlaceTile />
  //     </div>
  //   )
  // }


  render() {
    return(
    <div>
      <Header />
      {this.props.children ? this.props.children : (<PlacesBoard />)}
      <Footer />
    </div>
  );
  }
}
