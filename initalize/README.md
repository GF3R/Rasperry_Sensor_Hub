# Installation

run the inital_install_script as sudo to get all libs and startup the node service

``` bash
$ chmod +x inital_install_script.sh
$ sudo su
$ .\inital_install_script.sh
```

the script gets the libs, and necessary packages. It starts the init_zwave as a service and furthermore it enables an update service with crontab, which pulls the newest updates everynight from this git repo.
