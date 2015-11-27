/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        //open.onsuccess = function() {
        //    alert("onsuccess");
        //    // Start a new transaction
        //    var db = open.result;
        //    var tx = db.transaction("MyObjectStore", "readwrite");
        //    var store = tx.objectStore("MyObjectStore");
        //    //var index = store.index("NameIndex");
        //
        //    // Add some data
        //    store.put({url: 12345, name: {first: "John", last: "Doe"}, age: 42});
        //    store.put({id: 67890, name: {first: "Bob", last: "Smith"}, age: 35});
        //
        //    // Query the data
        //    var getJohn = store.get(12345);
        //    var getBob = index.get(["Smith", "Bob"]);
        //
        //    getJohn.onsuccess = function() {
        //        console.log(getJohn.result.name.first);  // => "John"
        //    };
        //
        //    getBob.onsuccess = function() {
        //        console.log(getBob.result.name.first);   // => "Bob"
        //    };
        //
        //    // Close the db when the transaction is done
        //    tx.oncomplete = function() {
        //        db.close();
        //    };
        //}
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        // This works on all devices/browsers, and uses IndexedDBShim as a final fallback
        //app.receivedEvent('deviceready');

        console.log(cordova.file);
        console.log(navigator.camera);
        app.wirteLog();




    },
    wirteLog:function(){
        var tmplogob;
        //alert(cordova.file.dataDirectory);
        Loger.write("your datas","mobovip","stores.txt");
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dir) {
            console.log("got main dir",dir);

            dir.getFile("log.txt", {create:true}, function(file) {
                console.log("got the file", file);
                tmplogob=file;

                Loger.writeLog(file,"App started");
            });
        });
        //调用摄像头
        document.getElementById('camera').onclick=function(){
            //alert("click");
            function onSuccess(imageData) {
                console.log('success');
                var image = document.getElementById('myImage');
                image.src = imageData;
                console.log(imageData);
            }

            function onFail(message) {
                alert('Failed because: ' + message);
            }
            navigator.camera.getPicture(onSuccess, onFail, {
                quality: 50,
                sourceType: Camera.PictureSourceType.CAMERA,
                destinationType: Camera.DestinationType.FILE_URI
            });
        };
        //调用二维码扫描器
        document.getElementById("barcode").onclick=function(){
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    alert(result.text);
                    //var s = "Result: " + result.text + "<br/>" +
                    //    "Format: " + result.format + "<br/>" +
                    //    "Cancelled: " + result.cancelled;
                    //resultDiv.innerHTML = s;
                },
                function (error) {
                    alert("Scanning failed: " + error);
                }
            );
        }

    },
    // Update DOM on a Received Event
    //receivedEvent: function(id) {
    //    var url='http://img2.imgtn.bdimg.com/it/u=2162766932,244861494&fm=21&gp=0.jpg';
    //    app.convertImgToBase64(url,function(img){
    //        //304
    //        //先根据url去取对应的图片缓存,如果存在就取出来,如果不存在,判断返回的img是否为空.如果不为空就直接保存到数据库并且设置到页面当中去
    //        //如果img为空,就算了.
    //        //{data:",url:",cache:"}
    //        var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    //        var open = indexedDB.open("ImageDatabase", 1);
    //        open.onupgradeneeded = function() {
    //            var db = open.result;
    //            var store = db.createObjectStore("MyObjectStore", {keyPath: "url"});
    //        };
    //        open.onsuccess=function(){
    //            var db = open.result;
    //            var tx = db.transaction("MyObjectStore", "readwrite");
    //            var store = tx.objectStore("MyObjectStore");
    //            var tmpimg=store.get(url);
    //            tmpimg.onsuccess=function(){
    //                if(tmpimg.result){
    //                    document.querySelector('img').setAttribute("src",tmpimg.result.cache);
    //                }else if(img){
    //                    var data={date:new Date(),url:url,cache:img};
    //                    store.put(data);
    //                    document.querySelector('img').setAttribute("src",img);
    //                }
    //            }
    //            tx.oncomplete = function() {
    //                db.close();
    //            };
    //        }
    //
    //        //$('img').attr("src",img);
    //    });
    //    //var parentElement = document.getElementById(id);
    //    //var listeningElement = parentElement.querySelector('.listening');
    //    //var receivedElement = parentElement.querySelector('.received');
    //    //
    //    //listeningElement.setAttribute('style', 'display:block;');
    //    //receivedElement.setAttribute('style', 'display:none;');
    //
    //    console.log('Received Event: ' + id);
    //},
    convertImgToBase64:function (url, callback, outputFormat){
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var img = new Image;
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img,0,0);
        var dataURL = canvas.toDataURL(outputFormat || 'image/png');
        callback.call(this, dataURL);
        canvas = null;
        img=null;
    };
    img.src = url;
    }
};

app.initialize();
