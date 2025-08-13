const form = document.getElementById('form-produto');
const tbody = document.getElementById('produtos-tbody');
const totalItensEl = document.getElementById('total-itens');
const valorTotalEl = document.getElementById('valor-total');

let produtos = [];

// Função para atualizar a tabela e resumo
function atualizarTabela() {
  tbody.innerHTML = '';

  let totalItens = 0;
  let valorTotal = 0;

  produtos.forEach((produto, index) => {
    const tr = document.createElement('tr');

    const valorProduto = produto.quantidade * produto.preco;
    totalItens += produto.quantidade;
    valorTotal += valorProduto;

    tr.innerHTML = `
      <td>${produto.nome}</td>
      <td>${produto.quantidade}</td>
      <td>R$ ${produto.preco.toFixed(2)}</td>
      <td>R$ ${valorProduto.toFixed(2)}</td>
      <td class="actions">
        <button class="editar" onclick="editarProduto(${index})">Editar</button>
        <button class="excluir" onclick="excluirProduto(${index})">Excluir</button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  totalItensEl.textContent = totalItens;
  valorTotalEl.textContent = valorTotal.toFixed(2);
}

// Função para adicionar ou atualizar produto
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const quantidade = parseInt(document.getElementById('quantidade').value);
  const preco = parseFloat(document.getElementById('preco').value);

  if (!nome || quantidade <= 0 || preco <= 0) {
    alert('Preencha todos os campos corretamente.');
    return;
  }

  if (form.dataset.editIndex !== undefined) {
    // Atualiza produto existente
    const idx = parseInt(form.dataset.editIndex);
    produtos[idx] = { nome, quantidade, preco };
    delete form.dataset.editIndex;
    form.querySelector('button').textContent = 'Adicionar';
  } else {
    // Adiciona produto novo
    produtos.push({ nome, quantidade, preco });
  }

  form.reset();
  atualizarTabela();
});

// Função para editar produto
function editarProduto(index) {
  const produto = produtos[index];
  document.getElementById('nome').value = produto.nome;
  document.getElementById('quantidade').value = produto.quantidade;
  document.getElementById('preco').value = produto.preco;
  form.dataset.editIndex = index;
  form.querySelector('button').textContent = 'Atualizar';
}

// Função para excluir produto
function excluirProduto(index) {
  if (confirm('Tem certeza que deseja excluir este produto?')) {
    produtos.splice(index, 1);
    atualizarTabela();
  }
}

// Inicializa a tabela vazia
atualizarTabela();
