[![Adopt-Meow-1.png](https://i.postimg.cc/XvHMc9LY/Adopt-Meow-1.png)](https://postimg.cc/sBh03Qbk)


| índice    |
| --------- |
| [Descripción del Poyecto](#descripción-del-proyecto)  |
| [Características](#características)    |
| [Funcionalidad](#funcionalidad)    |
| [Tecnologías Utilizadas](#tecnologías-utilizadas)    |
| [Desarrolladores Contribuyentes](#desarrolladores-contribuyentes)     |

### Descripción del Proyecto:
Se decidió crear una app web que aborde una problemática real y la necesidad de implementar un solución, utilizando las tecnologías que ya he madurado, e incorporando nuevas. Se optó por crear una aplicación que permita a los usuarios poder "anunciar" gatitos para su adopción, brindando datos importantes como nombre, sexo, peso, vacunas, etc. y también permitir a aquellos que deseen adoptar, localizar facilmente gatitos cercanos.

### Características:
La presente app web tiene 2 interfaces de visualización, ya que cuenta con 2 tipos de usuarios: 
- "OWNERS": Usuarios propietarios de gatitos.
- "ADOPTERS": Usuarios que desean adoptar gatitos.

La características principal, es que **Adopt-Meow** impulsa la *conexión* entre los propietarios de gatitos que serán puestos en adopción, y aquellos adoptantes que deseen adoptar gatitos.
Mediante esta app, se intenta agilizar el *esfuerzo de adopción* por parte de los propietarios, y los adoptantes pueden visualizar de forma eficiente aquellos gatitos cercanos, su información, permitiendo establecer la conexión para generar la adopción responsable.

### Funcionalidad:
#### Interfaz de Usuarios No Registrados
Luego de iniciar la aplicación, se muestra la pantalla "Landing Page" que muestra las principales funciones de la aplicación, y se incentiva a los usuarios a registrarse, con una re-dirección a la pantalla de Registro. En la pantalla de Registro se muestra un formulario, donde los usuarios deberán completar los campos con sus datos, y elegir el tipo de Usuario (Propietario="owner", Adoptante="Adopter"). En caso de no completar el formulario, o proporcionarse datos erróneos, la Api devolverá el mensaje de error, que se renderizará en pantalla.

[![user-register.png](https://i.postimg.cc/mk40TV2V/user-register.png)](https://postimg.cc/2bHHwQWB)

#### Interfaz de Usuarios Registrados
Una vez el usuario registrado, puede hacer el login en la sección homónima, donde deberá proporcionar el correo y contraseña con los que se registró. En caso de proporcionarse datos erróneos, la Api devolverá un mensaje de error, que se renderizará en pantalla.

[![login.png](https://i.postimg.cc/Qd9y7vPV/login.png)](https://postimg.cc/Yv7RKDtw)

Una vez realizado el login exitoso, y dependiendo del tipo de usuario, se mostrará un "Sidebar" a la izquierda de la pantalla, con las entradas a las 2 secciones correspondientes (según el tipo de usuario), y en la parte inferior se encuentra la sección usuario (foto, nombre e email) y el botón de "salir" para cerrar sesión.

#### Interfaz de OWNERS
Esta Interfaz posee las secciones "Postular" y "Reportes", con una primer pantalla (primer mitad de pantalla), y una segunda pantalla, que se desplegará según las acciones llevadas a cabo en la primer pantalla.

**Sección "Postular":** Es la primer sección que visualizará el usuario luego del login exitoso. Cuenta con un formulario llamado "MichiPerfil" para postular un nuevo gatito en adopción. Tiene un boton de "Previsualizar Michiperfil", que al ser presionado, despliega la segunda pantalla, que muestra cómo verán los demás usuarios el MichiPerfil del gatito que está postulando, seguido del botón de "Publicar la Postulación de (Nombre Gatito)". Al enviarse la postulación, aparece un Modal confirmando la operación.

[![owner-main.png](https://i.postimg.cc/BnRQc9nz/owner-main.png)](https://postimg.cc/sM9rsLSP)

**Sección "Reportes":** Es la segunda sección, que muestra el listado de gatitos "publicados" por el usuario y la cantidad de usuarios que postularon para su adopción. Si no hay gatitos publicados, se mostrará un texto informando esto. Caso contrario, al seleccionar algún gatito del listado, se despliega la segunda pantalla, mostrando el listado de usuarios que aplicaron para la adopción del gatito seleccionado. Al hacer click sobre algún usuario, aparece un cuadro para la aprobación de la adopción, y tiene 2 botones: "Entregar" que hará que el gatito desaparezca del listado, y se visualizará un modal confirmando la entrega, y el boton de "Cancelar" para para cerrar el cuadro.

[![reports-owner2.png](https://i.postimg.cc/pTSJZL3j/reports-owner2.png)](https://postimg.cc/5Ywz9b49)

#### Interfaz de ADOPTERS
Esta Interfaz posee las secciones "Búsqueda" y "Mis Postulaciones", con una primer pantalla (primer mitad de pantalla), y una segunda pantalla, que se desplegará según las acciones llevadas a cabo en la primer pantalla.

**Sección "Búsqueda":** Es la primer sección que visualizará el usuario luego del login exitoso. Posee un mapa que muestra avatars de gatitos publicados, en la ubicación donde se publicaron. Al seleccionar un gatito, se despliega la segunda pantalla, donde se muestra el "MichiPerfil" del gatito, con sus datos y la persona que lo publicó. También posee el botón de "Postular para la adopción de (Nombre del gatito)" que al ser presionado, aparece un Modal confirmando la postulación, haciendo que el avatar del gatito desaparezca del mapa.

[![adopter-main.png](https://i.postimg.cc/3x03wSFF/adopter-main.png)](https://postimg.cc/TKxz7cSK)

**Sección "Mis Postulaciones":** Es la segunda sección, se muestra el listado de gatitos al que el usuario aplicó para su adopción, con un ícono de Status de la aplicación ("En Revisión", "Aprobado" y "No Aprobado"). Si no hay aplicaciones de adopción, se mostrará un texto informando esto. Caso contrario, al seleccionar un gatito del listado, se motrará en la segunda pantalla más información respecto a la aplicación de adopción, y un botón de "Eliminar Notificación".

[![adopter-applications.png](https://i.postimg.cc/3NwTQnwp/adopter-applications.png)](https://postimg.cc/34z6gjmJ)

#### Base de Datos
La aplicación Adopt-Meow cuenta con su base de datos propia: https://adopt-meow-back-emd-production.up.railway.app/api
Esta base de datos fue desarrollada por el colaborador Miguel Ortiz. Él se encargó de desarrollar los end-points de acuerdo a las reglas de negocios propuestas para cada interfaz.

### Tecnologías Utilizadas
Las tecnologías utilizadas para el desarrollo de esta aplicación web fueron:
##### Lenguaje de Programación Base
- JavaScript 
- Framework de JavaScript: React
##### Tipado de Datos
- TypeScript
##### Navegación entre Pantallas
- React-Router -Dom
##### Estilos
- Next UI
- Tailwind Css
- Framer Motion
##### Solicitudes HTTP a Api
- Axios
##### Mapa
- React Google Maps
##### Gestion de Versiones
- Git
### Desarrolladores Contribuyentes
##### Desarrollado por:
- Aplicación Web: Emmanuel Ortiz, Junior Front-End Developer.
https://www.linkedin.com/in/emmanuel-ortiz-745427273/
- Api: Miguel Ortiz, Junior Full-Stack Developer.
https://www.linkedin.com/in/miguel-ortiz-9736b32a5/
##### Code-Review a cargo de:
Fernando A. Gonzalez, Software Lead Engineer.
https://www.linkedin.com/in/fernando-a-gonzalez/

