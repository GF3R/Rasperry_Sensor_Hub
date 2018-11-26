#!/bin/sh
echo "installing necessary libs and software"
update
apt-get install npm git 
apt-get install libopenzwave-doc libopenzwave1.5 libopenzwave1.5-dev
git clone https://github.com/GF3R/Rasperry_Sensor_Hub.git
cd Rasperry_Sensor_Hub
cp ./init_zwave.conf /etc/init/ 
start init_zwave
(crontab -l 2>/dev/null; echo "30 23 * * * ~/Raspberry_Sensor_Hub/initialize/update_script.sh") | crontab -

