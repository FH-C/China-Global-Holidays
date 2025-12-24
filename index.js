const fs = require('fs');
const ical = require('ical-generator').default;
const path = require('path');

const cal = ical({
  name: '进口节日',
  timezone: 'Asia/Shanghai'
});

const holidays = [
  // Fixed dates (month is 1-12, day is 1-31)
  { type: 'fixed', name: '情人节', month: 2, day: 14, desc: '愿天下有情人都成眷属，记得给心爱的TA准备一份小惊喜哦！🌹' },
  { type: 'fixed', name: '愚人节', month: 4, day: 1, desc: '玩笑虽好，可不要贪杯哦！祝你今天快乐开心！🤡' },
  { type: 'fixed', name: '万圣节', month: 10, day: 31, desc: '不给糖就捣蛋！今晚是狂欢的时刻，准备好你的装扮了吗？🎃' },
  { type: 'fixed', name: '平安夜', month: 12, day: 24, desc: '平安夜，愿平安与你同在，吃个苹果，岁岁平安。🍎' },
  { type: 'fixed', name: '圣诞节', month: 12, day: 25, desc: 'Merry Christmas! 愿你的圣诞袜里装满了幸福和快乐。🎄' },

  // Variable dates
  { type: 'variable', name: '母亲节', rule: (year) => getNthWeekdayOfMonth(year, 5, 0, 2), desc: '妈妈辛苦了！记得打个电话，或者回家看看，说声我爱你。💐' }, // May, Sunday, 2nd
  { type: 'variable', name: '父亲节', rule: (year) => getNthWeekdayOfMonth(year, 6, 0, 3), desc: '父爱如山，深沉而伟大。祝老爸节日快乐，您辛苦了！👔' }, // June, Sunday, 3rd
  { type: 'variable', name: '黑色星期五', rule: (year) => getBlackFriday(year), desc: '买买买！辛苦一年了，趁着打折犒劳一下自己吧！🛍️' },
];

function getNthWeekdayOfMonth(year, month, weekday, n) {
  // month: 1-12, weekday: 0 (Sun) - 6 (Sat)
  const firstDayOfMonth = new Date(year, month - 1, 1);
  let count = 0;
  for (let day = 1; day <= 31; day++) {
    const date = new Date(year, month - 1, day);
    if (date.getMonth() !== month - 1) break;
    if (date.getDay() === weekday) {
      count++;
      if (count === n) return date;
    }
  }
  return null;
}

function getBlackFriday(year) {
  // Friday after 4th Thursday in November
  const thanksgiving = getNthWeekdayOfMonth(year, 11, 4, 4); // Nov, Thursday, 4th
  if (thanksgiving) {
    const blackFriday = new Date(thanksgiving);
    blackFriday.setDate(thanksgiving.getDate() + 1);
    return blackFriday;
  }
  return null;
}

const currentYear = new Date().getFullYear();
const yearsToGenerate = 5;

for (let i = 0; i < yearsToGenerate; i++) {
  const year = currentYear + i;

  holidays.forEach(holiday => {
    let date = null;
    if (holiday.type === 'fixed') {
      date = new Date(year, holiday.month - 1, holiday.day);
    } else if (holiday.type === 'variable') {
      date = holiday.rule(year);
    }

    if (date) {
      // Set to start of day for all-day event logic or specific time if needed. 
      // ical-generator handles date objects well.
      // Requirement: "3 days prior reminder and same day reminder"

      cal.createEvent({
        start: date,
        allDay: true,
        summary: holiday.name,
        description: holiday.desc || `${year}年的${holiday.name}`,
        alarms: [
          { type: 'display', trigger: 259200 }, // 3 days before (3 * 24 * 60 * 60)
          { type: 'display', trigger: 0 }       // On the day (at start time 00:00)
        ]
      });
    }
  });
}

// Ensure public directory exists
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

fs.writeFileSync(path.join(publicDir, 'holidays.ics'), cal.toString());
console.log('Calendar generated successfully!');
