#!/bin/sh
echo "installing necessary libs and software"
apt-get update
apt-get install nodejs npm tmux
apt-get install libopenzwave-doc libopenzwave1.5 libopenzwave1.5-dev
cd ../Rasperry_Sensor_Hub
cp ./init_zwave.conf /etc/init/ 
start init_zwave
(crontab -l 2>/dev/null; echo "30 23 * * * ~/Raspberry_Sensor_Hub/initialize/update_script.sh") | crontab -

