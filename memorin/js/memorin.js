class Tablero{
    constructor(filas, columnas){
        this.filas = filas;
        this.columnas = columnas;
        this.arrayImagenes = ["&#128512;", "&#128513;", "&#128514;", "&#128515;", "&#128516;", "&#128517;", "&#128518;", "&#128519;", "&#128520;", "&#128521;", "&#128512;", "&#128513;"];
    
        this.crearArrayTablero();
    }

    crearArrayTablero() {
        this.arrayTablero = [];
    
        for (let i = 0; i < this.filas; i++) {
            this.arrayTablero[i] = new Array(columnas);
    
            for (let j = 0; j < this.columnas; j++) {
                this.arrayTablero[i][j] = '';
            }
        }

    }

    pintarTablero() {
        document.write('<table>');
    
        for (let i = 0; i < this.filas; i++) {
            document.write('<tr>');
    
            for (let j = 0; j < this.columnas; j++) {
                document.write(`<td><p id="iconos">${this.arrayTablero[i][j]}</p></td>`);
            }
    
            document.write('</tr>');
        }
        document.write('</table>');
    }
}

class Memorin extends Tablero{
    constructor(filas, columnas, arrayImagenes){
        super(filas, columnas, arrayImagenes);

        this.colocarImagenes();
    }

    colocarImagenes() {
        let numeroParejas = (this.filas * this.columnas) / 2;
        let contadorParejas = 0;
        let posFila1;
        let posColumna1;
        let posFila2;
        let posColumna2;
        let i = 0;
    
    
        while (contadorParejas < numeroParejas) {
    
            if(i >= 10){
                i = 0;
            }
    
            let casillasVacias = false;
            while (casillasVacias == false) {
                posFila1 = Math.floor(Math.random() * this.filas);
                posColumna1 = Math.floor(Math.random() * this.columnas);
    
                if (this.arrayTablero[posFila1][posColumna1] == '') {
                    this.arrayTablero[posFila1][posColumna1] = this.arrayImagenes[i];
                    posFila2 = Math.floor(Math.random() * this.filas);
                    posColumna2 = Math.floor(Math.random() * this.columnas);
    
                    if (this.arrayTablero[posFila2][posColumna2] == '') {
                        this.arrayTablero[posFila2][posColumna2] = this.arrayImagenes[i];
                        contadorParejas++;
                        casillasVacias = true;
                        i++;
                    } else {
                        while (this.arrayTablero[posFila2][posColumna2] != '') {
                            posFila2 = Math.floor(Math.random() * this.filas);
                            posColumna2 = Math.floor(Math.random() * this.columnas);
    
                        }
                        this.arrayTablero[posFila2][posColumna2] = this.arrayImagenes[i];
                        contadorParejas++;
                        casillasVacias = true;
                        i++;
                    }
    
                }
            }
    
            
        }
    
    }
}




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
            }
        }
    }

let memorin1 = new Memorin(filas, columnas);
memorin1.pintarTablero();


