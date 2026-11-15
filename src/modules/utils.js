function executeFilter(input)  {
    const query = input.value.toLowerCase().trim();
    const container = input.closest(".search-container");
    const rows = container.querySelectorAll(".searchable-item");

    rows.forEach(row => {
        if (query === null || query.trim() === "") {
            row.style.display = "flex";
            return;
        }
        let info = row.dataset.itemSearch || "";
        const isMatch = info.toLowerCase().includes(query);
        row.style.display = isMatch ? "flex" : "none";
    });
}

export function bindSearchFilters(rootElement, delay = 250) {
    if(!rootElement) {
        return;
    }
    const searchInputs = rootElement.querySelectorAll(".search-input");
    if (!searchInputs || searchInputs.length === 0) {
        return;
    }

    for (let searchInput of searchInputs) {
        const filterFn = () => executeFilter(searchInput);
        const debouncedFilter = foundry.utils.debounce(filterFn, 250);
        searchInput.addEventListener("input", debouncedFilter);
        searchInput.addEventListener("blur", filterFn);
    }
}