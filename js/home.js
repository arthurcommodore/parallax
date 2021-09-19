//Evento do botão explorer na página Home
export function exploreEvent() {
    //Elementos da página utilizado para a manipulação
    const mountains_behind = document.getElementById('mountains_behind')
    const mountains_front = document.getElementById('mountains_front')
    
    const explore = document.getElementById('btn')
    const header = document.querySelector('header')
    const text = document.getElementById('text')

    const html = document.querySelector('html')

    //Está função vai far a senção de movimento para frente sobre a página
    function makeMove() {
        let point = 1
        let count = 0

        //Foi criado uma promesa para executar tarefas em ordem continua
        return new Promise((resolve, reject) => {
            function move(i) {
                setTimeout(() => {
                    count++
                    
                    //Zoom sobre as montanhas, para dar a ídeia de movimentação
                    mountains_behind.style.transform = `scale(${point}.${count / 2})`
                    mountains_front.style.transform = `scale(${point}.${count})`
                    console.log(`scale move(${point}.${count})`)

                    //Permite mudar a escala para a próxima dezena a percorrer
                    if(i === 9) {
                        point = 2  
                        count = 1
                        
                        //Essas chamadas evitam um bug
                        mountains_behind.style.transform = `scale(2)`
                        mountains_front.style.transform = `scale(2)`
                        
                    }
                }, 150 * i)
            }
            Array(18).fill().map( async (_, i) => {
            move(i)
            })

            //Só chame o próximo then, quando toda a movimentação terminar
            setTimeout(() => resolve(), 150 * 18) //Este calculo remete o termino da movimentação
        })
    }

    function makeBack() {
        let point = 2.9
        //Evitar que chama quanod o evento estiver ocorrendo
        if(oneTimeBack) {

            oneTimeBack = false

            //Foi criado uma promesa para executar tarefas em ordem continua
            return new Promise((resolve, reject) => {
                function move(i) {
                    setTimeout(() => {
                        point = (point - 0.1).toPrecision(2)

                        //Zoom sobre as montanhas, para dar a ídeia de movimentação
                        mountains_behind.style.transform = `scale(${point})`
                        mountains_front.style.transform = `scale(${point})`

                        console.log(`scale back(${point})`)
                    }, 100 * i)
                }

                Array(19).fill().map( async (_, i) => {
                    move(i) 
                })

                //Só chame o próximo then, quando toda a movimentação terminar
                setTimeout(() => {
                    oneTime = true //Quando tudo  terminar, permita o usuário chamar o evento novamente

                    //Evita o botão ficar duplicado
                    const newBtn = document.querySelector('.newBtn')
                    if(newBtn)
                        newBtn.remove()

                    //Removendo o botão, para se livrar dos vincolos de seus eventos anteriores
                    explore.remove()
                    
                    //Sera criado um botão da tag a do zero, para ser vinculado há um novo evento
                    const a  = document.createElement('a')

                    //adicionando propriedades para a tag
                    a.id = 'btn'
                    a.classList.add('newBtn')
                    a.href = '#'
                    a.innerText = 'Explore'

                    //Tirando a opacidade dos elementos, com efeito sutil
                    text.classList.remove('pre-animation')
                    header.classList.remove('pre-animation')
                    html.style.overflowY = 'auto' //voltando o o scroll na vertical                     
                     
                    //inserindo o novo botão de tag a 
                    text.insertAdjacentElement('afterend', a) //Inserindo um novo botão para variar um novo evento
                   

                    // passando o evento inicial para o novo botão
                    a.onclick = eventButton(a)  

                    // setando para poder chamar o evento novamete futuramente
                    oneTimeBack = true

                    //chamada da Promise
                    resolve()
                }, 100 * 18) //Este calculo remete o termino da movimentação
            })
        }
    }   

    

    //Estás variáveis evitam que o usuário chame ambos eventos quando já está acionado
    let oneTime = true 
    let oneTimeBack = true
    function eventButton(btn) {
        return function(e) {
            e.preventDefault()

            //Verifica se a chamada foi realizado só uma vez
            if(oneTime) {
                oneTime = false // Já que o evento foi chamado, evite que chame novamente
                
                scroll(0,0)

                // Foi utilizado o setTimeout para dar tempo do scroll executar primeiro
                setTimeout(() => {
                    html.style.overflowY = 'hidden' //Evite que as imagens ultrapassem o viewport

                    //Esconde cabeçalho e texto quando ocorrer o evento de forma sutil
                    header.classList.add('pre-animation')
                    text.classList.add('pre-animation')
        
                    //Chamada da Promise para começar a movimentar 
                    makeMove()
                        .then(() => btn.innerText = 'Back') //Quando a promise acabar, chame essa func
                        .then(() => {
                            if(oneTimeBack) {
                                btn.addEventListener('click', makeBack)
                            }
                        })
                }, 500)
                
            }
        }
    }
    //acionamento do evento ao botão explore
    explore.onclick = eventButton(explore), 500
}

//função resposável por reproduzir os efeitos da lua, montanha e estrelas
export function parallax() {

    //Elementos da página utilizado no efeito parallax
    const moon = document.getElementById('moon')
    const stars = document.getElementById('stars')
    const mountains_front = document.getElementById('mountains_front')
    const mountains_behind = document.getElementById('mountains_behind')
    const text = document.getElementById('text')

    //evento acionado ao utlizar o scroll da página
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

