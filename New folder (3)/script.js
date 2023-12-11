// Search functionality
document.getElementById('searchBar').addEventListener('input', function(e) {
    const searchText = e.target.value.toLowerCase();
    const rows = document.getElementById('catBreedTable').getElementsByTagName('tbody')[0].rows;

    Array.from(rows).forEach(row => {
        row.style.display = row.cells[0].textContent.toLowerCase().includes(searchText) ||
                            row.cells[1].textContent.toLowerCase().includes(searchText) ? '' : 'none';
    });

    // Error handling for number input
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = searchText.match(/\d+/) ? 'Numbers are not allowed in the search.' : '';
});

// Filter functionality
document.getElementById('filterUS').addEventListener('click', function() {
    filterByCountry('United States');
});

document.getElementById('filterOther').addEventListener('click', function() {
    filterByCountry('Other');
});

function filterByCountry(country) {
    const rows = document.getElementById('catBreedTable').getElementsByTagName('tbody')[0].rows;

    Array.from(rows).forEach(row => {
        if (country === 'Other') {
            row.style.display = row.cells[1].textContent !== 'United States' ? '' : 'none';
        } else {
            row.style.display = row.cells[1].textContent === country ? '' : 'none';
        }
    });
}
