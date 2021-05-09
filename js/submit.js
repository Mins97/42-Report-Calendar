import { calendarCreate, updateProgress } from "./calendar.js"
import { ChartCreate1 } from "./myChartOne.js"
import { ChartCreate2 } from "./myChartTwo.js"
import { ChartCreate3 } from "./myChartThree.js"
var JSONdata = '';
var searchName = window.location.href.slice([window.location.href.indexOf('id') + 3]);
if (searchName.length > 0)
fetch('http://42report.today/intra?id=' + searchName, {//''http://42report.today/intra?id=yongkim'
}).then(function (response) {
	console.log('response', response)
	// console.log('header', response.headers.get('Content-Type'))
	return response.text()
}).then(function (text) {
	//#region 주차별 학습레포트 제출현황 월/일 초기화
	let monthList = document.getElementsByClassName('reportMonth');
	let reportDate = document.getElementsByClassName('reportDate');
	let percentList = document.getElementsByClassName('reportPercent');
	// 시스템 월 기준 바꾸기
	Object.entries(monthList).map((d, i) => monthList[i].innerHTML = new Date().getMonth() + 1)
	// 해당 달에서 월요일 찾기
	let initDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
	while (initDay.getDay() != 1)
		initDay = new Date(initDay.setDate(initDay.getDate() + 1))
	// 구한 월요일 기준으로 나머지 주차별 일 바꾸기
	Object.entries(reportDate).map((d, i) => (!(i % 2)) ? reportDate[i].innerHTML = initDay.getDate() + (i / 2) * 7 : reportDate[i].innerHTML = initDay.getDate() + (i + 1) * 3.5 - 1)
	// 마지막 주차 달 넘으면 바꾸기
	let today = Number(reportDate[7].innerHTML);
	let lastday = new Date(initDay.getFullYear(), initDay.getMonth() + 1, 0).getDate()
	if (today > lastday) {
		//해당 월 바꾸고(해당월이 13월이면 1월로바꿈)
		monthList[7].innerHTML = (Number(monthList[7].innerHTML) + 1 > 12) ? 1 : Number(monthList[7].innerHTML) + 1;
		//해당 일 뺴기
		reportDate[7].innerHTML = today - lastday;
	}
	//#endregion


	// 캘린더 초기화
	calendarCreate(JSON.parse(text).report);
	JSONdata = JSON.parse(text).report
	// 그래프 초기화
	ChartCreate1();
	ChartCreate2();
	ChartCreate3();

	updateProgress();
}).catch(function (ex) {
	console.log('failed', ex)
})

export { JSONdata };