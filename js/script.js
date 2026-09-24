/* =========================================================
   CHARACTER DATA
========================================================= */

const characters = [

    {
        nickname: "Altair",

        name: "Alastair Ceilo",

        quote: "Duniaku ada disini, di langit penuh harap ini. ",

        age: "18",

        role: "The Prince",

        origin: "Nevare",

        image: "assets/characters/alastair.jpg",

        background:
            "Bintang fajar milik Nevare yang tak pernah pendar. Berbekal kenangan, senjata utamanya untuk mengambil dendam."
    },


    {
        nickname: "Van",

        name: "Evander Heiz",

        quote: "Jadi kalian bukan manusia, lalu kenapa?",

        age: "32",

        role: "Anchor",

        origin: "Nevare",

        image: "assets/characters/van.jpg",

        background:
            "Hanya detektif swasta yang gasuka minum teh. Seperti siapapun yang mencari kebenaran, musuh utamanya adalah Dusta."
    },


    {
        nickname: "Bell ",

        name: "Bellerophon Rayford",

        quote: "Aku orang yang adil, tahu.",

        age: "Unknown",

        role: "Poker Face",

        origin: "Azenor",

        image: "assets/characters/bell.jpg",

        background:
            "Orang yang memastikan semua orang di sekitarnya punya cukup cahaya — sambil menyembunyikan temaramnya sendiri di antara senja."
    },


    // {
    //     nickname: "NESSA",

    //     name: "Vanessa",

    //     quote: "You don't need to understand everything.",

    //     age: "Unknown",

    //     role: "Unknown",

    //     origin: "Nevare",

    //     image: "assets/characters/nessa.jpg",

    //     background:
    //         "Vanessa is one of the figures whose presence gradually becomes important to the story of Nevare. She carries her own history and perspective, often approaching events from an angle that differs from those around her. Her story is closely tied to the people she chooses to remain beside."
    // }

];


/* =========================================================
   DOM ELEMENTS
========================================================= */

const characterGrid =
    document.getElementById("characterGrid");

const characterModal =
    document.getElementById("characterModal");

const modalOverlay =
    document.getElementById("modalOverlay");

const modalClose =
    document.getElementById("modalClose");


const modalImage =
    document.getElementById("modalImage");

const modalImagePlaceholder =
    document.getElementById("modalImagePlaceholder");


const modalName =
    document.getElementById("modalName");

const modalQuote =
    document.getElementById("modalQuote");

const modalFullName =
    document.getElementById("modalFullName");

const modalAge =
    document.getElementById("modalAge");

const modalRole =
    document.getElementById("modalRole");

const modalOrigin =
    document.getElementById("modalOrigin");

const modalBackground =
    document.getElementById("modalBackground");


/* =========================================================
   CREATE CHARACTER CARD
========================================================= */

function createCharacterCard(character, index) {

    const card = document.createElement("article");

    card.classList.add("character-card");

    card.setAttribute("tabindex", "0");

    card.setAttribute(
        "aria-label",
        `View profile of ${character.name}`
    );


    /* Image container */

    const imageContainer =
        document.createElement("div");

    imageContainer.classList.add(
        "card-image-container"
    );


    /* Image */

    const image =
        document.createElement("img");

    image.classList.add("card-image");

    image.src = character.image;

    image.alt = `${character.name} character portrait`;

    image.loading = "lazy";


    /* Placeholder */

    const placeholder =
        document.createElement("div");

    placeholder.classList.add(
        "image-placeholder"
    );

    placeholder.textContent =
        character.nickname;


    /*
        Kalau gambar belum tersedia,
        placeholder akan muncul.
    */

    image.addEventListener("error", () => {

        image.style.display = "none";

        placeholder.style.display = "flex";

    });


    imageContainer.appendChild(image);

    imageContainer.appendChild(placeholder);


    /* Card information */

    const information =
        document.createElement("div");

    information.classList.add(
        "card-information"
    );


    const nickname =
        document.createElement("h2");

    nickname.classList.add(
        "card-nickname"
    );

    nickname.textContent =
        character.nickname;


    const quote =
        document.createElement("p");

    quote.classList.add(
        "card-quote"
    );

    quote.textContent =
        `"${character.quote}"`;


    const line =
        document.createElement("div");

    line.classList.add(
        "card-line"
    );


    information.appendChild(nickname);

    information.appendChild(quote);

    information.appendChild(line);


    /* Build card */

    card.appendChild(imageContainer);

    card.appendChild(information);


    /* Click */

    card.addEventListener("click", () => {

        openCharacterModal(character);

    });


    /* Keyboard accessibility */

    card.addEventListener("keydown", (event) => {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            openCharacterModal(character);

        }

    });


    return card;
}


/* =========================================================
   RENDER CHARACTERS
========================================================= */

function renderCharacters() {

    characterGrid.innerHTML = "";


    characters.forEach((character, index) => {

        const card =
            createCharacterCard(
                character,
                index
            );

        characterGrid.appendChild(card);

    });

}


/* =========================================================
   OPEN MODAL
========================================================= */

function openCharacterModal(character) {

    /* Update image */

    modalImage.src = character.image;

    modalImage.alt =
        `${character.name} character portrait`;


    modalImage.style.display = "block";

    modalImagePlaceholder.style.display =
        "none";


    /*
        Fallback apabila image belum ada
    */

    modalImage.onerror = () => {

        modalImage.style.display = "none";

        modalImagePlaceholder.style.display =
            "flex";

        modalImagePlaceholder.textContent =
            character.nickname;

    };


    /* Update text */

    modalName.textContent =
        character.name;

    modalQuote.textContent =
        `"${character.quote}"`;

    modalFullName.textContent =
        character.name;

    modalAge.textContent =
        character.age;

    modalRole.textContent =
        character.role;

    modalOrigin.textContent =
        character.origin;

    modalBackground.textContent =
        character.background;


    /* Show modal */

    characterModal.classList.add("active");

    characterModal.setAttribute(
        "aria-hidden",
        "false"
    );


    /* Prevent background scrolling */

    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeCharacterModal() {

    characterModal.classList.remove(
        "active"
    );

    characterModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}


/* =========================================================
   EVENT LISTENERS
========================================================= */

modalClose.addEventListener(
    "click",
    closeCharacterModal
);


modalOverlay.addEventListener(
    "click",
    closeCharacterModal
);


/*
    Close modal menggunakan ESC
*/

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            characterModal.classList.contains("active")
        ) {

            closeCharacterModal();

        }

    }
);


/* =========================================================
   INITIALIZE WEBSITE
========================================================= */

renderCharacters();