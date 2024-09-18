export const dateStringFormatter = (str, locale = false) => {
    const d = new Date(str);

    if (locale) {
        return d.toLocaleDateString("cs-CZ", {
            year: "numeric",
            month: "2-digit",  // Zobrazí měsíc jako dvouciferné číslo
            day: "2-digit",    // Zobrazí den jako dvouciferné číslo
        });
    }

    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, "0"); // Přidá 0 pro jednočíselné měsíce
    const day = d.getDate().toString().padStart(2, "0");          // Přidá 0 pro jednočíselné dny

    return [day, month, year].join(".");  // Formát: den.měsíc.rok
};

export default dateStringFormatter;
