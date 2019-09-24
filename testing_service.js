const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json({

}));

let dateStorage = [];

app.listen(3000, function() { //открываем порт и приложение запускает сервер; 3000 - номер порта
    console.log('application has been initiated!')
});

//прописываем роуты. есть несколько типов запросов и им нужен роут.
app.get('/dates', (req, res) => {
    let m = req.query.months;
    let weekendDays = createWeekendDaysArray(m);

    res.send(weekendDays);
});

app.post('/dates/save', (req, res) => {
    dateStorage = req.body.filter(x => x.value).map(d => d.date);

    res.send(dateStorage);
});

function isWeekendDay(date) {
    let dayOfWeek = date.getDay();



    return dayOfWeek === 0 || dayOfWeek === 6;
}

function createWeekendDaysArray(dateStr) {
    let dateArr = dateStr.split(',').map(x => new Date(x)); // (x) => { return new Date(x) };
    let weekendDays = getWeekendDaysInMonth(dateArr);

    return weekendDays;
}

function getWeekendDaysInMonth(dateArr) {

    let weekendDays = [];

    for (let i = 0; i < dateArr.length; i++) {
        let month = dateArr[i].getMonth();

        while (dateArr[i].getMonth() === month) {
            if (isWeekendDay(dateArr[i])) {
                weekendDays.push(dateArr[i].toISOString().slice(0, 10)); //коммент про moment()
            }

            dateArr[i].setDate(dateArr[i].getDate() + 1);
        }
    }

    return weekendDays;
}

//https://www.thepolyglotdeveloper.com/2017/08/unit-testing-node-js-application-jasmine-testing-framework/