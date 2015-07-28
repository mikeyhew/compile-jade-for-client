# compile-jade-for-client
A gist showing how I compile jade templates for use on the client, and how to use mixins.

To use one of your mixins from the client, add a file to `views/client-templates/your-mixin.jade` that calls the mixin `+your_mixin(nameOfArg1, nameOfArg2)`. You should then be able to access your mixin on the client by including the javascript file that is outputted by Grunt (in this example, it's `.tmp/public/js/jade-templates.js`), and calling `jadeTemplates['your-mixin']({nameOfArg1: valueOfArg1, nameOfArg2: valueOfArg2})`.
