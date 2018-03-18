## The Secure Brick - Instructions for setting up a raspberry pi with touch screen and camera installed as an optically isolated digital wallet for Ethereum offline transactions.  

This is the start of fully open source documentation of the physical build and all the software.  
Disk images are forthcoming but you don't need them. You can build from scratch using these instructions.  

There are two versions:
* The first version ([working prototype already built](https://www.youtube.com/channel/UCQlQRc9muSqPZIXSfugN43A)) uses an aluminum case and is about the size of a brick. It has a touchscreen on one side, a camera on the back, and a printer on the side. It is battery powered or powered by AC. The unit is selfcontained. Everything required to make keypairs, print keypairs, and make encrypted transaction instructions is built into the machine. So there is never a need to show your private keys to any other device. There are no cable jacks (except for DC power to charge battery), no WiFi, No Bluetooth - just a camera and a touch screen for input and QR-Codes displayed on the screen for output. Account numbers are scanned in through the camera in the form of qr-code or entered manually through the touch screen. Encrypted transaction instructions are displayed on the touch screen in the form of qr-code to be scanned into a smartphone. A smartphone snaps a picture of the encrypted qr-code instructions and broadcasts those instructions to the Ethereum blockchain. It is easy and quick to use but is also as safe as any cold storage method because all work with the private keys are done on this air-gapped machine and never shown to any other device. And because you never plug into a computer as is required with other hardware wallets, you never have to worry about key loggers, remote viewing or remote control, nor do you need to worry about unknowingly transacting with a phony website pretending to be the wallet you normally use.

* The second version is much smaller but has no printer. The parts have arrived for this.  
* A laser cut case if forthcoming for both versions. The CAD files will also be made available here for those people that would like to cut their own cases.

The plan now is to teach clients how to set up with their own accounts in person for a fee or teach them [for free via YouTube](https://www.youtube.com/channel/UCQlQRc9muSqPZIXSfugN43A) if they prefer. Then sell them a clean machine, or they can build their own using this repository for instructions.  
Now they can set up their own accounts in their own homes or businesses when they are alone.  
In this way there is never any doubt that the only person who has the keys is the client.  

The items you will need for the most basic setup with no printer, no battery, and no smart power management is as follows. A material list with links for a setup with all of the above features included will be forth coming when we have settled on a final design. But to get started, you will need a raspberry pi 2 board, the official raspberry pi 7 inch touchscreen, the SmartiPi Case for the pi, a camera, the smartiPi case for the camera, a 16 G-bite SD card, a power adaptor, an ethernet cable, a WiFi dongle, a 32Mb thumbdrive, and a power adapter.  
 
Specially machined parts will be made available for purchase and CAD files will be freely posted here so you can make them yourself. Also the fully assembled device already loaded with software can be purchased from me or you can set up your own business to do the same.  

The following is the written tutorial from which these notes are made.  
[Setup Headless, Security, WiFi, VNC, Camera, and Much More](http://thezanshow.com/electronics-tutorials/raspberry-pi)

The following YouTube playlist follows the written tutorial exactly.  
[Setup Headless, Security, WiFi, VNC, Camera - YouTube Playlist](https://www.youtube.com/watch?v=RlUhDUJfTe8&index=1&list=PLNnwglGGYoTvy37TSGFlv-aFkpg7owWrE)  

Make a folder and name it perhaps **PiSetup**  

[Download Win32 Disk Imager found here](https://sourceforge.net/projects/win32diskimager/) to **PiSetup** and install it to the same directory.  Source forge does not seem to offer a hash to check that the downloaded file has not been tampered with but the application does generate hashes so you can use it to check the validity of other files. When using it for that purpose, be careful not to accidentally trash your C: drive.

[Download 7-zip found here](http://www.7-zip.org/) to **PiSetup**and install it.  

[Download Raspinan Jessie with Pixel found here](https://www.raspberrypi.org/downloads/raspbian/) to **PiSetup**   
**Do not** download Stretch (the latest version of raspbian). As of this writting. I have not yet heard of anyone achiving LUKS full disk encryption when using Stretch as the operating system without using a second Linux computer to do the encryption.   

If you want to, you can use the Win32 Disk Imager to check that the SHA1 hash of your zip file is the same as the SHA1 hash listed on the raspberry pi website (this is the easiest option). Or you can use NodeJS at the command line to check that the downloaded zip file has not been tampered with. This takes a bit more time but it is good to have two completely different methods to hash a file.  
Assuming NodeJS is installed - Open your favorite command line interpreter. I use PowerShell.  

`cd` to the directory where downloaded zip file is located.  

Start node by executing the following command.   
`node`  

Then execute the following commands one at a time.  
Change the file name parameter to the name of the zip file before executing the last command, of course.  

```
var fs = require('fs')   

var crypto = require('crypto')  

fs.createReadStream('/some/file/name.zip').pipe(crypto.createHash('sha1').setEncoding('hex')).on('finish', function () {
  console.log(this.read()) //the hash
})
```  
After a minute or two, the hash of the zip file will appear at the console output. Be patient.  
If you are satisfied that the SHA1 hashes match then extract the file to the same directory using 7-zip.   

[Download VNC client found here](https://www.realvnc.com/download/viewer/) to **PiSetup**  
No install is required.  
The SHA256 hash is given just below the download button. Node does not have native ability to run a SHA256 hash so I found this package **Hasha** which seem to be very popular. Keep in mind that The Win32 Disk Imager can accomplish the same thing but it's good to have several different methods of getting a hash.  

Installing and using Hasha if you want to:  
Using your favorite Command Line interpreter, `cd` into your **PiSetup** directory.  

Assuming NPM is installed, Initialize a project.  
This creates a package.json file which is necessary to install packages.  
Execute the following command.  
`npm init`  
Then answer the questions at the command line.  

Next install the hasha package.  
Execute the following command.  
`npm install --save hasha`  

Then execute the following commands one at a time.  
**The file name parameter will be different for you of course.**  
```   
const hasha = require('hasha');  
hasha.fromFileSync('VNC-Viewer-6.1.1-Windows-64bit.exe', {algorithm: 'sha256'});  
```  
The hash will appear at the console output.  
If you are satisfied that the hash matches what is published then continue.  

Look up Hasha on NPM to learn about other ways to use this utility.  

### Write the image to the SD Card  

Purchase the higest quality SD card that you can afford.  
I can not make a recommendation execept to say do some research online.  

Ensure that the write protection switch on the SD card adaptor is set to allow writing to the SD card.  

Insert SD card into laptop.  

Open Win32 Disk Imager.  

Point the imager app at the image file (Raspian).  

Point the imager at the target SD card by selecting it from the **Device** pulldown menu.  
All data currently on the SD card will be lost when the Raspian image file is installed on the SD card.  
Be very careful **NOT** to target your hard drive.  

Click on the **Write** button and then click **Yes** button.  

The previously untitled SD card is now called boot.  

The disk imager has the ability to create hashes if required.  

#### Booting the Pi For the First Time  
Now eject the SD card from your computer and insert it into the pi.  

Insert one end of the Ethernet cable into the pi and the other end into your computer.  
Energize the pi and let it cook for a minute or more.  
Future boots will go much faster.   

Important Note: When using your finger to resize windows: tap **on the title bar of the window near an edge** until the cursor changes to become a two headed arrow with heads pointing in opposite directions. Now you will know that the window is ready to be resized. Touch the cursor again and hold your finger for a short moment on the cursor. Now move your finger to resize the window. If you do not follow this method exactly then resizing the window can be maddeningly difficult.  

#### Chose interfacing options, Expand File System.  
Open a Terminal window by clicking the Terminal Window icon on the taskbar.  

Next type: `sudo raspi-config` at the command prompt and press **Enter**  
You will only be able to access this utility from the keyboard. The mouse will not work.  

First, change the password. Make it difficult to guess and write it down so you don't forget it.  

Then under **Boot Options** select Option **B1 DeskTop / CLI**.  
When that screen appears select option **B3 DeskTop GUI requiring user to login**  

Next under **Interfacing Options**, Enable VNC and Camera.  

Under **Advanced Options**, Select **Expand File System**.  

Select **Finish** and accept the offer to reboot.     

#### Setting up VNC  
VNC can be used to configure your pi and to transfer files from PC.  

Make sure there is an Ethernet cable plugged in between your computer and your pi.  
Get the IP address of your pi by taping on the Networking icon near the upper right of the Task Bar.  
Double click on **VNC-Viewer-6.1.1-Windows-64bit.exe** in the **PiSetup** folder on your computer.  
Enter the IP address of your pi into the VNC window on your PC and press **Enter** on the keyboard.  
Your remote VNC session will start.  
Remember you can find out your Ethernet IP address by clicking the WiFi icon one or more times slowly until it shows up. The IP address for the Ethernet connection will be labeled **eth0**. This is the one you want to enter into the VNC dialog box on your computer. The IP address associated with your WiFi dongle will be labled **wlan0**. This is for access to the Internet - it is not used for connecting to your computer.  

You may get some security questions the first time you login with VNC because the VNC client has never seen that host before. Select responses that indicate that you trust the pi and you will be allowed to continue.  

At the command prompt, login in with the username pi and with the new password you just created.    

#### Switch to American keyboard layout if you are American  
At the command line, execute the following line of code.  
`sudo leafpad /etc/default/keyboard`  
Then change `XKBLAYOUT="gb"` to `XKBLAYOUT="us"`  

#### Setup LUKS Full Disk Encryption  
The following is the written tutorial from which these notes are made.  
[Raspberry Pi LUKS Root Encryption](https://robpol86.com/raspberry_pi_luks.html)  

These instructions for encryption are unique because it shows a method of encrypting the entire SD card (your entire operating system) without the need of a second Linux computer. Everything is done on the raspberry pi. The only extra item you will need is a thumbdrive.  
An overview of the process:  
Install software on your Raspberry Pi’s Raspbian OS.  
Build a custom and boot into the initramfs.  
Shrink your main file system.  
Back up your main file system from the SD card to the USB drive.  
Wipe SD card and create an empty encrypted partition.  
Copy back your backed-up file system from USB on to your encrypted SD card.  

**Warning**  
This guide involves backing up your data to a USB drive and destroying all data on your SD card. Though slim there is a possibility of failure. Be sure to have proper backups of your Raspberry Pi in case something goes wrong. Also note that all data on your USB drive will be destroyed during the process since it will temporarily hold all of your Raspberry Pi’s data.  

First install some software:  
We’ll begin by installing software and creating a new initramfs for your Raspberry Pi. This new initramfs will have the cryptsetup program needed to unlock the encrypted partition on every boot. We’ll also include other tools to assist in the initial encryption of your existing data.  

Execute the following at the raspberry pi command prompt:  
`sudo apt-get update && sudo apt-get install busybox cryptsetup initramfs-tools`  

Next we’ll need to add a kernel post-install script. Since Raspbian doesn’t normally use an initrd/initramfs it doesn’t auto-update the one we’re about to create when a new kernel version comes out. Our initramfs holds kernel modules since they’re needed before the encrypted root file system can be mounted. When the kernel version changes it won’t be able to find its new modules. To fix this we will create the following script.  

Execute the following at the raspberry pi command prompt to open the leafpad text editor:  
`sudo leafpad /etc/kernel/postinst.d/initramfs-rebuild`  

Now paste the following into the open text editor window and then save and exit:  
``` 
#!/bin/sh -e

# Rebuild initramfs.gz after kernel upgrade to include new kernel's modules.
# https://github.com/Robpol86/robpol86.com/blob/master/docs/_static/initramfs-rebuild.sh
# Save as (chmod +x): /etc/kernel/postinst.d/initramfs-rebuild

# Remove splash from cmdline.
if grep -q '\bsplash\b' /boot/cmdline.txt; then
  sed -i 's/ \?splash \?/ /' /boot/cmdline.txt
fi

# Exit if not building kernel for this Raspberry Pi's hardware version.
version="$1"
current_version="$(uname -r)"
case "${current_version}" in
  *-v7+)
    case "${version}" in
      *-v7+) ;;
      *) exit 0
    esac
  ;;
  *+)
    case "${version}" in
      *-v7+) exit 0 ;;
    esac
  ;;
esac

# Exit if rebuild cannot be performed or not needed.
[ -x /usr/sbin/mkinitramfs ] || exit 0
[ -f /boot/initramfs.gz ] || exit 0
lsinitramfs /boot/initramfs.gz |grep -q "/$version$" && exit 0  # Already in initramfs.

# Rebuild.
mkinitramfs -o /boot/initramfs.gz "$version"
```  

Now we want resize2fs and fdisk to be included in our initramfs so we’ll need to create a hook file.  
Execute the following at the raspberry pi command prompt to open the leafpad text editor:  
`sudo leafpad /etc/initramfs-tools/hooks/resize2fs`  

Now paste the following into the open text editor window and then save and exit:  
```  
#!/bin/sh -e

# Copy resize2fs, fdisk, and other kernel modules into initramfs image.
# https://github.com/Robpol86/robpol86.com/blob/master/docs/_static/resize2fs.sh
# Save as (chmod +x): /etc/initramfs-tools/hooks/resize2fs

COMPATIBILITY=false  # Set to false to skip copying other kernel's modules.

PREREQ=""
prereqs () {
  echo "${PREREQ}"
}
case "${1}" in
  prereqs)
    prereqs
    exit 0
  ;;
esac

. /usr/share/initramfs-tools/hook-functions

copy_exec /sbin/resize2fs /sbin
copy_exec /sbin/fdisk /sbin

# Raspberry Pi 1 and 2+3 use different kernels. Include the other.
if ${COMPATIBILITY}; then
  case "${version}" in
    *-v7+) other_version="$(echo ${version} |sed 's/-v7+$/+/')" ;;
    *+) other_version="$(echo ${version} |sed 's/+$/-v7+/')" ;;
    *)
      echo "Warning: kernel version doesn't end with +, ignoring."
      exit 0
  esac
  cp -r /lib/modules/${other_version} ${DESTDIR}/lib/modules/
fi
```  

Finally let’s build the new initramfs and make sure our utilities have been installed. The mkinitramfs command may print some WARNINGs from cryptsetup, but that should be fine since we’re using `CRYPTSETUP=y`. As long as cryptsetup itself is present in the `initramfs` it won’t be a problem.  

Execute the following commands at the raspberry pi command prompt one at a time.    
The first two commands grant permission to execute the scripts on the next two lines.  
`sudo chmod +x /etc/kernel/postinst.d/initramfs-rebuild`  
`sudo chmod +x /etc/initramfs-tools/hooks/resize2fs`  
`sudo -E CRYPTSETUP=y mkinitramfs -o /boot/initramfs.gz`  
`lsinitramfs /boot/initramfs.gz |grep -P "sbin/(cryptsetup|resize2fs|fdisk)"`  

Make sure you see `sbin/resize2fs`, `sbin/cryptsetup`, and `sbin/fdisk` in the output.  

Prepare Boot Files:
Next step is to make some changes to some configuration files telling the Raspberry Pi to boot our soon-to-be-created encrypted partition. We’ll make these changes first since they’re relatively easily reversible if you mount your SD card on another computer, should you wish to abort this process. Edit these files with these changes:  

Execute the following at the raspberry pi command prompt to open the leafpad text editor:  
`sudo leafpad /boot/config.txt`  
Then append `initramfs initramfs.gz followkernel` to the end of the file.  
Finally, save and exit the text editor.  

Execute the following at the raspberry pi command prompt to open the leafpad text editor:  
`sudo leafpad /boot/cmdline.txt`  
Then append `cryptdevice=/dev/mmcblk0p2:sdcard` to the end of the line.  
Next replace `root=Whatever_it_says_here with root=/dev/mapper/sdcard`  
Finally, save and exit the text editor.  





#### Setup WiFi    
Insert your WiFi dongle and reboot the pi again (yes, reboot it again).  

After the pi reboots, you will see a WiFi icon in the task bar near the right side.  
Click on the icon and follow the prompts for connecting to your router.  
It will now be possible to use the browser and to download files from the Internet.   

After the pi reboots, start an new VNC session via Ethernet as described below.  

#### Screen lockers are a Security Risk  
Logging out and then back in again is accomplished by selecting the **Shutdown** option on the main menu and then selecting the **Logout** button. This will log the user out and then present the user with a login screen to start a new session if desired. This is fail safe because if the login service crashes or is hacked no one is logged in. But if a screen lock is used then the user is still logged in so if the screen lock crashes or is hacked then the users's session becomes accessable to the attacker. Obviously, applications are closed when the user logs out so logging out is a bit inconvenient when compared with a screen saver but the extra security makes the effort worthwhile. [Jamie Zawinski explains in detail here](https://www.jwz.org/xscreensaver/toolkits.html)  

#### Preventing Screen Blanking  
Screen blanking is a security risk because if a screen goes dark then the user might mistakenly think that the machine is off when infact a mere touch will bring the screen back to life with the users session available.  

#### Prevent Xsession and Display Power Management Signaling from blanking the screen:  
Run the following command in xTerminal to edit lightdm.conf:  
`sudo leafpad /etc/lightdm/lightdm.conf`  

in section [Seat:*] add or adjust line to say:  
`xserver-command=X -s 0 -dpms`  

#### Using xset to working with Xsession and DPMS at runtime:  
At the pi's command line interface (xTerminal) you could execute the following to accomplish the same thing as above but it will only be in effect for the current session.  
`xset s off -dpms`  

To view your Xsession settings, use this command:  
`xset q` 

[More on xset, Xsession, and DPMS here](https://wiki.archlinux.org/index.php/Display_Power_Management_Signaling)   

#### Setup MyEtherWallet  
[For developers and regular users, the entire project is found here](https://github.com/kvhnuke/etherwallet#download-the-latest-release-httpsgithubcomkvhnukeetherwalletreleaseslatest).  

Read everything on that page and then click on the link near the top of the readme file entitled **Download the Latest Release**   

Developers will download the source code to their computers and will follow the developers instructions on that webpage.  
```
Here is the gist of it from Taylor at MEW:  
clone the repo  
enter that folder  
install node / npm and then do npm install gulp in your command line.  
Now you can make changes via the /app/ folder and it will recompile and show up in the dist/index.html.  
If you want to remove big pieces, you can adjust things in app/scripts/main.js or app/layouts/index.html  
If you want to adjust items on certain pages, you can remove via the components in app/includes/  
And then you have a mess of styles in /app/styles/  
running gulp prep will compile it all down using the ES5 babel transform. You need this if you are using slightly older browsers.   
```

Users will download the compiled version (dist-vX.X.X.X.zip) directly to their pi and unzip it.  
Keep all the unzipped files together as they were when they were unzipped on the pi.  
Do not move them around.  
Leave them undisturbed.  

I find that the easiest way to install MEW on the pi is to use the pi's browser and go to MyEtherWallet.com.  
Then scroll to the bottom of the webpage and click on the link entitled **Latest Release**  
Download the distribution zip file and then move the whole zip file into an folder which I name **MEW**.  
Then unzip the file into this same folder.  

Be very careful when going to MyEtherWallet.com that you type the WebAddress in yourself or use one of your own bookmarks. If you use someone else's link then you will find yourself at a counterfeit website that will steal your private keys and take all your ether. Remember it's myetherwallet.com not .org, not .net or dot anything else. Also, there have been counterfeit websites that use the numeral 1 instead of the letter l in URL. Using this site will cause you to lose all your ether. For these reasons you should always type the URL into your browser yourself, or use one of your own bookmarks.  
**You have been warned**  

To use MyEtherWallet on your pi, run index.html in your browser.  
Assuming you downloaded and extracted MyEtherWallet into the same directory I did then the following command in the terminal window will run it.  
`chromium-browser --app=URL file:///home/pi/MEW/index.html#offline-transaction`  


Don't put any private keys into MyEtherWallet until you have finished working through this document and you committed to disconnecting your pi from the Internet. Once your private keys have been entered into the pi you must **never ever** connect the pi to the Internet. If you do, you will lose all your ether.  
**You Have Been Warned**

At some point soon I will provide a modified distribution of MyEtherWallet which is optimized for use on the raspberry pi as an air-gapped computer for making offline transactions. This will be an open source fork of MyEtherWallet.  

Soon I will also make available for a very reasonable price a case for the raspberry pi which makes it impossible to connect to the Internet. This air-gapped pi will be the safest device you can get for storing your private keys, for making Ethereum offline transactions, and for sending contracts to the Ethereum blockchain. Plans for making this device will be made available for free as an open source project.  

#### Change Browser Settings    
Click the browser control icon at the right - it's the vertical ellipsis.  
Select settings from the menu options. This will bring you to the settings page.  
On the **Startup** options: select the radio button marked "Open a specific page or set of pages".  
Then click the link next to the radio button marked "Set pages".  
Assuming you downloaded and extracted MyEtherWallet into the same directory I did then entering the following into the **Startup Pages** dialog box will cause your local copy of MyEtherWallet to load.  
`file:///home/pi/MEW/index.html#offline-transaction`  

#### Install the Camera and QR-Code reader  
If you have been following along then the camera was already enabled using `sudo raspi-config`  

 Execute the following to set up the camera focus  
`raspistill -t 0`  
Small sharp sissors are good for turning the retaining ring.  
Some force will be required to break the dots of glue that hold the retaining ring in place.  
The focus comes set at infinity.  
Counter clock wise moves the focus closer.  
I adjusted the focus to about 8 inches.  
It might be good to put a dot of super glue on the retaining ring when finished adjusting the focus.  
This whole process is best done before putting the camera in it's housing.  
To see what is possible with raspistill execute `raspistill --help`  

Install zbarcam. This is the program that decodes QR code.   
`sudo apt-get install zbar-tools`  

Download and compile "crikey. This takes output from the zbarcam and pipes it to the active input control.    
`sudo apt-get install libx11-dev x11proto-xext-dev libxt-dev libxtst-dev`  
`wget http://www.shallowsky.com/software/crikey/crikey-0.8.3.tar.gz`  
`tar -xzf crikey-0.8.3.tar.gz`  
`cd crikey-0.8.3`  
`make`  
`sudo cp crikey /usr/local/bin`  
Help with crikey can be found by emailing fmft71 at yahoo dot es  

Execute the following line of code in the pi's terminal window to make the pi cam visible to zbarcam.
`sudo modprobe bcm2835-v4l2`  

Even better, load the module at every boot  
Add `bcm2835-v4l2` to the file **/etc/modules**  

I like to use the LeafPad text editor.
Enter the following command in the pi's terminal window to open the correct file for adding the code above.  
`sudo leafpad /etc/modules`  

Reboot your pi to see the changes take effect.  

Execute the following command in the pi's terminal window to start zbarcam  
`zbarcam --nodisplay --raw --quiet -Sdisable -Sqrcode.enable --verbose --prescale=640x480  | crikey -i`   
Pressing `ctrl + C` will stop the zbarcam.  

#### Install a button on the Application Launch Bar to start the zbarcam QR-Code reader  
Three files are involved:  
[My source of information on this topic can be found here](http://orbisvitae.com/ubbthreads/ubbthreads.php?ubb=showflat&Number=81166#Post81166)  

First, create a file in the pi directory called ld_qr_reader.sh  
The name stands for Load QR-Code Reader.  
The location of the file is important.  
Using the Terminal Window, execute the following command:  
`sudo leafpad /home/pi/ld_qr_reader.sh`  

Paste the following into the file and save it to the pi directory:  
```
#/usr/bin/sh

zbarcam --nodisplay --raw --quiet -Sdisable -Sqrcode.enable --verbose --prescale=640x480  | crikey -i

```

Next, Grant read, write, and execute permissions to every one.  
Execute the following command in the pi's terminal window:  
`sudo chmod 777 /home/pi/ld_qr_reader.sh`  

Second File: Get a nice icon from the internet to represent the QR-Code reader and save it to the following directory:  
`/usr/share/icons/`  
Be sure to convert it to the png format using a paint like program before saving it to the pi.  
I called my icon **QR-Code.png**  
We will refer to the icon later by this name.

Next, Grant read, write, and execute permissions to every one.  
Execute the following command in the pi's terminal window:  
`sudo chmod 777 /usr/share/icons/QR-Code.png`

Third File: The Desktop file - This is file determines the properties of the short cut.  
Execute the following command in the pi's terminal window   
`sudo leafpad /home/pi/.local/share/applications/ld_qr_reader.desktop`  
It could have been named anything but the location maters.  

Paste the following code into the file:  
```
[Desktop Entry]
Name=Start QR_Code Reader
Comment=Start the QR_Code reader
Icon=/usr/share/icons/QR-Code.png
Exec=sudo /home/pi/ld_qr_reader.sh
Type=Application
Encoding=UTF-8
Terminal=false
Categories=Utility;
```

Next, Grant read, write, and execute permissions to every one.  
Execute the following command in the pi's terminal window:  
`sudo chmod 777 /home/pi/.local/share/applications/ld_qr_reader.desktop`

Reboot the pi and then right click on the Application Launch Bar so that you can edit its properties in the same way that was shown for the Florence virtual keyboard above.  
Select your new desktop item (It can be found in accessories) and place it onto the Application Launch Bar.  
 
#### Put another button on the Application Launch Bar to kill the zbarcam process.  
Three files are involved:  

[This article covers killing processes. Use killall and the name of the program](https://www.raspberrypi.org/magpi/command-line-pi/)  

The First File:
Make a copy of your scanner icon and mark it up with the paint program to signify turning off the QR-Code scanner.  
Save it to the pi in the following directory:  
`/usr/share/icons/`  
Be sure to convert it to the png format using a paint like program before saving it to the pi.  
I called mine Kill_QR-Code.png  
We will refer to the icon by this name.  

Next, Grant read, write, and execute permissions to every one.  
Using the pi's terminal window, navigate to the `/usr/share/icons/` directory.
Then execute the following command in the pi's terminal window:  
`sudo chmod 777 Kill_QR-Code.png`

Second file:  
Next, create a file in the pi directory called kill_qr_reader.sh  
The name stands for Kill QR-Code Reader.  
We will refer to the file by this name.  
The location of the file is important too.  
Using the Terminal Window, navigate to the pi directory and execute the following command.  
`sudo leafpad /home/pi/kill_qr_reader.sh`  

Paste the following into the file and save it to the pi directory:  
```
#/usr/bin/sh

sudo killall zbarcam

```  

Next, Grant read, write, and execute permissions to every one.  
Execute the following command in the pi's terminal window:  
`sudo chmod 777 /home/pi/kill_qr_reader.sh` 

Third File: The Desktop file - This is file determines the properties of the short cut.  
Execute the following command in the pi's terminal window   
`sudo leafpad /home/pi/.local/share/applications/kill_qr_reader.desktop`  
It could have been named anything but the location maters.  

Paste the following code into the file:  
```
[Desktop Entry]
Name=Stop QR_Code Reader
Comment=Stop the QR_Code reader
Icon=/usr/share/icons/Kill_QR-Code.png
Exec=sudo /home/pi/kill_qr_reader.sh
Type=Application
Encoding=UTF-8
Terminal=false
Categories=Utility;
```  

Next, Grant read, write, and execute permissions to every one.  
Execute the following command in the pi's terminal window:  
`sudo chmod 777 /home/pi/.local/share/applications/kill_qr_reader.desktop` 

Reboot the pi and then right click on the Application Launch Bar so that you can edit its properties in the same way that was shown for the Florence virtual keyboard above.  
Select your new desktop item (It can be found in accessories) and place it onto the Application Launch Bar.  

At some point in the future it might fun to have the buttons which turn on and off the QR-Code scanner behave like radio buttons where the active button is depressed.    
[This article covers changing the Application Launch Bar programaticlly](https://unix.stackexchange.com/questions/177386/how-can-i-add-applications-to-the-lxpanel-application-launch-bar-via-cli)   

#### Graceful Shutdown on Low Battery While not Plugged In or If User Presses Power Button without Initiating Shutdown at Main Menu  
First I need to measure the current:  
* When the power button is in and the device is running,  
* When the power button is in but the device has been shutdown at the main menu,  
* When the power button is out.  
 
This requires a small circuit which:  
1. Holds the enable pins on the boost converters high (disconnects then from ground) when the power button is pressed in and the low battery pin is high which indicates the battery is charged.  
2. Initiates shutdown first and then pulls the enable pin low (connects to ground) when the power button is pressed out or if the low battery pin goes low indicating that the battery will soon fail for lack of charge and the battery charger is not plugged in.  

The materials required are  
* An OR type logic gate to handle the three input signals (1.power switch, 2.low bat pin, and 3.the 5 Volts from the AC power supply) and output a shut down command by forcing some pin on the pi low (probably pin BCM 17) if the power switch is low or if the low battery pin is low and the power supply is not pluged in.
* Hopefully some pin on the pi shows five volts when the pi is running and 0 volts when the pi has been shut down. If not I will need to make a circuit to pull the enable pins low on the boost converters which will remove power from everything except the charging circuit. 
* Finally, a resistor will be needed to hold the enable pins high once power has been reapplied.

Setting this up:  
[Source for the following advice](http://www.stderr.nl/Blog/Hardware/RaspberryPi/PowerButton.html)
Get and build the DT overlay.  
If a file /boot/overlays/gpio-shutdown.dtbo is already available on your system, you can skip this step.  

Download the devicetree overlay file. 
The easiest is to run wget on the raspberry pi itself:  
Run the following command in the pi's terminal window.
`wget http://www.stderr.nl/static/files/Hardware/RaspberryPi/gpio-shutdown-overlay.dts`  

Compile the devicetreefile:  
Run the following command in the pi's terminal window.  
`dtc -@ -I dts -O dtb -o gpio-shutdown.dtbo gpio-shutdown-overlay.dts`  
Ignore any "Warning (unit_address_vs_reg): Node /fragment@0 has a unit name, but no reg property" messages you might get.  

Copy the compiled file to /boot/overlays where the loader can find it:  
Run the following command in the pi's terminal window.  
`sudo cp gpio-shutdown.dtbo /boot/overlays/`  

Enable the overlay by adding a line to /boot/config.txt:  
`dtoverlay=gpio-shutdown`  
If you need to use a different gpio, or different settings, see the dts file for available options and the Rpi devicetree docs for setting them.  

Also in config.txt put the following line.  
This will make pin 26 go high on bootup and low on halt.  
Now pin 26 can be used shutdown power after the system has been halted.  
`dtoverlay=gpio-poweroff,active_low `  

If running systemd older than v225 (check with systemd --version), create a file called /etc/udev/rules.d/99-gpio-power.rules containing the following lines:
```
ACTION!="REMOVE", SUBSYSTEM=="input", KERNEL=="event*", SUBSYSTEMS=="platform", \
    DRIVERS=="gpio-keys", ATTRS{keys}=="116", TAG+="power-switch"
```   

On systemd v225 and above (Raspbian stretch version 2017.08.16 and upwards) this should not be needed, but I have not tested this.

Reboot your pi for changes to take effect.

Then, if you connect a pushbutton to GPIO3 and GND (pin 5 and 6 on the 40-pin header), you can let your raspberry shutdown and startup using this button. Connecting pins 5 and 6 momentarily will cause the pi to shut down gracefully but it will still be drawing a small amount of current. At this point you can remove the power source without damaging the pi. Reapplying power or connecting pins 5 and 6 again momentarily will cause the pi to start again.

All this was tested on a Rpi Zero W, a Rpi B, a Rpi B+ and a Rpi 2.

This overlay was merged into the official kernel repository, so in the future step 1 above should no longer be needed. It is included in the 1.20170811-1 kernel release, which will hopefull be included in Raspbian images soon (but the 2017.08.16 image does not include it yet).

When the new kernel is included in Raspbian, it would only leave a simple modification to /boot/config.txt to set this up :-D





#### INSTALL PRINTER  
Source:
[Pi camera project](https://learn.adafruit.com/instant-camera-using-raspberry-pi-and-thermal-printer?view=all)  

First we’ll install printer support (CUPS — the Common UNIX Printing System) and some related development tools…  
Execute the following lines one at a time in the pi's terminal window
`sudo apt-get update`  
`sudo apt-get install git cups wiringpi build-essential libcups2-dev libcupsimage2-dev`  



Then install the raster filter for CUPS. This processes bitmap images into the thermal printer’s native format…  
Execute the following lines one at a time in the pi's terminal window.  
`cd`  
`git clone https://github.com/adafruit/zj-58`  
`cd zj-58`  
`make`  
`sudo ./install`  

Your thermal printer may have arrived with a test page in the box or the paper bay. If not, or if you threw that away, you can generate a new one by installing a roll of paper and holding the feed button (on printers that have one) while connecting power, or tapping the button on the back of the “Nano” printer or the “Printer Guts.”  

Look for the baud rate that’s printed near the bottom of the page.  
This is typically either 9600 or 19200 baud. Mine is 9600
This is important…you’ll need to know the correct value for your printer.  

The printer doesn’t need to be connected yet.  
We can prepare the system the same regardless.  
To add the printer to the CUPS system and set it as the default, we’ll be typing two lines similar to the following (but not necessarily identical…read on)…  

`sudo lpadmin -p ZJ-58 -E -v serial:/dev/ttyAMA0?baud=9600 -m zjiang/ZJ-58.ppd`  
`sudo lpoptions -d ZJ-58`  

On the first line, change the “baud” value to 9600 or 19200 as required for your printer.  
For a USB receipt printer, change the device name to /dev/ttyUSB0  
**For all other (TTL) printers, use /dev/ttyAMA0 for the device name.**   
This is my printer is the Nano and the baud rate is 9600 so the line of code above does not change.  
The rest of the line should be typed exactly as it appears above.   
Likewise for the second line, which needs no changes.  



Source:
[Networked Thermal Printer using Raspberry Pi and CUPS](https://learn.adafruit.com/networked-thermal-printer-using-cups-and-raspberry-pi?view=all)  

Plug the printer into the pi  

Run the following commands at the terminal window:
`sudo chmod 777 /dev/serial0`  
`sudo stty -F /dev/serial0 9600`  
`sudo echo -e "This is a test.\\n\\n\\n" > /dev/serial0`  
The printer should print "This is a test."  

Execute the following commands 
`sudo apt-get update`  
`sudo apt-get install libcups2-dev libcupsimage2-dev git build-essential cups system-config-printer`  

Then install the raster filter for CUPS. This processes bitmap images into the thermal printer’s native format…  
Execute the following lines one at a time in the pi's terminal window.  
`cd`  
`git clone https://github.com/adafruit/zj-58`  
`cd zj-58`  
`make`  
`sudo ./install`  

On the pi's main menu, go to **Print Settings**  
Select the desired printer and then unlock the screen by clicking on the **Lock** icon and entering your password  
Now select properties from the local menu.  
Enter the following in the **Device URI** field:   
`serial:/dev/serial0?baud=19200`  
Change the other properties as desired  

Now execute the following command at the pi's termial window    
`echo "This is a test." | lpr`  
The printer will print "This is a test."  

The following command will print a picture:  
`lpr -o fit-to-page /usr/share/raspberrypi-artwork/raspberry-pi-logo.png`  

The following command will print a text file:  
`lp -o cpi=8 filename`  

[Here are some command line options for the printer.](https://www.cups.org/doc/options.html)


#### ENABLE RIGHT CLICK  

Normally right click functionality on a touch screen is achieved with a long press on the screen. However, the official 7 inch raspberry pi touch screen does not support that although long press to get the context sensitive menu is available in the pi's Chrome Browser. To get the context sensitive menu everywhere else there is an application called twofing. As you have probably guessed pressing two fingers on the touch screen initiates the context sensitive menu.  

Here is the complete installation instructions from scratch...  
[The source of these instructions for install without errors is found here](https://www.raspberrypi.org/forums/viewtopic.php?f=108&t=138575&start=25#p1150844)  

[The install instructions here has errors but includes instructions for autostart of which I have not tried](https://maker-tutorials.com/en/raspberry-ri-touch-screen-setup-right-click-with-twofing/)  


Execute the following commands at your pi's command prompt:  

Install the required packages on your pi  
`sudo apt-get update && sudo apt-get install build-essential libx11-dev libxi-dev x11proto-randr-dev libxrandr-dev libxtst-dev xserver-xorg-input-evdev`  

Install and compile twofing  
`cd ~`  
`wget http://plippo.de/dwl/twofing/twofing-0.1.2.tar.gz`  
`tar -xvzf twofing-0.1.2.tar.gz`  
`cd twofing-0.1.2`  
`make && sudo make install`  

Create a new rule-file  
`sudo leafpad /etc/udev/rules.d/70-touchscreen-raspberrypi.rules`  

Add the following line  
`KERNEL=="event*",ATTRS{name}=="FT5406 memory based driver",SYMLINK+="twofingtouch",MODE="0440"`  

Open X11 config in your text editor  
`sudo leafpad /usr/share/X11/xorg.conf.d/40-libinput.conf`  

Add the following lines at the end of the file  
```
Section "InputClass"  
   Identifier "calibration"  
   Driver "evdev"  
   MatchProduct "FT5406 memory based driver"  

   Option "EmulateThirdButton" "1"  
   Option "EmulateThirdButtonTimeout" "750"  
   Option "EmulateThirdButtonMoveThreshold" "30"  
EndSection  
```  
Reboot your device  
`sudo reboot`  

Check if twofing is working  
`twofing --debug`  

Add twofing to autostart  
`sudo leafpad ~/.config/lxsession/LXDE-pi/autostart`  

Add the following line at the end  
`@/usr/bin/twofing`  

Cleanup  
`cd ~`  
`rm -rf ~/twofing-0.1.2`  

Starting and Stopping Twofing
For now, enable by executing the following command at the terminal window.  
`twofing`
To disable twofing execute the following  
`killall twofing`    

#### Install Nodejs and NPM  

Remove any the older version of node if one is installed:  
`sudo apt purge nodejs`    

Install a newer version of node. There are two ways that you can do this.  
Install using nvm  
Install using apt  
NOTE: If you want to keep node fully updated, you should use nvm. If you use apt you have to keep adding repositories every time a new major release comes out.  

**Recommended install method**
Install using nvm:  
Install nvm: `wget -qO- https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash`  
Now Reboot: `sudo shutdown --halt now --reboot`  
Now you can install the latest version of node by running  
`nvm install node`  
This seems to install npm as well.  
Reboot again `sudo shutdown --halt now --reboot`  

**Not recommended. better to use method above instead**  
Install NodeJS using apt:  
Add the NodeSource repository  
`sudo curl -sL https://deb.nodesource.com/setup_8.x | bash`  
Install by running 
`sudo apt install node nodejs npm`  

#### Install the npm packages required for working with Ethereum.  
These packages are only necessary if you will be working at the command line.  
Eventually most users will need MyEtherWallet only, but for now direct interaction with NodeJS is required.  
Make a new working directory call it perhaps **Ethereum**  
Hint: do not name it the same as any packages you intend to install.  
`mkdir ethereum`  

At the command line `cd` into the **Ethereum** directory  
Then type the following and hit enter for each command.  
`npm init` Then follow the prompts to create a package.json file.  

The following installs take time. Be patient during the install process.  

Required for making public and private keypairs:  
`npm install web3 --save`  
`npm install ethereumjs-util --save`  

Required to make offline transactions at the command line:  
`npm install ethereumjs-tx --save`  

Required to work with smart contracts at the command line:  
`npm install solc --save`  

Required to generate a Keystore file from a private key.  
`npm install ethereumjs-wallet --save`

The above commands will install the latest versions of the packages.  

#### Get the program required to get a public address given a private key.  
Execute the following commands in your pi's terminal window:  

Navigate to your the ethereum directory on your pi if you are not already there.  
`cd /home/pi/ethereum`  

Start your Nano text editor.  
`sudo nano keygen.js`

Now paste the following code into Nano

```
var EthUtil = require("ethereumjs-util")

var pkey = new Buffer(process.argv[2],"hex");

var privateKeyToAddress = function(privateKey) {
    return "0x" + EthUtil.privateToAddress(pkey).toString('hex')
}

console.log(privateKeyToAddress(process.argv[2]))
```

Press `CTRL + O` to save the stream. That's the letter ooh not zero.  

Answer `yes` to the default name of the file.  

Press `CTRL + X` to quit Nano.  

We will see how to use this program shortly.  

## You are about to start working with Private Keys.  

#### Copy all these notes over to the pi before pulling the plug on the Internet.
You will need to refer to them from time to time.
Click the **Raw** button near the upper right of this web page and copy all the text from there - otherwise you will not have access to all the URLs in the document.  
Then using VNC, paste them into a text document on your pi.  

#### Back up your SD Card  
#### How to Make an image of the SD card in it's current state  
If your SD card becomes corrupted you will need to bring your pi back to the state it is in now.  
[The source of information for this step is found here](http://lifehacker.com/how-to-clone-your-raspberry-pi-sd-card-for-super-easy-r-1261113524)  

Get everything set up just the way you want it on your Raspberry Pi.  
Then shut down the Pi and remove the SD card.  
Insert the SD card into your computer.  
Start up Win32DiskImager (See source article if you're on OS X or Linux).  
In the "Image File" box, enter the path of your soon-to-be image file. For example, I put mine in `C:\Users\John\Pi_Backups\20170730_Pi.img`  

Under the "Device" box, select your SD card.  
Click the "Read" button to create the image file from your card.  
When it's done creating the image file, you can eject your SD card and put it back in your Raspberry Pi.  
Keep that IMG file in a safe place.   

#### How To Restore Your SD Card From a Backup
Now, if anything ever goes wrong with your Pi, you can restore your fully-set-up image using the following instructions:  
Insert the SD card back into your computer.    
Use **diskpart** to partition and format your SD card.  
[Here is a YouTube vid that shows how to use diskpart](https://www.youtube.com/watch?v=8TQ1RpToSsk)    
Here are the steps you need to follow:  
* Insert the empty SD card into your PC.  
* Open your favorite command line interpreter - I use PowerShell or Command Prompt.  
* Execute the following:  
  * `diskpart`  
* Execute the following:  
  * `list disk`  
* Be very careful to select the correct disk in the next step. Look carefully at the size of the disk for a clue.  
* Execute the following:  
  * `select disk (Put the appropriate number of the disk here)`  
* If the disk shows up in the list as **Offline** then execute the following:  
  * `online disk`  
* Execute the following:  
  * `attributes disk clear readonly`  
* If you are sure you have selected the correct disk and you want to erase it's contents then execute the following  :
  * `clean`  
* Execute the following command:  
  * `create partition primary`  
* Execute the following command:  
  * `select partition 1`  
* Execute the following command:  
  * `active`  
* Execute the following command:  
  * `format fs=ntfs label=Whatever_I_Want quick`  
  * If you don't use the key word **quick** it will take forever to complete the formatting process.  

Now open Win32DiskImager again and browse for your image file.  
Select your device from the Device dropdown. **SELECT CAREFULLY**  
This time, click "Write" to write the image to the SD card.  
When it finishes, eject the SD card and re-insert it into your Raspberry Pi.  
When you boot it up, it should be in the exact same state it was in when you first cloned the SD card.  

## Pull out the WiFi Dongle,  
## Pull out the Ethernet Cable, and  
## Never connect to anything ever again  
Not to a computer, Not to the Internet, Not to a TV, Not to a Phone, Not to a printer, Not to another pi, Not to anything.  
Not with WiFi, Not with Bluetooth, Not with Ethernet, Not with HDMI, Not with GPIO, Not with USB, Not with Video Out, Not with Audio Out, Not with anything.    
#### Lock Down Your Pi  
Open the terminal window and execute the following command: 
`sudo raspi-config` 
Under **Interfacing Options**, disable SSH and VNC.    

#### Never plug anything into your pi  
Not a USB device, Not a memory device, Not a cable of any type, Not a keyboard or a mouse, Not a WiFi device, Not a BlueTooth device, Not anything.  

#### Never have a mobile phone, computer or any electronic device near your pi when typing in or displaying your private key. A malware infected device can read what is on any computer display and can read keystrokes as well simply by listening to the radio signature of those processes. Google "Tempest Certification" to learn more about this. Eventually I hope to make a Tempest Certified version of this device.  

#### Be cognizant of cameras around you when working with your private keys. Especially the cameras in your own phone and your own computer. Crazy people put a blanket over themselves, their pi, and scraps of paper containing private keys when working with private keys. **maybe not so crazy**

#### Change your password and user-name.  
[Directions for changing the user-name can be found here](https://www.modmypi.com/blog/how-to-change-the-default-account-username-and-password)  
Never store your password on any electronic device.  

#### Setting time without and Internet connection
`sudo date -s 2017-02-05 15:30:0`

#### Destroying all information on the SD card  
It is not possible to securely wipe an SD card. So never think you can delete private keys using any method and then safely insert the pi's SD card into another device to download software updates or other information. When software updates are required, ensure that you have written down your private keys several times to insure against sloppy handwriting and losing the paper. Store the hand written private keys in different places so that the keys will not be lost incase of fire or flood. Then destroy the SD card with a hot flame and then smash it into pieces. Then download any required software to a new SD card and reenter your private keys. Refusing to put your SD card into other devices or connect to other devices in any way is the only way to ensure that no one will get your private keys.    

#### Create your private key  
Some people think it is a good idea to SHA3 Hash their dogs name or a clever phase to get a 64 character number for use as a private key. This is a very dumb idea. Anything you can possibly think of has already been thought of and hashed. You will likely lose your ether if you do this. MyEtherWallet comes with a utility to generate a public/private key pair. This is probably very safe but I do not use this method. The problem is not that MEW might transmit the private key - this would be impossible anyway if the pi is air-gapped. The reason I would not use it or any other software to generate my private key is because there is always some chance that a malware infected device could generate a key pair already know to an attacker. Of course, if an attacker has already hacked MyEtherWallet then he would substitute his own public address for the target address when the user presses the **Generate Transaction** button. In any case, I recommend flipping a coin to generate a private key. Let heads represent a one and tails represent a zero. Four flips will produce one hexadecimal character of the key by converting binary to hexadecimal.  
Four tails in a row would be a zero.  
Heads, heads, tails, tails would be a three.  
Heads, heads, heads, head, would be an "F"  
You get the idea.  
This takes a while to accomplish, but if you use this method, no one can ever guess your private key. An attacker might still be able to steal it or force you to hand it over, but he or she would never be able to guess it using a dictionary attack nor by guessing personal information about you.  

#### Generating the public address or public key  
You already have the program **keygen.js** in your ethereum directory.  

Open the Terminal window on your pi.  

Navigate to your ethereum directory.   
Execute the following command.  
`cd /home/pi/ethereum`  

Run the NodeJS program **keygen.js** with your private key as a parameter.  
Execute the following command:  
`./node keygen.js 0x...some_hexadecimal_number_64_characters_in_length`  
The console will return your public address.  

#### Check that your public and private key work together.  
**You can lose all your ether if you do not take the following precaution.**

So now you have a public/private key pair and think they work together. But if you are wrong, you could send your ether to your new public address and then have now way to get your ether out when you want it. Then you would be F--ked. This has happened to several people. So send a very little bit of ether to the public address and test that you can move some of it out with your private key.  

#### Generate a Keystore File (UTC / JSON) using NodeJS from a private key. 
There is too much opportunity for other people to see the private key when using that option in MEW. Better to use a Keystore file.  
There is an opportunity here to associate a photograph with the keystore file as well for use as a blockie. This will prevent moving ether from the wrong account. 
[This Stack Exchange thread shows how to do it](https://ethereum.stackexchange.com/questions/11166/how-to-generate-a-keystore-utc-file-from-the-raw-private-key)  

The following is example code from the above thread with some modification and explanation.  
Start your favorite command line utility. I use PowerShell.  
Then navigate to the directory where ethereumjs-wallet is installed  
`cd DirectoryWhere_ethereumjs-wallet_IsInstalled`  

Start the node console  
Execute the following command:  
`node`  
Now you are interacting with NodeJS not with your command line utility  

Open the etereumjs-wallet library.  
Execute the following command:  
`var Wallet = require('ethereumjs-wallet')`  

Put your private in into a JavaScript buffer and name the buffer "key" 
Execute the following command substituting your own private key for the first parameter of course:  
`var key = Buffer.from('efca4...Enter you 64 charater private key...5378', 'hex')`  
Notice that the **0x** is not included in the 64 character private key.  

Create an object in memory that will be used to create the keystore file and name this object "wallet".  
Execute the following command:  
`var wallet = Wallet.fromPrivateKey(key)`  

Create the keystore and display it to the user.  
Execute the following command replacing 'password' for something more secure of course:  
`wallet.toV3String('password', {n: 1024})`  


The output displayed will be in json format and will look something like the following:  
```
'{"version":3,"id":"467233bf-45ec-423b-9548-bdc4a42aa099","address":"b14ab53e38da1c172f877dbc6d65e4a1b0474c3c","crypto":{"ciphertext":"17886b7ff355219dd20900543b9592fcd4dc6fe7d8f776f1a4d1c63993112181","cipherparams":{"iv":"434e4e71d2013a2d84e86a6e89efbb0b"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"7a785ab75fa906734788d85ff43a2c8e704af41881dd50a2d52abe08092f07ec","n":1024,"r":8,"p":1},"mac":"98d9a76960dcef22a5fd28a6bf47e5c68a71b30bcf353eccbf5a6555abec78a1"}}'  
```
This is the keystore text. You need to put this in a file **without the begining and ending single quotes** in order to use it.  

Copy the entire output onto the clipboard **except for the begining single quote and the ending single quote**. Do not copy these when copying the rest of the output onto the clipboard.  

Now paste the contents of the clipboard into a new file and name the file anything you want.  

When MyEtherWallet asks for a keystore file, select this file you just made and enter your password when prompted.  

The whole thing could be put in a script as shown below if you prefer.  
```
> var Wallet = require('ethereumjs-wallet');  
> var key = Buffer.from('efca4cdd31923b50f4214af5d2ae10e7ac45a5019e9431cc195482d707485378', 'hex');  
> var wallet = Wallet.fromPrivateKey(key);  
> wallet.toV3String('password', {n: 1024});  
```   
At some point soon I will build this utility into MyEtherWallet.

(Here is a link to the Node Package required)[https://github.com/ethereumjs/ethereumjs-wallet]  
You already installed this package if you have been following along.  

## Todo List   

#### Hardware Items Todo  
Install a momentary **Scan** button on the face of the brick.
Pressing the button starts the scan. Releasing the button ends the scan.

Implement an SSD drive with full disk encryption.  
https://www.youtube.com/watch?v=wuKgWK7O9p8  
It turns out there is no difference between a thumb drive and an SD card except that an SD card can not be removed without disassembling the device. Also, the pi 3 is the only one that will boot off a thumb drive. So we are stuck with using an SD card and swaping out the card for different people would be very cumbersome. A Solid State Drive is far better than a thumb drive or an SD card because it is much more sophisticated even though the basic technology is the same. A SSD is faster, will last longer, because it is built like a mini RAID system. The extra speed of an SSD may even make full disk encryption practical for this project. 

Consider charging the battery with a wireless charger.  

Consider the Raspberry Pi Module 3 for it's smaller size in future builds.  

Consider adding a lid and lock to the next build and consider putting an integrated keyboard into the lid.  

Consider adding some kind of notification on bootup if the device has been opened.  

#### OS Software Items To Add Next Time    

Make one button show up at a time for scan start and scan stop such that scan stop replaces scan start while the scan process is running and scan start replaces scan stop when the scan process has stopped. This will save on screen real estate and helps the user understand if the scan process is running or not.

Stop scan process after a good scan.  

Put up a window showing what the camera sees while the scan process is running and make the window disapear when the scan stops either because a good scan has been achived or because the user stopped the scan. This will help the user understand if there is too much glare to get a good scan or if the focal distance is not correct.  

Install Buttons on the Application Launch Bar to Enable and Disable Two Finger Right Click Functionality.  
For now, enable by executing the following command at the terminal window.  
`twofing`
To disable twofing execute the following  
`killall twofing`   
  
Set up a timer to logout the user after a period of inactivity.

Add GUI GPG Utility for file encryption. 
This is to protect any files that have private keys or other sensitive information without having to encrypt the whole drive.  
Even though the whole drive is to be encrypted it makes sense to have encryption at the file level too in case the user walks away from the device while it is running. File encryption will not protect an SD card from forensic analysis but it will protect the data from someone poking around on an open device. The problem is that the source file used to make the encrypted file can not be removed from the SD card using the shred command so the data could be recovered in a labratory. This is why full disk encryption is required to secure data on the device. For this reason I have added the ability to create encrypted KeyStore files using MyEtherWallet. If KeyStore files are used to hold private keys then there is no reason to keep unencrypted private keys on the device.

#### Changes to MyEtherWallet  

Done: Add a native way to generate keystore files (UTC / JSON) from a private key.
Thank you MEW. This was almost completely done for me. Only minor additions to MEW were needed to accomplish this.  

Done: Change the Paper wallet so that it prints nicely on the Nano Printer.  

Done: Generate a qr-code when a message is signed so that it can be passed out of the pi.  
Also load modified MEW onto my phone so that I can generate a qr-code for a signed message and pass it into the brick.

Add PGP Messaging utility where encrypted messages are passed in and out  of the device using QR-Code.  
We will need this so that people can send private keys via email.  
Maybe even something that allows the exchange of encrypted messages on the block chain.  
This should not be too costly if only encrypted private keys are being exchanged this way.
In this way, an email account is not even required - only access to MEW online some other means of interacting with smart contracts in order to get the encrypted message and convert it to a QR-Code scanning into the secure brick.     

Add a native way to associate a photograph with a with public addresses for use as an additional blockie. This will prevent sending ether to the wrong address when selecting public addresses from lists or better from a database on the pi.  
Doing this defeats an attack where different addresses might produce similar looking blockies. But the biggest advantage will be to keep users from getting confused between different accounts that they normally use. I understand that accounts can now be associated with human friendly names but not every account will have this so overall, I think this will be well worth doing.

Add database functionality to handle public addresses and associated Photo-blockies.  

Add a native onscreen virtual keyboard using AngularJS although Florence works ok for now. The keyboard should be Hex or alphanumeric where appropriate, should have cut and paste buttons, database functionality, QR-Code read start and stop buttons, QR-Code generate buttons, OCR controls where appropriate and should pop open when stepping onto a data entry field. MEW should position the data entry field at the top of the screen and the virtual keyboard should position itself underneath the data entry field. This will save on screen clutter which is a big problem with a small screen.  

When tabing - MEW should move to the next field, position it at the top of the screen and open the virtual keyboard with the appropriate layout for that field.  

Make the user aware of how the gas price works and make the field match the Gas Price slider.   
  
Photo Blockie for Account numbers  
* This protects against attacks where similar looking account numbers are switched with the intended recipient account numbers  
* This method would be used in addition to regular blockies not as a replacement.  
* It would be better to use a photo of the person of whom you are doing business with as a blockie of their account number in addition as opposed to a panorama of some random photo but in the case where you don't know what the account holder looks like perhaps a jpg of the person's name.
  
Use more than one blockie for extra verification by hashing twice   
* Protects against similar-looking-account-number/similar-looking-blockie attack  
* or consider using converting to Radix 128 custom Blockie system using photos.   

Add the ability to SHA3 Hash any field, and turn that into a public address, and make a blockie of that.  
Keep a version of this on an online machine and one on the air-gapped machine for comparison.
That will make it possible to compare imported smart contract code with code sent to ensure nothing has changed.  

Look into posting a smart contract using offline transaction screen.  

Figure out how to pass large contracts out of the brick using multiple qr-codes.  

Not Now: Disable the notice that MEW is not connected to the Internet.  
It will always be offline so there is no need for the message.  
Maybe keep the message. It's an extra check to ensure that the brick is not connecting to the net.

Not Now: Trying to remove the ENS tab:  
Right now the screen used to access the Ethereum Name Service will not disappear when **mew** is set to false in globalService.js  
Taylor says it will be complicated to remove this particular tab.  
She suggested wiping the tab clear and using it for something else.  
Perhaps I can use this tab for implementing secure messaging.  

#### Possible changes to the packaging  
The version with built in printer is already created.

The small printerless version is as follows: Think simple, small, thin, pocket sized digital camera - that will be the final form of the secure brick. A camera on the front (no zoom, nothing fancy) and a touch screen on the back. No buttons (maybe one for power). The package will be waterproof, Tempest certified, and cheap to make. The parts have already arrived 


#### Issues  


#### Scratch Pad below of notes and current work.   

Clearing history in CLI  
If we want to be sure we're clearing the history file, even with the histappend option set, we can use the the following commands:  
`history -c`  
`history -w`  
While history -c clears the current session history, the -w option overwrites the history file.  
Clearing the history may be required, as we want to keep the command history protected in the case of theft.  
The logout script for root (/root/.bash_logout) could contain these two lines to ensure no bash history is maintained after logout for root.  

Search SD Card for instances of private key using grep.  
Check History file and the node history file as well.  
`grep -r -s "Enter private key here without 0x in front"`  
or perhaps try  
`sudo grep -r -s "Enter private key here without 0x in front"`  
The -r is for recursive and -s supresses error messages.  

Bash command to search SD Card for instances of private key using grep and a way to delete or overwrite those files.  
`grep -lrIZ foo . | xargs -0 rm -f --`  
-l prints file names of files matching the search pattern.  
-r performs a recursive search for the pattern foo in the given directory ..  If this doesn't work, try -R.  
-I (capital i) causes binary files like PDFs to be skipped.  
-Z ensures that file names are zero- (i.e., nul-)terminated so that a name containing white space does not get interpreted in the wrong way (i.e., as multiple names instead of one).  
xargs -0 feeds the file names from grep to rm -f, separating words by zero (nul) bytes (remember the -Z option from grep).  
-- is often forgotten but it is very important to mark the end of options and allow for removal of files whose names begin with -.  
If you would like to see which files are about to be deleted, simply remove the | xargs -0 rm -f -- part, and leave off the Z option to grep.  

Executing grep without the -s switch shows all the places where grep was unable to look - probably because the OS is using those files. This makes me realize that the only way to find out if the system is secure is to scan the SD card while in a different machine while the OS is not running. I need to find out how to do this. Actually, trying to keep track of all these log files is probably unmanageable. Now Full Disk Encryption is starting to make sense. Full Disk Encryption will make it impossible to extract information from all these copies of private keys that show up in all theses log files. Which brings us to the next todo item: Install an SSD drive with full disk encryption.  




Cool way to reboot:  
sudo shutdown --halt now --reboot  

On the Raspberry Pi, the whole SD card is referred to (by Linux) as /dev/mmcblk0, the first (boot) partition is referred to as /dev/mmcblk0p1 and the second (root) partition is referred to as /dev/mmcblk0p2. (Similarly, if accessing the SD card on a Linux PC using a USB SD card-reader, the whole card might be /dev/sdb, the first partition would then be /dev/sdb1 and the second partition would be /dev/sdb2. If you have multiple drives connected to your PC, these names might change to /dev/sdc, /dev/sdc1 & /dev/sdc2.)  

Post for http://www.stderr.nl/Blog/Hardware/RaspberryPi/PowerButton.html

To start VS Code navigate to the directory containing the gulp.js file using the File Manager.  
Then in the navigation field enter the command `cmd`.  
Then at the command prompt execute the following command:    
`code .`  

To start Gulp copy the directory location from the File Manager.  
Open PowerShell and enter `cd ` then paste in the directory location and press enter.
Then execute the command `gulp`

To Start MyEtherWallet for development navigate to the **dist** directory using the File Manager and double click on **index.html**.  








My public key on Ethereum  
13eC582A8E8A676e78f4E8e2Bf6B135bBE97c306   

[My Ethereum Notes are Found Here](https://gist.github.com/johnshearing)  
[and here](https://github.com/johnshearing/Ethereum_Local_Block_Chain)  

[Here is the github repository for my offline version of MEW]{https://github.com/johnshearing/MyEtherWalletOffline}  

Cool Github commands:  
[This Video Tutorial series gets you up and running on GitHub quickly.](https://www.youtube.com/watch?v=BCQHnlnPusY&list=PLRqwX-V7Uu6ZF9C0YMKuns9sLDzK6zoiV&index=1)  
`git status` Check if any files need to be added to the index.  
`git add <filename>` Add any files shown by status.  
`git add -A` Adds: New files, Updated files, and Deleted files to the index.  
`git commit -a -m "Some comment about the commit"` commits all files in the staging area that were added by the previous command.  
`git log -1` The **-1** means only show information about the last commit.  
`git remote` Lists all the remote servers. This is normally github.  
`git remote -v` Lists all the remote servers along with the URLs.  

Think carefully before using these.  
`git push origin master` Pushes from local machine to github. Think **Think upload**. **origin** represents the remote server (github). **master** represents the branch - master in this case.  
`git pull origin master` Pulls from the github server down to your local machine. Think **download**  

`gh-pages` To view repository as a website make a branch called **gh-pages**.  



The following are the chips selected to perform a graceful shutdown of the pi when the user presses the power button.  
[SN74AHC1G08 Single 2-Input Positive-AND Gate DBV Package 5-Pin SOT-23](http://www.ti.com/lit/ds/symlink/sn74ahc1g08.pdf)  
[SN74AHC1G32 Single 2-Input Positive-OR Gate DBV Package 5-Pin SOT-23](http://www.ti.com/lit/ds/symlink/sn74ahc1g32.pdf)  
[TL331-Q1 SINGLE DIFFERENTIAL COMPARATOR SOT-23 (DBV)](http://www.ti.com/lit/ds/symlink/tl331-q1.pdf)  
[TLV760 100-mA, 30-V, Fixed-Output, Linear-Voltage Regulator](http://www.ti.com/lit/ds/symlink/tlv760.pdf)   

