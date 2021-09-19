export function exploreEvent() {
    let time = true
    //const imgs = document.querySelectorAll('#background img')
    const mountains_behind = document.getElementById('mountains_behind')
    const mountains_front = document.getElementById('mountains_front')
    
    const explore = document.getElementById('btn')
    const header = document.querySelector('header')
    const text = document.getElementById('text')

    const html = document.querySelector('html')
    

    function promiseGenerator(fn) {
        return new Promise((resolve, reject) => {
            try {
                fn()
                resolve()
            }catch(e) {
                reject(e)
            }
        })
    }

    function makeMove() {
        let point = 1
        let count = 0
        return new Promise((resolve, reject) => {
            function move(i) {
                time = Date.now() + 400
                setTimeout(() => {
                    count++
    
                    mountains_behind.style.transform = `scale(${point}.${count / 2})`
                    mountains_front.style.transform = `scale(${point}.${count})`
                    console.log(i)
                    if(i === 9) {
                        point = 2  
                        count = 1
    
                        mountains_behind.style.transform = `scale(2)`
                        mountains_front.style.transform = `scale(2)`
                        
                    }
                }, 400 * i)
            }
            Array(18).fill().map( async (_, i) => {
               move(i)
            })
            setTimeout(() => resolve(), 400 * 18)
            
        })
    }


    explore.onclick = e => {
        e.preventDefault()
        if(time) {
            time = false
            scroll(0,0)

            html.style.overflowY = 'hidden'
            header.classList.add('pre-animation')
            text.classList.add('pre-animation')
            makeMove()
                .then(() => explore.innerText = 'Back')
                .then(() => {
                    console.log('time')
                    time = true
                })
        }
    }
}

//função resposável por reproduzir os efeitos da lua, montanha e estrelas
export function parallax() {
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
}