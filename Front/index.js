function HandleContentLoading(page) {    

    switch (page) {
        case "register":
            loadPartial('.PageContent', '/Front/Components/Content/Register/Register.html');
            break;
        case "home":
            loadPartial('.PageContent', '/Front/Components/Content/HomePage/HomePage.html');
            break;
    
        default:
            loadPartial('.PageContent', '/Front/Components/Content/HomePage/HomePage.html');
            break;
    }

}
