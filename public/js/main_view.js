$(document).ready(function(){
    const terminal = document.getElementById('terminal');
    const commandInput = document.getElementById('commandInput');
    const commandHistory = [];
    let historyIndex = -1;

    commandInput.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
            const command = commandInput.value.trim();
            if (command) {
                commandHistory.push(command);
                historyIndex = commandHistory.length;
                commandInput.value = '';
                terminal.innerHTML += `<div>$ ${command}</div>`;

                try {
                    fetch("/execute", {      
                        method: "POST",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({command})
                    }).then((response) => {
                        console.log(response);
                        return response.json()
                    }).then((result) => {
                        var str = JSON.stringify(result);
                        console.log(str);
                        terminal.innerHTML += validationType(str);
                    }).catch((error) =>{
                        console.log("Front error ", error);
                    });
                } catch (error) {
                    console.log("Error:", error);
                }

                terminal.scrollTop = terminal.scrollHeight;
            }
        } else if (event.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                commandInput.value = commandHistory[historyIndex];
            } else if (historyIndex === 0) {
                commandInput.value = commandHistory[historyIndex];
            }
        } else if (event.key === 'ArrowDown') {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                commandInput.value = commandHistory[historyIndex];
            } else if (historyIndex === commandHistory.length - 1) {
                historyIndex++;
                commandInput.value = '';
            }
        }
    });

    function validationType(response){
        if(response[0] == "["){
            let str_array = "";
            let array = response.replace("[","").replace("]","");
            array = array.split(",");
            console.log(array);
            for(let res in array){
                str_array += `<div>${array[res]}</div>`;
            }
            return str_array;
        } else {
            return `<div>${response}</div>`;
        }
    }
});
