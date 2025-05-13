const perguntas = [
    {
        pergunta: "Qual filósofo grego foi mestre de Platão e é conhecido por sua frase 'Só sei que nada sei'?",
        opcoes: ["Aristóteles", "Sócrates", "Epicuro"],
        correta: 1
    },
    {
        pergunta: "A Revolução Francesa (1789) foi impulsionada principalmente por qual ideal?",
        opcoes: ["Nacionalismo", "Socialismo", "Igualdade e liberdade"],
        correta: 2
    },
    {
        pergunta: "Quem é considerado o 'pai da Sociologia'?",
        opcoes: ["Émile Durkheim", "Karl Marx", "Auguste Comte"],
        correta: 2
    },
    {
        pergunta: "Qual evento marcou o início da Idade Moderna?",
        opcoes: ["A queda do Império Romano", "A Revolução Francesa", "A tomada de Constantinopla (1453)"],
        correta: 2
    },
    {
        pergunta: "Qual é a principal característica do Iluminismo?",
        opcoes: ["Valorização da fé", "Uso da razão como guia", "Rejeição da ciência"],
        correta: 1
    },
    {
        pergunta: "Qual conceito marxista descreve o conflito entre burguesia e proletariado?",
        opcoes: ["Luta de classes", "Mais-valia", "Alienação"],
        correta: 0
    },
    {
        pergunta: "Para Maquiavel, o que é mais importante para um governante?",
        opcoes: ["Ser amado pelo povo", "Manter o poder, mesmo com ações imorais", "Obedecer à Igreja"],
        correta: 1
    },
    {
        pergunta: "Qual foi a principal causa da Primeira Guerra Mundial?",
        opcoes: ["O assassinato do arquiduque Franz Ferdinand", "A crise de 1929", "A invasão da Polônia"],
        correta: 0
    },
    {
        pergunta: "Em 'O Contrato Social', Jean-Jacques Rousseau defende que:",
        opcoes: ["O homem nasce bom, mas a sociedade o corrompe", "O poder deve ser hereditário", "A Igreja deve comandar o Estado"],
        correta: 0
    },
    {
        pergunta: "O que caracterizava a sociedade feudal?",
        opcoes: ["Igualdade jurídica", "Mobilidade social", "Relações de suserania e vassalagem"],
        correta: 2
    }
]


let perguntaAtual = 0
let pontuacao = 0
let erros = 0
let opcaoSelecionada = null

const pergunta = document.getElementById("pergunta")
const opcoes = document.getElementById("opcoes")
const botaoProxima = document.getElementById("proxima")
const quiz = document.getElementById("quiz")
const pontuacaoFinal = document.getElementById("pontuacao")
const valorPontuacao = document.getElementById("valor-pontuacao")
const botaoReiniciar = document.getElementById("reiniciar")
const errosContador = document.getElementById("erros")
const acertos = document.getElementById("acertos")

function atualizarPlacar() {
    acertos.textContent = pontuacao
    errosContador.textContent = erros
}

function mostrarPergunta(){
    const perguntaAtualObj = perguntas[perguntaAtual]
    pergunta.textContent = perguntaAtualObj.pergunta
    opcoes.textContent = ""
    perguntaAtualObj.opcoes.forEach((opcao, indice) => {
        const botao = document.createElement("button")
        botao.textContent = opcao
        botao.classList.add("opcao")
        botao.addEventListener("click", ()=>selecionarOpcao(indice))
        opcoes.appendChild(botao)
    })
    opcaoSelecionada = null
    botaoProxima.disabled = true
}

function selecionarOpcao(indice){
    opcaoSelecionada = indice
    const opcoes = document.querySelectorAll(".opcao")
    opcoes.forEach((opcao, i)=>{
        opcao.classList.toggle("selecionada", i == indice)
    })
    botaoProxima.disabled = false
}
function mostrarPontuacao(){
    quiz.classList.add("esconder")
    pontuacaoFinal.classList.remove("esconder")
    valorPontuacao.textContent = pontuacao
}

botaoProxima.addEventListener("click", ()=>{
    if(opcaoSelecionada == perguntas[perguntaAtual].correta){
        pontuacao++
    }else{
        erros++
    }
    atualizarPlacar()

    perguntaAtual++
    if(perguntaAtual< perguntas.length){
        mostrarPergunta()
    }else{
        mostrarPontuacao()
    }
})

botaoReiniciar.addEventListener("click", ()=>{
    perguntaAtual = 0
    pontuacao = 0
    erros = 0

    quiz.classList.remove("esconder")
    pontuacaoFinal.classList.add("esconder")

    atualizarPlacar()
    mostrarPergunta()
})
mostrarPergunta()