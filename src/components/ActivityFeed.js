import React from "react";

import ActivityFeedDate from "./ActivityFeedDate";
import archive from "../icons/download.png";
import unarchive from "../icons/download - Copy.png";

export default class ActivityFeed extends React.Component {
    constructor() {
        super();
        this.xhr = new XMLHttpRequest();
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        this.getCalls();
    }

    getCalls() {
        fetch('https://aircall-job.herokuapp.com/activities', {
            method: 'GET'
        }).then(res => res.json()).then((result) => {
            this.setState({data: result});
        });
    }

    archiveAll() {
        for (var i = 0; i < this.state.data.length; i++) {
            this.archive(this.state.data[i].id);
        }
    }

    archive(id) {
        fetch('https://aircall-job.herokuapp.com/activities/' + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                is_archived: true
            })
        }).then(this.getCalls.bind(this));
    }

    resetAll() {
        fetch('https://aircall-job.herokuapp.com/reset', {
            method: 'GET'
        }).then(this.getCalls.bind(this));
    }

    render() {
        const dates = [];

        for (var i = 0; i < this.state.data.length; i++) {
            const { created_at, is_archived } = this.state.data[i];
            const date = created_at.slice(0, 10);
            if (!dates.includes(date) && !is_archived) {
                dates.push(date);
            }
            else if (!is_archived) {
                
            }
        }

        const DateComponents = dates.map((date) => {
            const calls = [];
            for (var i = 0; i < this.state.data.length; i++) {
                const { created_at, is_archived } = this.state.data[i];
                const call_date = created_at.slice(0, 10);
                if (call_date == date && !is_archived) {
                    calls.push(this.state.data[i]);
                }
            }
            return <ActivityFeedDate key={Math.random()} date={date} items={calls} archive={this.archive.bind(this)}/>
        });

        return (
            <div>
                <div id="all">
                    <button id="archive-all-button" className="archive-button" onClick={this.archiveAll.bind(this)}>
                        <img className="all-icon" src={archive}/> 
                        Archive all calls
                    </button>
                    <button id="unarchive-all-button" className="archive-button" onClick={this.resetAll.bind(this)}>
                        <img className="all-icon" src={unarchive}/> 
                        Unarchive all calls
                    </button>
                </div>
                <ul className="feed">{DateComponents}</ul>
            </div>
        );
    }
}