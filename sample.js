//Samples

//1.Consume GET method in the API www.bestPlaceToWork.com/employees/?office=sales&state=actives
function getActiveEmployees(){
    
    var _params = [];
    _params.push({name:"office", value:"sales"});
    _params.push({name:"state", value:"active"});

    woGet("www.bestPlaceToWork.com/employees/", _params, {
        woEnd: this.stopProgressGif(),      
        wo200: this.doAfterGetEmployee()
    });

}

//2.Consume GET method in the API www.bestPlaceToWork.com/employees/
function getAllEmployees(){

    woGet("www.bestPlaceToWork.com/employees/", [], {
        woEnd: this.stopProgressGif(),      
        wo200: this.doAfterGetEmployee(),
        wo404: this.noEmployeeFound()
    });
}


function doAfterGetEmployee(){
    //... do something when finish and the http response code is 200 (ok)
}

function stopProgressGif(){
    //... do something when the request finish maybe ok maybe wrong
}

function noEmployeeFound(){
    alert("No employee found");
}