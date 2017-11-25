'use strict';
var viewWalletCtrl = function($scope, walletService) {
    $scope.pkeyVisible = false;
    $scope.newKeyStoreFilepassword = "";
    $scope.finishedKeyStoreText = '';
    $scope.finishedKeyStoreFilename = '';
    $scope.isDone = true;
    $scope.wallet = null;
    $scope.blob = $scope.blobEnc = "";
    $scope.showWallet = false;
    walletService.wallet = null;
    walletService.password = '';


    /* Start of: Generate KeyStore File - Third attempt - This one worked */

    $scope.isStrongPass = function() {
        return globalFuncs.isStrongPass($scope.newKeyStoreFilepassword);
    } 




    $scope.genWalletBlob = function() {
        if ($scope.isDone) {
            $scope.blob = $scope.blobEnc = null;
            $scope.wallet = walletService.wallet;
            var key = Buffer.from($scope.wallet.getPrivateKeyString(), 'hex');  
            var keyStoreUtilObj = ethUtil.keyStoreUtil.fromPrivateKey(key); 
            if (!$scope.$$phase) $scope.$apply();
            $scope.isDone = false;
            //$scope.wallet = Wallet.generate(false);
            $scope.showWallet = true;
            $scope.blobEnc = globalFuncs.getBlob("text/json;charset=UTF-8", keyStoreUtilObj.toV3($scope.newKeyStoreFilepassword, {n: 1024}));
            $scope.encFileName = $scope.wallet.getV3Filename();
            if (parent != null)
                parent.postMessage(JSON.stringify({ address: $scope.wallet.getAddressString(), checksumAddress: $scope.wallet.getChecksumAddressString() }), "*");
            $scope.isDone = true;
            if (!$scope.$$phase) $scope.$apply();
        }
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




    $scope.generateKeyStoreFile = function() 
    {
        //Bail out if password is weak.
        if (!$scope.isStrongPass()) 
        {
            $scope.notifier.danger(globalFuncs.errorMsgs[1]);
            return;
        } 

        //Password is strong so generate the KeyStore object.     
        $scope.genWalletBlob();   
        $scope.finishedKeyStoreFilename = $scope.keyStoreFilename();       
    }

    /* End of: Generate KeyStore File - Third attempt - This one worked */




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
