document.addEventListener('DOMContentLoaded', () => {
    CookieThough.init({
        policies: [
            {
                id: 'essential',
                label: 'Cookies Tècniques',
                description: 'Són necessàries per permetre el funcionament de les funcions bàsiques del lloc web, com oferir un accés segur.',
                category: 'essential',
            },
            {
                id: 'functional',
                label: 'Cookies Funcionals',
                description: "Podrà accedir a el servei en funció de característiques predeterminades com podrien ser el tipus de navegador, l'idioma, la configuració, etc.",
                category: 'functional',
            },
            {
                id: 'statistics',
                label: 'Cookies Analíticas',
                description: "Permeten saber quan va ser l'última vegada que va iniciar sessió al lloc web i recopilar informació estadística sobre la navegació en el lloc web.",
                category: 'statistics',
            },
        ],
        essentialLabel: 'Activat',
        header: {
            title: "La seva privacitat és important per a nosaltres",
            description:
            "Nosaltres i els nostres socis fem el següent tractament de dades: Emmagatzemar o accedir a informació en un dispositiu, anuncis i contingut personalitzats, mesurament d'anuncis i del contingut, informació sobre el públic i desenvolupament de productes, dades de localització geogràfica precisa i identificació mitjançant les característiques de dispositius",
        },
        permissionLabels: {
            accept: 'Acceptar',
            acceptAll: 'Acceptar totes',
            decline: 'Declinar',
        },
        customizeLabel: 'Més opcions',
    });
});