import React from 'react'
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';

import Header from './Header'
import Widget from 'components/Widget'
import Loader from 'components/Loader'
import { сutYear, isLeapYear } from 'util/dateHelper';
import { periodsKey } from 'util/keys'

@inject('birthdayStore')
@observer
class BirthdayWidget extends React.Component {

    state = {
        dateFrom: null,
        dateTo: null,
        currentPageNo: 1,
        pageCount: null
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
        this.getBirthdayList(periodsKey.today)
    }

    loadBirthdayByPeriod = (period) => {
        const currentDate = new Date();
        let newDateFrom, newDateTo;

        if (period === periodsKey.past) {
            newDateFrom = new Date().setDate(currentDate.getDate() - 14);
            newDateTo = new Date().setDate(currentDate.getDate() - 1);

        } else if (period === periodsKey.upcoming) {
            newDateFrom = new Date().setDate(currentDate.getDate() + 1);
            newDateTo = new Date().setDate(currentDate.getDate() + 14);
        } else if (period === periodsKey.today) {
            newDateFrom = newDateTo = currentDate;
        }

        this.setState({
            dateFrom: сutYear(newDateFrom),
            dateTo: сutYear(newDateTo),
            currentPageNo: 1
        }, () => this.getBirthdayList(period))
    }


    getBirthdayList = (period) => {
        const { dateFrom, dateTo } = this.state
        this.props.birthdayStore.getBirthdayList({ dateFrom, dateTo }, period)
    }


    changePageNo = () => {
        this.setState((state) => ({
            currentPageNo: state.currentPageNo + 1
        }))
    }


    render() {

        const birthdayList = toJS(this.props.birthdayStore.birthdayList)
        const loader = toJS(this.props.birthdayStore.loader)

        return (
            <>
                {loader &&
                    <Loader />
                }
                <Header />
                <Widget
                    loadList={this.loadBirthdayByPeriod}
                    handleLoadMore={this.changePageNo}
                    list={birthdayList?.slice(0, 10 * this.state.currentPageNo)}
                    pageCount={Math.ceil(birthdayList?.length / 10)}
                    pageNo={this.state.currentPageNo}
                />
            </>
        )
    }

}

export default BirthdayWidget