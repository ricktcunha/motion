# Padrão de projetos de vídeo

Cada composição fica em `src/videos/<slug>/`. Essa pasta contém o código, `project.json` e, quando houver trilha gerada por código, `audio.mjs`.

```text
src/videos/<slug>/
├── project.json       configuração única do vídeo e do render
├── index.tsx          registro das composições desse projeto
├── VideoFilm.tsx      composição principal (nome pode ser específico)
├── audio.mjs          gerador de áudio opcional
└── ...                componentes exclusivos do projeto

projetos/<NNN. slug>/  fontes, referências, assets e plano local
edicoes/<NNN. slug>/   entrega, validação e revisões locais
```

`projectFolder` é o nome da pasta numerada usado tanto em `projetos/` quanto em `edicoes/`; o sufixo precisa corresponder ao slug. O nome da pasta no Studio é derivado desses campos. Assim, número, slug e diretórios não podem divergir.

Cada manifesto declara `slug`, `projectFolder`, `composition` e `render`. `audioGenerator` é opcional e aponta para um arquivo dentro da pasta do projeto. O verificador confere manifestos, ids únicos, entradas `index.tsx` e registro em `registry.ts`.

## Criar projeto

```bash
npm run project:new -- atlas-labs "Atlas Labs"
```

O comando escolhe o próximo número disponível e cria as pastas locais de projeto e entrega e um plano inicial. Revise e aprove o plano antes de programar. Depois, crie `src/videos/<slug>/project.json` e `index.tsx`, registre o projeto em `src/videos/registry.ts` e rode `npm run typecheck`.

## Comandos padronizados

```bash
npm run video -- <slug> audio
npm run video -- <slug> stills [segundos ...]
npm run video -- <slug> preview
npm run video -- <slug> final
npm run typecheck
```

O áudio é opcional. Os arquivos de revisão e saída ficam na pasta numerada em `edicoes/`; versões antigas são preservadas em `revisao/r01/`, `r02/` etc. `project.json` define os nomes e os tempos de saída. `npm run typecheck` valida os manifestos e a estrutura do registro além de verificar o TypeScript.
