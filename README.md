# Studio

**Planeje e monte vídeos com o Codex e o Remotion.** O Studio ajuda a analisar um vídeo, transcrever a fala, definir uma direção editorial e compor textos animados, legendas, gráficos, destaques sobre prints e imagens de apoio.

| | | |
|---|---|---|
| ![Referência Minimal Suíço](estilos/imagens/MinimalSuico.jpg) | ![Referência aula em papel creme](estilos/imagens/papel-creme-aula.jpg) | ![Referência terminal técnico](estilos/imagens/tecnico-neon.jpg) |

O [AGENTS.md](AGENTS.md) orienta o Codex no fluxo de trabalho. As composições são feitas em código no Remotion, e os estilos disponíveis estão na [galeria](estilos/README.md).

## Fluxo de trabalho

1. Coloque o vídeo e as referências em uma pasta numerada dentro de `projetos/`.
2. Peça ao Codex para analisar o material e preparar `plano.md`.
3. Revise e aprove o plano antes da montagem.
4. O Codex monta a composição no Remotion e prepara quadros e um vídeo de revisão.
5. Depois da aprovação da prévia, renderize a edição final em `edicoes/`.

Para vídeos gravados, o arquivo de origem permanece intacto. O Remotion compõe os elementos visuais por cima do master.

## Instalação

Requisitos: Node.js, Python 3.10+ e FFmpeg. Na pasta do repositório, instale as dependências:

```bash
npm run instalar
```

Abra a pasta no Codex para carregar as instruções de `AGENTS.md`. Para preparar um projeto, crie uma estrutura como esta:

```text
projetos/001. meu-video/
├── video/       vídeo original
├── prints/      referências citadas no vídeo
├── frames/      quadros de análise
├── transcricao/ transcrição com tempos
├── assets/      assets da edição
└── plano.md     plano para aprovação
```

A pasta `projetos/` é ignorada pelo Git, então vídeos, áudios e materiais de trabalho ficam locais. Os arquivos exportados em `edicoes/` também são ignorados. O repositório mantém o código, os guias, os exemplos e as referências visuais leves.

## Comandos

```bash
npm run studio        # abrir o estúdio do Remotion
npm run compositions  # listar composições disponíveis
npm run typecheck     # verificar TypeScript e layouts
npm run video -- atlas preview # gerar prévia do Atlas
```

Os renders seguem um comando comum: `npm run video -- <slug> <stills|preview|final>`. Cada composição mantém seus metadados em `src/videos/<slug>/project.json`; para adicionar uma, crie sua pasta de código e inclua o projeto em `src/videos/registry.ts`. O Atlas também tem o comando específico `npm run atlas:audio` para regenerar sua trilha.

O fluxo de instalação e os detalhes da primeira edição estão em [guias/1-primeiros-passos.md](guias/1-primeiros-passos.md).

## Estrutura

```text
AGENTS.md      instruções do diretor de vídeo para o Codex
guias/         instalação, Remotion, assets e direção editorial
estilos/       galeria e composições de referência
projetos/      vídeos, referências e materiais de trabalho locais
edicoes/       vídeos finais, projetos editáveis, validações e revisões locais
src/           estilos compartilhados e registro das composições
src/videos/    código e metadados organizados por slug de projeto
scripts/       instalação, renderização e preparação dos quadros de revisão
tools/         transcrição local
```

## Guias

1. [Primeiros passos](guias/1-primeiros-passos.md)
2. [Edição com Remotion](guias/2-edicao-remotion.md)
3. [Manual do Remotion para leigos](guias/3-manual-remotion.md)
4. [Assets visuais com Codex](guias/4-assets-codex.md)
5. [Direção editorial](guias/5-direcao-editorial.md)
6. [Criar um vídeo de motion graphics](guias/6-motion-graphics.md)

## Composição Atlas

O projeto Atlas é um exemplo de vídeo de motion graphics no formato 16:9. O código e os metadados da composição ficam em `src/videos/atlas/`; os arquivos-fonte, fontes e renders ficam nas pastas locais `projetos/001. atlas/` e `edicoes/001. atlas/`, ignoradas pelo Git.

Use `npm run video -- atlas stills`, `npm run video -- atlas preview` e `npm run video -- atlas final` para gerar quadros, prévia e render final. O comando específico `npm run atlas:audio` gera a trilha. Configure os materiais locais descritos em `projetos/001. atlas/LEIA-ME.md` antes de executar esse fluxo.

Cada trabalho tem uma pasta numerada em `projetos/` para plano e assets e outra em `edicoes/` para os entregáveis. Guarde a revisão atual na raiz de `edicoes/<NNN. slug>/revisao/` e versões anteriores em subpastas como `r01/` e `r02/`. Os arquivos de trabalho e exportações ficam locais e não são enviados ao Git.

## Licenças e créditos

- Código e guias deste repositório: [MIT](LICENSE).
- As imagens em `estilos/imagens/` que vêm de vídeos do canal **Macks Wendhell | Inteligência Aplicada** são referências visuais; não as reutilize como material próprio.
- [Remotion](https://www.remotion.dev): confira os termos de licença aplicáveis ao seu uso.
- A transcrição local usa [faster-whisper](https://github.com/SYSTRAN/faster-whisper).
