import { observable, runInAction, action, makeAutoObservable } from 'mobx';
import { getBirthdays } from 'services'

export class BirthdayStore {

    constructor() {
        makeAutoObservable(this)
    }

    @observable birthdayList = [];


    @action getBirthdayList = async (data) => {
        try {
            const response = await getBirthdays(data)
            runInAction(() => {
                this.birthdayList = response;
            });
        } catch (error) {
            runInAction(() => {
                this.birthdayList = [];
            });
        }
    };

}
