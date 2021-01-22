// --> Object with the starting and ending number of codes of town area.
const townCodes = {
    'Благоевград': [0, 42],
    'Бургас': [43, 92],
    'Варна': [93, 138],
    'Велико Търново': [139, 168],
    'Видин': [169, 182],
    'Враца': [183, 216],
    'Габрово': [217, 232],
    'Кърджали': [233, 280],
    'Кюстендил': [281, 300],
    'Ловеч': [301, 318],
    'Монтана': [319, 340],
    'Пазарджик': [341, 376],
    'Перник': [377, 394],
    'Плевен': [395, 434],
    'Пловдив': [435, 500],
    'Разград': [501, 526],
    'Русе': [527, 554],
    'Силистра': [555, 574],
    'Сливен': [575, 600],
    'Смолян': [601, 622],
    'София - град': [623, 720],
    'София - окръг': [721, 750],
    'Стара Загора': [751, 788],
    'Добрич': [789, 820],
    'Търговище': [821, 842],
    'Хасково': [843, 870],
    'Шумен': [871, 902],
    'Ямбол': [903, 924],
    'Друг/Неизвестен': [925, 999]
};

// --> Object with number of days in every month
const monthsDays = {
    'Януари': 31,
    'Февруари': 28,
    'Март': 31,
    'Април': 30,
    'Май': 31,
    'Юни': 30,
    'Юли': 31,
    'Август': 31,
    'Септември': 30,
    'Октомври': 31,
    'Ноември': 30,
    'Декември': 31
};

// --> Object with the numbers of the months
const monthsN = {
    'Януари': 1,
    'Февруари': 2,
    'Март': 3,
    'Април': 4,
    'Май': 5,
    'Юни': 6,
    'Юли': 7,
    'Август': 8,
    'Септември': 9,
    'Октомври': 10,
    'Ноември': 11,
    'Декември': 12
};

// --> Make array with the days
const dayList = [];
for (let j = 1; j <= 31; j++) {
    dayList.push(j);
}

// --> Function that make List for choosing town area
function makeList() {
    let entries = Object.entries(townCodes);
    let townTextList = [];
    for (let [key, value] of entries) {
        townTextList.push(key);
    }
    var dropdown = document.getElementById("selectTown");
    for (let i = 0; i < townTextList.length; ++i) {
        dropdown[dropdown.length] = new Option(townTextList[i], townTextList[i]);
    }
}

// --> Function that make List for choosing year
function makeYearList() {
    let yearsList = [];
    for (let j = 1800; j < 2100; j++) {
        yearsList.push(j);
    }
    var dropdownYears = document.getElementById("selectYear");
    for (let i = 0; i < yearsList.length; ++i) {
        dropdownYears[dropdownYears.length] = new Option(yearsList[i], yearsList[i]);
    }
}

// --> Function to make List of choosing months
function makeMonthList() {
    let entriesMonths = Object.entries(monthsN);
    let monthsNames = [];
    for (let [key, value] of entriesMonths) {
        monthsNames.push(key);
    }
    var dropdownMonths = document.getElementById("selectMonth");
    for (let i = 0; i < monthsNames.length; ++i) {
        dropdownMonths[dropdownMonths.length] = new Option(monthsNames[i], monthsNames[i]);
    }
}

// --> Function that make List of choosing days
function makeDayList() {
    var dropdownDays = document.getElementById("selectDay");
    for (let i = 0; i < dayList.length; ++i) {
        dropdownDays[dropdownDays.length] = new Option(dayList[i], dayList[i]);
    }
}

// --> Function that make all necessary dropdawn menus
function makeLists() {
    makeDayList();
    makeMonthList();
    makeYearList();
    makeList();
}

