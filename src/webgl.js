//Array de texturas
var teximg =[]
var texSrc =["img/madeira_resize.jpg","img/chrono_trigger.jpg",
            "img/ffvii.jpg","img/dark souls.jpeg","img/hollow_knight.jpeg",
            "img/mgsv.jpg","img/ocarina_time.jpg",]
var loadTex =0
var gl
var prog
var angle=0

var cam_position=[0.3,0.5,-1.5]
var cam_look = [-1,0.6,-1.7]


function getGL(canvas)
{
    // Pega o contexto webgl do canvas
    var gl = canvas.getContext("webgl");
    //Verifica a inicialização
    if(gl) return gl;
    
    alert("Contexto WebGL inexistente! Troque de navegador!");
    return false;
}

//Contexto webgl, tipo de shader e o código fonte do shader
function createShader(gl, shaderType, shaderSrc)
{

	var shader = gl.createShader(shaderType);
	gl.shaderSource(shader, shaderSrc);
	gl.compileShader(shader);
	
	if(gl.getShaderParameter(shader, gl.COMPILE_STATUS))
		return shader;
	
	alert("Erro de compilação: " + gl.getShaderInfoLog(shader));
	
	gl.deleteShader(shader);
}

function createProgram(gl, vtxShader, fragShader)
{
	var prog = gl.createProgram();
	gl.attachShader(prog, vtxShader);
	gl.attachShader(prog, fragShader);
	gl.linkProgram(prog);
	
	if(gl.getProgramParameter(prog, gl.LINK_STATUS))
		return prog;

    alert("Erro de linkagem: " + gl.getProgramInfoLog(prog));
	
	gl.deleteProgram(prog);	
}

function init(){
    //Garante que as texturas serão carregadas totalmente antes de iniciar o programa
    teximg[0] = new Image()
    teximg[0].src = texSrc[0]
    teximg[0].onload= ()=>{
        
        loadTex++
        loadTextures()
    }
    

    teximg[1]= new Image()
    teximg[1].src = texSrc[1]
    teximg[1].onload= function(){
        loadTex++
        loadTextures()
    }

    teximg[2]= new Image()
    teximg[2].src = texSrc[2]
    teximg[2].onload= function(){
        loadTex++
        loadTextures()
    }

    teximg[3]= new Image()
    teximg[3].src = texSrc[3]
    teximg[3].onload= function(){
        loadTex++
        loadTextures()
    }

    teximg[4]= new Image()
    teximg[4].src = texSrc[4]
    teximg[4].onload= function(){
        loadTex++
        loadTextures()
    }

    teximg[5]= new Image()
    teximg[5].src = texSrc[5]
    teximg[5].onload= function(){
        loadTex++
        loadTextures()
    }

    teximg[6]= new Image()
    teximg[6].src = texSrc[6]
    teximg[6].onload= function(){
        loadTex++
        loadTextures()
    }

        
function loadTextures(){
    if (loadTex == teximg.length){
        initGl()
        configScene()
        draw()
    }
}

}

