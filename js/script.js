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
 * ボタンクリック時の処理
 */
function buttonClick() {
    let min = getFormValue()[0];
    let max = getFormValue()[1];
    let amount = getFormValue()[2];
    let randnum = setIntRandom(min, max, amount);
    let isCheck = document.getElementById("chk-clear").checked;
    if(isCheck) {
        document.getElementById("export-box").innerHTML = "";
    }    
    for(let i = 0; i < amount; i++) {
        document.getElementById("export-box").append(randnum[i] + " ");
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
        console.log("min <= max");
        clearMessage("error-message-1");
        return true; //OK
        //document.getElementById("rand-button").disabled = false;
    }else{ //min > max
        document.getElementById("min").classList.add("error");
        document.getElementById("max").classList.add("error");
        console.log("min > max")
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
window.onload = function() {
    /* set version */
    let version = "0.3β";
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
    document.getElementById("test").addEventListener("click", function() {
        //document.getElementById("min").classList.add("error");
    });
}