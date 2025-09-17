async function getMembers() {
    const response = await fetch("data/members.json");
    const members = await response.json();
    displayMembers(members);
}

function displayMembers(members) {
    const container = document.getElementById("members");
    container.innerHTML = ""; // clear content

    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("member-card");
        card.innerHTML = `
      <img src="${member.image}" alt="${member.name} logo">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      ${member.website
                ? `<a href="${member.website}" target="_blank" rel="noopener noreferrer">${member.website}</a>`
                : `<p class="no-website">No Website Available</p>`
            }
      <p class="level">Membership Level: ${member.membership}</p>
    `;
        container.appendChild(card);
    });
}

document.getElementById("grid").addEventListener("click", () => {
    const membersSection = document.getElementById("members");
    membersSection.classList.add("grid");
    membersSection.classList.remove("list");
});

document.getElementById("list").addEventListener("click", () => {
    const membersSection = document.getElementById("members");
    membersSection.classList.add("list");
    membersSection.classList.remove("grid");
});

// Hamburger menu toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector("nav ul");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
});

// Footer date info
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

getMembers();
