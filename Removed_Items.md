[Download Putty.exe found here](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html) to  **PiSetup**.  
Look under **Alternative Binary Files**  
Download Putty.exe - the SSH/Telnet client.  
I am using the 64 bit version. You should too if you are using a 64 bit machine.  
This exe is ready to run. No need to install.  
The SHA1 hash can be checked using NodeJS the same way that the Raspian OS was checked or you can use the Win32 Disk Imager.  
There is a link at the very bottom of the download page that will take you to a listing of all the SHA1 hashes for the various downloads offered.  
I have read that getting the SHA1 hash from the same website that the downloaded file comes from is a pretty useless exercise if the website has been compromised but I am doing it anyway because at least it ensures that the file has not been tampered with during the download process. 

#### Enable SSH.  
Now that we are using a keyboard it is unnecessary to us SSH and it is a security risk.  
But I am leaving this section in just in case there is reason to use SSH in the future.  
Open NotePad and type some random characters into the document. It doesn't matter what the characters are as long as there is something to save.  

Click **Save**, navigate to the SD card, and then select **All Files** from the **File type** pulldown menu.  

Save the file as `"ssh"` (the quotation marks are included in the name). The reason for the quotation marks is to ensure that the file is created without any extensions appended to the file name.  

In order for ssh to work on a raspberry pi this file must exist in the root directory of the SD card.  

Putty.exe would be the application to use on your windows machine if you wish to SSH into your pi.  
Connect the two devices with an ethernet cable and boot up the pi  
Get the IP address of your pi by taping on the Networking icon near the upper right of the Task Bar and enter this into putty.  
Putty will then prompt you for user name and password.  
That's it! Your in.  


#### Install the Florence virtual keyboard 
Since we are using a keyboard now there is no reason to install Florence. So skip this section.  
From the VNC session you just created, open the command line interpreter (AKA Terminal Window) on your pi.  
To do this, click the icon on your pi's task bar that looks like a terminal window.  
You can also find it on in your pi's menu under **Accessories**.  

Now install Florence.  
Execute the following in the pi's terminal window.  
`sudo apt-get update && sudo apt-get install florence`  

Florence will not run correctly unless you install the **at-spi2-core** package.  
Execute the following line of code in your pi's terminal window.  
`sudo apt-get install at-spi2-core`  

Finally, reboot your pi.  

When the pi wakes up again, the Florence virtual keyboard will be available in the pi's menu under **Universal Access**  

One of the virtual keys bears the icon of a wrench. This opens your settings dialog. Under **Layout** I selected the **Standard** keyboard with the **Navigation** **Numeric** and **Florence** keyboard extensions. Under **Behavior** I selected **Mouse** as the input method and nothing was selected in the **Auto hide** checkbox group.  Under **Window** in the **Features** checkbox group **Transparent**, **Task bar**, and **Floating icon** were deselected.  

#### Install an icon to start the Florence virtual keyboard in the Application Launch Bar  
No need to do this now since we are not using the Florence keyboard.  
The process is documented here only in order to show how to add an icon to the **Application Launch Bar**  
Start this process by right clicking on the **Task Bar**, then click on **Panel Settings**, Then click on the **Panel Applets** tab, then select **Application Launch Bar** Then click the **Preferences** button. Then under **Universal Access** pick the **Florence** virtual keyboard and then press the **Add** button. Once added, the icon can be positioned with the **Up** and **Down** buttons.

#### Install the GDM3 Display Manager
No need to do any of this. GDM3 is only useful for the onscreen keyboard we needed when there was no actual keyboard.
The display manager is responsible for managing the user authentication screen. The Raspian OS comes with the LightDM display manager which does not have a virtual keyboard for password entry. The Florence virtual keyboard we just installed will not work either because there is no apparent way to load it before the login screen shows up. So we will switch out LightDM with GDM3 which does have an integrated virtual keyboard.  
[More info about that here.](https://askubuntu.com/questions/829108/what-is-gdm3-kdm-lightdm-how-to-install-and-remove-them)  

From the VNC session you just created, open the command line interpreter (AKA Terminal Window) on your pi.  
To do this, click the icon on your pi's task bar that looks like a terminal window.  
You can also find it on in your pi's menu under **Accessories**.  

Make your pi aware of the latest packages available for install.  
Execute the following line of code in your pi's terminal window.  
`sudo apt-get update`  

Now install the GDM3 display manager.  
`sudo apt-get install gdm3`  

This is a long install during which you will be asked to verify switching from LightDM to GDM3. 

Install an Application for changing GDM3 settings and other settings in GNOME  
`sudo apt-get install dconf-tools.` 
