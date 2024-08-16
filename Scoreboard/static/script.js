document.addEventListener('DOMContentLoaded', function () {
    const leaderboardList = document.getElementById('leaderboard-list');
    const searchButton = document.getElementById('search-button');
    const backButton = document.getElementById('back-button');
    const backToTopButton = document.getElementById('back-to-top');
    const searchInput = document.getElementById('search-input');
    const sortByPointsSelect = document.getElementById('sort-by-points');

    let originalData = [];
    let filteredData = [];

    fetch('/leaderboard')
        .then(response => response.json())
        .then(data => {
            originalData = data;
            filteredData = data;
            displayLeaderboard(filteredData);

            searchButton.addEventListener('click', () => {
                const query = searchInput.value.toLowerCase();
                filteredData = originalData.filter(player => 
                    player.name.toLowerCase().includes(query) || 
                    String(player.id).includes(query)
                );
                if (filteredData.length > 0) {
                    sortData();
                    backButton.style.display = 'inline-block';
                } else {
                    leaderboardList.innerHTML = '<tr><td colspan="3">Name not found in leaderboard</td></tr>';
                    backButton.style.display = 'inline-block';
                }
            });

            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const query = searchInput.value.toLowerCase();
                    filteredData = originalData.filter(player => 
                        player.name.toLowerCase().includes(query) || 
                        String(player.id).includes(query)
                    );
                    if (filteredData.length > 0) {
                        sortData();
                        backButton.style.display = 'inline-block';
                    } else {
                        leaderboardList.innerHTML = '<tr><td colspan="3">Name not found in leaderboard</td></tr>';
                        backButton.style.display = 'inline-block';
                    }
                }
            });

            backButton.addEventListener('click', () => {
                filteredData = originalData;
                sortData();
                searchInput.value = '';
                backButton.style.display = 'none';
            });

            backToTopButton.addEventListener('click', () => {
                document.querySelector('.table-container').scrollTo({ top: 0, behavior: 'smooth' });
            });

            document.querySelector('.table-container').addEventListener('scroll', () => {
                if (document.querySelector('.table-container').scrollTop > 200) {
                    backToTopButton.style.display = 'block';
                } else {
                    backToTopButton.style.display = 'none';
                }
                
                // Display "Back to Top" button when scrolled to bottom
                const container = document.querySelector('.table-container');
                if (container.scrollHeight - container.scrollTop === container.clientHeight) {
                    backToTopButton.style.display = 'block';
                }
            });

            sortByPointsSelect.addEventListener('change', () => {
                sortData();
            });
        });

    function sortData() {
        let sortedData = [...filteredData];

        if (sortByPointsSelect.value === 'asc') {
            sortedData.sort((a, b) => a.score - b.score);
        } else if (sortByPointsSelect.value === 'desc') {
            sortedData.sort((a, b) => b.score - a.score);
        }

        displayLeaderboard(sortedData);
    }

    function displayLeaderboard(data) {
        leaderboardList.innerHTML = '';
        data.forEach((player, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${player.name}</td>
                <td>${player.score}</td>
            `;
            leaderboardList.appendChild(tr);
        });
    }
});
