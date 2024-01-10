const mapFileInput = document.getElementById("binput");
const decDump = document.getElementById("decdump");
const decDumpToggle = document.getElementById("decdump-toggle");

mapFileInput.value = null;

mapFileInput.addEventListener("change", function(e) {
    decDump.innerText = "Loading...";

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
        mapFileInput.classList.add("hidden");

        const dec = new Uint8Array(e.target.result);

        setTimeout(function() {
            let formatted = "";
            const nDigits = Math.ceil(Math.log10(dec.length / 4)); 
            for (let i = 0; i < dec.length; i++) {
                if (i % 4 === 0) formatted += `${i ? '\n' : ''}Word ${(i / 4 + 1).toString().padStart(nDigits, " ")}:`;
                formatted += ` ${dec[i] ? '<span class="nonzero">' : '<span class="zero">'}${dec[i].toString().padStart(3, 0)}</span>`;
            }
            decDump.innerHTML = formatted;
            decDumpToggle.classList.remove("hidden");

            const mapDimensions = document.createElement("h2");
            mapDimensions.innerHTML = `Map dimensions: ${getInt(dec, 0)}x${getInt(dec, 1)}`;
            document.body.appendChild(mapDimensions);

            const pq = document.createElement("h3");
            pq.innerHTML = `Mystery Values: P = ${getInt(dec, 2)}, Q = ${getInt(dec, 3)}`;
            document.body.appendChild(pq);
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