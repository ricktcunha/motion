# Criar um vídeo de motion graphics

Use este fluxo quando o vídeo será criado do zero com tipografia, formas, gráficos, ilustrações e animação, sem uma gravação de câmera como base. A composição é feita no Remotion; as skills do Codex, como `imagegen`, entram quando uma cena se beneficia de uma imagem ou textura gerada.

## O que definir

Ao iniciar, combine com a pessoa:

- objetivo e público do vídeo;
- mensagem principal e roteiro, ou autorização para propor um roteiro;
- duração aproximada;
- formato: horizontal 16:9, vertical 9:16 ou outro;
- idioma, voz/narração e música, se houver;
- estilo visual, usando a [galeria](../estilos/README.md) como referência.

Se faltar algum detalhe secundário, proponha um padrão e registre-o no plano. Não invente afirmações factuais, estatísticas, citações ou marcas.

## Etapas

1. **Planejar:** crie `projetos/<NNN. nome>/plano.md` com roteiro, duração, proporção, cenas, textos na tela, transições, áudio e assets. Para cada cena, anote a duração e o que muda visualmente.
2. **Aprovar:** mostre o plano e espere a aprovação antes de programar ou gerar imagens.
3. **Criar assets:** use `imagegen` ou outra skill disponível no Codex para ilustrações e fundos que ajudem a narrativa. Salve-os em `projetos/<NNN. nome>/assets/`. Crie textos, gráficos, ícones simples e formas no próprio Remotion. Mantenha consistência de paleta, luz, enquadramento e estilo; não gere texto dentro das imagens.
4. **Montar:** implemente uma composição autônoma em `src/videos/<slug>/` e registre-a em `src/Root.tsx`. Defina a duração em quadros a partir do fps aprovado. Use `useCurrentFrame()` e as ferramentas de animação do Remotion para controlar entradas, saídas, movimento e transições. Se houver narração, sincronize os elementos com o roteiro ou a transcrição.
5. **Preparar a prévia:** rode `npm run typecheck`. Salve quadros PNG representativos em `edicoes/<NNN. nome>/revisao/stills/` com `npx remotion still src/index.ts <Composicao> "edicoes/<NNN. nome>/revisao/stills/quadro.png" --frame=<quadro>`. Renderize a composição para `edicoes/<NNN. nome>/revisao/previa.mp4` com `npx remotion render src/index.ts <Composicao> "edicoes/<NNN. nome>/revisao/previa.mp4" --codec=h264 --crf=28`. Inclua pelo menos a abertura, um quadro por cena e as transições mais importantes. Compartilhe links clicáveis para o MP4 e os stills na conversa. Para assistir com controles e timeline, a pessoa também pode abrir `npm run studio`.
6. **Revisar:** peça comentários sobre ritmo, texto, cores, legibilidade e transições. Faça os ajustes e gere uma nova prévia. Não renderize a versão final até receber aprovação explícita da prévia.
7. **Entregar:** após aprovação, renderize a versão final em `edicoes/<NNN. nome>/<nome>-final.mp4`. Informe formato, duração e o caminho do arquivo.

## O que a prévia precisa mostrar

Os PNGs servem para avaliar composição e legibilidade em momentos específicos. O MP4 de revisão é necessário para julgar ritmo, timing, entradas e transições. Se a composição for longa, pode preparar uma prévia com trechos representativos; deixe isso claro e inclua pelo menos um trecho contínuo com a sequência principal. A prévia não substitui a aprovação do plano nem a aprovação final do vídeo.

## Pedido de exemplo

```text
Crie um motion graphic de 30 segundos para explicar como funciona juros compostos.
Vertical 9:16, visual editorial simples, narração em português. Proponha o roteiro
e o plano primeiro; depois espere minha aprovação antes de criar os assets.
```
