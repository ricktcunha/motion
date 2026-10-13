# Composições por projeto

Cada vídeo com composição própria tem uma pasta em `src/videos/<slug>/`:

```text
src/videos/meu-video/
├── index.tsx       componente e registro das composições do projeto
├── project.json    ids, formato, duração e nomes dos arquivos de saída
└── ...             componentes e estilos exclusivos desse vídeo
```

Para adicionar um projeto:

1. Copie `atlas/index.tsx` e `atlas/project.json` como ponto de partida e troque o componente e os metadados.
2. Em `registry.ts`, importe o projeto e acrescente-o ao array `videoProjects`.
3. Use `npm run video -- <slug> stills`, `npm run video -- <slug> preview` e `npm run video -- <slug> final`.

O `project.json` é compartilhado pelo registro do Remotion e pelo renderizador. `projectFolder` e `editionFolder` são os nomes locais em `projetos/` e `edicoes/`; o `slug` é curto, sem o prefixo numérico. A composição principal declara `id`, `width`, `height`, `fps`, `durationInFrames` e `defaultProps`. A seção `render` define nomes de saída, tempos padrão para quadros e opções de prévia. `normalizeDurationSeconds` é opcional e deve ser usado somente quando o projeto precisar ajustar a duração do áudio após a exportação.

Os comandos específicos de um projeto devem ficar para tarefas exclusivas, como gerar uma trilha original. Quadros, prévias e renders finais usam o comando compartilhado.
