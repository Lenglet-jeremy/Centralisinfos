function WidgetHandler() {

    let widgetsButton = document.querySelector(".WidgetButton");
    let dropdownMenu = document.querySelector(".DropdownMenu");

    // Affichage des widgets
    widgetsButton.addEventListener("click", () => {

        if (dropdownMenu.style.display === "flex"){
            dropdownMenu.style.display = "none";
        } else {
            dropdownMenu.style.display = "flex";
        }
    })

    // Selectionne du widget
    let widgets = dropdownMenu.querySelectorAll("button");
    widgets.forEach((widget) => {
        widget.addEventListener("click", (e) => {
            let widgetName = e.target.textContent;
            SetWidget(widgetName);
            console.log(widgetName);
            
        });
    });


}

function SetWidget(widgetName) {
    let widgetContainer = document.querySelector(".WidgetContainer");

    let widget = document.createElement("div");
    widget.style.width = "200px";
    widget.style.height = "200px";
    widget.style.border = "1px solid #FFFFFF";
    widget.style.position = "absolute";
    widget.style.top = "20%";
    widget.style.left = "20%";

    let header = SetWidgetHeader(widgetName);
    let closeButton = header.querySelector("button");

    widget.appendChild(header);
    widget.appendChild(SetWidgetBody(widgetName));
    widget.appendChild(SetWidgetStatusBar());

    widgetContainer.appendChild(widget);

    SetDragWidget(widget, header);        
    SetResizeWidget(widget);              
    SetCloseWidget(widget, closeButton);  
}

function SetWidgetHeader(widgetName){
    let header = document.createElement("div");
    header.style.width = "100%"
    header.style.height = "30px"
    header.style.borderBottom = "1px solid #FFFFFF"
    header.style.backgroundColor = "#000000"
    header.style.color = "#FFFFFF"
    header.style.display = "flex"
    header.style.flexDirection = "row"
    header.style.justifyContent = "space-between"
    header.style.alignItems = "center"

    let headerEquilizer = document.createElement("span")
    headerEquilizer.innerText = " "

    let headerName = document.createElement("p");
    headerName.innerText = `${widgetName}`

    let closeButton = document.createElement("button")
    closeButton.innerText = "X"
    closeButton.style.marginRight = "15px"
    closeButton.style.width = "20px"
    closeButton.style.height = "20px"

    header.appendChild(headerEquilizer)
    header.appendChild(headerName)
    header.appendChild(closeButton)

    return header
}

function SetWidgetBody(widgetName){
    let body = document.createElement("div")
    body.style.width = "100%"
    body.style.height = "calc(100% - 31px - 31px)" //Toute la hauteur - la hauteur du header et du footer en prenant en compte les bordures
    body.style.backgroundColor = "#000000"

    switch (widgetName) {
        case "Todolist":
            body.appendChild(TodolistWidget())
            break;

        case "Calendrier":
            body.appendChild(CalendarWidget())
            break;

        case "Notes":
            body.appendChild(NotesWidget())
            break;
    
        default:
            break;
    }
    
    return body

}

function SetWidgetStatusBar(){
    let statusBar = document.createElement("div")
    statusBar.style.width = "100%"
    statusBar.style.height = "30px"
    statusBar.style.borderTop = "1px solid #FFFFFF"
    statusBar.style.backgroundColor = "#000000"

    return statusBar

}



function SetDragWidget(widget, header) {
    let offsetX = 0, offsetY = 0;
    let isDragging = false;

    header.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - widget.offsetLeft;
        offsetY = e.clientY - widget.offsetTop;

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });

    function onMouseMove(e) {
        if (isDragging) {
            widget.style.position = "absolute";
            widget.style.left = `${e.clientX - offsetX}px`;
            widget.style.top = `${e.clientY - offsetY}px`;
        }
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
    }
}

