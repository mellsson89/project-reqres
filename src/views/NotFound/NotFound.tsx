import React from "react";
import { Link } from "react-router-dom";
import style from './styles/styles.module.scss'
const image = require ('./images/not-found-404.png')
export default function NotFound () {
    return (
        <div className={style.wrap}>
            <img
                className={style.image}
                src={image}
                alt="not-found"
            />
            <Link to="/" className={style.linkHome}>
                Go to Home
            </Link>
        </div>
    )
}