<article class="col-xs-12 col-sm-10 col-sm-offset-1" ng-show="objENS.status==ensModes.owned && objENS.owner==objENS.deedOwner && wd">


  <!-- TODO VALIDATE IF UNLOCKED WALLET ADDR == OWNER ADDR -->
  <div class="alert alert-danger" ng-show="objENS.owner != wallet.getAddressString()"> This account is not the owner of {{objENS.name}}.eth. Please unlock the Owner Account in order to resolve. </div>

  @@if (site === 'mew' ) { @@include( './ens-resolve-information.tpl', { "site": "mew" } ) }
  @@if (site === 'cx'  ) { @@include( './ens-resolve-information.tpl', { "site": "cx"  } ) }

  <section class="text-center" ng-hide="objENS.owner != wallet.getAddressString()">
    <div class="form-group" style="margin: 2em auto;">
      <h5> Enter the address you would like this name to resolve to: </h5>
      <input ng-model="newResolvedAddress" class="form-control" placeholder="0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8" ng-class="Validator.isValidAddress(tx.to) ? 'is-valid' : 'is-invalid'" />
    </div>

    <div class="form-group" style="margin: 2em auto;" ng-hide="1===1 || objENS.owner != wallet.getAddressString()">
      <button class="btn btn-primary" ng-click="resolveDomain()"> Set Public Resolver &amp; Set Address for {{objENS.name}}.eth </button>
    </div>
  </section>

  <div class="form-group" style="margin: 2em auto;">

    <h3>Set the Resolver for your Name</h3>
    <ol>
      <li>Go to the contracts tab.</li>
      <li>Choose <code>ENS - Registry:</code> <code>0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e</code>. Click "Access".</li>
      <li>Select <code>setResolver</code>. </li>
      <li>Enter the Namehash of your name under "node (bytes32)".
        <ul><li>node (bytes32): <code>{{objENS.namehash}}</code></li></ul>
      </li>
      <li>Enter the Public Resolver Address under "resolver (address)".
        <ul><li>resolver (address): <code>0x1da022710df5002339274aadee8d58218e9d6ab5</code></li></ul>
      </li>
      <li>Unlock the owner's account.</li>
      <li>Click <code>WRITE</code>.</li>
      <li>Generate and send this transaction &ndash; leave "Amount to Send" as <strong>0</strong></li>
      <li><a href="https://etherscan.io/tx/0x60eec50b492375bce25684f806599873b7f682e1ba504c8bed7cc90c33368118" target="_blank">TX should look like this.</a></li>
    </ol>
  </div>


  <div class="form-group" style="margin: 2em auto;">
    <h3>Set the Address That your Name will Resolve To</h3>
    <ol>
      <li>Go to the contracts tab.</li>
      <li>Choose <code>ENS-Public Resolver:</code> <code>0x1da022710df5002339274aadee8d58218e9d6ab5</code>. Click "Access". </li>
      <li>Select <code>setAddr</code>. </li>
      <li>Enter the Namehash of your name under "node (bytes32)".
        <ul><li>node (bytes32): <code>{{objENS.namehash}}</code></li></ul>
      </li>
      <li>Enter the Address you would like to resolve to under "addr (address)".
        <ul><li>addr (address): <code>{{newResolvedAddress}}</code> </li>
      </ul>
      <li>Unlock the owner's account.</li>
      <li>Click <code>WRITE</code>.</li>
      <li>Generate and send this transaction &ndash; leave "Amount to Send" as <strong>0</strong></li>
      <li><a href="https://etherscan.io/tx/0xe4b8cbbb9c30a9066e4d430e347e07442ccc99b927ed73280792aee718ecbd30">TX should look like this.</a></li>
    </ol>
  </div>


</article>

@@if (site === 'mew' ) { @@include( './ens-modal-resolve.tpl', { "site": "mew" } ) }
@@if (site === 'cx'  ) { @@include( './ens-modal-resolve.tpl', { "site": "cx"  } ) }
