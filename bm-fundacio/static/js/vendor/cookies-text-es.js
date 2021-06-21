document.addEventListener('DOMContentLoaded', () => {
    CookieThough.init({
        policies: [
            {
                id: 'essential',
                label: 'Cookies Técnicas',
                description: 'Son necesarias para permitir el funcionamiento de las funciones básicas del sitio web, como ofrecer un acceso seguro.',
                category: 'essential',
            },
            {
                id: 'functional',
                label: 'Cookies Funcionales',
                description: 'Podrá acceder al servicio en función de características predeterminadas como podrían ser el tipo de navegador, el idioma, la configuración, etc.',
                category: 'functional',
            },
            {
                id: 'statistics',
                label: 'Cookies Analíticas',
                description: 'Permiten saber cuándo fue la última vez que inició sesión en el sitio web y recopilar información estadística sobre la navegación en el sitio web.',
                category: 'statistics',
            },
        ],
        essentialLabel: 'Activado',
        header: {
            subTitle: "Su privacidad es importante para nosotros",
            title: 'Por favor, acepte el uso de cookies para tener la mejor experiencia en nuestro sitio.',
            description:
            "Nosotros y nuestros socios hacemos el siguiente tratamiento de datos: Almacenar o acceder a información en un dispositivo, Anuncios y contenido personalizados, medición de anuncios y del contenido, información sobre el público y desarrollo de productos, Datos de localización geográfica precisa e identificación mediante las características de dispositivos",
        },
        permissionLabels: {
            accept: 'Aceptar',
            acceptAll: 'Aceptar todas',
            decline: 'Declinar',
        },
        customizeLabel: 'Mas opciones',
    });
});