function LoadWidgets(){
    let Widgets = document.querySelector(".NavBarSecondaryCenterSide button")
    Widgets.addEventListener("click", () => {
        let Widget = document.querySelector(".Widget")
        Widget.style.display = "flex"
        
    })
}