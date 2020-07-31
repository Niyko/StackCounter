
//Init the counter
init();

//Get counter data and init counting
async function init(){
    let currentTotalCount = await getFromStorage("total_count", 0);
    let currentTodayCount = await getFromStorage("today_count", 0);
    let todayDate = await getFromStorage("today_date", getDateStamp());
    let currentMonthCount = await getFromStorage(`month_${getMonthName()}_count`, 0);

    if(todayDate!=getDateStamp()){
        currentTodayCount = 0;
        setToStorage("today_date", getDateStamp());
    }

    setToStorage("total_count", currentTotalCount+1);
    setToStorage("today_count", currentTodayCount+1);
    setToStorage(`month_${getMonthName()}_count`, currentMonthCount+1);
    //console.log(getDateStamp() + "----" + todayDate);
}

//On error
function onError(){
    console.log("storage local error");
}