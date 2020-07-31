//Get from local storage / Also stores defValue when not found
async function getFromStorage(key, defValue){
    let getData = await browser.storage.local.get(key).then((item) => {
        if(Object.keys(item).length === 0){
            let obj = {};
            obj[key] = defValue;
            browser.storage.local.set(obj);
            return defValue;
        }
        else {
            return item[key];
        }
    }, onError);
    return getData;
}

//Store to local storage
function setToStorage(key, value){
    let obj = {};
    obj[key] = value;
    browser.storage.local.set(obj);
}

//Get date stamp for saving today counts in today_date
function getDateStamp(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    return mm + '-' + dd + '-' + yyyy;
}

//Get current month name
function getMonthName(){
    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    const d = new Date();
    return monthNames[d.getMonth()].toLowerCase();
}

//Format number into K,M,B; digits => No of. decimal points
function nFormatter(num, digits) {
    var si = [
        { value: 1, symbol: "" },
        { value: 1E3, symbol: "k" },
        { value: 1E6, symbol: "M" },
        { value: 1E9, symbol: "G" },
        { value: 1E12, symbol: "T" },
        { value: 1E15, symbol: "P" },
        { value: 1E18, symbol: "E" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
        break;
        }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

//On error
function onError(){
    console.log("storage local error");
}