# projetos/

Coloque aqui o material de cada vídeo. Uma pasta por vídeo:

```text
projetos/
└─ 001. meu-video/
   ├─ video/    o vídeo gravado, já cortado (MP4 ou MOV)
   └─ prints/   prints e imagens do que você quer ver animado
```

- Numeração com três dígitos, ponto e espaço: `001. nome`, `002. nome`...
- Não sabe o nome ainda? Solte o vídeo direto em `projetos/` e peça ao Codex para organizar.
- **Prints melhoram muito o resultado.** Tire print de sites, notícias, telas e gráficos que você cita e salve em `prints/` com nomes claros (`noticia-google.png`).
- Use `npm run project:new -- <slug> "<nome>"` para preparar a próxima pasta e um plano em branco antes de definir a edição. O Codex cria os arquivos durante o fluxo.

Esta pasta fica fora do Git, com exceção de `000. exemplo/`, que contém o plano-modelo e o exemplo completo de referência. Masters, prints, transcrições e assets de cada vídeo ficam locais.
