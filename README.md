# Development Instructions for Kaleidoscope

## Setup
Use the following commands in your development environment to get this up and running
```
git clone https://github.com/Juan555/Kaleidoscope.git
```
or
```
git clone git@github.com:Juan555/Kaleidoscope.git
```
then
```
cd Kaleidoscope
npm install
bower install
```

If you want grunt + livereload for frontend development, run
`gem update --system && gem install compass`
to install Compass and Sass for grunt

Run `grunt` to start up grunt + livereload if you're working on frontend files.

Run `gulp` to start up nodemon + livereload if you're working on backend files.