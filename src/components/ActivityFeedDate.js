import React from "react";

import ActivityDetail from "./ActivityDetail";

export default class ActivityFeedDate extends React.Component {
    archive(id) {
        this.props.archive(id);
    }

    render() {
        const ItemComponents = this.props.items.map((item) => {
            return <ActivityDetail key={item.id} archive={this.archive.bind(this)} {...item}/>
        });

        const date = new Date(this.props.date).toDateString().slice(4);

        return (
            <li className="feed-item">
                <div className="date">
                    <span className="dot-line-left"></span>
                        {date}
                    <span className="dot-line-right"></span>
                </div>
                <ul className="calls">{ItemComponents}</ul>
            </li>
        );
    }
}