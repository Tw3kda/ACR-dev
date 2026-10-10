# ACR Consentimiento Digital

Sistema de consentimiento informado digital para ACR VITAL LABORAL S.A.S.: app de tableta (Expo), web de consulta para auditoría (React) y API serverless en AWS.

## Prueba del MVP en AWS

El MVP se evalúa contra un **entorno desplegado en AWS real**: una copia completa del sistema en una cuenta de AWS independiente de la de producción, con su propio Cognito, buckets S3 con Object Lock, API y web. Lo que se haga allí no afecta a producción.

| Pieza | Ubicación |
|---|---|
| Web de consulta | http://acr-consent-web-dev-755933694912.s3-website-us-east-1.amazonaws.com |
| API | https://oorw1ozrgh.execute-api.us-east-1.amazonaws.com |
| App | Se abre en Expo Go (iPhone, iPad o Android). No hay APK: el computador solo le entrega la app a Expo Go; el inicio de sesión, las firmas, los PDF y la evidencia van directo al API de AWS. |
| Formularios publicados | CA-F-14 v1.1, CA-F-15 v1.0 y CA-F-35 v1.0 |

### Credenciales

**Las credenciales de acceso están en el documento de entrega del proyecto, sección 8.4.** La app y la web no permiten crear cuentas, y lo indican bajo los campos de inicio de sesión. Use solo datos ficticios de pacientes.

### Qué necesita

- Un computador Mac, Windows o Linux con **Node.js 22 o 24 LTS** (https://nodejs.org; en Mac también `brew install node@22`) y **Git**.
- Un iPhone, iPad o teléfono Android con la app **Expo Go**, gratuita: en iPhone o iPad, **App Store → buscar «Expo Go»**; en Android, **Google Play → buscar «Expo Go»**.
- El teléfono y el computador conectados a la **misma red Wi-Fi**.
- No se necesita cuenta de AWS ni de Expo, ni instalar un APK.

### Comando

Descarga el proyecto y abre la app conectada a AWS (Mac, Linux, o Windows con PowerShell 7 o CMD):

```bash
git clone https://github.com/Tw3kda/ACR-dev.git
```
```
cd ACR-dev
```
```
node iniciar-mvp.mjs --aws
```

En Windows PowerShell 5.1 se separan los comandos con `;` en lugar de `&&`. Si el proyecto ya está descargado, basta con `node iniciar-mvp.mjs --aws` dentro de la carpeta. La primera vez instala las dependencias de la app (unos minutos), comprueba que el API de AWS responde y muestra un código QR. Este modo no arranca ningún API ni web locales.

### Paso a paso

1. **Web:** abra http://acr-consent-web-dev-755933694912.s3-website-us-east-1.amazonaws.com e inicie sesión con la cuenta de prueba. Muestra los pacientes del día y permite buscar por cédula o por nombre.
2. **App:** ejecute el comando anterior en una terminal y espere el código QR.
3. Si macOS pregunta si Node puede aceptar conexiones entrantes, elija «Permitir»: el teléfono necesita llegar al computador.
4. En el **iPhone o iPad**, escanee el QR con la **cámara** y ábralo en Expo Go; si Expo Go pide acceso a la red local, toque «Permitir». En **Android**, abra Expo Go y toque «Scan QR code».
5. Inicie sesión en la app con la cuenta de prueba y haga el flujo: elija un formulario, léalo, responda Acepto o No acepto, escriba nombre y cédula, firme, revise y confirme.
6. Vuelva a la web y busque al paciente por cédula o por nombre: aparecen el consentimiento recién firmado, su PDF y su cadena de evidencia.
7. Para cerrar la app, Ctrl+C en la terminal. Lo firmado queda guardado en AWS.

### Si algo falla

| Síntoma | Qué hacer |
|---|---|
| El QR no abre la app o se queda cargando | Teléfono y computador en la misma Wi-Fi. Las redes de universidad o de invitados suelen aislar los dispositivos: use el punto de acceso del celular. |
| «No se pudo conectar con el API de AWS» | Revise la conexión a internet del computador. |
| Expo Go indica que el proyecto no es compatible | Actualice Expo Go desde la tienda (el proyecto usa Expo SDK 57). |
| «El puerto 8081 está ocupado» | Cierre otra ejecución de Expo (Ctrl+C en su ventana). |
| Falla la instalación de dependencias | Revise la conexión y ejecute `node iniciar-mvp.mjs --aws --reinstalar`. |

La web de este entorno se publica provisionalmente desde S3 por HTTP, mientras AWS habilita CloudFront en la cuenta nueva; la llamada al API sí va por HTTPS. En producción la web se sirve por CloudFront con HTTPS y cabeceras de seguridad.

## Ejecución local (desarrollo)

Para correr todo en un computador con AWS simulado, sin internet ni cuenta de AWS, vea [docs/EJECUCION_LOCAL.md](docs/EJECUCION_LOCAL.md).

## Estructura

| Carpeta | Contenido |
|---|---|
| `API GATEWAY/` | API (Node.js + Express sobre AWS Lambda), infraestructura Terraform, plantillas de formularios y pruebas (`npm run smoke`). |
| `CONCENTIMIENTO_INFORMADO/` | App de tableta (Expo / React Native). |
| `WEB PDF CHECK/my-app/` | Web de consulta para auditoría (React + Vite). |
| `iniciar-mvp.mjs` | `--aws`: abre la app contra el entorno de AWS. Sin opciones: ejecución local con AWS simulado. |
| `docs/EJECUCION_LOCAL.md` | Guía de la ejecución local. |
