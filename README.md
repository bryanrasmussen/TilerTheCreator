# TilerTheCreator
A Simple Utility library for using the Tiling functions of Tactile-Js without needing to know much about how tiling works. 

At the time of this writing Tactile.js isn't incorporated into the NPM system, and there were some problems installing with NPM so in order to install please run

    yarn install

There is a test, called TestTiler.js. You can run that with 

    Node TestTiler.js

You will get a console log "Tiler working fine" if everything is ok, or "No Polygons returned from Tiler"

If you get an error like this

import { mul, tilingTypes, IsohedralTiling } from 'tactile-js/lib/tactile.js';
         ^^^
SyntaxError: The requested module 'tactile-js/lib/tactile.js' does not provide an export named 'mul'

This is because of Tactile (at the time of this writing) not providing a package.json with type module. 

In that case take the file _package.json and copy it to the folder node_modules/tactile-js/lib/
renaming it to package.json in the process. 

After this your tiling should work. 
