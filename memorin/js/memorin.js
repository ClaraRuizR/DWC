
let arrayImagenes = ["&#128512;", "&#128513;", "&#128514;", "&#128515;", "&#128516;", "&#128517;", "&#128518;", "&#128519;", "&#128520;", "&#128521;", "&#128512;", "&#128513;"];

iniciarJuego();

function iniciarJuego() {
    let filas = prompt('¿Cuántas filas quieres?');
    let columnas = prompt('¿Cuántas columnas quieres?');

    if (filas < 2 || columnas < 2 || filas > 25 || columnas > 25 || ((filas * columnas) % 2) != 0) {
        let inputCorrecto = false;
        while (inputCorrecto == false) {
            window.alert('Error: debes introducir dos números entre 2 y 25. Además el número total de celdas debe ser un número par.')
            filas = prompt('¿Cuántas filas quieres?');
            columnas = prompt('¿Cuántas columnas quieres?');
            if (filas >= 2 && columnas >= 2 && filas < 25 && columnas < 25 && ((filas * columnas) % 2) == 0) {
                inputCorrecto == true;
                break;
            }
        }
    }

    arrayTablero = crearArrayTablero(filas, columnas);
    colocarImagenes(filas, columnas, arrayTablero, arrayImagenes);
    pintarTablero(filas, columnas, arrayTablero);
    console.log(arrayTablero);

}


function pintarTablero(filas, columnas) {
    document.write('<table>');

    for (let i = 0; i < filas; i++) {
        document.write('<tr>');

        for (let j = 0; j < columnas; j++) {
            document.write(`<td><p id="celdas">${arrayTablero[i][j]}</p></td>`);
        }

        document.write('</tr>');
    }
    document.write('</table>');
}

function crearArrayTablero(filas, columnas) {
    let arrayTablero = [];

    for (let i = 0; i < filas; i++) {
        arrayTablero[i] = new Array(columnas);

        for (let j = 0; j < columnas; j++) {
            arrayTablero[i][j] = '';
        }
    }

    return arrayTablero
}

function colocarImagenes(filas, columnas, arrayTablero, arrayImagenes) {
    let numeroParejas = (filas * columnas) / 2;
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
            posFila1 = Math.floor(Math.random() * filas);
            posColumna1 = Math.floor(Math.random() * columnas);

            if (arrayTablero[posFila1][posColumna1] == '') {
                arrayTablero[posFila1][posColumna1] = arrayImagenes[i];
                posFila2 = Math.floor(Math.random() * filas);
                posColumna2 = Math.floor(Math.random() * columnas);

                if (arrayTablero[posFila2][posColumna2] == '') {
                    arrayTablero[posFila2][posColumna2] = arrayImagenes[i];
                    contadorParejas++;
                    casillasVacias = true;
                    i++;
                } else {
                    while (arrayTablero[posFila2][posColumna2] != '') {
                        posFila2 = Math.floor(Math.random() * filas);
                        posColumna2 = Math.floor(Math.random() * columnas);

                    }
                    arrayTablero[posFila2][posColumna2] = arrayImagenes[i];
                    contadorParejas++;
                    casillasVacias = true;
                    i++;
                }

            }
        }

        
    }

    return arrayTablero
}


