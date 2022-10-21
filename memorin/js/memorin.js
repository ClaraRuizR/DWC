let filas = prompt('¿Cuántas filas quieres?');
let columnas = prompt('¿Cuántas columnas quieres?');


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


