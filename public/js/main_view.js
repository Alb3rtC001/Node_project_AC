$(document).ready(function(){
    const terminal = document.getElementById('terminal');
    const commandInput = document.getElementById('commandInput');

    commandInput.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
            const command = commandInput.value;
            commandInput.value = '';
            terminal.innerHTML += `<div>$ ${command}</div>`;

            try{
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
                }).error((error) =>{
                    console.log("Front error ", error);
                });
            }catch(error){

            }

            terminal.scrollTop = terminal.scrollHeight;
        }
    });

    function validationType(response){
        //console.log(response.split(","));
        if(response[0] == "["){
            let str_array = "";
            let array = response.replace("[","").replace("]","");
            array = array.split(",");
            console.log(array);
            for(res in array){
                str_array += `<div>${array[res]}</div>`;
            }
            return str_array;
        }else{
            return `<div>${response}</div>`;
        }
    }
});