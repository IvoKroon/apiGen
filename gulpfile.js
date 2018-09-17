/**
 * Created by ivokroon on 17/11/2016.
 */
var gulp = require('gulp'),
    nodeMon = require("gulp-nodemon");

var port = 8080;

gulp.task('default', function(){
    nodeMon({
        script: 'app.js',
        ext: 'js',
        env:{
            PORT:port
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function(){
        console.log("Restarting on port: " + port);
    })
});