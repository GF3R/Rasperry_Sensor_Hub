#!/bin/sh
echo "installing necessary libs and software"
apt-get update
apt-get install -y nodejs npm
apt-get install -y libopenzwave-doc libopenzwave1.5 libopenzwave1.5-dev
if [ "$1" = "-s" ]; then
  echo "setting up service"
  cp ./init_zwave.service /etc/systemd/system/init_zwave.service
  systemctl daemon-reload
  systemctl enable init_zwave.service
  systemctl restart init_zwave.service
  echo "Service was initialized"
fi
echo "setting up regular updates"
chmod +x update_script.sh
(crontab -l 2>/dev/null; echo "30 23 * * * sudo home/pi/Raspberry_Sensor_Hub/initialize/update_script.sh") | crontab -
