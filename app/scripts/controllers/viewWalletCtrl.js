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


    /* Start of: Generate KeyStore File */
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
    /* End of: Generate KeyStore File */


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
