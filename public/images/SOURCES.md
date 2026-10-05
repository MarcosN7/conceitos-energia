# Fontes das imagens

Os três PNGs foram fornecidos pelo usuário em `referencias/`. As cópias em `public/images/` são arquivos locais da demonstração. Não foram obtidas imagens de bancos externos, nem inventadas URLs.

| Arquivo          | Uso da área fotográfica                                          |
| ---------------- | ---------------------------------------------------------------- |
| `industrial.png` | Panorama de geração, painel elétrico e paisagem do contato       |
| `regional.png`   | Vista de instalação junto à floresta e cena de implantação civil |
| `portfolio.png`  | Painéis solares, grupo gerador e instalação elétrica             |

`src/content.ts`, objeto `photos`, define janelas de enquadramento. O componente `Photo` usa o `viewBox` de SVG como uma janela sobre a fotografia original. O SVG não desenha as cenas. Os textos, títulos, navegação, botões e seções da interface são HTML/React. Nenhuma referência é exibida como captura da página inteira, nem como substituto da interface. O enquadramento da abertura do portfólio exclui o texto sobreposto na referência.

As fotografias são **ilustrativas**; não comprovam clientes, equipe, obras, marcas parceiras ou projetos executados pela empresa. A autoria e licença dos arquivos enviados não foram informadas. Antes de publicar, confirmar os direitos de uso ou substituir por fotografias próprias/autorizadas. Identificações visíveis em uniformes e equipamentos pertencem às cenas ilustrativas e não representam relações comerciais.

Para substituir uma fotografia por um arquivo independente, colocar o novo arquivo nesta pasta e configurar `src`, `baseWidth`, `x: 0`, `y: 0`, `w` e `h` em `photos`. Ajustar `sourceHeight` ao formato original, se não for 2:3 (ver componente `Photo`). Preferir WebP/AVIF com tamanho adequado à exibição; os PNGs completos foram preservados nesta demonstração para manter as referências intactas.
