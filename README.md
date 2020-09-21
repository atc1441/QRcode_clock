# QRcode_clock
64x64 RGB LED Matrix QR code clock using ESP32 and Espruino

This repo is made together with this explanation video:(click on it)

[![YoutubeVideo](https://img.youtube.com/vi/_Ku3ds-njfU/0.jpg)](https://www.youtube.com/watch?v=_Ku3ds-njfU)

### You can support my work via PayPal: https://paypal.me/hoverboard1 this keeps projects like this coming.

you can flash the image with:
python3 esptool.py --chip esp32 --port "COM4" --baud 921600 write_flash -z --flash_mode "dio" --flash_freq "40m" 0x1000 bootloader.bin 0x10000 espruino_esp32.bin

or the esp flashing GUI


Then go to https://www.espruino.com/ide/ to connect to the ESP32 via UART and upload the JS file to it.
