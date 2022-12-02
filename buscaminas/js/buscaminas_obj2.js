class Tablero {
    constructor(filas, columnas) {
        this.filas = filas;
        this.columnas = columnas;

        this.crearTablero();
    }

    crearTablero() {
        // Crear array bidimensional para guardar las minas
        this.arrayTablero = [];

        for (let fila = 0; fila < this.filas; fila++) {
            this.arrayTablero[fila] = [];

            for (let columna = 0; columna < this.columnas; columna++) {
                this.arrayTablero[fila][columna] = '';
            }
        }
    }

    /*pintarTableroHTML() {
        // Crear array bidimensional para guardar las minas
        document.write('<table>');

        for (let i = 0; i < this.filas; i++) {
            document.write('<tr>');

            for (let j = 0; j < this.columnas; j++) {
                document.write(`<td>${this.arrayTablero[i][j]}</td>`);
            }

            document.write('</tr>');
        }
        document.write('</table>');

    }*/


    pintarTablero() {
        
        let nodoTable = document.createElement('table');
        let nodoTr;
        let nodoTd;

        for (let i = 0; i < this.filas; i++) {

            nodoTr = document.createElement('tr');
            nodoTable.appendChild(nodoTr);

            for (let j = 0; j < this.columnas; j++) {
                nodoTd = document.createElement('td');
                nodoTd.id = `f${i}_c${j}`;
                nodoTd.dataset.fila = i
                nodoTd.dataset.columna = j;
                nodoTr.appendChild(nodoTd);

            }
        }

        document.body.appendChild(nodoTable);
        console.log(this.arrayTablero);
    }

    modificarFilas(nuevasFilas) {
        //Modificar el número de filas y volver a crear el tablero con las filas nuevas
        this.filas = nuevasFilas;
        this.crearTablero();
    }

    modificarColumnas(nuevasColumnas) {
        //Modificar el número de columnas y volver a crear el tablero con las columnas nuevas
        this.columnas = nuevasColumnas;
        this.crearTablero();
    }
}

class Buscaminas extends Tablero {
    constructor(filas, columnas, numMinas) {
        
        super(filas, columnas);
        this.numMinas = numMinas;

        this.colocarMinas();
        this.colocarNumMinas();

    }

    devolverTablero(){
        return this.arrayTablero;
    }

    colocarMinas() {
        let contadorMinas = 0;
        let posFila;
        let posColumna;


        while (contadorMinas < this.numMinas) {
            posFila = Math.floor(Math.random() * this.filas);
            posColumna = Math.floor(Math.random() * this.columnas);

            if (this.arrayTablero[posFila][posColumna] != 'MINA') {
                this.arrayTablero[posFila][posColumna] = 'MINA';
                contadorMinas++;
            };
        };

    }

    colocarNumMinas() {
        let numMinasAlrededor;

        for (let fila = 0; fila < this.filas; fila++) {
            for (let columna = 0; columna < this.columnas; columna++) {
                numMinasAlrededor = 0;
                if (this.arrayTablero[fila][columna] != 'MINA') {
                    for (let cFila = fila - 1; cFila <= fila + 1; cFila++) {
                        if (cFila >= 0 && cFila < this.filas) {
                            for (let cColumna = columna - 1; cColumna <= columna + 1; cColumna++) {
                                if (cColumna >= 0 && cColumna < this.columnas &&
                                    this.arrayTablero[cFila][cColumna] == 'MINA') {
                                    numMinasAlrededor++;
                                }
                            }
                        }
                        this.arrayTablero[fila][columna] = numMinasAlrededor;
                    }
                }
            }
        }

        return this.arrayTablero;
    }

    ponerListeners() {
        super.pintarTablero();

        let celda;

        for (let i = 0; i < this.filas; i++) {

            for (let j = 0; j < this.columnas; j++) {

                celda = document.getElementById(`f${i}_c${j}`);
                
                celda.addEventListener('click', this.despejarCelda.bind(this));
                celda.addEventListener('contextmenu', this.marcarCelda.bind(this));

            }
        }
    }

    despejarCelda(elEvento) {
        let evento = elEvento || window.event;
        let celda = evento.currentTarget;
        let columna = celda.dataset.columna;
        let fila = celda.dataset.fila;
        let casilla;
        //alert(`Despejada la celda (${fila}, ${columna})`);

        let esNumero = this.arrayTablero[fila][columna] >= 1;
        let esBomba = this.arrayTablero[fila][columna] == 'MINA';
        let vacio = this.arrayTablero[fila][columna] == '';
        
        if(esNumero){
            celda.innerHTML = this.arrayTablero[fila][columna];
            celda.style.backgroundColor = 'cyan';
            celda.removeEventListener('click', this.despejarCelda.bind(this));
            celda.removeEventListener('contextmenu', this.marcarCelda.bind(this));

        } else if(esBomba){
            celda.innerHTML = this.arrayTablero[fila][columna];
            for(let i = 0; i < this.filas; i++){
                for(let j = 0; j < this.columnas; j++){
                    casilla = document.getElementById(`f${i}_c${j}`);

                    if (this.arrayTablero[i][j] == 'MINA' && casilla.innerHTML == "" || casilla.innerHTML == "MINA"){
                        casilla.innerHTML = this.arrayTablero[i][j];
                        casilla.style.backgroundColor = 'red';
                    } else if(this.arrayTablero[i][j] == 'MINA' && casilla.innerHTML == "\uD83D\uDEA9"){
                        casilla.style.backgroundColor = 'green';
                        casilla.innerHTML = "MINA";
                    } else if(this.arrayTablero[i][j] != 'MINA' && casilla.innerHTML == "\uD83D\uDEA9"){
                        casilla.style.backgroundColor = 'orange';
                    }

                    casilla.removeEventListener('click', this.despejarCelda.bind(this));
                    casilla.removeEventListener('contextmenu', this.marcarCelda.bind(this));
                }
            }   
            alert('¡Has perdido!');
        } else if(vacio){
            celda.innerHTML = '-';
            for (let i = fila - 1; i <= fila + 1; i++) {
                if (i >= 0 && i < this.filas) {
                    for (let j = columna - 1; j <= columna + 1; j++) {
                        if (j >= 0 && j < this.columnas &&
                            this.arrayTablero[i][j] == 0) {
                            console.log(i, j);
                        }
                    }
                }
            }
        }
            
        

        //Comprobar la celda que se clica
        //Si está vacía se destapa.Se comprueban las de alrededor
        //Si es un número, se destapa y se muestra el número
        //Si es una mina, se destapa, pierdes, se muestran todas 
        //las celdas con minas. Si se marcó una casilla que no era 
        //mina, se le pone el fondo rojo.
        
    }

    marcarCelda(elEvento){
        let evento = elEvento || window.event;
        let celda = evento.currentTarget;
        let columna = celda.dataset.columna;
        let fila = celda.dataset.fila;        

        if (celda.innerHTML == "") {
            celda.innerHTML = "\uD83D\uDEA9";
        } else if (celda.innerHTML == "\uD83D\uDEA9") {
            celda.innerHTML = "\u2754";
        } else if(celda.innerHTML == "\u2754") {
            celda.innerHTML = "";
        };

        //document.oncontextmenu = function(){return false};  
        //alert(`Marcada la celda ${fila}, ${columna}`);
    }
 
}


window.onload = function(){
    let buscaminas1 = new Buscaminas(5, 5, 6);
    buscaminas1.ponerListeners();
}

/*document.addEventListener("DOMContentLoaded", function (event) {
    
});*/