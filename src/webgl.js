//Array de texturas
var teximg =[]
var texSrc =["img/majoras.png","img/ocarina.jpg"]
var loadTex =0
var gl
var prog
var angle=0
var df =5

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
                                        //Primeiro Quadrado
                                        //    x     y    z   tx   ty
                                            -0.5,  0.5, 0.0, 0.0, 0.0, 
                                            -0.5, -0.5, 0.0, 0.0, 1.0,
                                             0.5, -0.5, 0.0, 1.0, 1.0, 
                                             0.5,  0.5, 0.0, 1.0, 0.0, 
                                            -0.5,  0.5, 0.0, 0.0, 0.0,
                                        
                                        //Segundo quadrado
                                            -0.5, -0.5, 0.0, 1.0, 1.0,
                                            -0.5,  0.5, 0.0, 1.0, 0.0,
                                            -0.5,  0.5, 1.0, 0.0, 0.0,
                                            -0.5, -0.5, 1.0, 0.0, 1.0,
                                            -0.5, -0.5, 0.0, 1.0, 1.0,
                                        //Terceiro Quadrado
                                             0.5, -0.5, 1.0, 1.0, 1.0,
                                             0.5, -0.5, 0.0, 1.0, 0.0,
                                            -0.5, -0.5, 0.0, 0.0, 0.0,
                                            -0.5, -0.5, 1.0, 0.0, 1.0,
                                             0.5, -0.5, 1.0, 1.0, 1.0,

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
                            5*4,      //tamanho do bloco de dados a processar em cada passo
                                        //0 indica que o tamanho do bloco Ã© igual a tamanho
                                        //lido (2 floats, ou seja, 2*4 bytes = 8 bytes)
                            0         //salto inicial (em bytes)
                            );
    
    var textCoordPtr = gl.getAttribLocation(prog, "ftextCoord");
    gl.enableVertexAttribArray(textCoordPtr);
    //Especifica a cÃ³pia dos valores do buffer para o atributo
    gl.vertexAttribPointer(textCoordPtr, 
                            2,        //quantidade de dados em cada processamento
                            gl.FLOAT, //tipo de cada dado (tamanho)
                            false,    //nÃ£o normalizar
                            5*4,      //tamanho do bloco de dados a processar em cada passo
                                        //0 indica que o tamanho do bloco Ã© igual a tamanho
                                        //lido (2 floats, ou seja, 2*4 bytes = 8 bytes)
                            3*4       //salto inicial (em bytes)
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

    //Configura a distância focal
    dfPtr = gl.getUniformLocation(prog,"df")
    gl.uniform1f(dfPtr,df)


}    
    
function draw(){

    //Ponteiro para a matriz de transformação
    var transfPtr = gl.getUniformLocation(prog,"trans_mat")
    

    var mat_rot_X =math.matrix([
        [1, 0, 0, 0],
        [0, Math.cos(angle* Math.PI/180), -Math.sin(angle* Math.PI/180), 0],
        [0, Math.sin(angle* Math.PI/180),  Math.cos(angle* Math.PI/180), 0], 
        [0, 0, 0, 1]
    ]
    )
    
    var mat_rot_Y =math.matrix([
        [Math.cos(angle* Math.PI/180), 0, -Math.sin(angle* Math.PI/180), 0],
        [0, 1, 0, 0],
        [Math.sin(angle* Math.PI/180), 0,  Math.cos(angle* Math.PI/180), 0],
        [0, 0, 0, 1]
    ])

    var mat_rot_Z =math.matrix([
        [Math.cos(angle* Math.PI/180), -Math.sin(angle* Math.PI/180), 0, 0],
        [Math.sin(angle* Math.PI/180),  Math.cos(angle* Math.PI/180), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ])

    var transf = math.multiply(mat_rot_Y,mat_rot_X)
    transf = math.multiply(mat_rot_Z,transf)

    transf = math.flatten(transf)._data

    gl.uniformMatrix4fv(transfPtr,false,transf)

    //Limpa a tela e o buffer de profundidade
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);    
    //Cria um ponteiro para a variável que indica qual o slot onde a textura está
    var texPtr =gl.getUniformLocation(prog,"text")
    //Muda o valor dessa variável
    gl.uniform1i(texPtr,0)

    //Desenha o primeiro quadrado
    gl.drawArrays(gl.TRIANGLES, 0,3);
    gl.drawArrays(gl.TRIANGLES,2,3);

    //Troca a textura
    gl.uniform1i(texPtr,1)
    //Desenha o segundo quadrado
    gl.drawArrays(gl.TRIANGLES,5,3)
    gl.drawArrays(gl.TRIANGLES,7,3)

    //Desenha com textura interpolada
    gl.uniform1i(texPtr,0)
    gl.drawArrays(gl.TRIANGLES,10,3)
    gl.uniform1i(texPtr,1)
    gl.drawArrays(gl.TRIANGLES,12,3)


    angle++
    
    requestAnimationFrame(draw)
}