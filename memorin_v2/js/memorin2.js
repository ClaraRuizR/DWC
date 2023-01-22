class Tablero{
    constructor(){
        this.comprobarDatos();
        this.puntuacionActual = 0;
        this.arrayImagenes = ["&#128512;", "&#128513;", "&#128514;", "&#128515;", "&#128516;", "&#128517;", "&#128518;", "&#128519;", "&#128520;", "&#128521;", "&#128512;", "&#128513;"]; 
    }

    comprobarDatos(){
        //Pregunta las filas y las columnas y compueba que los datos introducidos son correctos
        let filas = prompt('¿Cuántas filas quieres?');
        let columnas = prompt('¿Cuántas columnas quieres?');

        if (filas < 2 || columnas < 2 || filas > 25 || columnas > 25 || ((filas * columnas) % 2) != 0) {
            let inputCorrecto = false;
            while (inputCorrecto == false) {
    
                window.alert('Error: debes introducir dos números entre 2 y 25. Además el número total de celdas debe ser un número par.')
                filas = prompt('¿Cuántas filas quieres?');
                columnas = prompt('¿Cuántas columnas quieres?');
                
                if (filas >= 2 && columnas >= 2 && filas < 25 && columnas < 25 && ((filas * columnas) % 2) == 0) {
                    inputCorrecto = true;
                    this.crearArrayTablero();
                }
            }

        }else{
            this.puntuacionMaxima = ((filas * columnas) / 2) * 10;
            this.filas = filas;
            this.columnas = columnas;
            this.crearArrayTablero();        
        }
    }

    crearArrayTablero() {
        //Crea el array que formará el tablero
        this.arrayTablero = [];
    
        for (let i = 0; i < this.filas; i++) {
            this.arrayTablero[i] = new Array(this.columnas);
    
            for (let j = 0; j < this.columnas; j++) {
                this.arrayTablero[i][j] = '';
            }
        }
    }

    pintarTablero() {
        //Dibuja el tablero y llama a las funciones que pintan el resto de componentes

        let nodoTable = document.createElement('table');
        let nodoTr;
        let nodoTd;
        let nodoIconos;
    
        for (let i = 0; i < this.filas; i++) {

            nodoTr = document.createElement('tr');
            nodoTable.appendChild(nodoTr);
    
            for (let j = 0; j < this.columnas; j++) {
                nodoTd = document.createElement('td');
                nodoTd.id = `f${i}_c${j}`;
                nodoTd.dataset.fila = i
                nodoTd.dataset.columna = j;
                nodoTr.appendChild(nodoTd);

                nodoIconos = document.createElement('p');
                nodoIconos.id = 'iconos';
                nodoTd.appendChild(nodoIconos);
            }
    
        }
        console.log(this.puntuacionMaxima);

        

        document.body.appendChild(nodoTable);
        console.log(this.arrayTablero);

        this.crearPuntuacion();

        this.crearBotonReinicio()

    }

    crearPuntuacion(){
        //Crea el marcador
        let nodoMarcador = document.createElement('div');
        document.body.appendChild(nodoMarcador);
        nodoMarcador.id = "marcador";

        let nodoPuntuacion = document.createElement('p');
        nodoMarcador.appendChild(nodoPuntuacion);
        nodoPuntuacion.id = "puntuacion";
        nodoPuntuacion.innerHTML = `${this.puntuacionActual}/${this.puntuacionMaxima}`;
    }

    crearBotonReinicio(){
        //Crea el botón de reinicio
        let nodoBoton = document.createElement('div');
        document.body.appendChild(nodoBoton);
        nodoBoton.id = "botonReinicio";

        let nodoTextoReinicio = document.createElement('p');
        nodoBoton.appendChild(nodoTextoReinicio);
        nodoTextoReinicio.id = "textoReinicio";
        nodoTextoReinicio.innerHTML = "Reiniciar juego";
    }
}

class Memorin extends Tablero{
    constructor(filas, columnas, arrayImagenes){
        super(filas, columnas, arrayImagenes);

        this.parejasTotales = (filas * columnas)/2
        this.parejasAcertadas = 0;
        this.arrayContenido = [];
        this.arrayId = [];
        this.colocarImagenes();
    }

    colocarImagenes() {
        //Coloca las imágenes por parejas en lugares aleatorios
        let numeroParejas = (this.filas * this.columnas) / 2;
        let contadorParejas = 0;
        let contadorArray = 0;

        let posFila1;
        let posColumna1;
        let posFila2;
        let posColumna2;
        
        while (contadorParejas < numeroParejas) {
    
            if(contadorArray >= 10){
                contadorArray = 0;
            }
    
            let casillasVacias = false;
            while (casillasVacias == false) {
                posFila1 = Math.floor(Math.random() * this.filas);
                posColumna1 = Math.floor(Math.random() * this.columnas);
    
                if (this.arrayTablero[posFila1][posColumna1] == '') {
                    this.arrayTablero[posFila1][posColumna1] = this.arrayImagenes[contadorArray];
                    posFila2 = Math.floor(Math.random() * this.filas);
                    posColumna2 = Math.floor(Math.random() * this.columnas);
    
                    if (this.arrayTablero[posFila2][posColumna2] == '') {
                        this.arrayTablero[posFila2][posColumna2] = this.arrayImagenes[contadorArray];
                        contadorParejas++;
                        casillasVacias = true;
                        contadorArray++;
                    } else {
                        while (this.arrayTablero[posFila2][posColumna2] != '') {
                            posFila2 = Math.floor(Math.random() * this.filas);
                            posColumna2 = Math.floor(Math.random() * this.columnas);
    
                        }
                        this.arrayTablero[posFila2][posColumna2] = this.arrayImagenes[contadorArray];
                        contadorParejas++;
                        casillasVacias = true;
                        contadorArray++;
                    }
    
                }
            }

        }
    
    }

