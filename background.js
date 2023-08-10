chrome.runtime.onInstalled.addListener(() => {
    // Establecer una notificación cuando la extensión se instale
    chrome.notifications.create('instalacion_notificacion', {
      type: 'basic',
      title: 'Bienvenido a Mi extensión Edge',
      message: 'Gracias por instalar esta extensión.',
      iconUrl: 'icono.jpg',
    });
  });
  
  chrome.browserAction.onClicked.addListener(() => {
    // Abrir la página de opciones cuando se haga clic en el ícono de la extensión
    chrome.tabs.create({ url: 'popup.html' });
  });
