# EMPRESA — Engenharia e Energia

Projeto local com três templates institucionais independentes em React + Vite + TypeScript e CSS. **Nada foi publicado.** Sem backend, login, analytics, serviços pagos ou envio de formulário.

## Abrir a demonstração

Requisito: Node.js 22.12 ou superior e npm. A instalação foi executada com Node 22.17.1. As versões efetivas estão em `package-lock.json`.

No PowerShell, dentro deste workspace:

```powershell
npm.cmd ci
npm.cmd run dev -- --port 5173 --strictPort
```

Abrir **http://127.0.0.1:5173/**. Caso a porta já esteja sendo usada pela demonstração iniciada durante a entrega, basta abrir esse endereço. Em macOS/Linux, usar `npm` no lugar de `npm.cmd`.

| Rota          | Conceito                                                                                      |
| ------------- | --------------------------------------------------------------------------------------------- |
| `/`           | Galeria de seleção com três miniaturas feitas com elementos reais                             |
| `/industrial` | Branco, grafite e amarelo; abertura tipográfica, panorama e serviços numerados                |
| `/regional`   | Areia, verde e terracota; abertura editorial, apresentação territorial e serviços expansíveis |
| `/portfolio`  | Branco e azul-marinho; abertura dividida e galeria com filtros                                |

Os links usam navegação nativa e âncoras. Há menu móvel com `aria-expanded`, fechamento por Escape e devolução de foco, link para pular ao conteúdo e link “Ver outros conceitos” no rodapé de cada template. Os botões comerciais levam ao contato. O formulário aparece mediante ação explícita, valida campos e informa que não envia nem armazena dados.

Na primeira exibição do portfólio, duas imagens preservam a composição da referência. “Ver todas as frentes” exibe quatro exemplos de serviços. Os filtros Fotovoltaica, Geração a diesel e Infraestrutura selecionam o conteúdo correspondente; escolher Todas após filtrar também mostra as quatro frentes. As imagens não são apresentadas como obras realizadas.

## Build e prévia de produção

```powershell
npm.cmd run check
npm.cmd run build
npm.cmd run preview -- --port 4173 --strictPort
```

A prévia abre em **http://127.0.0.1:4173/**. O build está em `dist/`. `preview` serve apenas para conferir o build local. Não abrir `dist/index.html` diretamente com `file://`.

## Personalizar

O arquivo principal é **`src/content.ts`**:

- `company`: nome, apresentação, território e contatos. Telefone, e-mail e WhatsApp estão vazios por serem desconhecidos. Preencher `phone` e `phoneHref` juntos, usando `tel:+...` em `phoneHref`; não inserir contatos fictícios.
- `copy`: textos dos três conceitos e do contato.
- `services`, `galleryItems`, `filters`: serviços e seleção ilustrativa da galeria.
- `concepts`: títulos, descrições e paletas da página inicial.
- `photos`: caminhos locais, enquadramentos e descrições acessíveis das fotografias.

`src/App.tsx` mantém as estruturas próprias dos conceitos. `src/components.tsx` reúne marca, cabeçalho, imagem e contato. `src/styles.css` contém estilos separados por conceito, regras responsivas, estados de foco e redução de movimento.

Os dados do formulário permanecem somente na memória da página, até navegação ou atualização. Não há `fetch`, `localStorage` ou serviço de envio. Para um contato real nesta etapa, basta cadastrar os canais confirmados: o componente passa a exibir links de e-mail, telefone e/ou WhatsApp. Integração de envio é trabalho futuro.

## Imagens, tipografia e fidelidade

As referências originais estão preservadas em `referencias/`. Suas áreas fotográficas são exibidas por janelas de enquadramento; a interface inteira foi reconstruída em componentes reais. A sequência principal segue cada referência, complementada com descrição factual, filtros, detalhes de serviços e contato demonstrativo.

As imagens são locais, ilustrativas e têm direitos de publicação a confirmar. Os créditos, limitações e instruções de substituição estão em [`public/images/SOURCES.md`](public/images/SOURCES.md). Substituir as cópias dos PNGs por fotografias independentes autorizadas antes da publicação final também reduz o peso do site.

