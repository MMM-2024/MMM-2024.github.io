document.addEventListener('DOMContentLoaded', function () {
    let clickCount = 0;
    const clickerButton = document.getElementById('clicker');
    const clickCountDisplay = document.getElementById('clickCount');

    clickerButton.addEventListener('click', function () {
        clickCount++;
        clickCountDisplay.textContent = clickCount;

        // Example of sending data back to the Telegram bot
        if (window.Telegram.WebApp) {
            Telegram.WebApp.sendData(JSON.stringify({ clicks: clickCount }));
        }
    });

    // Initialization and customization of Telegram WebApp
    if (window.Telegram.WebApp) {
        Telegram.WebApp.ready();
        Telegram.WebApp.MainButton.text = 'Share Score';
        Telegram.WebApp.MainButton.show();
        Telegram.WebApp.MainButton.onClick(function () {
            Telegram.WebApp.sendData(JSON.stringify({ clicks: clickCount }));
        });
    }
});
