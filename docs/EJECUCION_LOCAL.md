# Ejecución local con AWS simulado

Corre el MVP completo en un computador, sin cuenta de AWS: API, web de consulta y app. Sirve para desarrollo y pruebas sin internet. Para evaluar el MVP contra los servicios reales, use el entorno de AWS descrito en el [README](../README.md).

## Qué hace

`node iniciar-mvp.mjs` (sin opciones), desde la carpeta del proyecto:

1. Comprueba Node.js y que los puertos 3000, 5173 y 8081 estén libres.
2. Instala las dependencias del API, la web y la app.
3. Arranca el **API en el puerto 3000** con Cognito, S3 y la evidencia **simulados en memoria**. No toca AWS aunque el computador tenga credenciales configuradas.
4. Crea un **usuario de prueba** con acceso a la app y a la web, y carga los tres formularios y consentimientos de ejemplo.
5. Arranca la **web de consulta** en http://localhost:5173.
6. Abre **Expo** con un código QR para la app.

El usuario y la contraseña de prueba se muestran en la terminal al arrancar.

## Qué necesita

- **Node.js 22 o 24 LTS**: https://nodejs.org (Windows: `winget install OpenJS.NodeJS.LTS`; macOS: `brew install node@22`). En Windows, `iniciar-mvp.cmd` ofrece instalarlo.
- **Internet la primera vez**, para descargar las dependencias.
- **Expo Go** en el teléfono (App Store o Google Play), en la misma Wi-Fi que el computador.

## Pasos

```bash
node iniciar-mvp.mjs
```

En Windows también puede hacer doble clic en `iniciar-mvp.cmd`; en macOS o Linux, `sh iniciar-mvp.sh`.

1. Si el sistema pregunta si Node.js puede usar la red, elija **Permitir** (redes privadas).
2. **App:** escanee el QR con la cámara (iPhone) o desde Expo Go → *Scan QR code* (Android) e inicie sesión con el usuario de prueba.
3. **Web:** abra http://localhost:5173 con el mismo usuario y busque al paciente por cédula o por nombre.
4. **Detener:** Ctrl+C.

Cédulas de ejemplo: 1018293847 (Laura Gómez Pérez) · 79845123 (Carlos Ruiz Díaz). Los datos viven en memoria: cada ejecución empieza igual.

Sin teléfono, la app también abre en el navegador (tecla `w` en la terminal de Expo), pero ahí el PDF se abre en el diálogo de impresión y no se envía al API.

## Opciones

```bash
node iniciar-mvp.mjs --check      # solo verifica que todo arranca y se detiene
node iniciar-mvp.mjs --sin-app    # solo API y web, sin Expo
node iniciar-mvp.mjs --ip 192.168.1.50   # si el teléfono no conecta con la IP detectada
node iniciar-mvp.mjs --reinstalar # reinstala las dependencias
node iniciar-mvp.mjs --ayuda      # todas las opciones
```

## Qué se simula

| Servicio de AWS | En local |
|---|---|
| Cognito | Lista de usuarios en memoria; tokens con firma de prueba |
| S3 (PDF y evidencia) | Memoria, con la misma regla de escritura única |
| Lambda + API Gateway | El mismo API corre como servidor normal en el puerto 3000 |
| CloudFront | La web corre con Vite en `localhost:5173` |
| CloudWatch | Registros en `.mvp/api.log` y `.mvp/web.log` |

La lógica de negocio es el mismo código que en AWS. Lo que no se simula es la seguridad de la infraestructura (Object Lock, IAM, cifrado, HTTPS).

## Si algo falla

| Síntoma | Qué hacer |
|---|---|
| El QR no abre la app | Teléfono y computador en la misma Wi-Fi; las redes de universidad o de invitados suelen aislar los dispositivos. |
| «Network Error» al iniciar sesión en la app | El firewall bloquea el puerto 3000: permita Node.js en redes privadas, o use `--ip` con la IP de la Wi-Fi. |
| «El puerto … está ocupado» | Cierre la otra ejecución (Ctrl+C en su ventana). |
| Falla la instalación de dependencias | Revise la conexión y ejecute `node iniciar-mvp.mjs --reinstalar`. |
