import $ from 'jquery';

export const dssCallApi = (
  verb: JQuery.AjaxSettings['type'],
  url: JQuery.AjaxSettings['url'],
  enctype: JQuery.AjaxSettings['enctype'],
  data: JQuery.AjaxSettings['data'],
  callback: (arg: any | { error: any }) => void
) => {
  $.ajax({
    type: verb,
    enctype,
    url,
    async: false,
    dataType: 'text',
    data,
    processData: false,
    contentType: false,
    error(e: any) {
      callback({ error: e });
      // alert("Impossibile comunicare con il servizio DSS " + e.message);
    },
    success(response: string) {
      const obj = JSON.parse(response);
      callback(obj);
    },
  });
};

export const isServiceUp = (handler: JQuery.AjaxSettings['jsonpCallback']) => {
  const url = `${process.env.BASE_URL}/isUp`;
  $.ajax({
    type: 'GET',
    url,
    async: false,
    contentType: 'application/json',
    dataType: 'jsonp',
    // data: "l=" + _licensee + "&pk=" + _productKey,
    jsonpCallback: handler,
    error(e: any) {
      alert('Impossibile comunicare con il servizio CNS ' + e.message);
    },
  });
};

export const dssSignUrl = (
  pin: string,
  fileurl: string,
  signatureType: string,
  filename: string,
  pkcs11: string,
  result: string,
  uploadUrl: string,
  callback: any
) => {
  const url = `${process.env.BASE_URL}/signUrl`;

  dssCallApi(
    'POST',
    encodeURI(
      `${url}?pin=${pin}&url=${fileurl}&type=${signatureType}${
        filename !== '' ? `&name=${filename}` : ''
      }&pkcs11=${pkcs11}&result=${result}${
        uploadUrl !== '' ? `&uploadUrl=${uploadUrl}` : ''
      }`
    ),
    undefined,
    undefined,
    callback
  );
};

export const dssSignFile = (
  pin: string,
  file: any,
  signatureType: string,
  filename: string,
  pkcs11: string,
  result: string,
  uploadUrl: string,
  callback: any
) => {
  const url = `${process.env.BASE_URL}/signFile`;

  dssCallApi(
    'POST',
    encodeURI(
      `${url}?pin=${pin}&type=${signatureType}${
        filename !== '' ? `&name=${filename}` : ''
      }&pkcs11=${pkcs11}&result=${result}${
        uploadUrl !== '' ? `&uploadUrl=${uploadUrl}` : ''
      }&signerName=Ugo Chirico`
    ),
    'multipart/form-data',
    file,
    callback
  );
};

export const dssSignContent = (
  pin: string,
  content: any,
  signatureType: string,
  filename: string,
  pkcs11: string,
  result: string,
  uploadUrl: string,
  callback: any
) => {
  const url = `${process.env.BASE_URL}/sign`;

  dssCallApi(
    'POST',
    encodeURI(
      `${url}?pin=${pin}&type=${signatureType}${
        filename != '' ? `&name=${filename}` : ''
      }&pkcs11=${pkcs11}&result=${result}${
        uploadUrl != '' ? `&uploadUrl=${uploadUrl}` : ''
      }`
    ),
    undefined,
    content,
    callback
  );
};

// export const dssVerifyFile = (file: any, callback: any) => {
//     const url = `${process.env.BASE_URL}/verifyFile`;

//     dssCallApi('POST', encodeURI(url), 'multipart/form-data', file, callback);
// };

// export const dssVerifyContent = (
//     content: any,
//     signatureType: string,
//     callback: any,
// ) => {
//     const url = `${process.env.BASE_URL}/verify`;

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
//     const url = `${process.env.BASE_URL}/processotelematico`;

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

export const restart = (callback: any) => {
  const url = `${process.env.BASE_URL}/restart`;

  dssCallApi('POST', encodeURI(url), undefined, undefined, callback);
};

// esaw:

export const dssSignHash = (
  jsonhash: string | any[] | { [key: string]: any },
  callback: (arg: any) => void
) => {
  const url = `${process.env.BASE_URL}/signHash`;

  dssCallApi('POST', encodeURI(url), undefined, jsonhash, callback);
};

export const dssFindSigningCertificates = (callback: any) => {
  const url = `${process.env.BASE_URL}/findSigningCertificates`;

  dssCallApi('POST', encodeURI(url), undefined, undefined, callback);
};
