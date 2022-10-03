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
/**
 * 
 * @param {number} min 最小値
 * @param {number} max 最大値
 * @returns {boolean}
 */
function isMinMax(min, max) {   
    if(min > max) {
        console.log("min > max"); //invalid
        return false;
    }else{
        console.log("min <= max"); //correct
        return true;
    }
}
/**
 * @param {number} x
 */
function isNumber(x){
    if(x != NaN) {
        return true;
    }else{
        return false;
    }
}
/**
 * 
 * @returns {{min: number, max: number, amount: number}} 
 * min 最小値 max 最大値 amount 個数
 */
function getFormValue() {
    let min = Number(document.getElementById("min").value);
    let max = Number(document.getElementById("max").value);
    let amount = Number(document.getElementById("amount").value);
    return [min,max,amount];
}
/**
 * ボタンクリック時の処理
 */
function buttonClick() {
    let min = getFormValue()[0];
    let max = getFormValue()[1];
    let amount = getFormValue()[2];
    let randnum = setIntRandom(min, max, amount);
    for(let i = 0; i < amount; i++) {
        document.getElementById("export-box").append(randnum[i] + " ");
    }
}
/**
 * 
 * @param {string} errorMessage 
 * @param {string} messagePlace 
 */
function showErrorMessage(errorMessage, messagePlace){
    document.getElementById(messagePlace).innerHTML = errorMessage;
}
/**
 * 
 * @param {string} messagePlace 
 */
function clearErrorMessage(messagePlace){
    document.getElementById(messagePlace).innerHTML = "";
}
/**
 * formの最小値と最大値のチェック
 */
function formMinMaxCheck() {
    let min = getFormValue()[0];
    let max = getFormValue()[1];
    //error pattern 1 "min max check"
    if(isMinMax(min, max)) { //min <= max
        document.getElementById("min").classList.remove("error");
        document.getElementById("max").classList.remove("error");
        console.log("min <= max");
        clearErrorMessage("error-message-1");
        document.getElementById("rand-button").disabled = false;
    }else{ //min > max
        document.getElementById("min").classList.add("error");
        document.getElementById("max").classList.add("error");
        console.log("min > max");
        showErrorMessage("最小値は最大値以下にしてください。", "error-message-1");
        document.getElementById("rand-button").disabled = true;
    }
    
}

window.onload = function() {
    /* set version */
    let version = "0.2β";
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
    document.getElementById("rand-button").addEventListener("click", buttonClick);
    /*form check*/
    document.getElementById("min").addEventListener("input", function() {
        formMinMaxCheck();
    });
    document.getElementById("max").addEventListener("input", function() {
        formMinMaxCheck();
    });
    /*test code*/
    document.getElementById("test").addEventListener("click", function() {
        //document.getElementById("min").classList.add("error");
    });
}