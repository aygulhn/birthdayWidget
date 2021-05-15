import { observable, runInAction, action, makeAutoObservable } from 'mobx';
import { getBirthdays } from 'services'
import { sortByName, sortByDateASC, sortByDateDSC } from 'util/sortHelper'
import { periodsKey } from 'util/keys'

export class BirthdayStore {

    constructor() {
        makeAutoObservable(this)
    }

    @observable birthdayList = [];
    @observable loader = false

    @action getBirthdayList = async (data, period) => {

        try {
            runInAction(() => {
                this.loader = true
            })
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
            this.loader = false

        } catch (error) {
            runInAction(() => {
                this.loader = false
                this.birthdayList = [];
            });
        }
    }
}
