#!/bin/sh
echo "update started"
echo "Stopping service"
systemctl stop init_zwave.service
echo "stopped service"
cd "~/Rasperry_Sensor_Hub"
git pull
echo "restarting service"
systemctl start init_zwave.service

