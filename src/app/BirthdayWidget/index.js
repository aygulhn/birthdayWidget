import React from 'react'
import { observer, inject } from 'mobx-react';

import Header from './Header'
import Widget from 'components/Widget'
import { сutYear, isLeapYear } from 'util/dateHelper';

@inject('birthdayStore')
@observer
class BirthdayWidget extends React.Component {

    state = {
        dateFrom: null,
        dateTo: null
    }

    constructor(props) {
        super(props);
        const currentYear = new Date().getFullYear();
        const currentDate = сutYear(new Date());

        if (!isLeapYear(currentYear) && currentDate === '02.28') {
            this.state.dateFrom = currentDate
            this.state.dateTo = new Date().setDate(currentDate.getDate() + 1)
        } else {
            this.state.dateFrom = this.state.dateTo = currentDate
        }
    }


    componentDidMount() {
        this.props.birthdayStore.getBirthdayList(this.state)
    }

    loadBirthdayList = (period) => {
        const currentDate = new Date();
        let newDateFrom, newDateTo;

        if (period === 'Past dates') {
            newDateFrom = new Date().setDate(currentDate.getDate() - 14);
            newDateTo = new Date().setDate(currentDate.getDate() - 1);

        } else if (period === 'Upcoming dates') {
            newDateFrom = new Date().setDate(currentDate.getDate() + 1);
            newDateTo = new Date().setDate(currentDate.getDate() + 14);
        } else if (period === 'Today') {
            newDateFrom = newDateTo = currentDate;
        }

        this.setState({
            dateFrom: сutYear(newDateFrom),
            dateTo: сutYear(newDateTo)
        }, () => this.props.birthdayStore.getBirthdayList(this.state))

    }


    getBirthdayList = () => {

    }


    render() {

        const { birthdayList } = this.props.birthdayStore

        return (
            <>
                <Header />
                <Widget
                    loadList={this.loadBirthdayList}
                    list={birthdayList}
                />
            </>
        )
    }

}

export default BirthdayWidget