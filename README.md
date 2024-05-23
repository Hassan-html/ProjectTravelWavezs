if you want it to run on cpanel change package.json to

"scripts": {
"dev": "node server.js",
"build": "next build",
"start": "NODE_ENV=production node server.js"
}

<!-- to run on local host -->
"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }