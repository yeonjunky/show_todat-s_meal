const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs")

function getTime(){
    const date = new Date();
    const yyyy = date.getFullYear().toString();
    const mm = date.getMonth() + 1;
    const dd = date.getDate().toString();

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


const meal = getHtml(lunch_url)
    .then(html => {
        const $ = cheerio.load(html.data);
        const $body = $('body').find("tbody").children('tr').eq(1);
        lunch.key = $body.find('th').text();
        lunch.data = $body.find('td').eq(day).text();
        if (lunch.data == " "){
            lunch.data = '오늘 급식은 없습니다.';
        }
        fs.writeFileSync('meal.txt', lunch.data, 'utf8');
        console.log(lunch);
    });
