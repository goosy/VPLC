
npm install

if command -v gulp >/dev/null 2>&1; then
	echo gulp-cli is installed.
else
	call npm install gulp-cli -g
fi
gulp build

if command -v pm2 >/dev/null 2>&1; then
	echo pm2 is installed.
else
	call npm install pm2 -g
fi

rm -dr node_modules
rm -dr src
rm -drf .git
npm install --production