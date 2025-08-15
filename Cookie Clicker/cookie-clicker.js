const cookie = document.querySelector('.cookie');
let counter = document.querySelector('.counter');
let count = Number(localStorage.getItem('cookieCount')) || 0;
let multi = Number(localStorage.getItem('multiple')) || 1
let m2 = document.querySelector('.x2');
let m3 = document.querySelector('.x3');
let m4 = document.querySelector('.x4');
let m5 = document.querySelector('.x5');
let m10 = document.querySelector('.x10');
let btn = document.querySelector('.btn');
let reset = document.querySelector('.reset');



btn.addEventListener('click', () => {
    window.location.href = "../index.html"
})


if (localStorage.getItem('m2Disabled') === 'true') {
    m2.disabled = true;
    m2.classList.add('pressed');
}

if (localStorage.getItem('m3Disabled') === 'true') {
    m3.disabled = true;
    m3.classList.add('pressed');
}

if (localStorage.getItem('m4Disabled') === 'true') {
    m4.disabled = true;
    m4.classList.add('pressed');
}

if (localStorage.getItem('m5Disabled') === 'true') {
    m5.disabled = true;
    m5.classList.add('pressed');
}

if (localStorage.getItem('m10Disabled') === 'true') {
    m10.disabled = true;
    m10.classList.add('pressed');
}

counter.textContent = `${count} cookies`;


cookie.addEventListener('click', increment)

m2.addEventListener('click', () => {
        if (count >= 250) {
         count = count - 250;
         multi = multi * 2;
         counter.textContent = `${count} cookies`;
         m2.disabled = true;
         m2.classList.add('pressed');
         localStorage.setItem('m2Disabled', 'true');

        };
    });

m3.addEventListener('click', () => {
        if (count >= 1000) {
         multi = multi * 3;
         counter.textContent = `${count} cookies`;
         m3.disabled = true;
         m3.classList.add('pressed');
         localStorage.setItem('m3Disabled', 'true');
        };
    });

m4.addEventListener('click', () => {
        if (count >= 5000) {
         multi = multi * 3;
         counter.textContent = `${count} cookies`;
         m4.disabled = true;
         m4.classList.add('pressed');
         localStorage.setItem('m4Disabled', 'true');
        };
    });

m5.addEventListener('click', () => {
        if (count >= 10000) {
         multi = multi * 3;
         counter.textContent = `${count} cookies`;
         m5.disabled = true;
         m5.classList.add('pressed');
         localStorage.setItem('m5Disabled', 'true');
        };
    });

m10.addEventListener('click', () => {
        if (count >= 100000) {
         multi = multi * 3;
         counter.textContent = `${count} cookies`;
         m10.disabled = true;
         m10.classList.add('pressed');
         localStorage.setItem('m10Disabled', 'true');
        };
    });

reset.addEventListener('click', () => {
    count = 0;
    counter.textContent = `${count} cookies`;
    multi = 1;

    [m2, m3, m4, m5, m10].forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('pressed');
    });

    localStorage.removeItem('m2Disabled');
    localStorage.removeItem('m3Disabled');
    localStorage.removeItem('m4Disabled');
    localStorage.removeItem('m5Disabled');
    localStorage.removeItem('m10Disabled');
})

function increment(e) {
    count = count + multi;
    counter.textContent = `${count} cookies`;
    const audio = new Audio('click6-101soundboards.mp3');
    audio.volume = 0.2;
    audio.play();

    const plus = document.createElement('span');
    plus.textContent = `+${multi}`;
    plus.className = 'plus';

    document.body.appendChild(plus);

    plus.style.left = e.pageX + 'px';
    plus.style.top = e.pageY + 'px';

    plus.addEventListener('animationend', () => {
        plus.remove();
    });

    const pop = document.createElement('img');

    pop.setAttribute('src', "pngtree-cartoon-cookies-png-image_6516299.png");

    document.body.appendChild(pop);

    pop.classList.add('cookiepop');

    pop.style.left = e.pageX + 'px';
    pop.style.top = (e.pageY + 40) + 'px';

    pop.addEventListener('animationend', () => {
        pop.remove();
    });
    



    localStorage.setItem('cookieCount', count)
    localStorage.setItem('multiple', multi)
};


