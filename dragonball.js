document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = "https://dragonball-api.com/api/characters";
    const charactersListBody = document.getElementById("characters-list");
    const characterInfoContainer = document.getElementById("character-info");
    const searchNameInput = document.getElementById("search-name");
    const searchGenderInput = document.getElementById("search-gender");
    const searchRaceInput = document.getElementById("search-race");

    function fetchCharacterList(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                charactersListBody.innerHTML = ""; // Limpiar lista anterior
                data.forEach(character => {
                    const row = `<tr data-id="${character.id}"><td>${character.id}</td><td>${character.name}</td></tr>`;
                    charactersListBody.insertAdjacentHTML("beforeend", row);
                });
            })
            .catch(error => console.error("Error al obtener la lista de personajes:", error));
    }

    function fetchCharacterInfo(characterId) {
        fetch(`${apiUrl}/${characterId}`)
            .then(response => response.json())
            .then(data => {
                const characterInfo = `
                    <h2>${data.name}</h2>
                    <p>Gender: ${data.gender}</p>
                    <p>Race: ${data.race}</p>
                    <p>Origin: ${data.origin}</p>
                    <p>Abilities: ${data.abilities.join(", ")}</p>
                `;
                characterInfoContainer.innerHTML = characterInfo;
            })
            .catch(error => console.error("Error al obtener la información del personaje:", error));
    }

    function searchCharacters() {
        const name = searchNameInput.value;
        const gender = searchGenderInput.value;
        const race = searchRaceInput.value;
        const searchUrl = `${apiUrl}?name=${name}&gender=${gender}&race=${race}`;

        fetch(searchUrl)
            .then(response => response.json())
            .then(data => {
                charactersListBody.innerHTML = ""; // Limpiar lista anterior
                data.forEach(character => {
                    const row = `<tr data-id="${character.id}"><td>${character.id}</td><td>${character.name}</td></tr>`;
                    charactersListBody.insertAdjacentHTML("beforeend", row);
                });
            })
            .catch(error => console.error("Error al realizar la búsqueda:", error));
    }

    charactersListBody.addEventListener("click", event => {
        const row = event.target.closest("tr");
        if (row) {
            const characterId = row.getAttribute("data-id");
            fetchCharacterInfo(characterId);
        }
    });

    document.getElementById("search-btn").addEventListener("click", searchCharacters);

    fetchCharacterList(apiUrl); // Cargar la lista inicial de personajes
});
