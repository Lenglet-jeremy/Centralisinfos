function LoadWidgets() {
    document.getElementById('widgetButton').addEventListener('click', function() {
        var dropdown = document.querySelector('.dropdownMenu');
        if (dropdown.style.display === 'none' || dropdown.style.display === '') {
            dropdown.style.display = 'block';
        } else {
            dropdown.style.display = 'none';
        }
    });

    window.addEventListener('click', function(event) {
        var dropdown = document.querySelector('.dropdownMenu');
        if (!event.target.matches('#widgetButton')) {
            dropdown.style.display = 'none';
        }
    });

    // Gestion des clics sur les boutons des widgets
    document.querySelectorAll('.dropdownMenu button').forEach(function(button) {
        button.addEventListener('click', function() {
            createWidget(button.textContent); // Création du widget avec le texte du bouton
        });
    });
}

function createWidget(widgetName) {
    var widgetContainer = document.getElementById('widgetContainer');

    // Créer la fenêtre du widget
    var widgetWindow = document.createElement('div');
    widgetWindow.classList.add('WidgetWindow');

    // Créer l'en-tête avec le nom et le bouton de fermeture
    var widgetHeader = document.createElement('div');
    widgetHeader.classList.add('WidgetHeader');
    widgetHeader.innerHTML = `<span>${widgetName}</span>`;

    var closeButton = document.createElement('button');
    closeButton.classList.add('WidgetCloseBtn');
    closeButton.textContent = 'X';
    closeButton.addEventListener('click', function() {
        widgetWindow.remove(); // Fermer le widget
    });

    widgetHeader.appendChild(closeButton);

    // Créer le contenu du widget
    var widgetContent = document.createElement('div');
    widgetContent.classList.add('WidgetContent');
    widgetContent.textContent = 'Contenu du widget ' + widgetName;

    // Ajouter une poignée de redimensionnement
    var resizingHandle = document.createElement('div');
    resizingHandle.classList.add('ResizingHandle');

    // Ajouter tous les éléments dans la fenêtre du widget
    widgetWindow.appendChild(widgetHeader);
    widgetWindow.appendChild(widgetContent);
    widgetWindow.appendChild(resizingHandle);

    // Ajouter le widget au conteneur
    widgetContainer.appendChild(widgetWindow);

    // Ajout du comportement de déplacement du widget
    makeWidgetDraggable(widgetWindow, widgetHeader);
}

// Fonction pour rendre le widget déplaçable
function makeWidgetDraggable(widget, header) {
    let offsetX = 0, offsetY = 0, mouseX = 0, mouseY = 0;

    // Quand on clique sur l'en-tête
    header.addEventListener('mousedown', function(e) {
        e.preventDefault();
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Quand on déplace la souris
        document.addEventListener('mousemove', dragWidget);

        // Quand on relâche le clic
        document.addEventListener('mouseup', function() {
            document.removeEventListener('mousemove', dragWidget);
        });
    });

    function dragWidget(e) {
        e.preventDefault();
        offsetX = mouseX - e.clientX;
        offsetY = mouseY - e.clientY;
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Calcul de la nouvelle position du widget
        widget.style.top = (widget.offsetTop - offsetY) + "px";
        widget.style.left = (widget.offsetLeft - offsetX) + "px";
    }
}
