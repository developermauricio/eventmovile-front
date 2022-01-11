function getLanguage() {
    let ln = navigator.language || navigator.userLanguage;
    let optleng = 'es';
    if (ln) {
        if (ln.indexOf('en') >= 0) {
            optleng = 'en';
        }
    }
    return optleng;
}
export default{
    getLanguage
}