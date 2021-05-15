import React, { Component } from 'react'
import BirthdayInfo from '../containers/BirthdayInfo'
import { periodsKey } from 'util/keys'

class Widget extends Component {

    state = {
        periods: [
            periodsKey.past,
            periodsKey.today,
            periodsKey.upcoming,
        ],
        selectedPeriod: periodsKey.today,
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
            () => this.props.loadList(this.state.selectedPeriod)
        )
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
                {this.props.list?.length ?
                    <>
                        <section className="data">
                            {this.props.list.map(user =>
                                <BirthdayInfo
                                    key={user.id}
                                    user={user}
                                />
                            )}
                        </section>
                        {(this.props.pageCount !== this.props.pageNo) &&
                            <section className="button-pannel">
                                <button className="empty-btn text-center"
                                    onClick={this.props.handleLoadMore}
                                >
                                    Show more
                                        <img src={require('../assets/images/icons/chevron-right.svg').default} alt="next" />
                                </button>
                            </section>
                        }
                    </>
                    :
                    <p className="dark-clr text-center">Unfortunately there is no users with birthdays on these dates</p>
                }
            </article>
        )
    }
}

export default Widget