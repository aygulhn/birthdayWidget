import {BirthdayStore} from "./BirthdayStore";

export class RootStore {

    constructor() {
        this.birthdayStore = new BirthdayStore();
    }
}