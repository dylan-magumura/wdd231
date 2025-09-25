document.addEventListener('DOMContentLoaded', () => {

    /* --- Business Spotlight Logic --- */
    const spotlightContainer = document.querySelector('.spotlight-container');
    const membersUrl = 'data/members.json';

    async function loadSpotlights() {
        try {
            const response = await fetch(membersUrl);
            if (!response.ok) {
                throw Error('Network response was not ok');
            }
            const data = await response.json();

            const goldAndSilverMembers = data.filter(member =>
                member.membership === 3 || member.membership === 2
            );

            const shuffledMembers = goldAndSilverMembers.sort(() => 0.5 - Math.random());

            const selectedMembers = shuffledMembers.slice(0, Math.floor(Math.random() * 2) + 2);

            spotlightContainer.innerHTML = '';

            selectedMembers.forEach(member => {
                const card = document.createElement('div');
                card.className = 'spotlight-card';

                let membershipLevelText = '';
                if (member.membership === 3) {
                    membershipLevelText = 'Gold';
                } else if (member.membership === 2) {
                    membershipLevelText = 'Silver';
                }

                card.innerHTML = `
                    <img src="${member.image}" alt="${member.name} logo">
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                    <p class="membership-level">Membership: ${membershipLevelText}</p>
                `;
                spotlightContainer.appendChild(card);
            });

        } catch (error) {
            console.error('Error loading spotlights:', error);
        }
    }

    loadSpotlights();

    /* --- Mobile Menu Toggle Logic --- */
    const menuToggle = document.getElementById('menu-toggle');
    const primaryNavigation = document.getElementById('primary-navigation');

    if (menuToggle && primaryNavigation) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            primaryNavigation.classList.toggle('open');
            
            // Toggles the button text between a hamburger and an 'x'
            if (isExpanded) {
                menuToggle.textContent = '☰';
            } else {
                menuToggle.textContent = '×';
            }
        });
    }
});
