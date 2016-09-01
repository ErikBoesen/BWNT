module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// Tasks
		cssmin: { // Begin CSS Minify Plugin
			target: {
				files: {
					'dist/css/newtab.min.css' : ['css/*.css', '!css/options.css'],
					'dist/css/options.min.css' : 'css/options.css'
				}

			}
		},
		uglify: { // Begin JS Uglify Plugin
			dist: {
				files: {
					'dist/js/options.min.js' : ['js/*.js', '!js/newtab.js'],
					'dist/js/newtab.min.js' : 'js/newtab.js'
				}
			}
		},
		watch: { // Compile everything into one task with Watch Plugin
			css: {
				files: 'css/*.css',
				tasks: ['cssmin']
			},
			js: {
				files: ['js/*.js'],
				tasks: ['uglify']
			}
		}
	});

	// Load Grunt plugins
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Register Grunt tasks
	grunt.registerTask('default', ['watch']);
};
