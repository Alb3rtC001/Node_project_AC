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
                        return response.json();
                    }).then((result) => {
                        try{
                            var str = "";
                            if(typeof(result) == "object" && result.message){
                                str = result.message;
                            }else{
                                str = JSON.stringify(result);
                            }
                            terminal.innerHTML += validationType(str);
                        }catch(error){console.log("Surgió un error en el front", error)}
                    }).catch((error) =>{
                        console.log("Entra al final aqui", error);
                        terminal.innerHTML += validationType(`Unknown command: ${command} <div>You should try: get -l<div>`);
                    });
                } catch (error) {
                    console.log("Error:", error);
                }
                setTimeout(() => {
                    terminal.scrollTop = terminal.scrollHeight;
                }, 30);
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
            for(let res in array){
                str_array += `<div>${array[res]}</div>`;
            }
            return str_array;
        } else {
            return `<div>${response}</div>`;
        }
    }
});
