function HandleNavBarPrimary(){

    let account = document.querySelector(".AccountLogo");
    account.addEventListener("click", () => {
        window.history.pushState({}, '', '/register');
        HandleContentLoading("register");
    })

    let home = document.querySelector(".Logo");
    home.addEventListener("click", () => {
        window.history.pushState({}, '', '/');
        HandleContentLoading("home");
    })
    
    // Gérer le retour en arrière ou l'avance dans l'historique
    window.addEventListener("popstate", (event) => {
        const path = window.location.pathname;
        if (path === '/register') {
            HandleContentLoading("register");
        } else if (path === '/') {
            HandleContentLoading("home");
        }
    });
}