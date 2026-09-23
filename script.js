document.addEventListener("DOMContentLoaded", function () {
    const animatedImage = document.querySelector(".animated-image");
    if (!animatedImage) return; // Gibt es nur auf der Startseite

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

    window.addEventListener("scroll", checkPosition, { passive: true });
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

    window.addEventListener("scroll", checkPosition, { passive: true });
    checkPosition();
});


async function fetchInstagramPosts() {
    const feed = document.getElementById("insta-feed");
    if (!feed) return; // Gibt es nur auf der Startseite

    let username = "efesgrillschwerte";
    let url = `https://www.instagram.com/${username}/embed`;

    let wrapper = document.createElement("div");
    wrapper.id = "insta-feed-wrapper"; // Wrapper für border-radius

    let iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.width = "100%";
    iframe.height = "600px";
    iframe.style.border = "none";
    iframe.title = "Instagram-Feed von Efes Grill Schwerte";
    iframe.loading = "lazy";

    wrapper.appendChild(iframe);
    feed.appendChild(wrapper);
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
        const href = this.getAttribute("href");

        // Anker-, Telefon-, Mail- und externe Links ganz normal öffnen
        if (!href || href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:") ||
            this.target === "_blank" || /^https?:/.test(href) ||
            event.ctrlKey || event.metaKey || event.shiftKey) return;

        event.preventDefault(); // Verhindert direktes Springen

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


// Logo oben links: sanft nach oben scrollen
const headerLink = document.getElementById("headerlink");
if (headerLink) {
    headerLink.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}


// Heutigen Tag bei den Öffnungszeiten hervorheben (Zeitzone Schwerte)
(function () {
    const tage = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    const kurz = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "Europe/Berlin" }).format(new Date());
    const zeile = document.querySelector('.tag[data-tag="' + tage[kurz] + '"]');
    if (zeile) {
        zeile.classList.add("heute");
        zeile.setAttribute("aria-current", "date");
    }
})();
