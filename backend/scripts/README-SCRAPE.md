# Scraping de produtos (em 2 fases)

## Fluxo

1. **Fase 1 – Só capturar**  
   Rodar o script de captura com **1 URL base** (e depois com as 15).  
   Tudo é salvo em `scraped-raw.json`. **Nada é enviado para a API.**

2. **Análise**  
   Abrir `scraped-raw.json`, ver a estrutura dos dados que o site expõe (nome, preços, imagens, avaliações, variações) e comparar com o que a nossa loja espera.

3. **Fase 2 – Mapear e importar**  
   Com base nessa análise, formatar os dados capturados para o formato da nossa API e aí sim criar os produtos (e avaliações, se houver).

---

## Fase 1: Captura (sem subir nada)

### Uma URL para analisar a estrutura

Rode com **uma única URL** do site de onde você vai puxar os produtos:

```bash
cd backend
npm install
node scripts/scrape-capture-only.js "https://exemplo.com/produto/um-produto"
```

A saída fica em:

**`backend/scripts/scraped-raw.json`**

Cada item no JSON tem:

- `url` – URL que foi aberta  
- `scrapedAt` – data/hora da captura  
- `data` – objeto com tudo que o script conseguiu extrair:
  - `nome`
  - `descricao`
  - `preco` / `preco_antigo`
  - `imagens` (array com todas as URLs de imagem)
  - `rating_medio` / `rating_quantidade` / `avaliacoes_lista`
  - `variacoes` (quando houver)
  - `_meta` (og:title, og:image, title da página, etc.)

Envie **essa 1 URL base** primeiro. Depois de rodar, podemos olhar o `scraped-raw.json` (ou você cola um trecho) e aí:

- Ajustamos seletores se algo importante faltar.
- Definimos exatamente como mapear cada campo para o nosso projeto.

### Depois: as 15 URLs

Quando a estrutura estiver ok para essa 1 URL:

1. Crie um arquivo (ex.: `urls.txt`) com **uma URL por linha** (as 15).
2. Rode:

```bash
node scripts/scrape-capture-only.js urls.txt
```

O mesmo `scraped-raw.json` será **reescrito** com um array: um objeto por URL (os 15 produtos).  
Assim temos **tudo capturado em um único arquivo** para, na Fase 2, mapear e importar.

---

## O que o nosso projeto espera (referência)

Para não errar na hora de mapear:

| Nosso campo       | Tipo / Observação |
|-------------------|--------------------|
| `nome`            | string |
| `descricao`       | string (pode ser HTML) |
| `preco`           | number (preço atual) |
| `preco_antigo`    | number ou null (riscado) |
| `imagem`          | array de URLs `["url1", "url2", ...]` (backend grava como JSON) |
| `rating`          | number (0–5, ex.: 4.5) – no **produto** |
| `avaliações`      | tabela separada: `produto_id`, `autor`, `nota`, `comentario` (e opcional `imagem`) |
| `variacoes`       | JSON: `{ "Cor": { "label": "Cor", "opcoes": ["Azul","Vermelho"] }, "Tamanho": { "label": "Tamanho", "opcoes": ["P","M","G"] } }` |
| `tem_variacoes`   | 1 se tiver variações, 0 se não |

Com o `scraped-raw.json` da **1 URL base** a gente consegue alinhar cada campo capturado a esses campos e montar o passo de formatação + importação sem quebrar rotas ou lógica.
