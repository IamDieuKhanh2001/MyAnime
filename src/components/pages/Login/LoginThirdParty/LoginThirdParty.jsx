import React from 'react'

function LoginThirdParty() {
    return (
        <div className="login__social">
            <div className="row d-flex justify-content-center">
                <div className="col-lg-6">
                    <div className="login__social__links">
                        <span>or</span>
                        <ul>
                            <li><a href="#" className="facebook"><i className="fa fa-facebook" /> Sign in
                                With
                                Facebook</a></li>
                            <li><a href="#" className="google"><i className="fa fa-google" /> Sign in With
                                Google</a></li>
                            <li><a href="#" className="twitter"><i className="fa fa-twitter" /> Sign in With
                                Twitter</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginThirdParty
