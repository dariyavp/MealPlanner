document.addEventListener("DOMContentLoaded", function () {
    const listaPrzepisow = document.getElementById("listaPrzepisow");
    const zapisanePrzepisy = JSON.parse(localStorage.getItem("przepisy")) || [];

    if (listaPrzepisow) {
        zapisanePrzepisy.forEach(przepis => {
            const li = document.createElement("li");
            li.textContent = przepis.nazwa;
            listaPrzepisow.appendChild(li);
        });
    }

    const formularz = document.getElementById("formularzPrzepisu");
    if (formularz) {
        formularz.addEventListener("submit", function (e) {
            e.preventDefault();
            
            const nazwa = document.getElementById("nazwa").value;
            const skladniki = document.getElementById("skladniki").value;
            const instrukcje = document.getElementById("instrukcje").value;

            const nowyPrzepis = { nazwa, skladniki, instrukcje };
            zapisanePrzepisy.push(nowyPrzepis);
            localStorage.setItem("przepisy", JSON.stringify(zapisanePrzepisy));

            alert("Przepis dodany!");
            formularz.reset();
        });
    }
});
