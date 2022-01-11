module.exports = {
  lintOnSave: false,
  devServer: {
    //contentBase: "/home/tarsv1p1g1p001/Documentos/Empresa/Projects/eventmovil_front/public",
    compress: true,
    //host: 'localhost',
    host: '0.0.0.0',
    port: 8080,
    disableHostCheck: true, //for ngrok
  },
  pluginOptions: {
    i18n: {
      locale: 'es',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
};
