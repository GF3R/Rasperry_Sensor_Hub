#!/bin/sh
echo "update started"
echo "Stopping service"
stop init_zwave
echo "stopped service"
cd "~/Rasperry_Sensor_Hub"
git pull https://github.com/GF3R/Rasperry_Sensor_Hub.git
echo "restarting service"
start init_zwave

