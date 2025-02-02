document.addEventListener("DOMContentLoaded", function () {
    const TOKEN = '7431146757:AAHNEmstp8hLCzO43qdE6qiXgoGn2D8H34c';
    const CHAT_ID = '-1002318440296';

    const signupForm = document.getElementById("signupForm");
    const nameInp = document.getElementById("name");
    const ageInp = document.getElementById("age");
    const genderInp = document.getElementById("gender");
    const phoneInp = document.getElementById("phone");
    const telegramInp = document.getElementById("telegram");

    // ✅ Отправка данных в Telegram
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = nameInp.value.trim();
            const age = ageInp.value.trim();
            const gender = genderInp.value;
            const phone = phoneInp.value.trim();
            const telegram = telegramInp.value.trim();

            const message = `📝 <b>Новая заявка</b>
Имя: ${name}
Возраст: ${age}
Пол: ${gender}
Телефон: ${phone}
Telegram: ${telegram}`;

            try {
                const response = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(message)}&parse_mode=HTML`);

                const data = await response.json();
                console.log(data);

                if (data.ok) {
                    alert('✅ Заявка успешно отправлена!');
                    signupForm.reset();
                } else {
                    alert('❌ Ошибка: ' + data.description);
                    console.error('Ошибка Telegram:', data);
                }
            } catch (error) {
                console.error('Ошибка при отправке:', error);
                alert('❌ Ошибка при отправке!');
            }
        });
    } else {
        console.error('Форма не найдена!');
    }

    // ✅ Таймер обратного отсчёта
    const timerElement = document.getElementById("timer");

    if (timerElement) {
        const targetDate = new Date("2025-03-01T00:00:00").getTime();

        function updateTimer() {
            const now = new Date().getTime();
            const timeLeft = targetDate - now;

            if (timeLeft <= 0) {
                timerElement.innerText = "Запись открыта!";
                clearInterval(countdown);
                return;
            }

            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            timerElement.innerText = `Осталось до открытия: ${days}д ${hours}ч ${minutes}м ${seconds}с`;
        }

        updateTimer();
        const countdown = setInterval(updateTimer, 1000);
    }

    // ✅ Бургер-меню
    // const burger = document.querySelector(".burger");
    // const nav = document.querySelector(".nav");

    // if (burger && nav) {
    //     burger.addEventListener("click", () => {
    //         nav.classList.toggle("active");
    //     });
    // }
});
