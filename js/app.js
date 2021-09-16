let moon = document.getElementById('moon')
let stars = document.getElementById('stars')
let mountains_front = document.getElementById('mountains_front')
let mountains_behind = document.getElementById('mountains_behind')
let text = document.getElementById('text')
let btn = document.getElementById('btn')
let sec = document.getElementById('sec')


window.addEventListener('scroll', function() {
    let value = window.scrollY

    if(value < this.window.screenY + 800) {
        stars.style.left = value * 0.25 + 'px'
        moon.style.top = value * 1.05 + 'px'
        mountains_behind.style.top = value * 0.5 + 'px'
        mountains_front.style.top = value * 0 + 'px'
        text.style.right = value * 1 + 'px'
    }
    
    
    
})