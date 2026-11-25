/* ============================================================
   ARQUIVO: script.js -> comportamento do site

   O QUE FAZ:
   1) Monta a lista "Você é" do formulário.
   2) Aplica máscaras de telefone e CEP.
   3) Consulta a API ViaCEP e preenche o endereço (ITEM 6 do trabalho).
   4) Valida o formulário e simula o envio.

   COMO EDITAR: mude os parâmetros do objeto CONFIG logo abaixo.
   ============================================================ */

/* ----- PARÂMETROS DO SISTEMA (edite aqui) ----- */
const CONFIG = {
  // URL da API de CEP. {cep} é trocado pelos 8 números digitados.
  urlCep: 'https://viacep.com.br/ws/{cep}/json/',

  // Opções do campo "Você é".
  perfis: [
    'Cuidador(a) de idosos',
    'Represento uma casa de repouso (ILPI)',
    'Familiar de pessoa idosa',
    'Profissional de saúde',
    'Outro'
  ],

  // Mensagem padrão do campo CEP.
  dicaCep: 'Digite o CEP e o endereço é preenchido sozinho.'
};

/* ----- Atalhos para os elementos da página ----- */
const $ = (id) => document.getElementById(id);
const campoCep = $('cep');
const msgCep   = $('cep-msg');

/* ----- 1) Monta as opções do campo "Você é" ----- */
$('perfil').innerHTML =
  '<option value="">Selecione...</option>' +
  CONFIG.perfis.map(p => `<option>${p}</option>`).join('');

/* ----- 2a) Máscara do telefone: (11) 90000-0000 ----- */
$('telefone').addEventListener('input', () => {
  let v = $('telefone').value.replace(/\D/g, '').slice(0, 11);
  if (v.length > 6)      v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
  else if (v.length > 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
  $('telefone').value = v;
});

/* ----- 2b) Máscara do CEP: 00000-000 e busca automática ----- */
campoCep.addEventListener('input', () => {
  let v = campoCep.value.replace(/\D/g, '').slice(0, 8);
  if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5);
  campoCep.value = v;
  if (v.length === 9) buscarCep(v);   // CEP completo: consulta a API
  else avisoCep(CONFIG.dicaCep);
});

/* Mostra uma mensagem embaixo do campo CEP. classe = '', 'ok' ou 'erro' */
function avisoCep(texto, classe = '') {
  msgCep.textContent = texto;
  msgCep.className = classe;
}

/* Apaga rua, bairro e cidade */
function limparEndereco() {
  ['rua', 'bairro', 'cidade'].forEach(id => $(id).value = '');
}

/* ----- 3) Consulta à API ViaCEP ----- */
/* async/await: espera a resposta da internet sem travar a página. */
async function buscarCep(cep) {
  const numeros = cep.replace(/\D/g, '');
  avisoCep('Buscando endereço...');
  try {
    const url = CONFIG.urlCep.replace('{cep}', numeros);
    const resposta = await fetch(url);                 // faz a requisição
    if (!resposta.ok) throw new Error('Falha na consulta');
    const dados = await resposta.json();               // converte a resposta em objeto

    // A ViaCEP devolve { erro: true } quando o CEP não existe
    if (dados.erro) {
      limparEndereco();
      avisoCep('CEP não encontrado. Confira os números.', 'erro');
      return;
    }
    // Campos usados da resposta: logradouro, bairro, localidade, uf
    $('rua').value    = dados.logradouro;
    $('bairro').value = dados.bairro;
    $('cidade').value = `${dados.localidade} / ${dados.uf}`;
    avisoCep('Endereço encontrado!', 'ok');
  } catch (erro) {
    // Cai aqui se estiver sem internet ou a API estiver fora do ar
    limparEndereco();
    avisoCep('Não foi possível consultar o CEP agora. Tente de novo.', 'erro');
  }
}

/* ----- 4) Validação e envio do formulário ----- */
$('form-contato').addEventListener('submit', (e) => {
  e.preventDefault();                  // impede a página de recarregar
  const retorno = $('retorno');

  const nome = $('nome').value.trim();
  const email = $('email').value.trim();
  const telefone = $('telefone').value.replace(/\D/g, '');
  const perfil = $('perfil').value;
  const rua = $('rua').value;
  const mensagem = $('mensagem').value.trim();

  // Confere cada campo obrigatório e para no primeiro erro
  let problema = '';
  if (!nome)                         problema = 'Informe seu nome completo.';
  else if (!email.includes('@'))     problema = 'Informe um e-mail válido.';
  else if (telefone.length < 10)     problema = 'Informe um telefone com DDD.';
  else if (!perfil)                  problema = 'Escolha uma opção em "Você é".';
  else if (!rua)                     problema = 'Digite um CEP válido para preencher o endereço.';
  else if (!mensagem)                problema = 'Escreva sua mensagem.';

  if (problema) {
    retorno.style.color = 'var(--erro)';
    retorno.textContent = problema;
    return;
  }

  // Em um sistema real, aqui os dados seriam enviados a um servidor.
  // Para a apresentação, apenas simulamos o sucesso.
  retorno.style.color = 'var(--sucesso)';
  retorno.textContent = `Obrigado, ${nome.split(' ')[0]}! Recebemos sua mensagem e entraremos em contato.`;
  e.target.reset();
  limparEndereco();
  avisoCep(CONFIG.dicaCep);
});

/* Mensagem inicial do campo CEP */
avisoCep(CONFIG.dicaCep);
