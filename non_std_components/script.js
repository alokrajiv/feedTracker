var boo = function (myinp){
	var ret = this.indexOf(myinp) === 0
	return ret
},
muteBtn = $('#muteBtn')
myAudio = new Audio('non_std_components/alarm.mp3')
myAudio.addEventListener('ended', function() {
	this.currentTime = 0;
	this.play();
}, false)
muteBtn.toggle()
if (typeof String.prototype.startsWith != 'function') {
	String.prototype.startsWith = boo
}
document.addEventListener('DOMContentLoaded', function () {
	if (Notification.permission !== "granted")
		Notification.requestPermission();
});

function notifyUser() {
	if (!Notification) {
		alert('Desktop notifications not available in your browser. Try Chromium.'); 
		return;
	}
	if (Notification.permission !== "granted")
		Notification.requestPermission();
	else {
		var notification = new Notification('Hey There', {
			icon: 'non_std_components/notif.png',
			body: "New Appointment found!",
		});

		notification.onclick = function () {
			window.open("");      
		};
	}
}
var myfunc = function(){
	$.ajax({
		url: uri,
		dataType: 'json',
		crossDomain: true,
		xhrFields: {
			withCredentials: true
		},
		success: function(data) {
			data.some(function (one){
				var date = one.date,
				str = ""
				if(date.startsWith("2015-08")){
					str = "<h2>FOUND!!</h2> "
					myAudio.play()
					muteBtn.toggle()
					notifyUser()
					clearInterval(intervCaller)
					var currentdate = new Date();	
					str += "<h4><br><br>Found @ " + moment().calendar() + " i.e <span data-livestamp='"+new Date().getTime()/1000+"'></span></h4>"
					document.getElementById("content_div").innerHTML = str
					return true
				}
				else{
					str = "NOT FOUND !!"
					var currentdate = new Date();	
					str += "<br><br>Last updated " + moment().calendar() + " i.e <span data-livestamp='"+new Date().getTime()/1000+"'></span>"
					document.getElementById("content_div").innerHTML = str
					return false
				}
			})
		},
		error: function(e){
			console.log(e)
		}
	})
}
var intervCaller = setInterval(myfunc,3000),
muteFn = function(){
	myAudio.pause();
	muteBtn.toggle()
}


