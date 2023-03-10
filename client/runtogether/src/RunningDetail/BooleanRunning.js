import React, { useState } from "react";
import { useEffect } from "react";
import axios from "../api/axios";
import './RunningDetail.css'

const BooleanRunning = (props) => {

    function Canceled() {
        const url = props.api;
        axios.delete(url)
            .then(function (response) { // Rerendering 필요...
                // console.log("성공");
                window.location.replace("/running/detail/" + props.id)
            })
            .catch(function (error) {
                // console.log("실패");
            })
    }

    function Join() {
        const url = props.api;
        axios.post(url)
            .then(function (response) {
                // console.log("성공");
                window.location.replace("/running/detail/" + props.id)
            })
            .catch(function (error) {
                // console.log("실패");
            })
    }

    if (props.Something) {
        return <div onClick={() => Canceled()} className="cancle-btn">{props.truevalue}</div>;
    } else {
        return <div onClick={() => Join()} className="join-btn">{props.falsevalue}</div>;
    }
}
export default BooleanRunning