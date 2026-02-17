let csvData = [];

// تحميل CSV مرة واحدة
fetch("library.csv")
.then(res => res.text())
.then(text => {
    csvData = text.split("\n").map(line => line.replace("\r","").split(","));
});

// 🔹 normalize text
function normalizeText(text) {
    text = text.toLowerCase().trim().replace(/\s+/g, "");

    text = text.replace(/[أإآ]/g, "ا");
    text = text.replace(/ة/g, "ه");
    text = text.replace(/ى/g, "ي");

    text = text.replace(/[\u064B-\u0652]/g, "");

    return text;
}
function openAbout(){
    document.getElementById("aboutWidget").style.display = "flex";
}

function closeAbout(){
    document.getElementById("aboutWidget").style.display = "none";
}
function checkEmail(){

    let email = document.getElementById("emailInput").value;

    if(email.endsWith("@sva.edu.eg")){
        document.getElementById("emailGate").style.display = "none";
    }
    else{
        document.getElementById("emailError").innerText =
        "لازم تستخدم إيميل المعهد!";
    }
}


function openSupport(){
    document.getElementById("supportWidget").style.display = "flex";
}

function closeSupport(){
    document.getElementById("supportWidget").style.display = "none";
}

// 🔹 normalize number
function normalizeNumber(num) {
    num = num.trim().replace(/\s/g, "");
    while (num.startsWith("0") && num.length > 1) {
        num = num.substring(1);
    }
    return num;
}

function search() {
    const key = document.getElementById("searchInput").value.trim();
    const column = parseInt(document.getElementById("columnSelect").value);
    const tbody = document.querySelector("#resultTable tbody");

    tbody.innerHTML = "";

    if (!key) {
        alert("Enter data to search");
        return;
    }

    const searchKey = (column === 1)
        ? normalizeNumber(key)
        : normalizeText(key);

    let found = false;

    csvData.forEach(row => {
        while (row.length < 17) row.push("");

        let match = false;

        if (column === 1) {
            const fileNum = normalizeNumber(row[1] || "");
            if (fileNum.includes(searchKey)) match = true;
        } else {
            const cell = normalizeText(row[column] || "");
            if (cell.includes(searchKey)) match = true;
        }

        if (match) {
            const tr = document.createElement("tr");

            for (let i = 0; i < 17; i++) {
                const td = document.createElement("td");
                td.textContent = (row[i] || "").trim();
                tr.appendChild(td);
            }

            tbody.appendChild(tr);
            found = true;
        }
    });

    if (!found) {
        alert("No matching records found");
    }
}
