let listaDeNumeroSorteados = [];
let numerolimite = 50;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'jogo do numero secreto');
    exibirTextoNaTela('p', `escolha um numero de 1 a ${numerolimite}`);
}

exibirMensagemInicial()


function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'ACERTOU')
        let palavraTetativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `voce descobriu o numero secreto com ${tentativas} ${palavraTetativa}`
        exibirTextoNaTela('p', `${mensagemTentativas}`)
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
        exibirTextoNaTela('p', 'numero secreto e menor')
    } else {
     exibirTextoNaTela('p', 'numero secreto e maior')
    }
    tentativas++;
    limparCampo()
    }
}

function gerarNumeroAleatorio() {
   let NumeroEcolhido = parseInt(Math.random () * numerolimite + 1);
   let quatidadeDeElementosNaLista = listaDeNumeroSorteados.length;

   if (quatidadeDeElementosNaLista == numerolimite) {
listaDeNumeroSorteados = []
   }
   if (listaDeNumeroSorteados.includes(NumeroEcolhido)){
    return gerarNumeroAleatorio();
   } else {
    listaDeNumeroSorteados.push(NumeroEcolhido)
    return NumeroEcolhido
   }
}
function limparCampo() {
    chute = document.querySelector('input')
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial()
    document.getElementById('reiniciar').setAttribute('disabled',true)
}
