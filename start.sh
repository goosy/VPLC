pm2 delete all
pm2 start --name="VPLC" node -- -r esm ./lib/VPLC.js
pm2 logs "VPLC" --lines 200
