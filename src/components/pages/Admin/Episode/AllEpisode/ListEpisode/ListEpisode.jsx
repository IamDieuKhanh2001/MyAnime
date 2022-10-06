import React, { useState } from "react";
import "./ListEpisode.scss";

export default function ListEpisode() {
    const [show, setShow] = useState(false);
    return (
        <>
            <div className="titleList">List Episodes</div>
            <div className="allEpisodeLine">
                <div className="allEpisodeContent">
                    <figure className="episodeItemImg">
                        <img
                            src={
                                "https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_960_720.png"
                            }
                            alt="img"
                        />
                    </figure>
                    <div className="episodeItemTitle">
                        The Walking Dead
                        <br />
                    </div>

                    {show ? (
                        <div className="episodeItem">
                            <button className="btn episodeButton">1</button>
                            <button className="btn episodeButton">2</button>
                            <button className="btn episodeButton">3</button>
                            <button className="btn episodeButton">4</button>
                            <button className="btn episodeButton">5</button>
                            <button className="btn episodeButton">6</button>
                            <button className="btn episodeButton">7</button>
                            <button className="btn episodeButton">8</button>
                            <button className="btn episodeButton">9</button>
                            <button className="btn episodeButton">10</button>
                            <button className="btn episodeButton">11</button>
                            <button className="btn episodeButton">12</button>
                            <button className="btn episodeButton">13</button>
                            <button className="btn episodeButton">14</button>
                            <button className="btn episodeButton">15</button>
                            <button className="btn episodeButton">16</button>
                            <button className="btn episodeButton">17</button>
                            <button className="btn episodeButton">18</button>
                        </div>
                    ) : null}
                    <button
                        className={
                            show
                                ? "fa fa-eye-slash closeEye"
                                : "fa fa-eye openEye"
                        }
                        onClick={() => setShow(!show)}
                    ></button>
                </div>
            </div>
        </>
    );
}
