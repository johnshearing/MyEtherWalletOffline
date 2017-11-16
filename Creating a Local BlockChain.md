## Instructions for Creating and Using an Ethereum Local BlockChain
## [A List of Resources](https://github.com/johnshearing/Ethereum_Local_Block_Chain/blob/master/README.md#whats-next-ethereum-tutorials-and-documentation) for Developers Who Wish to Learn How To Build Distributed Applications (Dapps) for the Ethereum BlockChain is Included at the End  


With the following information it is possible to setup and use a local Ethereum BlockChain.  
This makes development and testing of Dapps fast, free, easy, and possible to do offline.
I am using Windows 8 but the process is almost exactly the same for other operating systems.

### Step 1. Download and install geth.exe.
This is the Go Ethereum client. I downloaded my copy at the following URL.  
https://ethereum.github.io/go-ethereum/install/

### Step 2. Create a JSON script for setting up your blockchain 
Paste the following JSON script in a text file and name it CustomGenesis.json for this example
```
{
  "nonce": "0x0000000000000042",
    "mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "difficulty": "0x20000",
    "alloc": {},
    "coinbase": "0x0000000000000000000000000000000000000000",
    "timestamp": "0x00",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "extraData": "Custom Ethereum Genesis Block",
    "gasLimit": "0xffffffff"
}
```
The above fields should be fine for most purposes, although it is recommend to
change the nonce to some random value so you prevent unknown remote nodes from 
being able to connect to you. 


###Step 3. Generate the BlockChain Data files 
Type or paste the following commands into Bash, PowerShell, Command-Prompt or some other command line interpreter. Obviously, you will need to make slight changes to my example code as required.

Navigate to the directory which contains geth.exe using the Change Directory command (cd). The following example is specific to my machine. Modify the command so that your command line interpreter is looking into the directory where geth.exe has been installed. In the alternative you can the folder containing geth.exe to your user or system path.
```
C:\Users\John\BlockChain\Ethereum\WorkFolder\Decypher_TV\Transactions  
```  
 For PowerShell users: You can change the Powershell prompt as follows if you want to.  
 `function prompt{"MyPrompt> "}`  
 Notice the space for readability.  

To create the Genesis Block execute the following command with modifications to the --datadir path and the genesis file path of course. The "./" at the begining of the line is only required if the folder containing geth.exe is not listed in your user or system path. Other changes are optional as noted below the following command. 
```
./geth --networkid 1100 --identity JohnsComputer --nodiscover --nat none --datadir C:\Users\John\BlockChain\TestChainDataFiles init C:\Users\John\BlockChain\Ethereum\WorkFolder\MakeLocalChainScripts\CustomGenesis.json console
```
Now your first transaction block has been created and all the files and folders necessary to run your blockchain are now in place.

