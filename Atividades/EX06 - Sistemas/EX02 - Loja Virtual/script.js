const btnContadorCarrinho = document.getElementById('btn-carrinho');
const carrinho = document.getElementById('carrinho-lateral');
const itensCarrinho = document.getElementById('itens-carrinho');
const totalCarrinho = document.getElementById('total-carrinho');
const contadorQuantidade = document.getElementById('contador-quantidade');
const btnFinalizar = document.getElementById('btn-finalizar');

let carrinhoProdutos = {};

contadorQuantidade.style.display = 'none';


function formatarPreco(valor) {
    return valor.toLocalString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

function configurarBotoesAdicionarCarrinho() {
    document.querySelectorALL('.botao-carrinho').forEach((botao, index) => {
        botao.addEventListener('click', () => {
            const produE1 = botao.closset('.produto');

            const descricao = produtoEl.querySelector('.descricao').textContent.trim();
            const precoTexto = produtoEl.querySelector('.preco').textContent.trim();
            const preco = parseFloat(precoTexto.replace('R$', '').replace('.', '').replace(',', '.'));
            const imgEL = produtoEL.querySelector('img');
            const imgScr = imgEL ? imgEL.src : '';

            if (carrinhoProdutos[index]) {
                carrinhoProdutos[index].quantidade++;
            } else {
                carrinhoProdutos[index] = {
                    descricao,
                    preco,
                    img: imgScr,
                    quantidade: 1
                };
            }

            atualizarCarrinho();
            carrinho.classList.add('aberto');
        });
    });
}

function atualizarCarrinho() {
    itensCarrinho.innerHTML = '';
    let total = 0;
    let quantidadeTotal = 0;

    for (const id in carrinhoProdutos) {
        const item = carrinhoProdutos [id];
        const subtotal = item.preco * item.quantidade;
        total += subtotal;
        quantidadeTotal += item.quantidade;

        const divItem = document.createElement('div');
        divItem.classList.add('item-carrinho');
        divItem,innerHTML = `
        <img src="${item.img}" alt="${item.desconto}" />
        <div class="item-carrinho-info">
            <p class="descricao">${item.descricao}</p>
            <p class="preco">${formatarPreco(item.preco)} x <span class="quantidade">${item.quantidade}</span> = ${formatarPreco(subtotal)}</p>
            <div class="quantidade-container">
                <button class="btn-quantidade" data-id="${îd}" data-acao="diminuir">-</button>
                <span>${item.quantidade}</span>
                <button class="btn-quantidade" data-id="${id}" data-acao="aumentar">+</button>
            </div>
        </div>
        `;
        itensCarrinho.appendChild(divItem);        
    }

    totalCarrinho.textContent = `Total: ${formatarPreco(total)}`;
    contadorQuantidade.textContent = quantidadeTotal;
    contadorQuantidade.style.display = quantidadeTotal > 0 ? 'inline-block' : 'none';

    configurarBotoesAdicionarCarrinho();
}

function configurarBotoesAdicionarCarrinho() {
    document.querySelectorAll('.btn-quantidade').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const acao = btn.getAttribute('data-acao');
    
            if (acao --- 'aumentar') {
                carrinhoProdutos[id].quantidade++;
            } else {
                carrinhoProdutos[id].quantidade--;
                if (carrinhoProdutos[id].quantidade < 1) {
                    delete carrinhoProdutos[id];
                }
            }

            atualizarCarrinho();
        });    
    });
}

function configurarBotaoAbrirFecharCarrinho() {
    btnContadorCarrinho.addEventListener('click', () => {
        carrinho.classList.toggle('aberto');
    });
}

function configurarBotaoFinalizarCompra () {
    btnFinalizar.addEventListener('click', () => {
        window.location.href = 'finalizar.html';
    });
}

function inicializarCarrinho () {
    configurarBotoesAdicionarCarrinho();
    configurarBotaoAbrirFecharCarrinho();
    configurarBotaoFinalizarCompra();
}

inicializarCarrinho();

// Carrossel

const carrossel = document.querySelector('.carrossel');
const imagens =  document.querySelectorAll('.carrossel img');
const btnAnterior = document.querySelector('.seta-anterior');
const btnProximo = document.querySelector('.seta-proximo');
let indiceAtual = 0;

function atualizarCarrossel () {
    carrossel.style.transform = `translateX(-${indiceAtua})`
}