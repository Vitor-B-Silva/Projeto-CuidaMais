# Cuida Mais – Tecnologia assistiva para cuidadores de idosos

Projeto acadêmico: site institucional do Cuida Mais, iniciativa que desenvolve soluções assistivas de baixo custo
(Arduino e sensores) para apoiar cuidadores e instituições de longa permanência para idosos (ILPIs).
Usa a API pública **ViaCEP** para preencher o endereço a partir do CEP.

## Estrutura

| Arquivo | Função |
|---|---|
| `index.html` | Estrutura e textos da página |
| `style.css` | Aparência. Cores e tema nas variáveis de `:root` |
| `script.js` | Máscaras, consulta de CEP (API) e validação. Parâmetros em `CONFIG` |
| `images/` | Imagens em SVG, incluindo os avatares da equipe (`avatar-*.svg`). Podem ser trocadas por fotos |

## Requisitos do trabalho x onde estão

1. Histórico da empresa: seção `#historia`
2. Imagem da empresa: seção `#inicio` (`images/instituicao.svg`)
3. Produtos e serviços com imagem e texto: seção `#solucoes`
4. Equipe com avatar e função: seção `#equipe`
5. Formulário de contato: seção `#contato`
6. JavaScript com API: função `buscarCep()` em `script.js`

Também há as seções **Quem somos** (`#quem-somos`) e **Missão, visão e valores** (`#mvv`).
Há ainda a seção **O circuito do projeto** (`#circuito`), com o esquema do Arduino (`images/circuito-arduino.png`) e a lista de componentes.

## Como rodar

Abra o `index.html` no navegador. Para publicar, use o GitHub Pages (Settings → Pages → branch `main`, pasta `/root`).

## Links (preencher na entrega)

- Código: `https://github.com/USUARIO/REPOSITORIO`
- Site hospedado: `https://USUARIO.github.io/REPOSITORIO/`
