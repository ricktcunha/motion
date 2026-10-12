# Primeiros passos

Este projeto usa o Codex para planejar a edição, criar assets visuais com as skills disponíveis e montar o resultado no Remotion.

## O que instalar

| Requisito | Para que serve |
|---|---|
| Codex | orientar a análise e a edição, e acessar as skills disponíveis |
| Node.js | executar o Remotion |
| Python 3.10+ | transcrever o áudio localmente |
| FFmpeg e FFprobe | inspecionar e renderizar mídia |

No terminal, dentro da pasta do projeto, rode:

```bash
npm run instalar
```

O comando instala dependências do Remotion e `faster-whisper`. As skills de criação de imagens são recursos do ambiente Codex; não são instaladas por este repositório. Para imagens, use `imagegen` quando estiver disponível.

## Preparar um projeto

Crie uma pasta por vídeo. Numere com três dígitos e ponto:

```text
projetos/
└─ 001. meu-video/
   ├─ video/       vídeo gravado e já cortado
   ├─ prints/      referências, telas, notícias e gráficos
   ├─ assets/      imagens e outros assets criados para a edição
   ├─ transcricao/ transcrição com tempo por palavra
   ├─ frames/      quadros de referência do vídeo
   └─ plano.md     plano aprovado da edição
```

Use nomes claros nos arquivos, como `noticia-google.png` ou `entrevista.mp4`. O vídeo deve estar finalizado antes de começar a edição gráfica.

## Começar no Codex

Abra esta pasta no Codex. O arquivo `AGENTS.md` contém as orientações do projeto. Peça para analisar um projeto, por exemplo: “Analise o vídeo em `projetos/001. meu-video/` e proponha um plano de edição”.

O fluxo é: analisar material e transcrição → propor `plano.md` → aguardar sua aprovação → criar assets e montar → mostrar quadros de revisão → aguardar aprovação → renderizar em `edicoes/`.

Para uma análise inicial da direção visual, consulte a [galeria de estilos](../estilos/README.md) e a [direção editorial](5-direcao-editorial.md). Para criar um vídeo animado sem gravação de câmera, siga o [fluxo de motion graphics](6-motion-graphics.md).

## Comandos do projeto

```bash
npm run studio         # abrir a prévia do Remotion
npm run typecheck       # conferir tipos e layouts
npm run compositions    # listar composições
```

Se a transcrição falhar porque `faster-whisper` não está instalado, rode `npm run instalar`. Para renderizar vídeo, instale FFmpeg e FFprobe pelo gerenciador do seu sistema (winget no Windows ou Homebrew no macOS).

## Estrutura do repositório

- `projetos/`: vídeos, referências, assets e planos. O conteúdo de trabalho fica fora do Git, exceto o projeto de exemplo.
- `edicoes/`: entregáveis finais.
- `src/`: estilos de exemplo e composições do Remotion.
- `tools/transcrever.py`: transcrição local com tempo por palavra.
- `AGENTS.md`: instruções do Codex para este projeto.
