import React from 'react'

function SignUpThirdParty() {
    return (
        <React.Fragment>
            <div className="login__social__links">
                <h3>Login With:</h3>
                <ul>
                    <li><a href="#" className="facebook"><i className="fa fa-facebook" /> Sign in
                        With Facebook</a>
                    </li>
                    <li><a href="#" className="google"><i className="fa fa-google" /> Sign in With
                        Google</a></li>
                    <li><a href="#" className="twitter"><i className="fa fa-twitter" /> Sign in With
                        Twitter</a></li>
                </ul>
            </div>
        </React.Fragment>
    )
}

export default SignUpThirdParty
