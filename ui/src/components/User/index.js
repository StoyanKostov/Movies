import React, { Component } from 'react';

class User extends Component {
    render() {
      return (
        <header id="main">
            <div className="wrapper float-clear">
            <div id="logo">
                <a href="#">
                    <img alt="Logo" title="Home" src="images/logo.png" />
                    <strong>Logo here.</strong>
                </a>
            </div>
            <nav id="navigation">
                <ul>
                    <li>
                        <a href="#">Login</a>
                    </li>
                    <li class="current">
                        <a href="#">Register</a>
                    </li>
                    <li>
                        <a href="#">Movies</a>
                    </li>
                </ul>
            </nav>
            </div>
	    </header>
      );
    }
  }
  
  export default User