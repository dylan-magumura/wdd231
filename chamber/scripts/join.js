document.addEventListener("DOMContentLoaded", () => {

  // --- Form Submission ---
  const joinForm = document.getElementById("joinForm");
  if (joinForm) {
    joinForm.addEventListener("submit", () => {
      const formData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        orgTitle: document.getElementById("orgTitle").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        businessName: document.getElementById("businessName").value,
        membership: document.getElementById("membership").value,
        description: document.getElementById("description").value,
        timestamp: new Date().toISOString() // <-- automatic timestamp added here
      };
      localStorage.setItem("chamberFormSubmission", JSON.stringify(formData));
    });
  }

  // --- Membership Modal ---
  const modal = document.getElementById("modal");
  const modalContent = modal.querySelector(".modal-content");
  const cards = document.querySelectorAll(".membership-cards .card");

  cards.forEach(card => {
    const learnMoreLink = card.querySelector("a");
    learnMoreLink.addEventListener("click", (e) => {
      e.preventDefault();
      const type = card.dataset.type;
      const description = card.querySelector("p").innerText;
      const benefits = card.querySelector(".benefits").innerHTML;

      modalContent.innerHTML = `
        <span class="close">&times;</span>
        <h3>${type} Membership</h3>
        <p>${description}</p>
        <ul>${benefits}</ul>
      `;
      modal.style.display = "flex";

      // Close modal
      modalContent.querySelector(".close").addEventListener("click", () => {
        modal.style.display = "none";
      });
    });
  });

  // Close modal if clicking outside
  window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });

  // --- Display Submission Details on Thank You Page ---
  const detailsBox = document.getElementById("submission-details");

  if (detailsBox) {
    const savedData = JSON.parse(localStorage.getItem("chamberFormSubmission"));

    if (savedData) {
      detailsBox.innerHTML = `
        <p><strong>First Name:</strong> ${savedData.firstName}</p>
        <p><strong>Last Name:</strong> ${savedData.lastName}</p>
        <p><strong>Organizational Title:</strong> ${savedData.orgTitle}</p>
        <p><strong>Email:</strong> ${savedData.email}</p>
        <p><strong>Phone:</strong> ${savedData.phone}</p>
        <p><strong>Organization Name:</strong> ${savedData.businessName}</p>
        <p><strong>Membership Level:</strong> ${savedData.membership}</p>
        <p><strong>Description:</strong> ${savedData.description}</p>
        <p><strong>Submitted At:</strong> ${new Date(savedData.timestamp).toLocaleString()}</p>
      `;
    } else {
      detailsBox.innerHTML = `<p>No submission data found.</p>`;
    }
  }

});