Fontes distribuídas localmente pelo Fontsource, sem chamada ao Google Fonts em runtime: **DM Sans**, **Barlow Condensed** e **Instrument Serif**. Licenças SIL Open Font License incluídas em `public/licenses/`. As fontes foram escolhidas por proximidade visual; as referências não informam a família tipográfica original.

## Verificação de interface

Com a demonstração em execução:

```powershell
npx.cmd playwright install chromium
node scripts/verify.mjs
```

O roteiro cobre as quatro rotas em larguras 1440, 768, 390 e 320 px, menu e Escape, navegação para contato, campos obrigatórios, validação sem requisições de envio, serviços expansíveis, filtros, atualização de rota, retorno à galeria, imagens locais e ausência de rolagem horizontal. Registra capturas e relatório em `artifacts/` (ignorado pelo Git). Erros de console, execução e respostas HTTP de erro fazem a verificação falhar. `BASE_URL` permite testar a prévia de produção em outra porta.

As capturas são também revisadas visualmente; o teste automático não substitui essa revisão. A ferramenta Agent Browser não conectou neste ambiente; a verificação foi realizada com Chromium via Playwright.

## Publicar futuramente

Somente após aprovar um conceito, confirmar o nome/contatos e resolver os direitos das imagens. Remover a meta `robots` com `noindex, nofollow` de `index.html` apenas quando a versão pública estiver pronta. A aplicação não depende de um provedor específico.

O host precisa servir `index.html` para as rotas da aplicação quando não houver arquivo físico correspondente. Sem essa configuração, atualizar `/industrial`, `/regional` ou `/portfolio` pode causar 404. O arquivo `public/_redirects`, copiado para `dist/`, já contém:

```text
/* /index.html 200
```

Exemplo opcional com Netlify CLI, **não executado nesta entrega**:

```powershell
npm.cmd ci
npm.cmd run build
npx.cmd netlify-cli login
npx.cmd netlify-cli deploy --dir=dist
# Após revisar a publicação de teste e confirmar o projeto de destino:
npx.cmd netlify-cli deploy --prod --dir=dist
```

Os comandos `deploy` publicam conteúdo; só executá-los quando a publicação estiver autorizada. A CLI pede seleção/criação do projeto no primeiro uso. O primeiro deploy é uma prévia e o último é de produção. Não é necessária contratação de serviço para executar este projeto localmente. Ver [documentação oficial da CLI](https://docs.netlify.com/api-and-cli-guides/cli-guides/get-started-with-cli/) e [rewrites para SPA](https://docs.netlify.com/manage/routing/redirects/rewrites-proxies/).

Em Nginx, enviar **o conteúdo** de `dist/` para a raiz pública do servidor e configurar o bloco existente:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

Em outros hosts, usar a regra equivalente de fallback SPA. A configuração atual assume publicação na raiz do domínio. Para subdiretório, adaptar `base` no Vite, caminhos de assets e links das rotas. Nunca publicar `node_modules/`, `referencias/` ou a pasta completa do workspace como raiz estática; publicar somente `dist/`.

## Estrutura

```text
src/
  App.tsx             # Galeria, três templates e página não encontrada
  components.tsx      # Cabeçalho, fotografias e contato demonstrativo
  content.ts          # Textos, dados, contatos, filtros e imagens
  main.tsx            # Entrada React e fontes locais
  styles.css          # Layouts e responsividade
public/
  images/             # Fotografias das referências e registro de fontes
  licenses/           # Licenças das fontes
  favicon.svg
  _redirects          # Fallback de rotas para hosts compatíveis
scripts/verify.mjs    # Verificação reproduzível de interface
referencias/         # Arquivos fornecidos, preservados
index.html
vite.config.ts
tsconfig.json
package.json
package-lock.json
```

Referência técnica da configuração: [documentação oficial do Vite](https://vite.dev/guide/).
