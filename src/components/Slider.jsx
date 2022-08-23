import React, { Component } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

class Slider extends Component {
    render() {
        return (
            <section className="hero">
                <div className="container">
                    <OwlCarousel items={1}
                        className="owl-theme"
                        loop
                        nav
                        margin={8} >
                        <div className="hero__items set-bg" style={{ backgroundImage: "url('img/hero/hero-1.jpg')" }}>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="hero__text" >
                                        <div className="label">Adventure</div>
                                        <h2>Fate / Stay Night: Unlimited Blade Works</h2>
                                        <p>After 30 days of travel across the world...</p>
                                        <a href="#"><span>Watch Now</span> <i className="fa fa-angle-right" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="hero__items set-bg" style={{ backgroundImage: "url('img/hero/hero-1.jpg')" }}>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="hero__text" >
                                        <div className="label">Adventure</div>
                                        <h2>Fate / Stay Night: Unlimited Blade Works</h2>
                                        <p>After 30 days of travel across the world...</p>
                                        <a href="#"><span>Watch Now</span> <i className="fa fa-angle-right" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="hero__items set-bg" style={{ backgroundImage: "url('img/hero/hero-1.jpg')" }}>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="hero__text" >
                                        <div className="label">Adventure</div>
                                        <h2>Fate / Stay Night: Unlimited Blade Works</h2>
                                        <p>After 30 days of travel across the world...</p>
                                        <a href="#"><span>Watch Now</span> <i className="fa fa-angle-right" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </OwlCarousel>
                </div>
            </section>

        )
    }
}

export default Slider
