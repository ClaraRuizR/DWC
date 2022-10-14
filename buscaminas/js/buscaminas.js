let maxFilas = prompt('¿Cuántas filas quieres?');
let maxColumnas = prompt('¿Cuántas columnas quieres?');
let numMinas = prompt('¿Cuántas minas quieres introducir?');
let arrayTablero;

function crearTablero(filasMax, columnasMax){
    // Crear array bidimensional para guardar las minas

    let tablero = [];
    let fila;
    let columna;
    for (fila = 0; fila < filasMax; fila++) {
        tablero[fila] = new Array(columnasMax);
    }

    for (columna = 0; columna < columnasMax; columna++) {
        tablero[fila][columna] = '';
    }
    return tablero;
}



function colocarMinas(tablero, numeroMinas){
    //Coloca las minas en el tablero
    let posFila;
    let posColumna;
    let contadorMinas = 0;
    while (contadorMinas < numeroMinas) {
        posFila = Math.floor(Math.random() * maxFilas);
        posColumna = Math.floor(Math.random() * maxColumnas);
    
        if (tablero[posFila][posColumna] != 'MINA') {
            tablero[posFila][posColumna] = 'MINA';
            contadorMinas++;
        }
    }
    
    return tablero;
}



function buscarMinas(tablero, filasMax, columnasMax){
    let numMinasAlrededor;

    for (let fila = 0; fila < filasMax; fila++) {
        for (let columna = 0; columna < columnasMax; columna++) {
            numMinasAlrededor = 0;
            if (tablero[fila][columna] != 'MINA') {
                for (let cFila = fila - 1; cFila <= fila + 1; cFila++) {
                    if (cFila >= 0 && cFila < filasMax) {
                        for (let cColumna = columna - 1; cColumna <= columna + 1; cColumna++) {
                            if (cColumna >= 0 && cColumna < columnasMax &&
                                tablero[cFila][cColumna] == 'MINA') {
                                numMinasAlrededor++;
                            }
                        }
                    }
                    tablero[fila][columna] = numMinasAlrededor;
                }

            }
        }
    }

    return tablero;

}



function pintarTablero(filas, columnas, tablero){
    //Pinta el tablero con html
    document.write('<table>');

    for (let i = 0; i < filas; i++) {
        document.write('<tr>');

        for (let j = 0; j < columnas; j++) {
            document.write('<td>', tablero[j][i] ,'</td>');
        }

        document.write('</tr>');
    }
    document.write('</table>');

}

arrayTablero = crearTablero(maxFilas, maxColumnas);
arrayTablero = colocarMinas(arrayTablero, numMinas);
arrayTablero = buscarMinas(arrayTablero, maxFilas, maxColumnas);
pintarTablero(maxFilas, maxColumnas, arrayTablero);