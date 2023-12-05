const binFileInput = document.getElementById("binput");
const decDump = document.getElementById("decdump");
const decDumpToggle = document.getElementById("decdump-toggle");

binFileInput.addEventListener("change", function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const dec = new Uint8Array(e.target.result);
        
        let formatted = "";
        const nDigits = Math.ceil(Math.log10(dec.length / 4)); // i wish there was a constant for log₁₀4
        // also don't worry, dec.length is one greater than the maximum value so it accounts for adding 1 to the word numberings
        for (let i = 0; i < dec.length; i++) {
            if (i % 4 === 0) formatted += `\nWord ${(i / 4 + 1).toString().padStart(nDigits, " ")}:`;
            formatted += ` ${dec[i] ? '<span class="nonzero">' : '<span class="zero">'}${dec[i].toString().padStart(3, 0)}</span>`;
        }
       decDump.innerHTML = formatted;
    };
    reader.readAsArrayBuffer(file);
});

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