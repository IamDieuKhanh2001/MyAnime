import React, { Component } from 'react'

class BreadcrumbOption extends Component {
    render() {
        return (
            <div className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__links">
                                <a href="./index.html"><i className="fa fa-home" /> Home</a>
                                <a href="./categories.html">Categories</a>
                                <a href="#">Romance</a>
                                <span>Fate Stay Night: Unlimited Blade</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default BreadcrumbOption
