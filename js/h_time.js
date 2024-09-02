$(document).ready(function(){
    var innerPrimary = document.querySelector('.primary'),
        monthSelector = innerPrimary.querySelector('.monthdata');
        monthSelector.addEventListener('change', function() {
            switch (this.value){
                case "1":
                    Plotly.d3.csv('data/202101.csv', function(err, rows){
                        function unpack(rows, key) {
                            return rows.map(function(row) { return row[key]; });
                        }
                    // put all elements into list
                    var allDay = unpack(rows,'day'),
                    allMonth = unpack(rows, 'month'),
                    allHour = unpack(rows,'hour'),
                    allOD = unpack(rows, 'OD'),
                    allTotal = unpack(rows, 'total'),
                    allWay = unpack(rows,'way'),
                    allSize = unpack(rows,'size'),
                    allSpeed = unpack(rows,'speed'),
                    allLane = unpack(rows,'lane'),
                    allLat = unpack(rows,'lat'),
                    allLon = unpack(rows, 'lon'),

                    listofMonths = [],
                    currentMonth,

                    listofDays = [],
                    currentDay,

                    listofHours = [],
                    currentHour,

                    listofWays = [],
                    currentWay,

                    listofSizes = [],
                    currentSize,

                    listofLanes = [],
                    currentLane,

                    currentSpeed = [],
                    currentTotal = [],
                    currentOD = [],
                    currentLat = [],
                    currentLon = [];

                    // pick unique value as selection
                    for (var i = 0; i < allMonth.length; i++ ){
                        if (listofMonths.indexOf(allMonth[i]) === -1 ){
                            listofMonths.push(allMonth[i]);
                        }
                    }

                    for (var i = 0; i < allWay.length; i++ ){
                        if (listofWays.indexOf(allWay[i]) === -1 ){
                            listofWays.push(allWay[i]);
                        }
                    }

                    for (var i = 0; i < allSize.length; i++ ){
                        if (listofSizes.indexOf(allSize[i]) === -1 ){
                            listofSizes.push(allSize[i]);
                        }
                    }

                    for (var i = 0; i < allDay.length; i++ ){
                        if (listofDays.indexOf(allDay[i]) === -1 ){
                            listofDays.push(allDay[i]);
                        }
                    }

                    for (var i = 0; i < allHour.length; i++ ){
                        if (listofHours.indexOf(allHour[i]) === -1 ){
                            listofHours.push(allHour[i]);
                        }
                    }

                    for (var i = 0; i < allLane.length; i++ ){
                        if (listofLanes.indexOf(allLane[i]) === -1 ){
                            listofLanes.push(allLane[i]);
                        }
                    }

                    //selected input
                    function getData(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {

                        currentTotal = [];
                        currentOD = [];
                        currentSpeed = [];
                        currentLat= [];
                        currentLon= [];

                        for (var i = 0 ; i < allDay.length ; i++){
                            if (allDay[i] === chosenDay & allHour[i] === chosenHour  & allLane[i] === chosenLane & allWay[i] === chosenWay & allSize[i] === chosenSize) {
                                currentTotal.push(allTotal[i]);
                                currentOD.push(allOD[i]);
                                currentSpeed.push(allSpeed[i]);
                                currentLat.push(allLat[i]);
                                currentLon.push(allLon[i]);
                            }
                        } 
                    }

                    // Default
                    totalPlot('1','0','國道一號','N','大型車');
                    speedPlot('1','0','國道一號','N','大型車');
                    Speedmap('1','0','國道一號','N','大型車');
                    Totalmap('1','0','國道一號','N','大型車');

                    //Draw
                    function totalPlot(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize); 
                        var trace1 = {
                            x: currentOD,
                            y: currentTotal,
                            mode: 'lines+markers',
                            marker: {
                                size: 6, 
                                opacity: 0.5,
                                color: 'white',
                            },
                            line: {
                                color: 'white',
                            }
                        };

                        var data = [trace1];

                        var layout = {
                            height: '780',
                            title: '國道行車流量折線圖',
                            plot_bgcolor:"black",
                            paper_bgcolor:"#3c3c3c",
                            font: {
                                color: 'white',
                            },
                            xaxis:{
                                automargin: true,
                            },
                            
                        };

                        Plotly.newPlot('total', data, layout, {showSendToCloud: true});
                    };

                    function speedPlot(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {
                        getData( chosenDay,chosenHour, chosenLane,chosenWay, chosenSize); 
                        var trace1 = {
                            x: currentOD,
                            y: currentSpeed,
                            mode: 'lines+markers',
                            marker: {
                                size: 6, 
                                opacity: 0.5,
                                color: 'white',
                            },
                            line: {
                                color: 'white',
                            }
                        };

                        var data = [trace1];

                        var layout = {
                            height: '780',
                            title: '國道行車速度折線圖',
                            plot_bgcolor:"black",
                            paper_bgcolor:"#3c3c3c",
                            font: {
                                color: 'white',
                            },
                            xaxis:{
                                automargin: true,
                            },
                            
                        };

                        Plotly.newPlot('speed', data, layout, {showSendToCloud: true});
                    };

                    function Speedmap(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize); 
                        
                        scl = [[0,'rgb(44, 255, 150)'],[0.1,'rgb(151, 255, 0)'],[0.2,'rgb(255, 234, 0)'],[0.5,'rgb(255, 111, 0)'],[1,'rgb(255, 0, 0)']];

                        function detail(currentOD, currentSpeed) {
                            var combinations = [];
                            for (let i = 0; i < currentOD.length; i++) {
                                combinations.push(currentOD[i] + '  '+'速度：' + currentSpeed[i]+'km/hr');
                            }
                            return combinations;
                            }

                        var origin = {
                            type: 'scattermapbox',
                            mode: 'markers',
                            lon: currentLon,
                            lat: currentLat,
                            text: currentSpeed, 
                            hoverinfo: 'text',
                            hovertext: detail(currentOD, currentSpeed),
                            marker: {
                                color: currentSpeed,
                                colorscale: scl,
                                cmin: 0,
                                cmax: 110,
                                reversescale: true,
                                opacity: 0.4,
                                size: 12,
                                colorbar:{
                                    x: 1,
                                    thickness: 10,
                                    outlinecolor: 'rgba(0,0,0,0)',
                                    ticks: 'outside',
                                    ticklen: 3,
                                    showticksuffix: 'last',
                                    ticksuffix: 'km/hr',
                                    dtick: 10,
                                    tickcolor: '#ffffff',
                                    bgcolor: 'rgba(0,0,0,0.8)',
                                    tickfont: {
                                        color: 'white',
                                    }
                                },
                            }
                        };

                        var data = [origin];

                        var layout = {
                            height: '780',
                            dragmode: "zoom",
                            mapbox: { style: "dark", center: { lat: 23.53, lon: 121 }, zoom: 6.5 },
                            margin: { r: 0, t: 0, b: 0, l: 0 },
                            title: {
                                text: '車速',
                                y: 0.95,
                                x: 0.05,
                                font: {
                                    color: 'white',
                                },
                            },
                        };
                        var config = {
                            mapboxAccessToken: "pk.eyJ1IjoicG8teWVuIiwiYSI6ImNreWF5ejFzNTAzNWYydXF4c3plYmM3ejgifQ.d-6gAZGZZCIR0sX83BypjQ"
                        };

                        Plotly.newPlot('speedmap', data, layout,config,{showSendToCloud: true});
                    }

                    function Totalmap(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize); 
                        
                        scl = [[0,'rgb(44, 255, 150)'],[0.1,'rgb(151, 255, 0)'],[0.2,'rgb(255, 234, 0)'],[0.5,'rgb(255, 111, 0)'],[1,'rgb(255, 0, 0)']];

                        function detail(currentOD, currentTotal) {
                            var combinations = [];
                            for (let i = 0; i < currentOD.length; i++) {
                                combinations.push(currentOD[i] + '  '+'車流量：' + currentTotal[i]+'台');
                            }
                            return combinations;
                            }

                        var origin = {
                            type: 'scattermapbox',
                            mode: 'markers',
                            name: 'hello',
                            lon: currentLon,
                            lat: currentLat,
                            text: currentTotal, 
                            hoverinfo: 'text',
                            hovertext: detail(currentOD, currentTotal),
                            marker: {
                                color: currentTotal,
                                colorscale: scl,
                                cmin: 0,
                                cmax: 5000,
                                reversescale: false,
                                opacity: 0.4,
                                size: 12,
                                colorbar:{
                                    x: 1,
                                    thickness: 10,
                                    outlinecolor: 'rgba(0,0,0,0)',
                                    ticks: 'outside',
                                    ticklen: 3,
                                    showticksuffix: 'last',
                                    ticksuffix: 'cars',
                                    dtick: 500,
                                    tickcolor: '#ffffff',
                                    bgcolor: 'rgba(0,0,0,0.8)',
                                    tickfont: {
                                        color: 'white',
                                    }
                                }
                            }
                        };

                        var data = [origin];

                        var layout = {
                            height: '720',
                            dragmode: "zoom",
                            mapbox: { style: "dark", center: { lat: 23.53, lon: 121 }, zoom: 6.5 },
                            margin: { r: 0, t: 0, b: 0, l: 0 },
                            title: {
                                text: '車流量',
                                y: 0.95,
                                x: 0.05,
                                font: {
                                    color: 'white',
                                },
                            },
                            
                        };
                        var config = {
                            mapboxAccessToken: "pk.eyJ1IjoicG8teWVuIiwiYSI6ImNreWF5ejFzNTAzNWYydXF4c3plYmM3ejgifQ.d-6gAZGZZCIR0sX83BypjQ"
                        };
                        
                        Plotly.newPlot('totalmap', data, layout,config,{showSendToCloud: true});
                    }

                    //selected input list
                    var innerContainer = document.querySelector('.container'),
                    // monthSelector = innerContainer.querySelector('.monthdata'),
                    daySelector = innerContainer.querySelector('.daydata'),
                    hourSelector = innerContainer.querySelector('.hourdata'),
                    laneSelector = innerContainer.querySelector('.lanedata'),
                    waySelector = innerContainer.querySelector('.waydata'),
                    sizeSelector = innerContainer.querySelector('.sizedata');
                    pressSelector = innerContainer.querySelector('.press');

                    // function assignOptions(textArray, selector) {
                    //     for (var i = 0; i < textArray.length;  i++) {
                    //         var currentOption = document.createElement('option');
                    //         currentOption.text = textArray[i];
                    //         selector.appendChild(currentOption);
                    //     }
                    // }

                    // // assignOptions(listofMonths, monthSelector);
                    // assignOptions(listofDays, daySelector);
                    // assignOptions(listofHours, hourSelector);
                    // assignOptions(listofLanes, laneSelector);
                    // assignOptions(listofWays, waySelector);
                    // assignOptions(listofSizes, sizeSelector);

                    function updateTime(){
                        totalPlot(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        speedPlot(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        Totalmap(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        Speedmap(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                    }

                    pressSelector.addEventListener('click',updateTime,false);
                });

                    
                    break;
                case "2":
                    Plotly.d3.csv('data/202102.csv', function(err, rows){
                        function unpack(rows, key) {
                            return rows.map(function(row) { return row[key]; });
                        }
                    // put all elements into list
                    var allDay = unpack(rows,'day'),
                    allMonth = unpack(rows, 'month'),
                    allHour = unpack(rows,'hour'),
                    allOD = unpack(rows, 'OD'),
                    allTotal = unpack(rows, 'total'),
                    allWay = unpack(rows,'way'),
                    allSize = unpack(rows,'size'),
                    allSpeed = unpack(rows,'speed'),
                    allLane = unpack(rows,'lane'),
                    allLat = unpack(rows,'lat'),
                    allLon = unpack(rows, 'lon'),

                    listofMonths = [],
                    currentMonth,

                    listofDays = [],
                    currentDay,

                    listofHours = [],
                    currentHour,

                    listofWays = [],
                    currentWay,

                    listofSizes = [],
                    currentSize,

                    listofLanes = [],
                    currentLane,

                    currentSpeed = [],
                    currentTotal = [],
                    currentOD = [],
                    currentLat = [],
                    currentLon = [];

                    // pick unique value as selection
                    for (var i = 0; i < allMonth.length; i++ ){
                        if (listofMonths.indexOf(allMonth[i]) === -1 ){
                            listofMonths.push(allMonth[i]);
                        }
                    }

                    for (var i = 0; i < allWay.length; i++ ){
                        if (listofWays.indexOf(allWay[i]) === -1 ){
                            listofWays.push(allWay[i]);
                        }
                    }

                    for (var i = 0; i < allSize.length; i++ ){
                        if (listofSizes.indexOf(allSize[i]) === -1 ){
                            listofSizes.push(allSize[i]);
                        }
                    }

                    for (var i = 0; i < allDay.length; i++ ){
                        if (listofDays.indexOf(allDay[i]) === -1 ){
                            listofDays.push(allDay[i]);
                        }
                    }

                    for (var i = 0; i < allHour.length; i++ ){
                        if (listofHours.indexOf(allHour[i]) === -1 ){
                            listofHours.push(allHour[i]);
                        }
                    }

                    for (var i = 0; i < allLane.length; i++ ){
                        if (listofLanes.indexOf(allLane[i]) === -1 ){
                            listofLanes.push(allLane[i]);
                        }
                    }

                    //selected input
                    function getData(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {

                        currentTotal = [];
                        currentOD = [];
                        currentSpeed = [];
                        currentLat= [];
                        currentLon= [];

                        for (var i = 0 ; i < allDay.length ; i++){
                            if (allDay[i] === chosenDay & allHour[i] === chosenHour  & allLane[i] === chosenLane & allWay[i] === chosenWay & allSize[i] === chosenSize) {
                                currentTotal.push(allTotal[i]);
                                currentOD.push(allOD[i]);
                                currentSpeed.push(allSpeed[i]);
                                currentLat.push(allLat[i]);
                                currentLon.push(allLon[i]);
                            }
                        } 
                    }

                    // Default
                    totalPlot('1','0','國道一號','N','大型車');
                    speedPlot('1','0','國道一號','N','大型車');
                    Speedmap('1','0','國道一號','N','大型車');
                    Totalmap('1','0','國道一號','N','大型車');

                    //Draw
                    function totalPlot(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize); 
                        var trace1 = {
                            x: currentOD,
                            y: currentTotal,
                            mode: 'lines+markers',
                            marker: {
                                size: 6, 
                                opacity: 0.5,
                                color: 'white',
                            },
                            line: {
                                color: 'white',
                            }
                        };

                        var data = [trace1];

                        var layout = {
                            height: '780',
                            title: '國道行車流量折線圖',
                            plot_bgcolor:"black",
                            paper_bgcolor:"#3c3c3c",
                            font: {
                                color: 'white',
                            },
                            xaxis:{
                                automargin: true,
                            },
                            
                        };

                        Plotly.newPlot('total', data, layout, {showSendToCloud: true});
                    };

                    function speedPlot(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {
                        getData( chosenDay,chosenHour, chosenLane,chosenWay, chosenSize); 
                        var trace1 = {
                            x: currentOD,
                            y: currentSpeed,
                            mode: 'lines+markers',
                            marker: {
                                size: 6, 
                                opacity: 0.5,
                                color: 'white',
                            },
                            line: {
                                color: 'white',
                            }
                        };

                        var data = [trace1];

                        var layout = {
                            height: '780',
                            title: '國道行車速度折線圖',
                            plot_bgcolor:"black",
                            paper_bgcolor:"#3c3c3c",
                            font: {
                                color: 'white',
                            },
                            xaxis:{
                                automargin: true,
                            },
                            
                        };

                        Plotly.newPlot('speed', data, layout, {showSendToCloud: true});
                    };

                    function Speedmap(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize); 
                        
                        scl = [[0,'rgb(44, 255, 150)'],[0.1,'rgb(151, 255, 0)'],[0.2,'rgb(255, 234, 0)'],[0.5,'rgb(255, 111, 0)'],[1,'rgb(255, 0, 0)']];

                        function detail(currentOD, currentSpeed) {
                            var combinations = [];
                            for (let i = 0; i < currentOD.length; i++) {
                                combinations.push(currentOD[i] + '  '+'速度：' + currentSpeed[i]+'km/hr');
                            }
                            return combinations;
                            }

                        var origin = {
                            type: 'scattermapbox',
                            mode: 'markers',
                            lon: currentLon,
                            lat: currentLat,
                            text: currentSpeed, 
                            hoverinfo: 'text',
                            hovertext: detail(currentOD, currentSpeed),
                            marker: {
                                color: currentSpeed,
                                colorscale: scl,
                                cmin: 0,
                                cmax: 110,
                                reversescale: true,
                                opacity: 0.4,
                                size: 12,
                                colorbar:{
                                    x: 1,
                                    thickness: 10,
                                    outlinecolor: 'rgba(0,0,0,0)',
                                    ticks: 'outside',
                                    ticklen: 3,
                                    showticksuffix: 'last',
                                    ticksuffix: 'km/hr',
                                    dtick: 10,
                                    tickcolor: '#ffffff',
                                    bgcolor: 'rgba(0,0,0,0.8)',
                                    tickfont: {
                                        color: 'white',
                                    }
                                },
                            }
                        };

                        var data = [origin];

                        var layout = {
                            height: '780',
                            dragmode: "zoom",
                            mapbox: { style: "dark", center: { lat: 23.53, lon: 121 }, zoom: 6.5 },
                            margin: { r: 0, t: 0, b: 0, l: 0 },
                            title: {
                                text: '車速',
                                y: 0.95,
                                x: 0.05,
                                font: {
                                    color: 'white',
                                },
                            },
                        };
                        var config = {
                            mapboxAccessToken: "pk.eyJ1IjoicG8teWVuIiwiYSI6ImNreWF5ejFzNTAzNWYydXF4c3plYmM3ejgifQ.d-6gAZGZZCIR0sX83BypjQ"
                        };

                        Plotly.newPlot('speedmap', data, layout,config,{showSendToCloud: true});
                    }

                    function Totalmap(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize); 
                        
                        scl = [[0,'rgb(44, 255, 150)'],[0.1,'rgb(151, 255, 0)'],[0.2,'rgb(255, 234, 0)'],[0.5,'rgb(255, 111, 0)'],[1,'rgb(255, 0, 0)']];

                        function detail(currentOD, currentTotal) {
                            var combinations = [];
                            for (let i = 0; i < currentOD.length; i++) {
                                combinations.push(currentOD[i] + '  '+'車流量：' + currentTotal[i]+'台');
                            }
                            return combinations;
                            }

                        var origin = {
                            type: 'scattermapbox',
                            mode: 'markers',
                            name: 'hello',
                            lon: currentLon,
                            lat: currentLat,
                            text: currentTotal, 
                            hoverinfo: 'text',
                            hovertext: detail(currentOD, currentTotal),
                            marker: {
                                color: currentTotal,
                                colorscale: scl,
                                cmin: 0,
                                cmax: 5000,
                                reversescale: false,
                                opacity: 0.4,
                                size: 12,
                                colorbar:{
                                    x: 1,
                                    thickness: 10,
                                    outlinecolor: 'rgba(0,0,0,0)',
                                    ticks: 'outside',
                                    ticklen: 3,
                                    showticksuffix: 'last',
                                    ticksuffix: 'cars',
                                    dtick: 500,
                                    tickcolor: '#ffffff',
                                    bgcolor: 'rgba(0,0,0,0.8)',
                                    tickfont: {
                                        color: 'white',
                                    }
                                }
                            }
                        };

                        var data = [origin];

                        var layout = {
                            height: '720',
                            dragmode: "zoom",
                            mapbox: { style: "dark", center: { lat: 23.53, lon: 121 }, zoom: 6.5 },
                            margin: { r: 0, t: 0, b: 0, l: 0 },
                            title: {
                                text: '車流量',
                                y: 0.95,
                                x: 0.05,
                                font: {
                                    color: 'white',
                                },
                            },
                            
                        };
                        var config = {
                            mapboxAccessToken: "pk.eyJ1IjoicG8teWVuIiwiYSI6ImNreWF5ejFzNTAzNWYydXF4c3plYmM3ejgifQ.d-6gAZGZZCIR0sX83BypjQ"
                        };
                        
                        Plotly.newPlot('totalmap', data, layout,config,{showSendToCloud: true});
                    }

                    //selected input list
                    var innerContainer = document.querySelector('.container'),
                    // monthSelector = innerContainer.querySelector('.monthdata'),
                    daySelector = innerContainer.querySelector('.daydata'),
                    hourSelector = innerContainer.querySelector('.hourdata'),
                    laneSelector = innerContainer.querySelector('.lanedata'),
                    waySelector = innerContainer.querySelector('.waydata'),
                    sizeSelector = innerContainer.querySelector('.sizedata');
                    pressSelector = innerContainer.querySelector('.press');

                    // function assignOptions(textArray, selector) {
                    //     for (var i = 0; i < textArray.length;  i++) {
                    //         var currentOption = document.createElement('option');
                    //         currentOption.text = textArray[i];
                    //         selector.appendChild(currentOption);
                    //     }
                    // }

                    // // assignOptions(listofMonths, monthSelector);
                    // assignOptions(listofDays, daySelector);
                    // assignOptions(listofHours, hourSelector);
                    // assignOptions(listofLanes, laneSelector);
                    // assignOptions(listofWays, waySelector);
                    // assignOptions(listofSizes, sizeSelector);

                    function updateTime(){
                        totalPlot(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        speedPlot(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        Totalmap(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        Speedmap(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                    }

                    pressSelector.addEventListener('click',updateTime,false);
                });

                    
                    break;

                case "3":
                    Plotly.d3.csv('data/202103.csv', function(err, rows){
                        function unpack(rows, key) {
                            return rows.map(function(row) { return row[key]; });
                        }
                    // put all elements into list
                    var allDay = unpack(rows,'day'),
                    allMonth = unpack(rows, 'month'),
                    allHour = unpack(rows,'hour'),
                    allOD = unpack(rows, 'OD'),
                    allTotal = unpack(rows, 'total'),
                    allWay = unpack(rows,'way'),
                    allSize = unpack(rows,'size'),
                    allSpeed = unpack(rows,'speed'),
                    allLane = unpack(rows,'lane'),
                    allLat = unpack(rows,'lat'),
                    allLon = unpack(rows, 'lon'),

                    listofMonths = [],
                    currentMonth,

                    listofDays = [],
                    currentDay,

                    listofHours = [],
                    currentHour,

                    listofWays = [],
                    currentWay,

                    listofSizes = [],
                    currentSize,

                    listofLanes = [],
                    currentLane,

                    currentSpeed = [],
                    currentTotal = [],
                    currentOD = [],
                    currentLat = [],
                    currentLon = [];

                    // pick unique value as selection
                    for (var i = 0; i < allMonth.length; i++ ){
                        if (listofMonths.indexOf(allMonth[i]) === -1 ){
                            listofMonths.push(allMonth[i]);
                        }
                    }

                    for (var i = 0; i < allWay.length; i++ ){
                        if (listofWays.indexOf(allWay[i]) === -1 ){
                            listofWays.push(allWay[i]);
                        }
                    }

                    for (var i = 0; i < allSize.length; i++ ){
                        if (listofSizes.indexOf(allSize[i]) === -1 ){
                            listofSizes.push(allSize[i]);
                        }
                    }

                    for (var i = 0; i < allDay.length; i++ ){
                        if (listofDays.indexOf(allDay[i]) === -1 ){
                            listofDays.push(allDay[i]);
                        }
                    }

                    for (var i = 0; i < allHour.length; i++ ){
                        if (listofHours.indexOf(allHour[i]) === -1 ){
                            listofHours.push(allHour[i]);
                        }
                    }

                    for (var i = 0; i < allLane.length; i++ ){
                        if (listofLanes.indexOf(allLane[i]) === -1 ){
                            listofLanes.push(allLane[i]);
                        }
                    }

                    //selected input
                    function getData(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {

                        currentTotal = [];
                        currentOD = [];
                        currentSpeed = [];
                        currentLat= [];
                        currentLon= [];

                        for (var i = 0 ; i < allDay.length ; i++){
                            if (allDay[i] === chosenDay & allHour[i] === chosenHour  & allLane[i] === chosenLane & allWay[i] === chosenWay & allSize[i] === chosenSize) {
                                currentTotal.push(allTotal[i]);
                                currentOD.push(allOD[i]);
                                currentSpeed.push(allSpeed[i]);
                                currentLat.push(allLat[i]);
                                currentLon.push(allLon[i]);
                            }
                        } 
                    }

                    // Default
                    totalPlot('1','0','國道一號','N','大型車');
                    speedPlot('1','0','國道一號','N','大型車');
                    Speedmap('1','0','國道一號','N','大型車');
                    Totalmap('1','0','國道一號','N','大型車');

                    //Draw
                    function totalPlot(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize); 
                        var trace1 = {
                            x: currentOD,
                            y: currentTotal,
                            mode: 'lines+markers',
                            marker: {
                                size: 6, 
                                opacity: 0.5,
                                color: 'white',
                            },
                            line: {
                                color: 'white',
                            }
                        };

                        var data = [trace1];

                        var layout = {
                            height: '780',
                            title: '國道行車流量折線圖',
                            plot_bgcolor:"black",
                            paper_bgcolor:"#3c3c3c",
                            font: {
                                color: 'white',
                            },
                            xaxis:{
                                automargin: true,
                            },
                            
                        };

                        Plotly.newPlot('total', data, layout, {showSendToCloud: true});
                    };

                    function speedPlot(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {
                        getData( chosenDay,chosenHour, chosenLane,chosenWay, chosenSize); 
                        var trace1 = {
                            x: currentOD,
                            y: currentSpeed,
                            mode: 'lines+markers',
                            marker: {
                                size: 6, 
                                opacity: 0.5,
                                color: 'white',
                            },
                            line: {
                                color: 'white',
                            }
                        };

                        var data = [trace1];

                        var layout = {
                            height: '780',
                            title: '國道行車速度折線圖',
                            plot_bgcolor:"black",
                            paper_bgcolor:"#3c3c3c",
                            font: {
                                color: 'white',
                            },
                            xaxis:{
                                automargin: true,
                            },
                            
                        };

                        Plotly.newPlot('speed', data, layout, {showSendToCloud: true});
                    };

                    function Speedmap(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize); 
                        
                        scl = [[0,'rgb(44, 255, 150)'],[0.1,'rgb(151, 255, 0)'],[0.2,'rgb(255, 234, 0)'],[0.5,'rgb(255, 111, 0)'],[1,'rgb(255, 0, 0)']];

                        function detail(currentOD, currentSpeed) {
                            var combinations = [];
                            for (let i = 0; i < currentOD.length; i++) {
                                combinations.push(currentOD[i] + '  '+'速度：' + currentSpeed[i]+'km/hr');
                            }
                            return combinations;
                            }

                        var origin = {
                            type: 'scattermapbox',
                            mode: 'markers',
                            lon: currentLon,
                            lat: currentLat,
                            text: currentSpeed, 
                            hoverinfo: 'text',
                            hovertext: detail(currentOD, currentSpeed),
                            marker: {
                                color: currentSpeed,
                                colorscale: scl,
                                cmin: 0,
                                cmax: 110,
                                reversescale: true,
                                opacity: 0.4,
                                size: 12,
                                colorbar:{
                                    x: 1,
                                    thickness: 10,
                                    outlinecolor: 'rgba(0,0,0,0)',
                                    ticks: 'outside',
                                    ticklen: 3,
                                    showticksuffix: 'last',
                                    ticksuffix: 'km/hr',
                                    dtick: 10,
                                    tickcolor: '#ffffff',
                                    bgcolor: 'rgba(0,0,0,0.8)',
                                    tickfont: {
                                        color: 'white',
                                    }
                                },
                            }
                        };

                        var data = [origin];

                        var layout = {
                            height: '780',
                            dragmode: "zoom",
                            mapbox: { style: "dark", center: { lat: 23.53, lon: 121 }, zoom: 6.5 },
                            margin: { r: 0, t: 0, b: 0, l: 0 },
                            title: {
                                text: '車速',
                                y: 0.95,
                                x: 0.05,
                                font: {
                                    color: 'white',
                                },
                            },
                        };
                        var config = {
                            mapboxAccessToken: "pk.eyJ1IjoicG8teWVuIiwiYSI6ImNreWF5ejFzNTAzNWYydXF4c3plYmM3ejgifQ.d-6gAZGZZCIR0sX83BypjQ"
                        };

                        Plotly.newPlot('speedmap', data, layout,config,{showSendToCloud: true});
                    }

                    function Totalmap(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize); 
                        
                        scl = [[0,'rgb(44, 255, 150)'],[0.1,'rgb(151, 255, 0)'],[0.2,'rgb(255, 234, 0)'],[0.5,'rgb(255, 111, 0)'],[1,'rgb(255, 0, 0)']];

                        function detail(currentOD, currentTotal) {
                            var combinations = [];
                            for (let i = 0; i < currentOD.length; i++) {
                                combinations.push(currentOD[i] + '  '+'車流量：' + currentTotal[i]+'台');
                            }
                            return combinations;
                            }

                        var origin = {
                            type: 'scattermapbox',
                            mode: 'markers',
                            name: 'hello',
                            lon: currentLon,
                            lat: currentLat,
                            text: currentTotal, 
                            hoverinfo: 'text',
                            hovertext: detail(currentOD, currentTotal),
                            marker: {
                                color: currentTotal,
                                colorscale: scl,
                                cmin: 0,
                                cmax: 5000,
                                reversescale: false,
                                opacity: 0.4,
                                size: 12,
                                colorbar:{
                                    x: 1,
                                    thickness: 10,
                                    outlinecolor: 'rgba(0,0,0,0)',
                                    ticks: 'outside',
                                    ticklen: 3,
                                    showticksuffix: 'last',
                                    ticksuffix: 'cars',
                                    dtick: 500,
                                    tickcolor: '#ffffff',
                                    bgcolor: 'rgba(0,0,0,0.8)',
                                    tickfont: {
                                        color: 'white',
                                    }
                                }
                            }
                        };

                        var data = [origin];

                        var layout = {
                            height: '720',
                            dragmode: "zoom",
                            mapbox: { style: "dark", center: { lat: 23.53, lon: 121 }, zoom: 6.5 },
                            margin: { r: 0, t: 0, b: 0, l: 0 },
                            title: {
                                text: '車流量',
                                y: 0.95,
                                x: 0.05,
                                font: {
                                    color: 'white',
                                },
                            },
                            
                        };
                        var config = {
                            mapboxAccessToken: "pk.eyJ1IjoicG8teWVuIiwiYSI6ImNreWF5ejFzNTAzNWYydXF4c3plYmM3ejgifQ.d-6gAZGZZCIR0sX83BypjQ"
                        };
                        
                        Plotly.newPlot('totalmap', data, layout,config,{showSendToCloud: true});
                    }

                    //selected input list
                    var innerContainer = document.querySelector('.container'),
                    // monthSelector = innerContainer.querySelector('.monthdata'),
                    daySelector = innerContainer.querySelector('.daydata'),
                    hourSelector = innerContainer.querySelector('.hourdata'),
                    laneSelector = innerContainer.querySelector('.lanedata'),
                    waySelector = innerContainer.querySelector('.waydata'),
                    sizeSelector = innerContainer.querySelector('.sizedata');
                    pressSelector = innerContainer.querySelector('.press');

                    // function assignOptions(textArray, selector) {
                    //     for (var i = 0; i < textArray.length;  i++) {
                    //         var currentOption = document.createElement('option');
                    //         currentOption.text = textArray[i];
                    //         selector.appendChild(currentOption);
                    //     }
                    // }

                    // // assignOptions(listofMonths, monthSelector);
                    // assignOptions(listofDays, daySelector);
                    // assignOptions(listofHours, hourSelector);
                    // assignOptions(listofLanes, laneSelector);
                    // assignOptions(listofWays, waySelector);
                    // assignOptions(listofSizes, sizeSelector);

                    function updateTime(){
                        totalPlot(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        speedPlot(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        Totalmap(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        Speedmap(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                    }

                    pressSelector.addEventListener('click',updateTime,false);
                });
                    break;
                case "4":
                    Plotly.d3.csv('data/202104.csv', function(err, rows){
                        function unpack(rows, key) {
                            return rows.map(function(row) { return row[key]; });
                        }
                    // put all elements into list
                    var allDay = unpack(rows,'day'),
                    allMonth = unpack(rows, 'month'),
                    allHour = unpack(rows,'hour'),
                    allOD = unpack(rows, 'OD'),
                    allTotal = unpack(rows, 'total'),
                    allWay = unpack(rows,'way'),
                    allSize = unpack(rows,'size'),
                    allSpeed = unpack(rows,'speed'),
                    allLane = unpack(rows,'lane'),
                    allLat = unpack(rows,'lat'),
                    allLon = unpack(rows, 'lon'),

                    listofMonths = [],
                    currentMonth,

                    listofDays = [],
                    currentDay,

                    listofHours = [],
                    currentHour,

                    listofWays = [],
                    currentWay,

                    listofSizes = [],
                    currentSize,

                    listofLanes = [],
                    currentLane,

                    currentSpeed = [],
                    currentTotal = [],
                    currentOD = [],
                    currentLat = [],
                    currentLon = [];

                    // pick unique value as selection
                    for (var i = 0; i < allMonth.length; i++ ){
                        if (listofMonths.indexOf(allMonth[i]) === -1 ){
                            listofMonths.push(allMonth[i]);
                        }
                    }

                    for (var i = 0; i < allWay.length; i++ ){
                        if (listofWays.indexOf(allWay[i]) === -1 ){
                            listofWays.push(allWay[i]);
                        }
                    }

                    for (var i = 0; i < allSize.length; i++ ){
                        if (listofSizes.indexOf(allSize[i]) === -1 ){
                            listofSizes.push(allSize[i]);
                        }
                    }

                    for (var i = 0; i < allDay.length; i++ ){
                        if (listofDays.indexOf(allDay[i]) === -1 ){
                            listofDays.push(allDay[i]);
                        }
                    }

                    for (var i = 0; i < allHour.length; i++ ){
                        if (listofHours.indexOf(allHour[i]) === -1 ){
                            listofHours.push(allHour[i]);
                        }
                    }

                    for (var i = 0; i < allLane.length; i++ ){
                        if (listofLanes.indexOf(allLane[i]) === -1 ){
                            listofLanes.push(allLane[i]);
                        }
                    }

                    //selected input
                    function getData(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {

                        currentTotal = [];
                        currentOD = [];
                        currentSpeed = [];
                        currentLat= [];
                        currentLon= [];

                        for (var i = 0 ; i < allDay.length ; i++){
                            if (allDay[i] === chosenDay & allHour[i] === chosenHour  & allLane[i] === chosenLane & allWay[i] === chosenWay & allSize[i] === chosenSize) {
                                currentTotal.push(allTotal[i]);
                                currentOD.push(allOD[i]);
                                currentSpeed.push(allSpeed[i]);
                                currentLat.push(allLat[i]);
                                currentLon.push(allLon[i]);
                            }
                        } 
                    }

                    // Default
                    totalPlot('1','0','國道一號','N','大型車');
                    speedPlot('1','0','國道一號','N','大型車');
                    Speedmap('1','0','國道一號','N','大型車');
                    Totalmap('1','0','國道一號','N','大型車');

                    //Draw
                    function totalPlot(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize); 
                        var trace1 = {
                            x: currentOD,
                            y: currentTotal,
                            mode: 'lines+markers',
                            marker: {
                                size: 6, 
                                opacity: 0.5,
                                color: 'white',
                            },
                            line: {
                                color: 'white',
                            }
                        };

                        var data = [trace1];

                        var layout = {
                            height: '780',
                            title: '國道行車流量折線圖',
                            plot_bgcolor:"black",
                            paper_bgcolor:"#3c3c3c",
                            font: {
                                color: 'white',
                            },
                            xaxis:{
                                automargin: true,
                            },
                            
                        };

                        Plotly.newPlot('total', data, layout, {showSendToCloud: true});
                    };

                    function speedPlot(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {
                        getData( chosenDay,chosenHour, chosenLane,chosenWay, chosenSize); 
                        var trace1 = {
                            x: currentOD,
                            y: currentSpeed,
                            mode: 'lines+markers',
                            marker: {
                                size: 6, 
                                opacity: 0.5,
                                color: 'white',
                            },
                            line: {
                                color: 'white',
                            }
                        };

                        var data = [trace1];

                        var layout = {
                            height: '780',
                            title: '國道行車速度折線圖',
                            plot_bgcolor:"black",
                            paper_bgcolor:"#3c3c3c",
                            font: {
                                color: 'white',
                            },
                            xaxis:{
                                automargin: true,
                            },
                            
                        };

                        Plotly.newPlot('speed', data, layout, {showSendToCloud: true});
                    };

                    function Speedmap(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize); 
                        
                        scl = [[0,'rgb(44, 255, 150)'],[0.1,'rgb(151, 255, 0)'],[0.2,'rgb(255, 234, 0)'],[0.5,'rgb(255, 111, 0)'],[1,'rgb(255, 0, 0)']];

                        function detail(currentOD, currentSpeed) {
                            var combinations = [];
                            for (let i = 0; i < currentOD.length; i++) {
                                combinations.push(currentOD[i] + '  '+'速度：' + currentSpeed[i]+'km/hr');
                            }
                            return combinations;
                            }

                        var origin = {
                            type: 'scattermapbox',
                            mode: 'markers',
                            lon: currentLon,
                            lat: currentLat,
                            text: currentSpeed, 
                            hoverinfo: 'text',
                            hovertext: detail(currentOD, currentSpeed),
                            marker: {
                                color: currentSpeed,
                                colorscale: scl,
                                cmin: 0,
                                cmax: 110,
                                reversescale: true,
                                opacity: 0.4,
                                size: 12,
                                colorbar:{
                                    x: 1,
                                    thickness: 10,
                                    outlinecolor: 'rgba(0,0,0,0)',
                                    ticks: 'outside',
                                    ticklen: 3,
                                    showticksuffix: 'last',
                                    ticksuffix: 'km/hr',
                                    dtick: 10,
                                    tickcolor: '#ffffff',
                                    bgcolor: 'rgba(0,0,0,0.8)',
                                    tickfont: {
                                        color: 'white',
                                    }
                                },
                            }
                        };

                        var data = [origin];

                        var layout = {
                            height: '780',
                            dragmode: "zoom",
                            mapbox: { style: "dark", center: { lat: 23.53, lon: 121 }, zoom: 6.5 },
                            margin: { r: 0, t: 0, b: 0, l: 0 },
                            title: {
                                text: '車速',
                                y: 0.95,
                                x: 0.05,
                                font: {
                                    color: 'white',
                                },
                            },
                        };
                        var config = {
                            mapboxAccessToken: "pk.eyJ1IjoicG8teWVuIiwiYSI6ImNreWF5ejFzNTAzNWYydXF4c3plYmM3ejgifQ.d-6gAZGZZCIR0sX83BypjQ"
                        };

                        Plotly.newPlot('speedmap', data, layout,config,{showSendToCloud: true});
                    }

                    function Totalmap(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize); 
                        
                        scl = [[0,'rgb(44, 255, 150)'],[0.1,'rgb(151, 255, 0)'],[0.2,'rgb(255, 234, 0)'],[0.5,'rgb(255, 111, 0)'],[1,'rgb(255, 0, 0)']];

                        function detail(currentOD, currentTotal) {
                            var combinations = [];
                            for (let i = 0; i < currentOD.length; i++) {
                                combinations.push(currentOD[i] + '  '+'車流量：' + currentTotal[i]+'台');
                            }
                            return combinations;
                            }

                        var origin = {
                            type: 'scattermapbox',
                            mode: 'markers',
                            name: 'hello',
                            lon: currentLon,
                            lat: currentLat,
                            text: currentTotal, 
                            hoverinfo: 'text',
                            hovertext: detail(currentOD, currentTotal),
                            marker: {
                                color: currentTotal,
                                colorscale: scl,
                                cmin: 0,
                                cmax: 5000,
                                reversescale: false,
                                opacity: 0.4,
                                size: 12,
                                colorbar:{
                                    x: 1,
                                    thickness: 10,
                                    outlinecolor: 'rgba(0,0,0,0)',
                                    ticks: 'outside',
                                    ticklen: 3,
                                    showticksuffix: 'last',
                                    ticksuffix: 'cars',
                                    dtick: 500,
                                    tickcolor: '#ffffff',
                                    bgcolor: 'rgba(0,0,0,0.8)',
                                    tickfont: {
                                        color: 'white',
                                    }
                                }
                            }
                        };

                        var data = [origin];

                        var layout = {
                            height: '720',
                            dragmode: "zoom",
                            mapbox: { style: "dark", center: { lat: 23.53, lon: 121 }, zoom: 6.5 },
                            margin: { r: 0, t: 0, b: 0, l: 0 },
                            title: {
                                text: '車流量',
                                y: 0.95,
                                x: 0.05,
                                font: {
                                    color: 'white',
                                },
                            },
                            
                        };
                        var config = {
                            mapboxAccessToken: "pk.eyJ1IjoicG8teWVuIiwiYSI6ImNreWF5ejFzNTAzNWYydXF4c3plYmM3ejgifQ.d-6gAZGZZCIR0sX83BypjQ"
                        };
                        
                        Plotly.newPlot('totalmap', data, layout,config,{showSendToCloud: true});
                    }

                    //selected input list
                    var innerContainer = document.querySelector('.container'),
                    // monthSelector = innerContainer.querySelector('.monthdata'),
                    daySelector = innerContainer.querySelector('.daydata'),
                    hourSelector = innerContainer.querySelector('.hourdata'),
                    laneSelector = innerContainer.querySelector('.lanedata'),
                    waySelector = innerContainer.querySelector('.waydata'),
                    sizeSelector = innerContainer.querySelector('.sizedata');
                    pressSelector = innerContainer.querySelector('.press');

                    // function assignOptions(textArray, selector) {
                    //     for (var i = 0; i < textArray.length;  i++) {
                    //         var currentOption = document.createElement('option');
                    //         currentOption.text = textArray[i];
                    //         selector.appendChild(currentOption);
                    //     }
                    // }

                    // // assignOptions(listofMonths, monthSelector);
                    // assignOptions(listofDays, daySelector);
                    // assignOptions(listofHours, hourSelector);
                    // assignOptions(listofLanes, laneSelector);
                    // assignOptions(listofWays, waySelector);
                    // assignOptions(listofSizes, sizeSelector);

                    function updateTime(){
                        totalPlot(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        speedPlot(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        Totalmap(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        Speedmap(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                    }

                    pressSelector.addEventListener('click',updateTime,false);
                });

                    
                    break;
                case "5":
                    Plotly.d3.csv('data/202105.csv', function(err, rows){
                        function unpack(rows, key) {
                            return rows.map(function(row) { return row[key]; });
                        }
                    // put all elements into list
                    var allDay = unpack(rows,'day'),
                    allMonth = unpack(rows, 'month'),
                    allHour = unpack(rows,'hour'),
                    allOD = unpack(rows, 'OD'),
                    allTotal = unpack(rows, 'total'),
                    allWay = unpack(rows,'way'),
                    allSize = unpack(rows,'size'),
                    allSpeed = unpack(rows,'speed'),
                    allLane = unpack(rows,'lane'),
                    allLat = unpack(rows,'lat'),
                    allLon = unpack(rows, 'lon'),

                    listofMonths = [],
                    currentMonth,

                    listofDays = [],
                    currentDay,

                    listofHours = [],
                    currentHour,

                    listofWays = [],
                    currentWay,

                    listofSizes = [],
                    currentSize,

                    listofLanes = [],
                    currentLane,

                    currentSpeed = [],
                    currentTotal = [],
                    currentOD = [],
                    currentLat = [],
                    currentLon = [];

                    // pick unique value as selection
                    for (var i = 0; i < allMonth.length; i++ ){
                        if (listofMonths.indexOf(allMonth[i]) === -1 ){
                            listofMonths.push(allMonth[i]);
                        }
                    }

                    for (var i = 0; i < allWay.length; i++ ){
                        if (listofWays.indexOf(allWay[i]) === -1 ){
                            listofWays.push(allWay[i]);
                        }
                    }

                    for (var i = 0; i < allSize.length; i++ ){
                        if (listofSizes.indexOf(allSize[i]) === -1 ){
                            listofSizes.push(allSize[i]);
                        }
                    }

                    for (var i = 0; i < allDay.length; i++ ){
                        if (listofDays.indexOf(allDay[i]) === -1 ){
                            listofDays.push(allDay[i]);
                        }
                    }

                    for (var i = 0; i < allHour.length; i++ ){
                        if (listofHours.indexOf(allHour[i]) === -1 ){
                            listofHours.push(allHour[i]);
                        }
                    }

                    for (var i = 0; i < allLane.length; i++ ){
                        if (listofLanes.indexOf(allLane[i]) === -1 ){
                            listofLanes.push(allLane[i]);
                        }
                    }

                    //selected input
                    function getData(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {

                        currentTotal = [];
                        currentOD = [];
                        currentSpeed = [];
                        currentLat= [];
                        currentLon= [];

                        for (var i = 0 ; i < allDay.length ; i++){
                            if (allDay[i] === chosenDay & allHour[i] === chosenHour  & allLane[i] === chosenLane & allWay[i] === chosenWay & allSize[i] === chosenSize) {
                                currentTotal.push(allTotal[i]);
                                currentOD.push(allOD[i]);
                                currentSpeed.push(allSpeed[i]);
                                currentLat.push(allLat[i]);
                                currentLon.push(allLon[i]);
                            }
                        } 
                    }

                    // Default
                    totalPlot('1','0','國道一號','N','大型車');
                    speedPlot('1','0','國道一號','N','大型車');
                    Speedmap('1','0','國道一號','N','大型車');
                    Totalmap('1','0','國道一號','N','大型車');

                    //Draw
                    function totalPlot(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize); 
                        var trace1 = {
                            x: currentOD,
                            y: currentTotal,
                            mode: 'lines+markers',
                            marker: {
                                size: 6, 
                                opacity: 0.5,
                                color: 'white',
                            },
                            line: {
                                color: 'white',
                            }
                        };

                        var data = [trace1];

                        var layout = {
                            height: '780',
                            title: '國道行車流量折線圖',
                            plot_bgcolor:"black",
                            paper_bgcolor:"#3c3c3c",
                            font: {
                                color: 'white',
                            },
                            xaxis:{
                                automargin: true,
                            },
                            
                        };

                        Plotly.newPlot('total', data, layout, {showSendToCloud: true});
                    };

                    function speedPlot(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {
                        getData( chosenDay,chosenHour, chosenLane,chosenWay, chosenSize); 
                        var trace1 = {
                            x: currentOD,
                            y: currentSpeed,
                            mode: 'lines+markers',
                            marker: {
                                size: 6, 
                                opacity: 0.5,
                                color: 'white',
                            },
                            line: {
                                color: 'white',
                            }
                        };

                        var data = [trace1];

                        var layout = {
                            height: '780',
                            title: '國道行車速度折線圖',
                            plot_bgcolor:"black",
                            paper_bgcolor:"#3c3c3c",
                            font: {
                                color: 'white',
                            },
                            xaxis:{
                                automargin: true,
                            },
                            
                        };

                        Plotly.newPlot('speed', data, layout, {showSendToCloud: true});
                    };

                    function Speedmap(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize); 
                        
                        scl = [[0,'rgb(44, 255, 150)'],[0.1,'rgb(151, 255, 0)'],[0.2,'rgb(255, 234, 0)'],[0.5,'rgb(255, 111, 0)'],[1,'rgb(255, 0, 0)']];

                        function detail(currentOD, currentSpeed) {
                            var combinations = [];
                            for (let i = 0; i < currentOD.length; i++) {
                                combinations.push(currentOD[i] + '  '+'速度：' + currentSpeed[i]+'km/hr');
                            }
                            return combinations;
                            }

                        var origin = {
                            type: 'scattermapbox',
                            mode: 'markers',
                            lon: currentLon,
                            lat: currentLat,
                            text: currentSpeed, 
                            hoverinfo: 'text',
                            hovertext: detail(currentOD, currentSpeed),
                            marker: {
                                color: currentSpeed,
                                colorscale: scl,
                                cmin: 0,
                                cmax: 110,
                                reversescale: true,
                                opacity: 0.4,
                                size: 12,
                                colorbar:{
                                    x: 1,
                                    thickness: 10,
                                    outlinecolor: 'rgba(0,0,0,0)',
                                    ticks: 'outside',
                                    ticklen: 3,
                                    showticksuffix: 'last',
                                    ticksuffix: 'km/hr',
                                    dtick: 10,
                                    tickcolor: '#ffffff',
                                    bgcolor: 'rgba(0,0,0,0.8)',
                                    tickfont: {
                                        color: 'white',
                                    }
                                },
                            }
                        };

                        var data = [origin];

                        var layout = {
                            height: '780',
                            dragmode: "zoom",
                            mapbox: { style: "dark", center: { lat: 23.53, lon: 121 }, zoom: 6.5 },
                            margin: { r: 0, t: 0, b: 0, l: 0 },
                            title: {
                                text: '車速',
                                y: 0.95,
                                x: 0.05,
                                font: {
                                    color: 'white',
                                },
                            },
                        };
                        var config = {
                            mapboxAccessToken: "pk.eyJ1IjoicG8teWVuIiwiYSI6ImNreWF5ejFzNTAzNWYydXF4c3plYmM3ejgifQ.d-6gAZGZZCIR0sX83BypjQ"
                        };

                        Plotly.newPlot('speedmap', data, layout,config,{showSendToCloud: true});
                    }

                    function Totalmap(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize); 
                        
                        scl = [[0,'rgb(44, 255, 150)'],[0.1,'rgb(151, 255, 0)'],[0.2,'rgb(255, 234, 0)'],[0.5,'rgb(255, 111, 0)'],[1,'rgb(255, 0, 0)']];

                        function detail(currentOD, currentTotal) {
                            var combinations = [];
                            for (let i = 0; i < currentOD.length; i++) {
                                combinations.push(currentOD[i] + '  '+'車流量：' + currentTotal[i]+'台');
                            }
                            return combinations;
                            }

                        var origin = {
                            type: 'scattermapbox',
                            mode: 'markers',
                            name: 'hello',
                            lon: currentLon,
                            lat: currentLat,
                            text: currentTotal, 
                            hoverinfo: 'text',
                            hovertext: detail(currentOD, currentTotal),
                            marker: {
                                color: currentTotal,
                                colorscale: scl,
                                cmin: 0,
                                cmax: 5000,
                                reversescale: false,
                                opacity: 0.4,
                                size: 12,
                                colorbar:{
                                    x: 1,
                                    thickness: 10,
                                    outlinecolor: 'rgba(0,0,0,0)',
                                    ticks: 'outside',
                                    ticklen: 3,
                                    showticksuffix: 'last',
                                    ticksuffix: 'cars',
                                    dtick: 500,
                                    tickcolor: '#ffffff',
                                    bgcolor: 'rgba(0,0,0,0.8)',
                                    tickfont: {
                                        color: 'white',
                                    }
                                }
                            }
                        };

                        var data = [origin];

                        var layout = {
                            height: '720',
                            dragmode: "zoom",
                            mapbox: { style: "dark", center: { lat: 23.53, lon: 121 }, zoom: 6.5 },
                            margin: { r: 0, t: 0, b: 0, l: 0 },
                            title: {
                                text: '車流量',
                                y: 0.95,
                                x: 0.05,
                                font: {
                                    color: 'white',
                                },
                            },
                            
                        };
                        var config = {
                            mapboxAccessToken: "pk.eyJ1IjoicG8teWVuIiwiYSI6ImNreWF5ejFzNTAzNWYydXF4c3plYmM3ejgifQ.d-6gAZGZZCIR0sX83BypjQ"
                        };
                        
                        Plotly.newPlot('totalmap', data, layout,config,{showSendToCloud: true});
                    }

                    //selected input list
                    var innerContainer = document.querySelector('.container'),
                    // monthSelector = innerContainer.querySelector('.monthdata'),
                    daySelector = innerContainer.querySelector('.daydata'),
                    hourSelector = innerContainer.querySelector('.hourdata'),
                    laneSelector = innerContainer.querySelector('.lanedata'),
                    waySelector = innerContainer.querySelector('.waydata'),
                    sizeSelector = innerContainer.querySelector('.sizedata');
                    pressSelector = innerContainer.querySelector('.press');

                    // function assignOptions(textArray, selector) {
                    //     for (var i = 0; i < textArray.length;  i++) {
                    //         var currentOption = document.createElement('option');
                    //         currentOption.text = textArray[i];
                    //         selector.appendChild(currentOption);
                    //     }
                    // }

                    // // assignOptions(listofMonths, monthSelector);
                    // assignOptions(listofDays, daySelector);
                    // assignOptions(listofHours, hourSelector);
                    // assignOptions(listofLanes, laneSelector);
                    // assignOptions(listofWays, waySelector);
                    // assignOptions(listofSizes, sizeSelector);

                    function updateTime(){
                        totalPlot(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        speedPlot(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        Totalmap(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        Speedmap(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                    }

                    pressSelector.addEventListener('click',updateTime,false);
                });

                    
                    break;
                case "6":
                    Plotly.d3.csv('data/202106.csv', function(err, rows){
                        function unpack(rows, key) {
                            return rows.map(function(row) { return row[key]; });
                        }
                    // put all elements into list
                    var allDay = unpack(rows,'day'),
                    allMonth = unpack(rows, 'month'),
                    allHour = unpack(rows,'hour'),
                    allOD = unpack(rows, 'OD'),
                    allTotal = unpack(rows, 'total'),
                    allWay = unpack(rows,'way'),
                    allSize = unpack(rows,'size'),
                    allSpeed = unpack(rows,'speed'),
                    allLane = unpack(rows,'lane'),
                    allLat = unpack(rows,'lat'),
                    allLon = unpack(rows, 'lon'),

                    listofMonths = [],
                    currentMonth,

                    listofDays = [],
                    currentDay,

                    listofHours = [],
                    currentHour,

                    listofWays = [],
                    currentWay,

                    listofSizes = [],
                    currentSize,

                    listofLanes = [],
                    currentLane,

                    currentSpeed = [],
                    currentTotal = [],
                    currentOD = [],
                    currentLat = [],
                    currentLon = [];

                    // pick unique value as selection
                    for (var i = 0; i < allMonth.length; i++ ){
                        if (listofMonths.indexOf(allMonth[i]) === -1 ){
                            listofMonths.push(allMonth[i]);
                        }
                    }

                    for (var i = 0; i < allWay.length; i++ ){
                        if (listofWays.indexOf(allWay[i]) === -1 ){
                            listofWays.push(allWay[i]);
                        }
                    }

                    for (var i = 0; i < allSize.length; i++ ){
                        if (listofSizes.indexOf(allSize[i]) === -1 ){
                            listofSizes.push(allSize[i]);
                        }
                    }

                    for (var i = 0; i < allDay.length; i++ ){
                        if (listofDays.indexOf(allDay[i]) === -1 ){
                            listofDays.push(allDay[i]);
                        }
                    }

                    for (var i = 0; i < allHour.length; i++ ){
                        if (listofHours.indexOf(allHour[i]) === -1 ){
                            listofHours.push(allHour[i]);
                        }
                    }

                    for (var i = 0; i < allLane.length; i++ ){
                        if (listofLanes.indexOf(allLane[i]) === -1 ){
                            listofLanes.push(allLane[i]);
                        }
                    }

                    //selected input
                    function getData(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {

                        currentTotal = [];
                        currentOD = [];
                        currentSpeed = [];
                        currentLat= [];
                        currentLon= [];

                        for (var i = 0 ; i < allDay.length ; i++){
                            if (allDay[i] === chosenDay & allHour[i] === chosenHour  & allLane[i] === chosenLane & allWay[i] === chosenWay & allSize[i] === chosenSize) {
                                currentTotal.push(allTotal[i]);
                                currentOD.push(allOD[i]);
                                currentSpeed.push(allSpeed[i]);
                                currentLat.push(allLat[i]);
                                currentLon.push(allLon[i]);
                            }
                        } 
                    }

                    // Default
                    totalPlot('1','0','國道一號','N','大型車');
                    speedPlot('1','0','國道一號','N','大型車');
                    Speedmap('1','0','國道一號','N','大型車');
                    Totalmap('1','0','國道一號','N','大型車');

                    //Draw
                    function totalPlot(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize); 
                        var trace1 = {
                            x: currentOD,
                            y: currentTotal,
                            mode: 'lines+markers',
                            marker: {
                                size: 6, 
                                opacity: 0.5,
                                color: 'white',
                            },
                            line: {
                                color: 'white',
                            }
                        };

                        var data = [trace1];

                        var layout = {
                            height: '780',
                            title: '國道行車流量折線圖',
                            plot_bgcolor:"black",
                            paper_bgcolor:"#3c3c3c",
                            font: {
                                color: 'white',
                            },
                            xaxis:{
                                automargin: true,
                            },
                            
                        };

                        Plotly.newPlot('total', data, layout, {showSendToCloud: true});
                    };

                    function speedPlot(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {
                        getData( chosenDay,chosenHour, chosenLane,chosenWay, chosenSize); 
                        var trace1 = {
                            x: currentOD,
                            y: currentSpeed,
                            mode: 'lines+markers',
                            marker: {
                                size: 6, 
                                opacity: 0.5,
                                color: 'white',
                            },
                            line: {
                                color: 'white',
                            }
                        };

                        var data = [trace1];

                        var layout = {
                            height: '780',
                            title: '國道行車速度折線圖',
                            plot_bgcolor:"black",
                            paper_bgcolor:"#3c3c3c",
                            font: {
                                color: 'white',
                            },
                            xaxis:{
                                automargin: true,
                            },
                            
                        };

                        Plotly.newPlot('speed', data, layout, {showSendToCloud: true});
                    };

                    function Speedmap(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize); 
                        
                        scl = [[0,'rgb(44, 255, 150)'],[0.1,'rgb(151, 255, 0)'],[0.2,'rgb(255, 234, 0)'],[0.5,'rgb(255, 111, 0)'],[1,'rgb(255, 0, 0)']];

                        function detail(currentOD, currentSpeed) {
                            var combinations = [];
                            for (let i = 0; i < currentOD.length; i++) {
                                combinations.push(currentOD[i] + '  '+'速度：' + currentSpeed[i]+'km/hr');
                            }
                            return combinations;
                            }

                        var origin = {
                            type: 'scattermapbox',
                            mode: 'markers',
                            lon: currentLon,
                            lat: currentLat,
                            text: currentSpeed, 
                            hoverinfo: 'text',
                            hovertext: detail(currentOD, currentSpeed),
                            marker: {
                                color: currentSpeed,
                                colorscale: scl,
                                cmin: 0,
                                cmax: 110,
                                reversescale: true,
                                opacity: 0.4,
                                size: 12,
                                colorbar:{
                                    x: 1,
                                    thickness: 10,
                                    outlinecolor: 'rgba(0,0,0,0)',
                                    ticks: 'outside',
                                    ticklen: 3,
                                    showticksuffix: 'last',
                                    ticksuffix: 'km/hr',
                                    dtick: 10,
                                    tickcolor: '#ffffff',
                                    bgcolor: 'rgba(0,0,0,0.8)',
                                    tickfont: {
                                        color: 'white',
                                    }
                                },
                            }
                        };

                        var data = [origin];

                        var layout = {
                            height: '780',
                            dragmode: "zoom",
                            mapbox: { style: "dark", center: { lat: 23.53, lon: 121 }, zoom: 6.5 },
                            margin: { r: 0, t: 0, b: 0, l: 0 },
                            title: {
                                text: '車速',
                                y: 0.95,
                                x: 0.05,
                                font: {
                                    color: 'white',
                                },
                            },
                        };
                        var config = {
                            mapboxAccessToken: "pk.eyJ1IjoicG8teWVuIiwiYSI6ImNreWF5ejFzNTAzNWYydXF4c3plYmM3ejgifQ.d-6gAZGZZCIR0sX83BypjQ"
                        };

                        Plotly.newPlot('speedmap', data, layout,config,{showSendToCloud: true});
                    }

                    function Totalmap(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize); 
                        
                        scl = [[0,'rgb(44, 255, 150)'],[0.1,'rgb(151, 255, 0)'],[0.2,'rgb(255, 234, 0)'],[0.5,'rgb(255, 111, 0)'],[1,'rgb(255, 0, 0)']];

                        function detail(currentOD, currentTotal) {
                            var combinations = [];
                            for (let i = 0; i < currentOD.length; i++) {
                                combinations.push(currentOD[i] + '  '+'車流量：' + currentTotal[i]+'台');
                            }
                            return combinations;
                            }

                        var origin = {
                            type: 'scattermapbox',
                            mode: 'markers',
                            name: 'hello',
                            lon: currentLon,
                            lat: currentLat,
                            text: currentTotal, 
                            hoverinfo: 'text',
                            hovertext: detail(currentOD, currentTotal),
                            marker: {
                                color: currentTotal,
                                colorscale: scl,
                                cmin: 0,
                                cmax: 5000,
                                reversescale: false,
                                opacity: 0.4,
                                size: 12,
                                colorbar:{
                                    x: 1,
                                    thickness: 10,
                                    outlinecolor: 'rgba(0,0,0,0)',
                                    ticks: 'outside',
                                    ticklen: 3,
                                    showticksuffix: 'last',
                                    ticksuffix: 'cars',
                                    dtick: 500,
                                    tickcolor: '#ffffff',
                                    bgcolor: 'rgba(0,0,0,0.8)',
                                    tickfont: {
                                        color: 'white',
                                    }
                                }
                            }
                        };

                        var data = [origin];

                        var layout = {
                            height: '720',
                            dragmode: "zoom",
                            mapbox: { style: "dark", center: { lat: 23.53, lon: 121 }, zoom: 6.5 },
                            margin: { r: 0, t: 0, b: 0, l: 0 },
                            title: {
                                text: '車流量',
                                y: 0.95,
                                x: 0.05,
                                font: {
                                    color: 'white',
                                },
                            },
                            
                        };
                        var config = {
                            mapboxAccessToken: "pk.eyJ1IjoicG8teWVuIiwiYSI6ImNreWF5ejFzNTAzNWYydXF4c3plYmM3ejgifQ.d-6gAZGZZCIR0sX83BypjQ"
                        };
                        
                        Plotly.newPlot('totalmap', data, layout,config,{showSendToCloud: true});
                    }

                    //selected input list
                    var innerContainer = document.querySelector('.container'),
                    // monthSelector = innerContainer.querySelector('.monthdata'),
                    daySelector = innerContainer.querySelector('.daydata'),
                    hourSelector = innerContainer.querySelector('.hourdata'),
                    laneSelector = innerContainer.querySelector('.lanedata'),
                    waySelector = innerContainer.querySelector('.waydata'),
                    sizeSelector = innerContainer.querySelector('.sizedata');
                    pressSelector = innerContainer.querySelector('.press');

                    // function assignOptions(textArray, selector) {
                    //     for (var i = 0; i < textArray.length;  i++) {
                    //         var currentOption = document.createElement('option');
                    //         currentOption.text = textArray[i];
                    //         selector.appendChild(currentOption);
                    //     }
                    // }

                    // // assignOptions(listofMonths, monthSelector);
                    // assignOptions(listofDays, daySelector);
                    // assignOptions(listofHours, hourSelector);
                    // assignOptions(listofLanes, laneSelector);
                    // assignOptions(listofWays, waySelector);
                    // assignOptions(listofSizes, sizeSelector);

                    function updateTime(){
                        totalPlot(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        speedPlot(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        Totalmap(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        Speedmap(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                    }

                    pressSelector.addEventListener('click',updateTime,false);
                });

                    
                    break;
                case "7":
                    Plotly.d3.csv('data/202107.csv', function(err, rows){
                        function unpack(rows, key) {
                            return rows.map(function(row) { return row[key]; });
                        }
                    // put all elements into list
                    var allDay = unpack(rows,'day'),
                    allMonth = unpack(rows, 'month'),
                    allHour = unpack(rows,'hour'),
                    allOD = unpack(rows, 'OD'),
                    allTotal = unpack(rows, 'total'),
                    allWay = unpack(rows,'way'),
                    allSize = unpack(rows,'size'),
                    allSpeed = unpack(rows,'speed'),
                    allLane = unpack(rows,'lane'),
                    allLat = unpack(rows,'lat'),
                    allLon = unpack(rows, 'lon'),

                    listofMonths = [],
                    currentMonth,

                    listofDays = [],
                    currentDay,

                    listofHours = [],
                    currentHour,

                    listofWays = [],
                    currentWay,

                    listofSizes = [],
                    currentSize,

                    listofLanes = [],
                    currentLane,

                    currentSpeed = [],
                    currentTotal = [],
                    currentOD = [],
                    currentLat = [],
                    currentLon = [];

                    // pick unique value as selection
                    for (var i = 0; i < allMonth.length; i++ ){
                        if (listofMonths.indexOf(allMonth[i]) === -1 ){
                            listofMonths.push(allMonth[i]);
                        }
                    }

                    for (var i = 0; i < allWay.length; i++ ){
                        if (listofWays.indexOf(allWay[i]) === -1 ){
                            listofWays.push(allWay[i]);
                        }
                    }

                    for (var i = 0; i < allSize.length; i++ ){
                        if (listofSizes.indexOf(allSize[i]) === -1 ){
                            listofSizes.push(allSize[i]);
                        }
                    }

                    for (var i = 0; i < allDay.length; i++ ){
                        if (listofDays.indexOf(allDay[i]) === -1 ){
                            listofDays.push(allDay[i]);
                        }
                    }

                    for (var i = 0; i < allHour.length; i++ ){
                        if (listofHours.indexOf(allHour[i]) === -1 ){
                            listofHours.push(allHour[i]);
                        }
                    }

                    for (var i = 0; i < allLane.length; i++ ){
                        if (listofLanes.indexOf(allLane[i]) === -1 ){
                            listofLanes.push(allLane[i]);
                        }
                    }

                    //selected input
                    function getData(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {

                        currentTotal = [];
                        currentOD = [];
                        currentSpeed = [];
                        currentLat= [];
                        currentLon= [];

                        for (var i = 0 ; i < allDay.length ; i++){
                            if (allDay[i] === chosenDay & allHour[i] === chosenHour  & allLane[i] === chosenLane & allWay[i] === chosenWay & allSize[i] === chosenSize) {
                                currentTotal.push(allTotal[i]);
                                currentOD.push(allOD[i]);
                                currentSpeed.push(allSpeed[i]);
                                currentLat.push(allLat[i]);
                                currentLon.push(allLon[i]);
                            }
                        } 
                    }

                    // Default
                    totalPlot('1','0','國道一號','N','大型車');
                    speedPlot('1','0','國道一號','N','大型車');
                    Speedmap('1','0','國道一號','N','大型車');
                    Totalmap('1','0','國道一號','N','大型車');

                    //Draw
                    function totalPlot(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize); 
                        var trace1 = {
                            x: currentOD,
                            y: currentTotal,
                            mode: 'lines+markers',
                            marker: {
                                size: 6, 
                                opacity: 0.5,
                                color: 'white',
                            },
                            line: {
                                color: 'white',
                            }
                        };

                        var data = [trace1];

                        var layout = {
                            height: '780',
                            title: '國道行車流量折線圖',
                            plot_bgcolor:"black",
                            paper_bgcolor:"#3c3c3c",
                            font: {
                                color: 'white',
                            },
                            xaxis:{
                                automargin: true,
                            },
                            
                        };

                        Plotly.newPlot('total', data, layout, {showSendToCloud: true});
                    };

                    function speedPlot(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {
                        getData( chosenDay,chosenHour, chosenLane,chosenWay, chosenSize); 
                        var trace1 = {
                            x: currentOD,
                            y: currentSpeed,
                            mode: 'lines+markers',
                            marker: {
                                size: 6, 
                                opacity: 0.5,
                                color: 'white',
                            },
                            line: {
                                color: 'white',
                            }
                        };

                        var data = [trace1];

                        var layout = {
                            height: '780',
                            title: '國道行車速度折線圖',
                            plot_bgcolor:"black",
                            paper_bgcolor:"#3c3c3c",
                            font: {
                                color: 'white',
                            },
                            xaxis:{
                                automargin: true,
                            },
                            
                        };

                        Plotly.newPlot('speed', data, layout, {showSendToCloud: true});
                    };

                    function Speedmap(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize); 
                        
                        scl = [[0,'rgb(44, 255, 150)'],[0.1,'rgb(151, 255, 0)'],[0.2,'rgb(255, 234, 0)'],[0.5,'rgb(255, 111, 0)'],[1,'rgb(255, 0, 0)']];

                        function detail(currentOD, currentSpeed) {
                            var combinations = [];
                            for (let i = 0; i < currentOD.length; i++) {
                                combinations.push(currentOD[i] + '  '+'速度：' + currentSpeed[i]+'km/hr');
                            }
                            return combinations;
                            }

                        var origin = {
                            type: 'scattermapbox',
                            mode: 'markers',
                            lon: currentLon,
                            lat: currentLat,
                            text: currentSpeed, 
                            hoverinfo: 'text',
                            hovertext: detail(currentOD, currentSpeed),
                            marker: {
                                color: currentSpeed,
                                colorscale: scl,
                                cmin: 0,
                                cmax: 110,
                                reversescale: true,
                                opacity: 0.4,
                                size: 12,
                                colorbar:{
                                    x: 1,
                                    thickness: 10,
                                    outlinecolor: 'rgba(0,0,0,0)',
                                    ticks: 'outside',
                                    ticklen: 3,
                                    showticksuffix: 'last',
                                    ticksuffix: 'km/hr',
                                    dtick: 10,
                                    tickcolor: '#ffffff',
                                    bgcolor: 'rgba(0,0,0,0.8)',
                                    tickfont: {
                                        color: 'white',
                                    }
                                },
                            }
                        };

                        var data = [origin];

                        var layout = {
                            height: '780',
                            dragmode: "zoom",
                            mapbox: { style: "dark", center: { lat: 23.53, lon: 121 }, zoom: 6.5 },
                            margin: { r: 0, t: 0, b: 0, l: 0 },
                            title: {
                                text: '車速',
                                y: 0.95,
                                x: 0.05,
                                font: {
                                    color: 'white',
                                },
                            },
                        };
                        var config = {
                            mapboxAccessToken: "pk.eyJ1IjoicG8teWVuIiwiYSI6ImNreWF5ejFzNTAzNWYydXF4c3plYmM3ejgifQ.d-6gAZGZZCIR0sX83BypjQ"
                        };

                        Plotly.newPlot('speedmap', data, layout,config,{showSendToCloud: true});
                    }

                    function Totalmap(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize); 
                        
                        scl = [[0,'rgb(44, 255, 150)'],[0.1,'rgb(151, 255, 0)'],[0.2,'rgb(255, 234, 0)'],[0.5,'rgb(255, 111, 0)'],[1,'rgb(255, 0, 0)']];

                        function detail(currentOD, currentTotal) {
                            var combinations = [];
                            for (let i = 0; i < currentOD.length; i++) {
                                combinations.push(currentOD[i] + '  '+'車流量：' + currentTotal[i]+'台');
                            }
                            return combinations;
                            }

                        var origin = {
                            type: 'scattermapbox',
                            mode: 'markers',
                            name: 'hello',
                            lon: currentLon,
                            lat: currentLat,
                            text: currentTotal, 
                            hoverinfo: 'text',
                            hovertext: detail(currentOD, currentTotal),
                            marker: {
                                color: currentTotal,
                                colorscale: scl,
                                cmin: 0,
                                cmax: 5000,
                                reversescale: false,
                                opacity: 0.4,
                                size: 12,
                                colorbar:{
                                    x: 1,
                                    thickness: 10,
                                    outlinecolor: 'rgba(0,0,0,0)',
                                    ticks: 'outside',
                                    ticklen: 3,
                                    showticksuffix: 'last',
                                    ticksuffix: 'cars',
                                    dtick: 500,
                                    tickcolor: '#ffffff',
                                    bgcolor: 'rgba(0,0,0,0.8)',
                                    tickfont: {
                                        color: 'white',
                                    }
                                }
                            }
                        };

                        var data = [origin];

                        var layout = {
                            height: '720',
                            dragmode: "zoom",
                            mapbox: { style: "dark", center: { lat: 23.53, lon: 121 }, zoom: 6.5 },
                            margin: { r: 0, t: 0, b: 0, l: 0 },
                            title: {
                                text: '車流量',
                                y: 0.95,
                                x: 0.05,
                                font: {
                                    color: 'white',
                                },
                            },
                            
                        };
                        var config = {
                            mapboxAccessToken: "pk.eyJ1IjoicG8teWVuIiwiYSI6ImNreWF5ejFzNTAzNWYydXF4c3plYmM3ejgifQ.d-6gAZGZZCIR0sX83BypjQ"
                        };
                        
                        Plotly.newPlot('totalmap', data, layout,config,{showSendToCloud: true});
                    }

                    //selected input list
                    var innerContainer = document.querySelector('.container'),
                    // monthSelector = innerContainer.querySelector('.monthdata'),
                    daySelector = innerContainer.querySelector('.daydata'),
                    hourSelector = innerContainer.querySelector('.hourdata'),
                    laneSelector = innerContainer.querySelector('.lanedata'),
                    waySelector = innerContainer.querySelector('.waydata'),
                    sizeSelector = innerContainer.querySelector('.sizedata');
                    pressSelector = innerContainer.querySelector('.press');

                    // function assignOptions(textArray, selector) {
                    //     for (var i = 0; i < textArray.length;  i++) {
                    //         var currentOption = document.createElement('option');
                    //         currentOption.text = textArray[i];
                    //         selector.appendChild(currentOption);
                    //     }
                    // }

                    // // assignOptions(listofMonths, monthSelector);
                    // assignOptions(listofDays, daySelector);
                    // assignOptions(listofHours, hourSelector);
                    // assignOptions(listofLanes, laneSelector);
                    // assignOptions(listofWays, waySelector);
                    // assignOptions(listofSizes, sizeSelector);

                    function updateTime(){
                        totalPlot(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        speedPlot(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        Totalmap(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        Speedmap(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                    }

                    pressSelector.addEventListener('click',updateTime,false);
                });

                    
                    break;
                case "8":
                    Plotly.d3.csv('data/202108.csv', function(err, rows){
                        function unpack(rows, key) {
                            return rows.map(function(row) { return row[key]; });
                        }
                    // put all elements into list
                    var allDay = unpack(rows,'day'),
                    allMonth = unpack(rows, 'month'),
                    allHour = unpack(rows,'hour'),
                    allOD = unpack(rows, 'OD'),
                    allTotal = unpack(rows, 'total'),
                    allWay = unpack(rows,'way'),
                    allSize = unpack(rows,'size'),
                    allSpeed = unpack(rows,'speed'),
                    allLane = unpack(rows,'lane'),
                    allLat = unpack(rows,'lat'),
                    allLon = unpack(rows, 'lon'),

                    listofMonths = [],
                    currentMonth,

                    listofDays = [],
                    currentDay,

                    listofHours = [],
                    currentHour,

                    listofWays = [],
                    currentWay,

                    listofSizes = [],
                    currentSize,

                    listofLanes = [],
                    currentLane,

                    currentSpeed = [],
                    currentTotal = [],
                    currentOD = [],
                    currentLat = [],
                    currentLon = [];

                    // pick unique value as selection
                    for (var i = 0; i < allMonth.length; i++ ){
                        if (listofMonths.indexOf(allMonth[i]) === -1 ){
                            listofMonths.push(allMonth[i]);
                        }
                    }

                    for (var i = 0; i < allWay.length; i++ ){
                        if (listofWays.indexOf(allWay[i]) === -1 ){
                            listofWays.push(allWay[i]);
                        }
                    }

                    for (var i = 0; i < allSize.length; i++ ){
                        if (listofSizes.indexOf(allSize[i]) === -1 ){
                            listofSizes.push(allSize[i]);
                        }
                    }

                    for (var i = 0; i < allDay.length; i++ ){
                        if (listofDays.indexOf(allDay[i]) === -1 ){
                            listofDays.push(allDay[i]);
                        }
                    }

                    for (var i = 0; i < allHour.length; i++ ){
                        if (listofHours.indexOf(allHour[i]) === -1 ){
                            listofHours.push(allHour[i]);
                        }
                    }

                    for (var i = 0; i < allLane.length; i++ ){
                        if (listofLanes.indexOf(allLane[i]) === -1 ){
                            listofLanes.push(allLane[i]);
                        }
                    }

                    //selected input
                    function getData(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {

                        currentTotal = [];
                        currentOD = [];
                        currentSpeed = [];
                        currentLat= [];
                        currentLon= [];

                        for (var i = 0 ; i < allDay.length ; i++){
                            if (allDay[i] === chosenDay & allHour[i] === chosenHour  & allLane[i] === chosenLane & allWay[i] === chosenWay & allSize[i] === chosenSize) {
                                currentTotal.push(allTotal[i]);
                                currentOD.push(allOD[i]);
                                currentSpeed.push(allSpeed[i]);
                                currentLat.push(allLat[i]);
                                currentLon.push(allLon[i]);
                            }
                        } 
                    }

                    // Default
                    totalPlot('1','0','國道一號','N','大型車');
                    speedPlot('1','0','國道一號','N','大型車');
                    Speedmap('1','0','國道一號','N','大型車');
                    Totalmap('1','0','國道一號','N','大型車');

                    //Draw
                    function totalPlot(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize); 
                        var trace1 = {
                            x: currentOD,
                            y: currentTotal,
                            mode: 'lines+markers',
                            marker: {
                                size: 6, 
                                opacity: 0.5,
                                color: 'white',
                            },
                            line: {
                                color: 'white',
                            }
                        };

                        var data = [trace1];

                        var layout = {
                            height: '780',
                            title: '國道行車流量折線圖',
                            plot_bgcolor:"black",
                            paper_bgcolor:"#3c3c3c",
                            font: {
                                color: 'white',
                            },
                            xaxis:{
                                automargin: true,
                            },
                            
                        };

                        Plotly.newPlot('total', data, layout, {showSendToCloud: true});
                    };

                    function speedPlot(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {
                        getData( chosenDay,chosenHour, chosenLane,chosenWay, chosenSize); 
                        var trace1 = {
                            x: currentOD,
                            y: currentSpeed,
                            mode: 'lines+markers',
                            marker: {
                                size: 6, 
                                opacity: 0.5,
                                color: 'white',
                            },
                            line: {
                                color: 'white',
                            }
                        };

                        var data = [trace1];

                        var layout = {
                            height: '780',
                            title: '國道行車速度折線圖',
                            plot_bgcolor:"black",
                            paper_bgcolor:"#3c3c3c",
                            font: {
                                color: 'white',
                            },
                            xaxis:{
                                automargin: true,
                            },
                            
                        };

                        Plotly.newPlot('speed', data, layout, {showSendToCloud: true});
                    };

                    function Speedmap(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize); 
                        
                        scl = [[0,'rgb(44, 255, 150)'],[0.1,'rgb(151, 255, 0)'],[0.2,'rgb(255, 234, 0)'],[0.5,'rgb(255, 111, 0)'],[1,'rgb(255, 0, 0)']];

                        function detail(currentOD, currentSpeed) {
                            var combinations = [];
                            for (let i = 0; i < currentOD.length; i++) {
                                combinations.push(currentOD[i] + '  '+'速度：' + currentSpeed[i]+'km/hr');
                            }
                            return combinations;
                            }

                        var origin = {
                            type: 'scattermapbox',
                            mode: 'markers',
                            lon: currentLon,
                            lat: currentLat,
                            text: currentSpeed, 
                            hoverinfo: 'text',
                            hovertext: detail(currentOD, currentSpeed),
                            marker: {
                                color: currentSpeed,
                                colorscale: scl,
                                cmin: 0,
                                cmax: 110,
                                reversescale: true,
                                opacity: 0.4,
                                size: 12,
                                colorbar:{
                                    x: 1,
                                    thickness: 10,
                                    outlinecolor: 'rgba(0,0,0,0)',
                                    ticks: 'outside',
                                    ticklen: 3,
                                    showticksuffix: 'last',
                                    ticksuffix: 'km/hr',
                                    dtick: 10,
                                    tickcolor: '#ffffff',
                                    bgcolor: 'rgba(0,0,0,0.8)',
                                    tickfont: {
                                        color: 'white',
                                    }
                                },
                            }
                        };

                        var data = [origin];

                        var layout = {
                            height: '780',
                            dragmode: "zoom",
                            mapbox: { style: "dark", center: { lat: 23.53, lon: 121 }, zoom: 6.5 },
                            margin: { r: 0, t: 0, b: 0, l: 0 },
                            title: {
                                text: '車速',
                                y: 0.95,
                                x: 0.05,
                                font: {
                                    color: 'white',
                                },
                            },
                        };
                        var config = {
                            mapboxAccessToken: "pk.eyJ1IjoicG8teWVuIiwiYSI6ImNreWF5ejFzNTAzNWYydXF4c3plYmM3ejgifQ.d-6gAZGZZCIR0sX83BypjQ"
                        };

                        Plotly.newPlot('speedmap', data, layout,config,{showSendToCloud: true});
                    }

                    function Totalmap(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize); 
                        
                        scl = [[0,'rgb(44, 255, 150)'],[0.1,'rgb(151, 255, 0)'],[0.2,'rgb(255, 234, 0)'],[0.5,'rgb(255, 111, 0)'],[1,'rgb(255, 0, 0)']];

                        function detail(currentOD, currentTotal) {
                            var combinations = [];
                            for (let i = 0; i < currentOD.length; i++) {
                                combinations.push(currentOD[i] + '  '+'車流量：' + currentTotal[i]+'台');
                            }
                            return combinations;
                            }

                        var origin = {
                            type: 'scattermapbox',
                            mode: 'markers',
                            name: 'hello',
                            lon: currentLon,
                            lat: currentLat,
                            text: currentTotal, 
                            hoverinfo: 'text',
                            hovertext: detail(currentOD, currentTotal),
                            marker: {
                                color: currentTotal,
                                colorscale: scl,
                                cmin: 0,
                                cmax: 5000,
                                reversescale: false,
                                opacity: 0.4,
                                size: 12,
                                colorbar:{
                                    x: 1,
                                    thickness: 10,
                                    outlinecolor: 'rgba(0,0,0,0)',
                                    ticks: 'outside',
                                    ticklen: 3,
                                    showticksuffix: 'last',
                                    ticksuffix: 'cars',
                                    dtick: 500,
                                    tickcolor: '#ffffff',
                                    bgcolor: 'rgba(0,0,0,0.8)',
                                    tickfont: {
                                        color: 'white',
                                    }
                                }
                            }
                        };

                        var data = [origin];

                        var layout = {
                            height: '720',
                            dragmode: "zoom",
                            mapbox: { style: "dark", center: { lat: 23.53, lon: 121 }, zoom: 6.5 },
                            margin: { r: 0, t: 0, b: 0, l: 0 },
                            title: {
                                text: '車流量',
                                y: 0.95,
                                x: 0.05,
                                font: {
                                    color: 'white',
                                },
                            },
                            
                        };
                        var config = {
                            mapboxAccessToken: "pk.eyJ1IjoicG8teWVuIiwiYSI6ImNreWF5ejFzNTAzNWYydXF4c3plYmM3ejgifQ.d-6gAZGZZCIR0sX83BypjQ"
                        };
                        
                        Plotly.newPlot('totalmap', data, layout,config,{showSendToCloud: true});
                    }

                    //selected input list
                    var innerContainer = document.querySelector('.container'),
                    // monthSelector = innerContainer.querySelector('.monthdata'),
                    daySelector = innerContainer.querySelector('.daydata'),
                    hourSelector = innerContainer.querySelector('.hourdata'),
                    laneSelector = innerContainer.querySelector('.lanedata'),
                    waySelector = innerContainer.querySelector('.waydata'),
                    sizeSelector = innerContainer.querySelector('.sizedata');
                    pressSelector = innerContainer.querySelector('.press');

                    // function assignOptions(textArray, selector) {
                    //     for (var i = 0; i < textArray.length;  i++) {
                    //         var currentOption = document.createElement('option');
                    //         currentOption.text = textArray[i];
                    //         selector.appendChild(currentOption);
                    //     }
                    // }

                    // // assignOptions(listofMonths, monthSelector);
                    // assignOptions(listofDays, daySelector);
                    // assignOptions(listofHours, hourSelector);
                    // assignOptions(listofLanes, laneSelector);
                    // assignOptions(listofWays, waySelector);
                    // assignOptions(listofSizes, sizeSelector);

                    function updateTime(){
                        totalPlot(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        speedPlot(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        Totalmap(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        Speedmap(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                    }

                    pressSelector.addEventListener('click',updateTime,false);
                });

                    
                    break;
                case "9":
                    Plotly.d3.csv('data/202109.csv', function(err, rows){
                        function unpack(rows, key) {
                            return rows.map(function(row) { return row[key]; });
                        }
                    // put all elements into list
                    var allDay = unpack(rows,'day'),
                    allMonth = unpack(rows, 'month'),
                    allHour = unpack(rows,'hour'),
                    allOD = unpack(rows, 'OD'),
                    allTotal = unpack(rows, 'total'),
                    allWay = unpack(rows,'way'),
                    allSize = unpack(rows,'size'),
                    allSpeed = unpack(rows,'speed'),
                    allLane = unpack(rows,'lane'),
                    allLat = unpack(rows,'lat'),
                    allLon = unpack(rows, 'lon'),

                    listofMonths = [],
                    currentMonth,

                    listofDays = [],
                    currentDay,

                    listofHours = [],
                    currentHour,

                    listofWays = [],
                    currentWay,

                    listofSizes = [],
                    currentSize,

                    listofLanes = [],
                    currentLane,

                    currentSpeed = [],
                    currentTotal = [],
                    currentOD = [],
                    currentLat = [],
                    currentLon = [];

                    // pick unique value as selection
                    for (var i = 0; i < allMonth.length; i++ ){
                        if (listofMonths.indexOf(allMonth[i]) === -1 ){
                            listofMonths.push(allMonth[i]);
                        }
                    }

                    for (var i = 0; i < allWay.length; i++ ){
                        if (listofWays.indexOf(allWay[i]) === -1 ){
                            listofWays.push(allWay[i]);
                        }
                    }

                    for (var i = 0; i < allSize.length; i++ ){
                        if (listofSizes.indexOf(allSize[i]) === -1 ){
                            listofSizes.push(allSize[i]);
                        }
                    }

                    for (var i = 0; i < allDay.length; i++ ){
                        if (listofDays.indexOf(allDay[i]) === -1 ){
                            listofDays.push(allDay[i]);
                        }
                    }

                    for (var i = 0; i < allHour.length; i++ ){
                        if (listofHours.indexOf(allHour[i]) === -1 ){
                            listofHours.push(allHour[i]);
                        }
                    }

                    for (var i = 0; i < allLane.length; i++ ){
                        if (listofLanes.indexOf(allLane[i]) === -1 ){
                            listofLanes.push(allLane[i]);
                        }
                    }

                    //selected input
                    function getData(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {

                        currentTotal = [];
                        currentOD = [];
                        currentSpeed = [];
                        currentLat= [];
                        currentLon= [];

                        for (var i = 0 ; i < allDay.length ; i++){
                            if (allDay[i] === chosenDay & allHour[i] === chosenHour  & allLane[i] === chosenLane & allWay[i] === chosenWay & allSize[i] === chosenSize) {
                                currentTotal.push(allTotal[i]);
                                currentOD.push(allOD[i]);
                                currentSpeed.push(allSpeed[i]);
                                currentLat.push(allLat[i]);
                                currentLon.push(allLon[i]);
                            }
                        } 
                    }

                    // Default
                    totalPlot('1','0','國道一號','N','大型車');
                    speedPlot('1','0','國道一號','N','大型車');
                    Speedmap('1','0','國道一號','N','大型車');
                    Totalmap('1','0','國道一號','N','大型車');

                    //Draw
                    function totalPlot(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize); 
                        var trace1 = {
                            x: currentOD,
                            y: currentTotal,
                            mode: 'lines+markers',
                            marker: {
                                size: 6, 
                                opacity: 0.5,
                                color: 'white',
                            },
                            line: {
                                color: 'white',
                            }
                        };

                        var data = [trace1];

                        var layout = {
                            height: '780',
                            title: '國道行車流量折線圖',
                            plot_bgcolor:"black",
                            paper_bgcolor:"#3c3c3c",
                            font: {
                                color: 'white',
                            },
                            xaxis:{
                                automargin: true,
                            },
                            
                        };

                        Plotly.newPlot('total', data, layout, {showSendToCloud: true});
                    };

                    function speedPlot(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {
                        getData( chosenDay,chosenHour, chosenLane,chosenWay, chosenSize); 
                        var trace1 = {
                            x: currentOD,
                            y: currentSpeed,
                            mode: 'lines+markers',
                            marker: {
                                size: 6, 
                                opacity: 0.5,
                                color: 'white',
                            },
                            line: {
                                color: 'white',
                            }
                        };

                        var data = [trace1];

                        var layout = {
                            height: '780',
                            title: '國道行車速度折線圖',
                            plot_bgcolor:"black",
                            paper_bgcolor:"#3c3c3c",
                            font: {
                                color: 'white',
                            },
                            xaxis:{
                                automargin: true,
                            },
                            
                        };

                        Plotly.newPlot('speed', data, layout, {showSendToCloud: true});
                    };

                    function Speedmap(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize); 
                        
                        scl = [[0,'rgb(44, 255, 150)'],[0.1,'rgb(151, 255, 0)'],[0.2,'rgb(255, 234, 0)'],[0.5,'rgb(255, 111, 0)'],[1,'rgb(255, 0, 0)']];

                        function detail(currentOD, currentSpeed) {
                            var combinations = [];
                            for (let i = 0; i < currentOD.length; i++) {
                                combinations.push(currentOD[i] + '  '+'速度：' + currentSpeed[i]+'km/hr');
                            }
                            return combinations;
                            }

                        var origin = {
                            type: 'scattermapbox',
                            mode: 'markers',
                            lon: currentLon,
                            lat: currentLat,
                            text: currentSpeed, 
                            hoverinfo: 'text',
                            hovertext: detail(currentOD, currentSpeed),
                            marker: {
                                color: currentSpeed,
                                colorscale: scl,
                                cmin: 0,
                                cmax: 110,
                                reversescale: true,
                                opacity: 0.4,
                                size: 12,
                                colorbar:{
                                    x: 1,
                                    thickness: 10,
                                    outlinecolor: 'rgba(0,0,0,0)',
                                    ticks: 'outside',
                                    ticklen: 3,
                                    showticksuffix: 'last',
                                    ticksuffix: 'km/hr',
                                    dtick: 10,
                                    tickcolor: '#ffffff',
                                    bgcolor: 'rgba(0,0,0,0.8)',
                                    tickfont: {
                                        color: 'white',
                                    }
                                },
                            }
                        };

                        var data = [origin];

                        var layout = {
                            height: '780',
                            dragmode: "zoom",
                            mapbox: { style: "dark", center: { lat: 23.53, lon: 121 }, zoom: 6.5 },
                            margin: { r: 0, t: 0, b: 0, l: 0 },
                            title: {
                                text: '車速',
                                y: 0.95,
                                x: 0.05,
                                font: {
                                    color: 'white',
                                },
                            },
                        };
                        var config = {
                            mapboxAccessToken: "pk.eyJ1IjoicG8teWVuIiwiYSI6ImNreWF5ejFzNTAzNWYydXF4c3plYmM3ejgifQ.d-6gAZGZZCIR0sX83BypjQ"
                        };

                        Plotly.newPlot('speedmap', data, layout,config,{showSendToCloud: true});
                    }

                    function Totalmap(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize); 
                        
                        scl = [[0,'rgb(44, 255, 150)'],[0.1,'rgb(151, 255, 0)'],[0.2,'rgb(255, 234, 0)'],[0.5,'rgb(255, 111, 0)'],[1,'rgb(255, 0, 0)']];

                        function detail(currentOD, currentTotal) {
                            var combinations = [];
                            for (let i = 0; i < currentOD.length; i++) {
                                combinations.push(currentOD[i] + '  '+'車流量：' + currentTotal[i]+'台');
                            }
                            return combinations;
                            }

                        var origin = {
                            type: 'scattermapbox',
                            mode: 'markers',
                            name: 'hello',
                            lon: currentLon,
                            lat: currentLat,
                            text: currentTotal, 
                            hoverinfo: 'text',
                            hovertext: detail(currentOD, currentTotal),
                            marker: {
                                color: currentTotal,
                                colorscale: scl,
                                cmin: 0,
                                cmax: 5000,
                                reversescale: false,
                                opacity: 0.4,
                                size: 12,
                                colorbar:{
                                    x: 1,
                                    thickness: 10,
                                    outlinecolor: 'rgba(0,0,0,0)',
                                    ticks: 'outside',
                                    ticklen: 3,
                                    showticksuffix: 'last',
                                    ticksuffix: 'cars',
                                    dtick: 500,
                                    tickcolor: '#ffffff',
                                    bgcolor: 'rgba(0,0,0,0.8)',
                                    tickfont: {
                                        color: 'white',
                                    }
                                }
                            }
                        };

                        var data = [origin];

                        var layout = {
                            height: '720',
                            dragmode: "zoom",
                            mapbox: { style: "dark", center: { lat: 23.53, lon: 121 }, zoom: 6.5 },
                            margin: { r: 0, t: 0, b: 0, l: 0 },
                            title: {
                                text: '車流量',
                                y: 0.95,
                                x: 0.05,
                                font: {
                                    color: 'white',
                                },
                            },
                            
                        };
                        var config = {
                            mapboxAccessToken: "pk.eyJ1IjoicG8teWVuIiwiYSI6ImNreWF5ejFzNTAzNWYydXF4c3plYmM3ejgifQ.d-6gAZGZZCIR0sX83BypjQ"
                        };
                        
                        Plotly.newPlot('totalmap', data, layout,config,{showSendToCloud: true});
                    }

                    //selected input list
                    var innerContainer = document.querySelector('.container'),
                    // monthSelector = innerContainer.querySelector('.monthdata'),
                    daySelector = innerContainer.querySelector('.daydata'),
                    hourSelector = innerContainer.querySelector('.hourdata'),
                    laneSelector = innerContainer.querySelector('.lanedata'),
                    waySelector = innerContainer.querySelector('.waydata'),
                    sizeSelector = innerContainer.querySelector('.sizedata');
                    pressSelector = innerContainer.querySelector('.press');

                    // function assignOptions(textArray, selector) {
                    //     for (var i = 0; i < textArray.length;  i++) {
                    //         var currentOption = document.createElement('option');
                    //         currentOption.text = textArray[i];
                    //         selector.appendChild(currentOption);
                    //     }
                    // }

                    // // assignOptions(listofMonths, monthSelector);
                    // assignOptions(listofDays, daySelector);
                    // assignOptions(listofHours, hourSelector);
                    // assignOptions(listofLanes, laneSelector);
                    // assignOptions(listofWays, waySelector);
                    // assignOptions(listofSizes, sizeSelector);

                    function updateTime(){
                        totalPlot(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        speedPlot(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        Totalmap(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        Speedmap(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                    }

                    pressSelector.addEventListener('click',updateTime,false);
                });

                    
                    break;
                case "10":
                    Plotly.d3.csv('data/202110.csv', function(err, rows){
                        function unpack(rows, key) {
                            return rows.map(function(row) { return row[key]; });
                        }
                    // put all elements into list
                    var allDay = unpack(rows,'day'),
                    allMonth = unpack(rows, 'month'),
                    allHour = unpack(rows,'hour'),
                    allOD = unpack(rows, 'OD'),
                    allTotal = unpack(rows, 'total'),
                    allWay = unpack(rows,'way'),
                    allSize = unpack(rows,'size'),
                    allSpeed = unpack(rows,'speed'),
                    allLane = unpack(rows,'lane'),
                    allLat = unpack(rows,'lat'),
                    allLon = unpack(rows, 'lon'),

                    listofMonths = [],
                    currentMonth,

                    listofDays = [],
                    currentDay,

                    listofHours = [],
                    currentHour,

                    listofWays = [],
                    currentWay,

                    listofSizes = [],
                    currentSize,

                    listofLanes = [],
                    currentLane,

                    currentSpeed = [],
                    currentTotal = [],
                    currentOD = [],
                    currentLat = [],
                    currentLon = [];

                    // pick unique value as selection
                    for (var i = 0; i < allMonth.length; i++ ){
                        if (listofMonths.indexOf(allMonth[i]) === -1 ){
                            listofMonths.push(allMonth[i]);
                        }
                    }

                    for (var i = 0; i < allWay.length; i++ ){
                        if (listofWays.indexOf(allWay[i]) === -1 ){
                            listofWays.push(allWay[i]);
                        }
                    }

                    for (var i = 0; i < allSize.length; i++ ){
                        if (listofSizes.indexOf(allSize[i]) === -1 ){
                            listofSizes.push(allSize[i]);
                        }
                    }

                    for (var i = 0; i < allDay.length; i++ ){
                        if (listofDays.indexOf(allDay[i]) === -1 ){
                            listofDays.push(allDay[i]);
                        }
                    }

                    for (var i = 0; i < allHour.length; i++ ){
                        if (listofHours.indexOf(allHour[i]) === -1 ){
                            listofHours.push(allHour[i]);
                        }
                    }

                    for (var i = 0; i < allLane.length; i++ ){
                        if (listofLanes.indexOf(allLane[i]) === -1 ){
                            listofLanes.push(allLane[i]);
                        }
                    }

                    //selected input
                    function getData(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {

                        currentTotal = [];
                        currentOD = [];
                        currentSpeed = [];
                        currentLat= [];
                        currentLon= [];

                        for (var i = 0 ; i < allDay.length ; i++){
                            if (allDay[i] === chosenDay & allHour[i] === chosenHour  & allLane[i] === chosenLane & allWay[i] === chosenWay & allSize[i] === chosenSize) {
                                currentTotal.push(allTotal[i]);
                                currentOD.push(allOD[i]);
                                currentSpeed.push(allSpeed[i]);
                                currentLat.push(allLat[i]);
                                currentLon.push(allLon[i]);
                            }
                        } 
                    }

                    // Default
                    totalPlot('1','0','國道一號','N','大型車');
                    speedPlot('1','0','國道一號','N','大型車');
                    Speedmap('1','0','國道一號','N','大型車');
                    Totalmap('1','0','國道一號','N','大型車');

                    //Draw
                    function totalPlot(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize); 
                        var trace1 = {
                            x: currentOD,
                            y: currentTotal,
                            mode: 'lines+markers',
                            marker: {
                                size: 6, 
                                opacity: 0.5,
                                color: 'white',
                            },
                            line: {
                                color: 'white',
                            }
                        };

                        var data = [trace1];

                        var layout = {
                            height: '780',
                            title: '國道行車流量折線圖',
                            plot_bgcolor:"black",
                            paper_bgcolor:"#3c3c3c",
                            font: {
                                color: 'white',
                            },
                            xaxis:{
                                automargin: true,
                            },
                            
                        };

                        Plotly.newPlot('total', data, layout, {showSendToCloud: true});
                    };

                    function speedPlot(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {
                        getData( chosenDay,chosenHour, chosenLane,chosenWay, chosenSize); 
                        var trace1 = {
                            x: currentOD,
                            y: currentSpeed,
                            mode: 'lines+markers',
                            marker: {
                                size: 6, 
                                opacity: 0.5,
                                color: 'white',
                            },
                            line: {
                                color: 'white',
                            }
                        };

                        var data = [trace1];

                        var layout = {
                            height: '780',
                            title: '國道行車速度折線圖',
                            plot_bgcolor:"black",
                            paper_bgcolor:"#3c3c3c",
                            font: {
                                color: 'white',
                            },
                            xaxis:{
                                automargin: true,
                            },
                            
                        };

                        Plotly.newPlot('speed', data, layout, {showSendToCloud: true});
                    };

                    function Speedmap(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize); 
                        
                        scl = [[0,'rgb(44, 255, 150)'],[0.1,'rgb(151, 255, 0)'],[0.2,'rgb(255, 234, 0)'],[0.5,'rgb(255, 111, 0)'],[1,'rgb(255, 0, 0)']];

                        function detail(currentOD, currentSpeed) {
                            var combinations = [];
                            for (let i = 0; i < currentOD.length; i++) {
                                combinations.push(currentOD[i] + '  '+'速度：' + currentSpeed[i]+'km/hr');
                            }
                            return combinations;
                            }

                        var origin = {
                            type: 'scattermapbox',
                            mode: 'markers',
                            lon: currentLon,
                            lat: currentLat,
                            text: currentSpeed, 
                            hoverinfo: 'text',
                            hovertext: detail(currentOD, currentSpeed),
                            marker: {
                                color: currentSpeed,
                                colorscale: scl,
                                cmin: 0,
                                cmax: 110,
                                reversescale: true,
                                opacity: 0.4,
                                size: 12,
                                colorbar:{
                                    x: 1,
                                    thickness: 10,
                                    outlinecolor: 'rgba(0,0,0,0)',
                                    ticks: 'outside',
                                    ticklen: 3,
                                    showticksuffix: 'last',
                                    ticksuffix: 'km/hr',
                                    dtick: 10,
                                    tickcolor: '#ffffff',
                                    bgcolor: 'rgba(0,0,0,0.8)',
                                    tickfont: {
                                        color: 'white',
                                    }
                                },
                            }
                        };

                        var data = [origin];

                        var layout = {
                            height: '780',
                            dragmode: "zoom",
                            mapbox: { style: "dark", center: { lat: 23.53, lon: 121 }, zoom: 6.5 },
                            margin: { r: 0, t: 0, b: 0, l: 0 },
                            title: {
                                text: '車速',
                                y: 0.95,
                                x: 0.05,
                                font: {
                                    color: 'white',
                                },
                            },
                        };
                        var config = {
                            mapboxAccessToken: "pk.eyJ1IjoicG8teWVuIiwiYSI6ImNreWF5ejFzNTAzNWYydXF4c3plYmM3ejgifQ.d-6gAZGZZCIR0sX83BypjQ"
                        };

                        Plotly.newPlot('speedmap', data, layout,config,{showSendToCloud: true});
                    }

                    function Totalmap(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize); 
                        
                        scl = [[0,'rgb(44, 255, 150)'],[0.1,'rgb(151, 255, 0)'],[0.2,'rgb(255, 234, 0)'],[0.5,'rgb(255, 111, 0)'],[1,'rgb(255, 0, 0)']];

                        function detail(currentOD, currentTotal) {
                            var combinations = [];
                            for (let i = 0; i < currentOD.length; i++) {
                                combinations.push(currentOD[i] + '  '+'車流量：' + currentTotal[i]+'台');
                            }
                            return combinations;
                            }

                        var origin = {
                            type: 'scattermapbox',
                            mode: 'markers',
                            name: 'hello',
                            lon: currentLon,
                            lat: currentLat,
                            text: currentTotal, 
                            hoverinfo: 'text',
                            hovertext: detail(currentOD, currentTotal),
                            marker: {
                                color: currentTotal,
                                colorscale: scl,
                                cmin: 0,
                                cmax: 5000,
                                reversescale: false,
                                opacity: 0.4,
                                size: 12,
                                colorbar:{
                                    x: 1,
                                    thickness: 10,
                                    outlinecolor: 'rgba(0,0,0,0)',
                                    ticks: 'outside',
                                    ticklen: 3,
                                    showticksuffix: 'last',
                                    ticksuffix: 'cars',
                                    dtick: 500,
                                    tickcolor: '#ffffff',
                                    bgcolor: 'rgba(0,0,0,0.8)',
                                    tickfont: {
                                        color: 'white',
                                    }
                                }
                            }
                        };

                        var data = [origin];

                        var layout = {
                            height: '720',
                            dragmode: "zoom",
                            mapbox: { style: "dark", center: { lat: 23.53, lon: 121 }, zoom: 6.5 },
                            margin: { r: 0, t: 0, b: 0, l: 0 },
                            title: {
                                text: '車流量',
                                y: 0.95,
                                x: 0.05,
                                font: {
                                    color: 'white',
                                },
                            },
                            
                        };
                        var config = {
                            mapboxAccessToken: "pk.eyJ1IjoicG8teWVuIiwiYSI6ImNreWF5ejFzNTAzNWYydXF4c3plYmM3ejgifQ.d-6gAZGZZCIR0sX83BypjQ"
                        };
                        
                        Plotly.newPlot('totalmap', data, layout,config,{showSendToCloud: true});
                    }

                    //selected input list
                    var innerContainer = document.querySelector('.container'),
                    // monthSelector = innerContainer.querySelector('.monthdata'),
                    daySelector = innerContainer.querySelector('.daydata'),
                    hourSelector = innerContainer.querySelector('.hourdata'),
                    laneSelector = innerContainer.querySelector('.lanedata'),
                    waySelector = innerContainer.querySelector('.waydata'),
                    sizeSelector = innerContainer.querySelector('.sizedata');
                    pressSelector = innerContainer.querySelector('.press');

                    // function assignOptions(textArray, selector) {
                    //     for (var i = 0; i < textArray.length;  i++) {
                    //         var currentOption = document.createElement('option');
                    //         currentOption.text = textArray[i];
                    //         selector.appendChild(currentOption);
                    //     }
                    // }

                    // // assignOptions(listofMonths, monthSelector);
                    // assignOptions(listofDays, daySelector);
                    // assignOptions(listofHours, hourSelector);
                    // assignOptions(listofLanes, laneSelector);
                    // assignOptions(listofWays, waySelector);
                    // assignOptions(listofSizes, sizeSelector);

                    function updateTime(){
                        totalPlot(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        speedPlot(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        Totalmap(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        Speedmap(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                    }

                    pressSelector.addEventListener('click',updateTime,false);
                });

                    
                    break;
                case "11":
                    Plotly.d3.csv('data/202111.csv', function(err, rows){
                        function unpack(rows, key) {
                            return rows.map(function(row) { return row[key]; });
                        }
                    // put all elements into list
                    var allDay = unpack(rows,'day'),
                    allMonth = unpack(rows, 'month'),
                    allHour = unpack(rows,'hour'),
                    allOD = unpack(rows, 'OD'),
                    allTotal = unpack(rows, 'total'),
                    allWay = unpack(rows,'way'),
                    allSize = unpack(rows,'size'),
                    allSpeed = unpack(rows,'speed'),
                    allLane = unpack(rows,'lane'),
                    allLat = unpack(rows,'lat'),
                    allLon = unpack(rows, 'lon'),

                    listofMonths = [],
                    currentMonth,

                    listofDays = [],
                    currentDay,

                    listofHours = [],
                    currentHour,

                    listofWays = [],
                    currentWay,

                    listofSizes = [],
                    currentSize,

                    listofLanes = [],
                    currentLane,

                    currentSpeed = [],
                    currentTotal = [],
                    currentOD = [],
                    currentLat = [],
                    currentLon = [];

                    // pick unique value as selection
                    for (var i = 0; i < allMonth.length; i++ ){
                        if (listofMonths.indexOf(allMonth[i]) === -1 ){
                            listofMonths.push(allMonth[i]);
                        }
                    }

                    for (var i = 0; i < allWay.length; i++ ){
                        if (listofWays.indexOf(allWay[i]) === -1 ){
                            listofWays.push(allWay[i]);
                        }
                    }

                    for (var i = 0; i < allSize.length; i++ ){
                        if (listofSizes.indexOf(allSize[i]) === -1 ){
                            listofSizes.push(allSize[i]);
                        }
                    }

                    for (var i = 0; i < allDay.length; i++ ){
                        if (listofDays.indexOf(allDay[i]) === -1 ){
                            listofDays.push(allDay[i]);
                        }
                    }

                    for (var i = 0; i < allHour.length; i++ ){
                        if (listofHours.indexOf(allHour[i]) === -1 ){
                            listofHours.push(allHour[i]);
                        }
                    }

                    for (var i = 0; i < allLane.length; i++ ){
                        if (listofLanes.indexOf(allLane[i]) === -1 ){
                            listofLanes.push(allLane[i]);
                        }
                    }

                    //selected input
                    function getData(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {

                        currentTotal = [];
                        currentOD = [];
                        currentSpeed = [];
                        currentLat= [];
                        currentLon= [];

                        for (var i = 0 ; i < allDay.length ; i++){
                            if (allDay[i] === chosenDay & allHour[i] === chosenHour  & allLane[i] === chosenLane & allWay[i] === chosenWay & allSize[i] === chosenSize) {
                                currentTotal.push(allTotal[i]);
                                currentOD.push(allOD[i]);
                                currentSpeed.push(allSpeed[i]);
                                currentLat.push(allLat[i]);
                                currentLon.push(allLon[i]);
                            }
                        } 
                    }

                    // Default
                    totalPlot('1','0','國道一號','N','大型車');
                    speedPlot('1','0','國道一號','N','大型車');
                    Speedmap('1','0','國道一號','N','大型車');
                    Totalmap('1','0','國道一號','N','大型車');

                    //Draw
                    function totalPlot(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize); 
                        var trace1 = {
                            x: currentOD,
                            y: currentTotal,
                            mode: 'lines+markers',
                            marker: {
                                size: 6, 
                                opacity: 0.5,
                                color: 'white',
                            },
                            line: {
                                color: 'white',
                            }
                        };

                        var data = [trace1];

                        var layout = {
                            height: '780',
                            title: '國道行車流量折線圖',
                            plot_bgcolor:"black",
                            paper_bgcolor:"#3c3c3c",
                            font: {
                                color: 'white',
                            },
                            xaxis:{
                                automargin: true,
                            },
                            
                        };

                        Plotly.newPlot('total', data, layout, {showSendToCloud: true});
                    };

                    function speedPlot(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {
                        getData( chosenDay,chosenHour, chosenLane,chosenWay, chosenSize); 
                        var trace1 = {
                            x: currentOD,
                            y: currentSpeed,
                            mode: 'lines+markers',
                            marker: {
                                size: 6, 
                                opacity: 0.5,
                                color: 'white',
                            },
                            line: {
                                color: 'white',
                            }
                        };

                        var data = [trace1];

                        var layout = {
                            height: '780',
                            title: '國道行車速度折線圖',
                            plot_bgcolor:"black",
                            paper_bgcolor:"#3c3c3c",
                            font: {
                                color: 'white',
                            },
                            xaxis:{
                                automargin: true,
                            },
                            
                        };

                        Plotly.newPlot('speed', data, layout, {showSendToCloud: true});
                    };

                    function Speedmap(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize); 
                        
                        scl = [[0,'rgb(44, 255, 150)'],[0.1,'rgb(151, 255, 0)'],[0.2,'rgb(255, 234, 0)'],[0.5,'rgb(255, 111, 0)'],[1,'rgb(255, 0, 0)']];

                        function detail(currentOD, currentSpeed) {
                            var combinations = [];
                            for (let i = 0; i < currentOD.length; i++) {
                                combinations.push(currentOD[i] + '  '+'速度：' + currentSpeed[i]+'km/hr');
                            }
                            return combinations;
                            }

                        var origin = {
                            type: 'scattermapbox',
                            mode: 'markers',
                            lon: currentLon,
                            lat: currentLat,
                            text: currentSpeed, 
                            hoverinfo: 'text',
                            hovertext: detail(currentOD, currentSpeed),
                            marker: {
                                color: currentSpeed,
                                colorscale: scl,
                                cmin: 0,
                                cmax: 110,
                                reversescale: true,
                                opacity: 0.4,
                                size: 12,
                                colorbar:{
                                    x: 1,
                                    thickness: 10,
                                    outlinecolor: 'rgba(0,0,0,0)',
                                    ticks: 'outside',
                                    ticklen: 3,
                                    showticksuffix: 'last',
                                    ticksuffix: 'km/hr',
                                    dtick: 10,
                                    tickcolor: '#ffffff',
                                    bgcolor: 'rgba(0,0,0,0.8)',
                                    tickfont: {
                                        color: 'white',
                                    }
                                },
                            }
                        };

                        var data = [origin];

                        var layout = {
                            height: '780',
                            dragmode: "zoom",
                            mapbox: { style: "dark", center: { lat: 23.53, lon: 121 }, zoom: 6.5 },
                            margin: { r: 0, t: 0, b: 0, l: 0 },
                            title: {
                                text: '車速',
                                y: 0.95,
                                x: 0.05,
                                font: {
                                    color: 'white',
                                },
                            },
                        };
                        var config = {
                            mapboxAccessToken: "pk.eyJ1IjoicG8teWVuIiwiYSI6ImNreWF5ejFzNTAzNWYydXF4c3plYmM3ejgifQ.d-6gAZGZZCIR0sX83BypjQ"
                        };

                        Plotly.newPlot('speedmap', data, layout,config,{showSendToCloud: true});
                    }

                    function Totalmap(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize); 
                        
                        scl = [[0,'rgb(44, 255, 150)'],[0.1,'rgb(151, 255, 0)'],[0.2,'rgb(255, 234, 0)'],[0.5,'rgb(255, 111, 0)'],[1,'rgb(255, 0, 0)']];

                        function detail(currentOD, currentTotal) {
                            var combinations = [];
                            for (let i = 0; i < currentOD.length; i++) {
                                combinations.push(currentOD[i] + '  '+'車流量：' + currentTotal[i]+'台');
                            }
                            return combinations;
                            }

                        var origin = {
                            type: 'scattermapbox',
                            mode: 'markers',
                            name: 'hello',
                            lon: currentLon,
                            lat: currentLat,
                            text: currentTotal, 
                            hoverinfo: 'text',
                            hovertext: detail(currentOD, currentTotal),
                            marker: {
                                color: currentTotal,
                                colorscale: scl,
                                cmin: 0,
                                cmax: 5000,
                                reversescale: false,
                                opacity: 0.4,
                                size: 12,
                                colorbar:{
                                    x: 1,
                                    thickness: 10,
                                    outlinecolor: 'rgba(0,0,0,0)',
                                    ticks: 'outside',
                                    ticklen: 3,
                                    showticksuffix: 'last',
                                    ticksuffix: 'cars',
                                    dtick: 500,
                                    tickcolor: '#ffffff',
                                    bgcolor: 'rgba(0,0,0,0.8)',
                                    tickfont: {
                                        color: 'white',
                                    }
                                }
                            }
                        };

                        var data = [origin];

                        var layout = {
                            height: '720',
                            dragmode: "zoom",
                            mapbox: { style: "dark", center: { lat: 23.53, lon: 121 }, zoom: 6.5 },
                            margin: { r: 0, t: 0, b: 0, l: 0 },
                            title: {
                                text: '車流量',
                                y: 0.95,
                                x: 0.05,
                                font: {
                                    color: 'white',
                                },
                            },
                            
                        };
                        var config = {
                            mapboxAccessToken: "pk.eyJ1IjoicG8teWVuIiwiYSI6ImNreWF5ejFzNTAzNWYydXF4c3plYmM3ejgifQ.d-6gAZGZZCIR0sX83BypjQ"
                        };
                        
                        Plotly.newPlot('totalmap', data, layout,config,{showSendToCloud: true});
                    }

                    //selected input list
                    var innerContainer = document.querySelector('.container'),
                    // monthSelector = innerContainer.querySelector('.monthdata'),
                    daySelector = innerContainer.querySelector('.daydata'),
                    hourSelector = innerContainer.querySelector('.hourdata'),
                    laneSelector = innerContainer.querySelector('.lanedata'),
                    waySelector = innerContainer.querySelector('.waydata'),
                    sizeSelector = innerContainer.querySelector('.sizedata');
                    pressSelector = innerContainer.querySelector('.press');

       

                    function updateTime(){
                        totalPlot(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        speedPlot(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        Totalmap(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        Speedmap(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                    }

                    pressSelector.addEventListener('click',updateTime,false);
                });

                    
                    break;
                case "12":
                    Plotly.d3.csv('data/202112.csv', function(err, rows){
                        function unpack(rows, key) {
                            return rows.map(function(row) { return row[key]; });
                        }
                    // put all elements into list
                    var allDay = unpack(rows,'day'),
                    allMonth = unpack(rows, 'month'),
                    allHour = unpack(rows,'hour'),
                    allOD = unpack(rows, 'OD'),
                    allTotal = unpack(rows, 'total'),
                    allWay = unpack(rows,'way'),
                    allSize = unpack(rows,'size'),
                    allSpeed = unpack(rows,'speed'),
                    allLane = unpack(rows,'lane'),
                    allLat = unpack(rows,'lat'),
                    allLon = unpack(rows, 'lon'),

                    listofMonths = [],
                    currentMonth,

                    listofDays = [],
                    currentDay,

                    listofHours = [],
                    currentHour,

                    listofWays = [],
                    currentWay,

                    listofSizes = [],
                    currentSize,

                    listofLanes = [],
                    currentLane,

                    currentSpeed = [],
                    currentTotal = [],
                    currentOD = [],
                    currentLat = [],
                    currentLon = [];

                    // pick unique value as selection
                    for (var i = 0; i < allMonth.length; i++ ){
                        if (listofMonths.indexOf(allMonth[i]) === -1 ){
                            listofMonths.push(allMonth[i]);
                        }
                    }

                    for (var i = 0; i < allWay.length; i++ ){
                        if (listofWays.indexOf(allWay[i]) === -1 ){
                            listofWays.push(allWay[i]);
                        }
                    }

                    for (var i = 0; i < allSize.length; i++ ){
                        if (listofSizes.indexOf(allSize[i]) === -1 ){
                            listofSizes.push(allSize[i]);
                        }
                    }

                    for (var i = 0; i < allDay.length; i++ ){
                        if (listofDays.indexOf(allDay[i]) === -1 ){
                            listofDays.push(allDay[i]);
                        }
                    }

                    for (var i = 0; i < allHour.length; i++ ){
                        if (listofHours.indexOf(allHour[i]) === -1 ){
                            listofHours.push(allHour[i]);
                        }
                    }

                    for (var i = 0; i < allLane.length; i++ ){
                        if (listofLanes.indexOf(allLane[i]) === -1 ){
                            listofLanes.push(allLane[i]);
                        }
                    }

                    //selected input
                    function getData(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {

                        currentTotal = [];
                        currentOD = [];
                        currentSpeed = [];
                        currentLat= [];
                        currentLon= [];

                        for (var i = 0 ; i < allDay.length ; i++){
                            if (allDay[i] === chosenDay & allHour[i] === chosenHour  & allLane[i] === chosenLane & allWay[i] === chosenWay & allSize[i] === chosenSize) {
                                currentTotal.push(allTotal[i]);
                                currentOD.push(allOD[i]);
                                currentSpeed.push(allSpeed[i]);
                                currentLat.push(allLat[i]);
                                currentLon.push(allLon[i]);
                            }
                        } 
                    }

                    // Default
                    totalPlot('1','0','國道一號','N','大型車');
                    speedPlot('1','0','國道一號','N','大型車');
                    Speedmap('1','0','國道一號','N','大型車');
                    Totalmap('1','0','國道一號','N','大型車');

                    //Draw
                    function totalPlot(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize); 
                        var trace1 = {
                            x: currentOD,
                            y: currentTotal,
                            mode: 'lines+markers',
                            marker: {
                                size: 6, 
                                opacity: 0.5,
                                color: 'white',
                            },
                            line: {
                                color: 'white',
                            }
                        };

                        var data = [trace1];

                        var layout = {
                            height: '780',
                            title: '國道行車流量折線圖',
                            plot_bgcolor:"black",
                            paper_bgcolor:"#3c3c3c",
                            font: {
                                color: 'white',
                            },
                            xaxis:{
                                automargin: true,
                            },
                            
                        };

                        Plotly.newPlot('total', data, layout, {showSendToCloud: true});
                    };

                    function speedPlot(chosenDay,chosenHour, chosenLane,chosenWay, chosenSize) {
                        getData( chosenDay,chosenHour, chosenLane,chosenWay, chosenSize); 
                        var trace1 = {
                            x: currentOD,
                            y: currentSpeed,
                            mode: 'lines+markers',
                            marker: {
                                size: 6, 
                                opacity: 0.5,
                                color: 'white',
                            },
                            line: {
                                color: 'white',
                            }
                        };

                        var data = [trace1];

                        var layout = {
                            height: '780',
                            title: '國道行車速度折線圖',
                            plot_bgcolor:"black",
                            paper_bgcolor:"#3c3c3c",
                            font: {
                                color: 'white',
                            },
                            xaxis:{
                                automargin: true,
                            },
                            
                        };

                        Plotly.newPlot('speed', data, layout, {showSendToCloud: true});
                    };

                    function Speedmap(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize); 
                        
                        scl = [[0,'rgb(44, 255, 150)'],[0.1,'rgb(151, 255, 0)'],[0.2,'rgb(255, 234, 0)'],[0.5,'rgb(255, 111, 0)'],[1,'rgb(255, 0, 0)']];

                        function detail(currentOD, currentSpeed) {
                            var combinations = [];
                            for (let i = 0; i < currentOD.length; i++) {
                                combinations.push(currentOD[i] + '  '+'速度：' + currentSpeed[i]+'km/hr');
                            }
                            return combinations;
                            }

                        var origin = {
                            type: 'scattermapbox',
                            mode: 'markers',
                            lon: currentLon,
                            lat: currentLat,
                            text: currentSpeed, 
                            hoverinfo: 'text',
                            hovertext: detail(currentOD, currentSpeed),
                            marker: {
                                color: currentSpeed,
                                colorscale: scl,
                                cmin: 0,
                                cmax: 110,
                                reversescale: true,
                                opacity: 0.4,
                                size: 12,
                                colorbar:{
                                    x: 1,
                                    thickness: 10,
                                    outlinecolor: 'rgba(0,0,0,0)',
                                    ticks: 'outside',
                                    ticklen: 3,
                                    showticksuffix: 'last',
                                    ticksuffix: 'km/hr',
                                    dtick: 10,
                                    tickcolor: '#ffffff',
                                    bgcolor: 'rgba(0,0,0,0.8)',
                                    tickfont: {
                                        color: 'white',
                                    }
                                },
                            }
                        };

                        var data = [origin];

                        var layout = {
                            height: '780',
                            dragmode: "zoom",
                            mapbox: { style: "dark", center: { lat: 23.53, lon: 121 }, zoom: 6.5 },
                            margin: { r: 0, t: 0, b: 0, l: 0 },
                            title: {
                                text: '車速',
                                y: 0.95,
                                x: 0.05,
                                font: {
                                    color: 'white',
                                },
                            },
                        };
                        var config = {
                            mapboxAccessToken: "pk.eyJ1IjoicG8teWVuIiwiYSI6ImNreWF5ejFzNTAzNWYydXF4c3plYmM3ejgifQ.d-6gAZGZZCIR0sX83BypjQ"
                        };

                        Plotly.newPlot('speedmap', data, layout,config,{showSendToCloud: true});
                    }

                    function Totalmap(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize) {
                        getData(chosenDay,chosenHour, chosenLane, chosenWay, chosenSize); 
                        
                        scl = [[0,'rgb(44, 255, 150)'],[0.1,'rgb(151, 255, 0)'],[0.2,'rgb(255, 234, 0)'],[0.5,'rgb(255, 111, 0)'],[1,'rgb(255, 0, 0)']];

                        function detail(currentOD, currentTotal) {
                            var combinations = [];
                            for (let i = 0; i < currentOD.length; i++) {
                                combinations.push(currentOD[i] + '  '+'車流量：' + currentTotal[i]+'台');
                            }
                            return combinations;
                            }

                        var origin = {
                            type: 'scattermapbox',
                            mode: 'markers',
                            name: 'hello',
                            lon: currentLon,
                            lat: currentLat,
                            text: currentTotal, 
                            hoverinfo: 'text',
                            hovertext: detail(currentOD, currentTotal),
                            marker: {
                                color: currentTotal,
                                colorscale: scl,
                                cmin: 0,
                                cmax: 5000,
                                reversescale: false,
                                opacity: 0.4,
                                size: 12,
                                colorbar:{
                                    x: 1,
                                    thickness: 10,
                                    outlinecolor: 'rgba(0,0,0,0)',
                                    ticks: 'outside',
                                    ticklen: 3,
                                    showticksuffix: 'last',
                                    ticksuffix: 'cars',
                                    dtick: 500,
                                    tickcolor: '#ffffff',
                                    bgcolor: 'rgba(0,0,0,0.8)',
                                    tickfont: {
                                        color: 'white',
                                    }
                                }
                            }
                        };

                        var data = [origin];

                        var layout = {
                            height: '720',
                            dragmode: "zoom",
                            mapbox: { style: "dark", center: { lat: 23.53, lon: 121 }, zoom: 6.5 },
                            margin: { r: 0, t: 0, b: 0, l: 0 },
                            title: {
                                text: '車流量',
                                y: 0.95,
                                x: 0.05,
                                font: {
                                    color: 'white',
                                },
                            },
                            
                        };
                        var config = {
                            mapboxAccessToken: "pk.eyJ1IjoicG8teWVuIiwiYSI6ImNreWF5ejFzNTAzNWYydXF4c3plYmM3ejgifQ.d-6gAZGZZCIR0sX83BypjQ"
                        };
                        
                        Plotly.newPlot('totalmap', data, layout,config,{showSendToCloud: true});
                    }

                    //selected input list
                    var innerContainer = document.querySelector('.container'),
                    // monthSelector = innerContainer.querySelector('.monthdata'),
                    daySelector = innerContainer.querySelector('.daydata'),
                    hourSelector = innerContainer.querySelector('.hourdata'),
                    laneSelector = innerContainer.querySelector('.lanedata'),
                    waySelector = innerContainer.querySelector('.waydata'),
                    sizeSelector = innerContainer.querySelector('.sizedata');
                    pressSelector = innerContainer.querySelector('.press');




                    function updateTime(){
                        totalPlot(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        speedPlot(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        Totalmap(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                        Speedmap(daySelector.value, hourSelector.value, laneSelector.value, waySelector.value, sizeSelector.value);
                    }

                    pressSelector.addEventListener('click',updateTime,false);
                });

                    
                    break;
            }
        })
})