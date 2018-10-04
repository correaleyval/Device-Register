# Device-Register
Mi modo de programar con react

Creé un FileServer como yo lo llamo que detecta el tipo de archivo y lo procesa antes de enviarlo al navegador
Por tanto en el navegador puedo hacer referencia a un archivo con extensión jsx y que contenga código jsx de React, 
y el FileServer se encarga de transformar el código jsx a código puro de Javascript y enviárselo al navegador

Este es un trabajo que hice para la Universidad pero todas las demás cosas que hago para la web las manejo igual
Solo me preocupo por programar el manejador de eventos de socket.io que va en el archivo socket.js
Y la interfaz gráfica en React

Esta hecho para programadores que necesitan desarrollar rápido

Olvídate del concepto de URL y de las rutas, aquí la aplicaciones web son verdaderas aplicaciones manejadas 
por eventos como las aplicaciones de escritorio y de Android, etc

Los eventos son enviados al servidor a través de un socket y este genera nuevos eventos hacia la aplicación

Todas las vistas de la aplicación son cargadas por el navegador desde el primer momento y el server le indica a través de 
eventos emitidos por socket.io cual vista debe renderizar. Como sucedería en una aplicación común para Android, etc.