function initGl()
{

    var canvas = document.getElementById("cg");

    gl = getGL(canvas);
    if(gl)
    {
        //Inicializa shaders
        var vtxShSrc = document.getElementById("vertex-shader").text;
        var fragShSrc = document.getElementById("frag-shader").text;

        var vtxShader = createShader(gl, gl.VERTEX_SHADER, vtxShSrc);
        var fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragShSrc);
        prog = createProgram(gl, vtxShader, fragShader);	
        
        //Avisa ao webgl que deve usar o seguinte programa
        gl.useProgram(prog);

        //Inicializa Ã¡rea de desenho: viewport e cor de limpeza; modo de mistura de cor;limpa a tela
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(0, 0, 0, 1);
        gl.enable( gl.BLEND );
        gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
        gl.enable(gl.DEPTH_TEST)
        //Não renderize faces que não vemos
        //gl.enable(gl.CULL_FACE)

    }
}
// Onde é setado os poligonos da cena, configurado as texturas e etc.
function configScene(){
    //Define coordenadas dos triangulos e suas propriedades (cor ou textura)
    var coordTriangles = new Float32Array([
                                        //Parede Frente - 0
                                        //    x     y    z   
                                            -0.75,  0.90, 0.0,  
                                            -0.75,   0.0, 0.0, 
                                             0.75,   0.0, 0.0, 
                                             0.75,  0.90, 0.0, 
                                            -0.75,  0.90, 0.0, 
                                        
                                        //Porta - 5
                                            -0.25,  0.45, 0.01, 
                                            -0.25,   0.0, 0.01, 
                                             0.25,   0.0, 0.01, 
                                             0.25,  0.45, 0.01, 
                                            -0.25,  0.45, 0.01, 
                                        
                                        //Parede Esquerda - 1

                                            -0.75,  0.90, -1, 
                                            -0.75,   0.0, -1, 
                                            -0.75,   0.0,  0, 
                                            -0.75,  0.90,  0, 
                                            -0.75,  0.90, -1,

                                        //Parede esquerda - 2 
                                               -2,  0.90, -1, 
                                               -2,   0.0, -1, 
                                            -0.75,   0.0, -1, 
                                            -0.75,  0.90, -1, 
                                               -2,  0.90, -1,

                                        //Parede esquerda - 3 
                                            -2,  0.90, -1, 
                                            -2,   0.0, -1, 
                                            -2,   0.0, -2, 
                                            -2,  0.90, -2, 
                                            -2,  0.90, -1,

                                        // Parede Fundo
                                               -2,  0.90, -2, 
                                               -2,   0.0, -2,
                                             0.75,   0.0, -2,
                                             0.75,  0.90, -2,
                                               -2,  0.90, -2,

                                            
                                        //Parede Direita
                                            0.75, 0.90,  0,
                                            0.75,  0.0,  0,
                                            0.75,  0.0, -2,
                                            0.75, 0.90, -2,
                                            0.75, 0.90,  0,

                                        //Chão Frente

                                            0.75, 0,  0,
                                            0.75, 0, -2,
                                           -0.75, 0, -2,
                                           -0.75, 0,  0,
                                            0.75, 0,  0,

                                        //Chão tras

                                           -0.75, 0, -1,
                                           -0.75, 0, -2,
                                              -2, 0, -2,
                                              -2, 0, -1,
                                           -0.75, 0, -1,
                                            
                                        
                                        //Teto

                                            0.75, 0.90, 0,
                                            0.75, 0.90, -2,
                                              -2, 0.90, -2,
                                              -2, 0.90,  0,
                                            0.75, 0.90, 0,

                                        //Quadro parede esquerda - CHRONO TRIGGER
                                            -0.749,  0.8, -0.20, 
                                            -0.749,  0.25, -0.20, 
                                            -0.749,  0.25, -0.80, 
                                            -0.749,  0.8,  -0.80, 
                                            -0.749,  0.8, -0.20,

                                        //Quadro Parede Esquerda 2

                                            -0.95,  0.8, -1.01,
                                            -0.95, 0.25, -1.01,
                                            -1.55, 0.25, -1.01,
                                            -1.55,  0.8, -1.01,
                                            -0.95,  0.8, -1.01,

                                        //Quadro parede esquerda 3
                                            -1.99,  0.8, -1.20,
                                            -1.99, 0.25, -1.20,
                                            -1.99, 0.25, -1.80,
                                            -1.99,  0.8, -1.80,
                                            -1.99,  0.8, -1.20,

                                        
                                        //Placa de Titulo -- Textura

                                            /* -0.40, 0.68, 0.01, 1.0, 1.0, 1.0,
                                            -0.40, 0.50, 0.01, 1.0, 1.0, 1.0,
                                             0.40, 0.50, 0.01, 1.0, 1.0, 1.0,
                                             0.40, 0.68, 0.01, 1.0, 1.0, 1.0,
                                            -0.40, 0.68, 0.01, 1.0, 1.0, 1.0 */

                                            ]);
    //Cria buffer na GPU e copia coordenadas para ele
    
    var bufPtr = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufPtr);
    gl.bufferData(gl.ARRAY_BUFFER, coordTriangles, gl.STATIC_DRAW);
    
    //Pega ponteiro para o atributo "position" do vertex shader
    var positionPtr = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(positionPtr);
    //Especifica a cÃ³pia dos valores do buffer para o atributo
    gl.vertexAttribPointer(positionPtr, 
                            3,        //quantidade de dados em cada processamento
                            gl.FLOAT, //tipo de cada dado (tamanho)
                            false,    //nÃ£o normalizar
                            3*4,      //tamanho do bloco de dados a processar em cada passo
                                        //0 indica que o tamanho do bloco Ã© igual a tamanho
                                        //lido (2 floats, ou seja, 2*4 bytes = 8 bytes)
                            0         //salto inicial (em bytes)
                            );

    var vertex_color = new Float32Array([
                                        //Cor primeira parede
                                            1.0, 1.0, 0.0,
                                            1.0, 1.0, 0.0,
                                            1.0, 1.0, 0.0,
                                            1.0, 1.0, 0.0,
                                            1.0, 1.0, 0.0,

                                        //Cor da porta
                                            0.585, 0.2929, 0.0,
                                            0.585, 0.2929, 0.0,
                                            0.585, 0.2929, 0.0,
                                            0.585, 0.2929, 0.0,
                                            0.585, 0.2929, 0.0,

                                        //Cor parede da esquerda - 1
                                            1.0, 1.0, 0.0,
                                            1.0, 1.0, 0.0,
                                            1.0, 1.0, 0.0,
                                            1.0, 1.0, 0.0,
                                            1.0, 1.0, 0.0,
                                        
                                        //Cor Parede esquerda - 2
                                            1.0, 1.0, 0.0,
                                            1.0, 1.0, 0.0,
                                            1.0, 1.0, 0.0,
                                            1.0, 1.0, 0.0,
                                            1.0, 1.0, 0.0,

                                        //Cor Parede esquerda - 3
                                            1.0, 1.0, 0.0,
                                            1.0, 1.0, 0.0,
                                            1.0, 1.0, 0.0,
                                            1.0, 1.0, 0.0,
                                            1.0, 1.0, 0.0,

                                        //Cor parede fundo

                                            1.0, 1.0, 0.0,
                                            1.0, 1.0, 0.0,
                                            1.0, 1.0, 0.0,
                                            1.0, 1.0, 0.0,
                                            1.0, 1.0, 0.0,

                                        //Cor parede Direita

                                            1.0, 1.0, 0.0,
                                            1.0, 1.0, 0.0,
                                            1.0, 1.0, 0.0,
                                            1.0, 1.0, 0.0,
                                            1.0, 1.0, 0.0,

                                        //Cor chão frente

                                            0.8671, 0.7187, 0.5273,
                                            0.8671, 0.7187, 0.5273,
                                            0.8671, 0.7187, 0.5273,
                                            0.8671, 0.7187, 0.5273,
                                            0.8671, 0.7187, 0.5273,
                                            
                                        //Cor chao tras
                                            0.8671, 0.7187, 0.5273,
                                            0.8671, 0.7187, 0.5273,
                                            0.8671, 0.7187, 0.5273,
                                            0.8671, 0.7187, 0.5273,
                                            0.8671, 0.7187, 0.5273,

                                        //Cor teto
                                            1.0,1.0,1.0,
                                            1.0,1.0,1.0,
                                            1.0,1.0,1.0,
                                            1.0,1.0,1.0,
                                            1.0,1.0,1.0,

                                        //Cor do quadro
                                            0,0,0,
                                            0,0,0,
                                            0,0,0,
                                            0,0,0,
                                            0,0,0,

                                        // Cor segundo Quadro
                                            0,0,0,
                                            0,0,0,
                                            0,0,0,
                                            0,0,0,
                                            0,0,0,
                                        
                                        // Cor Terceiro Quadro
                                            0,0,0,
                                            0,0,0,
                                            0,0,0,
                                            0,0,0,
                                            0,0,0,
                                                
                                            
    ])

    var bufColor = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, bufColor);
    gl.bufferData(gl.ARRAY_BUFFER, vertex_color, gl.STATIC_DRAW);

    var colorPtr = gl.getAttribLocation(prog,"fcolor")
    gl.enableVertexAttribArray(colorPtr)
    gl.vertexAttribPointer(colorPtr,
                            3,
                            gl.FLOAT,
                            false,
                            3*4,
                            0)

    var texture_coordenate= new Float32Array([
                                                //  x  y  z
                                            //Coordenadas Frente
                                                0,0,
                                                0,0,
                                                0,0,
                                                0,0,
                                                0,0,

                                            //Coordenadas Porta
                                                0,0,
                                                0,0,
                                                0,0,
                                                0,0,
                                                0,0,

                                            //Coordenadas parede da Esquerda -1
                                                0,0,
                                                0,0,
                                                0,0,
                                                0,0,
                                                0,0,
                                            
                                            //Coordenadas parede esquerda - 2

                                                0,0,
                                                0,0,
                                                0,0,
                                                0,0,
                                                0,0,

                                            //Coordenadas parede esquerda - 3

                                                0,0,
                                                0,0,
                                                0,0,
                                                0,0,
                                                0,0,

                                            //Coordenadas Parede Fundo

                                                0, 0,
                                                0, 0,
                                                0, 0,
                                                0, 0,
                                                0, 0,

                                            // Coordenadas Parede Direita

                                                0,0,
                                                0,0,
                                                0,0,
                                                0,0,
                                                0,0,

                                            //Coordenadas Chão frente
                                                
                                                0,0,
                                                1,0,
                                                1,1,
                                                0,1,
                                                0,0,

                                            // Coordenadas chao tras

                                                0,0,
                                                1,0,
                                                1,1,
                                                0,1,
                                                0,0,
                                            
                                            //Textura chão
                                                0,0,
                                                0,0,
                                                0,0,
                                                0,0,
                                                0,0,
                                            
                                            //Coordenada de Textura Quadro 1
                                                0,0,
                                                0,1,
                                                1,1,
                                                1,0,
                                                0,0,

                                            //Coordenada de Textura Quadro 2

                                                0,0,
                                                0,1,
                                                1,1,
                                                1,0,
                                                0,0,

                                            //Coordenada de Textura Quadro 3

                                                0,0,
                                                0,1,
                                                1,1,
                                                1,0,
                                                0,0,


                                            ])
    
    var buftexture = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buftexture);
    gl.bufferData(gl.ARRAY_BUFFER, texture_coordenate, gl.STATIC_DRAW);

    var textCoordPtr = gl.getAttribLocation(prog, "texCoord");
    gl.enableVertexAttribArray(textCoordPtr);
    //Especifica a cÃ³pia dos valores do buffer para o atributo
    gl.vertexAttribPointer(textCoordPtr, 
                            2,        //quantidade de dados em cada processamento
                            gl.FLOAT, //tipo de cada dado (tamanho)
                            false,    //nÃ£o normalizar
                            2*4,      //tamanho do bloco de dados a processar em cada passo
                                        //0 indica que o tamanho do bloco Ã© igual a tamanho
                                        //lido (2 floats, ou seja, 2*4 bytes = 8 bytes)
                            0*4       //salto inicial (em bytes)
                            );
    
    //Carregar textura na gpu
    var text0 = gl.createTexture()
    //Diz qual o slot de textura será trabalhada no momento
    gl.activeTexture(gl.TEXTURE0)
    //Atribui ao slot ativo a textura criada em text0
    gl.bindTexture(gl.TEXTURE_2D,text0)
    //Configura o mapeamento de textura
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST)

    //
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,teximg[0])
    
    //Carregando segunda textura
    var tex1 = gl.createTexture()
    gl.activeTexture(gl.TEXTURE1)
    gl.bindTexture(gl.TEXTURE_2D,tex1)

    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST)

    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,teximg[1])

    var tex2 = gl.createTexture()
    gl.activeTexture(gl.TEXTURE2)
    gl.bindTexture(gl.TEXTURE_2D,tex2)

    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST)

    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,teximg[2])

    var tex3 = gl.createTexture()
    gl.activeTexture(gl.TEXTURE3)
    gl.bindTexture(gl.TEXTURE_2D,tex3)

    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST)

    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,teximg[3])

    var tex4 = gl.createTexture()
    gl.activeTexture(gl.TEXTURE4)
    gl.bindTexture(gl.TEXTURE_2D,tex4)

    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST)

    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,teximg[4])

    var tex5 = gl.createTexture()
    gl.activeTexture(gl.TEXTURE5)
    gl.bindTexture(gl.TEXTURE_2D,tex5)

    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST)

    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,teximg[5])

    var tex6 = gl.createTexture()
    gl.activeTexture(gl.TEXTURE6)
    gl.bindTexture(gl.TEXTURE_2D,tex6)

    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST)

    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,teximg[6])


    var normals = new Float32Array([
                                    //Normal Parede Frente
                                    //  x  y  z
                                        0, 0, 1,
                                        0, 0, 1,
                                        0, 0, 1,
                                        0, 0, 1,
                                        0, 0, 1,

                                    //Normal Porta
                                        0, 0, 1,
                                        0, 0, 1,
                                        0, 0, 1,
                                        0, 0, 1,
                                        0, 0, 1,

                                    //Normal parede da Esquerda -1
                                        1, 0, 0,
                                        1, 0, 0,
                                        1, 0, 0,
                                        1, 0, 0,
                                        1, 0, 0,
                                    
                                    //Normal parede esquerda - 2 Erro Iluminacao

                                        0, 0, 1,
                                        0, 0, 1,
                                        0, 0, 1,
                                        0, 0, 1,
                                        0, 0, 1,

                                    //Normal parede esquerda - 3

                                        1, 0, 0,
                                        1, 0, 0,
                                        1, 0, 0,
                                        1, 0, 0,
                                        1, 0, 0,

                                    //Normal Fundo - Erro Iluminação

                                        0, 0, 1,
                                        0, 0, 1,
                                        0, 0, 1,
                                        0, 0, 1,
                                        0, 0, 1,

                                    // Normal Parede Direita

                                        1, 0, 0,
                                        1, 0, 0,
                                        1, 0, 0,
                                        1, 0, 0,
                                        1, 0, 0,

                                    //Normal Chão frente

                                        0, 1, 0,
                                        0, 1, 0,
                                        0, 1, 0,
                                        0, 1, 0,
                                        0, 1, 0,

                                    //Normal Chao Tras
                                        0, 1, 0,
                                        0, 1, 0,
                                        0, 1, 0,
                                        0, 1, 0,
                                        0, 1, 0,
                                    
                                    //Normal teto
                                        0, 1, 0,
                                        0, 1, 0,
                                        0, 1, 0,
                                        0, 1, 0,
                                        0, 1, 0,

                                    // Normal Quadro 1

                                        1, 0, 0,
                                        1, 0, 0,
                                        1, 0, 0,
                                        1, 0, 0,
                                        1, 0, 0,


                                    // Normal Quadro 2 - Negativo

                                        0, 0, 1,
                                        0, 0, 1,
                                        0, 0, 1,
                                        0, 0, 1,
                                        0, 0, 3,

                                    // Normal Quadro 3 - 

                                        1, 0, 0,
                                        1, 0, 0,
                                        1, 0, 0,
                                        1, 0, 0,
                                        1, 0, 0
                                    ]);
    //Cria buffer na GPU e copia coordenadas para ele
    var bufnormalsPtr = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufnormalsPtr);
    gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);

    //Pega ponteiro para o atributo "position" do vertex shader
    var normalPtr = gl.getAttribLocation(prog, "normal");
    gl.enableVertexAttribArray(normalPtr);
    //Especifica a cÃ³pia dos valores do buffer para o atributo
    gl.vertexAttribPointer(normalPtr, 
                            3,        //quantidade de dados em cada processamento
                            gl.FLOAT, //tipo de cada dado (tamanho)
                            false,    //nÃ£o normalizar
                            3*4,      //tamanho do bloco de dados a processar em cada passo
                                    //0 indica que o tamanho do bloco Ã© igual a tamanho
                                    //lido (2 floats, ou seja, 2*4 bytes = 8 bytes)
                            0         //salto inicial (em bytes)
                            )
    //Adiciona direção a luz
    //Negativo é entrando positivo é saindo da tela
    var lightPtr =gl.getUniformLocation(prog,"light_direction")
    gl.uniform3fv(lightPtr,[-1,-10,-10])
    
    //Adiciona cor a luz
    var light_color_ptr =gl.getUniformLocation(prog,"light_color")
    gl.uniform3fv(light_color_ptr,[1.0,1.0,1.0])

    var light_position_ptr =gl.getUniformLocation(prog,"light_position")
    gl.uniform3fv(light_position_ptr,[0.25,1,0.5])

    var cam_position_ptr =gl.getUniformLocation(prog,"cam_pos")
    gl.uniform3fv(cam_position_ptr,cam_position)



}   

