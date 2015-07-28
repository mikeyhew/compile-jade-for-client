/**
 * Compiles jade templates for client in /views/client-templates,
 * and puts the resulting javascript strings into a single file,
 * js/jade-templates.js
 */

module.exports = function(grunt) {

	grunt.config.set('jade-client', {
		dev: {
			files: {
				// e.g.
				// 'relative/path/from/gruntfile/to/compiled/template/destination'  : ['relative/path/to/sourcefiles/**/*.html']
				'.tmp/public/js/jade-templates.js': ['views/client-templates/**/*.jade']
			}
		}
	});
	
	grunt.registerMultiTask('jade-client',
    'Compile Jade files in views/client_templates to client functions',
    function () {
      grunt.log.debug('starting jade-client task');
      grunt.log.debug('number of files', this.files.length);

      var templates = [];

      this.files.forEach(function (f) {
        f.src.filter(function (filepath) {
          if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Source file "' + filepath + '" not found.');
            return false;
          }
          return true;
        }).forEach(function (filepath) {
          grunt.log.debug('filepath: ', filepath);
          var src = grunt.file.read(filepath);
          var templateName = path.basename(filepath, '.jade');
          var jadeOptions = {
            filename: filepath
          }
          var compiled;
          try {
            compiled = jade.compileClient(src, jadeOptions);
          } catch (e) {
            grunt.log.error(e);
            grunt.fail.warn('Jade failed to compile: '+filepath+'.');
            return false;
          }
          templates.push( 'jadeTemplates[\'' + templateName+'\'] = '+compiled+';');

        });
      });
      var dest = '.tmp/public/js/jade-templates.js';
      var content = 'var jadeTemplates = {};\n\n'
      content += templates.join('\n\n');
      grunt.file.write(dest, content + '\n');
    });
};
