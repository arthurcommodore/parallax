//Utilizado função auto invocal para o usuário não ter acesso
(function() {
    //Vai carregar a página inicial
    function loadHome() {
        const content = document.querySelector('#content')

        fetch('home.html')
            .then(resp => resp.text())
            .then(text => {
                return new Promise((resolve, reject) => {
                    try {
                        content.innerHTML = text
                        resolve(text)
                    }catch(e) {
                        reject(e)
                    }
                })
            }).then(() => parallax())
    } loadHome()

    //função resposável por reproduzir os efeitos da lua, montanha e estrlas
    function parallax() {
        console.log('teste')

        const moon = document.getElementById('moon')
        const stars = document.getElementById('stars')
        const mountains_front = document.getElementById('mountains_front')
        const mountains_behind = document.getElementById('mountains_behind')
        const text = document.getElementById('text')

        window.addEventListener('scroll', function() {
            let value = window.scrollY

            if(value < this.window.screenY + 800) {
                stars.style.left = value * 0.18 + 'px'
                moon.style.top = value * 0.8 + 'px'
                mountains_behind.style.top = value * 0.4 + 'px'
                mountains_front.style.top = value * 0 + 'px'
                text.style.right = value * 1 + 'px'
            }
        })
    }
    

    //Essa função vai ter evento do subMenu, do modo mobile
    function getSubmenu() {
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
    } getSubmenu()

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
                        if(nameLink === 'home')
                            parallax()
                    }) //Executa o efeito parallax, se a página for a Home
            }
        })
    } loadContet() 

})()