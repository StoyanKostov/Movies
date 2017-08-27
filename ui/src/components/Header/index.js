import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router';

class Header extends Component {
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
                            {!this.props.user.isEmpty() &&
                                <li>
                                    <Link to="/movies" activeClassName="active">Movies</Link>
                                </li>
                            }
                            <li>
                                <Link to="/login" activeClassName="active">Login</Link>
                            </li>
                            <li>
                                <Link to="/register" activeClassName="active">Register</Link>
                            </li>
                            {!this.props.user.isEmpty() &&
                                <li>
                                    <Link to="/logout" activeClassName="active">Logout</Link>
                                </li>
                            }
                            
                        </ul>
                    </nav>
                </div>
                {!this.props.user.isEmpty() &&
                    <h2 className='wrapper greeting'>Hello {this.props.user.get('firstName')} {this.props.user.get('lastName')}</h2>
                }
            </header>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.get('user')
    }
}


const HeaderContainer = connect(
    mapStateToProps,
    null
)(Header)

export default HeaderContainer