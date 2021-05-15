import { observable, runInAction, action, makeAutoObservable } from 'mobx';
import { getBirthdays } from 'services'
import { sortByName, sortByDateASC, sortByDateDSC } from 'util/sortHelper'
import { periodsKey } from 'util/keys'

export class BirthdayStore {

    constructor() {
        makeAutoObservable(this)
    }

    @observable birthdayList = [];

    @action getBirthdayList = async (data, period) => {

        try {
            const response = await getBirthdays(data)
            runInAction(() => {
                if (period === periodsKey.today) {
                    this.birthdayList = sortByName(response.data.users);
                }
                else if (period === periodsKey.past) {
                    this.birthdayList = sortByDateDSC(response.data.users);
                }
                else if (period === periodsKey.upcoming) {
                    this.birthdayList = sortByDateASC(response.data.users);
                }
            });

        } catch (error) {
            runInAction(() => {
                this.birthdayList = [];
            });
        }
    }
}
