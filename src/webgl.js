//Array de texturas
var teximg =[]
var texSrc =["img/majoras.png","img/ocarina.jpg"]
var loadTex =0
var gl
var prog
var angle=0

var cam_position=[5,4.5,5]
var cam_look = [0.0,0.0,0.0]


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
                                        //Parede Frente - 0
                                        //    x     y    z    r    g    b
                                            -0.5,  0.75, 0.0, 1.0, 1.0, 0.0, 
                                            -0.5,   0.0, 0.0, 1.0, 1.0, 0.0,
                                             0.5,   0.0, 0.0, 1.0, 1.0, 0.0,
                                             0.5,  0.75, 0.0, 1.0, 1.0, 0.0,
                                            -0.5,  0.75, 0.0, 1.0, 1.0, 0.0,
                                        
                                        //Porta - 5
                                            -0.25,  0.45, 0.01, 0.585, 0.2929, 0.0,
                                            -0.25,   0.0, 0.01, 0.585, 0.2929, 0.0,
                                             0.25,   0.0, 0.01, 0.585, 0.2929, 0.0,
                                             0.25,  0.45, 0.01, 0.585, 0.2929, 0.0,
                                            -0.25,  0.45, 0.01, 0.585, 0.2929, 0.0,


                                        // Parede Lateral Fundo -15
                                        -0.5,  0.75, -0.8, 1.0, 1.0, 0.0, 
                                        -0.5,   0.0, -0.8, 1.0, 1.0, 0.0,
                                         0.5,   0.0, -0.8, 1.0, 1.0, 0.0,
                                         0.5,  0.75, -0.8, 1.0, 1.0, 0.0,
                                        -0.5,  0.75, -0.8, 1.0, 1.0, 0.0,
                                        
                                        //Parede Lateral Esquerda -10

                                            -0.5,  0.75, -1, 1.0, 1.0, 0.0, 
                                            -0.5,   0.0, -1, 1.0, 1.0, 0.0,
                                            -0.5,   0.0,  0.0, 1.0, 1.0, 0.0,
                                            -0.5,  0.75,  0.0, 1.0, 1.0, 0.0,
                                            -0.5,  0.75,  -1, 1.0, 1.0, 0.0,

                                        
                                            

                                        
                                        //Placa de Titulo -- Textura

                                            /* -0.40, 0.68, 0.01, 1.0, 1.0, 1.0,
                                            -0.40, 0.50, 0.01, 1.0, 1.0, 1.0,
                                             0.40, 0.50, 0.01, 1.0, 1.0, 1.0,
                                             0.40, 0.68, 0.01, 1.0, 1.0, 1.0,
                                            -0.40, 0.68, 0.01, 1.0, 1.0, 1.0 */

                                            ]);
    console.log(coordTriangles.length/6);                                            
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
                            6*4,      //tamanho do bloco de dados a processar em cada passo
                                        //0 indica que o tamanho do bloco Ã© igual a tamanho
                                        //lido (2 floats, ou seja, 2*4 bytes = 8 bytes)
                            0         //salto inicial (em bytes)
                            );

    var bufColor = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, bufColor);
    gl.bufferData(gl.ARRAY_BUFFER, coordTriangles, gl.STATIC_DRAW);

    var colorPtr = gl.getAttribLocation(prog,"fcolor")
    gl.enableVertexAttribArray(colorPtr)
    gl.vertexAttribPointer(colorPtr,
                            3,
                            gl.FLOAT,
                            false,
                            6*4,
                            3*4
                            )
    
    /* var textCoordPtr = gl.getAttribLocation(prog, "texCoord");
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

    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,teximg[1]) */

    var normals = new Float32Array([
                                    //Normal primeiro Quadrado
                                    //  x  y  z
                                        0, 0, 1,
                                        0, 0, 1,
                                        0, 0, 1,
                                        0, 0, 1,
                                        0, 0, 1,

                                    //Normal segundo quadrado
                                        1, 0, 0,
                                        1, 0, 0,
                                        1, 0, 0,
                                        1, 0, 0,
                                        1, 0, 0,
                                    //Normal terceiro Quadrado
                                        0, 1, 0,
                                        0, 1, 0,
                                        0, 1, 0,
                                        0, 1, 0,
                                        0, 1, 0,
                                    ]);
    //Cria buffer na GPU e copia coordenadas para ele
    var bufnormalsPtr = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufnormalsPtr);
    gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);

    //Pega ponteiro para o atributo "position" do vertex shader
    var positionPtr = gl.getAttribLocation(prog, "normal");
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
                            )
    //Adiciona direção a luz
    //Negativo é entrando positivo é saindo da tela
    var lightPtr =gl.getUniformLocation(prog,"light_direction")
    gl.uniform3fv(lightPtr,[-0.2,-1,-0.7])
    
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
 

function draw(){

    //Criar matriz de projeção
    var mproj = createPerspective(30,gl.canvas.width/gl.canvas.height,1,50 )

    /* var cam = createCamera([5,5,5],[0,0,0],[5,6,5]) */
    var cam = createCamera(cam_position,cam_look,[cam_position[0],cam_position[1]+1,cam_position[2]])
    

    var transf = createTransformation(4)
    transf= composeRotation(transf,angle,'y')
    
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
    gl.uniform1i(is_colorPtr,1)

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

    //Desenhar parede esquerda
    gl.drawArrays(gl.TRIANGLES, 10,3);
    gl.drawArrays(gl.TRIANGLES, 12,3);


    gl.drawArrays(gl.TRIANGLES,15,3)
    gl.drawArrays(gl.TRIANGLES,17,3)

    //Desenha placa
 
    

    requestAnimationFrame(draw)


    
}

document.addEventListener("keydown",(event)=>{
        
        botton = event.key

        if (botton== "ArrowUp"){
            cam_position[2]=cam_position[2]-0.1
            console.log(cam_position);
        }

        if (botton== "ArrowDown"){
            cam_position[2]=cam_position[2]+0.1
            console.log(cam_position);
        }

        if (botton== "ArrowLeft"){
            //cam_position[0]=cam_position[0]+0.1
            //console.log(cam_position);
            angle+=2
        }

        if (botton== "ArrowRight"){
            //cam_position[0]=cam_position[0]-0.1
            //console.log(cam_position);
            angle-=2
        }

        if (botton== "w"){
            cam_position[1]=cam_position[1]+0.1
            console.log(cam_position);
        }

        if (botton== "s"){
            cam_position[1]=cam_position[1]-0.1
            console.log(cam_position);
        }



    })
