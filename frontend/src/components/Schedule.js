/*
    Pages: Schedule page
    Created by Jeremy Jung
*/

import React from 'react';
import { Link } from "react-router-dom";
class Schedule extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Link to = "/">
                    Back
                </Link>
            </div>
        );
    }
}

export default Schedule;