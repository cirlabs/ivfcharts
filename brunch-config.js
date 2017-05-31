// configure brunch plugins (not all plugins need configuration)
exports.plugins = {
  // let bs work with brunch dev server
  browserSync: {
    proxy: "localhost:8080"
  },
  babel: {
    presets: ['es2015', 'es2016']
  },
  postcss: {
    processors: [
      require('autoprefixer')(['last 8 versions'])
    ]
  }
};


// brunch will concatenate files in app/styles and app/scripts
// For more info: http://brunch.io/docs/config#-files-
exports.files = {
  javascripts: {
    joinTo: {
      'app.js': 'app/scripts/*.*|app/components/*.*',
      'vendor.js': 'app/scripts/vendor/*.js|node_modules/**'
    },
    order: {
      // optional: if using jquery, load it globally before other scripts
      before: ['app/scripts/vendor/jquery.js']
    }
  },
  stylesheets: {
    joinTo: 'app.css'
  }
}
