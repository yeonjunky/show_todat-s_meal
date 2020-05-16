const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://movie.naver.com/movie/running/current.nhn?view=list&tab=normal&order=likeCount';

axios.get(url).then(res => {
  if (res.status === 200) {
    let crawledMovie = [];
    const $ = cheerio.load(res.data);
    const $movieList = $('div.lst_wrap ul.lst_detail_t1').children('li');
  
    $movieList.each(function (i) {
      crawledMovie[i] = {
        title: $(this).find('dt.tit a').text(),
        star: $(this).find('em.num_likeit').text().replace(/\t/gi, '').replace(/\n/gi,'')
      };
    });
  
    const data = crawledMovie.filter(m => m.title);
    console.log(data);
  }
}, (error) => console.log(error));