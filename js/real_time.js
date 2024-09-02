$(document).ready(function(){
    // -----------------------------------------------------------------------------
        // show base map
        var map = new ol.Map({            //create a OpenLayers Map object  
            target: 'map',         
            layers: [
            new ol.layer.Tile({
                source: new ol.source.XYZ({
                        crossOrigin: 'anonymous',
                        // url: 'https://mt{0-3}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
                        url:'https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m3!1e0!2sm!3i587316034!3m17!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy5lOmd8cC5jOiNmZmY1ZjVmNSxzLmU6bC5pfHAudjpvZmYscy5lOmwudC5mfHAuYzojZmY2MTYxNjEscy5lOmwudC5zfHAuYzojZmZmNWY1ZjUscy50OjIxfHMuZTpsLnQuZnxwLmM6I2ZmYmRiZGJkLHMudDoyfHMuZTpnfHAuYzojZmZlZWVlZWUscy50OjJ8cy5lOmwudC5mfHAuYzojZmY3NTc1NzUscy50OjQwfHMuZTpnfHAuYzojZmZlNWU1ZTUscy50OjQwfHMuZTpsLnQuZnxwLmM6I2ZmOWU5ZTllLHMudDozfHMuZTpnfHAuYzojZmZmZmZmZmYscy50OjUwfHMuZTpsLnQuZnxwLmM6I2ZmNzU3NTc1LHMudDo0OXxzLmU6Z3xwLmM6I2ZmZGFkYWRhLHMudDo0OXxzLmU6bC50LmZ8cC5jOiNmZjYxNjE2MSxzLnQ6NTF8cy5lOmwudC5mfHAuYzojZmY5ZTllOWUscy50OjY1fHMuZTpnfHAuYzojZmZlNWU1ZTUscy50OjY2fHMuZTpnfHAuYzojZmZlZWVlZWUscy50OjZ8cy5lOmd8cC5jOiNmZmM5YzljOSxzLnQ6NnxzLmU6bC50LmZ8cC5jOiNmZjllOWU5ZQ!4e0!5m1!5f2&key=AIzaSyDk4C4EBWgjuL1eBnJlu1J80WytEtSIags&token=8976' 
                    })
                }),
            ],

            view : new ol.View({
                center: ol.proj.transform([122.25,23.60],'EPSG:4326','EPSG:3857'),
                zoom: 6,
                extent: ol.proj.transformExtent([118,21.5,126,25.5],'EPSG:4326','EPSG:3857')
            }),

            keyboardEventTarget: document,
            
            
            // view: new ol.View({
            //     center: ol.proj.transform([122.25,23.60],'EPSG:4326','EPSG:3857'),
            //     zoom: 7.75
            //     })
        });



        // 讀取開放資料資源Json
        // -----------------------------------------------------------------------------
        const getAuthorizationHeader = function() {
            var AppID = 'NwBlADcAYwA5AGIANQA2AC0AZgA1ADAANAAtADQAOAA1ADEALQA4ADkAYQBlAC0AYQA5ADUAZABlADkAMQBhADAAZgAxADYA';
            var AppKey = 'OQA5AGIAYQAxADAANABhAC0AMgAxADgANQAtADQAYQA5ADYALQA5AGUAMQA2AC0AYgA2ADgAYgA4AGEANwAyADAANgAyADIA';

            var GMTString = new Date().toGMTString();
            var ShaObj = new jsSHA('SHA-1', 'TEXT');
            ShaObj.setHMACKey(AppKey, 'TEXT');
            ShaObj.update('x-date: ' + GMTString);
            var HMAC = ShaObj.getHMAC('B64');
            var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';

            return { 'Authorization': Authorization, 'X-Date': GMTString};
        }

        
        $('#real_time').change(function(){
            $.ajax({
                type: 'GET',
                url: 'https://traffic.transportdata.tw/MOTC/v2/Road/Traffic/Live/ETag/Freeway?&$format=JSON',
                dataType: 'json',
                headers: getAuthorizationHeader(),  // This is your header generator
                success: function(data_j) {
                    // console.log('success')
                    // console.log(data_j)

                    $.getJSON('./data/etc_road_link.geojson', function(data) {
                    // console.log(data['features'][0])
                        
                        try{
                            var mapLayers = map.getLayers().getArray();
                            mapLayers.forEach(function(layer){
                                map.removeLayer(layer)
                            });

                            var L =  new ol.layer.Tile({
                                source: new ol.source.XYZ({
                                    crossOrigin: 'anonymous',
                                    url:'https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m3!1e0!2sm!3i587316034!3m17!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy5lOmd8cC5jOiNmZmY1ZjVmNSxzLmU6bC5pfHAudjpvZmYscy5lOmwudC5mfHAuYzojZmY2MTYxNjEscy5lOmwudC5zfHAuYzojZmZmNWY1ZjUscy50OjIxfHMuZTpsLnQuZnxwLmM6I2ZmYmRiZGJkLHMudDoyfHMuZTpnfHAuYzojZmZlZWVlZWUscy50OjJ8cy5lOmwudC5mfHAuYzojZmY3NTc1NzUscy50OjQwfHMuZTpnfHAuYzojZmZlNWU1ZTUscy50OjQwfHMuZTpsLnQuZnxwLmM6I2ZmOWU5ZTllLHMudDozfHMuZTpnfHAuYzojZmZmZmZmZmYscy50OjUwfHMuZTpsLnQuZnxwLmM6I2ZmNzU3NTc1LHMudDo0OXxzLmU6Z3xwLmM6I2ZmZGFkYWRhLHMudDo0OXxzLmU6bC50LmZ8cC5jOiNmZjYxNjE2MSxzLnQ6NTF8cy5lOmwudC5mfHAuYzojZmY5ZTllOWUscy50OjY1fHMuZTpnfHAuYzojZmZlNWU1ZTUscy50OjY2fHMuZTpnfHAuYzojZmZlZWVlZWUscy50OjZ8cy5lOmd8cC5jOiNmZmM5YzljOSxzLnQ6NnxzLmU6bC50LmZ8cC5jOiNmZjllOWU5ZQ!4e0!5m1!5f2&key=AIzaSyDk4C4EBWgjuL1eBnJlu1J80WytEtSIags&token=8976' 
                                })
                            })

                            map.addLayer(L)

                        }catch(e){}

                        for (var i in data['features']){

                            // 創建物件 Url 供地圖圖取
                            let json = JSON.stringify(data['features'][i]);
                            json = [json];
                            let blob1 = new Blob(json, { type: "text/plain;charset=utf-8" });
                            let link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
                            link.href = URL.createObjectURL(blob1);

                            // 創建圖層
                            geojson_layer = new ol.layer.Vector({
                                source: new ol.source.Vector({
                                    url: link,
                                    format: new ol.format.GeoJSON()
                                })
                            });


                            // 處理一個站點無法配對的問題  ETagPairID
                            let cho = parseInt(document.getElementById('real_time').value);
                            // 請選擇車種
                            if (cho == -1){break}

                            try{ 
                                var speed = data_j['ETagPairLives'][i]["Flows"][cho]["SpaceMeanSpeed"]  
                            }catch(e){}
                                

                            // 選擇車速顏色配置
                            if (speed > 90){
                                geojson_layer.setStyle(new ol.style.Style({
                                    stroke: new ol.style.Stroke({
                                        color: 'green',
                                        width: 3
                                    }),
                                }));
                            }else if (speed == 0){
                                geojson_layer.setStyle(new ol.style.Style({
                                    stroke: new ol.style.Stroke({
                                        color: 'white',
                                        width: 3
                                    }),
                                }));
                            }else if (speed > 70 && speed <= 90){
                                geojson_layer.setStyle(new ol.style.Style({
                                    stroke: new ol.style.Stroke({
                                        color: 'yellow',
                                        width: 3
                                    }),
                                }));
                            }else if (speed > 40 && speed <= 70){
                                geojson_layer.setStyle(new ol.style.Style({
                                    stroke: new ol.style.Stroke({
                                        color: 'Orange',
                                        width: 3
                                    }),
                                }));
                            }else if (speed <= 40){
                                geojson_layer.setStyle(new ol.style.Style({
                                    stroke: new ol.style.Stroke({
                                        color: 'red',
                                        width: 3
                                    }),
                                }));
                            }
                                
                            map.addLayer(geojson_layer)
                        }
                    })
                }
            });     
        });  /**/



        $('#f_real_t').click(function(){
            
            document.getElementById('show_real_t').style.display = '';
            document.getElementById('functional_area').style.display = '';
            // document.getElementById('show_real_h').style.display = 'none';
            document.getElementById('selection_area').style.display = 'none';
            document.getElementById('totalmap').style.display = 'none';
            document.getElementById('speedmap').style.display = 'none';
            document.getElementById('speed').style.display = 'none';
            document.getElementById('total').style.display = 'none';
            
            

        })

        $('#f_real_h').click(function(){
            // document.getElementById('show_real_h').style.display = '';
            document.getElementById('selection_area').style.display = '';
            document.getElementById('show_real_t').style.display = 'none';
            document.getElementById('functional_area').style.display = 'none';
            document.getElementById('totalmap').style.display = '';
            document.getElementById('speedmap').style.display = '';
            document.getElementById('speed').style.display = '';
            document.getElementById('total').style.display = '';
            
        })


        
    })
