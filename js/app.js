(function() {

    function parallax() {
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
    parallax()

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
    
    }
    getSubmenu()
})()