#!/bin/sh
echo "installing necessary libs and software"
apt-get update
apt-get install nodejs npm
apt-get install libopenzwave-doc libopenzwave1.5 libopenzwave1.5-dev
cp ./init_zwave.service /etc/systemd/system/init_zwave.service
systemctl daemon-reload
systemctl enable init_zwave.service
systemctl restart init_zwave.service
chmod +x update_script.sh
(crontab -l 2>/dev/null; echo "30 23 * * * home/pi/Raspberry_Sensor_Hub/initialize/update_script.sh > /home/pi/cron_exec.log") | crontab -

