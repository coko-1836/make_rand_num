/**
 * 
 * @param {number} min 最小値
 * @param {number} max 最大値
 * @param {number} amount 個数
 */
function setIntRandom(min, max,amount) {
    let randnum = new Array();
    for(let i = 0; i < amount; i++) {
        randnum[i] = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    console.log(randnum);
    return randnum;
}
window.onload = function() {
    /* set version */
    let version = "0.1β";
    document.title = "乱数メーカー " + version;
    document.getElementById("version").innerHTML = version;
    /* set copyright year */
    const START_YEAR = 2022;
    let YEAR_SPAN = null;
    let date = new Date();
    let nowYear = date.getFullYear();
    if(nowYear != START_YEAR) {
        YEAR_SPAN = START_YEAR + " - " + nowYear;
    } else {
        YEAR_SPAN = START_YEAR;
    }
    document.getElementById("copyright-year").innerHTML = YEAR_SPAN;
    /*button event*/
    document.getElementById("rand-button").addEventListener("click", function() {
        let min = Number(document.getElementById("min").value);
        let max = Number(document.getElementById("max").value);
        let amount = Number(document.getElementById("amount").value);
        let randnum = setIntRandom(min, max, amount);
        for(let i = 0; i < amount; i++) {
            document.getElementById("export-box").append(randnum[i] + " ");
        }
                //document.getElementById("export-box").innerHTML = randnum;
    });
}