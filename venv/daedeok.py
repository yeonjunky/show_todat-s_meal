from flask import Flask, request, jsonify, render_template
import sys
from bs4 import BeautifulSoup
import requests, re, json
from datetime import datetime

app = Flask(__name__)

def getHtml(url):
    html = ""
    req = requests.get(url)  # html get request
    if req.status_code == 200:  # 1xx : informational, 2xx : success, 3xx : redirection, 4xx : client error, 5xx : server error
        html = req.text  # html 소스 텍스트로 변환
    return html


def today_lunch():
    schoolMealCode = 2  # 1 아침 2 점심 3 저녁
    schoolYmd = datetime.today().strftime("%Y.%m.%d")  # 오늘 날짜 연.월.일 문자열
    weekday = datetime.today().weekday() + 1
    neis = (
            "https://stu.dje.go.kr/sts_sci_md01_001.do?"
            "schulCode=G100000167"
            "&schulCrseScCode=4"
            "&schulKndScCode=04"
            "&schMmealScCode=%d&schYmd=%s" % (schoolMealCode, schoolYmd)
    )
    html = getHtml(neis)  ## BeautifulSoup으로 html소스를 python객체로 변환
    soup = BeautifulSoup(html, "html.parser")  ## 첫 인자는 html소스코드, 두 번째 인자는 어떤 parser를 이용할지 명시.
    element = soup.find_all("tr")
    element = element[2].find_all('td')
    try:
        element = element[weekday]
        element = str(element)
        element = element.replace('<br/>', '\n')  # 필요 없는 텍스트 지움
        element = element.replace('</td>', '')
        element = element.replace('<td class="textC">', '')
        element = element.replace('.', '')
        element = element.replace('<td class="textC last">', '')
        element = re.sub(r'\d', '', element)
        if element == " ":  # 지웠을 때 남은 텍스트가 없으면 급식 없다고 리턴
            element = '\n급식이 없습니다.'
    except:
        element = "\n급식이 없습니다."  # element[weekday]가 없으면 오류 메세지 대신 리턴

    return element


def today_dinner():
    schoolMealCode = 3  # 1 = 아침 2 = 점심 3 = 저녁
    schoolYmd = datetime.today().strftime("%Y.%m.%d")
    weekday = datetime.today().weekday() + 1
    neis = (
            "http://stu.dje.go.kr//sts_sci_md01_001.do?"
            "schulCode=G100000167"
            "&schulCrseScCode=4"
            "&schulKndScCode=04"
            "&schMmealScCode=%d&schYmd=%s" % (schoolMealCode, schoolYmd)
    )
    html = getHtml(neis)
    soup = BeautifulSoup(html, "html.parser")
    element = soup.find_all("tr")
    element = element[2].find_all('td')
    try:
        element = element[weekday]
        element = str(element)
        element = element.replace('<br/>', '\n')
        element = element.replace('</td>', '')
        element = element.replace('<td class="textC">', '')
        element = element.replace('.', '')
        element = element.replace('<td class="textC last">', '')
        element = re.sub(r'\d', '', element)
        if element == " ":
            element = '\n급식이 없습니다.'
    except:
        element = "\n급식이 없습니다."

    return element


def month_schedule():
    strSchedule = ""
    neis = (
        "https://stu.dje.go.kr/sts_sci_sf01_001.do?schulCode=G100000167&schulKndScCode=04&schulCrseScCode=4"
    )
    html = getHtml(neis)
    soup = BeautifulSoup(html, "html.parser")

    div = soup.find_all('div', {"class" : "textL"})

    for element in div:
        strSchedule += element.text

    return strSchedule

@app.route('/')
def main():
    return render_template('index.html',
                           month_schedule = month_schedule(),
                           lunch = today_lunch(),
                           dinner = today_dinner())

if __name__ == '__main__':
    app.run(port=8080)