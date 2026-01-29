/// calendarmod.js

import { DateTime } from 'luxon'
import { createSignal } from 'solid-js';

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default class Calendarmod {
  constructor() { 
    this.dt = DateTime.now(); 
    this.numYears = 10;
  }
  now = () => this.dt;

  monthName = (m) => months[m];

  weekdayName = (w) => weekdays[w];
  
  setMonth(m) { 
    this.dt = this.dt.set({month: m}); 
  }
  yearRange(numYears = 12) {
    const start = Math.floor(this.dt.year / 10) * 10;
    return Array.from({length: numYears}, (_, i) => start + i);
  }
  shortFmt = () => this.dt.toFormat("EEE dd MMM yyyy")

  fullFmt = () => this.dt.toFormat("EEEE dd MMMM yyyy")

  goToday() {
    let d = DateTime.now();
    this.dt.set({year: d.year, month: d.month, day: 1});
  }

  getMonth = () => this.dt.month;

  getDay = () => this.dt.day;

  getYear = () => this.dt.year;
  
  setYear = (y) => {
    this.dt.set({ year: y })
  }
  isYear = (y) => this.dt.year == y;
  isMonth = (m) => this.dt.month == m;
  isDay = (d) => this.dt.day == d;
  isWeekday = (w) => this.dt.weekday == w;

  setNumyears = (n) => this.numYears = n;

  getNumyears = () => this.numYears;

  goPrev = (n) => {
    this.setNumyears(n);
    this.dt.set({ year: this.dt.year - n })
  }
  
  goNext = (n) => {
    this.setNumyears(n);
    this.dt.set({ year: this.dt.year + n })
  }

  marks = (num_marks, radius, fontsize=3) => {
    let arr = [];
    const step_angle = 360 / num_marks;
    for (let i=0; i < num_marks; i++) {
      let angle = i * step_angle - 90;
      let rad = angle * Math.PI / 180;
      let x = radius * Math.cos(rad);
      let y = radius * Math.sin(rad);
      let val = i ;
      let pt = {x,y,fontsize,val};
      arr.push(pt);
    }
    return arr;
  }

  startYear = () => this.dt.year - (this.dt.year % 10); 

  lastDate = () => this.dt.endOf('month').day;


  ydays = (m) => {
    let arr = [];
    const nextMonth = m;
    let dt = this.dt;
    let startOfMonth = dt.set({ month: nextMonth, day: 1 });
    let endOfMonth = startOfMonth.endOf("month");
    for (let d = startOfMonth.day; d <= endOfMonth.day; d++) {
      arr = [...arr, dt.set({ month: nextMonth, day: d }).day];
    }
    return arr;
  };

  svgText = (px,py,pf,pclr,pval) => (<text x={px} y={py} text-anchor='middle' font-size={pf} fill={pclr}>{pval}</text>)
}
