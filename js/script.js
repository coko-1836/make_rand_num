/*汎用*/
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
    //console.log(randnum);
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
        //console.log("min > max"); //invalid
        return false;
    }else{
        //console.log("min <= max"); //correct
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
 * @param {string} str 
 * @returns boolean
 */
 function isEmpty(str) {
    if(str == "") {
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
 * set cookie
 * @param {number} min 最小値
 * @param {number} max 最大値
 * @param {number} amount 個数
 */
function setCookie(min,max,amount) {
    document.cookie = "min=" + min +";sameSite=strict";
    document.cookie = "max=" + max +";sameSite=strict";
    document.cookie = "amount=" + amount +";sameSite=strict";
    console.log(document.cookie);
}
/**
 * 
 * @returns {number} min max amount
 */
function getCookie(){
    let cookie = document.cookie.split(";");
    let min;
    let max;
    let amount;
    cookie.forEach(e => {
        if(e.trim().startsWith("min=")) {
            min = e.trim().split("=")[1];
        }
        if(e.trim().startsWith("max=")) {
            max = e.trim().split("=")[1];
        }
        if(e.trim().startsWith("amount=")) {
            amount = e.trim().split("=")[1];
        }
    });
    // (typeof min == "undefined") ? min = "" : min = min;
    // (typeof max == "undefined") ? max = "" : max = max;
    // (typeof amount == "undefined") ? amount = "" : amount = amount;
    console.log(min,max,amount);
    return [min,max,amount];
}
/**
 * delete cookie
 */
function deleteCookie() {
    document.cookie = "min=;max-age=0;";
    document.cookie = "max=;max-age=0;";
    document.cookie = "amount=;max-age=0;";
}
/*特有*/
/**
 * ボタンクリック時の処理
 */
function buttonClick() {
    let min = getFormValue()[0];
    let max = getFormValue()[1];
    let amount = getFormValue()[2];
    let randnum = setIntRandom(min, max, amount);
    let isCheck = document.getElementById("chk-clear").checked;
    let isDelCookieCheck = document.getElementById("chk-del-cookie").checked;
    if(isCheck) {
        document.getElementById("export-box").innerHTML = "";
    }
    for(let i = 0; i < amount; i++) {
        document.getElementById("export-box").append(randnum[i] + " ");
    }
    setCookie(min,max,amount);
    if(isDelCookieCheck) {
        deleteCookie();
    }
    
}
/**
 * 
 * @param {string} message
 * @param {string} messagePlace 
 */
function showMessage(message, messagePlace){
    document.getElementById(messagePlace).innerHTML = message;
}
/**
 * 
 * @param {string} messagePlace 
 */
function clearMessage(messagePlace){
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
        //console.log("min <= max");
        clearMessage("error-message-1");
        return true; //OK
        //document.getElementById("rand-button").disabled = false;
    }else{ //min > max
        document.getElementById("min").classList.add("error");
        document.getElementById("max").classList.add("error");
        //console.log("min > max")
        showMessage("最小値は最大値以下にしてください。", "error-message-1");
        return false; //NG
    }
    
}
/**
 * CHK is empty
 * true: some empty
 * false: no one empty
 * @returns {boolean}
 */
function checkEmpty() {
    let min = getFormValue()[0];
    let max = getFormValue()[1];
    let amount = getFormValue()[2];
    if(isEmpty(min) || isEmpty(max) || isEmpty(amount)) {
        //some input is empty
        return true; //NG
    }else{
        //all input is not empty
        return false; //OK
    }
}
function setValueFromCookie(){
    let min = getCookie()[0];
    let max = getCookie()[1];
    let amount = getCookie()[2];
    console.log(min,max,amount);
    if(min != ""){
        document.getElementById("min").value = min;
    }
    if(max != ""){
        document.getElementById("max").value = max;
    }
    if(amount != ""){
        document.getElementById("amount").value = amount;
    }
}
window.onload = function() {
    /* set version */
    let version = "0.4β";
    document.title = "乱数メーカー " + version;
    document.getElementById("version").innerHTML = version;
    /* set copyright year */
    const START_YEAR = 2022;
    let YEAR_SPAN = null;
    let date = new Date();
    let nowYear = date.getFullYear();
    (nowYear == START_YEAR) ? YEAR_SPAN = START_YEAR : YEAR_SPAN = START_YEAR + " - " + nowYear;
    document.getElementById("copyright-year").innerHTML = YEAR_SPAN;
    /*set value from cookie*/
    setValueFromCookie();
    if(formMinMaxCheck() && !checkEmpty()) {
        document.getElementById("rand-button").disabled = false;
    }else{
        document.getElementById("rand-button").disabled = true;
    }
    /*button event*/
    document.getElementById("rand-button").addEventListener("click", buttonClick);
    /*form check*/
    document.getElementById("min").addEventListener("input", function() {
        if(formMinMaxCheck() && !checkEmpty()) {
            document.getElementById("rand-button").disabled = false;
        }else{
            document.getElementById("rand-button").disabled = true;
        }
    });
    document.getElementById("max").addEventListener("input", function() {
        if(formMinMaxCheck() && !checkEmpty()) {
            document.getElementById("rand-button").disabled = false;
        }else{
            document.getElementById("rand-button").disabled = true;
        }
    });
    document.getElementById("amount").addEventListener("input", function() {
        if(formMinMaxCheck() && !checkEmpty()) {
            document.getElementById("rand-button").disabled = false;
        }else{
            document.getElementById("rand-button").disabled = true;
        }
    });
    /*test code*/
    // document.getElementById("test").addEventListener("click", function() {
    //     getCookie();
    // });
    // document.getElementById("test2").addEventListener("click", function() {
    //     deleteCookie();
    // });
}