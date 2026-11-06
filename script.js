const command = document.getElementById("command");
document.addEventListener("click", function() {
    command.focus();
});

const terminal = document.getElementById("terminal");

let mode = "";

let stage = "mode";

let shift = 0;

command.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const output = document.createElement("div");
        output.textContent = "> " + command.value;
        terminal.insertBefore(output, command.parentElement);

        if (stage === "mode" && command.value === "encrypt") {
            mode = "encrypt";
            stage = "shift";
            output.textContent += "\nencryption selected";
            output.textContent += "\nenter shift amount:";
            output.style.whiteSpace = "pre-line";
        } 
        else if (stage === "mode" && command.value === "decrypt") {
            mode = "decrypt"
            stage = "shift";
            output.textContent += "\ndecryption selected";
            output.textContent += "\nenter shift amount:";
            output.style.whiteSpace = "pre-line";
        } else if (stage === "mode") {
            output.textContent += "\ninvalid mode, try again:";
            output.style.whiteSpace = "pre-line";
        }

        else if (stage === "shift") {
            shift = Number(command.value);

            if (command.value.trim() === "" || !Number.isInteger(shift)) {
                output.textContent += "\ninvalid shift amount, try again:";
                output.style.whiteSpace = "pre-line";
                command.value = "";
                return;
            }

            stage = "message";
            output.textContent += "\nenter your message";
            output.style.whiteSpace = "pre-line";
        } else if (stage === "message") {
            fetch("/cipher", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    mode: mode,
                    shift: shift,
                    message: command.value
                })
            })
            .then(response => response.json())
            .then(data => {
                output.textContent += "\nresult: " + data.result;
                output.style.whiteSpace = "pre-line";
                stage = "mode";
                output.textContent += "\n\nwould you like to encrypt or decrypt?";
                terminal.scrollTop = terminal.scrollHeight;
            })
            .catch(error => {
                output.textContent += "\nerror: unable to process message...";
                output.style.whiteSpace = "pre-line";
                stage = "mode";
                output.textContent += "\nwould you like to encrypt or decrypt?";
            });
        }

        command.value = "";
        terminal.scrollTop = terminal.scrollHeight;

    }
})