//Cria matriz de perspectiva
function createPerspective(fovy,aspect,near,far){

    fovy = fovy*Math.PI/180.0

    var fy = 1/math.tan(fovy/2.0)
    var fx = fy/aspect

    var B = -2*far*near/(far*near)
    var A = -(far+near)/(far-near)

    var proj = math.matrix([
        [fx,0,0,0],
        [0,fy,0,0],
        [0,0,A,B],
        [0,0,-1,0]
    ])
    return proj
}

function createCamera(pos, target, up){

    var zc =math.subtract(pos,target)
    zc = math.divide(zc,math.norm(zc))
    
    var yt = math.subtract(up, pos)
    yt = math.divide(yt,math.norm(yt))
    
    var xc = math.cross(yt, zc)
    xc = math.divide(xc,math.norm(xc))
    
    var yc = math.cross(zc, xc);
    yc = math.divide(yc,math.norm(yc))
    
    var mt = math.inv(math.transpose(math.matrix([xc,yc,zc])))
    
    mt = math.resize(mt,[4,4],0)

    mt._data[3][3] =1
    
    mov = math.matrix([
                        [1, 0, 0, -pos[0]], 
                        [0, 1, 0, -pos[1]], 
                        [0, 0, 1, -pos[2]], 
                        [0, 0, 0, 1]
                    ])
    
    var cam = math.multiply(mt,mov)
    
    return cam
}


