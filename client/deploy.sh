# Deploy to Rasberry Pi Server....

echo "Switch to barch mai"
git checkout main

echo "Building app....."
yarn run build

echo "Deploying to RasberyPi server...."
scp -r dist/* pi@mypi:/var/www/timerdash.com/