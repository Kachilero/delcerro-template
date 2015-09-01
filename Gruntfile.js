/**
* DelCerro Designs static webpage template
* What copywright?
*/

module.exports = function (grunt) {
  'use strict';
  // force use of unix newlines
  grunt.util.linefeed = '\n';

  grunt.initConfig({

    // metadata
    pkg: grunt.file.readJSON('package.json'),
    bower_conf: grunt.file.exists('.bowerrc') ? grunt.file.readJSON('.bowerrc') : { directory: 'bower_components'},
    banner: '/*!\n'+
            ' * DelCerro Template v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * This year <%= grunt.template.today(yyyy) %> <%= pkg.author %>\n' +
            ' */\n',

    // Task configuration
    clear: {
      dist: ['dist']
    },

    jshint: {
      options: {
        jshintrc: 'js/.jshintrc'
      },
      src: {
        src: 'js/*.js'
      },
      assets: {
        src: 'docs/assets/js/application.js'
      }
    }, //end jshint

    jscs: {
      optons: {
        config: 'js/.jscs.json'
      },
      grunt: {
        options: {
          requireCamelCaseOrUpperCaseIdentifiers: null
        },
        src: 'Gruntfile.js'
      },
      scr: {
        src: '<%= jshint.src.src %>'
      },
      assets: {
        options: {
          requireCamelCaseOrUpperCaseIdentifiers: null
        },
        src: 'docs/assets/js/application.js'
      }
    }, // end jscs

    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: false
      },
      dist: {
        src: [
          '<%= bower_conf.directory %>/jquery-ui/ui/jquery.ui.core.js',
          '<%= bower_conf.directory %>/jquery-ui/ui/jquery.ui.widget.js',
          '<%= bower_conf.directory %>/jquery-ui/ui/jquery.ui.mouse.js',
          '<%= bower_conf.directory %>/jquery-ui/ui/jquery.ui.position.js',
          '<%= bower_conf.directory %>/jquery-ui/ui/jquery.ui.button.js',
          '<%= bower_conf.directory %>/jquery-ui/ui/jquery.ui.datepicker.js',
          '<%= bower_conf.directory %>/jquery-ui/ui/jquery.ui.slider.js',
          '<%= bower_conf.directory %>/jquery-ui/ui/jquery.ui.spinner.js',
          '<%= bower_conf.directory %>/jquery-ui/ui/jquery.ui.effect.js',
          '<%= bower_conf.directory %>/jquery-ui-touch-punch-improved/jquery.ui.touch-punch.improved.js',

          '<%= bower_conf.directory %>/bootstrap/dist/js/bootstrap.js',

          '<%= bower_conf.directory %>/bootstrap-switch/dist/js/bootstrap-switch.js',
          '<%= bower_conf.directory %>/bootstrap-tagsinput/dist/bootstrap-tagsinput.js',
          '<%= bower_conf.directory %>/holderjs/holder.js',
          '<%= bower_conf.directory %>/typeahead.js/dist/typeahead.bundle.js',
          '<%= bower_conf.directory %>/select2/select2.js',
          '<%= bower_conf.directory %>/datatables/media/js/jquery.dataTables.js',
          '<%= bower_conf.directory %>/datatables-plugins-bootstrap3/js/datatables-plugins-bootstrap3.js',
          '<%= bower_conf.directory %>/jquery-timepicker-jt/jquery.timepicker.js',

          'js/*.js',
          '!js/application.js'
        ],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    }, //end concat

    ugligy: {
      options: {
        preserveComments: 'some'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    }, //end ugligy

    sass: {
      dev: {
        options: {
          style: 'expanded',
          banner: '<%= banner %>'
        },
        files: {
          'dist/css/<%= pkg.name %>.css': 'scss/<%= pkg.name %>.scss'
        }
      }
    } // end Sass

    // TODO:
    // pick up at line 135: autoprefixer
    // which will actually be postcss

  }) // end initConfig
} // end module.exports