In the above example: 
* The keyword --networkid identifies a particular blockchain. Make this number unique on your network and only give it out to those whom you wish to use your blockchain. 0=Olympic (disused), 1=Frontier (perhaps Homestead now?), 2=Morden (disused), 3=Ropsten) (default: 1)  
* The keyword --identity identifies a particular computer on the blockchain - in this case your computer. So after the keyword --identity, enter a name that will make you think of your computer.  
* The keyword --nodiscover ensures that the computer wishing to work on the blockchain specifes the --networkid. This helps to keep your private blockchain private. 
* The keyword --nat stands for Network Address Translation. As of this writing there are troubles with this function so following the --nat keyword, enter the value 'none' **without** the quotation marks as I have done in the example above.  
* The path following the keyword --datadir determines what folder will be used to store the blockchain data.  
* The path following the keyword init tells geth.exe where to look for the genesis file.
* The keyword console allows you to enter [JavaScript commands](https://github.com/ethereum/go-ethereum/wiki/JavaScript-Console) into your command line interpreter after the genesis block has been created. This allows you to interact with geth.exe using Ethereum's [Web3 interface](https://github.com/ethereum/wiki/wiki/JavaScript-API). A better option, however, is to open a new instance of your favorite command line interpreter, navigate to the folder where geth.exe is located, and then execute the following command:`./geth attach` This will allow you to interact with geth.exe in the new second window without all the distraction of screen output produced as geth runs your blockchain.  

**Note** the --genesis command has been deprecated. Use init instead **without** preceding dashes as shown in the example above.

The following command line shows other options which can be used when creating a genesis block. I leave these options undocumented because I do not know what all of them do. I leave them here so at least you know what some of your options are and so that you can [look them up](https://github.com/ethereum/go-ethereum/wiki) if you have a mind to do so.
```
./geth --identity "MyNodeName" --init CustomGenesis.json --rpc --rpcport "8000" --rpccorsdomain "*" --datadir "C:\chains\VPSChain" --port "30303" --nodiscover --ipcapi "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --rpcapi "db,eth,net,web3" --autodag --networkid 1900 --nat "any" console
```

### Step 4. Bring Your Local BlockChain to Life.  
##### Run Geth locally.  
Your blockchain has been created but it is not yet running or listening for transactions.  

Before you do anything else, close any and all command line interpreters running on your computer. This will ensure that geth.exe is not running. In this way you can make a fresh start. Now open a new instance of your favorite command line interpreter and navigate once again to the directory where geth.exe is installed.  

The following is the command I use to start geth.exe when I want to interact with the blockchain using the Ethereum Wallet or a custom webpage. The path following the keyword --datadir must be modified of course to point geth.exe at the folder on your computer which contains the BlockChain data files. These are the files you created in the previous step. Execute this command after the apropriate changes have been made.
```
./geth --networkid 1100 --identity JohnsComputer --nodiscover --nat none --datadir C:\Users\John\BlockChain\TestChainDataFiles --rpc --rpccorsdomain "http://localhost:3000" console
```  

If I need to interact with the local blockchain using Nodejs it is necessary to start the run the chain using the following command. Notice that the rpcapi has been enabled and that the localhost is a different number.  
```
./geth --networkid 1100 --identity JohnsComputer --nodiscover --nat none --datadir C:\Users\John\BlockChain\TestChainDataFiles --rpc --rpcapi "db,eth,net,web3" --rpccorsdomain "http://localhost:8545" console
```

##### Other Options to Try When Running Geth
I leave these options undocumented because I do not know what all of them do. [Look them up](https://github.com/ethereum/go-ethereum/wiki/Command-Line-Options) if you are interested.

```
./geth --maxpeers 0 --mine --minerthreads=1 --etherbase=0x0000000000000000000000000000000000000000 --port "30303" --rpc --rpcport "8080" -rpccorsdomain "*" --ipcapi "admin,eth,miner" --rpcapi "eth,web3" --networkid 1100 -nodiscover --maxpeers 5 --minerthreads 1 --nat none --identity MyTestChain --verbosity 3 
--datadir C:\Users\John\BlockChain\Ethereum\WorkFolder\TestBlockChainData console
```

```
./geth.exe --identity "TestBlockChain"  --rpccorsdomain "*"   --nodiscover --rpcapi "db,eth,net,web3" --networkid 1999 console
```
### Step 5.Add a Main Account and Start Mining
Assuming you have completed Step 4, geth.exe is now running but it is not yet processing transactions. What does this mean you might ask. It means that you can query the blockchain and do some administrative tasks but you cannot write to the block chain. Transactions on Ethereum cost money (Ether) so before you will be able to process transations on your test network you will need to get some play money to work with. You do this by mining transation blocks. Before you can start mining you will need to create an account to store all your play money. Here's what to do:  
* Open a new instance of of your favorite command line interpreter.
* Navigate to the directory containing geth.exe using the cd path command as we have done in the previous examples.
* Paste the following code into your command line interpreter and press Enter. This opens geth's JavaScript console which allows you to execute JavaScript commands, commands from the [Web3 interface](https://github.com/ethereum/wiki/wiki/JavaScript-API), or even entire scripts.  
`./geth attach`  
* Now create a new account for yourself by executing the following command. Make the password hard to guess and keep it in a safe place or someone may steal your play money. If you lose your password there is no way to recover your play Ether.  
`personal.newAccount("password")`  
* Execute the above command two or more times so that you will have a least 3 accounts to play with.
* Next we need tell the miner to put all the Ether it earns into your first new account. The following is the command. By changing the index of listAccounts in the following allows you to select the recipient of the mining rewards  
`miner.setEtherbase(personal.listAccounts[0])`   
* Now type or paste the following into your new command line interpreter instance and then press Enter.  
`miner.start(1)`  
The number inside the parenthesis determines the number of threads you wish to allocate to mining. I normally choose just one when testing. Now geth.exe is mining datablocks in exchange for pretend money which you can use to send transactions to your blockchain. The first time you run this command on your new blockchain geth.exe will build DAG files. This process will complete in a few minutes and then it will start mining data blocks and processing any transactions that you send. If you flip back to your original instance of your command line interpreter (remember two instances are running) you can watch the miner at work. If you ever find that your miner is not working a common fix is to delete the DAG files and start the miner again. The miner will rebuild the DAG files and start mining when the build is finished. To delete the DAG files I normally delete the directory C:\Users\John\AppData\Ethash.

**Keep in mind:** Even if you have enough Ether to process your transaction, the miner process must be running when the transaction is sent. If the miner is not running then the transaction will not be processed.

If you are not processing transactions and if you have enough play money then you can stop the mining process by typing `miner.stop()` into the JavaScript console and then pressing Enter. This will free up time on your CPU for other tasks.  

Now that you have a JavaScript console open, this might be a good time to try out some Javascript Commands:  
The one below is fun! If your mining process has been running then the following command will tell you how much Ether you have gained. Paste it into your JavaScript console and press enter.  
`balance = web3.fromWei(eth.getBalance(personal.listAccounts[0]), "ether")`  

If you prefer, you could paste the following in to a JavaScript file and save it as myFile.js

```
primary = eth.accounts[0];
balance = web3.fromWei(eth.getBalance(primary), "ether");
```  
Then you could run the script with the following command.  
`loadScript('/path/to/myfile.js')`

[Official Documentation for Go Ethereum client found here](https://github.com/ethereum/go-ethereum/wiki)

### What's next? Ethereum Tutorials and Documentation:  
* Purchase the course:[Decypher/Ethereum Ðapp Development](http://decypher.tv/series/ethereum-development) by Jordan Leigh
  * The first few videos are free. The information in these videos can't be found anywhere else. I actually studied all the other resources in this listing before I found these videos and it wasn't until I saw these and started working through the exercises that the light bulb went on and I understood how to work with smart contracts. I am not getting paid for this endorsment. I am just grateful that somebody opened the door and let me into the world of Ethereum and smart contracts.
    * [Ultimate Intro to Ethereum Ðapp Development [Part 1] - Provisioning the Development Environment](https://www.youtube.com/watch?v=rmtsh7Q7sbE&t=11s)  
    * [Ultimate Intro to Ethereum Ðapp Development [Part 2] - Creating Ethereum Keypairs](https://www.youtube.com/watch?v=YWoBeoTUrYM)  
    * [Ultimate Intro to Ethereum Ðapp Development [Part 4] - Introduction to Transactions](https://www.youtube.com/watch?v=-5LhwoCcjp0)  
    * [Notes for the videos can be found here.](https://gist.github.com/johnshearing). I made them for myself as I was going through Jordans videos. They are a great help to me - I hope they help you too.  
    * The following is a list of official Ethereum reference sheets that you will need as you work through the course.  
      * [Web3 JavaScript Ðapp API](https://github.com/ethereum/wiki/wiki/JavaScript-API)      
      * [Installing Geth](https://github.com/ethereum/go-ethereum/wiki/Building-Ethereum)      
      * [Geth Command Line Options](https://github.com/ethereum/go-ethereum/wiki/Command-Line-Options)        
      * [Management APIs](https://github.com/ethereum/go-ethereum/wiki/Management-APIs)  
      * [JavaScript Console](https://github.com/ethereum/go-ethereum/wiki/JavaScript-Console)  
      * [Managing your accounts](https://github.com/ethereum/go-ethereum/wiki/Managing-your-accounts)  
      * [Backup & restore](https://github.com/ethereum/go-ethereum/wiki/Backup-&-restore)     
  * Now that you have seen how good this course is buy the full library of more than 30 videos and gain a deep understanding of smart contract development in the shortest time possible. It costs 3 ether (about $38 at the time of this writing). Jordan shows you how to [make the purchase with real ether using MetaMask](https://www.youtube.com/watch?v=NhG4EeApIHo). I would pay $38 dollars just to see how to do that!  
  * Finally, when you are done working through the series, Jordan posted the two free videos linked below. These are cool to watch because they were made when he was just starting to learn about smart contracts and Ethereum himself. Thank you Jordan for all the help.  
    * [Introduction to Ethereum Smart Contract Development with Solidity (Part 1)](https://www.youtube.com/watch?v=8jI1TuEaTro&t=1803s)  
    * [Introduction to Ethereum Smart Contract Development with Solidity (Part 2)](https://www.youtube.com/watch?v=3-XPBtAfcqo)  
* Next, Download and install the [Ethereum Wallet](https://github.com/ethereum/mist/releases). You will see both the Ethereum Wallet and the Mist Browser offered for download. Choose the Ethereum Wallet. This is used to compile your smart contracts, to send them to a blockchain, and to interact with them. No matter if you are using geth.exe to run a local Ethereum Blockchain or if geth.exe is attached to the real one, the Ethereum Wallet will see it and you will be able to compile contracts and make transactions.  
* Watch this video to get a quick overview of how to work with smart contracts using the Ethereum Wallet. [The Fastest Way to Explore Ethereum Contracts ](https://www.youtube.com/watch?v=1xuKJj3INSY&index=72&list=WL)  
* Follow this video tutorial playlist: [Building Ethereum dapp using Solidity](https://www.youtube.com/playlist?list=PLH4m2oS2ratdoHFEkGvwvd7TkeTv4sa7Z) by [Shlomi Zeltsinger](https://github.com/Shultzi/). Learn to write smart contracts with Solidity, deploy your contracts onto a test blockchain using the Ethereum Wallet with MetaMask or deploy to your own local blockchain if you prefer. Then write a simple web enabled Dapp using Meteor that interacts with your smart contracts.     
* Learn from Fabian Vogelsteller [AKA Frozeman](https://github.com/frozeman) how to write Ethereum web based distributed applications - This is the man who wrote the Ethereum Wallet mentioned above, who wrote much of the [Web3 JavaScript API](https://github.com/ethereum/wiki/wiki/JavaScript-API), and who wrote the Meteor tools that Schlomi Zeltsinger demonstrates in the playlist mentioned above.  
  * [Follow Fabian's tutorial on how to build a distributed application for Ethereum using Meteor](https://github.com/frozeman/simple-dapp-example)  
  * [Watch the video supplement to Fabians tutorial mentioned above](https://m.youtube.com/watch?v=SayS1dcMVWU)  
  * [Read Fabian's book about building web apps with Meteor](https://www.packtpub.com/web-development/building-single-page-web-apps-meteor). Buying this book is the smartest investment you can possibly make if you are interested in understanding the Meteor tools that Fabian uses to build web enabled user interfaces for Ethereum. Ethereum is not mentioned specifially in the book but if you want to understand how his Meteor interface (shown in the above tutorial and video) works then you need to read this book.  
* Use Christian Reitwiessner's [Solidity Online Compiler and IDE](https://ethereum.github.io/browser-solidity) to compile your smart contracts, send them to to the blockchain, and interact with them.  
  * [Source found here](https://github.com/ethereum/browser-solidity) if you wish to run it locally.  
  * Watch this video about the online compiler: [The Browser-Solidity IDE](https://www.youtube.com/watch?v=gMNPN2ofAvM)  
* Avoid the pitfalls: The IDEs AlethZero to AlethFive and the Mix IDE mentioned in some of the old quick start guides are no longer supported. Don't waste your time. The Ethereum Wallet, mentioned above, works well for compiling and deploying small systems of smart contracts - its a great way to get started. Browser-Solidity mentioned above is an advanced IDE. It also compiles small systems of smart contracts. Some of the advantages of Browser-Solidity are as follows:  
  * A debuger called ReMix has been incorperated into Browser-Solidity.  
  * It provides a means to formally verify smart contracts. This means that contract byte code on the blockchain is matched to it's human readable source code. In this way one can inspect a smart contract before deciding to use it.
  * Analyitical tools are provided.  
  * It provides extra information during the compile process which can be used to interact with smart contracts once they have been deployeed.  
  * Finally, using Browser-Solidity can help you gain a deeper understanding of the Ethereum Virtual Machine.  
* Learn from Juan Fran Blanco how to work with smart contracts using Nethereum and the Visual Studio IDE.  
  * [1st Video: Smart contracts, private test chain and deployment to Ethereum with Nethereum](https://www.youtube.com/watch?v=4t5Z3eX59k4&list=PL4KrqfhCMJhRVz-hJ83SqFkxJQF7Iac8v&index=1)  
    * All links to required software are provided in the video notes.  
    * Topics Covered:  
      * Creating a contract.  
      * Compiling a contract.  
      * The byte code and the ABI.  
      * Running a private blockchain.  
      * Nethereum and VS.  
      * Unlocking an account.   
      *Deploying a contract.  
      *Mining the transaction of the deployment.   
      *Getting a receipt for the transaction.   
    * At first I thought Nethereum uses a language called [TypeScript](https://en.wikipedia.org/wiki/TypeScript) - a superset of Javascript. TypeScript was developed by Anders Hejlsberg, lead architect of C# and creator of Delphi and Turbo Pascal. On second look, however, I see that Nethereum uses C#. In any case I want to mention Typescript because it's a strictly typed version of Javascript that actually cross-compiles to regular JavaScript yet allows all kinds of intelesense and code compleation in the [VS Code IDE](https://code.visualstudio.com/) (not to be confused with the Visual Studio IDE) that would not otherwise be possible.
  * [2nd Video: Cross platform development in Ethereum using .Net Core and VSCode](https://www.youtube.com/watch?v=M1qKcJyQcMY&list=PL4KrqfhCMJhRVz-hJ83SqFkxJQF7Iac8v&index=2) This video is the same as above for Mac and Linux.  
  * [Third Video: Introduction to Calls, Transactions, Events, Filters, Topics in Ethereum using .Net](https://www.youtube.com/watch?v=Yir_nu5mmw8&list=PL4KrqfhCMJhRVz-hJ83SqFkxJQF7Iac8v&index=3)  
    * Create a smart contract with events  
    * Create transactions using vscode and .net core (same for visual studio "fat" on windows and xamarin)  
    * Create filters to subscribe to logs (events)  
    * Create a DTO class to decode the information from the event  
    * Finally get the changes of the from the filters and the decoded event data.  
  * Even if you are not interested in Nethereum (you should be) it is well worth watching the videos because they show interactions with the blockchain common to all development environments which are not shown anywhere else.  
* What about getting information out of the Ethereum blockchain?  
  * First check out [EthSlurp](http://ethslurp.com/video.html). Thomas Rush of Great Hill Corp has created the most advanced tool  I have seen for reporting on the Ethereum blockchain. Watch the video, read the docs, make a donation if you want to, and then download the tool. It's free and you can't get something better for any price. 
* [Read the official Frontier Documentation](https://ethereum.gitbooks.io/frontier-guide/content/index.html). Frontier is Ethereum Version 1. Some informaton here is outdated, but there is some information here that is hard to find else where.  
* [Read the official Homestead Documentation](http://www.ethdocs.org/en/latest/). Homestead is Ethereum Version 2.  
* [Read the Ethereum Wiki](https://github.com/ethereum/wiki/wiki). Again, much information here is outdated but there is some information here that is hard to find else where.  
* [Read the official Solidity documentation](http://solidity.readthedocs.io/en/develop/introduction-to-smart-contracts.html)
* Now you are ready to learn from Andreas Olofsson [AKA Androlo](https://github.com/androlo) how to build advanced distributed applications for Ethereum  
  * If you need to build a large scale, complex, permissioned, distributed application for the Ethereum blockchain which is comprised of many smart contracts working together than this is the luckiest day of your life.   
    * Start with these 7 tutorials. [Monax Solidity Series by Andreas Olofsson](https://monax.io/docs/tutorials/solidity/).  
      * These are probably the most in depth tutorials on the Internet about building advanced systems of smart contracts. Do not miss the oportunity to read this information. **The link above brings you to a table of contents which allows you to select the tutorial you wish to read. You will need to return to this table of contents to see the other articles because the links inside the tutorials no longer work**  
    * Now Rejoice: Mr. Olofsson has provided us with [The DAO framework on GitHub](https://github.com/smartcontractproduction/dao). This is a working framework as described in the above tutorial series.  
    * [Here it is again on NPM](https://www.npmjs.com/package/dao-framework). God bless you Mr. Olofsson!  
    * [Here is the documentation](http://smartcontractproduction.github.io/dao-javascript/index.html)
    * [Here is a short post describing the framework](https://www.linkedin.com/pulse/new-open-source-smart-contract-framework-available-andreas-olofsson?trk=mp-reader-card)  
    * Although the following videos show much about the framework they are from other projects for which the repositories appear to have been deleted by Eris (now Monax).    
      * [Building Dapps Playlist](https://www.youtube.com/watch?v=7EqrJefM3Aw&list=PL_kFomDrqPoZBu5uxd8OBGColQPYbuz3i)  
        * 1st video: [Dapp tutorial - preview](https://www.youtube.com/watch?v=7EqrJefM3Aw&list=PL_kFomDrqPoZBu5uxd8OBGColQPYbuz3i)   
          * Topics Covered: Intro to playlist, Smart contract deployment using Nodejs, Registering contracts so that they can be swapped out later without breaking the Dapp, Automated testing of smart contracts
        * 2nd video: [Dapp making tutorial part 2 - A simple decentralized filestore](https://www.youtube.com/watch?v=3uWka2cYEiw&index=2&list=PL_kFomDrqPoZBu5uxd8OBGColQPYbuz3i)  
          * Topics Covered: File storage system with Ethereum and the Interplanetary File System, Mappings and Double linked lists which allow collection of data without the need to iterate over a list.
        * 3rd video: [Identity management and modular DApp design](https://www.youtube.com/watch?v=6C5zNCrSI8I&index=3&list=PL_kFomDrqPoZBu5uxd8OBGColQPYbuz3i). Not much new in this vid but worth watching to see what can be accomplished.  
  * Video: [Introduction to Advanced Solidity](https://www.youtube.com/watch?v=GylBxjsytDk)  
    * Topics covered: Assembly in Soidity, Bitecode and Op Codes, How the EVM works, [Browser-Solidity](https://ethereum.github.io/browser-solidity), Reading the Yellow Paper.  
    * This video is an intoduction to Mr. Olofsson's [Solidity Workshop Tutorial series stored on GitHub](https://github.com/androlo/solidity-workshop). There is more covered in the tutorials then you will see in the video. Once you are on Mr. Olofsson's Workshop repository, scroll down to the ReadMe document. You will need to click once on the link in the table of contents and then click on the link you are brought to (also on the ReadMe page) in order the view the tutorial you want to see. There are several tutorials you can look at if you want to know how Ethereum actually works.    
  * [dapp-core dev diary Playlist](https://www.youtube.com/playlist?list=PL_kFomDrqPobRgCXxyUD-qq-1tQL2HrxV)  
    * 1st Video: [Solidity 'sUnit' unit test coverage analysis added ](https://www.youtube.com/watch?v=jEoVUajV3Uk&index=1&list=PL_kFomDrqPobRgCXxyUD-qq-1tQL2HrxV)  
      * Topics Covered:
        * Testing Smart Contracts with sUnit Using an Abstract Syntax Tree. sUnit is was written in JavaScript.    
        * The repository can be found [here](https://github.com/smartcontractproduction/sol-unit)  
      * It is found on NPM [here](https://www.npmjs.com/package/s-unit).  
      * An updated version written in Go is found [here](https://github.com/androlo/sol-tester) but personally, I am commited to working in JavaScript.
    * 2nd Video: [Webpage from contract ABI generator](https://www.youtube.com/watch?v=4MtVc-qEcZY&index=2&list=PL_kFomDrqPobRgCXxyUD-qq-1tQL2HrxV#t=1.579931)  
      * I was unable to find a repository for this. It was removed from the Eris (now Monax) repository. Perhaps it can be found [here on NPM](https://www.npmjs.com/package/bcu) although my search efforts were unrewarded. The video is well worth watching anyway because it demonstrates in part that a great opportunity exists in writing software that can write and update smart contracts and the user interfaces used to interact with them. This will be explored more further on.  
  * [Solidity Tutorial Playlist](https://www.youtube.com/watch?v=z4KmhL1PbPw&list=PL_kFomDrqPoaxM5BCFDskBQnFVtAFHdvz)  
    * [1st Video: Solidity tutorial part 1](https://www.youtube.com/watch?v=z4KmhL1PbPw&list=PL_kFomDrqPoaxM5BCFDskBQnFVtAFHdvz&index=1)  
      * Topics Covered: 
        * AlethZero (and older no longer supported IDE) is used to demonstrate basic solidity principals. Valuable because everything demonstrated is directly relateable to Browser-Solidity which has very little documentation.  
        * At 8 minutes - All the code for a simple webpage is shown which is used to create and interact with a simple smart contract.  
        * At 16 minutes - Security issues  
        * At 20 minutes - Mr. Olofsson discusses the [Monax tutorials](https://monax.io/docs/tutorials/solidity/) mentioned above that he was writing at the time and he promises a book along with code also mentioned above. I don't know if a book  about the framework will ever be published but the [Framework Documentation](http://smartcontractproduction.github.io/dao-javascript/index.html) is very good.  
    * 2nd Video: [Solidity Tutorial part 2](https://www.youtube.com/watch?v=9Lu6iMQS6A0&index=2&list=PL_kFomDrqPoaxM5BCFDskBQnFVtAFHdvz)  
      * Topics Covered:
        * Mr. Olofsson is now working with an early version of Browser-Solidity.
        * Constructors, Solidity Documentation, Special variables: Block Properties, crypto functions, typical contract functions, More on using html and JavaScript to create and interact with smart contracts, mapping types, sending Ether  
    * 3rd Video:[Smart Systems of Smart Contracts](https://www.youtube.com/watch?v=mzbxSArVIx4&index=2&list=PL_kFomDrqPoaxM5BCFDskBQnFVtAFHdvz)  
      * Topics Covered: Mr. Olofsson discusses more about the [Monax tutorials](https://monax.io/docs/tutorials/solidity/) mentioned above that he was writing at the time.
    * 4th Video: [Solidity Tutorial Part 3 - Deploying a system.](https://www.youtube.com/watch?v=_cy2meGwU_E&list=PL_kFomDrqPoaxM5BCFDskBQnFVtAFHdvz&index=4)  
      * Topics Covered: An older IDE (AlethZero) to deploy a early version of his smart contract framework. **Don't miss this video** it's well worth watching because there aren't any videos that I could find showing how to deploy his latest framework.  
  * Video [Running a Dapp in a Browser](https://www.youtube.com/watch?v=0WsEUCyy1yU). This is outdated material since Web3 and MetaMask but is included here in order to keep a full list of Mr. Olofsson's work.  
  * [People's Republic of Doug Playlist](https://www.youtube.com/watch?v=NVupNB_uFwk&list=PL6B3Sm2L7jf2aRr859K8GFncNUw6uFMxv&index=1)  
    * This playlist of 11 videos shows the Mr. Olofsson's vision for a system of government managed on an Ethereum blockchain by it's citizens. Shown is Mr. Olofsson's Dapp written in LLL which is his earliest version of the smart contract framework. Well worth the watch because it shows how the system is used. It is expected that a government managed on the Ethereum blockChain can reduce the posibility of power grabs, politcal corruption, and voter fraud while increasing transparency and autonomy. This is the future of Democracy. Thank you Mr. Olofsson.
  * [Democratic DAO, based on DOUG v3](https://www.youtube.com/watch?v=tUXcynigJ_o)  
    * This is the earliest of Mr. Olofsson's videos known to me. Here we get to see some of the LLL code that drives the his system of government.  

My goal after studying all this material is to write one free open source triple entry accounting system that governments, companies, organizations, and people can use. The idea is one set of books for everything where the books not only need to balance within an entity but also across all the entities. The hope is to prevent crime, corruption, and war by making money and asset movement transparent across the planet and at the same time making financial services accessible to everyone. Of course this is not going to happen in my lifetime but I want to help get things started.

What will you do with Ethereum?




