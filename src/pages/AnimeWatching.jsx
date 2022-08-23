import React, { Component } from 'react'
import BreadcrumbOption from '../components/BreadcrumbOption'
import Header from '../components/Header'

class AnimeWatching extends Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <BreadcrumbOption />
                <section className="anime-details spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="anime__video__player">
                                    <video id="player" playsInline controls poster='./videos/anime-watch.jpg'>
                                        <source src="videos/1.mp4" type="video/mp4" />
                                        {/* Captions are optional */}
                                        <track kind="captions" label="English captions" src="#" srcLang="en" default />
                                    </video>
                                </div>
                                <div className="anime__details__episodes">
                                    <div className="section-title">
                                        <h5>List Name</h5>
                                    </div>
                                    <a href="#">Ep 01</a>
                                    <a href="#">Ep 02</a>
                                    <a href="#">Ep 03</a>
                                    <a href="#">Ep 04</a>
                                    <a href="#">Ep 05</a>
                                    <a href="#">Ep 06</a>
                                    <a href="#">Ep 07</a>
                                    <a href="#">Ep 08</a>
                                    <a href="#">Ep 09</a>
                                    <a href="#">Ep 10</a>
                                    <a href="#">Ep 11</a>
                                    <a href="#">Ep 12</a>
                                    <a href="#">Ep 13</a>
                                    <a href="#">Ep 14</a>
                                    <a href="#">Ep 15</a>
                                    <a href="#">Ep 16</a>
                                    <a href="#">Ep 17</a>
                                    <a href="#">Ep 18</a>
                                    <a href="#">Ep 19</a>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="anime__details__review">
                                    <div className="section-title">
                                        <h5>Reviews</h5>
                                    </div>
                                    <div className="anime__review__item">
                                        <div className="anime__review__item__pic">
                                            <img src="img/anime/review-1.jpg" alt />
                                        </div>
                                        <div className="anime__review__item__text">
                                            <h6>Chris Curry - <span>1 Hour ago</span></h6>
                                            <p>whachikan Just noticed that someone categorized this as belonging to the genre
                                                "demons" LOL</p>
                                        </div>
                                    </div>
                                    <div className="anime__review__item">
                                        <div className="anime__review__item__pic">
                                            <img src="img/anime/review-2.jpg" alt='true' />
                                        </div>
                                        <div className="anime__review__item__text">
                                            <h6>Lewis Mann - <span>5 Hour ago</span></h6>
                                            <p>Finally it came out ages ago</p>
                                        </div>
                                    </div>
                                    <div className="anime__review__item">
                                        <div className="anime__review__item__pic">
                                            <img src="img/anime/review-3.jpg" alt='true' />
                                        </div>
                                        <div className="anime__review__item__text">
                                            <h6>Louis Tyler - <span>20 Hour ago</span></h6>
                                            <p>Where is the episode 15 ? Slow update! Tch</p>
                                        </div>
                                    </div>
                                    <div className="anime__review__item">
                                        <div className="anime__review__item__pic">
                                            <img src="img/anime/review-4.jpg" alt='true' />
                                        </div>
                                        <div className="anime__review__item__text">
                                            <h6>Chris Curry - <span>1 Hour ago</span></h6>
                                            <p>whachikan Just noticed that someone categorized this as belonging to the genre
                                                "demons" LOL</p>
                                        </div>
                                    </div>
                                    <div className="anime__review__item">
                                        <div className="anime__review__item__pic">
                                            <img src="img/anime/review-5.jpg" alt='true' />
                                        </div>
                                        <div className="anime__review__item__text">
                                            <h6>Lewis Mann - <span>5 Hour ago</span></h6>
                                            <p>Finally it came out ages ago</p>
                                        </div>
                                    </div>
                                    <div className="anime__review__item">
                                        <div className="anime__review__item__pic">
                                            <img src="img/anime/review-6.jpg" alt='true' />
                                        </div>
                                        <div className="anime__review__item__text">
                                            <h6>Louis Tyler - <span>20 Hour ago</span></h6>
                                            <p>Where is the episode 15 ? Slow update! Tch</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="anime__details__form">
                                    <div className="section-title">
                                        <h5>Your Comment</h5>
                                    </div>
                                    <form action="#">
                                        <textarea placeholder="Your Comment" defaultValue={""} />
                                        <button type="submit"><i className="fa fa-location-arrow" /> Review</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </React.Fragment>
        )
    }
}

export default AnimeWatching
