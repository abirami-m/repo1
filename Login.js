function check(form)
{
	var reg=form.regNUM.value;
	var pno=form.pno.value;
	
	var url = "data.xlsx";
	var oReq = new XMLHttpRequest();
	oReq.open("GET", url, true);
	oReq.responseType = "arraybuffer";
	oReq.onload = function(e) 
	{
	var arraybuffer = oReq.response;

  var data = new Uint8Array(arraybuffer);
  var arr = new Array();
  for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
  var bstr = arr.join("");

  var workbook = XLSX.read(bstr, {type:"binary"});

  var first_sheet_name = workbook.SheetNames[0];

  var worksheet = workbook.Sheets[first_sheet_name];
  var obj=XLSX.utils.sheet_to_json(worksheet);
   console.log(obj.length+"\n"+obj[0].RegNUM+"\n"+reg);
  //console.log(XLSX.utils.sheet_to_json(worksheet));

  var flag=0,m,p=0,q=obj.length,vreg,vpno;
while(flag!=1 && p<=q)
{
	m=(p+q)/2;
	m=Math.floor(m);
	console.log(m);
	vreg=obj[m].RegNUM;
	vpno=obj[m].PNO;
	vreg=vreg.toString();
	vpno=vpno.toString();
	if(vreg==reg)
		flag=1;
	if(reg>vreg)
		p=m+1;
	else
		q=m-1;
}
username=obj[m].Name;
//________________________________________________________________________________________________
 if(flag==1)
 {
	 if( pno == vpno)
	{
		alert("Logged in as "+ username);
		window.open('home.html'); 
	}
	else
	{
		alert("Incorrect Phone Number");
	}
 }
 else
 {
	 alert("The entered reg num has not been registered");
 }
}
oReq.send();
}
var username;
document.getElementById("welcome").innerHTML="Welcome "+username+"!";
function add1(form)
{
	
}