export const сutYear = (date) => {

    let formedDate = new Date(date);

    return `${appendLeadingZeroes(formedDate.getMonth()+1)}.${appendLeadingZeroes(formedDate.getDate())}`

}

export const parseDateToTxt = (date) => {

    let _date = new Date(date);
    const monthName = _date.toLocaleString('en-EN', {month: 'long'});

    return monthName + ' ' + _date.getDate()
}

export const isLeapYear = (year) => {
    return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)
}

function appendLeadingZeroes(n) {
    if (n <= 9) {
      return "0" + n;
    }
    return n
  }