function createTransformation(n){
    return math.identity(n)
}

function composeTranslation(m, tx, ty, tz){
    m1 = math.matrix([[1, 0, 0, tx], 
                     [0, 1, 0, ty],
                     [0, 0, 1, tz], 
                     [0, 0, 0, 1,]])
    return math.multiply(m1,m)
}

function composeRotation(m,ang,eixo){

    var mt
    ang = ang* Math.PI/180

    if (eixo == 'x'){
        mt =math.matrix([
            [1, 0, 0, 0],
            [0, Math.cos(ang), -Math.sin(ang), 0],
            [0, Math.sin(ang),  Math.cos(ang), 0], 
            [0, 0, 0, 1]]
        )

    }else if (eixo =='y'){
        mt =math.matrix([
            [Math.cos(ang), 0, -Math.sin(ang), 0],
            [0, 1, 0, 0],
            [Math.sin(ang), 0,  Math.cos(ang), 0],
            [0, 0, 0, 1]])

    }else if( eixo=='z'){
        mt =math.matrix([
            [Math.cos(ang), -Math.sin(ang), 0, 0],
            [Math.sin(ang),  Math.cos(ang), 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]])
    }
    
    return math.multiply(mt,m)
}

function composeScale(m, sx, sy, sz){
    m1 = math.matrix([[sx, 0, 0, 0], 
                    [0, sy, 0, 0],
                    [0, 0, sz, 0], 
                    [0, 0, 0, 1]]);
    return math.multiply(m1,m)
}

