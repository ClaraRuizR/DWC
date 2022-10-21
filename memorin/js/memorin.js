iniciarJuego();


function iniciarJuego(){
    let filas = prompt('¿Cuántas filas quieres?');
    let columnas = prompt('¿Cuántas columnas quieres?');

    if (filas < 2 || columnas < 2 || filas > 25 || columnas > 25 || ((filas * columnas) % 2) != 0){
        let inputCorrecto = false;
        while(inputCorrecto == false){
            window.alert('Error: debes introducir dos números entre 2 y 25. Además el número total de celdas debe ser un número par.')
            filas = prompt('¿Cuántas filas quieres?');
            columnas = prompt('¿Cuántas columnas quieres?');
            if(filas >= 2 && columnas >= 2 && filas < 25 && columnas < 25&& ((filas * columnas) % 2) == 0){
                inputCorrecto == true;
                break;
            }
        }
    }

    arrayTablero = crearArrayTablero(filas, columnas);
    pintarTablero(filas, columnas, arrayTablero);
}


function pintarTablero (filas, columnas){
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

function crearArrayTablero(filas, columnas){
    let arrayTablero = [];

    for (let i = 0; i < filas; i++){
        arrayTablero[i] = new Array(columnas);

        for (let j= 0; j < columnas; j++){
            arrayTablero[i][j] = 'a';
        }
    }

    return arrayTablero
}


