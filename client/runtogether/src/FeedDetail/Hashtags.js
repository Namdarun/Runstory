import React from "react";

const Hashtags = (props) => {
    if ( props.Something == "true" ) {
        return <button>{props.truevalue}</button>;
    } else {
        return <button>{props.falsevalue}</button>;
    }
}
export default Hashtags