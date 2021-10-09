// Tests for feature 1 go here
const vicDataSample1 = [
    { date: "", cases: 1 },
    { date: "", cases: 2 },
    { date: "", cases: 3 },
    { date: "", cases: 4 },
    { date: "", cases: 5 },
    { date: "", cases: 6 },
    { date: "", cases: 7 },
    { date: "", cases: 8 },
    { date: "", cases: 9 },
    { date: "", cases: 10 },
];

const vicDataSample2 = [
    { date: "", cases: 1 },
    { date: "", cases: 1 },
    { date: "", cases: 1 },
    { date: "", cases: 1 },
    { date: "", cases: 1 },
    { date: "", cases: 1 },
    { date: "", cases: 1 },
    { date: "", cases: 1 },
    { date: "", cases: 1 },
    { date: "", cases: 1 },
];


// test smoothData
/**
 * Smooths out the data at each date by averaging it with the data before and after the date
 * the range of this is specified by the smoothness.
 * 
 * @param {object[]} data array of data, each element is an object
 * @param {number} smoothness a smoothness level between 1 (not smoothed) to 7 (smoothed by 7 days)
 * @return the data that has been smoothed
 */
function smoothData(data, smoothness) {

    const average = (fromIndex, toIndex) => {
        let sum = 0;
        for (let i = fromIndex; i < toIndex; i++) {
            sum += data[i].cases
        }
        return sum / (toIndex - fromIndex)
    }

    let smoothedData = []

    let lowerRange = Math.floor(smoothness / 2);
    let upperRange = Math.ceil(smoothness / 2);
    for (let i = lowerRange; i <= data.length - upperRange; i++) {
        smoothedData.push({ ...data[i], cases: average(i - lowerRange, i + upperRange) })
    }

    return smoothedData
}

function testSmoothData1() {
    console.assert(JSON.stringify(smoothData(vicDataSample1, 1).map((e) => e.cases)) === JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
    console.assert(JSON.stringify(smoothData(vicDataSample1, 2).map((e) => e.cases)) === JSON.stringify([1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5]))
    console.assert(JSON.stringify(smoothData(vicDataSample1, 3).map((e) => e.cases)) === JSON.stringify([2, 3, 4, 5, 6, 7, 8, 9]))
    console.assert(JSON.stringify(smoothData(vicDataSample1, 10).map((e) => e.cases)) === JSON.stringify([5.5]))
}

function testSmoothData2() {
    console.assert(JSON.stringify(smoothData(vicDataSample2, 1).map((e) => e.cases)) === JSON.stringify([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]))
    console.assert(JSON.stringify(smoothData(vicDataSample2, 2).map((e) => e.cases)) === JSON.stringify([1, 1, 1, 1, 1, 1, 1, 1, 1]))
    console.assert(JSON.stringify(smoothData(vicDataSample2, 3).map((e) => e.cases)) === JSON.stringify([1, 1, 1, 1, 1, 1, 1, 1]))
    console.assert(JSON.stringify(smoothData(vicDataSample2, 10).map((e) => e.cases)) === JSON.stringify([1]))
}

testSmoothData1();
testSmoothData2();
