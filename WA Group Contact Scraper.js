// var obj = document.getElementsByClassName("infinite-list-viewport")[0].getElementsByClassName("infinite-list-item infinite-list-item-transition");
// var topOfList = document.getElementsByClassName("_2wP_Y");
// topOfList.scrollTop = 50;

// old = $("div.drawer-body").scrollTop()
// $("div.drawer-body").scrollTop(old + 72)

var obj = document.getElementsByClassName("RLfQR")[0].getElementsByClassName("_2wP_Y");

var data = [];

// $("html, body").scrollTop(0);

for (var i = 0; i < obj.length; i++) {
	var num = obj[i].getElementsByClassName("emojitext ellipsify")[0].title;
	// var img = obj[i].getElementsByClassName("avatar-image is-loaded")[0].src.replace("t=s", "t=l");
    var img = obj[i].getElementsByClassName("avatar-image is-loaded")[0];
    img = img.src.replace("t=s", "t=l");
	try { var name = obj[i].getElementsByClassName("emojitext screen-name-text")[0].outerText; }
	catch (err) { var name = "NO_NAME"; };
	try { var status = obj[i].getElementsByClassName("emojitext")[1].title }
	catch (err) { var status = "NONE" };
	data[i] = { num: num, name: name, img: img, status: status };
}
/* $(document).ready(function(){
    $('button').click(function(){
        var data = $('#txt').val();
        if(data == '')
            return;
        
        JSONToCSVConvertor(data, "Whatsapp Contacts", true);
    });
});
 */
// function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
//If JSONData is not an object then JSON.parse will parse the JSON string in an Object
// var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
var arrData = typeof data != 'object' ? JSON.parse(data) : data;
    
var CSV = '';    
//Set Report title in first row or line
    
// CSV += ReportTitle + '\r\n\n';
var ReportTitle = "Whatsapp Contacts";
CSV += ReportTitle + '\r\n\n';
// CSV += "Group Name : " + document.getElementsByClassName("input-wrapper locked")[0].getElementsByTagName("div")[1].innerHTML + '\r\n' + "Number of participants : " + obj.length + '\r\n\n';
CSV += "Group Name : " + document.evaluate('//*[@id="main"]/header/div[2]/div[1]/div/span', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML + '\r\n' + "Number of participants : " + obj.length + '\r\n\n';


//This condition will generate the Label/Header
// if (ShowLabel) {
if (true) {
	var row = "";
        
	//This loop will extract the label from 1st index of on array
	for (var index in arrData[0]) {
            
		//Now convert each value to string and comma-seprated
		row += index + ',';
	}

	row = row.slice(0, -1);
        
	//append Label row with line break
	CSV += row + '\r\n';
}
//1st loop is to extract each row
for (var i = 0; i < arrData.length; i++) {
	var row = "";
        
	//2nd loop will extract each column and convert it in string comma-seprated
	for (var index in arrData[i]) {
		row += '"' + arrData[i][index] + '",';
	}
	row.slice(0, row.length - 1);
        
	//add a line break after each row
	CSV += row + '\r\n';
        
}
/*     if (CSV == '') {        
        alert("Invalid data");
        return;
    }    */
    
//Generate a file name
var fileName = "WAGroup_";
//this will remove the blank-spaces from the title and replace it with an underscore
// fileName += document.getElementsByClassName("input-wrapper locked")[0].getElementsByTagName("div")[1].innerHTML.replace(/ /g,"_");   
fileName += document.evaluate('//*[@id="main"]/header/div[2]/div[1]/div/span', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML.replace(/ /g,"_");
    
//Initialize file format you want csv or xls
var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    
// Now the little tricky part.
// you can use either>> window.open(uri);
// but this will not work in some browsers
// or you will not get the correct file extension    
    
//this trick will generate a temp <a /> tag
var link = document.createElement("a");    
link.href = uri;
    
//set the visibility hidden so it will not effect on your web-layout
link.style = "visibility:hidden";
link.download = fileName + ".csv";
    
//this part will append the anchor tag and remove it after automatic click
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
// }
