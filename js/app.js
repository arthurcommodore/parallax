// importar funções responsável pela página Home
import {getSubmenu, parallax, exploreEvent} from "./home.js"

//Utilizado função auto invocal para o usuário não ter acesso
function view(mode,time) {
    const text = document.getElementById('text')
    setTimeout(() => text.style.display = mode, time)
}
getSubmenu()

//Vai carregar a página inicial
function loadHome() {
    const content = document.querySelector('#content')

    fetch('home.html')
        .then(resp => resp.text())
        .then(text => {
            return new Promise((resolve, reject) => {
                try {

                    content.innerHTML = text
                    document.getElementById('load').remove()
                    resolve(text)

                }catch(e) {
                    reject(e)
                }
            })
        }).then(text => {
            parallax()
            exploreEvent()
            view('block', 125)
        })
} loadHome()

// Vai carregar todas as páginas solicitadas
function loadContet() {
    const links = document.querySelectorAll('#menu a')
    const content = document.querySelector('#content') 

    links.forEach(link => {
        link.onclick = e => {
            e.preventDefault()
            const nameLink = link.href.split('#')[1].toLowerCase()

            document.querySelector(`#menu a[href='#home']`).classList.remove('active')
            let oldMenu = document.querySelector('.active')
            let newMenu = document.querySelector(`#menu a[href='#${nameLink}']`)

            oldMenu && oldMenu.classList.remove('active')
            newMenu && newMenu.classList.add('active')
            
            fetch(`${nameLink}.html`)
                .then(resp => resp.text()) //Transforma em texto
                .then(text =>  {
                    return new Promise((resolve,reject) => {
                        try {
                            content.innerHTML = text
                            view('block', 0)
                            document.getElementById('load').remove()
                            resolve(text)
                        }catch(e) {
                            reject(e)
                        }
                    })
                }) /* Vai colocar o conteúdo da página na section, e
                        retorna uma nova promise, para exucatar o próximo
                        then, somente quando a página for carregada.
                    */
                .then(() => {
                    if(nameLink === 'home') {
                        parallax()
                        exploreEvent()
                    }
                       
                }) //Executa o efeito parallax, se a página for a Home
        }
    })
} loadContet()