function sleep(mili){
    return new Promise(resolve=>(setTimeout(resolve,mili)))
}

function draw(){

    //Criar matriz de projeção
    var mproj = createPerspective(30,gl.canvas.width/gl.canvas.height,1,50 )

    /* var cam = createCamera([5,5,5],[0,0,0],[5,6,5]) */
    var cam = createCamera(cam_position,cam_look,[cam_position[0],cam_position[1]+1,cam_position[2]])
    

    var transf = createTransformation(4)
    transf= composeScale(transf,1,1,1)
    
    var transf_proj = math.multiply(cam,transf)
    transf_proj = math.multiply(mproj,transf_proj)
    transf_proj = math.flatten(math.transpose(transf_proj))._data


    //Ponteiro para a matriz de transformação com projeção de camera
    var transProjfPtr = gl.getUniformLocation(prog,"transf_projecao")
    gl.uniformMatrix4fv(transProjfPtr,false,transf_proj)

    
    //Matriz de transformação sem projeção de camera
    transf = math.flatten(math.transpose(transf))._data
    var transfPtr = gl.getUniformLocation(prog,"transf")
    gl.uniformMatrix4fv(transfPtr,false,transf)

    //Indica se é para usar textura ou cor
    var is_colorPtr = gl.getUniformLocation(prog,"is_color")
    //Indica o slot de textura a ser usado
    var texPtr =gl.getUniformLocation(prog,"text")

    //Limpa a tela e o buffer de profundidade
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //Cria um ponteiro para a variável que indica qual o slot onde a textura está
    //Muda o valor dessa variável
    gl.uniform1i(texPtr,0)
    gl.uniform1i(is_colorPtr,1)

    //Desenha parede da frente
    gl.drawArrays(gl.TRIANGLES, 0,3);
    gl.drawArrays(gl.TRIANGLES,2,3);

    //Desenha Porta
    gl.drawArrays(gl.TRIANGLES, 5,3);
    gl.drawArrays(gl.TRIANGLES,7,3);

    //Desenhar parede esquerda - 1
    gl.drawArrays(gl.TRIANGLES, 10,3);
    gl.drawArrays(gl.TRIANGLES, 12,3);

    // Desenha a parede da esquerda - 2
    gl.drawArrays(gl.TRIANGLES, 15,3);
    gl.drawArrays(gl.TRIANGLES, 17,3);

    //Desenha a parede da esquerda 3
    gl.drawArrays(gl.TRIANGLES,20,3)
    gl.drawArrays(gl.TRIANGLES,22,3)

    //Desenha o fundo
    gl.drawArrays(gl.TRIANGLES,25,3)
    gl.drawArrays(gl.TRIANGLES,27,3)

    //Desenha parede da Direita
    gl.drawArrays(gl.TRIANGLES,30,3)
    gl.drawArrays(gl.TRIANGLES,32,3)

    gl.uniform1i(is_colorPtr,0)

    //Desenha chão frente
    gl.drawArrays(gl.TRIANGLES,35,3)
    gl.drawArrays(gl.TRIANGLES,37,3)

    //Desenha chao tras
    gl.drawArrays(gl.TRIANGLES,40,3)
    gl.drawArrays(gl.TRIANGLES,42,3)

    gl.uniform1i(is_colorPtr,1)
    
    //Desenha teto
    gl.drawArrays(gl.TRIANGLES,45,3)
    gl.drawArrays(gl.TRIANGLES,47,3)

    //Desenha primeiro quadro - Chrono Trigger

    gl.uniform1i(is_colorPtr,0)
    gl.uniform1i(texPtr,1)

    gl.drawArrays(gl.TRIANGLES,50,3)
    gl.drawArrays(gl.TRIANGLES,52,3)

    //Desenha segundo quadro - Final Fantasy
    gl.uniform1i(texPtr,2)

    gl.drawArrays(gl.TRIANGLES,55,3)
    gl.drawArrays(gl.TRIANGLES,57,3)

    gl.uniform1i(texPtr,3)

    gl.drawArrays(gl.TRIANGLES,60,3)
    gl.drawArrays(gl.TRIANGLES,62,3)




    

    //Desenha placa
 
    
    requestAnimationFrame(draw)


    
}

