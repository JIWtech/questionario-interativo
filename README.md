# Questionário interativo — NB Bronze

Versão reduzida e condicional do levantamento de atendimento do NB Bronze, preparada para publicação estática no GitHub Pages.

## O que mudou nesta versão

- O questionário foi reduzido com base na versão revisada em Markdown.
- Perguntas com alternativas reais agora mostram alternativas reais. Ex.: “R$150 ou R$149,99?” apresenta esses dois valores, em vez de “Sim/Não”.
- Perguntas dependentes aparecem somente quando necessárias.
- A ficha de cada serviço é repetível e concentra as informações operacionais, evitando repetir duração, preço, agenda, preparo e cuidados em várias seções.
- Situações de conversa têm dois campos: resposta desejada e destino (continuar com IA ou encaminhar para humano).
- Respostas de texto oferecem atalhos para “Ainda não definido”, “Não se aplica” e “Encaminhar para a equipe”.
- As respostas ficam salvas no navegador e podem ser exportadas para PDF.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie `index.html`, `styles.css` e `app.js` para a raiz do repositório.
3. Abra **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Selecione a branch `main` e a pasta `/ (root)`.
6. Salve e aguarde o GitHub gerar o link.

## PDF

O botão **Gerar e baixar PDF** usa jsPDF carregado pelo CDN. Se o navegador estiver sem internet ou bloquear o CDN, use **Imprimir / salvar como PDF**.
