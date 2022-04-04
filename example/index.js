import $ from 'jquery';

var dssCallApi = function dssCallApi(verb, url, enctype, data, callback) {
  $.ajax({
    type: verb,
    enctype: enctype,
    url: url,
    async: false,
    dataType: 'text',
    data: data,
    processData: false,
    contentType: false,
    error: function error(e) {
      callback({
        error: e
      }); // alert("Impossibile comunicare con il servizio DSS " + e.message);
    },
    success: function success(response) {
      var obj = JSON.parse(response);
      callback(obj);
    }
  });
};
var isServiceUp = function isServiceUp(handler) {
  var url = "http://localhost:10081" + "/isUp";
  $.ajax({
    type: 'GET',
    url: url,
    async: false,
    contentType: 'application/json',
    dataType: 'jsonp',
    // data: "l=" + _licensee + "&pk=" + _productKey,
    jsonpCallback: handler,
    error: function error(e) {
      alert('Impossibile comunicare con il servizio CNS ' + e.message);
    }
  });
};
var dssSignUrl = function dssSignUrl(pin, fileurl, signatureType, filename, pkcs11, result, uploadUrl, callback) {
  var url = "http://localhost:10081" + "/signUrl";
  dssCallApi('POST', encodeURI(url + "?pin=" + pin + "&url=" + fileurl + "&type=" + signatureType + (filename !== '' ? "&name=" + filename : '') + "&pkcs11=" + pkcs11 + "&result=" + result + (uploadUrl !== '' ? "&uploadUrl=" + uploadUrl : '')), undefined, undefined, callback);
};
var dssSignFile = function dssSignFile(pin, file, signatureType, filename, pkcs11, result, uploadUrl, callback) {
  var url = "http://localhost:10081" + "/signFile";
  dssCallApi('POST', encodeURI(url + "?pin=" + pin + "&type=" + signatureType + (filename !== '' ? "&name=" + filename : '') + "&pkcs11=" + pkcs11 + "&result=" + result + (uploadUrl !== '' ? "&uploadUrl=" + uploadUrl : '') + "&signerName=Ugo Chirico"), 'multipart/form-data', file, callback);
};
var dssSignContent = function dssSignContent(pin, content, signatureType, filename, pkcs11, result, uploadUrl, callback) {
  var url = "http://localhost:10081" + "/sign";
  dssCallApi('POST', encodeURI(url + "?pin=" + pin + "&type=" + signatureType + (filename != '' ? "&name=" + filename : '') + "&pkcs11=" + pkcs11 + "&result=" + result + (uploadUrl != '' ? "&uploadUrl=" + uploadUrl : '')), undefined, content, callback);
}; // export const dssVerifyFile = (file: any, callback: any) => {
//     const url = `${"http://localhost:10081"}/verifyFile`;
//     dssCallApi('POST', encodeURI(url), 'multipart/form-data', file, callback);
// };
// export const dssVerifyContent = (
//     content: any,
//     signatureType: string,
//     callback: any,
// ) => {
//     const url = `${"http://localhost:10081"}/verify`;
//     dssCallApi(
//         'POST',
//         encodeURI(`${url}?type=${signatureType}`),
//         undefined,
//         content,
//         callback,
//     );
// };
// export const sendSOAP = (
//     remoteUrl: string,
//     pin: string,
//     soap: any,
//     callback: any,
// ) => {
//     const url = `${"http://localhost:10081"}/processotelematico`;
//     dssCallApi(
//         'POST',
//         encodeURI(
//             `${url}?url=${remoteUrl === '' ? null : remoteUrl}&pin=${pin}`,
//         ),
//         undefined,
//         soap,
//         callback,
//     );
// };

var restart = function restart(callback) {
  var url = "http://localhost:10081" + "/restart";
  dssCallApi('POST', encodeURI(url), undefined, undefined, callback);
}; // esaw:

var dssSignHash = function dssSignHash(jsonhash, callback) {
  var url = "http://localhost:10081" + "/signHash";
  dssCallApi('POST', encodeURI(url), undefined, jsonhash, callback);
};
var dssFindSigningCertificates = function dssFindSigningCertificates(callback) {
  var url = "http://localhost:10081" + "/findSigningCertificates";
  dssCallApi('POST', encodeURI(url), undefined, undefined, callback);
};

export { dssCallApi, dssFindSigningCertificates, dssSignContent, dssSignFile, dssSignHash, dssSignUrl, isServiceUp, restart };
//# sourceMappingURL=index.esm.js.map