function SetResizeWidget(widget) {
    // Liste des poignées de redimensionnement avec leur position
    const handles = [
        { position: 'top', cursor: 'ns-resize' },
        { position: 'bottom', cursor: 'ns-resize' },
        { position: 'left', cursor: 'ew-resize' },
        { position: 'right', cursor: 'ew-resize' },
        { position: 'top-left', cursor: 'nwse-resize' },
        { position: 'top-right', cursor: 'nesw-resize' },
        { position: 'bottom-left', cursor: 'nesw-resize' },
        { position: 'bottom-right', cursor: 'nwse-resize' }
    ];

    handles.forEach(handle => {
        let resizeHandle = document.createElement("div");
        resizeHandle.style.position = "absolute";
        resizeHandle.style.cursor = handle.cursor;
        resizeHandle.style.zIndex = "10";

        // Positionnement des poignées selon leur position
        switch (handle.position) {
            case 'top':
                resizeHandle.style.top = "0";
                resizeHandle.style.left = "0";
                resizeHandle.style.right = "0";
                resizeHandle.style.height = "10px";
                break;
            case 'bottom':
                resizeHandle.style.bottom = "0";
                resizeHandle.style.left = "0";
                resizeHandle.style.right = "0";
                resizeHandle.style.height = "10px";
                break;
            case 'left':
                resizeHandle.style.top = "0";
                resizeHandle.style.bottom = "0";
                resizeHandle.style.left = "0";
                resizeHandle.style.width = "10px";
                break;
            case 'right':
                resizeHandle.style.top = "0";
                resizeHandle.style.bottom = "0";
                resizeHandle.style.right = "0";
                resizeHandle.style.width = "10px";
                break;
            case 'top-left':
                resizeHandle.style.top = "0";
                resizeHandle.style.left = "0";
                resizeHandle.style.width = "10px";
                resizeHandle.style.height = "10px";
                break;
            case 'top-right':
                resizeHandle.style.top = "0";
                resizeHandle.style.right = "0";
                resizeHandle.style.width = "10px";
                resizeHandle.style.height = "10px";
                break;
            case 'bottom-left':
                resizeHandle.style.bottom = "0";
                resizeHandle.style.left = "0";
                resizeHandle.style.width = "10px";
                resizeHandle.style.height = "10px";
                break;
            case 'bottom-right':
                resizeHandle.style.bottom = "0";
                resizeHandle.style.right = "0";
                resizeHandle.style.width = "10px";
                resizeHandle.style.height = "10px";
                break;
        }

        widget.appendChild(resizeHandle);

        // Ajout des événements pour chaque poignée
        resizeHandle.addEventListener("mousedown", (e) => {
            const initialWidth = widget.offsetWidth;
            const initialHeight = widget.offsetHeight;
            const initialX = e.clientX;
            const initialY = e.clientY;
            const initialLeft = widget.offsetLeft;
            const initialTop = widget.offsetTop;

            function onResize(e) {
                const dx = e.clientX - initialX;
                const dy = e.clientY - initialY;

                // Redimensionnement en fonction de la poignée sélectionnée
                if (handle.position.includes('right')) {
                    widget.style.width = `${initialWidth + dx}px`;
                }
                if (handle.position.includes('left')) {
                    widget.style.width = `${initialWidth - dx}px`;
                    widget.style.left = `${initialLeft + dx}px`; // Ajuster la position du widget
                }
                if (handle.position.includes('bottom')) {
                    widget.style.height = `${initialHeight + dy}px`;
                }
                if (handle.position.includes('top')) {
                    widget.style.height = `${initialHeight - dy}px`;
                    widget.style.top = `${initialTop + dy}px`; // Ajuster la position du widget
                }
            }

            function onStopResize() {
                document.removeEventListener("mousemove", onResize);
                document.removeEventListener("mouseup", onStopResize);
            }

            document.addEventListener("mousemove", onResize);
            document.addEventListener("mouseup", onStopResize);
        });
    });
}

function SetCloseWidget(widget, closeButton) {
    closeButton.addEventListener("click", () => {
        widget.remove();
    });
}



function TodolistWidget() {
    let contentWidget = document.createElement("div");

    // Assure-toi d'utiliser style pour appliquer les dimensions et le style
    contentWidget.style.width = "100%";
    contentWidget.style.height = "100%";
    contentWidget.style.display = "flex";
    contentWidget.style.justifyContent = "center";
    contentWidget.style.alignItems = "center";

    let TEST = document.createElement("span")
    TEST.innerText = "Contenu de la todolist"
    TEST.style.color = "#FFFFFF"

    contentWidget.appendChild(TEST)

    return contentWidget;
}


function CalendarWidget(){
    let contentWidget = document.createElement("div");

    // Assure-toi d'utiliser style pour appliquer les dimensions et le style
    contentWidget.style.width = "100%";
    contentWidget.style.height = "100%";
    contentWidget.style.display = "flex";
    contentWidget.style.justifyContent = "center";
    contentWidget.style.alignItems = "center";

    let TEST = document.createElement("span")
    TEST.innerText = "Contenu du calendrier"
    TEST.style.color = "#FFFFFF"

    contentWidget.appendChild(TEST)

    return contentWidget;
}

function NotesWidget(){
    let contentWidget = document.createElement("div");

    // Assure-toi d'utiliser style pour appliquer les dimensions et le style
    contentWidget.style.width = "100%";
    contentWidget.style.height = "100%";
    contentWidget.style.display = "flex";
    contentWidget.style.justifyContent = "center";
    contentWidget.style.alignItems = "center";

    let TEST = document.createElement("span")
    TEST.innerText = "Contenu des notes"
    TEST.style.color = "#FFFFFF"

    contentWidget.appendChild(TEST)

    return contentWidget;
}