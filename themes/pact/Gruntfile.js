module.exports = function(grunt){
  grunt.initConfig({
    gitclone: {
      fontawesome: {
        options: {
          repository: 'https://github.com/FortAwesome/Font-Awesome.git',
          directory: 'tmp/fontawesome'
        },
      }
    },
    copy: {
      fontawesome: {
        expand: true,
        cwd: 'tmp/fontawesome/fonts/',
        src: ['**'],
        dest: 'source/css/fonts/'
      }
    },
    _clean: {
      tmp: ['tmp'],
      fontawesome: ['source/css/fonts']
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.renameTask('clean', '_clean');

  grunt.registerTask('fontawesome', ['gitclone:fontawesome', 'copy:fontawesome', '_clean:tmp']);
  grunt.registerTask('default', ['gitclone', 'copy', '_clean:tmp']);
  grunt.registerTask('clean', ['_clean']);
};