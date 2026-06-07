document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("[data-galeria-grid]");
  const empty = document.querySelector("[data-galeria-empty]");
  const filters = document.querySelector("[data-galeria-filters]");

  if (!grid) return;

  const renderEmpty = () => {
    grid.innerHTML = "";
    if (empty) empty.hidden = false;
  };

  const normalizePhotos = (data) => {
    if (!data || !Array.isArray(data.photos)) return [];
    return data.photos.filter((photo) => photo && photo.src && photo.title);
  };

  const renderPhotos = (photos, activeCategory = "all") => {
    const visiblePhotos = activeCategory === "all"
      ? photos
      : photos.filter((photo) => photo.category === activeCategory);

    if (!visiblePhotos.length) {
      renderEmpty();
      return;
    }

    if (empty) empty.hidden = true;
    grid.innerHTML = visiblePhotos.map((photo) => `
      <article class="galeria-card">
        <a href="${photo.src}" class="galeria-card__media" target="_blank" rel="noopener">
          <img src="${photo.src}" alt="${photo.alt || photo.title}" loading="lazy">
        </a>
        <div class="galeria-card__body">
          <p class="galeria-card__kategoria">${photo.category || "Realizacja"}</p>
          <h2>${photo.title}</h2>
          ${photo.description ? `<p>${photo.description}</p>` : ""}
        </div>
      </article>
    `).join("");
  };

  const renderFilters = (photos) => {
    if (!filters) return;
    const categories = [...new Set(photos.map((photo) => photo.category).filter(Boolean))];

    if (!categories.length) {
      filters.innerHTML = "";
      return;
    }

    filters.innerHTML = ["all", ...categories].map((category) => `
      <button class="filtr-galerii${category === "all" ? " is-active" : ""}" type="button" data-category="${category}">
        ${category === "all" ? "Wszystkie" : category}
      </button>
    `).join("");

    filters.addEventListener("click", (event) => {
      const button = event.target.closest("[data-category]");
      if (!button) return;
      filters.querySelectorAll(".filtr-galerii").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      renderPhotos(photos, button.dataset.category);
    });
  };

  fetch("data/galeria.json", { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error("Nie mozna wczytac galerii.");
      return response.json();
    })
    .then((data) => {
      const photos = normalizePhotos(data);
      if (!photos.length) {
        renderEmpty();
        return;
      }
      renderFilters(photos);
      renderPhotos(photos);
    })
    .catch(() => {
      renderEmpty();
    });
});
