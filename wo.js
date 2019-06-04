/*
This is a simple library js for consume Apis.
It isn't finished because the default methods are different for each proyect
and I hope a feedback
Check the sample.js, is simple.
*/

function woGet(url, params, { woEnd, wo200, wo204, wo400, wo404, wo500 }) {
    var _url = woUrlBuild(url, params);

    var req = new XMLHttpRequest();
    req.open('GET', _url, true);
    req.onreadystatechange = function(){
        woStateChange(req, { woEnd: woEnd, wo200: wo200, wo204: wo204, wo400: wo400, wo404: wo404, wo500: wo500});
    };
    req.send(null);
}

function woPost(url, params, jsonData, { woEnd, wo200, wo204, wo400, wo404, wo500 }) {
    var _url = woUrlBuild(url, params);

    var req = new XMLHttpRequest();
    req.open('POST', _url, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.onreadystatechange = function(){
        woStateChange(req, { woEnd: woEnd, wo200: wo200, wo204: wo204, wo400: wo400, wo404: wo404, wo500: wo500});
    };
    req.send(jsonData);
}

function woStateChange(req, { woEnd, wo200, wo204, wo400, wo404, wo500 }) {
    if (req.readyState === XMLHttpRequest.DONE) {

        var _jsonResponse = {};

        if (req.response !== "") {
            _jsonResponse = JSON.parse(req.response);
        }

        switch (req.status) {
            case 200:
                wo200 === undefined ? typeof wo200Default === "undefined" ? console.log("Please if you need created wo" + req.status + "Default method"): wo200Default(_jsonResponse): wo200(_jsonResponse);
                break;
            case 204:
                wo204 === undefined ? typeof wo204Default === "undefined" ? console.log("Please if you need created wo" + req.status + "Default method") : wo200Default(_jsonResponse) : wo204(_jsonResponse);
                break;
            case 400:
                wo400 === undefined ? typeof wo400Default === "undefined" ? console.log("Please if you need created wo" + req.status + "Default method") : wo400Default(_jsonResponse) : wo400(_jsonResponse);
                break;
            case 404:
                wo404 === undefined ? typeof wo404Default === "undefined" ? console.log("Please if you need created wo" + req.status + "Default method") : wo404Default(_jsonResponse) : wo404(_jsonResponse);
                break;
            case 500:
                wo500 === undefined ? typeof wo500Default === "undefined" ? console.log("Please if you need created wo" + req.status + "Default method") : wo500Default(_jsonResponse) : wo500(_jsonResponse);
                break;
        }

        woEnd === undefined ? typeof woEndDefault === "undefined" ? console.log("Please if you need created woEndDefault method") : woEndDefault(_jsonResponse) : woEnd(_jsonResponse);

    }
}

function woUrlBuild(url, params) {

    var _return = "";

    if (params !== undefined) {
        if (params !== null) {
            params.forEach(element => {
                _return = _return + element.name + "=" + element.value + "&";
            });

            _return = "?" + _return.substr(0, _return.length - 1);
        }
    }

    _return = url + _return;

    return _return;
}

//function wo200Def() {
//    console.log("Please configure 200 Default");
//}

//function wo400Def() {
//    console.log("Please configure 400 Default");
//}

//function wo404Def() {
//    console.log("Please configure 404 Default");
//}

//function wo500Def() {
//    console.log("Please configure 500 Default");
//}

//function woEndDef() {
//    console.log("Please configure End Default");
//}

