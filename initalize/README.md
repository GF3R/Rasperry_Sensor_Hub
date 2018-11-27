# Installation

run the inital_install_script as follows:

```bash
$ chmod +x inital_install_script.sh
$ sudo .\inital_install_script.sh
```

the script gets the libs, and necessary packages. It starts the init_zwave as a service and furthermore it enables an update service with crontab, which pulls the newest updates everynight from this git repo.
**After this script is ran, the init_zwave.js will be autostarted on startup.**
to disable this:
```bash
$ systemctl disable init_zwave.service
# or you can just stop it, and it would restart on reboot with:
$ systemctl stop init_zwave.service
```
