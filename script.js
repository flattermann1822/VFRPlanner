document.addEventListener('DOMContentLoaded', () => {
    // Google Sheets API URL für Flugzeugdaten
    const sheetId = '1oncso0sPI7hQRnggrrHgjJSLP6J6530HuqVIGB3fzo4';
    const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

    fetch(sheetUrl)
        .then(response => response.text())
        .then(data => {
            const json = JSON.parse(data.substring(47, data.length - 2));
            const rows = json.table.rows;
            const select = document.getElementById('flugzeug');

            rows.forEach(row => {
                const option = document.createElement('option');
                option.value = row.c[0].v;
                option.text = `${row.c[0].v} (${row.c[1].v})`;
                select.add(option);
            });
        });
});

document.getElementById('vfr-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Sende Daten an Google Sheets (Apps Script)
    fetch('https://script.google.com/macros/s/AKfycbyUMDQznq12_E9gL7fbfWQJBraXabIqHl1RmQcDr-WJDFyKeila-vYzoMdOojyVNOijNw/exec', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData))
    }).then(response => {
        if (response.ok) {
            alert('Plan erfolgreich erstellt!');
        } else {
            alert('Fehler beim Erstellen des Plans.');
        }
    });
});
