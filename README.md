# Trabalho 2 - CG 2023.1

## Antonio Gabriel Magalhães Alves - 496218
## Linguagem:
- Javascript 
## Como executar:

- Basta executar em um servidor.
- Para fins de teste, construi esse trabalho usando o live server do vscode.

## Comandos:

- **w** - Desloca a câmera no eixo Z - no sentido negativo.
- **s** - Desloca a câmera no eixo Z - no sentido positivo.
- **a** - Desloca a câmera no eixo X - no sentido negativo.
- **d** - Desloca a câmera no eixo X - no sentido positivo.
- **g** - Desloca a câmera no eixo Y - no sentido negativo.
- **t** - Desloca a câmera no eixo Y - no sentido positivo.

- **ArrowUp** - Rotaciona a visao da camera para cima.
- **ArrowDown** - Rotaciona a visao da camera para baixo.
- **ArrowLeft** - Rotaciona a visao da camera para esquerda.
- **ArrowRight** - Rotaciona a visao da camera para direita.

## Requisitos:
- **Movimentação de câmera e projeção perspectiva:**
    - Movimentação e projeção perspectiva implementada.
- **Iluminação utilizando modelo de reflexão de Phong com movimentação de pelo menos uma fonte de luz**
    - 2 Luzes direcionais implementadas.
    - 4 Luzes posicionais implementadas.
        - Duas na frente rotacionando no Eixo Z
        - Outras duas estão setadas para iluminar o interior 
    - Luz especular implementada.
- **Pelo menos um objeto animado por transformações**
    - Placa na parede da frente rotacionando no eixo Y.
- **Pelo menos um elemento preenchido por cor sólida** 
    - Paredes
- **Bibliotecas Usadas**
    - Math.js
- **Deve haver uma câmera que represente a visão em primeira pessoa da cena**
    - Visão em primeira pessoa implementada.
- **Deve ser possível controlar a câmera (isto é, passear pelo ambiente) utilizando as setas do teclado (opcionalmente, mouse também). Não há a necessidade de implementar detecção de colisão**
    - Controles de câmera implementados.

- **O cenário deve ser construído “na mão”, isto é, não é permitido utilizar objeto modelado em um software externo (por exemplo, Blender) e carregá-lo no seu programa**
    - As coordenadas de todos os poligonos no cenário foram definidas manualmente no arquivo webgl.js.

