'use strict';
var viewWalletCtrl = function($scope, walletService) {
    $scope.usdBalance = "loading";
    $scope.eurBalance = "loading";
    $scope.btcBalance = "loading";
    $scope.etherBalance = "loading";
    $scope.tokenVisibility = "hidden";
    $scope.pkeyVisible = false;
    $scope.newKeyStoreFilepassword = "";
    $scope.finishedKeyStoreText = '';
    $scope.finishedKeyStoreFilename = '';
    walletService.wallet = null;
    walletService.password = '';
    $scope.ajaxReq = ajaxReq;



    /* Start of: Generate Keystore File 
    First Try - This didn't work out. 

    $scope.$watch('newKeyStoreFilepassword',function() {       
        $scope.validatePassword();
    });




    $scope.validatePassword = function() 
    {
        if (!$scope.isStrongPass()) 
        {
            $scope.notifier.danger(globalFuncs.errorMsgs[1]);
        } 
        else 
        {
            $scope.generateKeyStoreFile();
        }
    }




    $scope.isStrongPass = function() 
    {
        return globalFuncs.isStrongPass($scope.newKeyStoreFilepassword);
    } 




    $scope.generateKeyStoreFile = function() 
    {
        var key = Buffer.from($scope.wallet.getPrivateKeyString(), 'hex');  
        var keyStoreUtilObj = ethUtil.keyStoreUtil.fromPrivateKey(key); 
        $scope.finishedKeyStoreText = keyStoreUtilObj.toV3String('password', {n: 1024});
        $scope.finishedKeyStoreFilename = $scope.keyStoreFilename();
        alert($scope.finishedKeyStoreText);
        alert($scope.finishedKeyStoreFilename);

    }




    $scope.keyStoreFilename = function()
    {
        var curTime = new Date();
        var utcTime = curTime.toISOString();
        var dateStr = utcTime.split("T");
        var date = dateStr[0];
        var hour = curTime.getUTCHours();
        var minute = curTime.getUTCMinutes();
        var second = curTime.getUTCSeconds();
        var millisecond = curTime.getUTCMilliseconds();
        var fileName = "UTC--" + date + "T" + hour + "-" + minute + "-" + second + "." + millisecond + "Z" + "--" + $scope.wallet.getAddressString().substring(2);    
        return fileName;
    }

     End of: Generate Keystore File - First try */


    /* Start of: Generate KeyStore File - Second try */
    $scope.$watch(function() {
        if ($scope.newKeyStoreFilepassword == "") return null;
        return $scope.newKeyStoreFilepassword;
    }, function() {
        if ($scope.newKeyStoreFilepassword.length < 9) return;
        $scope.wallet = walletService.wallet;
        $scope.wd = true;
        if (walletService.wallet.type == "default") $scope.blob = globalFuncs.getBlob("text/json;charset=UTF-8", $scope.wallet.toJSON());
        if ($scope.newKeyStoreFilepassword != '') {
            $scope.blobEnc = globalFuncs.getBlob("text/json;charset=UTF-8", $scope.wallet.toV3($scope.newKeyStoreFilepassword, {
                kdf: globalFuncs.kdf,
                n: globalFuncs.scrypt.n
            }));
            $scope.encFileName = $scope.wallet.getV3Filename();
        }
    });
    /* End of: Generate KeyStore File - Second try */


    $scope.$watch(function() {
        if (walletService.wallet == null) return null;
        return walletService.wallet.getAddressString();
    }, function() {
        if (walletService.wallet == null) return;
        $scope.wallet = walletService.wallet;
        $scope.wd = true;
        $scope.showEnc = walletService.password != '';
        if (walletService.wallet.type == "default") $scope.blob = globalFuncs.getBlob("text/json;charset=UTF-8", $scope.wallet.toJSON());
        if (walletService.password != '') {
            $scope.blobEnc = globalFuncs.getBlob("text/json;charset=UTF-8", $scope.wallet.toV3(walletService.password, {
                kdf: globalFuncs.kdf,
                n: globalFuncs.scrypt.n
            }));
            $scope.encFileName = $scope.wallet.getV3Filename();
        }
        $scope.wallet.setBalance();
        $scope.wallet.setTokens();
    });




    $scope.$watch('ajaxReq.key', function() {
        if ($scope.wallet) {
            $scope.wallet.setBalance();
            $scope.wallet.setTokens();
        }
    });





    $scope.printQRCode = function() {
        globalFuncs.printPaperWallets(JSON.stringify([{
            address: $scope.wallet.getAddressString(),
            private: $scope.wallet.getPrivateKeyString()
        }]));
    }





    $scope.showHidePkey = function() {
        $scope.pkeyVisible = !$scope.pkeyVisible;
    }




    $scope.resetWallet = function() {
        $scope.wallet = null;
        walletService.wallet = null;
        walletService.password = '';
        $scope.blob = $scope.blobEnc = $scope.password = "";
    }




};
module.exports = viewWalletCtrl;
