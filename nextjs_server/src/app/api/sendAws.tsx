import S3 from 'aws-sdk/clients/s3';

export default async function aws(image: File) {
  const s3 = new S3({
    region: "us-east-2",
    accessKeyId: "AKIA5FTZDMMVVOJPP4F6",
    secretAccessKey: "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",
  });


  try {
    const fileParams = {
      Bucket: "mindfultrack-files",
      Key: "images/" + image.name,
      ContentType: image.type,
      Body: image
    };

    const request = await s3.upload(fileParams).promise();
    return request.Location;

  } catch (error) {
    console.log("Failed to upload", error)
  };
};