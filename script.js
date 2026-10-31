
const legacyFormalShoesImage =
    "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=500&q=80";
const previousFormalShoesImage =
    "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=500&q=80";
const previousLadiesPartyHeelsImage =
    "https://images.unsplash.com/photo-1596702874230-b5706dfb5bc7?auto=format&fit=crop&w=500&q=80";
const pinkLadiesPartyHeelsImage =
    "https://images.unsplash.com/photo-1573100925118-870b8efc799d?auto=format&fit=crop&w=500&q=80";
const legacyPinkPartyTopImage =
    "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=500&q=80";
const pinkFloralDressImage =
    "https://images.unsplash.com/photo-1630579588100-af5d652c7e07?auto=format&fit=crop&w=500&q=80";

const defaultClothes = [
    {
        id: 1,
        name: "White Casual Shirt",
        category: "Tops",
        color: "White",
        occasions: ["Casual", "College", "Formal"],
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "Classic Blue Jeans",
        category: "Bottoms",
        color: "Blue",
        occasions: ["Casual", "College"],
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "Floral Summer Dress",
        category: "Dresses",
        color: "Pink",
        occasions: ["Casual", "Party"],
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "Everyday Sneakers",
        category: "Shoes",
        color: "White",
        occasions: ["Casual", "College"],
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        name: "Black Formal Trousers",
        category: "Bottoms",
        color: "Black",
        occasions: ["Formal", "College"],
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        name: "Pretty Pink Floral Dress",
        category: "Dresses",
        color: "Pink",
        occasions: ["Party", "Casual"],
        image: pinkFloralDressImage
    },
    {
        id: 7,
        name: "Elegant Evening Dress",
        category: "Dresses",
        color: "Black",
        occasions: ["Party", "Formal"],
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 8,
        name: "Pink Ladies' Party Heels",
        category: "Shoes",
        color: "Pink",
        occasions: ["Formal", "Party"],
        image: pinkLadiesPartyHeelsImage
    }
];

// Load saved data from the browser
function loadData(key, fallback) {
    try {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : fallback;
    } catch (error) {
        return fallback;
    }
}

let clothes = loadData("closetly-clothes", defaultClothes);
let favorites = loadData("closetly-favorites", []);
let currentCategory = "All";
let favoritesOnly = false;

function saveData() {
    localStorage.setItem("closetly-clothes", JSON.stringify(clothes));
    localStorage.setItem("closetly-favorites", JSON.stringify(favorites));
}

const roseEverydayTop = clothes.find(item =>
    item.name === "Rose Everyday Top" && item.color === "Rose Pink"
);
if (roseEverydayTop) {
    clothes = clothes.filter(item => item.id !== roseEverydayTop.id);
    favorites = favorites.filter(id => id !== roseEverydayTop.id);
    saveData();
}

const formalShoes = clothes.find(item => item.id === 8);
if (
    formalShoes &&
    (formalShoes.name === "Classic Formal Shoes" ||
        formalShoes.name === "Black Ladies' Party Heels" ||
        formalShoes.image === legacyFormalShoesImage ||
        formalShoes.image === previousFormalShoesImage ||
        formalShoes.image === previousLadiesPartyHeelsImage)
) {
    formalShoes.name = "Pink Ladies' Party Heels";
    formalShoes.color = "Pink";
    formalShoes.occasions = ["Formal", "Party"];
    formalShoes.image = pinkLadiesPartyHeelsImage;
    saveData();
}

const pinkPartyTop = clothes.find(item => item.id === 6);
if (
    pinkPartyTop &&
    (pinkPartyTop.name === "Pink Party Top" ||
        pinkPartyTop.image === legacyPinkPartyTopImage)
) {
    pinkPartyTop.name = "Pretty Pink Floral Dress";
    pinkPartyTop.category = "Dresses";
    pinkPartyTop.color = "Pink";
    pinkPartyTop.occasions = ["Party", "Casual"];
    pinkPartyTop.image = pinkFloralDressImage;
    saveData();
}

function renderWardrobe() {
    const grid = document.getElementById("wardrobe-grid");
    const emptyMessage = document.getElementById("empty-message");

    let filtered = clothes.filter(item => {
        const categoryMatches =
            currentCategory === "All" ||
            item.category === currentCategory;

        const favoriteMatches =
            !favoritesOnly || favorites.includes(item.id);

        return categoryMatches && favoriteMatches;
    });

    grid.replaceChildren();

    filtered.forEach(item => {
        const card = document.createElement("article");
        card.className = "clothing-card";

        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.name;
        img.loading = "lazy";
        img.onerror = () => {
            img.alt = "Image unavailable for " + item.name;
        };

        const info = document.createElement("div");
        info.className = "card-info";

        const title = document.createElement("h3");
        title.textContent = item.name;

        const details = document.createElement("p");
        details.textContent = item.category + " · " + item.color;

        const actions = document.createElement("div");
        actions.className = "card-actions";

        const heart = document.createElement("button");
        heart.className = "heart-btn" +
            (favorites.includes(item.id) ? " favorited" : "");
        heart.textContent = favorites.includes(item.id) ? "♥ Saved" : "♡ Save";
        heart.setAttribute("aria-label", "Toggle favorite");

        heart.addEventListener("click", () => toggleFavorite(item.id));

        actions.appendChild(heart);

        // Only user-added clothes can be deleted
        if (item.userAdded) {
            const remove = document.createElement("button");
            remove.className = "delete-btn";
            remove.textContent = "Delete";

            remove.addEventListener("click", () => deleteClothes(item.id));
            actions.appendChild(remove);
        }

        info.append(title, details, actions);
        card.append(img, info);
        grid.appendChild(card);
    });

    emptyMessage.hidden = filtered.length !== 0;

    document.getElementById("total-count").textContent = clothes.length;
    document.getElementById("favorite-count").textContent = favorites.length;
}

