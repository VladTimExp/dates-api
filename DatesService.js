const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.listen(3000, function() {
    console.log('application has been initiated!')
});

app.use(bodyParser.json({

}));

let dateStorage = [];

//routes for requests GET and POST
app.get('/dates', (req, res) => {
    let m = req.query.months;
    let weekendDays = createWeekendDaysArray(m);

    res.send(weekendDays);
});

app.post('/dates/save', (req, res) => {
    dateStorage = req.body.filter(x => x.value).map(y => y.date); //choose only true dates

    res.send(dateStorage);
});

//helping funcs
function isWeekendDay(date) {
    let dayOfWeek = date.getDay();

    return dayOfWeek === 0 || dayOfWeek === 6;
}

function createWeekendDaysArray(dateStr) {
    let dateArr = dateStr.split(',').map(x => new Date(x)); //Arr of Str to Arr of Date objects
    let weekendDays = getWeekendDaysInMonth(dateArr);

    return weekendDays;
}

function getWeekendDaysInMonth(dateArr) {
    let weekendDays = [];

    for (let i = 0; i < dateArr.length; i++) { // for each months days check isWeekend
        let month = dateArr[i].getMonth();

        while (dateArr[i].getMonth() === month) {
            if (isWeekendDay(dateArr[i])) {
                weekendDays.push(dateArr[i].toISOString().slice(0, 10));
            }

            dateArr[i].setDate(dateArr[i].getDate() + 1);
        }
    }

    return weekendDays;
}
