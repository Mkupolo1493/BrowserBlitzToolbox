const binFileInput = document.getElementById("binput");
const decDump = document.getElementById("decdump");
const decDumpToggle = document.getElementById("decdump-toggle");
const tankTable = document.getElementById("tanks");
const missionTable = document.getElementById("missions");

binFileInput.addEventListener("change", function(e) {
    decDump.innerText = "Loading...";
    
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
        const dec = new Uint8Array(e.target.result);
        setTimeout(function() {
            let formatted = "";
            const nDigits = Math.ceil(Math.log10(dec.length / 4)); // i wish there was a constant for log₁₀4
            // also don't worry, dec.length is one greater than the maximum value so it accounts for adding 1 to the word numberings
            for (let i = 0; i < dec.length; i++) {
                if (i % 4 === 0) formatted += `${i ? '\n' : ''}Word ${(i / 4 + 1).toString().padStart(nDigits, " ")}:`;
                formatted += ` ${dec[i] ? '<span class="nonzero">' : '<span class="zero">'}${dec[i].toString().padStart(3, 0)}</span>`;
            }
            decDump.innerHTML = formatted;
            decDumpToggle.classList.remove("hidden");
    
            const lifeCount = document.createElement("h2");
            lifeCount.innerText = `${getInt(dec, 0)} starting lives (1P mode only)`;
            decDump.after(lifeCount);
    
            let currentRow, currentCell;
            
            for (let i = 1; i <= 420; i++) { // 420: 42[words per tank] * 10[number of tanks] (actually counts to Word 421 because indexes start at zero, but Word 1 is the life count so two wrongs make a right)
                if (i % 210 === 1) {
                    currentRow = document.createElement("tr");
                    tankTable.getElementsByTagName("tbody")[0].appendChild(currentRow);
                }
                if (i % 42 === 1) {
                    currentCell = document.createElement("td");
                    currentRow.appendChild(currentCell);
                }
                else currentCell.innerHTML += "<br>";
                currentCell.innerHTML += getInt(dec, i);
            }
            tankTable.classList.remove("hidden");
    
            for (let i = 421; i <= 2620; i += 22) { // 2620: 420 + 22[words per mission] * 100[number of missions]
                if (i % 110 === 91) {
                    currentRow = document.createElement("tr");
                    missionTable.getElementsByTagName("tbody")[0].appendChild(currentRow);
                }
                currentCell = document.createElement("td");
                currentRow.appendChild(currentCell);
    
                const missionN = (i - 399) / 22;
                
                currentCell.innerHTML = `<h2>Mission ${missionN}:</h2>${(missionN <= 20) ? "<h3>Singleplayer</h3>" : ''}`;
                
                currentCell.innerHTML += "Bonus tank for completion?" + (getInt(dec, i) ? ' <span class="bool-true">Yes</span>' : ' <span class="bool-false">No</span>');
                
                currentCell.innerHTML += "<br>1P tank spawns:";
                for (let j = 1; j <= 8; j++) {
                    currentCell.innerHTML += `<br>${j}. ${getTanks(dec, i + j + 1)}`;
                }
                
                currentCell.innerHTML += "<br>1P map: ";
                let mapL = getInt(dec, i + 18);
                let mapR = getInt(dec, i + 19);
                if (mapL === mapR) {
                    currentCell.innerHTML += mapL;
                }
                else {
                    currentCell.innerHTML += `Random ${mapL} - ${mapR}`;
                }
    
                if (missionN <= 20) {
                    currentCell.innerHTML += "<h3>Two-player</h3>";
                    currentCell.innerHTML += "2P mode: Bonus tank for completion?" + (getInt(dec, i + 1) ? ' <span class="bool-true">Yes</span>' : ' <span class="bool-false">No</span>');
        
                    currentCell.innerHTML += "<br>2P tank spawns:";
                    for (let j = 1; j <= 8; j++) {
                        currentCell.innerHTML += `<br>${j}. ${getTanks(dec, i + j + 9)}`;
                    }
                    
                    currentCell.innerHTML += "<br>2P map: ";
                    mapL = getInt(dec, i + 18);
                    mapR = getInt(dec, i + 19);
                    if (mapL === mapR) {
                        currentCell.innerHTML += mapL;
                    }
                    else {
                        currentCell.innerHTML += `Random ${mapL} - ${mapR}`;
                    }
                }
            }
            missionTable.classList.remove("hidden");
        }, 69);
    };
    reader.readAsArrayBuffer(file);
})

decDumpToggle.addEventListener("click", function() {
    if (decDump.classList.contains("hidden")) {
        decDump.classList.remove("hidden");
        decDumpToggle.innerHTML = "Hide Decimal Dump";
    }
    else {
        decDump.classList.add("hidden");
        decDumpToggle.innerHTML = "Show Decimal Dump";
    }
});