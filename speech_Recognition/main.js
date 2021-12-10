const texts = document.querySelector('.texts');

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

 recordButton.addEventListener("click", startRecording);

 function startRecording() {
    recognition.addEventListener('result', (e)=>{

        console.log(e);
 
        const text = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
        txtInput.value = text;
    });

    recognition.start();
 }


var txtInput = document.querySelector('#txtInput');
var voiceList = document.querySelector('#voiceList');
var btnSpeak = document.querySelector('#btnSpeak');
var stopSpeak=document.querySelector('#stop');
var locks=document.querySelector('#lock');
var synth = window.speechSynthesis;
var voices = [];

PopulateVoices();
if(speechSynthesis !== undefined){
    speechSynthesis.onvoiceschanged = PopulateVoices;
}

btnSpeak.addEventListener('click', (f)=> {
    var toSpeak = new SpeechSynthesisUtterance(txtInput.value);
    var selectedVoiceName = voiceList.selectedOptions[0].getAttribute('data-name');
    voices.forEach((voice)=>{
        if(voice.name === selectedVoiceName){
            toSpeak.voice = voice;
        }
    });
    synth.speak(toSpeak);
});
stopSpeak.addEventListener('click',func);
function func()
{
    synth.cancel();
}

function PopulateVoices(){
    voices = synth.getVoices();
    var selectedIndex = voiceList.selectedIndex < 0 ? 0 : voiceList.selectedIndex;
    voiceList.innerHTML = '';
    voices.forEach((voice)=>{
        var listItem = document.createElement('option');
        listItem.textContent = voice.name;
        listItem.setAttribute('data-lang', voice.lang);
        listItem.setAttribute('data-name', voice.name);
        voiceList.appendChild(listItem);
    });

    voiceList.selectedIndex = selectedIndex;
}

locks.addEventListener('click', ()=>{

   
    if (txtInput.disabled==true){  txtInput.disabled=false;
        txtInput.innerHTML="Lock Text";
    }
    else{  txtInput.disabled=true;
        txtInput.innerHTML="Edit Text"
    }
});

var dragValue;
function move(id){
    var element = document.getElementById("container");
    element.style.position = "absolute";
    element.onmousedown = function(){
        dragValue = element;
    }
    document.onmousemove = function(e){
        var x = e.pageX;
        var y = e.pageY;
        dragValue.style.left = x + "px";
        dragValue.style.top = y + "px";
    }
    document.onmouseup = function(e){
        dragValue=null;
    }
}






