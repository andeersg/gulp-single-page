# gulp-single-page

Small gulp-plugin i made to compile a single file from a folder of files.

It uses handlebars for compiling.

Example usage:
```js
var gulp = require('gulp');
var singlepage = require('gulp-single-page');

gulp.task('sp', function() {
  gulp.src('parts/*.hbs')
  .pipe(singlepage('index.html', {
    layout: 'main.hbs',
    assets: 'assets'
  }))
  .pipe(gulp.dest('dist'));
});
```

This would take all pages in parts folder and send them to the main.hbs template.
The template could be as simple as this:
```hbs
<!doctype>
<html>
<head>
	<title>Single Page</title>
</head>
<body>
  {{#each section}}
    {{{this}}}
  {{/each}}
</body>
</html>
```
The only part thats required for now, is the ``section`` array, that's the array that contains the content of the files.
