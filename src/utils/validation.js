const moment = require('moment');

// 手机号
export function isvalidPhone (phone) {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
    return reg.test(phone);
}

// 车牌号
export function isvalidPlate (plate) {
    const reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
    return reg.test(plate);
}

// 正整数（不包含0,不包含小数）
export function isPositiveInteger (number) {
    const reg = /^[1-9]\d*$/;
    return reg.test(number);
}

// 正整数（包含0，不包含小数）
export function isPositiveIntegerHasZero (number) {
    const reg = /^[+]{0,1}(\d+)$/;
    return reg.test(number);
}

// 正整数(包括0，小数保留两位)
export function isIntegerHasZero (number) {
    const reg = /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*)|0)$/;
    return reg.test(number);
}

// 正整数（不包括0，小数保留两位）
export function isInteger (number) {
    const reg = /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*))$/;
    return reg.test(number);
}

export function judgeInputText (string) {
    const reg = /^[\u4e00-\u9fa5a-z]+$/gi;
    return reg.test(string);
}

// 获取年龄
export function getAge (birthday) {
    let birth = moment(birthday);
    let months = moment().diff(birth, 'months', true);
    let birthSpan = { year: Math.floor(months / 12), month: Math.floor(months) % 12, day: Math.round((months % 1) * moment().daysInMonth(), 0) };
    if (birthSpan.year < 1 && birthSpan.month < 1) {
        return birthSpan.day + ' 天';
    } else if (birthSpan.year < 1) {
        return birthSpan.month + ' 月' + birthSpan.day + ' 天';
    } else if (birthSpan.year < 2) {
        return birthSpan.year + ' 岁' + birthSpan.month + ' 月';
    } else {
        return birthSpan.year + ' 岁';
    }
}
