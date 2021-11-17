

const btnMobile = document.getElementById('btn-mobile');

function toggleMenu(event) {
    if (event.type === 'touchstart') event.preventDefault();
    const nav = document.getElementById('nav');
    nav.classList.toggle('active');
}

btnMobile.addEventListener('click', toggleMenu);
btnMobile.addEventListener('touchstart', toggleMenu);


const form = document.querySelector("#cadastro");


if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name');
        const date = document.getElementById('data');
        const email = document.getElementById('email');
        const address = document.getElementById('address');
        const phone = document.getElementById('phone');
        const goal = document.getElementById('goal');

        const obj = {
            'name': name.value,
            'data': date.value,
            'email': email.value,
            'address': address.value,
            'phone': phone.value,
            'goal': goal.value
        };

        const arr = JSON.parse(localStorage.getItem('cadastro') || '[]');
        arr.push(obj)
        localStorage.setItem('cadastro', JSON.stringify(arr));

        name.value = ''
        date.value = ''
        email.value = ''
        address.value = ''
        phone.value = ''
        goal.value = ''

        const btnForm = document.querySelector("#btn-form")

        alert('Cadastrado com Sucesso!')

    });
}

const formConsult = document.getElementById('form-consult');

if (formConsult) {
    formConsult.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('titulo');
        const meta = document.getElementById('meta');
        const content = document.getElementById('cont');

        const obj = {
            'title': title.value,
            'meta': meta.value,
            'content': content.value,
            'date': new Date().toLocaleDateString()
        };

        const arr = JSON.parse(localStorage.getItem('cards') || '[]');
        arr.push(obj)
        localStorage.setItem("cards", JSON.stringify(arr));

        refreshList();

        title.value = ''
        meta.value = ''
        content.value = ''
    });

    function refreshList() {
        const list = document.getElementById('lista');
        const arr = JSON.parse(localStorage.getItem('cards') || '[]');

        let dataList = '';

        arr.forEach((item, index) => {
            dataList += `<li>
        <h3>
          ${item.title}
        </h3>
        <p>
          ${item.meta}
        </p>
        <p>
          ${item.content}
        </p>
        <span>
          ${item.date}
        </span>
        <a href="javascript:void(0);" class="delete-card" onClick="deleteItem(this)" data-index='${index}'>Delete</a>
      </li>`;
        })
        list.innerHTML = dataList

        refreshCount(arr);
    }

    function deleteItem(target) {
        const dataIndex = target.getAttribute('data-index');
        const newArray = [];
        const arr = JSON.parse(localStorage.getItem('cards') || '[]');

        arr.forEach((item, index) => {
            if (index != dataIndex)
                newArray.push(item);
        })

        localStorage.setItem("cards", JSON.stringify(newArray));

        refreshList();
    }

    function refreshCount(arr) {
        const elemHtml = document.getElementById('total');
        if (arr.length)
            elemHtml.textContent = arr.length;
        else
            elemHtml.textContent = 0;
    }

    window.onload = () => {
        if (document.getElementById('lista'))
            refreshList();
    };

}

btn = document.querySelector('#btn');
if (btn) {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        let height = parseFloat(document.querySelector('#height').value);
        let weight = parseFloat(document.querySelector('#weight').value);
        let result = (weight / (height * height)).toFixed(1);

        if (height > 0 && weight > 0) {
            if (result < 18.5)
                result += "<br>Abaixo do peso";
            if (result >= 18.5 && result <= 24.9)
                result += "<br>Peso normal";
            if (result >= 25 && result <= 29.9)
                result += "<br>Sobrepeso";
            if (result >= 30 && result <= 34.9)
                result += "<br>Obesidade grau 1";
            if (result >= 35 && result <= 39.9)
                result += "<br>Obesidade grau 2";
            if (result >= 40)
                result += "<br>Obesidade grau 3";

            result = "IMC = " + result;
            document.querySelector('#result').innerHTML = result;

        } else {
            result = "Preencha corretamente"
            document.querySelector("#result").innerHTML = result;
            alert("Preencha todos os campos corretamente!")
        }

    });
}


const btnKcal = document.querySelectorAll('.preco');
const elemTotal = document.querySelector('#result');

if (btnKcal) {
    btnKcal.forEach(inp => {
        inp.addEventListener('click', ({ target }) => {
            const val = target.value;
            let total = elemTotal.value;
            if (target.checked == true)
                elemTotal.value = parseInt(total) + parseInt(val);
            else
                elemTotal.value = parseInt(total) - parseInt(val);
        });
    });
}