// --> Function that ckeck if the selected year is Leap
function leapYear(year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

// --> Function for making Valid EGN's from selected date, town and sex
function egnArrGen(day, month, year, townName, sex) {
    let resultArr = [];
    let egnArr = [];
    egnArr[0] = year.toString().split('')[2];
    egnArr[1] = year.toString().split('')[3];
    let monthNum = 0;
    if (year <= 1899) {
        monthNum = monthsN[month] + 20;
    } else if (year >= 2000) {
        monthNum = monthsN[month] + 40
    } else {
        monthNum = monthsN[month];
    }

    if (monthNum < 10) {
        egnArr[2] = 0;
        egnArr[3] = monthNum;
    } else if (monthNum >= 10) {
        egnArr[2] = monthNum.toString().split('')[0];
        egnArr[3] = monthNum.toString().split('')[1];
    }

    if (day < 10) {
        egnArr[4] = 0;
        egnArr[5] = day;
    } else {
        egnArr[4] = day.toString().split('')[0];
        egnArr[5] = day.toString().split('')[1];
    }

    for (let i = townCodes[townName][0]; i <= townCodes[townName][1]; i++) {
        let code = 0;
        if (sex == 'male' && i % 2 == 0) {
            code = i;

            if (code < 10) {
                egnArr[6] = 0;
                egnArr[7] = 0;
                egnArr[8] = code;
            } else if (code >= 10 && code < 100) {
                egnArr[6] = 0;
                egnArr[7] = code.toString().split('')[0];
                egnArr[8] = code.toString().split('')[1];
            } else {
                egnArr[6] = code.toString().split('')[0];
                egnArr[7] = code.toString().split('')[1];
                egnArr[8] = code.toString().split('')[2];
            }
            egnArr = egnArr.map(Number);
            let sum = egnArr[0] * 2 + egnArr[1] * 4 + egnArr[2] * 8 + egnArr[3] * 5 + egnArr[4] * 10 + egnArr[5] * 9 + egnArr[6] * 7 + egnArr[7] * 3 + egnArr[8] * 6;
            
                
            if (sum % 11 == 0 || sum % 11 == 10) {
                egnArr[9] = 0;
            } else {
                egnArr[9] = sum % 11;
            }
            resultArr.push(egnArr.join(''));
        } else if (sex == 'female' && i % 2 != 0) {
            code = i;
            if (code < 10) {
                egnArr[6] = 0;
                egnArr[7] = 0;
                egnArr[8] = code;
            } else if (code >= 10 && code < 100) {
                egnArr[6] = 0;
                egnArr[7] = code.toString().split('')[0];
                egnArr[8] = code.toString().split('')[1];
            } else {
                egnArr[6] = code.toString().split('')[0];
                egnArr[7] = code.toString().split('')[1];
                egnArr[8] = code.toString().split('')[2];
            }
            egnArr = egnArr.map(Number);
            let sum = egnArr[0] * 2 + egnArr[1] * 4 + egnArr[2] * 8 + egnArr[3] * 5 + egnArr[4] * 10 + egnArr[5] * 9 + egnArr[6] * 7 + egnArr[7] * 3 + egnArr[8] * 6;
            if (sum % 11 == 0 || sum % 11 == 10) {
                egnArr[9] = 0;
            } else {
                egnArr[9] = sum % 11;
            }
            resultArr.push(egnArr.join(''));
        }
    }
    return resultArr;
}

// --> Function that get result for the Valid EGNs
function result() {

    // --> Error message if not all the necessary field are selected
    let alertMessage = '';
    let yesAlert = false;
    // --> Check if the day is valid
    let day = document.getElementById("selectDay").value;
    if (day == 'Изберете ден') {
        alertMessage += 'Не сте избрали ден!\n';
        yesAlert = true;
    }

    // --> Check if the month is valid
    let month = document.getElementById("selectMonth").value;
    if (month == 'Изберете месец') {
        alertMessage += 'Не сте избрали месец!\n';
        yesAlert = true;
    }
    //--> Check if the year is valid
    let year = document.getElementById("selectYear").value;
    if (year == 'Изберете година') {
        alertMessage += 'Не сте избрали година!\n';
        yesAlert = true;
    }
    //--> Check if the town is valid
    let townName = document.getElementById("selectTown").value;
    if (townName == 'Изберете област') {
        alertMessage += 'Не сте избрали област!\n';
        yesAlert = true;
    }
    //--> Check if the sex is been selected
    let sex = '';
    if (document.getElementById("male").checked) {
        sex = 'male';
    } else if (document.getElementById("female").checked) {
        sex = 'female';
    } else if (!document.getElementById("male").checked && !document.getElementById("female").checked) {
        alertMessage += 'Не сте избрали пол!\n';
        yesAlert = true;
    }

    if (leapYear(year) == true) {
        monthsDays['Февруари'] = 29;
    } else if (leapYear(year) == false) {
        monthsDays['Февруари'] = 28;
    }

    let validDate = true;
    let invalidMessage = '';

    if (day > monthsDays[month]) {
        validDate = false;
        invalidMessage = month + ' ' + year + ' година има ' + monthsDays[month] + 'дни!' + "<br>";
        invalidMessage += 'Моля изберете валидна дата!'

    }

    // --> Function that displays the result - list of valid EGNs
    function ddisplayResultList() {
        document.getElementById("resultList").children[0].innerHTML = '';
        let resultLine = '';
        if (validDate == true) {
            document.getElementById("result-form-make").style.display = "block";
            resultArr = egnArrGen(day, month, year, townName, sex);
            if (sex == 'male') {
                resultLine = 'Мъж роден на ' + day + ' ' + month + ' ' + year + 'г. в област ' + townName + ', може да има едно от следните ЕГН-та:';
            } else if (sex == 'female') {
                resultLine = 'Жена родена на ' + day + ' ' + month + ' ' + year + 'г. в област ' + townName + ', може да има едно от следните ЕГН-та:';
            }
            document.getElementById("resultList").children[0].innerHTML += resultLine;
            for (let egn of resultArr) {
                document.getElementById("resultList").children[0].innerHTML += "<li>" + egn + "</li>";
            }
        } else {
            document.getElementById("resultList").children[0].innerHTML = invalidMessage;
        }
    }

    if (yesAlert == true) {
        alert(alertMessage);
    } else {
        ddisplayResultList();
    }
}

// --> Finction that checks if the input EGN is valid ot invalid and show the info
function check() {
    let egnToCheck = document.getElementById("egn").value;
    let resultLine = '';
    let regex = /\D/g;
    let match = regex.exec(egnToCheck);
    let alertMes = '';
    let yesAlert = false;
    if (egnToCheck.length < 10) {
        alertMes += 'ЕГН-то трябва да съдържа минимум 10 цифри!\n';
        yesAlert = true;
    }
    if (egnToCheck.length > 10) {
        alertMes += 'ЕГН-то не може да съдържа повече от 10 цифри!\n';
        yesAlert = true;
    }
    if (match != null) {
        alertMes += 'ЕГН-то може да съдържа само цифри от 0 до 9!\n';
        yesAlert = true;
    }
    alertMes += 'МОЛЯ ВЪВЕДИ ЕГН В ФОРМАТ "0000000000" И ОПИТАЙ ОТНОВО!';

    if (yesAlert) {
        alert(alertMes);
    } else {
        document.getElementById("result-form").style.display = "block";
        let yearNum = Number(egnToCheck.split('').slice(0, 2).join(''));
        let monthNum = Number(egnToCheck.split('').slice(2, 4).join(''));

        if (monthNum >= 1 && monthNum <= 12) {
            yearNum += 1900;
        } else if (monthNum >= 21 && monthNum <= 32) {
            yearNum += 1800;
        } else if (monthNum >= 41 && monthNum <= 52) {
            yearNum += 2000;
        }
        if (yearNum >= 1800 && yearNum < 1900) {
            monthNum -= 20;
        } else if (yearNum >= 2000 && yearNum < 3000) {
            monthNum -= 40;
        }

        let monthsEntries = Object.entries(monthsN);
        let monthsText = {};
        for (let [key, value] of monthsEntries) {
            monthsText[value] = key;
        }

        let dayNum = Number(egnToCheck.split('').slice(4, 6).join(''));
        let townCodeNum = Number(egnToCheck.split('').slice(6, 9).join(''));
        let townNameNum = '';
        let townCodeEntries = Object.entries(townCodes);
        for (let [key, value] of townCodeEntries) {
            if (townCodeNum >= value[0] && townCodeNum <= value[1]) {
                townNameNum = key;
            }
        }
        let sexNum = '';
        if (townCodeNum % 2 == 0) {
            sexNum = 'male';
        } else {
            sexNum = 'female';
        }
        let validEgnArr = egnArrGen(dayNum, monthsText[monthNum], yearNum, townNameNum, sexNum);
        let isValid = false;

        for (let egn of validEgnArr) {
            if (egn == egnToCheck) {
                isValid = true;
                break;
            }
        }
        let count = 0;
        
        if (isValid) {
            count = validEgnArr.indexOf(egnToCheck);
            if (sexNum =='male') {
                resultLine='Въведеното ЕГН-'+egnToCheck+' принадлежи на мъж роден на '+dayNum+' '+monthsText[monthNum]+' '+yearNum+' година в област '+townNameNum+', като преди него в този ден и област са се родили '+count+' момчета.';
            } else if (sexNum == 'female') {
                resultLine='Въведеното ЕГН-'+egnToCheck+' принадлежи на жена родена на '+dayNum+' '+monthsText[monthNum]+' '+yearNum+' година в област '+townNameNum+', като преди нея в този ден и област са се родили '+count+' момичета.';
            }
        } else {
            resultLine='Въведеното ЕГН-'+egnToCheck+' е невалидно!'
        }
    }
    document.getElementById("resultValid").value = resultLine;
}


