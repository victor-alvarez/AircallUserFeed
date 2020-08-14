import React from "react";

import inbound from "../icons/incoming-call-1439390-1214403.png";
import outbound from "../icons/outgoing-call-470340.png";
import archive from "../icons/download.png";

export default class ActivityDetail extends React.Component {
    conv24to12(time24) {
        var ts = time24;
        var H = +ts.substr(0, 2);
        var h = (H % 12) || 12;
        h = (h < 10)?("0"+h):h;
        var ampm = H < 12 ? " AM" : " PM";
        ts = h + ts.substr(2, 3) + ampm;
        return ts;
    }

    createCallTypeMsg(call_type) {
        if (call_type == "missed") {
            return " tried to call on ";
        }
        else if (call_type == "answered") {
            return " called ";
        }
        return " sent to voicemail by ";
    }

    archive() {
        this.props.archive(this.props.id);
    }

    render() {
        const { 
            id, created_at, direction, from, to, 
            via, duration, is_archived, call_type
        } = this.props

        const call_type_msg = this.createCallTypeMsg(call_type);
        const time = this.conv24to12(created_at.slice(11, 16))
        const caller = from ? from : "No Caller ID";
        const called = to ? to : "No Caller ID";
        const src = direction == "inbound" ? inbound : outbound;

        return (
            <li className="call-item">
                <div className="call">
                    <img className="icon" src={src}/>
                    <b>{caller}</b>
                    <br/> {call_type_msg + called}
                    <div className="right-side">
                        {time} <br/>
                        <button className="archive-call-button archive-button" onClick={this.archive.bind(this)}>
                            <img className="archive-icon" src={archive}/>
                        </button>
                    </div>
                </div>
            </li>
        );
    }
}