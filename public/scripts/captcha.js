(() => {
    // Variables principales pour le CAPTCHA
    const checkbox = document.getElementById("captcha-checkbox");
    const captchaModal = document.getElementById("captcha-modal");
    const closeModalButton = document.getElementById("close-modal");
    let captchaCompleted = false; // Indique si le CAPTCHA est complété

    // Fonction pour gérer le clic sur le checkbox
    checkbox.addEventListener("click", () => {
        if (!captchaCompleted && !checkbox.classList.contains("loading")) {
            // Ajouter la classe de chargement
            checkbox.classList.add("loading");
            checkbox.disabled = true;

            // Simulation d'un délai de chargement avant d'afficher la modal
            setTimeout(() => {
                checkbox.classList.remove("loading");
                checkbox.disabled = false;
                checkbox.checked = false; // Empêcher la validation tant que CAPTCHA n'est pas complété

                // Afficher la modal
                captchaModal.classList.add("active");
            }, 1500); // Ajustez le délai si nécessaire
        } else if (!captchaCompleted) {
            // Empêcher de cocher si le CAPTCHA n'est pas complété
            checkbox.checked = false;
        }
    });

    // Fonction pour fermer la modal lorsque l'utilisateur clique sur le bouton de fermeture
    closeModalButton.addEventListener("click", () => {
        captchaModal.classList.remove("active");
        checkbox.checked = false; // Réinitialiser l'état de la case à cocher
    });

    // Fonction pour marquer le CAPTCHA comme complété
    window.completeCaptcha = function completeCaptcha() {
        captchaCompleted = true; // Marquer le CAPTCHA comme complété
        checkbox.checked = true; // Valider la case à cocher visuellement
        checkbox.classList.add("validated"); // Ajouter une classe pour le style (par ex. animation)
        captchaModal.classList.remove("active"); // Fermer la modal
    };

    // Fonction pour réinitialiser le CAPTCHA en cas d'échec
    window.looseCaptcha = function looseCaptcha() {
        console.log("Captcha failed.");
        captchaCompleted = false; // Réinitialiser l'état du CAPTCHA
        checkbox.checked = false; // Réinitialiser la case à cocher
        checkbox.classList.remove("validated"); // Supprimer la classe de validation
        captchaModal.classList.remove("active"); // Fermer la modal
    };
})();
