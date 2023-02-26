// створюємо змінну в яку заносимо клас '.btn-dark-mode', знайшовши його 'document' в .html-документі за допомогою querySelector
const btnDarkMode = document.querySelector('.btn-dark-mode'); 

// 1. Перевірка теми на рівні системних налаштувань.

// перевірка темної теми на рівні системних налаштувань (це потрібно буде для автоматичного увімкнення необхідної теми)
//для початку перевіряємо чи присутня window.matchMedia в браузері користувача (тобто чи є взагалі робити медіа запроси в JS),
//і якщо вона присутня, то ставимо '&&' і пишемо медіа-запрос 'window.matchMedia' за допомогою метода 'window.matchMedia' на темну тему 'dark'
if (window.matchMedia && window.matchMedia ("(prefers-color-scheme: dark)").matches) { //за допомогою 'if' робимо перевірку. Якщо темна тема є, то 'matches' повертає true і ми додаємо темну тему. Вона в фігурних дужках.
    btnDarkMode.classList.add('btn-dark-mode--active');
    document.body.classList.add('dark');
}



// 2. Перевірка темної теми в 'localStorage' (тобто ставимо в пріоритет ту схему, яку вручну вказував користувач)

if (localStorage.getItem('darkMode') === 'dark'){           // достаємо з 'localStorage' значення ключа 'darkMode' і порівнюємо з 'dark'
    btnDarkMode.classList.add('btn-dark-mode--active');     // якщо співпадає то додаємо клас 'btn-dark-mode--active' до існуючого класу, який ми зберегли до константи btnDarkMode (тобто ми активуємо кнопку темної теми)
    document.body.classList.add('dark');                    // а також додаємо до 'body' клас 'dark'
}

else if (localStorage.getItem('darkMode') === 'light'){     // достаємо з 'localStorage' значення ключа 'darkMode' і порівнюємо з 'light'
    btnDarkMode.classList.remove('btn-dark-mode--active');  // якщо співпадає то видаляємо клас 'btn-dark-mode--active' (тобто ми активуємо кнопку світлої теми)
    document.body.classList.remove('dark');                 // а також видаляємо з 'body' клас 'dark'

}



// 3. Якщо змінюються системні налаштування - змінюється тема і в тому числі ці зміни запишуться в localStorage, щоб при переході на інші сторінки тема була вже змінена

window.matchMedia ("(prefers-color-scheme: dark)").addEventListener ('change', (event) => {
    const newColorScheme = event.matches ? 'dark' : 'light';

    if (newColorScheme === 'dark') {
        btnDarkMode.classList.add('btn-dark-mode--active');
        document.body.classList.add('dark');
        localStorage.setItem('darkMode', 'dark');
    }

    if (newColorScheme === 'light') {
        btnDarkMode.classList.remove('btn-dark-mode--active');
        document.body.classList.remove('dark');
        localStorage.setItem('darkMode', 'light');
    }
})




btnDarkMode.onclick = function () {
    btnDarkMode.classList.toggle('btn-dark-mode--active');
    const isDark = document.body.classList.toggle('dark'); // створюємо змінну, в яку будуть записуватись данні повернення методу "toggle" (коли він додає клас, то повертає "true", коли він видаляє доданий клас, то повертає "false")

    if (isDark) {                                 // якщо isDark - "true" (тобто "toggle" додав клас "dark")
        localStorage.setItem('darkMode', 'dark');  // то ми до "localStorage" зберігаємо ключ 'darkMode' із значенням 'dark'
    }
    else {                                        // якщо isDark - "false" (тобто "toggle" видалив клас "dark")
        localStorage.setItem('darkMode', 'light');  // то ми до "localStorage" зберігаємо ключ 'darkMode' із значенням 'light'
    }
}