const corpoTabela = document.querySelector("tbody")
const campoDescricao = document.querySelector("#descricao")
const campoValor = document.querySelector("#valor")
const campoTipo = document.querySelector("#tipo")
const botaoAdicionar = document.querySelector("#botao-adicionar")

const spanEntradas = document.querySelector(".valor-entradas")
const spanSaidas = document.querySelector(".valor-saidas")
const spanTotal = document.querySelector(".valor-total")

let listarItens 

botaoAdicionar.addEventListener("click", ()=>{
    if(campoDescricao.value == ""|| campoValor.value == ""||campoTipo.value==""){
        return alert (`Por favor, preencha todos os campos`)
    }
    listarItens.push({
        descricao: campoDescricao.value,
        valor: Math.abs(campoValor.value).toFixed(2),
        tipo: campoTipo.value
    })
    salvarItensBD()
    carregarItens()

    campoDescricao.value = ""
    campoValor.value = ""
})
function removerItens(indice){
    listarItens.splice(indice, 1)
    salvarItensBD()
    carregarItens()
}
function inserirItens(item, indice){
    let linha = document.createElement("tr")
    let iconeTipo = ""
    if(item.tipo == "Entrada"){
        iconeTipo = "Entrada"
    }else if(item.tipo == "Saida"){
        iconeTipo = "Saida"
    }
    linha.innerHTML =`
    <td>${item.descricao}</td>
    <td>R$ ${item.valor}</td>
    <td class="coluna-tipo"><p>${iconeTipo}</p></td>
    <td class = "coluna-acao">
        <button onclick="removerItens(${indice})">Remover</button>
    </td>
    `

    corpoTabela.appendChild(linha)
}

function carregarItens(){
    listarItens = obterItensBD()
    corpoTabela.innerHTML = ""
    listarItens.forEach((item, indice) => {
        inserirItens(item, indice)
    });
    calcularTotal()
}
function calcularTotal(){
    let totalEntradas = 0
    let totalSaida = 0

    listarItens.forEach((item)=>{
        const valor = Number(item.valor)
        if(item.tipo == "Entrada"){
            totalEntradas+=valor
        }else if(item.tipo == "Saida"){
            totalSaida+=valor
        }
    })
    const saldoTotal = (totalEntradas - totalSaida).toFixed(2)
    const totalEntradaFixado = totalEntradas.toFixed(2)
    const totalSaidaFixado = totalSaida.toFixed(2)

    spanEntradas.innerHTML = totalEntradaFixado
    spanSaidas.innerHTML = totalSaidaFixado
    spanTotal.innerHTML = saldoTotal
}
const obterItensBD = () => JSON.parse (localStorage.getItem("bd_itens"))??[]
const salvarItensBD = () => localStorage.setItem("bd_itens", JSON.stringify(listarItens))

carregarItens()