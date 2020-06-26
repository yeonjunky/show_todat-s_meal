const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

function getTime(){
    const date = new Date();
    const yyyy = date.getFullYear().toString();
    const mm = date.getMonth() + 1;
    const dd = (date.getDate() + 1).toString();

    if (mm < 10) {
        modifiedMm = '0' + mm.toString();
    }

    return yyyy + '.' + modifiedMm + '.' + dd;
}

let currentDate = getTime();
let day = new Date().getDay();

const lunchCode = "2";
const dinnerCode = "3";

const lunch_url = `https://stu.dje.go.kr/sts_sci_md01_001.do?schulCode=G100000167&schulCrseScCode=4&schulKndScCode=04&schMmealScCode=${lunchCode}&schYmd=${currentDate}`;
const dinner_url = `https://stu.dje.go.kr/sts_sci_md01_001.do?schulCode=G100000167&schulCrseScCode=4&schulKndScCode=04&schMmealScCode=${dinnerCode}&schYmd=${currentDate}`;

const getHtml = async (p_url) => {
    try {
        return await axios.post(p_url);
    }
    catch {
         
    }
}

const lunch = {};
const dinner = {};
const DotReg = /\.+/g
const Reg = /[0-9]/g

getHtml(lunch_url)
    .then(html => {
        const $ = cheerio.load(html.data);
        const $body = $('body').find("tbody").children('tr').eq(1);
        lunch.key = $body.find('th').text();
        lunch.data = $body.find('td').eq(day).text();
        lunch.data = lunch.data.replace(Reg, "");
        lunch.data = lunch.data.replace(DotReg, " ");
        if (lunch.data == " "){
            lunch.data = '오늘 급식은 없습니다.';
        }
        fs.writeFileSync('meal.txt', lunch.data, 'utf8');
        console.log(lunch);
    });

// getHtml(dinner_url)
//     .then(html => {
//         const $ = cheerio.load(html.data);
//         const $body = $('body').find("tbody").children('tr').eq(1);
//         dinner.key = $body.find('th').text();
//         dinner.data = $body.find('td').eq(day).text();
//         if (dinner.data == " "){
//             dinner.data = '오늘 급식은 없습니다.';
//         }
//         fs.writeFileSync('meal.txt', dinner.data, 'utf8');
//         console.log(dinner);
//         process.exit();
//     });