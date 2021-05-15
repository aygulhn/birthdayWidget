import { сutYear } from "./dateHelper"

export const sortByDateDSC = (array) => {
    return array.sort((a, b) => сutYear(b.birthday) - сutYear(a.birthday) || (a.name.localeCompare(b.name)))
}

export const sortByDateASC = (array) => {
    return array.sort((a, b) => (сutYear(a.birthday) - сutYear(b.birthday) || (a.name.localeCompare(b.name))))
}

export const sortByName = (array) => {
    return array.sort((a, b) => a.name.localeCompare(b.name))
}