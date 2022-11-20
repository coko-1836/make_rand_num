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
 * 
 * @param {number} x 
 * @returns {boolean}
 */
function isNumber(x) { return x != NaN; }
/**
 * 
 * @param {string} str 
 * @returns 
 */
function isStringEmpty(str) { return str == ""; }
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
function setCookie(min,max,amount,isAcceptCookie) {
    document.cookie = "min=" + min +";sameSite=strict;secure";
    document.cookie = "max=" + max +";sameSite=strict;secure";
    document.cookie = "amount=" + amount +";sameSite=strict;secure";
    document.cookie = "isAcceptCookie=" + isAcceptCookie +";sameSite=strict;secure";
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
    let isAcceptCookie;
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
        if(e.trim().startsWith("isAcceptCookie=")) {
            isAcceptCookie = e.trim().split("=")[1];
        }
    });
    console.log(min,max,amount,isAcceptCookie);
    return [min,max,amount,isAcceptCookie];
}
/**
 * delete cookie
 */
function deleteCookie() {
    document.cookie = "min=;max-age=0;";
    document.cookie = "max=;max-age=0;";
    document.cookie = "amount=;max-age=0;";
    document.cookie = "isAcceptCookie=;max-age=0;";
}
/**
 * 指定されたDOMを表示します
 * displayのtypeは選択してください
 * @param {string} id 
 * @param {string} displayType block | flex | flexbox | inline | inline-block | inline-flex | inline-flexbox | inline-table | list-item | run-in | table | table-caption | table-column-group | table-header-group | table-footer-group | table-row-group | table-cell | table-column | table-row | none | initial | inherit
 */
function visibleDOMById(id,displayType){document.getElementById(id).style.display = displayType;}
/**
 * 指定されたDOMを隠します
 * @param {string} id 
 */
function hiddenDOMById(id){document.getElementById(id).style.display = "none";}
/*特有*/
/**
 * ボタンクリック時の処理
 */
function buttonClick(isAcceptCookie) {
    let min = getFormValue()[0];
    let max = getFormValue()[1];
    let amount = getFormValue()[2];
    let randnum = setIntRandom(min, max, amount);
    let isCheck = document.getElementById("chk-clear").checked;
    let isDelCookieCheck = document.getElementById("chk-del-cookie").checked;
    if(isCheck) {document.getElementById("export-box").innerHTML = "";}
    for(let i = 0; i < amount; i++) {document.getElementById("export-box").append(randnum[i] + " ");}
    if(isAcceptCookie){setCookie(min,max,amount,isAcceptCookie);}
    if(isDelCookieCheck) {deleteCookie();}
}
/**
 * 
 * @param {string} message
 * @param {string} messagePlace 
 */
function showMessage(message, messagePlace){ document.getElementById(messagePlace).innerHTML = message; }
/**
 * 
 * @param {string} messagePlace 
 */
function clearMessage(messagePlace){ document.getElementById(messagePlace).innerHTML = "";}
/**
 * formの最小値と最大値のチェック
 */
function formMinMaxCheck() {
    let min = getFormValue()[0];
    let max = getFormValue()[1];
    if(isMinMax(min, max)) {
        document.getElementById("min").classList.remove("error");
        document.getElementById("max").classList.remove("error");
        //console.log("min <= max");
        clearMessage("error-message-1");
        return true; 
    }else{ //min > max
        document.getElementById("min").classList.add("error");
        document.getElementById("max").classList.add("error");
        //console.log("min > max")
        showMessage("最小値は最大値以下にしてください。", "error-message-1");
        return false; 
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
    if(isStringEmpty(min) || isStringEmpty(max) || isStringEmpty(amount)) {
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
    let isAcceptCookie = getCookie()[3];
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
    if(isAcceptCookie == "true"){
        hiddenDOMById("check-cookie");
    }
}
function changeButton(){
    if(formMinMaxCheck() && !checkEmpty()) {
        document.getElementById("rand-button").disabled = false;
    }else{
        document.getElementById("rand-button").disabled = true;
    }
}
// /**
//  * check cookieを閉じるだけ
//  */
// function closeCheckCookie(){document.getElementById("check-cookie").style.display = "none";}
window.onload = function() {
    /* set version */
    let version = "0.6β";
    document.title = "乱数メーカー " + version;
    document.getElementById("version").innerHTML = version;
    /* set copyright year */
    const START_YEAR = 2022;
    let yearSpan = null;
    let date = new Date();
    let nowYear = date.getFullYear();
    (nowYear == START_YEAR) ? yearSpan = START_YEAR : yearSpan = START_YEAR + " - " + nowYear;
    document.getElementById("copyright-year").innerHTML = yearSpan;
    /*set value from cookie*/
    setValueFromCookie();
    changeButton();
    /*form check*/
    document.getElementById("min").addEventListener("input", changeButton);
    document.getElementById("max").addEventListener("input", changeButton);
    document.getElementById("amount").addEventListener("input", changeButton);
    /*test code*/
    // document.getElementById("test").addEventListener("click", getCookie);
    // document.getElementById("test2").addEventListener("click", deleteCookie);
    /*close policy*/
    const POLICY = document.getElementById("policy");
    document.getElementById("close-policy-button").addEventListener("click", function(){
       POLICY.style.visibility = "hidden";
       POLICY.style.opacity = "0";
    });
    document.getElementById("open-policy").addEventListener("click", function(){
        POLICY.style.visibility = "visible";
        POLICY.style.opacity = "1";
    });
    /*cookie button*/
    let isAcceptCookie = true;
    //accept
    document.getElementById("accept-cookie").addEventListener("click", function(){
        isAcceptCookie = true;
        hiddenDOMById("check-cookie");
    });
    document.getElementById("reject-cookie").addEventListener("click", function(){
        isAcceptCookie = false;
        hiddenDOMById("check-cookie");
    });
    /*button event*/
    document.getElementById("rand-button").addEventListener("click", function() {
        buttonClick(isAcceptCookie);
    });
}