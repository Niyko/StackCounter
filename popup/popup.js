var totalCountElement = document.querySelector('#total-count');
var todayCountElement = document.querySelector('#today-count');
var monthCountElement = document.querySelector('#month-count');
var canvasBottom = document.querySelector('.canvas-bottom');
//var btn = document.querySelector('#abble');

document.addEventListener('contextmenu', event => event.preventDefault());
//btn.addEventListener("click", test); 

renderUI();


//Render values to the UI elements
async function renderUI(){
    let currentTotalCount = await getFromStorage("total_count", 0);
    let currentTodayCount = await getFromStorage("today_count", 0);
    let currentMonthCount = await getFromStorage(`month_${getMonthName()}_count`, 0);
    totalCountElement.innerHTML = nFormatter(currentTotalCount, 1);
    todayCountElement.innerHTML = nFormatter(currentTodayCount, 1);
    monthCountElement.innerHTML = nFormatter(currentMonthCount, 1);
    if(currentTotalCount==0){
        canvasBottom.style.backgroundColor = "transparent";
    }
    renderGraph();
}

function test(){

}


//Render the monthly graph
async function renderGraph(){
    var config = {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
                label: '',
                backgroundColor: "rgba(240, 114, 41, 0.2)",
                borderColor: "rgba(240, 114, 41, 1)",
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ],
                fill: true,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: false,
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: false,
                    scaleLabel: {
                        display: false,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: false,
                    scaleLabel: {
                        display: false,
                    },
                    ticks: {
                        padding: 10,
                    },
                }]
            },
            legend: { 
                display: false 
            },
            elements: {
                point:{
                    radius: 0
                }
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 5,
                    bottom: 2
                }
            }
        }
    };

    var ctx = document.getElementById('canvas').getContext('2d');
    ctx.height = 90;
    window.myLine = new Chart(ctx, config);
}