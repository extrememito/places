import React, {Component} from 'react'

export default class LoadingAnimation extends Component{

  render(){
    const style = {
      height: this.props.height ? this.props.height : '100%',
      width: 'auto'
    }
    return(
        <img src="/assets/balls.svg" style={style} />
    );
  }
}
