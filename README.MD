
1. Ejecutar el comando 'npm install' para instalar las paqueterias del package.json
2. Una vez descargado las dependencias del package, ejecutar comando ' npm start' unicamente para arrancar servidor
3. Se dejara en la carpeta sql el archivo de base de datos para importar a la base da datos de usted

Uso

EXPLICACION PEDIDOS
Para agregar un pedido a la base de datos, se necesita un id de usuario existente, descripcion de los productos que comprara el usuario en formato JSON.stringfy, estado del pedido se decidio guardarlo con numeros enteros, 0 => NUEVO 1 => CONFIRMADO 2 => PREPARANDO 3 => ENVIANDO 4 => CANCELADO 5 => ENTREGADO, forma de pago de la misma manera 0 => CREDITO 1 => EFECTIVO, total a pagar en NUMEROS DECIMALES

LOS DEMAS SERA ESPECIFICADO EN EL ARCHIVO DE DOCUMENTACION