document.addEventListener("keydown",(event)=>{
        
        botton = event.key

        if (botton== "w"){
            cam_position[2]=cam_position[2]-0.1
            cam_look[2]= cam_look[2]-0.1
            console.log(cam_position);
        }

        if (botton== "s"){
            cam_position[2]=cam_position[2]+0.1
            cam_look[2]= cam_look[2]+0.1
            console.log(cam_position)
            console.log(cam_look)
        }

        if (botton== "d"){
            cam_position[0]=cam_position[0]+0.1
            cam_look[0]=cam_look[0]+0.1
            console.log(cam_position)
            console.log(cam_look)
            
        }

        if (botton== "a"){
            cam_position[0]=cam_position[0]-0.1
            cam_look[0]=cam_look[0]-0.1
            console.log(cam_position)
            console.log(cam_look)
            
        }

        if (botton=="ArrowUp"){
            cam_look[1]=cam_look[1]+0.1
            cam_look[2] =cam_look[1]-0.1
            console.log(cam_position)
            console.log(cam_look)
        }

        if (botton=="ArrowDown"){
            cam_look[1]=cam_look[1]-0.1
            cam_look[2] =cam_look[1]+0.1
            console.log(cam_position)
            console.log(cam_look)
        }
        if (botton=="ArrowLeft"){
            cam_look[0]=cam_look[0]-0.1
            console.log(cam_position)
            console.log(cam_look)
            
        }
        if (botton=="ArrowRight"){
            cam_look[0]=cam_look[0]+0.1
            console.log(cam_position)
            console.log(cam_look)
            
        }

    })