    colocarListeners(){
        //Coloca los listeners en cada casilla
        super.pintarTablero();

        let celda;

        this.despejarCelda = this.despejarCelda.bind(this);
        this.reiniciarJuego = this.reiniciarJuego.bind(this);

        for (let i = 0; i < this.filas; i++) {

            for (let j = 0; j < this.columnas; j++) {

                celda = document.getElementById(`f${i}_c${j}`);
            
                celda.addEventListener('click', this.despejarCelda);

            }
        }

        let botonReinicio =  document.getElementById("botonReinicio");
        botonReinicio.addEventListener('click', this.reiniciarJuego);

        
    }

    reiniciarJuego(elEvento){
        //Reinicia la partida
        let evento = elEvento || window.event;
        let boton = evento.currentTarget;
        let confirmacion = window.confirm("¿Quieres reiniciar el juego?");

        if (confirmacion){
            window.location.reload();
        }
    }

    despejarCelda(elEvento) {
        //Evento que llama a la función despejarUna, mete el contenido y el id
        //en arrays y llama a otras funciones que comprueban si son pareja.
        let evento = elEvento || window.event;
        let celda = evento.currentTarget;
        
        let contenido = this.despejarUna(celda);

        let elId = celda.attributes.getNamedItem("id").nodeValue;

        if(this.arrayContenido.length >= 4){
             this.arrayContenido = [];
        }

        this.arrayContenido.push(contenido, elId);
        this.arrayId.push(elId);
        this.comprobarId();

        this.comprobarParejas();
        
    }

    despejarUna(celda){
        //Muestra el icono, quita el listener de la casilla, devuelve su contenido.
        let columna = celda.dataset.columna;
        let fila = celda.dataset.fila;

        let contenido = this.arrayTablero[fila][columna]

        celda.firstChild.innerHTML = contenido;

        celda.removeEventListener('click', this.despejarCelda);

        return contenido;
    }

    comprobarId(){
        //Comprueba que el id de la primera casilla elegida sea el mismo.

        let primerId = this.arrayId[0];

        if(this.arrayId.length % 2 == 0 && primerId != this.arrayId[this.arrayId.length-2]){

            for(let i = 0; i < this.arrayId.length-1; i++){
                this.arrayId.shift();
            }
            
        } 

    }

    comprobarParejas(){
        //Comprueba si las primeras posiciones en el array son pareja 
        if(this.arrayContenido.length == 4){

            let celda1 = document.getElementById(this.arrayContenido[1]);
            let celda2 = document.getElementById(this.arrayContenido[3]);

            if(this.arrayContenido[0] != this.arrayContenido[2]){
                console.log(`${this.arrayContenido[0]} con id ${this.arrayContenido[1]} es distinto a ${this.arrayContenido[2]} con id ${this.arrayContenido[3]}`);
                
                setTimeout(function(){
                    celda1.firstChild.innerHTML = " ";                    
                    celda2.firstChild.innerHTML = " ";
                }, 1000);
                
                celda1.addEventListener('click', this.despejarCelda);
                celda2.addEventListener('click', this.despejarCelda);


            }else{
                console.log(`${this.arrayContenido[0]} con id ${this.arrayContenido[1]} es igual a ${this.arrayContenido[2]} con id ${this.arrayContenido[3]}`);
                celda1.style.backgroundColor = 'green';
                celda2.style.backgroundColor = 'green';
                this.parejasAcertadas++
                this.calcularPuntuacion();
                if(this.parejasAcertadas == this.parejasTotales){
                    this.ganar();
                }
            }
        }
    }

    calcularPuntuacion(){
        //Calcula la puntuación
        let puntuacion = document.getElementById(`puntuacion`);

        if(this.arrayId.length == 2){          
            this.puntuacionActual = this.puntuacionActual + 10;

            console.log(this.arrayId.length);
            this.arrayId = [];
            puntuacion.innerHTML = `${this.puntuacionActual}/${this.puntuacionMaxima}`;
            
        } else if(this.arrayId.length == 4){
            this.puntuacionActual = this.puntuacionActual + 5;
            console.log(this.arrayId.length);
            this.arrayId = [];
            puntuacion.innerHTML = `${this.puntuacionActual}/${this.puntuacionMaxima}`;

        } else if(this.arrayId.length == 6){
            this.puntuacionActual = this.puntuacionActual + 2.5;
            console.log(this.arrayId.length);
            this.arrayId = [];
            puntuacion.innerHTML = `${this.puntuacionActual}/${this.puntuacionMaxima}`;

        } else if (this.arrayId.length > 6){
            console.log(this.arrayId.length);
            this.arrayId = [];
            puntuacion.innerHTML = `${this.puntuacionActual}/${this.puntuacionMaxima}`;

        } 
        console.log(`puntos: ${this.puntuacionActual}`);
        
    }

    ganar(){
        //Muestra el mensaje al final de la partida 
        alert(`¡Felicidades, has ganado! Puntuación: ${this.puntuacionActual}`);
        let casilla;
        for(let i = 0; i < this.filas; i++){
            for(let j = 0; j < this.columnas; j++){
                casilla = document.getElementById(`f${i}_c${j}`);

                casilla.removeEventListener('click', this.despejarCelda);
            }
        }   
    }
}

window.onload = function(){

    let memorin1 = new Memorin();
    memorin1.colocarListeners();
}