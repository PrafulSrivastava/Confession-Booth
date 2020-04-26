const constraints = window.constraints = {
  audio: true,
  video: true
};


var peer = new Peer({key: 'lwjd5qra8257b9',
		debug:3,
		config:{'iceServers':[
		{urls: 'stun:stun.l.google.com:19302'},
		{urls: 'stun:stun1.l.google.com:19302'},
		{urls: 'turn:numb.viagenie.ca',username:"professionalyeshua@gmail.com",credential:"389019_Praful"}
		]}});

peer.on('open',function(){
	$('#father-id').text(peer.id);
});

peer.on('call',function(call){
	call.answer(window.localStream);
	step3(call);
});

$(function(){
	$('#make-call').click(function(){
		var call = peer.call($('#callto-id').val(),window.localStream);
		step3(call);
	});
	$('#end-call').click(function(){
		window.existingCall.close();
		step2();
	});
	$('#step1-retry').click(function() {
		$('#step1-error').hide();
		step1();
	});
	step1();
});



 function step1(){
	
	    navigator.mediaDevices.getUserMedia({video: true, audio: true})
  		.then(stream => { 
  		  const video = document.querySelector('#father-video');
		  const videoTracks = stream.getVideoTracks();
		  console.log('Got stream with constraints:', constraints);
		  console.log(`Using video device: ${videoTracks[0].label}`);
		  window.localStream = stream; // make variable available to browser console
		  document.getElementById("father").innerHTML ="Hi streamer"
		  document.getElementById("father-video").srcObject =stream;
		  step2();}).catch(error => console.log(error));
	    	
    	
	 
}

function step2(){
	$('#step1','#step3').hide();
	$('#step2').show();
}

function step3(call){
	if(window.existingCall){
		window.existingCall.close();
	}
	call.on('stream',function(stream){
		document.getElementById("messenger-video").srcObject =stream;
	});
	window.existingCall= call;
	$('#step1','#step2').hide();
	$('#step3').show();
}