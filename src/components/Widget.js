import React, { Component } from 'react'
import { data } from './data'
import UserPannel from '../containers/UserPannel'
import { periodsKey } from 'util/keys'

class Widget extends Component {

    state = {
        periods: [
            'Past dates',
            'Today',
            'Upcoming dates',
        ],
        selectedPeriod: 'Today'
    }


    styleString = (string) => {
        const splitedStr = string.split(' ');
        return splitedStr.map((string, index) => <>
            <span key={index}
                style={index === 0 ? { textTransform: 'uppercase' } : null}>{string} </span>
            <br />
        </>)
    }

    changePeriod = (period) => {
        this.setState({
            selectedPeriod: period
        },
            () => this.loadBithdayList()
        )
    }

    loadBithdayList = () => {
        this.props.loadList(this.state.selectedPeriod)
    }


    render() {

        return (
            <article className="widget">
                <h1>Birthdays</h1>
                <section className="period">
                    {this.state.periods.map((period, index) =>
                        <button key={index}
                            className={"empty-btn text-center header-txt" + (this.state.selectedPeriod === period ? " bold-txt" : '')}
                            onClick={() => this.changePeriod(period)}
                        >
                            {this.styleString(period)}
                        </button>
                    )}
                </section>
                {true ?
                    <section className="data">
                        {data.users.map(user =>
                            <UserPannel
                                user={user}
                            />
                        )}
                    </section>
                    :
                    <p className="dark-clr text-center">Unfortunately there is no users with birthdays on these dates</p>
                }
                <section className="button-pannel">
                    <button className="empty-btn text-center"
                        onClick={this.loadBithdayList}
                    >
                        Show more
                    <img src={require('../assets/images/icons/chevron-right.svg').default} alt="next" />
                    </button>
                </section>
            </article>
        )
    }

}

export default Widget