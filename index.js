const cheerio = require("cheerio");
const axios = require("axios");

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

url = `https://stu.dje.go.kr/sts_sci_md01_001.do?schulCode=G100000167&schulCrseScCode=4&schulKndScCode=04&schMmealScCode=${lunchCode}&schYmd=${currentDate}`;

const getHtml = async () => {
    try {
        return await axios.post(url)
    }
    catch {
         
    }
}

getHtml()
    .then(html => {
        const lunch = {};
        const $ = cheerio.load(html.data);
        const $body = $('body').find("tbody").children('tr').eq(1);
        lunch.key = $body.find('th').html();
        lunch.data = $body.find('td').eq(day).text();
        if (lunch.data == " "){
            console.log('오늘 급식은 없습니다.');
        }
        console.log(lunch.data);
    });
