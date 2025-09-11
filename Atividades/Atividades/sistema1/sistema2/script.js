const btnContadorCarrinho = document.getElementById('btn-carrinho');
const carrinho = document.getElementById('carrinho-lateral');
const itensCarrinho = document.getElementById('itens-carrinho');
const totalCarrinho = document.getElementById('total-carrinho');
const contadorQuantidade = document.getElementById('contador-quantidade');
const btnFinalizar = document.getElementById('btn-finalizar');

let carrinhoProdutos = {};

contadorQuantidade.style.display = 'none';

function formatarPreco(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

function configurarBotoesAdicionarCarrinho() {
    document.querySelectorAll('.botao-carrinho').forEach((botao) => {
        botao.addEventListener('click', () => {
            const produtoEl = botao.closest('.produtos');

            const descricao = produtoEl.querySelector('.descricao').textContent.trim();
            const precoTexto = produtoEl.querySelector('.preco').textContent.trim();
            const preco = parseFloat(precoTexto.replace('R$', '').replace('.', '').replace(',', '.'));
            const imgEl = produtoEl.querySelector('img');
            const imgSrc = imgEl ? imgEl.src : '';

            // Usar a descrição como ID temporário para o produto no carrinho
            if (carrinhoProdutos[descricao]) {
                carrinhoProdutos[descricao].quantidade++;
            } else {
                carrinhoProdutos[descricao] = {
                    descricao,
                    preco,
                    img: imgSrc,
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
        const item = carrinhoProdutos[id];
        const subtotal = item.preco * item.quantidade;
        total += subtotal;
        quantidadeTotal += item.quantidade;

        const divItem = document.createElement('div');
        divItem.classList.add('item-carrinho');
        divItem.innerHTML = `
        <img src="${item.img}" alt="${item.descricao}" />
        <div class="item-carrinho-info">
            <p class="descricao">${item.descricao}</p>
            <p class="preco">${formatarPreco(item.preco)} x <span class="quantidade">${item.quantidade}</span> = ${formatarPreco(subtotal)}</p>
            <div class="quantidade-container">
                <button class="btn-quantidade" data-id="${id}" data-acao="diminuir">-</button>
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

    // Reconfigurar os botões de quantidade após a atualização do carrinho
    configurarBotoesQuantidade();
}

function configurarBotoesQuantidade() {
    document.querySelectorAll('.btn-quantidade').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const acao = btn.getAttribute('data-acao');
    
            if (acao === 'aumentar') {
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
        // Redirecionar para a página de finalização ou exibir modal
        alert('Funcionalidade de finalizar compra ainda não implementada.');
        // window.location.href = 'finalizar.html'; // Descomente para redirecionar
    });
}

function inicializarCarrinho () {
    configurarBotoesAdicionarCarrinho();
    configurarBotaoAbrirFecharCarrinho();
    configurarBotaoFinalizarCompra();
    atualizarCarrinho(); // Garante que o carrinho esteja atualizado ao carregar a página
}

inicializarCarrinho();

// Carrossel

const carrosselContainer = document.querySelector('.carrossel-container');
const carrossel = document.querySelector('.carrossel');
const imagens =  document.querySelectorAll('.carrossel img');
const btnAnterior = document.querySelector('.seta-anterior');
const btnProximo = document.querySelector('.seta-proximo');
let indiceAtual = 0;
const totalImagens = imagens.length;

function atualizarCarrossel() {
    const larguraImagem = carrosselContainer.offsetWidth;
    carrossel.style.transform = `translateX(-${indiceAtual * larguraImagem}px)`;
}

btnProximo.addEventListener('click', () => {
    indiceAtual = (indiceAtual + 1) % totalImagens;
    atualizarCarrossel();
});

btnAnterior.addEventListener('click', () => {
    indiceAtual = (indiceAtual - 1 + totalImagens) % totalImagens;
    atualizarCarrossel();
});

// Ajustar carrossel ao redimensionar a janela
window.addEventListener('resize', atualizarCarrossel);

// Inicializar carrossel
atualizarCarrossel();


