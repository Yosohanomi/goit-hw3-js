const cats = document.querySelectorAll('.image');
const btn = document.querySelector('.btn')

const observerImage = new IntersectionObserver((cats) => {
    cats.forEach(cat => {
        if (cat.isIntersecting) {
            cat.target.src = cat.target.dataset.src;
            observerImage.unobserve(cat.target)
        }
    })
}, { threshold: 0.5 }); 
// ^^^ тут я створила обсервер, який:
//  1) передає з дати посилання на картинку;
// 2) припиняє обсерв після того як він провівся на елементі

let currentIndex = 0;

btn.addEventListener('click', () => {
    if (currentIndex == cats.length) return btn.classList.add('hiden');

    const cat = cats[currentIndex];
    cat.classList.remove('hidden');
    setTimeout(() => {
        cat.classList.add('show');
    }, 10);
    cats.forEach(cat => {
            observerImage.observe(cat);
    })
    currentIndex++;
})

// ^^^ тут я вішаю на кнопку слухач. По кліку відбуваєтсья наступне:
// 1) Якщо змінна індекс рівне довжині котів, то кнопка має зникнути.
// 2) Дістаю кожного кота окремо із списку котів по їх індексу
// 3) Прибираю клас hidden із картинки
// 4) Я ставлю затримку 10 мс перед тим як додати клас show на img (щоб елемент встиг зарендеритись)
// 5) Перебираю масив котів, і з кожним котом проводжу обсерв
// 6) Збільшую змінну індекс на 1

// Що б я покращила:
// 1) Елемент картинки ліпше відразу створювати у js.
// 2) Як доходжу до кінця картинок, кнопка міняє на 'to the begining' і нас переносить на початок
// списку, після чого кнопка лишається внизу та картинки все ще обсервляться (unobserve прибереться)
// 3) Кращі стилі
// 4) Адаптив