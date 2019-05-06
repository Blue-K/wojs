

function woGet(url, params, { woEnd, wo200, wo400, wo404, wo500 }) {
    var _url = woUrlBuild(url, params);

    var req = new XMLHttpRequest();
    req.open('GET', _url, true);
    req.onreadystatechange = function(){
        woStateChange(req, {woEnd:woEnd, wo200: wo200, wo400: wo400, wo404: wo404, wo500: wo500});
    };
    req.send(null);
}

function woPost(url, params, jsonData, { woEnd, wo200, wo400, wo404, wo500 }) {
    var _url = woUrlBuild(url, params);

    var req = new XMLHttpRequest();
    req.open('POST', _url, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.onreadystatechange = function(){
        woStateChange(req, {woEnd:woEnd, wo200: wo200, wo400: wo400, wo404: wo404, wo500: wo500});
    };
    req.send(jsonData);
}

function woStateChange(req,{ woEnd, wo200, wo400, wo404, wo500 }) {
    if (req.readyState == XMLHttpRequest.DONE) {

        var _jsonResponse = {};

        if (req.response != "") {
            _jsonResponse = JSON.parse(req.response);
        }

        switch (req.status) {
            case 200:
                wo200 == undefined ? wo200Default() : wo200(_jsonResponse);
                break;
            case 400:
                wo400 == undefined ? wo400Default() : wo400(_jsonResponse);
                break;
            case 404:
                wo404 == undefined ? wo404Default() : wo404(_jsonResponse);
                break;
            case 500:
                wo500 == undefined ? wo500Default() : wo500(_jsonResponse);
                break;
        }

        woEnd == undefined ? woEndDefault() : woEnd(_jsonResponse);

    }
}

function woUrlBuild(url, params) {

    var _return = "";

    if (params != undefined) {
        if (params != null) {
            params.forEach(element => {
                _return = _return + element.name + "=" + element.value + "&";
            });

            _return = "?" + _return.substr(0, _return.length - 1);
        }
    }

    _return = url + _return;

    return _return;
}

function wo200Default() {
    alert("200 Default");
}

function wo400Default() {
    alert("400 Default");
}

function wo404Default() {
    alert("404 Default");
}

function wo500Default() {
    alert("500 Default");
}

function woEndDefault() {
}