getHistory();

document.getElementById('inpt').onkeydown = function(event) {
    if (event.keyCode == 13) {
        
        let message = document.getElementById('inpt').value;
        document.getElementById('inpt').value = "";

        fetch("/api/send", {
          method: "POST",
          body: message
        }) 

        getHistory();
   }
}

function send() {
  let message = document.getElementById('inpt').value;
  document.getElementById('inpt').value = "";

  fetch("/api/send", {
    method: "POST",
    body: message
  }) 

  getHistory();
}


function getHistory() {
  let maxMessages = 20;
  let histDiv = document.getElementById("history");

  let data = fetch("/api/getmessages").then((response) => response.json()).then((data) => {

    if ( data.length >= maxMessages ) {
     data = data.slice(-maxMessages)
    }

    var child = histDiv.lastElementChild; 
    while (child) {
      histDiv.removeChild(child);
      child = histDiv.lastElementChild;
    }
    
    for (i in data) {
      let newP = document.createElement("p");
      histDiv.appendChild(newP);
      let txt = document.createTextNode(data[i]);
      newP.appendChild(txt)
    }
  });

}

function startTimer() {
            timer = setInterval(function() {
               getHistory();
            }, 500);
}

startTimer();