function filterClothes(category, button) {
    currentCategory = category;
    favoritesOnly = false;

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");
    renderWardrobe();
}

function showFavorites() {
    favoritesOnly = !favoritesOnly;
    currentCategory = "All";

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.toggle(
            "active",
            btn.textContent.trim() === "All" && !favoritesOnly
        );
    });

    renderWardrobe();

    if (favoritesOnly) {
        document.getElementById("wardrobe").scrollIntoView({
            behavior: "smooth"
        });
    }
}

function toggleFavorite(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(favoriteId => favoriteId !== id);
    } else {
        favorites.push(id);
    }

    saveData();
    renderWardrobe();
}

function deleteClothes(id) {
    const item = clothes.find(cloth => cloth.id === id);

    if (!item || !item.userAdded) return;

    if (confirm("Do you want to delete " + item.name + "?")) {
        clothes = clothes.filter(cloth => cloth.id !== id);
        favorites = favorites.filter(favoriteId => favoriteId !== id);

        saveData();
        renderWardrobe();
    }
}

// Add new clothes using the form
document.getElementById("clothes-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("item-name").value.trim();
    const category = document.getElementById("item-category").value;
    const color = document.getElementById("item-color").value.trim();
    const image = document.getElementById("item-image").value.trim();

    if (!name || !color || !image) {
        return;
    }

    // Validate the image URL
    try {
        const url = new URL(image);
        if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error("Invalid URL");
        }
    } catch (error) {
        document.getElementById("form-message").textContent =
            "Please enter a valid image URL.";
        return;
    }

    const newItem = {
        id: Date.now(),
        name: name,
        category: category,
        color: color,
        occasions: ["Casual", "College", "Party", "Formal"],
        image: image,
        userAdded: true
    };

    clothes.push(newItem);
    saveData();
    renderWardrobe();

    this.reset();

    currentCategory = "All";
    favoritesOnly = false;

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.toggle("active", btn.textContent.trim() === "All");
    });

    renderWardrobe();

    document.getElementById("form-message").textContent =
        "✓ " + name + " added successfully!";

    document.getElementById("wardrobe").scrollIntoView({
        behavior: "smooth"
    });
});

// Outfit recommendation based on the selected occasion
function generateOutfit() {
    const occasion = document.getElementById("occasion").value;
    const message = document.getElementById("outfit-message");
    const result = document.getElementById("outfit-result");

    result.replaceChildren();

    // Get clothes suitable for this occasion
    const suitable = clothes.filter(item =>
        Array.isArray(item.occasions) &&
        item.occasions.includes(occasion)
    );

    function pick(category) {
        const options = suitable.filter(item => item.category === category);

        if (options.length === 0) return null;

        return options[Math.floor(Math.random() * options.length)];
    }

    let outfit;

    if (occasion === "Party") {
        const dress = pick("Dresses");
        const shoes = pick("Shoes");

        if (!dress || !shoes) {
            message.textContent =
                "Add a party dress and shoes to your wardrobe for a complete party outfit.";
            return;
        }

        outfit = [dress, shoes];
    } else {
        // A dress can be worn alone, or use a top and bottom
        const dress = pick("Dresses");

        if (dress && Math.random() < 0.4) {
            outfit = [dress, pick("Shoes")].filter(Boolean);
        } else {
            outfit = [
                pick("Tops"),
                pick("Bottoms"),
                pick("Shoes")
            ].filter(Boolean);
        }
    }

    if (outfit.length === 0) {
        message.textContent =
            "Add clothes suitable for this occasion to get a recommendation.";
        return;
    }

    message.textContent =
        "Your suggested " + occasion.toLowerCase() + " outfit!";

    outfit.forEach(item => {
        const card = document.createElement("div");
        card.className = "outfit-piece";

        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.name;

        const title = document.createElement("h3");
        title.textContent = item.name;

        const color = document.createElement("p");
        color.textContent = item.color + " " + item.category;

        card.append(img, title, color);
        result.appendChild(card);
    });

    result.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}

// Display the initial wardrobe
renderWardrobe();
