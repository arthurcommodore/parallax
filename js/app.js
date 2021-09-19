// importar funções responsável pela página Home
import {parallax, exploreEvent} from "./home.js"

//Está função foi criada para dar um delay para aparecer o texto
function viewText(mode,time) {
    const text = document.getElementById('text')
    setTimeout(() => text.style.display = mode, time)
}


//Vai carregar a página inicial
function loadHome() {
    const content = document.querySelector('#content')

    fetch('home.html')
        .then(resp => resp.text())
        .then(text => {
            return new Promise((resolve, reject) => {
                try {
                    content.innerHTML = text
                    document.getElementById('load').style.display = 'none'
                    resolve(text)

                }catch(e) {
                    reject(e)
                }
            })
        }).then(text => {
            parallax()
            exploreEvent()
            viewText('block', 205) //Aparece o texto com um pequeno delay
        })
} setTimeout(() => loadHome(), 300) //Chamada tardia da função, para aparecer a tela de load um pouco

// Vai carregar todas as páginas solicitadas
function loadContet() {
    const links = document.querySelectorAll('ul a') //Todos os links
    const content = document.querySelector('#content') //section que será dado o innerHTML

    links.forEach(link => {
        link.onclick = e => {
            e.preventDefault()
            const nameLink = link.href.split('#')[1].toLowerCase() //Vai pegar apenas o nome do href sem o #

            //Essa parte serve para pegar o que já estava selecionado e oque foi selecionado
            document.querySelector(`#menu a[href='#home']`).classList.remove('active')
            let oldMenu = document.querySelector('.active')
            let newMenu = document.querySelector(`#menu a[href='#${nameLink}']`)

            //Tira a seleção do anterior e coloca no novo
            oldMenu && oldMenu.classList.remove('active')
            newMenu && newMenu.classList.add('active')
            
            
            //Ajax sobre o link selecionado
            fetch(`${nameLink}.html`)
                .then(resp => resp.text()) //Transforma em texto
                .then(text =>  {
                    return new Promise((resolve,reject) => {
                        try {
                            content.classList.remove('pre-animation')
                            content.innerHTML = text
                            if(nameLink == 'home')
                                viewText('block', 0) //Aparece o texto sem delay

                            document.getElementById('load').style.display = 'none' //Se carregar tudo tirar a tela de load
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

//Essa função vai ter evento do subMenu, do modo mobile
export  function getSubmenu() {
    const section = document.querySelector('section')
    const header = document.querySelector('header')
    const toggle = document.querySelector('#toggle')
    const submenu = document.querySelector('#submenu')
    const lis = document.querySelectorAll('#submenu > li')
    
    let submenuActive = false
    const noneSubmenu = () => {
        if(submenuActive)
            submenu.style.display = 'none'
    } 

    toggle.addEventListener('click', () => {
        submenu.style.display = 'block'
        lis.forEach(elem => elem.style.display = 'block')
        submenuActive = true
    })
    
    section.addEventListener('click', noneSubmenu)
}getSubmenu()