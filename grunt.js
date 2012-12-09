module.exports = function(grunt){
	grunt.initConfig({
		lint: {
			files: ["grunt.js", "assets/js/**/*.src.js", "assets/js/**/*.spec.js"]
		},
		watch: {
			scripts: {
				files: "<config:lint.files>",
				tasks: "lint jasmine"
			}
		},
		jasmine: {
			all: {
				src:['assets/js/specs/SpecRunner.html'],
				errorReporting: true
			}
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				node: true,
				es5: true,
				strict: false
			},
			globals: {
				$: true,
				jQuery: true,
				Backbone:true,
				_:true,
				requirejs: true,
				window: true,
				define:true,
				require:true
			}
		}
	});

	grunt.loadNpmTasks('grunt-jasmine-task');

	grunt.registerTask('default', 'lint');
};