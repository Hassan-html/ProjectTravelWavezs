if you want it to run on cpanel change package.json to

"scripts": {
"dev": "node server.js",
"build": "next build",
"start": "NODE_ENV=production node server.js"
}
