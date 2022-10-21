let filas = prompt('¿Cuántas filas quieres?');
let columnas = prompt('¿Cuántas columnas quieres?');

if (filas < 2 || columnas < 2 || filas > 25 || columnas > 25 || ((filas * columnas) % 2) != 0){
    let inputCorrecto = false;
    while(inputCorrecto == false){
        window.alert('Error: número incorrecto de celdas. Recuerda que el número de filas y columnas debe ser entre 2 y 25. Además las celdas deben dar un número par.')
        filas = prompt('¿Cuántas filas quieres?');
        columnas = prompt('¿Cuántas columnas quieres?');
        if(filas > 2 && columnas > 2 && filas < 25 && columnas < 25&& ((filas * columnas) % 2) == 0){
            inputCorrecto == true;
            break;
        }
    }
}

pintarTablero(filas, columnas);

function pintarTablero (filas, columnas){
    document.write('<table>');
    
        for (let i = 0; i < filas; i++) {
            document.write('<tr>');
        
            for (let j = 0; j < columnas; j++) {
                document.write(`<td><p id="celdas"></p></td>`);
            }
        
            document.write('</tr>');
        }
        document.write('</table>');
}


