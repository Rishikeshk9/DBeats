import React from "react";
// import { Contract } from "@ethersproject/contracts";
// import { getDefaultProvider } from "@ethersproject/providers";
import env from "react-dotenv";

import { Zora } from '@zoralabs/zdk'
import { Wallet } from 'ethers'
import { JsonRpcProvider } from '@ethersproject/providers'
import axios from "axios";

import {
  constructBidShares,
  constructMediaData,
  sha256FromBuffer,
  generateMetadata,
  fetchMetadataHash,
  isMediaDataVerified
} from '@zoralabs/zdk'
const path = require("path");

var mime = require('mime-types')

// function base64toBlob(base64Data, contentType) {
//     contentType = contentType || '';
//     var sliceSize = 1024;
//     var byteCharacters = atob(base64Data);
//     var bytesLength = byteCharacters.length;
//     var slicesCount = Math.ceil(bytesLength / sliceSize);
//     var byteArrays = new Array(slicesCount);

//     for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
//         var begin = sliceIndex * sliceSize;
//         var end = Math.min(begin + sliceSize, bytesLength);

//         var bytes = new Array(end - begin);
//         for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
//             bytes[i] = byteCharacters[offset].charCodeAt(0);
//         }
//         byteArrays[sliceIndex] = new Uint8Array(bytes);
//     }
//     return new Blob(byteArrays, { type: contentType });
// }

async function mintNFT(provider, formData, file, name, description) {
  console.log('This ran mint');
  
  const signer = provider.getSigner();
  const zora = new Zora(
    signer,
    50,
    '0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7',//mediaAddress
    '0xE5BFAB544ecA83849c53464F85B7164375Bdaac1'//marketAddress
  );
  // const someres = await zora.fetchMetadataURI(10);
  // console.log(someres)
//   const zora = new Zora(signer, 4);

console.log(mime.lookup(path.extname(file.name)));
  const metadata = {
    version: 'zora-20210101',
    name: name,
    description: description,
    mimeType: mime.lookup(path.extname(file.name)),
  };

  const minified = generateMetadata(metadata.version, metadata);

  const metadataHash = await sha256FromBuffer(Buffer.from(minified));
 
  const blob = new Blob([file],{type: mime.lookup(path.extname(file.name))})
  var buffer = await blob.arrayBuffer();
  const contentHash = await sha256FromBuffer(Buffer.from(buffer));

  console.log(metadataHash,contentHash, "FILE:",file.length);
  let fileRes;
  if (file.length !== 0) {
    formData.append("metadata", minified);

    fileRes = await axios.post('/upload-nft', formData);
    console.log("fileResponse: ",fileRes);
   
  }

  const mediaData = constructMediaData(
    fileRes.data[0],
    fileRes.data[1],
    contentHash,
    metadataHash
  );

  // const contentHash = sha256FromBuffer(Buffer.from('Ours Truly,'))
  // console.log(contentHash)

  // const verified = await isMediaDataVerified(mediaData)

  const bidShares = constructBidShares(
    10, // creator share
    90, // owner share
    0 // prevOwner share
  );

  // if (!verified){
  //   console.log("MediaData not valid, do not mint")
  // }

  const tx = await zora.mint(mediaData, bidShares);
  await tx.wait(8); // 8 confirmations to finalize
  console.log('done',tx);
}


export default mintNFT;