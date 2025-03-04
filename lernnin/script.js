document.addEventListener("DOMContentLoaded", function () {
    const animatedImage = document.querySelector(".animated-image");

    function triggerAnimation(isFirstLoad = false) {
        animatedImage.classList.remove("active", "first-load"); // Entferne vorherige Klassen
        void animatedImage.offsetWidth; // CSS-Neuladen erzwingen
        if (isFirstLoad) {
            animatedImage.classList.add("first-load"); // Längere Animation nur beim Start
        }
        animatedImage.classList.add("active");
    }

    function hideImage() {
        animatedImage.classList.remove("active"); // Bild verschwindet
    }

    function checkPosition() {
        const imagePosition = animatedImage.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (imagePosition < screenHeight && imagePosition > 0) {
            triggerAnimation();
        } else {
            hideImage();
        }
    }

    // **Animation mit längerer Dauer beim Laden**
    triggerAnimation(true);  

    window.addEventListener("scroll", checkPosition);
});





document.querySelectorAll("nav a").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");

        if (href.startsWith("#")) { // Nur scrollbare Links blockieren
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offset = 70;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        }
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const animatedElements = document.querySelectorAll("#rezensionid, #bewertung, .textkunden, .animated-image, .star, .textrezension h1, .item, .map, .map-container, .zeiten, .textueberuns h1, .textueberuns h3, #textlangueberuns, .underline, .underline4, .instagramtext, #insta-feed-wrapper");

    function checkPosition() {
        animatedElements.forEach((el) => {
            const position = el.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;

            if (position < screenHeight && position > 0) {
                // Wenn das Element sichtbar ist, erscheint es von unten
                el.classList.add("visible", "active");
                el.classList.remove("hidden");
            } else if (position < 0) {
                // Wenn das Element oben verschwindet, soll es nach oben rausgehen
                el.classList.add("hidden");
                el.classList.remove("visible", "active");
            } else {
                // Falls das Element noch nicht sichtbar ist
                el.classList.remove("visible", "hidden");
            }
        });
    }

    window.addEventListener("scroll", checkPosition);
    checkPosition();
});


async function fetchInstagramPosts() {
    let username = "efesgrillschwerte";
    let url = `https://www.instagram.com/${username}/embed`;

    let wrapper = document.createElement("div");
    wrapper.id = "insta-feed-wrapper"; // Wrapper für border-radius

    let iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.width = "100%";
    iframe.height = "600px";
    iframe.style.border = "none";

    wrapper.appendChild(iframe);
    document.getElementById("insta-feed").appendChild(wrapper);
}

fetchInstagramPosts();


document.addEventListener("DOMContentLoaded", function () {
    // Sicherstellen, dass die Seite immer scrollbar ist
    document.body.classList.remove("fade-out");
    document.body.style.overflow = "auto";

    // Nur auf index.html die Scroll-Position speichern und wiederherstellen
    if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
        // Scroll-Position speichern, bevor die Seite verlassen wird
        window.addEventListener("beforeunload", function () {
            sessionStorage.setItem("scrollPos", window.scrollY);
        });

        // Scroll-Position wiederherstellen
        let scrollPos = sessionStorage.getItem("scrollPos");
        if (scrollPos) {
            window.scrollTo(0, scrollPos);
            sessionStorage.removeItem("scrollPos"); // Nur einmal anwenden
        }
    }

    // Smooth Page Transition bei Klick auf Links
    function handlePageTransition(event) {
        event.preventDefault(); // Verhindert direktes Springen
        const href = this.getAttribute("href");

        if (href.startsWith("#")) return; // Falls es ein interner Anker-Link ist, ignorieren

        document.body.classList.add("fade-out"); // Fade-Out starten

        setTimeout(() => {
            window.location.href = href; // Nach der Animation weiterleiten
        }, 500); // Timeout sollte zur CSS-Transition passen
    }

    // Wende die Funktion auf ALLE Links an
    document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", handlePageTransition);
    });
});

// Sicherstellen, dass die Seite beim Zurückgehen wieder sichtbar ist
window.addEventListener("pageshow", function () {
    document.body.classList.remove("fade-out");
    document.body.style.overflow = "auto";
});

