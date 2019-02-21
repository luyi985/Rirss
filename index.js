// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');


const sortObjectByKey = o => Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});

const calculatFeeOnDuration = duration => {
    if(!duration) return 0;
    if (duration < 5 * 60 ) return 3 * duration;
    return Math.ceil(duration/60) * 150;
}

const calculatDuration = duration => {
    const [hh,mm,ss] = duration.split(':');
    const intHH = parseInt(hh,10);
    const intMM = parseInt(mm,10);
    const intSS = parseInt(ss,10);
    return intSS + intMM * 60 + intHH * 3600
}

const formatReudcer = (acc={},record) => {
    const [currentRecordDuration ,currentRecordNumber] = record.split(',');
    const numberList = Object.keys(acc);
    const currentDurationInt = calculatDuration(currentRecordDuration);

    if (numberList.includes(currentRecordNumber)) {
        acc[currentRecordNumber].duration += currentDurationInt;
        acc[currentRecordNumber].fee += calculatFeeOnDuration(currentDurationInt);
    }else {
        acc[currentRecordNumber] = {}
        acc[currentRecordNumber].duration = currentDurationInt;
        acc[currentRecordNumber].fee = calculatFeeOnDuration(currentDurationInt);
    }
    return acc;
}

const formatRecords = S => {
    const recordList = S.split('\n')
    return recordList.reduce(formatReudcer, {})
}

const getPromotionNumber = recordsObj => {
    const sortRecordByNumber = sortObjectByKey(recordsObj);
    return Object.entries(sortRecordByNumber).find(([k,v]) => v.duration > 300);
}

function solution(S) {
    const records = formatRecords(S);
    console.log(records)
    const promotionNumber = getPromotionNumber(records) && getPromotionNumber(records)[0];
    return Object.entries(records).reduce((sum, record) => {
        if(record[0] === promotionNumber) return sum;
        return sum + record[1].fee;
    },0)
    // write your code in JavaScript (Node.js 8.9.4)
}

//const fee = solution(`00:05:01,701-080-080\n00:01:07,400-234-090\n00:05:00,400-234-090`)
const fee = solution(`00:05:01,701-080-080\n00:01:07,400-234-090\n00:05:00,400-234-090\n00:04:59,800-234-090`)
console.log(fee)