  <table class="table table-striped" style="margin: 2em auto;">
    <tr>
      <td>Name:  </td>
      <td class="mono">{{objENS.name}}.eth</td>
    </tr>
    <tr>
      <td>Labelhash ({{objENS.name}}): </td>
      <td class="mono">{{objENS.nameSHA3}}</td>
    </tr>
    <tr>
      <td>Namehash ({{objENS.name}}.eth): </td>
      <td class="mono">{{objENS.namehash}}</td>
    </tr>
    <tr>
      <td>Owner:</td>
      <td class="mono">{{objENS.owner}}</td>
    </tr>
    <tr>
      <td>Highest Bidder (Deed Owner): </td>
      <td><span class="mono">{{objENS.deedOwner}}</span></td>
    </tr>
    <tr>
      <td>Resolved Address: </td>
      <td class="mono">{{objENS.resolvedAddress}}</td>
    </tr>
    <tr><td colspan="2"><a href="https://etherscan.io/enslookup?q={{objENS.name}}.eth" target="_blank">{{objENS.name}}.eth on etherscan.io</a> </td></tr>
    <tr><td></td><td></td></tr>
    <tr>
      <td>ENS - Public Resolver: </td>
      <td class="mono">0x1da022710df5002339274aadee8d58218e9d6ab5</td>
    </tr>
    <tr>
      <td>ENS - Registry: </td>
      <td class="mono">0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e</td>
    </tr>
  </table>
