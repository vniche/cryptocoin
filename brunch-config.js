exports.npm = {
    globals: {
        Inferno: 'inferno',
        Component: 'inferno-component'
    }
}

exports.files = {
    javascripts: {
        joinTo: 'app.js',
        entryPoints: {
            'app/initialize.jsx': 'app.js'
        }
    },
    stylesheets: {
        joinTo: {
            'app.css': ['**/styles/*.css', '**/styles/*.scss']
        }
    }
}

exports.modules = {
    autoRequire: {
        'app.js': ['initialize']
    }
}
