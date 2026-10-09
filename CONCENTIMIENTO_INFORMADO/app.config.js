/**
 * Configuración dinámica sobre app.json.
 *
 * Con APP_VARIANT=dev (perfil `apk-dev` de eas.json) la app se compila con otro
 * paquete y otro nombre, para instalarla en la misma tableta junto a la de
 * producción y que nadie confunda una con la otra. Sin la variable, la
 * configuración es exactamente la de app.json.
 */
module.exports = ({ config }) => {
  if (process.env.APP_VARIANT !== 'dev') return config;
  return {
    ...config,
    name: 'ACR Consentimiento DEV',
    scheme: 'concentimientoinformado-dev',
    android: { ...config.android, package: 'com.acrvitallaboral.consentimiento.dev' },
  };
};
